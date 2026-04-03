import axiosInstance from '../../api/axiosInstance';
import {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    getStudentsSuccess,
    detailsSuccess,
    getFailedTwo,
    getSubjectsSuccess,
    getTeachersSuccess,
    getSubDetailsSuccess,
    getSubDetailsRequest
} from './sclassSlice';

export const getAllSclasses = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || id === 'undefined' || !address) {
        dispatch(getError({ message: 'Missing required parameters' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const getClassStudents = (id) => async (dispatch) => {
    dispatch(getRequest());

    if (!id) {
        dispatch(getError({ message: 'Missing class ID' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/Sclass/Students/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getStudentsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const getClassTeachers = (id) => async (dispatch) => {
    dispatch(getRequest());

    if (!id) {
        dispatch(getError({ message: 'Missing class ID' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/Sclass/Teachers/${id}`);
        if (result.data.message) {
            dispatch(getFailedTwo(result.data.message));
        } else {
            dispatch(getTeachersSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const getClassDetails = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || !address) {
        dispatch(getError({ message: 'Missing required parameters' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/${address}/${id}`);
        if (result.data) {
            dispatch(detailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const getSubjectList = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || !address) {
        dispatch(getError({ message: 'Missing required parameters' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/${address}/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || id === 'undefined') {
        dispatch(getError({ message: 'Missing class ID' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/FreeSubjectList/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSubjectsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}

export const getSubjectDetails = (id, address) => async (dispatch) => {
    dispatch(getSubDetailsRequest());

    if (!id || !address) {
        dispatch(getError({ message: 'Missing required parameters' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/${address}/${id}`);
        if (result.data) {
            dispatch(getSubDetailsSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}