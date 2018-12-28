import axios from 'axios';

let dataServer = process.env.YUKOU_BASE_URL;

export const getYuKouData = params => { return axios.get(`${dataServer}/yukou/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/yukou/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/yukou`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/yukou`, params); };

export const addData = params => { return axios.post(`${dataServer}/yukou`, params); };
