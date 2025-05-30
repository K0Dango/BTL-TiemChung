import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Apis, { endpoints } from "./config/Apis";


export const GlobalData = {
    sdt1: "00000000",
    sdt2: "00000001",
    email1: "gmail1@gmail.com",
    email2: "gmail2@gmail.com",
}

export const loadUser = async () => {
    try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            return {
                name: user.username,
                email: user.email,
                password: user.password,
                sdt: user.sdt,
                gioiTinh: user.gioiTinh,
                diaChi: user.diaChi,
                ngaySinh: user.ngaySinh,
                avatar: user.avatar
            };
        }
        return null;
    } catch (error) {
        console.error("Không thể load thông tin người dùng:", error);
        return null;
    }
};



export const loadLoaiVC = async () => {
    const [page, setPage] = useState(endpoints['loai-vaccine'])
    if (!page) return;
    else {
        try {
            let res = await Apis.get(endpoints['loai-vaccine']);
            setPage(res.data.next)
            return res.data.results
        }
        catch (error) {
            console.error(error)
            return null
        }
    }
}



export const loadVaccine = async () => {
    try {
        console.log("4")
        let res = await Apis.get(endpoints['vaccine']);
        console.log(res.data)

        return res.data.results
    }
    catch (error) {
        console.error(error)
        return null
    }
}