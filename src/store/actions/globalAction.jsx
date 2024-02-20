import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com/"
});

// Thunk 
export const fetchRoles = () => async (dispatch, getState) => {
    try {
        const { roles } = getState().global;
        if (roles.length > 0) {
            // roller varmı kontrol et
            return;
        }

        // Rolleri fetchle al
        const response = await axiosInstance.get("/roles");
        dispatch(setRoles(response.data));
    } catch (error) {
        console.error("Rolleri Alamıyorum.", error);
    }
};

export const setRoles = (roles) => ({
    type: 'SET_ROLES',
    payload: roles
});