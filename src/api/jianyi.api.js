import axios from 'axios';
let dataServer = process.env.JIANYI_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/jianyi/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/jianyi/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/jianyi`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/jianyi`, params); };

export const addData = params => { return axios.post(`${dataServer}/jianyi`, { params: params }); };