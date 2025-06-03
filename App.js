import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { navigationRef } from './navigator/Navigation'

import Register from './components/User/Register';
import Login from './components/User/Login';
import Main from './Main'
import { CartProvider } from './global';






const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          children={() => (
            <CartProvider>
              <Main />
            </CartProvider>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
