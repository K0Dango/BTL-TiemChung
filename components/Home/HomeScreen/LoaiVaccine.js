import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react"
import Apis, { endpoints } from "../../../config/Apis"
import { ActivityIndicator, Alert, FlatList, View, Text, TouchableOpacity } from "react-native";
import { loadLoaiVC, loadVaccine } from "../../../global";
import LoaiVcStyle from "../../../styles/LoaiVcStyle";

const LoaiVaccine = () => {
    const [loaiVC, setLoaiVC] = useState([]);
    const [vaccine, setVaccine] = useState([]);

    const [q, setQ] = useState("");
    const [maLoai, setMaLoai] = useState("");
    const [page, setPage] = useState(1);

    const [loading, setLoading] = useState(false);
    const nav = useNavigation();


    useEffect(() => {
        const getData = async () => {
            console.log("1")

            let res = await loadLoaiVC();
            if (res)
                setLoaiVC(res)
            console.log("2")
            res = await loadVaccine();
            console.log("3")

            if (res)
                setVaccine(res)
            console.log(vaccine)
            console.log(loaiVC)
        }
        getData();
    }, [])

    return (
        <View style={[LoaiVcStyle.container]}>
            {loading ? (<ActivityIndicator size='large' color="grey" />) : (
                <FlatList data={loaiVC} keyExtractor={(item) => item.maLoai} renderItem={({ item }) => (
                    <TouchableOpacity style={[LoaiVcStyle.item, {}]}>
                        <Text style={[LoaiVcStyle.textItem]}>{item.tenLoai}</Text>
                    </TouchableOpacity>
                )} />
                // <FlatList data={vaccine} keyExtractor={(item) => item.maVaccine} renderItem={({ item }) => (
                //     <TouchableOpacity style={[LoaiVcStyle.item, {}]}>
                //         <Text style={[LoaiVcStyle.textItem]}>{item.tenVc}</Text>
                //         <Text style={[LoaiVcStyle.textItem]}>Quốc gia: {item.nguonGoc}</Text>
                //     </TouchableOpacity>

                // )} />
            )}
        </View>
    )
}

export default LoaiVaccine;