import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, Modal, TouchableOpacity, Button, ScrollView, } from "react-native";
import { BASE_URL, authApis, endpoints } from "../../../config/Apis";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


const LichSuTiem = () => {
    const [lichSuTiem, setLichSuTiem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const loadLichSuTiem = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");
            const res = await authApis(token).get(endpoints["don-tiem"] + "lichSuTiem/");
            setLichSuTiem(res.data);
        } catch (error) {
            console.error("Lỗi load lịch sử tiêm:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadLichSuTiem();
        }, [])
    );

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadLichSuTiem().finally(() => setRefreshing(false));
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => setSelectedItem(item)}>
            <Text style={styles.tenNguoiTiem}>Tên vaccine: {item.donDangKy?.vaccine?.tenVc}</Text>
            <Text>Người tiêm: {item.nguoiTiem?.name}</Text>
            <Text>Ngày tiêm: {item.ngayTiem}</Text>
            <Text>Trạng thái: {item.trangThai === 2 ? "Đã tiêm" : "Hủy tiêm"}</Text>
        </TouchableOpacity>
    );

    const closeModal = () => setSelectedItem(null);

    const taiGiayChungNhan = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (!selectedItem || selectedItem.trangThai === 3) return;
            const fileUri = FileSystem.documentDirectory + `giay_chung_nhan_${selectedItem.id}.pdf`;
            const url = `${BASE_URL}${endpoints['don-tiem']}${selectedItem.id}/giay-chung-nhan/`;
            console.log("BASE_URL:", BASE_URL);
            console.log("selectedItem:", selectedItem);
            console.log("selectedItem.id:", selectedItem?.id);
            console.log("URL tải PDF:", url);
            const res = await FileSystem.downloadAsync(
                url,
                fileUri,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log("res: ", res);


            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(res.uri);
            } else {
                Alert.alert("Tải thành công", "File đã được lưu vào thư mục app.");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Không thể tải giấy chứng nhận.");
        }
    };


    return (
        <View style={{ flex: 1 }}>
            {loading && lichSuTiem.length === 0 ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            ) : lichSuTiem.length === 0 ? (
                <View style={styles.center}>
                    <Text>Không có lịch sử tiêm.</Text>
                </View>
            ) : (
                <FlatList
                    data={lichSuTiem}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    contentContainerStyle={{ padding: 10 }}
                />
            )}

            {/* Modal hiển thị chi tiết */}
            <Modal visible={selectedItem !== null} transparent animationType="slide">
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        {selectedItem && (
                            <ScrollView>
                                <Text style={styles.modalTitle}>Thông tin chi tiết</Text>

                                <Text style={styles.sectionTitle}>Vaccine</Text>
                                <Text>- Tên: {selectedItem.donDangKy?.vaccine?.tenVc}</Text>
                                <Text>- Loại: {selectedItem.donDangKy?.vaccine?.loaiVaccine?.tenLoai}</Text>
                                <Text>- Thông tin: {selectedItem.donDangKy?.vaccine?.thongTin}</Text>

                                <Text style={styles.sectionTitle}>Người tiêm</Text>
                                <Text>- Họ tên: {selectedItem.nguoiTiem?.name}</Text>
                                <Text>- Ngày sinh: {selectedItem.nguoiTiem?.ngaySinh}</Text>
                                <Text>- Giới tính: {selectedItem.nguoiTiem?.gioiTinh}</Text>
                                <Text>- SĐT: {selectedItem.nguoiTiem?.sdt}</Text>
                                <Text>- Địa chỉ: {selectedItem.nguoiTiem?.diaChi}</Text>

                                <Text style={styles.sectionTitle}>Ngày tiêm: {selectedItem.ngayTiem}</Text>

                                <View style={styles.buttonContainer}>
                                    {selectedItem.trangThai === 2 && <Button title="Tải giấy chứng nhận" onPress={taiGiayChungNhan} color="#007AFF" />}
                                    <Button title="Đóng" onPress={closeModal} color="red" />
                                </View>
                            </ScrollView>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        backgroundColor: "#e6f0ff",
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
    },
    tenNguoiTiem: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 4,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    modalContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        maxHeight: "90%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    sectionTitle: {
        marginTop: 10,
        fontWeight: "bold",
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        gap: 10,
    },
});

export default LichSuTiem;
