import axios from 'axios';

let dataServer = process.env.MANAGER_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/user/manager/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/user/manager/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/user/manager`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/user/manager`, params); };

export const addData = params => { return axios.post(`${dataServer}/user/manager`, params); };
