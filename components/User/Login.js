import { View, Text, ActivityIndicator } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useEffect, useState } from "react";
import { Button, Icon, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser } from "../../global";
import Apis, { authApis, endpoints } from "../../config/Apis";

// const BASE_URL = 'http://192.168.1.19:8000';


const Login = () => {
    const [account, setAC] = useState({
        email: '',
        mk: '',
    });

    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const [showPass, setShowPass] = useState(true);

    const [errors, setErrors] = useState({});

    const setState = (value, field) => {
        setAC({ ...account, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };



    const linkDK = () => {
        navigation.navigate('Register');
    }



    const checkAc = async () => {
        const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
        const setError = {};
        if (account.email) {
            if (!emailRegex.test(account.email))
                setError.email = 'Email phải gồm @gmail.com'
        }
        else
            setError.email = 'Vui lòng nhập vào email'
        if (!account.mk)
            setError.mk = 'Vui lòng nhập Password'

        if (Object.keys(setError).length > 0)
            setErrors(setError);
        else {
            try {
                setLoading(true)
                const res = await Apis.post(endpoints['login'], {
                    grant_type: 'password',
                    username: account.email,
                    password: account.mk,
                    client_id: 'lnP1Otcfby08GEaLu4m1Doo9ZmjqirzPR95zgP5Q',
                    client_secret: 'FMZxyl1KIt83p1dLFH0OryyaW77NkG0PTogv7N9aUFbFWPHqNv1D793r59JQDS0mO7PQ08LSZMvDxuhF1hvPDsxAa8pP6ueoLRfuRNflSxQHuyWDODZS38ccEMEqrFTF'
                }, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                console.log('Login response:', res.data);
                const { access_token } = res.data;

                const userRes = await authApis(res.data.access_token).get(endpoints['current-user'])
                const user = userRes.data;
                console.log("User loaded from AsyncStorage:", user);

                await AsyncStorage.setItem('token', access_token);
                await AsyncStorage.setItem('user', JSON.stringify(user));

                // alert('Đăng nhập thành công!');
                // useEffect(() => {
                //     const fetchUser = async () => {
                //         const userData = await loadUser()
                //     }
                //     fetchUser()
                // }, []);
                console.log('Token:', access_token);
                navigation.navigate('Main');

            } catch (err) {
                setErrors({ email: "Sai email hoặc mật khẩu", mk: " " })
                console.log('Login error:', err.response?.data || err.message);

            }
            finally {
                setLoading(false)
            }
        }

    }

    return (

        <View style={[MyStyles.container, { marginTop: 30 }]}>
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
            <View style={[MyStyles.container]}>
                <Text style={[MyStyles.text_center, { fontSize: 30 }]}>Đăng nhập</Text>

                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" autoCapitalize="none" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>

                <View style={[MyStyles.kc]}>
                    <TextInput
                        onChangeText={t => setState(t, 'mk')} label={'Mật khẩu'} value={account.mk} secureTextEntry={showPass} error={!!errors.mk} autoCapitalize="none" mode="outlined" right={<TextInput.Icon icon={showPass ? 'eye' : 'eye-off'} onPress={() => setShowPass(prev => !prev)} />} />
                    {errors.mk && <Text style={{ color: 'red' }}>{errors.mk}</Text>}
                </View>

                <Button style={{ marginTop: 30, backgroundColor: 'red' }} disabled={loading} loading={loading} onPress={() => checkAc()}>Đăng nhập</Button>

                <View style={[MyStyles.kc]}>
                    <Text style={{ textAlign: "center", fontSize: 16 }}>Đăng nhập bằng</Text>
                </View>
                <View style={[MyStyles.kc]}>
                    <Text style={{ textAlign: "center", fontSize: 20, textDecorationLine: "underline", color: "blue" }} onPress={() => linkDK()}>Đăng ký</Text>
                </View>
            </View>
        </View>
    );
};

export default Login;
