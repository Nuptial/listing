import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product/Product';
import './Basket.css';

export const Basket = () => {
  const basketProducts = useSelector(state => state.listingSlice.basket);

  const generateBasketProducts = () => {
    return basketProducts.map(basketProduct => {
      return <Product product={basketProduct} key={basketProduct.added}></Product>
    })
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    basketProducts.map(basketProduct => {
      return totalPrice += basketProduct.quantity * basketProduct.price;
    });

    return totalPrice.toFixed(2);
  }

  return (
    <div className="basket-wrapper">
      <i className="fa fa-lock"></i>
      <span className="basket-wrapper-price">₺ {calculateTotalPrice()}</span>
      <div className="basket-content">
        <div className="inner-rect">
          {generateBasketProducts()}
          <div className="total-price">₺{calculateTotalPrice()}</div>
        </div>
      </div>
    </div>
  )
}

export default Basket;