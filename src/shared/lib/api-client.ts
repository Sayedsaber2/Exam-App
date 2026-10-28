import axios from "axios";

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

// قبل ما أي طلب يخرج: لو في توكن، حطه في الهيدر تلقائيًا
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;   // الشكل اللي السويجر طلبه
    }
    return config;
});