import axios from 'axios';

let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//获得设备相关接口
export const getEqupList = params => { return axios.get(`${base}/equip/list`, { params: params }); };
//新增设备接口
export const addEquip = params => { return axios.get(`${base}/equip/add`, { params: params }); };
//删除设备接口
export const removeEquip = params => { return axios.get(`${base}/equip/remove`, { params: params }); };
//批量删除设备
export const batchRemoveEquip = params => { return axios.get(`${base}/equip/batchremove`, { params: params }); };
//编辑设备
export const editEquip = params => { return axios.get(`${base}/equip/edit`, { params: params }); };
