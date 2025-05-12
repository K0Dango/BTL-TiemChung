import React, { Children } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from "react-native";



import Home from './components/Home/Home';
import LichSu from './components/Home/LichSu';
import DangKyTiem from './components/Home/DangKyTiem';
import LienHe from './components/Home/LienHe';
import Setting from './components/Home/Setting';
import { TouchableOpacity } from "react-native";
import MyStyles from "./styles/MyStyles";



const Tab = createBottomTabNavigator();

const CustomButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={MyStyles.customButton} onPress={onPress}>
            <View style={MyStyles.innerCircle}>
                <Icon name="add-circle" color="#fff" size={35} />
            </View>
            <Text style={{ color: 'white', alignItems: "center", justifyContent: "center", fontSize: 12}}>Đăng ký tiêm</Text>
        </TouchableOpacity>
    )
}

const Main = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: true, tabBarActiveTintColor: '#fff', tabBarInactiveTintColor: '#fff', tabBarStyle: { backgroundColor: 'blue' } }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => <Icon name="home" color={color} size={28} />
            }} />
            <Tab.Screen name="Lịch sử" component={LichSu} options={{
                tabBarIcon: ({ color }) => <Icon name="history" color={color} size={28} />
            }} />
            <Tab.Screen
                name="Đăng ký tiêm"
                component={DangKyTiem}
                options={{
                    tabBarButton: (props) => <CustomButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Liên hệ"
                component={LienHe}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="contacts" color={color} size={28} />,
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="settings" color={color} size={28} />,
                }}
            />


        </Tab.Navigator>
    )
}


export default Main;