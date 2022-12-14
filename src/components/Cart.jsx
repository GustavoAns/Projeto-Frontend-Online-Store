import React from 'react';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import CartCard from './CartCard';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: undefined,
    };
  }

  componentDidMount() {
    this.cartSetState();
  }

  cartSetState = () => {
    if (localStorage.getItem('Cart')) {
      let local = localStorage.getItem('Cart');
      local = JSON.parse(local);
      this.setState({
        cartItems: [...local],
      });
    }
  }

  deleteCart = () => {
    localStorage.removeItem('Cart');
    this.setState({
      cartItems: undefined,
    });
  }

  render() {
    const { cartItems } = this.state;
    if (cartItems !== undefined) {
      return (
        <>
          <Link to="/"><AiFillHome size={ 40 } color="green" /></Link>
          <button type="button" onClick={ this.deleteCart }>Apagar Todos</button>
          <main>
            {cartItems.map((item, i) => <CartCard key={ i } product={ item } />)}

          </main>
        </>

      );
    }
    return (
      <section>
        <Link to="/"><AiFillHome color="green" /></Link>
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
      </section>
    );
  }
}

export default Cart;
