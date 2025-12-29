import axios from "axios";

const api = axios.create({
baseURL: "http://localhost:4000"
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor לטיפול בשגיאות מהשרת
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // אם יש תגובה מהשרת עם הודעת שגיאה
        if (error.response?.data?.message) {
            const serverMessage = error.response.data.message;
            // יצירת שגיאה עם ההודעה מהשרת
            const customError = new Error(serverMessage);
            return Promise.reject(customError);
        }
        // אם אין הודעה מהשרת, נחזיר את השגיאה המקורית
        return Promise.reject(error);
    }
);

export default api;