import axiosInstance from '../../api/axiosInstance';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    doneSuccess
} from './teacherSlice';

export const getAllTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());

    if (!id) {
        dispatch(getError({ message: 'Missing school ID' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/Teachers/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const getTeacherDetails = (id) => async (dispatch) => {
    dispatch(getRequest());

    if (!id) {
        dispatch(getError({ message: 'Missing teacher ID' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/Teacher/${id}`);
        if (result.data) {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const updateTeachSubject = (teacherId, teachSubject) => async (dispatch) => {
    dispatch(getRequest());

    try {
        const result = await axiosInstance.put(`/TeacherSubject`, { teacherId, teachSubject });
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}