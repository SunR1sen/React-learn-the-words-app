import React, {Component} from 'react';
import { connect } from 'react-redux';

import HeaderBlock from "../../components/HeaderBlock";
import Header from "../../components/Header";
import Paragraph from "../../components/Paragraph";
import ContentBlock from "../../components/ContentBlock";
import AddWordForm from "../../components/Form";
import CardList from "../../components/CardList";
import FooterBlock from "../../components/FooterBlock";
import FirebaseContext from "../../context/firebaseContext";
import { Button } from 'antd';
import {bindActionCreators} from "redux";
import {fetchCardList} from "../../actions/cardListAction";

class HomePage extends Component {
    componentDidMount() {
        const { getUserCardsRef } = this.context;
        const { fetchCardList } = this.props;

        fetchCardList(getUserCardsRef);
    }

    handleDeleteItem = (id) => {
        const wordArr = this.props.items;
        const newWordArr = wordArr.filter( item => item.id !== id)

        this.context.getUserCardsRef().set(newWordArr);
    }

    addedWordsToArray = (ruWord, engWord) => {
        const { getUserCardsRef } = this.context;
        let words = {
            eng: engWord,
            rus: ruWord,
            id: +new Date(),
        }
        const newWordList = [...this.props.items, words];
        getUserCardsRef().set([...newWordList]);
        console.log('ПРОПСЫ:',this.props)
    }

    signOutHandler = () => {
        const { signOut } = this.context;
        signOut();
    }

    render() {
        const wordArr = this.props.items;
        console.log('WORDS', this.props.items);
        return (
            <>
                <HeaderBlock hideLogo>
                    <Header>
                        Изучаем английский
                    </Header>
                    <Paragraph>
                        Воспользуйтесь карточками для изучения и повторения слов
                    </Paragraph>
                    <Button type="primary" onClick={this.signOutHandler}>Выйти из аккаунта</Button>
                </HeaderBlock>

                <ContentBlock title='Ваши карточки'>
                    <AddWordForm writeWord={this.addedWordsToArray}/>
                    <CardList item={wordArr} onDeleted={this.handleDeleteItem}/>
                </ContentBlock>
                <FooterBlock text='React Marathon 2020 "Learn the words"'/>
            </>
        )
    }
}
HomePage.contextType = FirebaseContext;

const mapStateToProps = (state) => {
    return {
        isBusy: state.cardList.isBusy,
        items: state.cardList.items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchCardList: fetchCardList
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);