import axios from "axios"

const BASE_URL = 'http://192.168.1.13:8000/'

export const endpoints = {
    'register': 'api/user/',
    'login':'o/token/',
    'check-email': 'api/check-email',
    'check-sdt': 'api/check-sdt'
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