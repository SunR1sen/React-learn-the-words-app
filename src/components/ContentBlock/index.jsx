import React from 'react';
import s from './ContentBlock.module.scss';

const ContentBlock = (props) => {

    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <h2 className={s.title}>{props.title}</h2>
                <ul className={s.list}>
                    {props.children}
                </ul>
            </div>
        </div>
    )
}

export default ContentBlock;