import React from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

import './styles.css';

export default class AddProduct extends React.Component {
    constructor() {
        super();
        this.handleWord = this.handleWord.bind(this);
        this.handleMeaning = this.handleMeaning.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        word: '',
        meaning: ''
    };

    handleWord(event) {
        this.setState({ word: event.target.value });
    }

    handleMeaning(event) {
        this.setState({ meaning: event.target.value });
    }

    async handleSubmit(event) {
        const response = await api.post('/word', {
            word: this.state.word,
            meaning: this.state.meaning,
        })

        console.log(response);
        alert(response);
    }

    render() {
        return (
            <div className="add-product-container">
                <div className="add-product">
                    <h1> Nova Palavra </h1>
                    <form onSubmit={this.handleSubmit} >
                        <label>Palavra</label>
                        <input type="text" name="word" value={this.state.name} onChange={this.handleWord} />

                        <label>Significado</label>
                        <input type="text" name="meaning" value={this.state.description} onChange={this.handleMeaning} />

                        <input className="submit-button" type="submit" value="Adicionar ao Glossário" />
                    </form>
                </div>
                <div className="arrow-back" >
                    <Link to="/" >
                        <MdArrowBack />
                    </Link>
                </div>

            </div>
        );
    }
};