/**
 * Created by wdd on 2017/5/18.
 */
import * as ActionTypes from '../constants/ActionTypes';
import {actionPayloadReducer, nullReducer} from '../utils/reducer-helper';

export const title = {
    [ActionTypes.update_fixed_table_data]: actionPayloadReducer
};