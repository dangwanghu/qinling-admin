import axios from 'axios';

let dataServer = process.env.DICT_BASE_URL;

export const getCountryData = params => { return axios.get(`${dataServer}/dict/quxian/list`, { params: params }); };

export const getTownData = params => { return axios.get(`${dataServer}/dict/xiangzhen/list`, { params: params }); };

export const getMenus = params => { return axios.get(`${dataServer}/dict/resource/list`, { params: params }); };