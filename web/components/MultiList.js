/**
 * Created by wdd on 2017/5/22.
 */
import React,{Component} from 'react';
import FixedTable from './fixedTable';

export default class MultiList extends Component {
    constructor(){
        super();
        const {innerWidth,innerHeight} = window;
        this.state={pageIndex:0,innerWidth,innerHeight};
    }

    handleResize(){
        const {innerWidth,innerHeight} = window;
        this.setState({innerWidth,innerHeight});
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize.bind(this));

    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }


    render(){
        const {innerWidth,innerHeight} = this.state;
        return(
            <div style={{width:innerWidth,height:innerHeight}}>
                <div className="tr-multi-list-scroll-container" style={{}}>
                    {this.renderContent()}
                </div>
                {this.renderFooter()}
            </div>
        )
    }

    renderContent(){
        const {innerWidth,innerHeight} = this.state;
        const {data,title} = this.props.data;
        const {pageIndex} = this.state;
        let cData = data.slice(pageIndex*20,(pageIndex+1)*20);
        return <FixedTable data={{data:cData,title:title}} width={innerWidth} height={innerHeight-26}/>
    }

    renderFooter(){
        const {data} = this.props.data;
        let length = data.length;
        let pages = Math.ceil(length/20);
        if(pages <= 1){
            return;
        }
        let tabs = [];
        for(let i = 0;i<pages;i++){
            let isCurrent = (i == this.state.pageIndex);
            let className = "tr-multi-list-tab" + (isCurrent ? " tr-multi-list-curt-tab" : "");
            tabs.push(
                <div key={i} className={className} onClick={()=>{this.onTabClick(i)}}>{i}</div>
            )
        }
        return (
            <div className="tr-multi-list-footer-container">
                <div className="tr-multi-list-pre-tab" onClick={()=>{this.onPreClick()}}>{'上一页'}</div>
                <div className="tr-multi-list-tab-container">{tabs}</div>
                <div className="tr-multi-list-next-tab" onClick={()=>{this.onNextClick()}}>{'下一页'}</div>
                <div className="tr-multi-list-msg">{'共'+pages+'页/'+length+'条纪录'}</div>
            </div>
        )
    }

    onPreClick(){
        let index = this.state.pageIndex - 1;
        if(index >= 0){
            this.setState({pageIndex:index});
        }
    }

    onNextClick(){
        let index = this.state.pageIndex + 1;
        const {data} = this.props.data;
        let length = Math.ceil(data.length/20);
        if(index <= length-1){
            this.setState({pageIndex:index});
        }
    }

    onTabClick(i){
        let index = this.state.pageIndex;
        if(i == index){
            return;
        }
        this.setState({pageIndex:i});
    }
}
