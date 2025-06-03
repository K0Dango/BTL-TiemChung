import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from "react-native";
import {authApis, endpoints} from "../../../config/Apis"; 
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LichTiem = () => {
  const [lichTiem, setLichTiem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadLichTiem = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token')
      const res = await authApis(token).get(endpoints['don-tiem'] + "lichTiem/");
      setLichTiem(res.data);
    } catch (error) {
      console.error("Lỗi load lịch tiêm:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadLichTiem();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadLichTiem().finally(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.tenNguoiTiem}>Tên người tiêm: {item.nguoiTiem.name}</Text>
        <Text>Ngày tiêm: {item.ngayTiem}</Text>
        <Text>Tên vaccine: {item.donDangKy.vaccine.tenVc}</Text>
        <Text>Trạng thái: {item.trangThai === 1 ? "Chưa tiêm" : item.trangThai === 2 ? "Đã tiêm" : "Đã hủy"}</Text>
      </View>
    );
  };

  if (loading && lichTiem.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (lichTiem.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Không có lịch tiêm sắp tới.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={lichTiem}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ padding: 10 }}
    />
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
});

export default LichTiem;
