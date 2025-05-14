import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Setting from './components/Home/Setting';

const Stack = createStackNavigator();

const ScreenSetting = () => {
    return (
        <Stack.Navigator initialRouteName='Setting'>
            <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default ScreenSetting;