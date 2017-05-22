/**
 * Created by wdd on 2016/11/23.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';

class FormPage extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                {'lslslsl'}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        title: state.demoPage.title
    }
}

export default connect(mapStateToProps)(FormPage);