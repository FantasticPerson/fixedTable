/**
 * Created by wdd on 2017/5/18.
 */
import React,{Component} from 'react'

export default class FixedTable extends Component{
    constructor(){
        super();
        this.state={left:0,top:0};
    }

    render(){
        let thPosInfo = this.getPosInfo();
        let tdWidthPosInfo = this.getPosInfo2(thPosInfo);
        const {left,top} = this.state;
        const {width,height} = this.props;
        let {data} = this.props.data;
        let tempHeight = 33*data.length+20;

        this.getPosInfo();
        return (
            <div>
                <div>
                    <table width={'400px'}>
                        <thead>
                            {this.renderThead1(thPosInfo)}
                        </thead>
                    </table>
                    <div style={{height:tempHeight > height-120 ? height -120 : tempHeight,overflow:'hidden'}}>
                        <table width={'400px'} style={{marginTop:top}}>
                            <tbody>
                                {this.renderTbody1(tdWidthPosInfo)}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{
                    overflow: 'auto',
                    position: 'absolute',
                    top: '0',
                    marginLeft:'400px'
                }}>
                    <div style={{width:width-420,overflow:'hidden'}}>
                    <table style={{width:'1450px',marginLeft:left}}>
                        <thead>
                        {this.renderThead2(thPosInfo)}
                        </thead>
                    </table>
                    </div>
                    <div  style={{width:width-420,height:tempHeight > height-120 ? height -120 : tempHeight,overflow:'auto'}} onScroll={(e)=>{
                        this.setState({left:-e.target.scrollLeft,top:-e.target.scrollTop})
                        // console.log(e)
                    }}>
                        <table style={{width:'1450px'}}>
                            <tbody>
                            {this.renderTbody2(tdWidthPosInfo)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    getWidth(){
        const {title} = this.props.data;
        let width = 0;
        for(let i=0;i<title[0].length;i++){
            width += (title[0][i].width.indexOf('px') >= 0 ? Number(title[0][i].width.slice(0,-2)) : Number(title[0][i].width));
        }
        return width;
    }

    renderThead(){
        const {title} = this.props.data;
        return title.map((item,index)=>{
            const ths = item.map((item1,index)=>{
                return <th colSpan={item1.cols} rowSpan={item1.rows} height={33*item1.rows+'px'} width={item1.width} key={index}>{item1.name}</th>
            });
            return <tr key={index}>{ths}</tr>
        })
    }
    renderThead1(posInfo){
        return posInfo.map((item1,index)=>{
            let ths = [];
            for(let i = 0;i<3;i++){
                let item = item1[i];
                if(item) {
                    // console.log(item.name);
                    ths.push(<th colSpan={item.item.cols} rowSpan={item.item.rows} style={{height:33 * item.item.rows + 'px', width:Number(item.item.width.slice(0,-2))-1+'px'}} key={i}><div>{item.item.name}</div></th>)
                }
            }
            return <tr key={index}>{ths}</tr>
        })
    }

    renderThead2(posInfo){
        return posInfo.map((item1,index)=>{
            let ths = [];
            for(let i = 3;i<item1.length;i++){
                let item = item1[i];
                if(item) {
                    // console.log(item.name);
                    ths.push(<th colSpan={item.item.cols} rowSpan={item.item.rows} style={{height:33 * item.item.rows + 'px', width:Number(item.item.width.slice(0,-2))-1+'px'}} key={i}>{item.item.name}</th>)
                }
            }
            return <tr key={index}>{ths}</tr>
        })
    }

    renderTbody(posInfo){
        const {data} = this.props.data;
        return data.map((item,index)=>{
            let tds = [];
            for(let i=0;i<17;i++){
                tds.push(<td key={i} height={'34px'} width={posInfo[i]} rowSpan={item.rows} colSpan={item.cols}>
                    <div className="ft-td">
                        {item.data[i+1]}
                    </div>
                </td>)
            }
            return <tr style={{backgroundColor:index%2 ? '#FBFCF7' : '#FFF'}} key={index}>{tds}</tr>
        })
    }

    renderTbody1(posInfo){
        const {data} = this.props.data;
        return data.map((item,index)=>{
            let tds = [];
            for(let i=0;i<3;i++){
                tds.push(<td key={i} style={{height:'33px',width:Number(posInfo[i].slice(0,-2))-1+'px'}}  rowSpan={item.rows} colSpan={item.cols}>
                    <div className="ft-td">
                        {item.data[i+1]}
                    </div>
                </td>)
            }
            return <tr style={{backgroundColor:index%2 ? '#FBFCF7' : '#FFF'}} key={index}>{tds}</tr>
        })
    }

    renderTbody2(posInfo){
        const {data} = this.props.data;
        return data.map((item,index)=>{
            let tds = [];
            for(let i=3;i<17;i++){
                tds.push(<td key={i} style={{height:'33px',width:Number(posInfo[i].slice(0,-2))-1+'px'}} rowSpan={item.rows} colSpan={item.cols}>
                    <div className="ft-td">
                        {item.data[i+1]}
                    </div>
                </td>)
            }
            return <tr style={{backgroundColor:index%2 ? '#FBFCF7' : '#FFF'}} key={index}>{tds}</tr>
        })
    }

    getPosInfo(){
        const {title,data} = this.props.data;
        let posInfoArr = [];
        for(let i=0;i<title.length;i++){
            posInfoArr.push([]);
        }
        for(let i=0;i<title.length;i++){
            for(let j=0;j<title[i].length;j++) {
                let index = getUndefinedIndex(posInfoArr[i]);
                let item = title[i][j];
                posInfoArr[i][index] = {rows:item.rows,cols:item.cols,width:item.width,item:item};
                if(item.rows > 1){
                    for(let k=1;k<item.rows;k++){
                        posInfoArr[i+k][index] = null;
                    }
                }
                if(item.cols > 1){
                    for(let k=1;k<item.cols;k++){
                        posInfoArr[i][index+k] = null;
                    }
                }
            }
        }
        return posInfoArr;
        function getUndefinedIndex(arr){
            for (var i = 0; i < arr.length; i++) {
                if (undefined === arr[i]) {
                    return i;
                }
            }
            return arr.length;
        }
    }

    getPosInfo2(posInfo){
        var posInfoArr = [];
        for(let i=0;i<posInfo[0].length;i++){
            if(posInfo[0][i] && posInfo[0][i].cols == 1){
                posInfoArr.push(posInfo[0][i].width);
            } else {
                for(let j=0;j<posInfo.length;j++){
                    if(posInfo[j][i] && posInfo[j][i].cols == 1){
                        posInfoArr.push(posInfo[j][i].width);
                    }
                }
            }
        }
        return posInfoArr;
    }
}