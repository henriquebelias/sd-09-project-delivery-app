const { product: Product } = require('../models');

const getAll = async () => {
  const products = await Product.findAll();
  console.log(products);
  return products;
};

const getById = async (id) => {
  const product = await Product.findByPk(id);

  return product;
};

module.exports = {
  getAll,
  getById,
};