import { createAsyncThunk } from '@reduxjs/toolkit';
import getDefaultSlice from '@/helper/ReduxHelper';
import axios from 'axios';

const API_URL = '/data.json';

/** Ajax처리를 위한 미들웨어 함수 정의 */
export const getList = createAsyncThunk('StoreSearchSlice/getList', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get(API_URL);
    let storeItem = response.data.store;

    if (payload.regionSearch && payload.regionSearch !== '전체') {
      storeItem = storeItem.filter(item => item.region === payload.regionSearch);
    }

    if (payload.citySearch && payload.citySearch !== '전체') {
      storeItem = storeItem.filter(item => item.city === payload.citySearch);
    }

    if (payload.inputSearch) {
      storeItem = storeItem.filter(item => item.store_name.includes(payload.inputSearch));
    }

    result = storeItem;
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const StoreSearchSlice = getDefaultSlice("StoreSearchSlice", [getList]);

export default StoreSearchSlice.reducer;
