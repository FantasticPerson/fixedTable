/**
 * Created by dandan.wu on 16/9/21.
 */
import * as ActionTypes from '../constants/ActionTypes';
import {actionPayloadReducer, nullReducer} from '../utils/reducer-helper';

export const title = {
    [ActionTypes.update_title]: actionPayloadReducer
};