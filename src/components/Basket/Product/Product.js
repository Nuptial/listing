import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import { increaseItemQuantity, decreaseItemQuantity, removeProduct } from '../../../store/listing/listing-slice';
import './Product.css';

export const Product = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const decreaseQuantity = () => {
    if (product.quantity === 1) {
      dispatch(removeProduct(product));
    } else {
      dispatch(decreaseItemQuantity(product));
    }
  }

  return (
    <div className="product-wrapper">
      <span className="name">{product.name}</span>
      <span className="price">₺{product.price}</span>
      <div className="quantity-wrapper">
        <i className="fa fa-minus" onClick={decreaseQuantity}></i>
        <div className="count">{product.quantity}</div>
        <i className="fa fa-plus" onClick={() => dispatch(increaseItemQuantity(product))}></i>
      </div>
      <div className="divider"></div>
    </div>
  )
}

Product.defaultProps = {
  product: {}
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;