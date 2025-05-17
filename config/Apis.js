import axios from "axios"

const BASE_URL = 'http://192.168.1.11:8000/'

export const endpoints = {
    'register': 'api/user/',
    'login':'o/token/',
    'check-email': 'api/check-email'
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