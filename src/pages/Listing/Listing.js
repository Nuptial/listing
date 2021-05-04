import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './Listing.css';
import { setItems, setCompanies, setFilteredItems } from '../../store/listing/listing-slice';
import Header from '../../components/Header/Header';
import Sorting from '../../containers/Sorting/Sorting';
import BrandsFilter from '../../containers/Filter/BrandsFilter/BrandsFilter';
import TagsFilter from '../../containers/Filter/TagsFilter/TagsFilter';
import TypesFilter from '../../containers/Filter/TypesFilter/TypesFilter';
import ListingProducts from '../../containers/ListingProducts/ListingProducts';
import Pagination from '../../containers/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import FilterOperations from '../../components/FilterOperations/FilterOperations';

export const Listing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let reqUrlCompanies = '';
    let reqUrlItems = '';

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      reqUrlCompanies = 'http://localhost:3004/companies';
      reqUrlItems = 'http://localhost:3004/items';
    } else {
      reqUrlCompanies = 'https://json-server-project-example.herokuapp.com/companies';
      reqUrlItems = 'https://json-server-project-example.herokuapp.com/items';
    }

    fetch(reqUrlCompanies, { mode: 'cors' })
      .then(response => response.json())
      .then(data => dispatch(setCompanies(data)));

    fetch(reqUrlItems, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        dispatch(setItems(data));
        dispatch(setFilteredItems(data));
      });
  }, []);

  return (
    <div className="listing-wrapper">
      <Header></Header>
      <div className="content">
        <div className="left-wrapper">
          <Sorting></Sorting>
          <BrandsFilter></BrandsFilter>
          <TagsFilter></TagsFilter>
        </div>
        <div className="right-wrapper">
          <span className="title">Products</span>
          <TypesFilter></TypesFilter>
          <ListingProducts></ListingProducts>
          <Pagination></Pagination>
        </div>
      </div>
      <Footer></Footer>
      <FilterOperations></FilterOperations>
    </div>
  )
}

export default Listing;