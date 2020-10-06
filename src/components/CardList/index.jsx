import React from 'react';
import Card from '../Card';
import s from './CardList.module.scss';

class CardList extends React.Component {

    render() {
        const {item = [], onDeleted} = this.props;
        return (
            <>
                <div className={s.root}>
                    {
                        item.map(({eng, rus, id}) => (
                            <Card
                                onDeleted={() => {
                                    onDeleted(id);
                                }}
                                key={id}
                                eng={eng}
                                rus={rus}/>
                        ))
                    }
                </div>
            </>
        )
    }
}

export default CardList;