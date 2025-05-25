import React, { useState } from "react";
import { Avatar, Button, TextInput } from 'react-native-paper';
import { View, Text, TouchableOpacity, Image } from "react-native";
import HeaderStyle from "../../../styles/HeaderStyle";
import { useNavigation } from '@react-navigation/native';
import { useEffect } from "react";
import { loadUser } from "../../../global";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Apis, { endpoints } from "../../../config/Apis";




const RePass = () => {

    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const [user, setUserData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await loadUser();
            if (userData) {
                setUserData(userData);
            }
        };
        fetchUser();
    }, []);


    const [errors, setError] = useState({});

    const [pass, setPass] = useState({
        oldPass: "",
        newPass: ""
    });

    const [showPass, setShowPass] = useState({
        oldPass: true,
        newPass: true
    });


    const state = (field) => {
        setShowPass(prev => ({ ...prev, [field]: !prev[field] }))
    }
    const setPassword = (value, field) => {
        setPass({ ...pass, [field]: value });
        setError({ ...errors, [field]: "" });
    }

    const [page, setPage] = useState(false);

    const checkOldPassword = async (password) => {
        console.log("1")
        console.log(password)

        const token = await AsyncStorage.getItem('token');
        console.log(`Bearer ${token}`)

        try {
            setLoading(true)
            const res = await Apis.post(endpoints['check-pass'],
                { old_pass: password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                        ,
                        Authorization: `Bearer ${token}`,

                    },
                }
            );
            console.log(res.data)

            if (res.data.valid) {
                return true
            }
        } catch (error) {
            // if (error.response) {
            //     console.error("Lỗi từ server:", error.response.data);
            //     console.error("Mã lỗi:", error.response.status);
            //     alert("Lỗi từ server: " + JSON.stringify(error.response.data));
            // } else if (error.request) {
            //     console.error("Không nhận được phản hồi từ server:", error.request);
            //     alert("Không thể kết nối đến máy chủ.");
            // } else {
            //     console.error("Lỗi khác:", error.message);
            //     alert("Lỗi kiểm tra: " + error.message);
            // }
            return false;
        }
        finally {
            setLoading(false)
        }
    };

    const changePassword = async (newPassword) => {
        const token = await AsyncStorage.getItem('token');
        try {
            setLoading(true)
            const response = await Apis.post(
                endpoints['change-password'],
                {
                    new_password: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response.data);
            alert("Đổi mật khẩu thành công!");
        } catch (error) {
            console.error("Lỗi đổi mật khẩu:", error.response?.data);
            alert(error.response?.data.detail || "Có lỗi xảy ra.");
        }
        finally {
            setLoading(false)
        }
    }

    const checkPass = async () => {
        if (!page) {
            if (pass.oldPass) {
                console.log("ddd", pass.oldPass)
                const kq = await checkOldPassword(pass.oldPass)
                if (kq) setPage(true);
                else {
                    setError({ ...errors, ["oldPass"]: "Mật khẩu không đúng" })
                }
            }
            else
                setError({ ...errors, ["oldPass"]: "Vui lòng nhập mật khẩu" })
        }
        else {
            if (pass.newPass) {
                console.log("ddd", pass.newPass)
                if (pass.newPass.length < 8)
                    setError({ ...errors, ["newPass"]: "Mật khẩu quá yếu" })
                else {
                    changePassword(pass.newPass)
                    navigation.navigate("Setting")
                }

            }
            else
                setError({ ...errors, ["newPass"]: "Vui lòng nhập mật khẩu" })
        }
    }


    console.log({ uri: user.avatar })
    return (

        <View>
            <View style={[HeaderStyle.header, { justifyContent: "flex-start" }]}>
                <View>
                    {user.avatar ? <Image source={{ uri: user.avatar }} style={HeaderStyle.avatar} /> : ""}
                </View>
                <View>
                    <Text>
                        {user.name}
                    </Text>
                    <Text>
                        {user.sdt}
                    </Text>
                </View>
            </View>
            {!page && (
                <View>
                    <View>
                        <TextInput label="Mật khẩu cũ" value={pass.oldPass} placeholder="Mật khẩu cũ" secureTextEntry={showPass.oldPass}
                            onChangeText={value => setPassword(value, 'oldPass')} autoCapitalize="none" mode="outlined" error={!!errors.oldPass} right={<TextInput.Icon icon={showPass.oldPass ? 'eye' : 'eye-off'} onPress={() => state("oldPass")} />} />
                        {errors.oldPass && <Text style={{ color: "red" }}>{errors.oldPass}</Text>}
                    </View>
                    <View>
                        <Button style={{ backgroundColor: "blue", marginTop: 10, color: "#fff" }} disabled={loading} loading={loading} onPress={() => checkPass()}>Xác nhận</Button>
                    </View>
                </View>
            )}
            {page && (
                <View>
                    <View>
                        <TextInput label="Mật khẩu mới" value={pass.newPass} placeholder="Mật khẩu mới" secureTextEntry={showPass.newPass}
                            onChangeText={value => setPassword(value, 'newPass')} autoCapitalize="none" mode="outlined" error={!!errors.newPass} right={<TextInput.Icon icon={showPass.newPass ? 'eye' : 'eye-off'} onPress={() => state("newPass")} />} />
                        {errors.newPass && <Text style={{ color: "red" }}>{errors.newPass}</Text>}
                    </View>
                    <View>
                        <Button style={{ backgroundColor: "blue", marginTop: 10, color: "#fff" }} disabled={loading} loading={loading} onPress={() => checkPass()}>Đổi mật khẩu</Button>

                    </View>
                </View>
            )}

        </View>
    )
}


export default RePass;