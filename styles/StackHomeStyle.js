import { StyleSheet } from "react-native";

export default StyleSheet.create({
    icon: {
        position: "relative",
        marginRight: 25,
    },
    number: {
        backgroundColor: "red",
        borderRadius: 99,
        right: -7,
        bottom: -5,
        position: "absolute",
        width: 25,
        height: 25,
        justifyContent: "center",
        alignItems: "center",

    },
    textNumber: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',

    },
    backGrGioHang: {
        position: 'absolute',
        top: 90,  
        right: 10,
        backgroundColor: '#cdcdcd',
        padding: 10,
        borderRadius: 8,
        elevation: 5,
        zIndex: 999,
        width: '100%',
        padding: 25
    },
    touch: {
        // flexDirection: "row",
        backgroundColor: "#6c6c6c",
        padding: 10,
        marginVertical: 5
    },
    text:{
        fontSize: 20
    },
})