import React from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';

import './styles.css';

export default class AddWord extends React.Component {
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

        if (response.data.error)
            alert("ERROR: Palavra já cadastrada ao Glossário.");
        else
            alert(`"${response.data.word}" Adicionado(a) ao Glossário com sucesso.`);
    }

    render() {
        return (
            <div className="add-word-container">
                <div className="add-word">
                    <h1> Nova Palavra </h1>
                    <form >
                        <label>Palavra</label>
                        <input type="text" name="word" value={this.state.name} onChange={this.handleWord} />

                        <label>Significado</label>
                        <textarea type="text" name="meaning" value={this.state.description} onChange={this.handleMeaning} />

                        <div className="submit-button" onClick={this.handleSubmit} value="Adicionar ao Glossário">Adicionar ao Glossário</div>
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