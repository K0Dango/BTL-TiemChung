import { useEffect, useState } from "react";
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


import { createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(endpoints['gio-hang']);

    const loadGioHang = async (reset = false) => {
        const url = reset ? endpoints['gio-hang'] : page;
        console.log("9")
        if (!url || loading) return;
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).get(url);

            if (reset) {
                setCart(res.data.results);
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

    useEffect(() => {
        loadGioHang(true);
    }, []);

    useEffect(() => {
        const totalCount = cart.reduce((sum, item) => sum + item.soLuong, 0);
        setCartCount(totalCount);
    }, [cart]);

    

    return (
        <CartContext.Provider value={{ cart, cartCount, loadGioHang }}>
            {children}
        </CartContext.Provider>
    );
};