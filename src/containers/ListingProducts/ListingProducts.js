import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ListingProducts.css';
import ProductCard from '../../components/ProductCard/ProductCard';

export const ListingProducts = () => {
  const products = useSelector(state => state.listingSlice.filteredItems);
  const activePage = useSelector(state => state.listingSlice.activePage);
  const perPageCount = 16;

  const generateProducts = () => {
    return products
      .slice((activePage - 1) * perPageCount, activePage * perPageCount)
      .map((product) => {
        return (
          <ProductCard product={product} key={product.added}></ProductCard>
        );
      });
  }

  return (
    <>
      <div className="products-listing-wrapper">
        {generateProducts()}
      </div>
    </>
  )
}

export default ListingProducts;