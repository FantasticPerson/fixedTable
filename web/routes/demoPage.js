/**
 * Created by dandan.wu on 16/9/21.
 */
import DemoPage from '../containers/demoPage/index'

const demoPage = {
    path: 'demoPage',
    component: DemoPage,
    onEnter: (nextState, replace, cb) => {
        cb();
    },
    onLeave: ()=> {
        console.log("demoPage leave");
    }
};

export default demoPage;