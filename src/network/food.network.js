import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/admin/cook');
};


/* resource store */
export const store = async(data) => {
    return await privateRequest.post('admin/cook', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/cook/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/cook/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`admin/cook/${id}`)
}
