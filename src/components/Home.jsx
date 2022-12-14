import React, { Component } from 'react';
import ListaDeProdutos from './ListaDeProdutos';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ListCategory from './ListCategory';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      retornoCategory: [],
      productList: [],
      searchProduct: '',
      categoriaSelecionada: '',
    };
    this.searchInput = this.searchInput.bind(this);
    this.chamarApi = this.chamarApi.bind(this);
    this.addCotegory = this.addCotegory.bind(this);
    this.addCotegory = this.addCotegory.bind(this);
    this.localChanger = this.localChanger.bind(this);
  }

  async componentDidMount() {
    const { categoriaSelecionada, searchProduct } = this.state;
    try {
      await getCategories()
        .then((resultado) => this.setState({ retornoCategory: resultado }));
      getProductsFromCategoryAndQuery(categoriaSelecionada, searchProduct)
        .then((result) => this.setState({ productList: result.results }));
    } catch (error) {
      console.log(error);
    }
  }

  chamarApi() {
    const { categoriaSelecionada, searchProduct } = this.state;
    getProductsFromCategoryAndQuery(categoriaSelecionada, searchProduct)
      .then((result) => this.setState({ productList: result.results }));
  }

  searchInput(event) {
    this.setState({ searchProduct: event.target.value });
  }

  addCotegory({ target }) {
    const { value } = target;
    this.setState({
      categoriaSelecionada: value,
    });
  }

  localChanger(product) {
    if (localStorage.getItem('Cart') !== null) {
      let local = JSON.parse(localStorage.getItem('Cart'));
      local = [...local, product];
      localStorage.setItem('Cart', JSON.stringify(local));
    } else {
      localStorage.setItem('Cart', JSON.stringify([product]));
    }
  }

  render() {
    const { retornoCategory, searchProduct, productList } = this.state;
    const { searchInput, chamarApi, addCotegory } = this;
    return (
      <div data-testid="home-initial-message">
        <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
        <ListCategory categoryList={ retornoCategory } addCotegory={ addCotegory } />
        <ListaDeProdutos
          searchProduct={ searchProduct }
          productList={ productList }
          searchInput={ searchInput }
          chamarApi={ chamarApi }
          localChanger={ this.localChanger }
        />
      </div>
    );
  }
}

export default Home;
