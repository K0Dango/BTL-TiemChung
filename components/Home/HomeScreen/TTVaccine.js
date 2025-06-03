import { TouchableOpacity, View, Text, ScrollView, Image, Alert } from "react-native"
import TTVaccineStyle from "../../../styles/TTVaccineStyle";
import { useState, useContext } from "react";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome6'
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApis, endpoints } from "../../../config/Apis";
// import { reloadGioHang } from "../../../global";

import { CartContext } from "../../../global";


const TTVanccine = ({ route }) => {

    const { loadGioHang } = useContext(CartContext);

    console.log(route)
    const { vaccine} = route.params;


    const [soLuong, setSoLuong] = useState(1)
    const [tien, setTien] = useState(parseFloat(vaccine.gia))

    const [show, setShow] = useState(false)
    const giam = () => { if (soLuong > 1) setSoLuong(soLuong - 1) }
    const tang = () => { setSoLuong(soLuong + 1) }

    useEffect(() => {
        const tongTien = parseFloat(vaccine.gia) * soLuong;
        setTien(tongTien);
    }, [soLuong]);

    const addToCart = async () => {
        console.log(soLuong)
        try {
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).post(endpoints['gio-hang'], {
                vaccine_id: vaccine.maVaccine,
                soLuong: soLuong
            })
            console.log(vaccine.maVaccine)
            Alert.alert("Thông báo", "Đã thêm vào giỏ hàng");
            setShow(false);
            await loadGioHang(true)
        } catch (error) {
            console.error(err);
            Alert("Lỗi", "Không thể thêm vào giỏ hàng");
        }
    }
    return (
        <>
            {show && (
                <>
                    <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1001 }} activeOpacity={1} onPress={() => setShow(false)} />
                    <View style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1000,
                        backgroundColor: "#cdcdcdc7"
                    }]}>

                    </View>
                    <View style={[{
                        position: 'absolute',
                        top: 90,  // Tuỳ chỉnh tuỳ vị trí header
                        right: 10,
                        backgroundColor: '#cdcdcd',
                        padding: 10,
                        borderRadius: 8,
                        elevation: 5,
                        zIndex: 1002,
                        width: '100%',
                        padding: 25
                    }]}>
                        <View style={[{ position: "absolute", top: 10, right: 10 }]}>
                            <TouchableOpacity style={[TTVaccineStyle.nutTangGIam]} onPress={() => setShow(false)}>
                                <Icon name="xmark" size={15} />
                            </TouchableOpacity>
                        </View>
                        <View style={[TTVaccineStyle.viewSoLung]}>
                            <Text style={[TTVaccineStyle.text]}>Số lượng: </Text>
                            <TextInput value={soLuong.toString()} onChangeText={(t) => {
                                const number = parseInt(t, 10);
                                setSoLuong(isNaN(number) ? 1 : number);
                            }} keyboardType="Numeric" style={[TTVaccineStyle.textSoLuong]} />
                            <View style={{ marginLeft: 5 }}>
                                <TouchableOpacity onPress={tang} style={[TTVaccineStyle.nutTangGIam, { marginBottom: 1 }]}>
                                    <Icon name="plus" size={15} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={giam} style={[TTVaccineStyle.nutTangGIam]}>
                                    <Icon name="minus" size={15} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                            <Text style={[TTVaccineStyle.text]}>Tổng tiền: </Text>
                            <Text style={[TTVaccineStyle.textGia]}>{tien}đ</Text>
                        </View>
                        <View>
                            <TouchableOpacity style={[TTVaccineStyle.nutGioHang, { marginVertical: 15 }]} onPress={() => { addToCart() }}>
                                <Text>Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
            <View style={[TTVaccineStyle.container]}>
                <ScrollView>
                    <View >
                        <View style={[TTVaccineStyle.image]}>
                            <Image
                                source={{ uri: 'https://5.imimg.com/data5/SELLER/Default/2024/2/391176852/KQ/ER/ZC/24119759/cervarix-500x500.jpg' }}
                                style={{ width: 100, height: 100 }}
                            />
                        </View>
                        <Text style={[TTVaccineStyle.text]}>Tên Vaccine: {vaccine.tenVc}</Text>
                        <Text style={[TTVaccineStyle.text]}>Loại Vaccine: {vaccine.loaiVaccine.tenLoai}</Text>
                        <Text style={[TTVaccineStyle.text]}>Số mũi cần tiêm: {vaccine.loaiVaccine.soMui}</Text>
                        <Text style={[TTVaccineStyle.text]}>Nguồn gốc: {vaccine.nguonGoc}</Text>
                        <Text style={[TTVaccineStyle.textGia]}>Giá: {vaccine.gia}đ</Text>
                        <View>
                            <View style={[TTVaccineStyle.nut]}>
                                <TouchableOpacity style={[TTVaccineStyle.nutGioHang]}>
                                    <Text style={[{ fontSize: 20, color: "white" }]} onPress={() => setShow(true)}>Thêm vào giỏ hàng</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[TTVaccineStyle.nutDKTiem]}>
                                    <Text style={[{ fontSize: 20, color: "white" }]}>Đăng ký tiêm</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[TTVaccineStyle.text]}>Thông tin Vaccine:</Text>
                            <View style={[TTVaccineStyle.ttVc]}>
                                <Text style={[TTVaccineStyle.text]}>{vaccine.thongTin}</Text>
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </>
    )

}
export default TTVanccine;