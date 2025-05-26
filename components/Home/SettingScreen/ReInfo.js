import { useEffect, useState } from "react";
import { loadUser } from "../../../global";
import { Image, ScrollView, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome6'
import MyStyle from "../../../styles/MyStyles"
import ReInfoStyle from "../../../styles/ReInfoStyle";
import { TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker'


const ReInfo = () => {

    const [userInfos, setUserInfo] = useState({
        name: '',
        email: '',
        sdt: '',
        gioiTinh: 'NAM',
        ngaySinh: new Date(),
        diaChi: '',
        avatar: ''
    });

    const [errors, setError] = useState({});

    const [showPicker, setShowPicker] = useState(false);

    const [loading, serLoading] = useState(false)

    const setState = (value, field) => {
        setUserInfo({ ...userInfos, [field]: value });
        setError({ ...errors, [field]: "" })
    }

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await loadUser();
            if (userData) {
                userData.ngaySinh = new Date(userData.ngaySinh)
                setUserInfo(userData)
            }
        }
        fetchUser();
    }, [])

    const check = () => {
        const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
        const phoneRegex = /^0/;
        let error = {};
        if (!userInfos.name)
            error.name = "Chưa nhập tên"
        if (userInfos.email) {
            if (!emailRegex.test(userInfos.email))
                error.email = "Nhập email chưa đúng định dạng"
        }
        else
            errors.email = "Chưa nhập email"
        if (userInfos.sdt) {
            if (!phoneRegex.test(userInfos.sdt))
                error.sdt = "Số điện thoại chưa đúng định dạng"
            else if (userInfos.sdt.length < 10)
                error.sdt = "Số điện thoại chưa đủ số"
        }
        else
            error.sdt = "Chưa nhập số điện thoại"

        if ((new Date().getFullYear() - userInfos.ngaySinh.getFullYear()) < 18)
            error.ngaySinh = "Chưa đủ 18 tuổi"
        if (!userInfos.diaChi)
            error.diaChi = "Chưa nhập địa chỉ"
        if (Object.keys(error).length > 0)
            setError(error);
        else
            alert("Thông tin hợp lệ")
    }

    return (
        <View style={[MyStyle.container]}>
            <ScrollView >
                <View>
                    {loading && (
                        <View style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            justifyContent: 'center', alignItems: 'center',
                            zIndex: 10
                        }}>
                            <ActivityIndicator size="large" color="#fff" />
                            <Text style={{ color: "#fff", marginTop: 10 }}>Đang xử lý...</Text>
                        </View>
                    )}
                    <View style={[ReInfoStyle.reAvatar]}>
                        <View>
                            {userInfos.avatar ? <Image source={{ uri: userInfos.avatar }} style={[ReInfoStyle.avatar]} /> : ""}
                            <View style={[{ position: "absolute", bottom: 0, right: 0 }]}>
                                <TouchableOpacity style={[ReInfoStyle.icon]}>
                                    <Icon name="pen" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={[ReInfoStyle.input]}>
                        <TextInput label="Họ và tên" value={userInfos.name} placeholder="Họ và tên" onChangeText={info => setState(info, 'name')} error={errors.name} mode="outlined" />
                        {errors.name && <Text style={[{ color: "red" }]}>{errors.name}</Text>}
                    </View>
                    <View style={[ReInfoStyle.input]}>
                        <TextInput label="Email" value={userInfos.email} placeholder="Họ và tên" onChangeText={info => setState(info, 'email')} error={errors.email} mode="outlined" autoCapitalize="none" keyboardType="email-address" />
                        {errors.email && <Text style={[{ color: "red" }]}>{errors.email}</Text>}
                    </View>
                    <View style={[ReInfoStyle.input]}>
                        <TextInput label="Số điện thoại" value={userInfos.sdt} placeholder="Số điện thoại" onChangeText={info => setState(info, 'sdt')} error={errors.sdt} mode="outlined" keyboardType="numeric" />
                        {errors.sdt && <Text style={[{ color: "red" }]}>{errors.sdt}</Text>}
                    </View>
                    <View style={[ReInfoStyle.input]}>
                        <Text>Giới tính</Text>
                        <RadioButton.Group onValueChange={value => setState(value, 'gioiTinh')} value={userInfos.gioiTinh} >
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
                    <View style={[ReInfoStyle.input]}>
                        <Text style={[{ marginBottom: 10 }]}>Ngày sinh</Text>
                        <TouchableOpacity onPress={() => setShowPicker(true)} style={{ padding: 10, borderWidth: 1, borderRadius: 5 }}>
                            <Text>{userInfos.ngaySinh.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                                value={userInfos.ngaySinh}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShowPicker(false);
                                    if (selectedDate) setState(selectedDate, 'ngaySinh');
                                }}
                                maximumDate={new Date()}
                            />
                        )}
                        {errors.ngaySinh && <Text style={{ color: 'red' }}>{errors.ngaySinh}</Text>}
                    </View>
                    <View style={[ReInfoStyle.input]}>
                        <TextInput label="Địa chỉ" value={userInfos.diaChi} onChangeText={info => setState(info, 'diaChi')} error={!!errors.diaChi} mode="outlined" />
                        {errors.diaChi && <Text style={{ color: 'red' }}>{errors.diaChi}</Text>}
                    </View>

                </View>
                <Button style={[ReInfoStyle.input, { backgroundColor: "blue" }]} disable={loading} loading={loading} onPress={() => check()}>Cập nhật thông tin</Button>
            </ScrollView>
        </View>
    )
}
export default ReInfo;