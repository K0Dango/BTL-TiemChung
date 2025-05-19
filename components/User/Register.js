import { Button, Text, TextInput, RadioButton } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import { Image, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from "react-native-gesture-handler";
import { Alert } from "react-native";
import * as ImgPicker from 'expo-image-picker';
import Apis, { endpoints } from "../../config/Apis";







const Register = () => {

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: '',
        sdt: '',
        gioiTinh: 'NAM',
        ngaySinh: new Date(),
        diaChi: ''
    })


    const navigation = useNavigation();

    const [errors, setErrors] = useState({});

    const [showPicker, setShowPicker] = useState(false)

    const setState = (value, field) => {
        setUser({ ...user, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };

    const [showPass, setShowPass] = useState({
        pass: true,
        confirmPass: true
    })


    const setPass = (field) => {
        setShowPass(prev => ({ ...prev, [field]: !prev[field] }))
    }
    const DEFAULT_AVATAR = "https://res.cloudinary.com/dcjnoorcg/image/upload/v1747573415/OIP_tcdadj.jpg";

    const [avatar, setAvatar] = useState({ uri: DEFAULT_AVATAR });

    const pickAvatar = async () => {
        let { status } =
            await ImgPicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const r = await ImgPicker.launchImageLibraryAsync();
            if (!r.canceled)
                setAvatar(r.assets[0]);
        }
    }


    const updload = async () => {

        let form = new FormData();
        form.append('username', user.name)
        form.append('email', user.email)
        form.append('password', user.password)
        form.append('sdt', user.sdt)
        form.append('gioiTinh', user.gioiTinh)
        form.append('ngaySinh', user.ngaySinh.toISOString().split('T')[0]);
        form.append('diaChi', user.diaChi)

        if (avatar) {
            form.append('avatar', {
                uri: avatar.uri,
                name: avatar.fileName || 'avatar.jpg',
                type: avatar.mimeType || 'image/jpeg',
            });
        } else {
            form.append('avatar', DEFAULT_AVATAR);
            form.append('avatar', {
                uri: avatar.uri,
                name: avatar.fileName || 'avatar.jpg',
                type: avatar.mimeType || 'image/jpeg',
            });
        }

        try {
            setLoading(true);
            const res = await Apis.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            Alert.alert('Thành công', 'Đăng ký thành công');
            navigation.navigate('Login');
        } catch (err) {
            console.log("Ảnh được chọn:", avatar);

            console.log('Lỗi khác:', err.message);
            Alert.alert('Lỗi', 'Đăng ký thất bại');
        }
        finally {
            setLoading(false);
        }
    }


    const checkInf = async () => {
        const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
        const phoneRegex = /^0/;
        let setError = {};
        if (!user.name)
            setError.name = "Vui lòng nhập họ và tên";
        if (user.email) {
            if (!emailRegex.test(user.email)) {
                setError.email = "Email phải là @gmail.com và không chứa ký tự đặc biệt";
            }
            else {
                const exit = await checkEmail();
                if (exit) {
                    setError.email = "Email đã được dùng"
                }

            }
        }
        else
            setError.email = "Vui lòng nhập Email";
        if (user.password) {
            if (user.password.length < 8)
                setError.password = "Mật khẩu quá yếu"
        }
        else
            setError.password = "Vui lòng nhập mật khẩu";
        if (!user.confirm)
            setError.confirm = "Vui lòng xác nhận mật khẩu";


        if (user.password && user.confirm && user.password !== user.confirm) {
            setError.confirm = "Mật khẩu không khớp";
        }
        if (user.sdt) {
            if (!phoneRegex.test(user.sdt))
                setError.sdt = "Số điện thoại phải bắt đầu bằng 0";
            else if (user.sdt.length != 10)
                setError.sdt = "Số điện thoại không đúng định dạng"
            else {
                const exit = await checkSdt();
                if (exit)
                    setError.sdt = "Số điện thoại đã được đăng ký"
            }
        }
        else
            setError.sdt = "Vui lòng nhập số điện thoại";

        if (!user.gioiTinh)
            setError.gioiTinh = "Vui lòng chọn giới tính";
        if (new Date().getFullYear() - user.ngaySinh.getFullYear() < 18)
            setError.ngaySinh = "Chưa đủ 18 tuổi";
        if (!user.diaChi)
            setError.diaChi = "Vui lòng nhập địa chỉ";
        console.log("Bấm")
        console.log("Ảnh được chọn:", user.avatar);
        if (Object.keys(setError).length > 0) {
            setErrors(setError)
        } else {
            updload();
        }
    };

    const checkEmail = async () => {
        const res = await Apis.get(`api/check-email/?email=${user.email}`);
        return res.data.exits;
    }

    const checkSdt = async () => {
        const res = await Apis.get(`api/check-sdt/?sdt=${user.sdt}`)
        return res.data.exits
    }

    return (

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            <View style={MyStyles.container}>
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
                <Text style={[MyStyles.text_center, { backgroundColor: 'brown' }]}>ĐĂNG KÝ TÀI KHOẢN</Text>
                <View style={MyStyles.kc}>
                    <View>
                        <TextInput label='Họ và tên' value={user.name} onChangeText={t => setState(t, 'name')} error={!!errors.name} mode="outlined" />
                        {errors.name && <Text style={{ color: 'red' }}>{errors.name}</Text>}
                    </View>
                    <View style={MyStyles.kc}>
                        <TextInput label='Email' value={user.email} onChangeText={t => setState(t, 'email')} error={!!errors.email} autoCapitalize="none" mode="outlined" keyboardType="email-address" />
                        {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                    </View>
                    <View style={MyStyles.kc}>
                        <TextInput label='Mật khẩu' value={user.password} onChangeText={t => setState(t, 'password')} secureTextEntry={showPass.pass} error={!!errors.password} autoCapitalize="none" mode="outlined" right={<TextInput.Icon icon={showPass.pass ? 'eye' : 'eye-off'} onPress={() => setPass('pass')} />} />
                        {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
                    </View>
                    <View style={MyStyles.kc}>
                        <TextInput label='Xác nhận mật khẩu' value={user.confirm} onChangeText={t => setState(t, 'confirm')} secureTextEntry={showPass.confirmPass} error={!!errors.confirm} autoCapitalize="none" mode="outlined" right={<TextInput.Icon icon={showPass.confirmPass ? 'eye' : 'eye-off'}
                            onPress={() => setPass('confirmPass')} />} />
                        {errors.confirm && <Text style={{ color: 'red' }}>{errors.confirm}</Text>}
                    </View>
                    <View style={MyStyles.kc}>
                        <TextInput label='Số điện thoại' value={user.sdt} onChangeText={t => setState(t, 'sdt')} error={!!errors.sdt} mode="outlined" keyboardType="numeric" />
                        {errors.sdt && <Text style={{ color: 'red' }}>{errors.sdt}</Text>}
                    </View>
                    <View style={MyStyles.kc}>
                        <Text>Giới tính</Text>
                        <RadioButton.Group onValueChange={value => setState(value, 'gioiTinh')} value={user.gioiTinh} >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <RadioButton value="NAM" />
                                <Text>NAM</Text>
                                <RadioButton value="NỮ" />
                                <Text>NỮ</Text>
                                <RadioButton value="KHÁC" />
                                <Text>KHÁC</Text>
                            </View>
                        </RadioButton.Group>
                        {errors.gioiTinh && <Text style={{ color: 'red' }}>{errors.gioiTinh}</Text>}
                    </View>
                    <View style={MyStyles.kc}>
                        <Text style={{ marginBottom: 8 }}>Ngày sinh:</Text>
                        <TouchableOpacity onPress={() => setShowPicker(true)} style={{ padding: 10, borderWidth: 1, borderRadius: 5 }}>
                            <Text>{user.ngaySinh.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                                value={user.ngaySinh}
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
                    <View style={MyStyles.kc}>
                        <TextInput label="Địa chỉ" value={user.diaChi} onChangeText={t => setState(t, 'diaChi')} error={!!errors.diaChi} mode="outlined" />
                        {errors.diaChi && <Text style={{ color: 'red' }}>{errors.diaChi}</Text>}
                    </View>
                    <View style={{ alignItems: "center", marginTop: 10 }}>
                        {avatar ? <Image source={{ uri: avatar.uri }} style={{ width: 100, height: 100, borderWidth: 0.5, marginBottom: 5 }} /> : ""}
                        <TouchableOpacity style={{ padding: 5, borderWidth: 1, marginTop: 5, borderRadius: 5, width: 150, height: 30 }} onPress={() => pickAvatar()}>
                            <Text>Chọn ảnh đại diện</Text>
                        </TouchableOpacity>
                    </View>
                    <Button style={{ backgroundColor: 'red', marginTop: 20 }} disabled={loading} loading={loading} onPress={() => checkInf()}>Đăng ký
                    </Button>
                    <View style={[MyStyles.kc]}>
                        <Text style={{ textAlign: "center", fontSize: 16 }}>Hoặc đăng ký bằng</Text>
                    </View>

                </View>
            </View>
        </ScrollView>
    );
}

export default Register; 