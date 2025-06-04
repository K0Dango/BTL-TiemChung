import { useEffect, useState, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis, { endpoints, authApis } from "./config/Apis";

export const GlobalData = {
    sdt1: "00000000",
    sdt2: "00000001",
    email1: "gmail1@gmail.com",
    email2: "gmail2@gmail.com",
}

export const loadUser = async () => {
    try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            return {
                name: user.username,
                email: user.email,
                password: user.password,
                sdt: user.sdt,
                gioiTinh: user.gioiTinh,
                diaChi: user.diaChi,
                ngaySinh: user.ngaySinh,
                avatar: user.avatar
            };
        }
        return null;
    } catch (error) {
        console.error("Không thể load thông tin người dùng:", error);
        return null;
    }
};

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [selectedItems, setSelectedItems] = useState([]); // lưu id các item được chọn
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(endpoints['gio-hang']);

    const loadGioHang = async (reset = false) => {
        const url = reset ? endpoints['gio-hang'] : page;
        if (!url || loading) return;
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).get(url);

            if (reset) {
                setCart(res.data.results);
                setSelectedItems([]); // reset chọn khi load mới
            } else {
                setCart(prev => [...prev, ...res.data.results]);
            }
            setPage(res.data.next);
        } catch (err) {
            console.error('Lỗi khi load giỏ hàng:', err);
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (id) => {
        try {
            const token = await AsyncStorage.getItem('token');
            await authApis(token).delete(`${endpoints['gio-hang']}${id}/`);
            setCart(prev => prev.filter(item => item.id !== id));
            setSelectedItems(prev => prev.filter(itemId => itemId !== id));
        } catch (error) {
            console.error('Lỗi khi xóa khỏi giỏ hàng:', error);
        }
    };

    // Chọn hoặc bỏ chọn item giỏ hàng
    const toggleSelectItem = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        loadGioHang(true);
    }, []);

    useEffect(() => {
        const totalCount = cart.reduce((sum, item) => sum + item.soLuong, 0);
        setCartCount(totalCount);
    }, [cart]);

    return (
        <CartContext.Provider value={{
            cart,
            cartCount,
            selectedItems,
            toggleSelectItem,
            loadGioHang,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
};
