import { useEffect, useState, useCallback } from "react"
import { Alert, FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { RadioButton, TextInput } from "react-native-paper"
import Icon from 'react-native-vector-icons/FontAwesome6'
import Apis, { authApis, endpoints } from "../../../config/Apis"
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImgPicker from 'expo-image-picker';




import VaccineLoaiStyle from "../../../styles/VaccineLoaiStyle"
import DangKyTiemStyle from "../../../styles/DangKyTiemStyle";
import { loadUser } from "../../../global"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { CartContext } from "../../../global"

const DangKyTiem = ({ route }) => {

    // const paramVaccine = route.params?.vaccine || null;
    console.log("vaccine truyền ", route.params?.vaccine || null)
    const nav = useNavigation()

    const [local, setLocal] = useState(1)
    const [loading, setLoading] = useState(false)
    const [pageVc, setPageVc] = useState(endpoints['vaccine'])
    const [showDsVc, setShowDsVc] = useState(false)
    const [showPicker, setShowPicker] = useState(false)
    const [showTaoNguoi, setShowTaoNguoi] = useState(false)
    const [layUser, setLayUser] = useState(true)
    const [hopLe, setHopLe] = useState(true)
    const [ngayTiem, setNgayTiem] = useState(new Date());
    const [editIndex, setEditIndex] = useState(null);


    const [dsVaccine, setDsVc] = useState([])
    // const [soLuong, setSoLuong] = useState(1)
    const [vaccine, setVaccine] = useState(route.params?.vaccine ?? null);
    useEffect(() => {
        setVaccine(route.params?.vaccine ?? null);
    }, [route.params?.vaccine]);

    const [dsNguoiTiem, setDsNguoiTiem] = useState([])
    const [nguoiTiem, setNguoiTiem] = useState({
        name: '',
        sdt: '',
        gioiTinh: 'NAM',
        ngaySinh: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        diaChi: ''
    })


    console.log("vaccine nhận:", vaccine);



    const [user, setUser] = useState({})

    const loadVaccine = async () => {
        if (!pageVc || loading) return
        try {
            setLoading(true)
            const res = await Apis.get(pageVc)
            setDsVc(prev => [...prev, ...res.data.results])
            setPageVc(res.data.next)
        } catch (error) {
            console.error(error)
            Alert.alert('Lỗi load dữ liệu')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (showDsVc && dsVaccine.length === 0) {
            loadVaccine();
        }
    }, [showDsVc]);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await loadUser();
            if (userData) {
                setUser(userData);
            }
        };
        fetchUser();
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                nav.setParams({ vaccine: null }); // reset vaccine về null

                setVaccine(null);
                setDsVc([]);
                // setVaccine(null);
                setPageVc(endpoints['vaccine']);
                setShowDsVc(false);
                setLocal(1);
                setDsNguoiTiem([]);
                setLayUser(true);
                setNgayTiem(new Date());
            };
        }, [nav])
    );

    const handleXoaNguoiTiem = (index) => {
        const updatedList = dsNguoiTiem.filter((_, i) => i !== index);
        if (index === 0 && !layUser) {
            setLayUser(true);
        }
        setDsNguoiTiem(updatedList);
    };

    const chonVc = () => {
        return (
            <View>
                <Text style={[{ textAlign: "center", fontSize: 25 }]}>Chọn Vaccine</Text>
                <View style={[DangKyTiemStyle.viewVc]}>
                    {vaccine === null ? (
                        <>
                            <View>
                                <TouchableOpacity onPress={() => setShowDsVc(true)} style={[DangKyTiemStyle.viewChonVc]}>
                                    <Icon name='plus' size={40} color="grey" />
                                </TouchableOpacity>

                            </View>
                        </>
                    ) : (
                        <>
                            <View>
                                <TouchableOpacity onPress={() => setShowDsVc(true)}>
                                    <Text style={[DangKyTiemStyle.text]}>Vaccine: {vaccine.tenVc}</Text>
                                    <Text style={[DangKyTiemStyle.text]}>Loại: {vaccine.loaiVaccine.tenLoai}</Text>
                                    <Text style={[DangKyTiemStyle.text]}>Tuổi: {vaccine.loaiVaccine.tuoi}</Text>
                                    <Text style={[DangKyTiemStyle.text]}>Giá: <Text style={[DangKyTiemStyle.textGia]}>{vaccine.gia}đ</Text></Text>
                                </TouchableOpacity>
                            </View>

                        </>
                    )}

                </View>




            </View >
        )
    }

    const handleLayTuTaiKhoan = () => {
        console.log(user)
        const nguoiTuUser = {
            name: user.name,
            sdt: user.sdt,
            gioiTinh: user.gioiTinh,
            ngaySinh: new Date(user.ngaySinh),
            diaChi: user.diaChi
        };
        setLayUser(false)
        setDsNguoiTiem(prev => [nguoiTuUser, ...prev]);

    };


    const taoNguoiTiem = () => {
        return (
            <>
                <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }} onPress={() => setShowTaoNguoi(false)} />

                <View style={{ position: 'absolute', top: 180, left: 0, right: 0, paddingBottom: 15, backgroundColor: "white", zIndex: 999, borderWidth: 1 }} >
                    <TouchableOpacity onPress={() => { setShowTaoNguoi(false); setEditIndex(null); setNguoiTiem({ name: '', ngaySinh: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), diaChi: '', sdt: '', gioiTinh: 'NAM' }) }} style={{ alignSelf: 'flex-end', padding: 5 }}>
                        <Icon name="xmark" size={30} />
                    </TouchableOpacity>
                    <View style={[{ padding: 10, paddingTop: 0 }]}>
                        <TextInput label='Họ và tên' value={nguoiTiem.name} onChangeText={t => setNguoiTiem(prev => ({ ...prev, name: t }))} mode="outlined" autoCapitalize="words" />
                    </View>
                    <View style={[{ padding: 10 }]}>
                        <TextInput label='Số điện thoại' value={nguoiTiem.sdt} onChangeText={t => setNguoiTiem(prev => ({ ...prev, sdt: t }))} mode="outlined" keyboardType="numeric" />
                    </View>
                    <View style={[{ padding: 10 }]}>
                        <Text>Giới tính</Text>
                        <RadioButton.Group onValueChange={value => setNguoiTiem(prev => ({ ...prev, gioiTinh: value }))} value={nguoiTiem.gioiTinh} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <RadioButton value="NAM" />
                                <Text>NAM</Text>
                                <RadioButton value="NỮ" />
                                <Text>NỮ</Text>
                                <RadioButton value="KHÁC" />
                                <Text>KHÁC</Text>
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={[{ padding: 10 }]}>
                        <Text style={{ marginBottom: 8 }}>Ngày sinh:</Text>
                        <TouchableOpacity onPress={() => setShowPicker(true)} style={{ padding: 10, borderWidth: 1, borderRadius: 5 }}>
                            <Text>{nguoiTiem.ngaySinh.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                                value={nguoiTiem.ngaySinh}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowPicker(false);
                                    if (selectedDate) {
                                        setNguoiTiem(prev => ({ ...prev, ngaySinh: selectedDate }));
                                    }
                                }}
                                maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                            />
                        )}
                    </View>
                    <View style={[{ padding: 10 }]}>
                        <TextInput label="Địa chỉ" value={nguoiTiem.diaChi} onChangeText={t => setNguoiTiem(prev => ({ ...prev, diaChi: t }))} mode="outlined" />
                    </View>
                    <TouchableOpacity onPress={() => {

                        const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
                        setNguoiTiem(prev => ({
                            ...prev,
                            name: prev.name.trim(),
                            diaChi: prev.diaChi.trim()
                        }));
                        // Kiểm tra dữ liệu hợp lệ
                        if (
                            nguoiTiem.name === '' ||
                            nguoiTiem.diaChi === '' ||
                            nguoiTiem.sdt === ''
                        ) {
                            Alert.alert("Chưa điền đủ thông tin");
                        } else if (nguoiTiem.sdt.length < 10 || !/^0/.test(nguoiTiem.sdt)) {
                            Alert.alert("Số điện thoại chưa đúng định dạng");
                        } else if (!regex.test(nguoiTiem.name)) {
                            Alert.alert("Tên không được có ký tự đặc biệt");
                        } else {
                            if (editIndex !== null) {
                                const updatedList = [...dsNguoiTiem];
                                updatedList[editIndex] = nguoiTiem;
                                setDsNguoiTiem(updatedList);
                            } else {
                                setDsNguoiTiem(prev => [...prev, nguoiTiem]);
                            }

                            setNguoiTiem({
                                name: '',
                                ngaySinh: new Date(),
                                diaChi: '',
                                sdt: '',
                                gioiTinh: 'NAM'
                            });
                            setShowTaoNguoi(false);
                            setEditIndex(null);
                        }

                    }} style={{ marginTop: 10, backgroundColor: 'blue', padding: 10, marginHorizontal: 30 }}>
                        <Text style={[{ textAlign: "center", fontSize: 18 }]}>
                            {editIndex !== null ? 'Lưu chỉnh sửa' : 'Thêm người tiêm'}
                        </Text>
                    </TouchableOpacity>

                </View>
            </>
        )
    }



    const addNguoiTiem = () => {
        return (
            <>
                {showTaoNguoi && taoNguoiTiem()}

                <Text style={[{ textAlign: "center", fontSize: 25 }]}>Người tiêm</Text>
                <View>
                    <FlatList data={dsNguoiTiem} keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={[DangKyTiemStyle.viewChonVc, { flexDirection: "row", justifyContent: "space-between" }]}>
                                <TouchableOpacity onPress={() => {
                                    setNguoiTiem(item);
                                    setEditIndex(index);
                                    setShowTaoNguoi(true);
                                }} style={[{ width: '90%' }]}>
                                    <Text>Tên: {item.name}</Text>
                                    <Text>Ngày Sinh: {item.ngaySinh.toLocaleDateString()}</Text>
                                    <Text>Tuổi : {new Date().getFullYear() - new Date(item.ngaySinh).getFullYear()}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 10, width: '15%' }} onPress={() => handleXoaNguoiTiem(index)}>
                                    <Icon name="xmark" size={30} />
                                </TouchableOpacity>
                            </View>
                        )} />
                    <TouchableOpacity style={[DangKyTiemStyle.viewChonVc]} onPress={() => setShowTaoNguoi(true)}>
                        <Icon name='plus' size={40} color="grey" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[DangKyTiemStyle.buttonVc]} onPress={() => { if (layUser) { handleLayTuTaiKhoan() } }}>
                        <Text style={[{ textAlign: "center", fontSize: 18 }]}>Lấy thông tin từ tài khoản</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    const xacNhanDangKy = async () => {

        try {

            const danhSachNguoiTiem = [];
            const token = await AsyncStorage.getItem('token')
            console.log(token)

            for (const nguoi of dsNguoiTiem) {
                // 1. Tạo NguoiTiem
                console.log(nguoi)

                const resNguoiTiem = await authApis(token).post(endpoints['nguoi-tiem'], {
                    name: nguoi.name,
                    sdt: nguoi.sdt,
                    gioiTinh: nguoi.gioiTinh,
                    ngaySinh: nguoi.ngaySinh.toISOString().split('T')[0],
                    diaChi: nguoi.diaChi,
                });
                console.log("1")
                const nguoiTiemId = resNguoiTiem.data.id;
                console.log(nguoiTiemId)
                danhSachNguoiTiem.push(resNguoiTiem.data.id);
            }
            const resDonDangKy = await authApis(token).post(endpoints['dk-tiem'], {
                vaccine_id: vaccine.maVaccine,
            });

            const donDangKyId = resDonDangKy.data.id;
            console.log(resDonDangKy.data.id)

            console.log(ngayTiem)

            for (const nguoiTiemId of danhSachNguoiTiem) {
                const resDonTiem = await authApis(token).post(endpoints['don-tiem'], {
                    donDangKy_id: donDangKyId,
                    nguoiTiem_id: nguoiTiemId,
                    vaccine: vaccine.maVaccine,
                    ngayTiem: ngayTiem.toISOString().split('T')[0],
                });
            }

            Alert.alert("Đăng ký tiêm thành công!");
            setLocal(1);
            setVaccine(null);
            setDsNguoiTiem([]);
            setLayUser(true);
            setNgayTiem(new Date());

        } catch (error) {
            console.error(error);
            console.error("Chi tiết lỗi:", error.response?.data);
            Alert.alert("Đăng ký tiêm thất bại!");
        }
    }

    useEffect(() => {
        if (!vaccine || dsNguoiTiem.length === 0) {
            setHopLe(false);
            return;
        }

        const allHopLe = dsNguoiTiem.every((nguoi) => {
            const tuoi = new Date().getFullYear() - new Date(nguoi.ngaySinh).getFullYear();
            return tuoi >= vaccine.loaiVaccine.tuoi;  // tuổi phải >= tuổi tối thiểu của vaccine
        });
        setHopLe(allHopLe);
    }, [vaccine, dsNguoiTiem]);

    const guiDangKy = () => {
        if (!vaccine || dsNguoiTiem.length === 0) {
            return (
                <View style={{ padding: 10 }}>
                    <Text style={{ fontSize: 16, color: 'red' }}>Vui lòng chọn vaccine và thêm người tiêm</Text>
                </View>
            );
        }

        const tongTien = vaccine.gia * dsNguoiTiem.length;

        return (
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Thông tin đăng ký</Text>

                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 18 }}>Vaccine: {vaccine.tenVc}</Text>
                    <Text style={{ fontSize: 18 }}>Loại: {vaccine.loaiVaccine.tenLoai}</Text>
                    <Text style={{ fontSize: 18 }}>Tuổi: {vaccine.loaiVaccine.tuoi}</Text>
                    <Text style={{ fontSize: 18 }}>Giá: {vaccine.gia} đ</Text>
                </View>

                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}> Người tiêm ({dsNguoiTiem.length}):</Text>
                {dsNguoiTiem.map((nguoi, index) => (
                    <View key={index} style={{ marginBottom: 10, borderBottomWidth: 1, paddingBottom: 5 }}>
                        <Text>Họ tên: {nguoi.name}</Text>
                        <Text>Giới tính: {nguoi.gioiTinh}</Text>
                        <Text>Tuổi : {new Date().getFullYear() - new Date(nguoi.ngaySinh).getFullYear()}</Text>
                    </View>
                ))}

                {/* Tổng tiền */}
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tổng tiền: {tongTien.toLocaleString()} đ</Text>
                </View>

                <View style={[{ padding: 10 }]}>
                    <Text style={{ fontSize: 20, marginBottom: 8 }}>Ngày tiêm:</Text>
                    <TouchableOpacity onPress={() => setShowPicker(true)} style={{ padding: 10, borderWidth: 1, borderRadius: 5 }}>
                        <Text>{ngayTiem.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            value={ngayTiem}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowPicker(false);
                                if (selectedDate) {
                                    setNgayTiem(selectedDate)
                                }
                            }}
                            minimumDate={new Date()}
                        />
                    )}
                </View>
                <TouchableOpacity
                    onPress={() => { if (hopLe) xacNhanDangKy(); else Alert.alert("Có người tiêm chưa đủ tuổi") }}
                    style={{ marginTop: 20, backgroundColor: 'green', padding: 15, borderRadius: 8 }}
                >
                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }}>Xác nhận đăng ký</Text>
                </TouchableOpacity>
            </View>
        );
    }



    return (
        <View style={[{ paddingTop: 90, flex: 1 }]}>
            {local === 1 && (
                chonVc()
            )}
            {local === 2 && (
                addNguoiTiem()
            )}
            {local === 3 && (
                guiDangKy()
            )}
            <View style={[DangKyTiemStyle.chuyenTrang]}>
                <TouchableOpacity disabled={local === 1} style={[DangKyTiemStyle.buttonChuyenTrang, local === 1 && { backgroundColor: "#616161" }]}
                    onPress={() => setLocal(prev => prev - 1)}>
                    <Text style={[{ textAlign: "center", fontSize: 18 }]}>PREV</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={local === 3} style={[DangKyTiemStyle.buttonChuyenTrang, local === 3 && { backgroundColor: "#616161" }]}
                    onPress={() => setLocal(prev => prev + 1)}>
                    <Text style={[{ textAlign: "center", fontSize: 18 }]}>NEXT</Text>
                </TouchableOpacity>
            </View>
            {showDsVc && (
                <>
                    {/* Overlay */}
                    <TouchableOpacity style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }} onPress={() => setShowDsVc(false)} />

                    {/* Danh sách vaccine */}
                    <View style={{ position: 'absolute', top: 100, left: 0, right: 0, bottom: 0, height: 500, backgroundColor: "#cdcdcdc7", zIndex: 999 }}>
                        <TouchableOpacity onPress={() => setShowDsVc(false)} style={{ alignSelf: 'flex-end', padding: 10 }}>
                            <Icon name="xmark" size={20} />
                        </TouchableOpacity>

                        <FlatList
                            data={dsVaccine}
                            keyExtractor={(item) => item.maVaccine}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={VaccineLoaiStyle.item} onPress={() => {
                                    setVaccine(item);
                                    setShowDsVc(false);
                                }}>
                                    <View style={VaccineLoaiStyle.inf}>
                                        <Text style={VaccineLoaiStyle.text}>Tên: {item.tenVc}</Text>
                                        {item.loaiVaccine.tuoi !== 0 && <Text style={VaccineLoaiStyle.text}>Độ tuổi: {item.loaiVaccine.tuoi}</Text>}
                                        <Text style={VaccineLoaiStyle.text}>Loại: {item.loaiVaccine.tenLoai}</Text>
                                        <Text style={VaccineLoaiStyle.text}>Nguồn gốc: {item.nguonGoc}</Text>
                                    </View>
                                    <View style={{ justifyContent: "center" }}>
                                        <Text style={VaccineLoaiStyle.textGia}>{item.gia}đ</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            onEndReached={loadVaccine}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={loading && <Text>Đang tải thêm...</Text>}
                        />
                    </View>
                </>
            )}
        </View>
    )
};
export default DangKyTiem;