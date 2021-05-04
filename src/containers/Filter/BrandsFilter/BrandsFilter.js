import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearBrandsFilter, addBrandsFilter, removeBrandsFilter } from '../../../store/listing/listing-slice';
import './BrandsFilter.css';

export const BrandsFilter = () => {
  const products = useSelector(state => state.listingSlice.filteredItems);
  const brandsFilter = useSelector(state => state.listingSlice.brandsFilter);
  const companies = useSelector(state => state.listingSlice.companies);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredBrands(companies);
  }, [companies]);

  const filterBrands = (val) => {
    if (!val) {
      setFilteredBrands(companies);
    } else {
      const filteredBrands = companies.filter(company => {
        return company.name.toLowerCase().indexOf(val.toLowerCase()) > -1
      });

      setFilteredBrands(filteredBrands);
    }
  };

  const countBrand = (company) => {
    const existBrands = products.filter(product => {
      return product.manufacturer === company.slug
    });

    return existBrands.length;
  };

  const checkOperation = (company) => {
    if (brandsFilter.includes(company.slug)) {
      dispatch(removeBrandsFilter(company.slug));
    } else {
      dispatch(addBrandsFilter(company.slug));
    }
  }

  const generateFilterBrands = () => {
    return (
      filteredBrands.map(company => {
        return (
          <div className={`item ${brandsFilter.includes(company.slug) ? 'checked' : ''}`}
            key={company.name}
            onClick={() => checkOperation(company)}>
            <div className="checkmark">
              <i className="fa fa-check"></i>
            </div>
            <span className="company-name">{company.name}</span>
            <span className="value">({countBrand(company)})</span>
          </div>
        )
      })
    )
  }

  return (
    <div className="brands-wrapper">
      <span className="title">Brands</span>
      <div className="wrapper">
        <input type="text" placeholder="Search brand" onChange={(event) => filterBrands(event.target.value)} />
        <div className="items-wrapper">
          <div className={`item ${!(brandsFilter.length) ? 'checked' : ''}`} onClick={() => dispatch(clearBrandsFilter())}>
            <div className="checkmark">
              <i className="fa fa-check"></i>
            </div>
          All <span className="value">({products.length})</span>
          </div>
          {generateFilterBrands()}
        </div>
      </div>
    </div>
  )
};

export default BrandsFilter;