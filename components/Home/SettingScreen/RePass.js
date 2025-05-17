import React, { useState } from "react";
import { Avatar, Button, TextInput } from 'react-native-paper';
import { View, Text, TouchableOpacity } from "react-native";
import HeaderStyle from "../../../styles/HeaderStyle";
import { useNavigation } from '@react-navigation/native';




const RePass = () => {

    const navigation = useNavigation();
    const [user, setUser] = useState({
        name: "Nguyen Huu",
        sdt: "0000000",
        pass: ""
    });


    const [errors, setError] = useState({});

    const [pass, setPass] = useState({
        oldPass: "",
        newPass: ""
    });

    const [showPass, setShowPass] = useState({
        oldPass: true,
        newPass: true
    });


    const state = (field) => {
        setShowPass(prev => ({ ...prev, [field]: !prev[field] }))
    }
    const setPassword = (value, field) => {
        setPass({ ...pass, [field]: value });
        setError({ ...errors, [field]: "" });
    }

    const [page, setPage] = useState(false);

    const checkPass = () => {
        if (!page) {
            if (pass.oldPass) {
                alert(pass.oldPass);
                setPage(true)
            }
            else
                setError({ ...errors, ["oldPass"]: "Vui lòng nhập mật khẩu" })
        }
        else {
            if (pass.newPass) {
                alert("Cập nhật thành công");
                navigation.navigate("Setting")
            }
            else
                setError({ ...errors, ["newPass"]: "Vui lòng nhập mật khẩu" })
        }
    }



    return (

        <View>
            <View style={HeaderStyle.header}>
                <View>
                    <Avatar.Image
                        size={50}
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                        style={HeaderStyle.avatar}
                    />
                    <View>
                        <Text>
                            {user.name}
                        </Text>
                        <Text>
                            {user.sdt}
                        </Text>
                    </View>
                </View>
            </View>
            {!page && (
                <View>
                    <View>
                        <TextInput label="Mật khẩu cũ" value={pass.oldPass} placeholder="Mật khẩu cũ" secureTextEntry={showPass.oldPass}
                            onChangeText={value => setPassword(value, 'oldPass')} mode="outlined" error={!!errors.oldPass} right={<TextInput.Icon icon={showPass.oldPass ? 'eye' : 'eye-off'} onPress={() => state("oldPass")} />} />
                        {errors.oldPass && <Text style={{ color: "red" }}>{errors.oldPass}</Text>}
                    </View>
                    <View>
                        <Button style={{ backgroundColor: "blue", marginTop: 10, color: "#fff" }} onPress={() => checkPass()}>Xác nhận</Button>
                    </View>
                </View>
            )}
            {page && (
                <View>
                    <View>
                        <TextInput label="Mật khẩu mới" value={pass.newPass} placeholder="Mật khẩu mới" secureTextEntry={showPass.newPass}
                            onChangeText={value => setPassword(value, 'newPass')} mode="outlined" error={!!errors.newPass} right={<TextInput.Icon icon={showPass.newPass ? 'eye' : 'eye-off'} onPress={() => state("newPass")} />} />
                        {errors.newPass && <Text style={{ color: "red" }}>{errors.newPass}</Text>}
                    </View>
                    <View>
                        <Button style={{ backgroundColor: "blue", marginTop: 10, color: "#fff" }} onPress={() => checkPass()}>Đổi mật khẩu</Button>

                    </View>
                </View>
            )}

        </View>
    )
}


export default RePass;