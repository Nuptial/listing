import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTypeFilter } from '../../../store/listing/listing-slice';
import './TypesFilter.css';

export const TypesFilter = () => {
  const products = useSelector(state => state.listingSlice.items);
  const typeFilter = useSelector(state => state.listingSlice.typeFilter);
  const [itemTypes, setItemTypes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let itemTypes = [];

    products.map(product => {
      return itemTypes.indexOf(product.itemType) === -1 ? itemTypes.push(product.itemType) : null;
    });

    setItemTypes(itemTypes);
  }, [products]);

  const makeFilter = (itemType) => {
    if (typeFilter === itemType) {
      dispatch(setTypeFilter(null));
    } else {
      dispatch(setTypeFilter(itemType));
    }
  }

  const generateItemTypes = () => {
    return (
      <div className="item-type-container">
        {itemTypes.map(itemType => {
          return (
            <div className={`item-type ${typeFilter === itemType ? 'active' : ' '}`} key={itemType} onClick={() => makeFilter(itemType)}>
              {itemType}
            </div>
          )
        })}
      </div>
    )
  }

  return generateItemTypes();
}

export default TypesFilter;