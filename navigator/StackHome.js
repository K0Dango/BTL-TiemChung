import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome6'


import Home from '../components/Home/Home';
import LichSu from '../components/Home/LichSu';
import LienHe from '../components/Home/LienHe';
import LoaiVaccine from '../components/Home/HomeScreen/LoaiVaccine';
import VaccineTL from '../components/Home/HomeScreen/VaccineTL';
import TuoiVaccine from '../components/Home/HomeScreen/TuoiVaccine';
import VaccineAge from '../components/Home/HomeScreen/VaccineAge';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import StackHomeStyle from "../styles/StackHomeStyle";


const Stack = createStackNavigator();

function LinkGioHang({ cartCount }) {
    const navigate = useNavigation();

    return (
        <TouchableOpacity>
            <View style={[StackHomeStyle.icon]}>
                <Icon name='cart-shopping' size={30} color="#fff" />
                {cartCount > 0 && (
                    <View style={[StackHomeStyle.number]}>
                        <Text style={[StackHomeStyle.textNumber]}>
                            {cartCount}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    )
}

const StackHome = () => {
    const [cartCount, setCartCount] = useState(3)

    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}
                listeners={({ navigation }) => ({
                    tabPress: e => {
                        e.preventDefault();
                        navigation.navigate('StackHome', {
                            screen: 'StackHome',
                        });
                    },
                })
                }
            />
            <Stack.Screen name="LichSu" component={LichSu} options={{ headerShown: true, headerTitle: "Lịch sử" }} />
            <Stack.Screen name="LienHe" component={LienHe} options={{ headerShown: true, headerTitle: "Liên hệ" }} />
            <Stack.Screen name="LoaiVC" component={LoaiVaccine} options={{
                headerShown: true, headerTitle: "Danh Sách Vaccine", headerStyle: {
                    backgroundColor: '#007bff'
                }, headerRight: () => <LinkGioHang cartCount={cartCount} />
            }}
            />
            <Stack.Screen name="VaccineTL" component={VaccineTL} options={{
                headerShown: true, headerTitle: "Danh Sách Vaccine", headerStyle: {
                    backgroundColor: '#007bff'
                }, headerRight: () => <LinkGioHang cartCount={cartCount} />
            }} />
            <Stack.Screen name="TuoiVaccine" component={TuoiVaccine} options={{
                headerShown: true, headerTitle: "Danh Sách Vaccine", headerStyle: {
                    backgroundColor: '#007bff'
                }, headerRight: () => <LinkGioHang cartCount={cartCount} />
            }} />
            <Stack.Screen name="VaccineAge" component={VaccineAge} options={{
                headerShown: true, headerTitle: "Danh Sách Vaccine", headerStyle: {
                    backgroundColor: '#007bff'
                }, headerRight: () => <LinkGioHang cartCount={cartCount} />
            }} />
        </Stack.Navigator>

    )
}
export default StackHome;