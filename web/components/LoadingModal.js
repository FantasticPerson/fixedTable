/**
 * Created by dandan.wu on 16/9/26.
 */
import React,{Component} from 'react'
import BaseModal from './BaseModal'

export default class LoadingModal extends Component{
    constructor(){
        super()
    }

    render(){
        const {data} = this.props;
        let msg = data || '加载数据中,请稍等...';
        return (
            <BaseModal bgClassName="tr-loading-modal-background">
                <div className="tr-loading-progressBar">{msg}</div>
            </BaseModal>
        )
    }
}