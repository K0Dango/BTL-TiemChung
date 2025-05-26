import Header from "./HeaderStyle";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        ...Header.header,
        height: `${20}%`,
    }, avata: {
        ...Header.avatar,
        width: '100%',
        height: '100%',
        borderRadius: 99999,
    },
    userInfo: {
        ...Header.userInfo,
        height: `100%`,
        width: '100%',
    },
    touch: {
        marginHorizontal: 4,
        borderColor: "grey",
        marginVertical: 3,
    },
    viewTouch: {
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: "grey",
        height: 45,
        justifyContent: "center",
    },
    textTouch: {
        marginLeft: 5,
        fontSize: 20,
    },
    viewLH: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})