import axios from 'axios';
const isDev = process.env.NODE_ENV === 'development';
// 创建axios实例
const req = axios.create({
    baseURL: isDev ? "http://localhost:8080/api" : "http://124.71.143.225:8080/api",
    timeout: 5000, // 请求超时时间
    withCredentials: true
});
// 设置向后台发送请求时携带的cookie信息是
// req.defaults.withCredentials = true;
// 请求拦截器
req.interceptors.request.use(
    config => {
        // 可以在这里添加请求头等信息
        // 例如：config.headers['Authorization'] = 'Bearer your-token';
        return config;
    },
    error => {
        // 请求错误处理
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// 响应拦截器
req.interceptors.response.use(
    response => {
        // 对响应数据做处理，例如只返回data部分
            return response;
    },
    error => {
        // 对响应错误做处理
        console.log('err' + error); // for debug
        return Promise.reject(error);
    }
);

export default req;
