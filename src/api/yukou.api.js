import axios from 'axios';

let dataServer = '/yukouapi'

export const getYuKouData = params => { return axios.get(`${dataServer}/yukou/list`, { params: params }); };