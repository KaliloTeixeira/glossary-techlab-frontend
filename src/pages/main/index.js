import React from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdAdd, MdSearch } from 'react-icons/md';

import './styles.css';

export default class Main extends React.Component {
    constructor() {
        super();
        this.handleSearchTerm = this.handleSearchTerm.bind(this);
    }

    state = {
        words: [],
        loading: false,
        searchTerm: '',
        noWords: false,
    }

    foundWords = [];

    //Quando o componente for criado
    componentDidMount() {
        this.setState({ loading: true });
        this.loadWords();
    }

    loadWords = async () => {
        const response = await api.get(`/words`);

        const words = response.data;
        words.sort(this.compare);
        this.setState({ words, loading: false, noWords: false });
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

    handleSearchTerm(event) {
        event.preventDefault();
        if (!event.target.value)
            this.loadWords();


        this.setState({ searchTerm: event.target.value }, () => this.searchInWords(this.state.searchTerm));

    }

    searchInWords(searchTerm) {
        const words = this.state.words;

        words.forEach(word => {
            if (word.word.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                this.foundWords.push(word)
            }
        });
        if (this.foundWords.length == 0) this.setState({ noWords: true });

        this.setState({ words: this.foundWords });
        this.foundWords = [];
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
        const { words, page, wordInfo, loading, noWords } = this.state;

        //A key serve para atribuir um valor unico a cada elemento gerado pelo map
        return (
            <div className="container">
                <div className="word-list" >
                    <div className="functions-container">
                        <div className="add-word-button">
                            <Link to={'/new'} > <MdAdd /> Nova Palavra</Link>
                        </div>
                        <div className="search-input">
                            <MdSearch className="search-icon" />
                            <input type="text" placeholder="Pesquisar" name="searchTerm" value={this.state.searchTerm} onChange={this.handleSearchTerm} ></input>
                        </div>
                    </div>

                    <div disabled={loading}>
                        {loading && <div className="loading-spinner" ></div>}
                    </div>
                    <div disabled={noWords}>
                        {noWords && <h1 className="no-word-warning"> Nenhuma palavra encontrada! </h1>}
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