import React, { Children, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from "react-native";


import Home from './navigator/StackHome';
import DangKyTiem from './components/Home/HomeScreen/DangKyTiem';
import ScreenSetting from "./navigator/ScreenSetting";
import { TouchableOpacity } from "react-native";
import MyStyles from "./styles/MyStyles";



const Tab = createBottomTabNavigator();

const CustomButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={MyStyles.customButton} onPress={onPress}>
            <View style={MyStyles.innerCircle}>
                <Icon name="add-circle" color="#fff" size={35} />
            </View>
            <Text style={{ color: 'white', alignItems: "center", justifyContent: "center", fontSize: 12 }}>Đăng ký tiêm</Text>
        </TouchableOpacity>
    )
}

const Main = () => {

    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, tabBarActiveTintColor: '#fff', tabBarInactiveTintColor: '#fff', tabBarStyle: { backgroundColor: 'blue' } }}>
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({ color }) => <Icon name="home" color={color} size={28} />
            }}
                listeners={({ navigation }) => ({
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate('Home', {
                            screen: 'MainHome',
                        });
                    },
                })
                }
            />
            <Tab.Screen
                name="Đăng ký tiêm"
                component={DangKyTiem}
                options={{
                    tabBarButton: (props) => <CustomButton {...props} />,
                }}
            />
            <Tab.Screen
                name="Setting"
                component={ScreenSetting}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="settings" color={color} size={28} />,
                }}
                listeners={({ navigation }) => ({
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate('Setting', {
                            screen: 'Setting',
                        });
                    },
                })
                }

            />


        </Tab.Navigator>
    )
}


export default Main;