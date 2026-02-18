import axiosInstance from '../../api/axiosInstance';
import { getRequest, getSuccess, getFailed, getError } from './noticeSlice';

export const getAllNotices = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || id === 'undefined') {
        dispatch(getError({ message: 'Missing ID for notices' }));
        return;
    }

    try {
        const result = await axiosInstance.get(`/${address}List/${id}`);
        if (result.data.message) {
            dispatch(getFailed(result.data.message));
        } else {
            dispatch(getSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error.message));
    }
}