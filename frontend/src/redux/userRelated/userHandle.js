import axiosInstance from '../../api/axiosInstance';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axiosInstance.post(`/${role}Login`, fields);
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        let errorMessage = error.response?.data?.message || error.message;
        if (Array.isArray(error.response?.data?.errors)) {
            errorMessage = error.response.data.errors.map(err => err.msg).join('\n');
        } else if (Array.isArray(error.response?.data)) {
            errorMessage = error.response.data.map(err => err.msg).join('\n');
        }
        dispatch(authError(errorMessage));
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axiosInstance.post(`/${role}Reg`, fields);
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else if (result.data.school) {
            dispatch(stuffAdded());
        }
        else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        let errorMessage = error.response?.data?.message || error.message;
        if (Array.isArray(error.response?.data?.errors)) {
            errorMessage = error.response.data.errors.map(err => err.msg).join('\n');
        } else if (Array.isArray(error.response?.data)) {
            errorMessage = error.response.data.map(err => err.msg).join('\n');
        }
        dispatch(authError(errorMessage));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axiosInstance.get(`/${address}/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        let errorMessage = error.response?.data?.message || error.message;
        if (Array.isArray(error.response?.data?.errors)) {
            errorMessage = error.response.data.errors.map(err => err.msg).join('\n');
        } else if (Array.isArray(error.response?.data)) {
            errorMessage = error.response.data.map(err => err.msg).join('\n');
        }
        dispatch(getError(errorMessage));
    }
}

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axiosInstance.delete(`/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getDeleteSuccess());
        }
    } catch (error) {
        let errorMessage = error.response?.data?.message || error.message;
        if (Array.isArray(error.response?.data?.errors)) {
            errorMessage = error.response.data.errors.map(err => err.msg).join('\n');
        } else if (Array.isArray(error.response?.data)) {
            errorMessage = error.response.data.map(err => err.msg).join('\n');
        }
        dispatch(getError(errorMessage));
    }
}

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axiosInstance.put(`/${address}/${id}`, fields);
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(authSuccess(result.data)); // Dispatch authSuccess to update currentUser in Redux
        }
    } catch (error) {
        let errorMessage = error.response?.data?.message || error.message;
        if (Array.isArray(error.response?.data?.errors)) {
            errorMessage = error.response.data.errors.map(err => err.msg).join('\n');
        } else if (Array.isArray(error.response?.data)) {
            errorMessage = error.response.data.map(err => err.msg).join('\n');
        }
        dispatch(getError(errorMessage));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axiosInstance.post(`/${address}Create`, fields);

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        let errorMessage = error.response?.data?.message || error.message;
        if (Array.isArray(error.response?.data?.errors)) {
            errorMessage = error.response.data.errors.map(err => err.msg).join('\n');
        } else if (Array.isArray(error.response?.data)) {
            errorMessage = error.response.data.map(err => err.msg).join('\n');
        }
        dispatch(authError(errorMessage));
    }
};