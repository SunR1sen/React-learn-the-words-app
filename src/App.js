import React from 'react';
import { Redirect, Route, Switch} from 'react-router-dom'
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';
import s from './App.module.scss';

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import {Spin} from "antd";
import FirebaseContext from "./context/firebaseContext";
import {PrivateRoute} from "./utils/PrivateRoute";
import RegisterPage from "./pages/Register";
import {addUserAction} from "./actions/userAction";

class App extends React.Component {
    componentDidMount() {
        const {auth, setUserUid} = this.context;
        const { addUser } = this.props;

        console.log('#### state:', this.props.user)
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUserUid(user.uid);
                localStorage.setItem('user', JSON.stringify(user.uid));
                addUser(user);
            } else {
                setUserUid(null);
                localStorage.removeItem('user');
                addUser({})
            }
        })
    }

    render() {
        const {user} = this.props;

        if (!user) {
            return (
                <div className={s.loader_wrap}>
                    <Spin size="large"/>
                </div>
            );
        }
        return (
            <Switch>
                <PrivateRoute path='/' exact component={HomePage}/>
                <Route path='/home'>
                    <Redirect to='/'/>
                </Route>
                <Route path='/login' component={LoginPage}/>
                <Route path='/register' component={RegisterPage}/>
                <Route path='*'>
                    <Redirect to='/'/>
                </Route>
            </Switch>
        );
    }
}

App.contextType = FirebaseContext;

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addUser: addUserAction
    }, dispatch)
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
