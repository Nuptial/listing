import React from 'react';
import { setSorting } from '../../store/listing/listing-slice';
import { useSelector, useDispatch } from 'react-redux';
import './Sorting.css';

export const Sorting = () => {
  const sorting = useSelector(state => state.listingSlice.sorting);
  const dispatch = useDispatch();

  return (
    <div className="sorting-wrapper">
      <span className="title">Sorting</span>
      <div className="items-wrapper">
        <div
          className={`item ${sorting === 'Price low to high' ? 'checked' : ' '}`}
          onClick={() => dispatch(setSorting('Price low to high'))}>
          <div className="checkmark">
            <i className="fa fa-check"></i>
          </div>
          <span>Price low to high</span>
        </div>
        <div
          className={`item ${sorting === 'Price high to low' ? 'checked' : ' '}`}
          onClick={() => dispatch(setSorting('Price high to low'))}>
          <div className="checkmark">
            <i className="fa fa-check"></i>
          </div>
          <span>Price high to low</span>
        </div>
        <div
          className={`item ${sorting === 'New to old' ? 'checked' : ' '}`}
          onClick={() => dispatch(setSorting('New to old'))}>
          <div className="checkmark">
            <i className="fa fa-check"></i>
          </div>
          <span>New to old</span>
        </div>
        <div
          className={`item ${sorting === 'Old to new' ? 'checked' : ' '}`}
          onClick={() => dispatch(setSorting('Old to new'))}>
          <div className="checkmark">
            <i className="fa fa-check"></i>
          </div>
          <span>Old to new</span>
        </div>
      </div>
    </div>
  )
}

export default Sorting;