import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        marginHorizontal: 20,
        paddingBottom: 50
    },
    kc: {
        paddingTop: 10
    },
    text_center: {
        textAlign: "center",
        fontSize: 30
    },
    customButton: {
        top: -15,
        justifyContent: 'center',
        alignItems: 'center',
    }, innerCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 7,
    },
})