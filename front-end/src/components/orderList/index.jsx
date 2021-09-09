import React, { useContext, useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import Context from '../../context';
import * as S from './styled';

const OrderList = () => {
  const { allSales } = useContext(Context);
  const [details, setDetails] = useState({ redirect: false, orderId: 0 });
  const { redirect, orderId } = details;
  const [changeDataTestId, setChangeDataTestId] = useState(false);

  const redirectTo = (id) => {
    setDetails({
      redirect: true,
      orderId: id,
    });
  };

  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName === 'customer/orders') setChangeDataTestId(true);
  }, []);
  // console.log('customer/orders', pathName);
  // 33: customer_orders__element-order-id-\<id>
  // - 34: customer_orders__element-delivery-status-\<id>
  // -
  // - 35: customer_orders__element-order-date-\<id>
  // { `common_${register ? 'register' : 'login'}__input-email` }
  const returnP = (id, deliveryAddress, deliveryNumber) => (
    <p
      name={ id }
      value={ id }
      data-testid={ `seller_orders__element-card-address-${id}` }
    >
      {`${deliveryAddress} ${deliveryNumber}`}
    </p>
  );

  return (
    <S.SalesList>
      {
        redirect
          && <Redirect
            to={ `/${changeDataTestId ? 'seller' : 'customer'}/orders/${orderId}` }
          />
      }
      {
        allSales.map(({
          id, status, sale_date: saleDate, total_price: totalPrice,
          delivery_address: deliveryAddress, delivery_number: deliveryNumber,
        }) => (
          <S.SaleCard
            key={ id }
            name={ id }
            onClick={ () => redirectTo(id) }
          >
            <p
              name={ id }
              value={ id }
              data-testid={
                `${changeDataTestId
                  ? 'seller' : 'customer'}_orders__element-order-id-${id}`
              }
            >
              {`Pedido ${id}`}
            </p>
            <p
              name={ id }
              value={ id }
              data-testid={
                `${changeDataTestId
                  ? 'seller' : 'customer'}_orders__element-order-date-${id}`
              }
            >
              {status}
            </p>
            <p
              name={ id }
              value={ id }
              data-testid={
                `${changeDataTestId
                  ? 'seller' : 'customer'}_orders__element-delivery-status-${id}`
              }
            >
              {saleDate}
            </p>
            <p
              name={ id }
              value={ id }
              data-testid={ `seller_orders__element-card-price-${id}` }
            >
              {totalPrice}
            </p>
            {changeDataTestId
              ? returnP(id, deliveryAddress, deliveryNumber)
              : ''}
          </S.SaleCard>
        ))
      }
    </S.SalesList>
  );
};

export default OrderList;