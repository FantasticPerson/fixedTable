/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import * as ViewState from '../../constants/view';
import {showLoading,removeLoading} from '../../actions/view';
import {updateCurrentTitle} from '../../actions/demoPage'

class DemoPage extends Component{
    constructor(){
        super();
        this.state= {view:ViewState.view_loading};
    }

    render(){
        const {view}  = this.state;
        const {title} = this.props;
        if(view == ViewState.view_ready){
            return (
                <div>
                    <div>
                        {"welcome to demo page fdgs"}
                    </div>
                    <div style={{color:"green",fontSize:"20px",marginTop:"60px"}}>
                        {title}
                    </div>
                    <button onClick={(e)=>{
                        this.props.dispatch(updateCurrentTitle("new title "+Date.now()));
                    }}>click to change</button>
                </div>
            )
        } else {
            this.props.dispatch(showLoading("Loading"));
            setTimeout(function(){
                this.setState({view:ViewState.view_ready});
                this.props.dispatch(removeLoading());
            }.bind(this),1000);
            return (
                <div></div>
            )
        }
    }
}


function mapStateToProps(state) {
    return {
        title: state.demoPage.title
    }
}

export default connect(mapStateToProps)(DemoPage);