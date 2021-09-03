import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../hooks/context';
import Navbar from '../components/Navbar';
import styles from '../css/Checkout.module.css';
// import '../App.css';

function Checkout() {
  const { sendSale, getSellersId, sellersId } = useContext(AppContext);

  useEffect(() => {
    getSellersId();
  }, [getSellersId]);

  const productCart = Object.values(JSON.parse(localStorage.getItem('productCart')))
    .filter(({ quantity }) => quantity > 0);
  const INITIAL_STATE = {
    sellerId: 2,
    deliveryAddress: '',
    deliveryNumber: '',
    productCart,
  };
  const [detailsForm, setDetailsForm] = useState(INITIAL_STATE);
  let total = 0;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setDetailsForm({ ...detailsForm, [name]: value });
  };

  const handleOptionsChange = ({ target }) => {
    const { name, value } = target;
    setDetailsForm({ ...detailsForm, [name]: value });
  };

  const handleSubmit = (e, totalPriceString) => {
    e.preventDefault();
    const totalPrice = Number(totalPriceString);
    setDetailsForm({ ...detailsForm });
    const dataSend = detailsForm;
    console.log(dataSend);
    sendSale({ ...dataSend, totalPrice });
  };

  const itemNumber = (index) => {
    index += 1;
    return index;
  };

  const calcTotalPrice = (subtotal) => {
    total += subtotal;
  };

  const formatPrice = (price) => price.replace(/\./ig, ',');
  const reformatPrice = (price) => price.replace(/,/ig, '.');

  const calcSubTotal = (price, quantity) => {
    const subtotal = Number(price * quantity);
    calcTotalPrice(subtotal);
    return formatPrice(subtotal.toFixed(2));
  };

  const createSpan = (dataTestId, value) => (
    <span
      data-testid={ `customer_checkout__element-order-table-${dataTestId}` }
    >
      {value}
    </span>
  );

  return (
    <div className="main">
      <Navbar />
      <section className={ styles.productsContainer }>
        <h3>Finalizar Pedido</h3>
        { productCart.map(({ name, price, quantity }, index) => (
          <div
            key={ name }
            data-testid={ `element-order-table-name-${index}` }
            className={ styles.products }
          >
            { createSpan(`item-number-${index}`, itemNumber(index)) }
            { createSpan(`name-${index}`, name) }
            { createSpan(`quantity-${index}`, quantity) }
            { createSpan(`unit-price-${index}`, formatPrice(price)) }
            { createSpan(`sub-total-${index}`, calcSubTotal(price, quantity)) }
            <button
              type="button"
              data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            >
              Remover
            </button>
          </div>))}
        <div
          data-testid="customer_checkout__element-order-total-price"
        >
          { formatPrice(total.toFixed(2)) }
        </div>
      </section>
      <section className={ styles.formCheckoutContainer }>
        <h3>Detalhes e Endereço para entrega</h3>
        <form>
          <select
            id="sellerId"
            name="sellerId"
            value={ detailsForm.sellerId }
            data-testid="customer_checkout__select-seller"
            onChange={ handleOptionsChange }
          >
            {sellersId.map(({ id, name }) => (
              <option key={ id } value={ id }>{ name }</option>
            ))}
          </select>
          <input
            type="text"
            data-testid="customer_checkout__input-address"
            placeholder="Seu endereço"
            value={ detailsForm.deliveryAddress }
            onChange={ handleChange }
            name="deliveryAddress"
          />
          <input
            type="number"
            data-testid="customer_checkout__input-addressNumber"
            placeholder="Número da casa"
            value={ detailsForm.deliveryNumber }
            onChange={ handleChange }
            name="deliveryNumber"
          />

          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ (e) => handleSubmit(e, reformatPrice(total.toFixed(2))) }
          >
            Finalizar Pedido
          </button>
        </form>
      </section>
    </div>
  );
}

export default Checkout;