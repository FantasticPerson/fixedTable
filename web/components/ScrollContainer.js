/**
 * Created by dandanwu on 16/4/26.
 */
import React,{Component,PropTypes,createClass} from 'react';
import {Scrollbars} from 'react-custom-scrollbars'

export default createClass({
  propTypes:{
    style:PropTypes.object
  },
  getInitialState(){
    return {
      scrollTop:0,
      scrollHeight:0,
      clientHeight:0
    };
  },

  scrollToTopByValue(top=0){
    const {scrollbars} = this.refs;
    scrollbars.scrollTop(top);
  },

  render(){
    const {style,...props} = this.props;
    if(!style.width){
      style.width = '100%';
    }
    if(!style.height){
      style.height = '100%';
    }
    const containerStyle = {
      ...style,
      position:'relative'
    };
    return (
      <div style={containerStyle}>
        <Scrollbars
          renderThumbVertical={props => <div {...props} className="tr-scrollbar-thumb-vertical"></div>}
          renderThumbHorizontal={props => <div {...props} className="tr-scrollbar-thumb-horizontal"></div>}
          ref="scrollbars" {...props}/>
      </div>
    )
  }
})

