import axios from "axios"

export const BASE_URL = 'http://192.168.1.8:8000/';

export const endpoints = {
    'register': 'api/user/',
    'login': 'o/token/',
    'check-email': 'api/check-email/',
    'check-sdt': 'api/check-sdt/',
    'current-user': 'api/current-user/',
    'check-pass': 'api/check-pass/',
    'change-password': 'api/change-password/',
    'update-info': 'api/update-info/',
    'loai-vaccine': 'api/loai-vaccine/',
    'vaccine': 'api/vaccine/',
    'vaccine-loai': 'api/vaccine/loai/',
    'vaccine-tuoi': 'api/vaccine/tuoi/',
    'gio-hang': 'api/gio-hang/',
    'nguoi-tiem': 'api/nguoi-tiem/',
    'don-tiem': 'api/don-tiem/',
    'dk-tiem': 'api/dk-tiem/',
}


export const authApis = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export default axios.create({
    baseURL: BASE_URL
});