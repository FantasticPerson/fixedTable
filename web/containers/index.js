/**
 * Created by dandan.wu on 16/9/13.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import * as overLayNames from '../constants/OverLayNames';
import FixedTable from '../components/fixedTable'
import MultiList from '../components/MultiList'

class App extends Component {
    renderOverLay(){
        const {overLayList} = this.props;
        return overLayList.map((item,index)=>{
            let cp = overLayNames.overLayMap[item.name];
            if(cp){
                return React.createElement(cp,{key:index,data:item.data,...this.props})
            } else {
                console.error('the overLay name ' + item.name + ' may be not defined');
            }
        });
    }
    render(){
        return (
            <div id="react-app">
                {this.renderOverLay()}
                {<MultiList data={this.props.tableData}/>}
                {/*<FixedTable data={this.props.tableData}/>*/}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        overLayList : state.view.overLayList,
        tableData:state.fixedTable.data
    }
}

export default connect(mapStateToProps)(App)