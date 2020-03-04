import axios from 'axios';

// axios.interceptors.request.use(
//     (config) => {
//         return auth.getUser().then((user) => {
//             if (user) {
//                 config.headers.Authorization = `Bearer ${user.access_token}`;
//             }

//             return config;
//         });
//     },

//     (error) => {
//         return Promise.reject(error);
//     },
// );

// axios.interceptors.response.use((response) => {
//     return response;
// }, (error) => {
//     if (error.response.status === 401) {
//         window.location.href = '/';
//     }
// });

const getFullUrl = (url) => {
    return axios.get(`${url}`);
};
const get = (url, apihost) => {
    return axios.get(`${apihost}${url}`);
};
const put = (url, apihost, json) => {
    return axios.put(`${apihost}${url}`, json);
};
const post = (url, apihost, json) => {
    return axios.post(`${apihost}${url}`, json);
};
export const apiCaller = {
    get,
    getFullUrl,
    put,
    post,
};