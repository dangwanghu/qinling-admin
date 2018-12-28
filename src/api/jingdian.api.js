import axios from 'axios';

let dataServer = process.env.JINGDIAN_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/jingdian/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/jingdian/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/jingdian`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/jingdian`, params); };

export const addData = params => { return axios.post(`${dataServer}/jingdian`, params); };
