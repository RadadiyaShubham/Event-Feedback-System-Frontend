import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.envbasebackendurl}/api`,
});

// Add a request interceptor to set the Authorization header dynamically
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
