import { useEffect } from 'react';
import { setFilteredItems, setActivePage } from '../../store/listing/listing-slice';
import { useSelector, useDispatch } from 'react-redux';

export const FilterOperations = () => {
  const {
    items,
    sorting,
    brandsFilter,
    tagsFilter,
    typeFilter
  } = useSelector(state => state.listingSlice);
  const dispatch = useDispatch();

  const brandsFilterOperation = (newFilteredProducts) => {
    let newBrandsFilter = [];

    if (brandsFilter.length) {
      newFilteredProducts = [];

      brandsFilter.map(brandFilter => {
        newBrandsFilter = items.filter(item => {
          return item.manufacturer === brandFilter
        });

        newFilteredProducts = [...newFilteredProducts, ...newBrandsFilter];
      });
    }

    return newFilteredProducts;
  }

  const tagsFilterOperation = (newFilteredProducts) => {
    let newTagsFilter = [];

    if (tagsFilter.length) {
      let modifiedProducts = [];

      tagsFilter.map(tagFilter => {
        newTagsFilter = newFilteredProducts.filter(filteredProduct => {
          return filteredProduct.tags.includes(tagFilter)
        });

        modifiedProducts = [...modifiedProducts, ...newTagsFilter];
      });

      return modifiedProducts;
    }

    return newFilteredProducts;
  }

  const typeFilterOperation = (newFilteredProducts) => {
    if (typeFilter) {
      newFilteredProducts = newFilteredProducts.filter(filteredProduct => {
        return filteredProduct.itemType === typeFilter
      });
    }

    return newFilteredProducts;
  }

  const sortOperation = (newFilteredProducts) => {
    switch (sorting) {
      case 'Price low to high':
        newFilteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

        break;
      case 'Price high to low':
        newFilteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

        break;
      case 'New to old':
        newFilteredProducts.sort((a, b) => parseFloat(b.added) - parseFloat(a.added));

        break;
      case 'Old to new':
        newFilteredProducts.sort((a, b) => parseFloat(a.added) - parseFloat(b.added));

        break;
      default:
        break;
    }

    return newFilteredProducts;
  }

  useEffect(() => {
    let newFilteredProducts = [...items];

    if (!sorting && !brandsFilter.length && !tagsFilter.length && !typeFilter) {
      dispatch(setFilteredItems(newFilteredProducts));
    } else {
      newFilteredProducts = brandsFilterOperation(newFilteredProducts);
      newFilteredProducts = tagsFilterOperation(newFilteredProducts);
      newFilteredProducts = typeFilterOperation(newFilteredProducts);
      newFilteredProducts = sortOperation(newFilteredProducts);

      dispatch(setFilteredItems(newFilteredProducts));
      dispatch(setActivePage(1));
    }
  }, [sorting, brandsFilter, tagsFilter, typeFilter]);

  return null;
}

export default FilterOperations;