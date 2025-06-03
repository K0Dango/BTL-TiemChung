import { View, Text, TouchableOpacity, Image } from "react-native";
import SettingStyle from "../../styles/SettingStyle";
import HeaderStyle from "../../styles/HeaderStyle";
import { useEffect, useState } from "react";
import { Button, Icon, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from "react-native-gesture-handler";
// import Clipboard from '@react-native-clipboard/clipboard';
import * as Clipboard from 'expo-clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser } from "../../global";

import { GlobalData } from "../../global";




const Login = () => {


    const [notifications, setNotifications] = useState(1);


    const navigation = useNavigation();

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

    const linkLogOut = async () => {
        await AsyncStorage.removeItem('token');
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        })
    }

    const linkRePass = () => {
        navigation.navigate("RePass");
    }

    const linkReInfo = () => {
        navigation.navigate("ReInfo", { linkLogOut: linkLogOut })
    }

    const copyToClipboard = (text) => {
        Clipboard.setStringAsync(text);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={SettingStyle.header}>
                <View style={SettingStyle.userInfo}>
                    <View style={[{ width: '30%', height: `100%`, aspectRatio: 1, }]}>
                        {user.avatar ? <Image source={{ uri: user.avatar }} style={[SettingStyle.avata]} /> : ""}
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 22 }}>{user.name} </Text>
                        <Text>Tuổi {new Date().getFullYear() - new Date(user.ngaySinh).getFullYear()}</Text>
                    </View>

                </View>
                {/* <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={HeaderStyle.notificationIcon}>
                        <Icon1 name="notifications" size={35} color="white" />
                        {notifications > 0 && (
                            <View style={HeaderStyle.notificationBadge}>
                                <Text style={HeaderStyle.notificationText}>{notifications}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View> */}
            </View>
            <ScrollView>
                <View>
                    <TouchableOpacity style={SettingStyle.touch} onPress={() => linkReInfo()} >
                        <View style={SettingStyle.viewTouch}>
                            <Text style={SettingStyle.textTouch}>Chỉnh sửa thông tin</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch} onPress={() => linkRePass()}>
                        <View style={SettingStyle.viewTouch}>
                            <Text style={SettingStyle.textTouch}>Đổi mật khẩu</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch} onPress={() => linkLogOut()}>
                        <View style={SettingStyle.viewTouch}>
                            <Text style={SettingStyle.textTouch}>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={[{ marginLeft: 5, marginVertical: 7, fontSize: 25 }]}>Thông tin liên hệ</Text>
                    <TouchableOpacity style={SettingStyle.touch} onPress={() => copyToClipboard(GlobalData.sdt1)}>
                        <View style={[SettingStyle.viewTouch, SettingStyle.viewLH]}>
                            <Text style={SettingStyle.textTouch}>Số điện thoại 1</Text>
                            <Text style={[SettingStyle.textTouch, { color: "blue" }]}>{GlobalData.sdt1}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch} onPress={() => copyToClipboard(GlobalData.sdt2)}>
                        <View style={[SettingStyle.viewTouch, SettingStyle.viewLH]}>
                            <Text style={SettingStyle.textTouch}>Số điện thoại 2</Text>
                            <Text style={[SettingStyle.textTouch, { color: "blue" }]}>{GlobalData.sdt2}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch} onPress={() => copyToClipboard(GlobalData.email1)}>
                        <View style={[SettingStyle.viewTouch, SettingStyle.viewLH]}>
                            <Text style={SettingStyle.textTouch}>Email 1</Text>
                            <Text style={[SettingStyle.textTouch, { color: "blue" }]}>{GlobalData.email1}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch} onPress={() => copyToClipboard(GlobalData.email2)}>
                        <View style={[SettingStyle.viewTouch, SettingStyle.viewLH]}>
                            <Text style={SettingStyle.textTouch}>Email 2</Text>
                            <Text style={[SettingStyle.textTouch, { color: "blue" }]}>{GlobalData.email2}</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={[{ marginLeft: 5, marginVertical: 7, fontSize: 25 }]}>Thông tin chính sách</Text>
                    <TouchableOpacity style={SettingStyle.touch} >
                        <View style={SettingStyle.viewTouch}>
                            <Text style={SettingStyle.textTouch}>Điều khoản dịch vụ</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch} >
                        <View style={SettingStyle.viewTouch}>
                            <Text style={SettingStyle.textTouch}>Chính sách quyền riêng tư</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ textAlign: "center" }}>Phiên bản 1.0</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Login;
