/**
 * Created by wdd on 2017/5/22.
 */
import React,{Component} from 'react';
import FixedTable from './fixedTable';

export default class MultiList extends Component {
    constructor(){
        super();
        const {innerWidth,innerHeight} = window;
        this.state={pageIndex:0,innerWidth,innerHeight,paixu1:'up',paixu2:'up',currentPaixu:0,searchCol:'',searchValue:''};
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
                <input ref="input" style={{
                    display: 'inline-block',
                    width: '1200px',
                    marginLeft: '10px',
                    height: '30px',
                    marginBottom: '5px',
                    marginTop: '5px'
                }}/>
                <select ref="select">
                    <option>{'--请选择筛选字段--'}</option>
                    <option value="JYZKH">{'交易帐卡号'}</option>
                    <option value="JYZH">{'交易账号'}</option>
                    <option value="JYRQ">{'交易日期'}</option>
                    <option value="JYJE">{'交易金额'}</option>
                    <option value="JYYE">{'交易余额'}</option>
                    <option value="SFBZ">{'收付标识'}</option>
                    <option value="DSZH">{'对手账号'}</option>
                    <option value="DSHM">{'对手户名'}</option>
                    <option value="ZYSM">{'摘要说明'}</option>
                    <option value="JYWDMC">{'交易网点名称'}</option>
                </select>
                <button onClick={()=>{this.onSearchClick()}}>搜索</button>
                <div className="tr-multi-list-scroll-container" style={{}}>
                    {this.renderContent()}
                </div>
                {this.renderFooter()}
            </div>
        )
    }

    renderContent(){
        const {innerWidth,innerHeight,paixu1,paixu2,currentPaixu,searchCol,searchValue} = this.state;
        const {data} = this.props.data;
        const {pageIndex} = this.state;
        let cData = data.slice(pageIndex*20,(pageIndex+1)*20);
        if(searchCol !== '' && searchValue !== ''){
            cData = this.search(cData,searchCol,searchValue);
        }
        if(currentPaixu === 1){
            cData.sort(function(item1,item2){
                if(paixu1 === 'up') {
                    return item1.JYJE - item2.JYJE;
                } else {
                    return item2.JYJE - item1.JYJE;
                }
            });
        } else if(currentPaixu === 2){
            cData.sort(function(item1,item2){
                let value1 = (item1.SFBZ === '进' ? 1 : 2);
                let value2 = (item2.SFBZ === '进' ? 1 : 2);
                if(paixu2 === 'up'){
                    return value1 - value2;
                } else {
                    return value2 - value1;
                }
            })
        }
        return <FixedTable
            paixu1={paixu1}
            paixu2={paixu2}
            data={{data:cData}}
            width={innerWidth}
            height={innerHeight-26}
            onPaixu1={this.onPaixu1.bind(this)}
            onPaixu2={this.onPaixu2.bind(this)}/>
    }

    search(arr,col,value){
        let results = [];
        arr.map((item)=>{
            if(item[col] && item[col].toString().indexOf(value) >= 0){
                results.push(item);
            }
        });
        return results;
    }

    renderFooter(){
        const {currentPaixu,pageIndex} = this.state;
        const {data} = this.props.data;
        let length = data.length;
        let pages = Math.ceil(length/20);
        if(pages <= 1){
            return;
        }
        let tabs = [];
        if(pages <= 15) {
            for (let i = 0; i < pages; i++) {
                let isCurrent = (i === this.state.pageIndex);
                let className = "tr-multi-list-tab" + (isCurrent ? " tr-multi-list-curt-tab" : "");
                tabs.push(
                    <div key={i} className={className} onClick={() => {
                        this.onTabClick(i)
                    }}>{i}</div>
                )
            }
        } else {
            console.log(pageIndex);
            console.log(Math.floor(pages/2) -3);
            for(let i=0;i<5;i++){
                let isCurrent = (i === this.state.pageIndex);
                let className = "tr-multi-list-tab" + (isCurrent ? " tr-multi-list-curt-tab" : "");
                tabs.push(
                    <div key={i} className={className} onClick={() => {
                        this.onTabClick(i)
                    }}>{i}</div>
                )
            }
            let centerStart = Math.floor(pages/2) -3;
            let centerEnd = centerStart + 4;
            if(pageIndex > 4 && pageIndex < pages-  5){
                if(pageIndex - 2 <= 4) {
                    centerStart = 5;
                    centerEnd = 9;
                }
                else if(pageIndex+2 >=pages-5){
                    centerEnd = pages-6;
                    centerStart = pages - 10;
                } else {
                    centerStart = pageIndex - 2;
                    centerEnd = pageIndex + 2;
                }
            }
            tabs.push(<div style={{paddingRight:'5px'}}>... </div>);
            for(let i=centerStart;i<=centerEnd;i++){
                let isCurrent = (i === this.state.pageIndex);
                let className = "tr-multi-list-tab" + (isCurrent ? " tr-multi-list-curt-tab" : "");
                tabs.push(
                    <div key={i} className={className} onClick={() => {
                        this.onTabClick(i)
                    }}>{i}</div>
                )
            }

            tabs.push(<div style={{paddingRight:'5px'}}>... </div>);
            for(let i=pages-5;i<pages;i++){
                let isCurrent = (i === this.state.pageIndex);
                let className = "tr-multi-list-tab" + (isCurrent ? " tr-multi-list-curt-tab" : "");
                tabs.push(
                    <div key={i} className={className} onClick={() => {
                        this.onTabClick(i)
                    }}>{i}</div>
                )
            }
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
        if(i === index){
            return;
        }
        this.setState({pageIndex:i});
    }

    onPaixu1(){
        const {paixu1} = this.state;
        this.setState({currentPaixu:1,paixu1:(paixu1 === 'up'?'down':'up')})
    }

    onPaixu2(){
        const {paixu2} = this.state;
        this.setState({currentPaixu:2,paixu2:(paixu2 === 'up'?'down':'up')})
    }
    onSearchClick(){
        const {input,select} = this.refs;
        if(input.value && input.value.length > 0){
            let option = select.options[select.selectedIndex];
            if(option.value && option.value.length > 0){
                this.setState({searchCol:option.value,searchValue:input.value});
                return;
            }
        }
        this.setState({searchCol:'',searchValue:''})
    }
}
