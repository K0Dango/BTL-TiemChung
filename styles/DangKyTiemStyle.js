import { StyleSheet } from "react-native";

export default StyleSheet.create({
    viewVc: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10

    },
    viewChonVc: {
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#f7f7f9',
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 10
    },
    buttonVc: {
        backgroundColor: "#bababa",
        marginHorizontal: 'auto',
        width: '60%',
        padding: 10
    },
    text:{
        fontSize: 20
    }
    , textGia: {
        fontSize: 20,
        color: "blue"
    },
    chuyenTrang: {
        flexDirection: "row",
        justifyContent:"space-between",
        marginHorizontal: 30,
        marginVertical: 15
    },
    buttonChuyenTrang: {
        backgroundColor: "#1491bd",
        paddingHorizontal: 15
    },


})