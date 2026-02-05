import axiosInstance from '../../api/axiosInstance';
import { getRequest, getSuccess, getFailed, getError } from './complainSlice';

export const getAllComplains = (id, address) => async (dispatch) => {
    dispatch(getRequest());

    if (!id || id === 'undefined') {
        dispatch(getError({ message: 'Missing ID for complains' }));
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
        dispatch(getError(error));
    }
}