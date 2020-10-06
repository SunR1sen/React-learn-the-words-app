import React from 'react';
import s from './Paragraph.module.scss';

const Paragraph = ({ children }) => {
    return (
        <p className={s.paragraph}>{ children }</p>
    )
}

export default Paragraph;