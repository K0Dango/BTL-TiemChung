import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';

import Setting from '../components/Home/Setting';
import RePass from '../components/Home/SettingScreen/RePass';
import ReInfo from '../components/Home/SettingScreen/ReInfo';

const Stack = createStackNavigator();

const ScreenSetting = () => {
    return (
        <Stack.Navigator initialRouteName='Setting'>
            <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
            <Stack.Screen name="RePass" component={RePass} options={{ headerTitle: "Đổi mật khẩu", headerTitleAlign: "center", headerStyle: { backgroundColor: '#138be3' }, headerTintColor: "fff" }} />
            <Stack.Screen name="ReInfo" component={ReInfo} options={{ headerTitle: "Cập nhật hồ sơ", headerTitleAlign: "center", headerStyle: { backgroundColor: '#138be3' }, headerTintColor: "fff" }} />
        </Stack.Navigator>
    )
}

export default ScreenSetting;