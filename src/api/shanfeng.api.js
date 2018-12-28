import axios from 'axios';

let dataServer = process.env.SHANFENG_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/shanfeng/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/shanfeng/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/shanfeng`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/shanfeng`, params); };

export const addData = params => { return axios.post(`${dataServer}/shanfeng`, params); };
