import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/admin/chef');
};

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/chef', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/chef/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.post(`/admin/chef/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/chef/${id}`)
}
