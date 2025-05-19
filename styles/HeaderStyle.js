import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#138be3',
        borderBottomWidth: 3,
        borderBottomColor: '#ddd',
    },
    userInfo: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 10,
        borderRadius: 50,
        width: 30,
        height: 30,
    },
    notificationBadge: {
        position: 'absolute',
        top: -5,
        right: -3,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }, notificationIcon: {
        right: -5,
    }
})