/**
 * Created by dandan.wu on 16/9/13.
 */
import indexApp from '../containers/index'

const index = {
    path:'/',
    component:indexApp,
    onEnter:(nextState,replace,cb)=>{
        cb();
    },
    childRoutes:[
    ]
};

export default index;