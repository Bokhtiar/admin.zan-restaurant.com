import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/admin/popular');
};


/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/popular', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/popular/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/popular/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`admin/popular/${id}`)
}
