import { useEffect, useState } from "react";
import { loadUser } from "../../../global";
import { Image, ScrollView, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Button, RadioButton, Text } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome6'
import MyStyle from "../../../styles/MyStyles"
import ReInfoStyle from "../../../styles/ReInfoStyle";
import { TextInput } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker'
import Apis, { endpoints } from "../../../config/Apis";
import * as ImgPicker from 'expo-image-picker';
import { ImagePickerIOS } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setting from "../Setting"


const ReInfo = ({ route, navigation }) => {
    const { linkLogOut } = route.params;

    const [userInfos, setUserInfo] = useState({
        name: '',
        email: '',
        sdt: '',
        gioiTinh: 'NAM',
        ngaySinh: new Date(),
        diaChi: '',
    });

    const [oldInfo, setOldInfo] = useState({
        email: '',
        sdt: ''
    })

    const [errors, setError] = useState({});

    const [showPicker, setShowPicker] = useState(false);

    const [loading, setLoading] = useState(false)

    const [avatar, setAvatar] = useState('')

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
                setAvatar(userData.avatar)
                setOldInfo({ email: userData.email, sdt: userData.sdt })

            }
            console.log(userInfos.avatar)

        }
        fetchUser();
    }, [])

    const pickAvatar = async () => {
        let { status } = await ImgPicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const r = await ImgPicker.launchImageLibraryAsync();
            if (!r.canceled)
                setAvatar(r.assets[0]);
        }
    }

    const checkEmail = async () => {
        const res = await Apis.get(endpoints['check-email'] + `?email=${userInfos.email}`);
        return res.data.exits;
    }

    const checkSdt = async () => {
        const res = await Apis.get(endpoints['check-sdt'] + `?sdt=${userInfos.sdt}`)
        return res.data.exits;
    }

    const check = async () => {
        const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
        const phoneRegex = /^0/;
        let error = {};
        if (!userInfos.name)
            error.name = "Chưa nhập tên"
        if (userInfos.email) {
            if (!emailRegex.test(userInfos.email))
                error.email = "Nhập email chưa đúng định dạng"
            else if (userInfos.email !== oldInfo.email) {
                const res = await checkEmail();
                if (res) {
                    error.email = "Email đã được dùng"
                }
            }
        }
        else
            errors.email = "Chưa nhập email"
        if (userInfos.sdt) {
            if (!phoneRegex.test(userInfos.sdt))
                error.sdt = "Số điện thoại chưa đúng định dạng"
            else if (userInfos.sdt.length < 10)
                error.sdt = "Số điện thoại chưa đủ số"
            else if (userInfos.sdt !== oldInfo.sdt) {
                const res = await checkSdt();
                if (res)
                    error.sdt = "Số điện thoại đã được dùng"
            }
        }
        else
            error.sdt = "Chưa nhập số điện thoại"

        if ((new Date().getFullYear() - userInfos.ngaySinh.getFullYear()) < 18)
            error.ngaySinh = "Chưa đủ 18 tuổi"
        if (!userInfos.diaChi)
            error.diaChi = "Chưa nhập địa chỉ"
        if (Object.keys(error).length > 0)
            setError(error);
        else {
            console.log("Thong tin")
            upload()
        }
    }

    const upload = async () => {


        setLoading(true)

        const token = await AsyncStorage.getItem('token');

        console.log(token);

        const formData = new FormData();
        formData.append('username', userInfos.name);
        formData.append('email', userInfos.email)
        formData.append('sdt', userInfos.sdt)
        formData.append('gioiTinh', userInfos.gioiTinh)
        formData.append('ngaySinh', userInfos.ngaySinh.toISOString().split('T')[0])
        formData.append('diaChi', userInfos.diaChi)
        if (avatar && typeof avatar !== 'string') {
            formData.append('avatar', {
                uri: avatar.uri,
                name: avatar.name || 'avatar.jpg',
                type: avatar.mimeType || 'image/jpeg',
            })
        }
        console.log(avatar)
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await Apis.patch(endpoints['update-info'], formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log('Cập nhật thành công', response.data);
            alert("Cập nhật thành công\nHãy đăng nhập lại!!!");
            if(linkLogOut){
                linkLogOut();
            }

        } catch (error) {
            console.error('Network request failed:', error);
        }
        finally {
            setLoading(false);
        }
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
                            {avatar ? <Image source={{ uri: avatar.uri || avatar }} style={[ReInfoStyle.avatar]} onPress={() => pickAvatar()} /> : ""}
                            <View style={[{ position: "absolute", bottom: 0, right: 0 }]}>
                                <TouchableOpacity style={[ReInfoStyle.icon]} onPress={() => pickAvatar()}>
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
                <Button style={[ReInfoStyle.input, { backgroundColor: "blue" }]} disabled={loading} loading={loading} onPress={() => check()}>Cập nhật thông tin</Button>
            </ScrollView>
        </View>
    )
}
export default ReInfo;