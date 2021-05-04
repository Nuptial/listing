import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { addProduct, increaseItemQuantity } from '../../store/listing/listing-slice';
import './ProductCard.css';

export const ProductCard = (props) => {
  const { product } = props;
  const basketProducts = useSelector(state => state.listingSlice.basket);
  const dispatch = useDispatch();

  const productExistInBasket = () => {
    let condition = false;

    basketProducts.map(basketProduct => {
      if (basketProduct.added === product.added) {
        condition = true;
      }
    })

    return condition;
  }

  const addToBasket = () => {
    if (productExistInBasket()) {
      dispatch(increaseItemQuantity(product));

    } else {
      const newProduct = {
        ...product,
        quantity: 1
      };

      dispatch(addProduct(newProduct));
    }
  }

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img src="https://via.placeholder.com/92" alt="placeholder" />
      </div>
      <span className="product-price">₺ {product.price}</span>
      <span className="product-name">{product.name}</span>
      <div className="product-add-button" onClick={addToBasket}>Add</div>
    </div>
  )
}

ProductCard.defaultProps = {
  product: {}
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;