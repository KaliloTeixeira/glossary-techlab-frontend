import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { MdArrowBack } from 'react-icons/md';

import './styles.css';

export default class Word extends React.Component {
    state = {
        word: {},
        loading: false,
    }

    async componentDidMount() {
        this.setState({ loading: true });
        this.loadWord();
    }

    async loadWord() {
        const { id } = this.props.match.params;

        const response = await api.get(`/word/${id}`);

        this.setState({ word: response.data, loading: false });
    }

    render() {
        const { word, loading } = this.state;

        return (
            <div className="word-info" >

                <div disabled={loading}>
                    {loading && <div className="loading-spinner" ></div>}
                </div>

                <div className="word-info-word">
                    <h1>{word.word} </h1>
                    <p> {word.meaning} </p>
                </div>

                <div className="arrow-back" >
                    <Link to="/" >
                        <MdArrowBack />
                    </Link>
                </div>
            </div >
        );
    }
}