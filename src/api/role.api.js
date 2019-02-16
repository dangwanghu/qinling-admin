import axios from 'axios';

let dataServer = process.env.ROLE_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/user/role/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/user/role/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/user/role`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/user/role`, params); };

export const addData = params => { return axios.post(`${dataServer}/user/role`, params); };
