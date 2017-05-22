/**
 * Created by wdd on 2016/11/23.
 */
import FormPage from '../containers/form/index'

const formPage = {
    path: 'formPage',
    component: FormPage,
    onEnter: (nextState,replace,cb)=>{
        cb();
    },
    onLeave: ()=>{
        console.log('formPage leave');
    }
};

export default formPage;