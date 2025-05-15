import { Avatar } from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TouchableOpacity } from "react-native";
import HeaderStyle from "../../styles/HeaderStyle";
import { useState } from "react";

const Header = () => {

    const [notifications, setNotifications] = useState(1);

    const [name, setName] = useState("Nguyen Huu")

    const [age, setAge] = useState(18);

    return(
            <View style={HeaderStyle.header}>
                <View style={HeaderStyle.userInfo}>
                    <Avatar.Image
                        size={70}
                        source={{ uri: 'https://randomuser.me/api/portraits/men/75.jpg' }}
                        style={HeaderStyle.avatar}
                    />
                    <View>
                        <Text style={{ fontSize: 19 }}>{name} </Text>
                        <Text>Tuổi {age}</Text>
                    </View>

                </View>
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={HeaderStyle.notificationIcon}>
                        <Icon1 name="notifications" size={30} color="white" />
                        {notifications > 0 && (
                            <View style={HeaderStyle.notificationBadge}>
                                <Text style={HeaderStyle.notificationText}>{notifications}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
    )
}

export default Header;