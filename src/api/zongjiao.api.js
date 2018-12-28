import axios from 'axios';

let dataServer = process.env.ZONGJIAO_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/simiao/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/simiao/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/simiao`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/simiao`, params); };

export const addData = params => { return axios.post(`${dataServer}/simiao`, params); };
