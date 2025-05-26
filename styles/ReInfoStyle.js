import { StyleSheet } from "react-native";

export default StyleSheet.create({
    avatar: {
        borderRadius: 50,
        width: 100,
        height: 100,
        borderWidth: 1
    },
    reAvatar: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    icon: {
        position: "relative",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        borderRadius: 15, // phải là một nửa của width/height
    },
    input: {
        marginVertical: 10,
        

    },
})