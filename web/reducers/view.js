/**
 * Created by wdd on 2016/9/22.
 */
import * as ActionTypes from '../constants/ActionTypes';
import {actionPayloadReducer, nullReducer} from '../utils/reducer-helper';

export const overLayList = {
    [ActionTypes.update_over_lay_list]: actionPayloadReducer
};