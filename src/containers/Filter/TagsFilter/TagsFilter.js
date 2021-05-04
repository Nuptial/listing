import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearTagsFilter, addTagsFilter, removeTagsFilter } from '../../../store/listing/listing-slice';
import './TagsFilter.css';

export const TagsFilter = () => {
  const products = useSelector(state => state.listingSlice.filteredItems);
  const tagsFilter = useSelector(state => state.listingSlice.tagsFilter);
  const [tags, setTags] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const tags = products.reduce((accumulator, obj) => [...accumulator, ...obj.tags], []);
    const uniqTags = [...new Set(tags)];

    setTags(uniqTags);
  }, [products]);

  useEffect(() => {
    setFilteredTags(tags);
  }, [tags]);

  const filterTags = (val) => {
    if (!val) {
      setFilteredTags(tags);
    } else {
      const filteredTags = tags.filter(tag => {
        return tag.toLowerCase().indexOf(val.toLowerCase()) > -1
      });

      setFilteredTags(filteredTags);
    }
  };

  const countTag = (tag) => {
    const existTags = products.filter(product => {
      return product.tags.includes(tag)
    });

    return existTags.length;
  };

  const checkOperation = (tag) => {
    if (tagsFilter.includes(tag)) {
      dispatch(removeTagsFilter(tag));
    } else {
      dispatch(addTagsFilter(tag));
    }
  }

  const generateFilterTags = () => {
    return (
      filteredTags.map(tag => {
        return (
          <div
            className={`item ${tagsFilter.includes(tag) ? 'checked' : ''}`}
            key={tag}
            onClick={() => checkOperation(tag)}>
            <div className="checkmark">
              <i className="fa fa-check"></i>
            </div>
            <span className="company-name">{tag}</span>
            <span className="value">({countTag(tag)})</span>
          </div>
        )
      })
    )
  }

  return (
    <div className="tags-wrapper">
      <span className="title">Tags</span>
      <div className="wrapper">
        <input type="text" placeholder="Search tag" onChange={(event) => filterTags(event.target.value)} />
        <div className="items-wrapper">
          <div className={`item ${!tagsFilter.length ? 'checked' : ''}`} onClick={() => dispatch(clearTagsFilter())}>
            <div className="checkmark">
              <i className="fa fa-check"></i>
            </div>
          All <span className="value">({products.length})</span>
          </div>
          {generateFilterTags()}
        </div>
      </div>
    </div>
  )
};

export default TagsFilter;