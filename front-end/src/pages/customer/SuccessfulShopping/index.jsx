import React from 'react';
// import P from 'prop-types';
import style from './successfulShopping.module.scss';

const SuccessfulShopping = () => (
  <div className={ style.successfulShopping }>
    <h1>Compra realizada com sucesso!</h1>
  </div>
);

export default SuccessfulShopping;

// SuccessfulShopping.propTypes = {
//   children: P.node.isRequired,
// };