import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Home from './components/Home/Home';
import LichSu from './components/Home/LichSu';
import LienHe from './components/Home/LienHe';


const Stack = createStackNavigator();

const StackHome = () => {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="LichSu" component={LichSu} options={{ headerShown: true, headerTitle: "Lịch sử" }} />
            <Stack.Screen name="LienHe" component={LienHe} options={{ headerShown: true, headerTitle: "Liên hệ" }} />
        </Stack.Navigator>

    )
}
export default StackHome;