/**
 * Created by dandan.wu on 16/9/13.
 */
function injectStore2Route(route, store) {
    if(route) {
        route.store = store;
        route.dispatch = store.dispatch;
        route.getState = store.getState;

        if(route.childRoutes) {
            route.childRoutes.forEach(childRoute => {
                injectStore2Route(childRoute, store);
            })
        }
    }
    return route;
}

export default injectStore2Route;