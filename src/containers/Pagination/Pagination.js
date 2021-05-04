import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setActivePage } from '../../store/listing/listing-slice';
import "./Pagination.css";

const Pagination = () => {
  const products = useSelector(state => state.listingSlice.filteredItems);
  let activePage = useSelector(state => state.listingSlice.activePage);
  const pageCount = 16;
  const dispatch = useDispatch();

  const pages = [...Array(Math.ceil(products.length / pageCount)).keys()].map(
    (value) => value + 1
  );

  const generatePages = () => {
    return pages.map((page, index) => {
      if ((index < 4) || (index >= (pages.length - 4))) {
        return (
          <span
            onClick={() => dispatch(setActivePage(page))}
            key={index}
            className={index + 1 === activePage ? "active page" : "page"}
          >
            {page}
          </span>
        );
      }
    });
  };

  const moveBack = () => {
    if (activePage === 1) {
      dispatch(setActivePage(1));
    }
    else if (activePage <= pages.length) {
      dispatch(setActivePage(activePage - 1));
    }
  }

  const moveNext = () => {
    if (activePage === pages.length) {
      dispatch(setActivePage(pages.length));
    } else if (activePage >= 1) {
      dispatch(setActivePage(activePage + 1));
    }
  }

  return (
    <div className="pagination-container">
      <i
        className="fa fa-arrow-left icon"
        onClick={moveBack}></i>
      <span className="icon-text prev-button-text" onClick={moveBack}>Prev</span>
      <div className="pages-container">{generatePages()}</div>
      <span className="icon-text next-button-text" onClick={moveNext}>Next</span>
      <i
        className="fa fa-arrow-right icon"
        onClick={moveNext}></i>
    </div>
  );
};

export default Pagination;
