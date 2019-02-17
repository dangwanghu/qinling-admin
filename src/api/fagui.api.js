import axios from 'axios';

let dataServer = process.env.FAGUI_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/fagui/list`, { params: params }); };
export const getDataTotal = params => { return axios.get(`${dataServer}/fagui/total`, { params: params }); };
export const editData = params => { return axios.put(`${dataServer}/fagui`, params); };
export const removeData = params => { return axios.delete(`${dataServer}/fagui`, { params: params }); };
export const addData = params => { return axios.post(`${dataServer}/fagui`, params); };