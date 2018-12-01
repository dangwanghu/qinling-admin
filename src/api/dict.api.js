import axios from 'axios';

let dataServer = '/dictapi'

export const getCountryData = params => { return axios.get(`${dataServer}/dict/quxian/list`, { params: params }); };

export const getTownData = params => { return axios.get(`${dataServer}/dict/xiangzhen/list`, { params: params }); };