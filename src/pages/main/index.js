import React from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdAddBox } from 'react-icons/md';

import './styles.css';

export default class Main extends React.Component {
    state = {
        words: [],
        wordInfo: [],
        page: 1,
    }

    //Quando o componente for criado
    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async (page = 1) => {
        const response = await api.get(`/words?page=${page}`);
        console.log(response);

        const { docs, ...wordInfo } = response.data;

        this.setState({ words: docs, wordInfo, page });
    }

    async deleteProduct(word) {
        const response = await api.delete(`/word/${word._id}`);
        alert("Excluido com Sucesso!");
        this.loadProducts();
    }

    prevPage = () => {
        const { page } = this.state;

        if (page === 1) return;

        const pageNumber = page - 1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const { page, wordInfo } = this.state;

        if (page === wordInfo.pages) return;

        const pageNumber = page + 1;

        this.loadProducts(pageNumber);
    }


    // O render fica escutando o state e quando há alguma alteração ele atualiza automaticamente
    render() {
        const { words, page, wordInfo } = this.state;

        //A key serve para atribuir um valor unico a cada elemento gerado pelo map
        return (
            <div className="container">
                <div className="product-list" >
                    <div className="add-product-button">
                        <Link to={'/new'} > <MdAddBox /> Adicionar Palavra</Link>
                    </div>

                    {words.map(word => (
                        <article key={word._id} >
                            <strong> {word.word} </strong>
                            <button className="delete-icon" value={word._id} onClick={() => this.deleteProduct(word)} > <MdDelete /> </button>
                            <p> {word.meaning} </p>
                            {/* <Link to={`/word/${word._id}`} > Acessar </Link> */}
                        </article>
                    ))}
                    <div className="actions" >
                        <button disabled={page === 1} onClick={this.prevPage} > <MdKeyboardArrowLeft /> </button>
                        <strong> {page} </strong>
                        <button disabled={page === wordInfo.pages} onClick={this.nextPage} > <MdKeyboardArrowRight /> </button>
                    </div>
                </div>
            </div>
        );
    }

}