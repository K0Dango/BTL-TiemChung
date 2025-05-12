import { View, Text } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useState } from "react";
import { Button, Icon, TextInput } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from "react-native-gesture-handler";



const Login = () => {
    const [account, setAC] = useState({
        email: '',
        mk: '',
    });
    const navigation = useNavigation();

    const [showPass, setShowPass] = useState(true);

    const [errors, setErrors] = useState({});

    const setState = (value, field) => {
        setAC({ ...account, [field]: value });
        setErrors({ ...errors, [field]: '' });
    };



    const linkDK = () => {
        navigation.navigate('Register');
    }

    const succes = () => {
        alert("Đăng nhập thành công!");
        navigation.navigate('Main');
    }

    const checkAc = () => {
        const emailRegex = /^[a-zA-Z0-9]+@gmail\.com$/;
        const setError = {};
        if (account.email) {
            if (!emailRegex.test(account.email))
                setError.email = 'Email phải gồm @gmail.com'
        }
        else
            setError.email = 'Vui lòng nhập vào email'
        if (!account.mk)
            setError.mk = 'Vui lòng nhập Password'

        if (Object.keys(setError).length > 0)
            setErrors(setError);
        else
            succes();

    }

    return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
            <View style={MyStyles.container}>
                <Text style={[MyStyles.text_center, { fontSize: 30 }]}>Đăng nhập</Text>

                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>            
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>            
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>            
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>            
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>            
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>            
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>            
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'email')} label={'Email'} value={account.email} error={!!errors.email} keyboardType="email-address" mode="outlined" />
                    {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
                </View>
                <View style={MyStyles.kc}>
                    <TextInput
                        onChangeText={t => setState(t, 'mk')} label={'Mật khẩu'} value={account.mk} secureTextEntry={showPass} error={!!errors.mk} mode="outlined" right={<TextInput.Icon icon={showPass ? 'eye' : 'eye-off'} onPress={() => setShowPass(prev => !prev)} />} />
                    {errors.mk && <Text style={{ color: 'red' }}>{errors.mk}</Text>}
                </View>

                <Button style={{ marginTop: 30, backgroundColor: 'red' }} onPress={() => checkAc()}>Đăng nhập</Button>
            </View>
        </ScrollView>
    );
};

export default Login;
