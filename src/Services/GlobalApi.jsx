import axios from 'axios';

export const key = "91f34c97e431459795327c785dd55d5f";

export const axiosInstance = axios.create({
    baseURL: 'https://api.rawg.io/api',
    timeout: 3000,
});
