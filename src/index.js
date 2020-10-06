import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import FirebaseContext from "./context/firebaseContext";
import Firebase from "./services/firebase";
import {BrowserRouter as Router} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import rootReducers from './reducers'
import {Provider} from "react-redux";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = new createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <FirebaseContext.Provider value={new Firebase()}>
                <App/>
            </FirebaseContext.Provider>
        </Router>
    </Provider>,
    document.getElementById('root'));
