import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import CheckoutItem from './CheckoutItem';
import Customer from '../context/customerContext';
import Seller from '../context/sellerContext';
import useTotalPrice from '../hooks/utils/useTotalPrice';

export default function CheckoutTable() {
  const History = useHistory();
  const MAGIC_NUMBER = 3;
  const path = History.location.pathname.split('/')
    .filter((p, index) => index < MAGIC_NUMBER);
  const role = path[1];
  const page = path[2];

  const pageTestId = {
    '/customer/checkout': 'customer_checkout',
    '/customer/orders': 'customer_order_details',
    '/seller/orders': 'seller_order_details',
  };

  const context = useContext(role === 'customer'
    ? Customer : Seller);
  const { shoppingCart } = context;

  const [totalPrice, setTotalPrice] = useTotalPrice();

  useEffect(() => {
    setTotalPrice(shoppingCart);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th className="grow-1">Item</th>
          <th className="grow-3">Descrição</th>
          <th className="grow-1">Quantidade</th>
          <th className="grow-1">Valor Unitário</th>
          <th className="grow-1">Sub-total</th>
          { page === 'checkout' && <th className="grow-1">Remover Item</th>}
        </tr>
      </thead>
      <tbody>
        {shoppingCart.length ? shoppingCart.map((product, index) => (
          <CheckoutItem
            key={ product.id }
            index={ index }
            product={ product }
            role={ role }
            page={ page }
          />
        )) : <tr><td>Apenas teias de aranha em seu carrinho...</td></tr>}
        <tr
          data-testid={ `${pageTestId[path.join('/')]}__element-order-total-price` }
        >
          <td>
            {`Total: R$ ${totalPrice}`}
          </td>
        </tr>
      </tbody>
    </table>
  );
}