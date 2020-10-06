import React, {Component} from 'react';
import { Layout, Form, Input, Button } from 'antd';
import {Link} from "react-router-dom";
import FirebaseContext from "../../context/firebaseContext";
import s from './Register.module.scss';

const {Content} = Layout;

class RegisterPage extends Component {
    state = {
        errorMessage: null
    }


    onFinish = ({email, password}) => {
        const { createUser } = this.context;

        createUser(email, password)
            .catch(err => {
                let msg = '';
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        msg = 'Пользователь с таким Email уже зарегестрирован!';
                        break;

                    case 'auth/invalid-email':
                        msg = 'Введен неверный email!';
                        break;

                    case 'auth/weak-password':
                        msg = 'Слишком слабый пароль!';
                        break;

                    case 'auth/too-many-requests':
                        msg = 'Слишком много попыток! Попробуйте позже!';
                        break;

                    default:
                        msg = 'Произошла ошибка! Попробуйте еще раз';
                }
                console.error(err.code, ': ', err.message);
                this.setState({
                    errorMessage: msg,
                });
            })
            // .then(() => {
            //         this.props.history.push('/login')
            // });
    }

    onFinishFailed = (errorMsg) => {
        console.log('####, errorMsg:', errorMsg)
    }

    renderForm = () => {
        // const { registerBusy } = this.state;

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
                    <Input />
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
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <div className={s.btn_wrapper}>
                        <Button type="primary" htmlType="submit">
                            Зарегистрировать
                        </Button>
                        <Button type="primary">
                            <Link to='/login'>Войти</Link>
                        </Button>
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
RegisterPage.contextType = FirebaseContext;

export default RegisterPage;