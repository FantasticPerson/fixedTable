/**
 * Created by dandan.wu on 16/9/21.
 */
import * as actionHelper from '../utils/action-helper';
import * as ActionTypes from '../constants/ActionTypes';

export function updateCurrentTitle(title,cb = null){
    return dispatch=>{
        dispatch(actionHelper.createPayloadAction(ActionTypes.update_title,title));
    };
}