import React from 'react';
import s from './Card.module.scss';
import {CheckSquareOutlined, DeleteOutlined} from '@ant-design/icons';
import classnames from 'classnames';

class Card extends React.Component {

    state = {
        done: false,
        isRemembered: false,
    }

    handleCardClick = () => {
        this.setState( (state) => {
            return {
                done: !state.done
            }
        })
    }

    handleIsRememberClick = () => {
        this.setState( (state) => {
            return {
                isRemembered: !state.isRemembered
            }
        })
    }

    handleDeletedClick = () => {
        this.props.onDeleted();
    }

    render() {

        const {eng, rus} = this.props;
        const {done, isRemembered} = this.state;

        return (
            <div className={s.root}>
                <div onClick={this.handleCardClick}
                     className={classnames(
                         s.card, {
                             [s.done]: done,
                             [s.isRemembered]: isRemembered})}
                >
                    <div className={s.cardInner}>
                        <div className={s.cardFront}>
                            {eng}
                        </div>
                        <div className={s.cardBack}>
                            {rus}
                        </div>
                    </div>
                </div>
                <div className={classnames(s.icon)} onClick={this.handleIsRememberClick}>
                    <CheckSquareOutlined/>
                </div>
                <div className={s.deleteIcon} onClick={this.handleDeletedClick}>
                    <DeleteOutlined />
                </div>
            </div>

        )
    }
}


export default Card;