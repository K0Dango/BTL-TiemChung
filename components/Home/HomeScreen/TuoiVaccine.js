import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import Apis, { endpoints } from "../../../config/Apis"
import { Alert, FlatList, Text, View, TouchableOpacity, ActivityIndicator } from "react-native"
import LoaiVcStyle from "../../../styles/LoaiVcStyle"


const TuoiVaccine = () => {

    const [loaiVc, setLoaiVc] = useState([])

    const [page, setPage] = useState(endpoints['loai-vaccine'])

    const [loading, setLoading] = useState(false)
    const nav = useNavigation()

    const loadTuoiVC = async () => {
        if (!page || loading) return;
        try {
            setLoading(true)
            const res = await Apis.get(page)
            console.log(res.data.results)
            setLoaiVc(prev => [...prev, ...res.data.results])
            setPage(res.data.next)
        } catch (error) {
            console.error(error)
            Alert("Lỗi dữ liêu!\nVui lòng quay lại sao!!!")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadTuoiVC()

    }, [])

    const tuoiVc = Array.from(new Set(loaiVc.map(vc => vc.tuoi))).sort((a, b) => a - b)

    return (
        <View style={[LoaiVcStyle.container]}>
            <FlatList data={tuoiVc} keyExtractor={(item) => item} renderItem={({ item }) => (
                <TouchableOpacity style={[LoaiVcStyle.item, {}]} onPress={() => {nav.navigate("VaccineAge", {tuoi: item})}}>
                    {item === 0 ? (<Text style={[LoaiVcStyle.textItem]}>Vaccine không cần tuổi</Text>) : (<Text style={[LoaiVcStyle.textItem]}>Vaccine {item} tuổi</Text>)}
                </TouchableOpacity>
            )}
                onEndReached={loadTuoiVC}
                onEndReachedThreshold={0.2}
                ListFooterComponent={loading && <ActivityIndicator size='large' color='gray' />}
            />
        </View>
    )
}
export default TuoiVaccine;