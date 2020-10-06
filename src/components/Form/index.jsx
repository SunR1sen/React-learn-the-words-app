import React from 'react';
import s from './Form.module.scss';
import {Input} from "antd";
import getTranslateWord from "../../services/dictionary";

const {Search} = Input;

class AddWordForm extends React.Component {

    state = {
        valueEng: '',
        isBusy: false
    }

    handleEngInputChange = (e) => {
        this.setState({
            valueEng: e.target.value
        })
    }

    getTheWord = async () => {
        const getWord = await getTranslateWord(this.state.valueEng);
        this.props.writeWord(getWord.translate, getWord.text);
        this.setState(() => {
            return {
                valueEng: '',
                isBusy: false
            }
        })
    }

    handleSubmitForm = async () => {
        this.setState({
            isBusy: true
        }, this.getTheWord)
    }


    render() {
        const {valueEng, isBusy} = this.state;
        return (
            <>
                <div className={s.form}>
                    <Search placeholder="Введите английское слово"
                            enterButton="Добавить"
                            onChange={this.handleEngInputChange}
                            onSearch={this.handleSubmitForm}
                            loading={isBusy}
                            value={valueEng}
                    />
                </div>
            </>
        )
    }
}

export default AddWordForm;