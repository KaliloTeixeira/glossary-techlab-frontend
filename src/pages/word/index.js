import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { MdArrowBack } from 'react-icons/md';

import './styles.css';

export default class Word extends React.Component {
    state = {
        word: {},
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/word/${id}`);

        this.setState({ word: response.data });
    }

    render() {
        const { product } = this.state;

        return (
            <div className="word-info" >
                <div className="word-info-word">
                    {/* <h1>{word.word} </h1>
                    <p> {word.meaning} </p> */}
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