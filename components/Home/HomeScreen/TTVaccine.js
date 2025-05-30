import { TouchableOpacity, View, Text, ScrollView, Image } from "react-native"
import TTVaccineStyle from "../../../styles/TTVaccineStyle";


const TTVanccine = ({ route }) => {
    console.log(route)
    const { vaccine } = route.params;
    console.log("loaiVaccine:", vaccine.loaiVaccine)


    return (
        <View style={[TTVaccineStyle.container]}>
            <ScrollView>
                <View >
                    <View style={[TTVaccineStyle.image]}>
                        <Image
                            source={{ uri: 'https://5.imimg.com/data5/SELLER/Default/2024/2/391176852/KQ/ER/ZC/24119759/cervarix-500x500.jpg' }}
                            style={{ width: 100, height: 100 }}
                        />
                    </View>
                    <Text style={[TTVaccineStyle.text]}>Tên Vaccine: {vaccine.tenVc}</Text>
                    <Text style={[TTVaccineStyle.text]}>Loại Vaccine: {vaccine.loaiVaccine.tenLoai}</Text>
                    <Text style={[TTVaccineStyle.text]}>Số mũi cần tiêm: {vaccine.loaiVaccine.soMui}</Text>
                    <Text style={[TTVaccineStyle.text]}>Nguồn gốc: {vaccine.nguonGoc}</Text>
                    <Text style={[TTVaccineStyle.textGia]}>Giá: {vaccine.gia}đ</Text>
                    <View>
                        <View style={[TTVaccineStyle.nut]}>
                            <TouchableOpacity style={[TTVaccineStyle.nutGioHang]}>
                                <Text style={[{ fontSize: 20, color: "white" }]}>Thêm vào giỏ hàng</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[TTVaccineStyle.nutDKTiem]}>
                                <Text style={[{ fontSize: 20, color: "white" }]}>Đăng ký tiêm</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[TTVaccineStyle.text]}>Thông tin Vaccine:</Text>
                        <View style={[TTVaccineStyle.ttVc]}>
                            <Text style={[TTVaccineStyle.text]}>{vaccine.thongTin}</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
        </View>
    )

}
export default TTVanccine;