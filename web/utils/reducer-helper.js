/**
 * Created by dandan.wu on 16/9/13.
 */
import {combineReducers} from 'redux';
import {handleActions} from 'redux-actions';
import isValidName from './isValidName';

export function nestCombineReducers(schema) {
    var results = {};

    let keyCount = 0;

    for(var key in schema) {
        if(!isValidName(key)) continue;
        let val = schema[key];
        let reducer;
        if(val.__proto__ === Object.prototype) {//plain Object
            reducer = nestCombineReducers(val);
        } else if(typeof val === 'function') {//default state bind reducer.
            reducer = val;
        }
        if(!reducer) continue;
        results[key] = reducer;
        keyCount++;
    }

    return keyCount === 0 ?
        nullReducer :
        combineReducers(results);
}

export function handleActionsReducor(defaultState, handleActionsObject) {
    return handleActions(handleActionsObject, defaultState);
}

export function defaultStateReducor(defaultState, reducer) {
    return (state = defaultState, action) => reducer(state, action);
}

export function valueReducor(val) {
    return (state, action) => val;
}

export const nullReducer = (state, action) => null;
export const emptyStringdReducer = (state, action) => '';
export const falseReducer = (state, action) => false;
export const trueReducer = (state, action) => true;
export const actionPayloadReducer =  (state, action) => action.payload;
export const stateReducer =  (state, action) => state;
