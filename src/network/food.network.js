import { privateRequest } from '../config/axios.config'

/* list of resource */
export const index = async () => {
    return await privateRequest.get('/admin/food');
};

/* parent category list */
export const parentList = async() => {
    return await privateRequest.get('/admin/food/parent')
}

/* resource store */
export const store = async(data) => {
    return await privateRequest.post('/admin/food', data)
}

/* resource show */
export const show = async(id) => {
    return await privateRequest.get(`/admin/food/${id}`)
}

/* reosurce update */
export const update = async(id, data) => {
    return await privateRequest.put(`/admin/food/${id}`, data)
}

/* resource destory */
export const destroy = async (id) => {
    return await privateRequest.delete(`/admin/food/${id}`)
}
