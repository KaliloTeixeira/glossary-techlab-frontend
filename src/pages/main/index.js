import React from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdAddBox } from 'react-icons/md';

import './styles.css';

export default class Main extends React.Component {
    state = {
        words: [],
        loading: false,
    }

    //Quando o componente for criado
    componentDidMount() {
        this.setState({ loading: true });
        this.loadWords();
    }

    loadWords = async (page = 1) => {
        const response = await api.get(`/words`);

        const words = response.data;
        console.log(words);
        words.sort(this.compare);
        console.log(words);

        this.setState({ words, loading: false });
    }

    compare(a, b) {
        if (a.word < b.word)
            return -1;
        if (a.word > b.word)
            return 1;
        return 0;
    }

    async deleteWord(word) {
        const response = await api.delete(`/word/${word._id}`);
        alert("Excluido com Sucesso!");
        this.loadWords();
    }

    // prevPage = () => {
    //     const { page } = this.state;

    //     if (page === 1) return;

    //     const pageNumber = page - 1;

    //     this.loadWords(pageNumber);
    // }

    // nextPage = () => {
    //     const { page, wordInfo } = this.state;

    //     if (page === wordInfo.pages) return;

    //     const pageNumber = page + 1;

    //     this.loadWords(pageNumber);
    // }


    // O render fica escutando o state e quando há alguma alteração ele atualiza automaticamente
    render() {
        const { words, page, wordInfo, loading } = this.state;

        //A key serve para atribuir um valor unico a cada elemento gerado pelo map
        return (
            <div className="container">
                <div className="word-list" >
                    <div className="add-word-button">
                        <Link to={'/new'} > <MdAddBox /> Adicionar Palavra</Link>
                    </div>

                    <div disabled={loading}>
                        {loading && <div className="loading-spinner" ></div>}
                    </div>

                    {words.map(word => (
                        <article key={word._id} >
                            <strong> {word.word} </strong>
                            <button className="delete-icon" value={word._id} onClick={() => this.deleteWord(word)} > <MdDelete /> </button>
                            <p> {word.meaning} </p>
                            <Link to={`/word/${word._id}`} > Detalhar </Link>
                        </article>
                    ))}
                    {/* <div className="actions" >
                        <button disabled={page === 1} onClick={this.prevPage} > <MdKeyboardArrowLeft /> </button>
                        <strong> {page} </strong>
                        <button disabled={page === wordInfo.pages} onClick={this.nextPage} > <MdKeyboardArrowRight /> </button>
                    </div> */}
                </div>
            </div>
        );
    }

}