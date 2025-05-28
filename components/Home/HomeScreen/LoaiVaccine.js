import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react"
import Apis, { endpoints } from "../../../config/Apis"
import { ActivityIndicator, Alert, FlatList, View, Text, TouchableOpacity } from "react-native";
// import { loadLoaiVC, loadVaccine } from "../../../global";
import LoaiVcStyle from "../../../styles/LoaiVcStyle";

const LoaiVaccine = () => {
    const [loaiVC, setLoaiVC] = useState([]);

    const [q, setQ] = useState("");
    const [maLoai, setMaLoai] = useState("");
    const [page, setPage] = useState(endpoints['loai-vaccine']);

    const [loading, setLoading] = useState(false);
    const nav = useNavigation();

    const loadLoaiVC = async () => {
        console.log(page)
        if (!page || loading) return;
        try {
            setLoading(true)
            const res = await Apis.get(page);
            setLoaiVC(prev => [...prev, ...res.data.results])
            setPage(res.data.next)
        } catch (error) {
            console.error(error)
            Alert("Lỗi dữ liêu!\nVui lòng quay lại sao!!!")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadLoaiVC()
    }, [])

    return (
        <View style={[LoaiVcStyle.container]}>

            <FlatList data={loaiVC} keyExtractor={(item) => item.maLoai} renderItem={({ item }) => (
                <TouchableOpacity style={[LoaiVcStyle.item, {}]} onPress={() => {
                    nav.navigate("VaccineTL", { maLoai: item.maLoai })
                }}>
                    <Text style={[LoaiVcStyle.textItem]}>{item.tenLoai}</Text>
                </TouchableOpacity>
            )}
                onEndReached={loadLoaiVC}
                onEndReachedThreshold={0.2}
                ListFooterComponent={loading && <ActivityIndicator size='large' color='gey' />}
            />

        </View>
    )
}

export default LoaiVaccine;