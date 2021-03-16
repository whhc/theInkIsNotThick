import Axios from 'axios';
import { Get, Post, Put } from './api';

const axios = Axios.create({
  timeout: 3000,
});

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const post: Post = async (url, data, config) => {
  const response = await axios.post(url, { ...data, ...config });
  return response.data;
};
const get: Get = async (url, params, config) => {
  const response = await axios.get(url, { ...params, ...config });
  return response.data;
};

const put: Put = async (url, data, config) => {
  const response = await axios.put(url, { ...data, ...config });
  return response.data;
};

export default { post, get, put };
