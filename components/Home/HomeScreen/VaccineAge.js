import { useEffect, useState } from "react"
import Apis, { endpoints } from "../../../config/Apis";
import { FlatList, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import VaccineLoaiStyle from "../../../styles/VaccineLoaiStyle";
import { useNavigation } from "@react-navigation/native";


const VaccineAge = ({ route }) => {
    const { tuoi } = route.params;
    const [vaccine, setVaccine] = useState([]);

    const [q, setQ] = useState("")
    const [page, setPage] = useState(endpoints['vaccine-tuoi'] + `?tuoi=${tuoi}`)

    const [loading, setLoading] = useState(false)

    const nav = useNavigation()


    const loadVaccine = async () => {
        console.log(page)
        if (!page || loading) return;
        try {
            setLoading(true)
            const res = await Apis.get(page)
            console.log(res.data)

            setVaccine(prev => [...prev, ...res.data.results])
            setPage(res.data.next)
        } catch (error) {
            console.error(error)
            Alert("Lỗi dữ liêu!\nVui lòng quay lại sao!!!")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        loadVaccine()
    }, [])

    return (
        <View style={[VaccineLoaiStyle.container]}>
            <FlatList data={vaccine} keyExtractor={(item) => item.maVaccine} renderItem={({ item }) => (
                <TouchableOpacity style={[VaccineLoaiStyle.item]} onPress={() => { nav.navigate("TTVaccine", { vaccine: item }) }}>
                    <View style={[VaccineLoaiStyle.inf]}>

                        <Text style={[VaccineLoaiStyle.text, {}]}>Loại: {item.loaiVaccine.tenLoai}</Text>

                        <Text style={[VaccineLoaiStyle.text, {}]}>Tên: {item.tenVc}</Text>

                        <Text style={[VaccineLoaiStyle.text]}>Số lần tiêm: {item.loaiVaccine.soMui}</Text>

                        <Text style={[VaccineLoaiStyle.text]}>Nguồn gốc: {item.nguonGoc}</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <Text style={[VaccineLoaiStyle.textGia]}>{item.gia}đ</Text>
                    </View>
                </TouchableOpacity>
            )}
                onEndReached={loadVaccine}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loading && <ActivityIndicator size='large' color='gey' />}

            />
        </View>
    )
}
export default VaccineAge;