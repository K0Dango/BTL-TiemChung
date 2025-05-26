import { StyleSheet } from "react-native";
import Header from "./HeaderStyle";


export default StyleSheet.create({
    header: {
        ...Header.header,
        height: `12%`,
    },
    userInfo: {
        ...Header.userInfo,
        height: `130%`,
    },
    avata: {
        ...Header.avatar,
        height: `100%`,
        width: `100%`
    },
    Touch: {
        width: `25%`,
        height: '60%',
        marginLeft: 30,
        marginVertical: 7,
    },
    viewItem: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 20,
    },
    item: {
        flex: 1,

        alignItems: "center"

    },
    textItem: {
        textAlign: "center"
    }
})