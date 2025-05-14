import { View, Text, TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import HeaderStyle from "../../styles/HeaderStyle";
import HomeStyle from "../../styles/HomeStyle";
import { useState } from "react";
import { Button, Icon, TextInput } from "react-native-paper";
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar } from 'react-native-paper';



const Home = () => {

    const [notifications, setNotifications] = useState(1);

    const [name, setName] = useState("Nguyen Huu")

    const navigation = useNavigation();

    const linkLichSu = () => {
        navigation.navigate("LichSu");
    }

    const linkLienHe = () => {
        navigation.navigate("LienHe")
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={HomeStyle.header}>
                <View style={HeaderStyle.userInfo}>
                    <Avatar.Image
                        size={50}
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                        style={HeaderStyle.avatar}
                    />
                    <View>
                        <Text>Chào mừng</Text>
                        <Text style={{ fontSize: 19 }}>{name} </Text>
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
                <View style={HomeStyle.viewItem}>
                    <TouchableOpacity style={HomeStyle.Touch}>
                        <View style={HomeStyle.item}>
                            <Icon1 name="category" size={60} color="blue" />
                            <Text style={HomeStyle.textItem}>Danh sách Vacxin</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={HomeStyle.Touch}>
                        <View style={HomeStyle.item}>
                            <FontAwesome5 name="syringe" size={60} color="blue" />
                            <Text style={HomeStyle.textItem}>Vacxin theo tuổi</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={HomeStyle.Touch}>
                        <View style={HomeStyle.item}>
                            <Icon1 name="list" size={60} color="blue" />
                            <Text style={HomeStyle.textItem}>Lịch tiêm</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={HomeStyle.Touch}>
                        <View style={HomeStyle.item}>
                            <Icon1 name="file-download" size={60} color="blue" />
                            <Text style={HomeStyle.textItem}>Tải giấy chứng nhận</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={HomeStyle.Touch} onPress={() => linkLichSu()}>
                        <View style={HomeStyle.item}>
                            <Icon1 name="contacts" size={60} color="blue" />
                            <Text style={HomeStyle.textItem}>Lịch sử tiêm</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={HomeStyle.Touch} onPress={() => linkLienHe()}>
                        <View style={HomeStyle.item}>
                            <Icon1 name="contacts" size={60} color="blue" />
                            <Text style={HomeStyle.textItem}>Liện hệ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;
