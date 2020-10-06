import React, {Component} from 'react';
import {Layout, Form, Input, Button} from 'antd';
import s from './Login.module.scss';
import FirebaseContext from "../../context/firebaseContext";
import {Link} from "react-router-dom";

const {Content} = Layout;


class LoginPage extends Component {
    state = {
        loginBusy: false,
        errorMessage: null
    }

    onFinish = ({email, password}) => {
        const { history } = this.props;
        const {signInWithEmail, setUserUid} = this.context;

        this.setState({
            loginBusy: true,
        })

        signInWithEmail(email, password)
            .catch(err => {
                let msg = '';
                switch (err.code) {
                    case 'auth/user-not-found':
                        msg = 'Пользователь с таким Email не найден!';
                        break;

                    case 'auth/wrong-password':
                        msg = 'Введен неверный пароль!';
                        break;

                    case 'auth/too-many-requests':
                        msg = 'Слишком много попыток! Попробуйте позже!';
                        break;

                    case 'auth/user-disabled':
                        msg = 'Ваша учетная запись была отключена! Обратитесь за помощью в службу поддержки.';
                        break;

                    case 'auth/invalid-email':
                        msg = 'Введен неверный email!';
                        break;

                    default:
                        msg = 'Произошла ошибка! Попробуйте еще раз';
                }
                console.error(err.code, ': ', err.message);
                this.setState({
                    loginBusy: false,
                    errorMessage: msg,
                });
            })
            .then(res => {
                setUserUid(res.user.uid);
                localStorage.setItem('user', res.user.uid);
                history.push('/');
            })
    }

    onFinishFailed = (errorMsg) => {
        console.log('####, errorMsg:', errorMsg)
    }

    renderForm = () => {
        const { loginBusy } = this.state;
        const layout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 18,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 6,
                span: 18,
            },
        };
        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <div className={s.btn_wrapper}>
                        <Button type="primary" htmlType="submit" loading={loginBusy}>
                            Войти
                        </Button>

                            <Link to='/register'>Зарегистрироваться</Link>

                    </div>
                </Form.Item>
            </Form>
        )
    }

    render() {
        const { errorMessage } = this.state;

        return (
            <Layout>
                <Content>
                    <div className={s.root}>
                        <div className={s.form_wrapper}>
                            {errorMessage && <p className={s.error}>{errorMessage}</p>}
                            {this.renderForm()}
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

LoginPage.contextType = FirebaseContext;

export default LoginPage;