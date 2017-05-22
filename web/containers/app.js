/**
 * Created by wdd on 2016/11/23.
 */
import React, {Component} from 'react';
import {Router} from 'react-router';
import routes from '../routes';
import injectStore2Route from '../utils/injectStore2Route';

class App extends Component {
    render() {
        const { history, store } = this.props;
        return (
            <Router routes={injectStore2Route(routes,store)} history={history} />
        );
    }
}

App.propTypes = {
    history: React.PropTypes.object.isRequired,
    store: React.PropTypes.object.isRequired
};

export default App;