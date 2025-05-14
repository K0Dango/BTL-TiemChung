import { View, Text, TouchableOpacity } from "react-native";
import SettingStyle from "../../styles/SettingStyle";
import HeaderStyle from "../../styles/HeaderStyle";
import { useState } from "react";
import { Button, Icon, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from "react-native-gesture-handler";




const Login = () => {


    const [notifications, setNotifications] = useState(1);

    const [name, setName] = useState("Nguyen Huu")

    const [age, setAge] = useState(18);

    const navigation = useNavigation();

    const linkLogOut = () => {
        navigation.reset({
            index:0,
            routes: [{name: "Login"}]
        })
    }

    return (
        <View style={{ height: `${100}%` }}>
            <View style={SettingStyle.header}>
                <View style={HeaderStyle.userInfo}>
                    <Avatar.Image
                        size={90}
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                        style={SettingStyle.avatar}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={{ fontSize: 22 }}>{name} </Text>
                        <Text>Tuổi {age}</Text>
                    </View>

                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={HeaderStyle.notificationIcon}>
                        <Icon1 name="notifications" size={30} color="white" />
                        {notifications > 0 && (
                            <View style={HeaderStyle.notificationBadge}>
                                <Text style={HeaderStyle.notificationText}>{notifications}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View>
                    <TouchableOpacity style={SettingStyle.touch} >
                        <View style={SettingStyle.viewTouch}>
                            <Text style={SettingStyle.textTouch}>Chỉnh sửa thông tin</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch} >
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
                    <TouchableOpacity style={SettingStyle.touch}>
                        <View style={[SettingStyle.viewTouch, SettingStyle.viewLH]}>
                            <Text style={SettingStyle.textTouch}>Số điện thoại 1</Text>
                            <Text style={[SettingStyle.textTouch, { color: "blue" }]}>0000000000</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch}>
                        <View style={[SettingStyle.viewTouch, SettingStyle.viewLH]}>
                            <Text style={SettingStyle.textTouch}>Số điện thoại 2</Text>
                            <Text style={[SettingStyle.textTouch, { color: "blue" }]}>0000000000</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch}>
                        <View style={[SettingStyle.viewTouch, SettingStyle.viewLH]}>
                            <Text style={SettingStyle.textTouch}>Email 1</Text>
                            <Text style={[SettingStyle.textTouch, { color: "blue" }]}>abc123@gmail.com</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={SettingStyle.touch}>
                        <View style={[SettingStyle.viewTouch, SettingStyle.viewLH]}>
                            <Text style={SettingStyle.textTouch}>Email 2</Text>
                            <Text style={[SettingStyle.textTouch, { color: "blue" }]}>abc123@gmail.com</Text>
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
