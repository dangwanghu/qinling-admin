import axios from 'axios';

let base = '';
let dataServer = '/cunzhuangapi'

export const getDataListPage = params => { return axios.get(`${dataServer}/cunzhuang/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/cunzhuang/total`, { params: params }); };

export const removeData = params => { return axios.delete(`${dataServer}/cunzhuang`, { params: params }); };

export const editData = params => { return axios.put(`${dataServer}/cunzhuang`, params); };

export const addData = params => { return axios.post(`${dataServer}/cunzhuang`, params); };