import React, { useEffect, useState, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Apis, { endpoints, authApis } from '../config/Apis';
import { navigate } from './Navigation';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, Modal, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CartContext } from '../global';

import MainHome from '../components/Home/Home';
import LichSu from '../components/Home/LichSu';
import LienHe from '../components/Home/LienHe';
import LoaiVaccine from '../components/Home/HomeScreen/LoaiVaccine';
import VaccineTL from '../components/Home/HomeScreen/VaccineTL';
import TuoiVaccine from '../components/Home/HomeScreen/TuoiVaccine';
import VaccineAge from '../components/Home/HomeScreen/VaccineAge';
import TTVaccine from '../components/Home/HomeScreen/TTVaccine';
import StackHomeStyle from "../styles/StackHomeStyle";
import LichTiem from '../components/Home/HomeScreen/LichTiem';
import LichSuTiem from '../components/Home/HomeScreen/LichSuTiem';

const Stack = createStackNavigator();

function LinkGioHang({ cartCount, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[StackHomeStyle.icon]}>
                <Icon name='cart-shopping' size={30} color="#fff" />
                {cartCount > 0 && (
                    <View style={[StackHomeStyle.number]}>
                        <Text style={[StackHomeStyle.textNumber]}>
                            {cartCount}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const StackHome = () => {
    const [state, setState] = useState(false);
    const { cart, cartCount, loadGioHang } = useContext(CartContext);
    const [selectedItems, setSelectedItems] = useState([]);

    const nav = useNavigation();

    const toggleSelectItem = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(prev => prev.filter(id => id !== itemId));
        } else {
            setSelectedItems(prev => [...prev, itemId]);
        }
    };

    const handleDeleteSelected = async () => {
        const token = await AsyncStorage.getItem("token");

        for (const id of selectedItems) {
            try {
                await authApis(token).delete(`${endpoints["gio-hang"]}${id}/`);
            } catch (error) {
                console.error(`Xóa thất bại với id ${id}:`, error);
            }
        }

        setSelectedItems([]);
        setState(false);
        await loadGioHang(true); 
    };

    return (
        <>
            {state && (
                <>
                    <TouchableOpacity
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }}
                        activeOpacity={1}
                        onPress={() => setState(false)}
                    />
                    <View style={{
                        position: 'absolute',
                        top: 90,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 997,
                        backgroundColor: "#cdcdcdc7"
                    }} />

                    <View style={StackHomeStyle.backGrGioHang}>
                        <Text style={[StackHomeStyle.text, { textAlign: "center" }]}>Danh sách giỏ hàng</Text>
                        <View style={{ height: '60%' }}>
                            <FlatList
                                data={cart}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({ item }) => (
                                    <View style={[StackHomeStyle.touch, {
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }]}>
                                        <TouchableOpacity
                                            style={{ flex: 1 }}
                                            onPress={() => {
                                                setState(false);
                                                navigate("TTVaccine", { vaccine: item.vaccine });
                                            }}
                                        >
                                            <Text style={StackHomeStyle.text}>Tên: {item.tenVaccine}</Text>
                                            <Text style={StackHomeStyle.text}>Số lượng: {item.soLuong}</Text>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={StackHomeStyle.text}>Thành tiền: </Text>
                                                <Text style={[StackHomeStyle.text, { color: "blue" }]}>{item.thanhTien}đ</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                marginLeft: 10,
                                                backgroundColor: selectedItems.includes(item.id) ? "green" : "#ccc",
                                                padding: 8,
                                                borderRadius: 5,
                                            }}
                                            onPress={() => toggleSelectItem(item.id)}
                                        >
                                            <Text style={{ color: "white" }}>{selectedItems.includes(item.id) ? "✓" : "✕"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>

                        <TouchableOpacity
                            style={{ backgroundColor: "red", marginTop: 10, padding: 10 }}
                            onPress={handleDeleteSelected}
                        >
                            <Text style={[StackHomeStyle.text, { color: "white", textAlign: "center" }]}>Xóa đã chọn</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ backgroundColor: "blue", marginTop: 10, padding: 10 }}
                            onPress={() => setState(false)}
                        >
                            <Text style={[StackHomeStyle.text, { color: "white", textAlign: "center" }]}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            <Stack.Navigator initialRouteName='MainHome'>
                <Stack.Screen name="MainHome" component={MainHome} options={{ headerShown: false }} />
                <Stack.Screen name="LichSu" component={LichSu} options={{ headerShown: true, headerTitle: "Lịch sử" }} />
                <Stack.Screen name="LienHe" component={LienHe} options={{ headerShown: true, headerTitle: "Liên hệ" }} />
                <Stack.Screen name="LoaiVC" component={LoaiVaccine} options={{
                    headerShown: true, headerTitle: "Danh Sách Vaccine", headerStyle: {
                        backgroundColor: '#007bff'
                    }, headerRight: () => <LinkGioHang cartCount={cartCount} onPress={() => setState(prev => !prev)} />
                }} />
                <Stack.Screen name="VaccineTL" component={VaccineTL} options={{
                    headerShown: true, headerTitle: "Danh Sách Vaccine", headerStyle: {
                        backgroundColor: '#007bff'
                    }, headerRight: () => <LinkGioHang cartCount={cartCount} onPress={() => setState(prev => !prev)} />
                }} />
                <Stack.Screen name="TuoiVaccine" component={TuoiVaccine} options={{
                    headerShown: true, headerTitle: "Danh Sách Vaccine", headerStyle: {
                        backgroundColor: '#007bff'
                    }, headerRight: () => <LinkGioHang cartCount={cartCount} onPress={() => setState(prev => !prev)} />
                }} />
                <Stack.Screen name="VaccineAge" component={VaccineAge} options={{
                    headerShown: true, headerTitle: "Danh Sách Vaccine", headerStyle: {
                        backgroundColor: '#007bff'
                    }, headerRight: () => <LinkGioHang cartCount={cartCount} onPress={() => setState(prev => !prev)} />
                }} />
                <Stack.Screen name="TTVaccine" component={TTVaccine} options={{
                    headerShown: true, headerTitle: "Thông tin Vaccine", headerStyle: {
                        backgroundColor: '#007bff'
                    }, headerRight: () => <LinkGioHang cartCount={cartCount} onPress={() => setState(prev => !prev)} />
                }} />
                <Stack.Screen name="LichTiem" component={LichTiem} options={{ headerShown: true, headerTitle: "Lịch tiêm" }} />
                <Stack.Screen name="LichSuTiem" component={LichSuTiem} options={{ headerShown: true, headerTitle: "Lịch sử tiêm" }} />
            </Stack.Navigator>
        </>
    );
};

export default StackHome;
