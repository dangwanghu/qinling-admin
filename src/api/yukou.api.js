import axios from 'axios';

let dataServer = process.env.YUKOU_BASE_URL;

export const getYuKouData = params => { return axios.get(`${dataServer}/yukou/list`, { params: params }); };