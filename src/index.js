// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
// Style
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Router
import { Route, Switch} from 'react-router-dom';
// Views
import { App, Game } from './containers';
//Components
import configureStore from './redux/store';
import WebFont from 'webfontloader';
import fetchInitialState from './redux/initialState';
import { ConnectedRouter } from "react-router-redux";
import history from './history';


const initialState = fetchInitialState(window.__INITIAL_STATE__);
const store = configureStore(initialState, history);

WebFont.load({
    google: {
        families: ['Marker Felt', 'sans-serif']
    }
});

const NotFound = (
    <div>Page Not Found</div>
);

ReactDOM.render(  
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <MuiThemeProvider>
                    <Switch>
                        <Route exact path="/" component={App}/>
                        <Route exact path="/game" component={Game}/>
                    </Switch>
                </MuiThemeProvider>
            </div>
        </ConnectedRouter>
    </Provider>, document.getElementById('root')
);

