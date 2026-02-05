import axiosInstance from '../../api/axiosInstance';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    stuffDone
} from './studentSlice';

export const getAllStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || id === 'undefined') {
        dispatch(getError({ message: 'Missing ID for students' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const updateStudentFields = (id, fields, address) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || id === 'undefined') {
        dispatch(getError({ message: 'Missing ID for student update' }));
        return;
    }

    try {
        const result = await axiosInstance.put(`/${address}/${id}`, fields);
        if (result.data.schoolName) {
            dispatch(stuffDone());
        }
        else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const removeStuff = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || id === 'undefined') {
        dispatch(getError({ message: 'Missing ID for student removal' }));
        return;
    }

    try {
        const result = await axiosInstance.put(`/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}