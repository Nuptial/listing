import { configureStore } from '@reduxjs/toolkit'
import listingSlice from './listing/listing-slice';

export default configureStore({
  reducer: {
    listingSlice
  },
})