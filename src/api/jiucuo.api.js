import axios from 'axios';
let dataServer = process.env.JIUCUO_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/jiucuo/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/jiucuo/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/jiucuo`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/jiucuo`, params); };