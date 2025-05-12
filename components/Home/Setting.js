import { View, Text } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useState } from "react";
import { Button, Icon, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';




const Login = () => {


    return (
        <View>
            <View>
                <View style={MyStyles.avatar}>

                </View>
                <View style={MyStyles.header}>

                </View>
            </View>
        </View>
    );
};

export default Login;
