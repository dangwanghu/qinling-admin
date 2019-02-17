import axios from 'axios';

let dataServer = process.env.DICT_BASE_URL;

export const userLogin = params => { return axios.post(`${dataServer}/user/manager/login`, params); };

export const getDataListPage = params => { return axios.get(`${dataServer}/user/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/user/total`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/user`, params); };
