/**
 * Created by wdd on 2016/9/25.
 */
import * as actionHelper from '../utils/action-helper'
import * as ActionTypes from '../constants/ActionTypes'
import * as ViewNames from '../constants/OverLayNames'

export function showOverLayByName(overLayName,data = null){
    return (dispatch,getState)=>{
        let list = getState().view.overLayList.map((item)=> {return item;});
        let item = list.find(function(item){return item.name == overLayName});
        if(item){
            return;
        }
        let overLayItem = {};
        overLayItem.name = overLayName;
        overLayItem.data = data;
        list.push(overLayItem);
        dispatch(actionHelper.createPayloadAction(ActionTypes.update_over_lay_list,list))
    }
}

export function removeOverLayByName(overLayName){
    return (dispatch,getState)=>{
        let list = getState().view.overLayList.map((name)=> {return name;});
        let item = list.find(function(item){return item.name == overLayName});
        if(!item){
            return;
        }
        list.splice(list.indexOf(item),1);
        dispatch(actionHelper.createPayloadAction(ActionTypes.update_over_lay_list,list));
    }
}

export function showLoading(data=null){
    return showOverLayByName(ViewNames.VIEW_LOADING,data);
}

export function removeLoading(){
    return removeOverLayByName(ViewNames.VIEW_LOADING);
}