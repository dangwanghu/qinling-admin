import axios from 'axios';
let dataServer = process.env.JUBAO_BASE_URL;

export const getDataListPage = params => { return axios.get(`${dataServer}/jubao/list`, { params: params }); };
export const getDataTotal = params => { return axios.get(`${dataServer}/jubao/total`, { params: params }); };
export const removeData = params => { return axios.delete(`${dataServer}/jubao`, { params: params }); };
export const editData = params => { return axios.put(`${dataServer}/jubao`, params); };
export const addData = params => { return axios.post(`${dataServer}/jubao`, params); };