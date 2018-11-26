import axios from 'axios';

let base = '';
let dataServer = '/cunzhuangapi'

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getDataListPage = params => { return axios.get(`${dataServer}/cunzhuang/list`, { params: params }); };

export const getDataTotal = params => { return axios.get(`${dataServer}/cunzhuang/total`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };