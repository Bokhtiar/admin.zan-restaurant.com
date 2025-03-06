import { Toastify } from "../components/toastify";


export const getToken = () => {
    return localStorage.getItem("restaurant-token");
}

/* set token */
export const setToken = (token) => {
    return localStorage.setItem("restaurant-token", token);
}

/* remove token */
export const removeToken = () => {
    return localStorage.removeItem("restaurant-token");
};

/* Global network error handeller */
export const networkErrorHandeller = (error) => {

    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.errors
    ) {
        error.response.data.errors.map((item) => {
            return Toastify.Error(item);
        });
    } else {
        return Toastify.Error("Something going wrong, Try again.");
    }
};