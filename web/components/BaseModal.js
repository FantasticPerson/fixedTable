/**
 * Created by dandan.wu on 16/9/21.
 */
import React,{Component,createClass} from 'react';

const Modal = React.createClass({
    render(){
        const {bgClassName} = this.props;
        let className = bgClassName || "tr-modal-background";
        return (
            <div className="tr-base-modal-container">
                <div className={className}></div>
                {this.props.children}
            </div>
        )
    }
});

export default Modal;