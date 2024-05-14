import { createAsyncThunk } from '@reduxjs/toolkit';
import getDefaultSlice from '@/helper/ReduxHelper';
import axios from 'axios';

const API_URL = '/data.json';

/** Ajax 처리를 위한 미들웨어 함수 정의 */
export const getList = createAsyncThunk('NewsSlice/getList', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get(API_URL);
    const newsList = response.data.news;

    // 카테고리에 해당하는 아이템 필터링
    if (payload.category) {
        if (payload.category === 'cate_all') {
          result = newsList;
        } else {
          result = newsList.filter(item => item.category === payload.category);
        }
        
      if (!result) {
        // 해당 카테고리가 존재하지 않을 경우 에러 처리
        throw new Error('No data found for the specified category.');
      } 
    } else {
      // 카테고리가 전달되지 않은 경우 전체 데이터 반환
      result = newsList;
    }

   
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

export const getItem = createAsyncThunk('NewsSlice/getItem', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get(API_URL);
    const newsItem = response.data.news;
    // 카테고리에 해당하는 아이템 필터링
    if (payload.post_news) {
      result = newsItem.filter(item => item.id === payload.post_news);

      if (!result) {
        // 해당 카테고리가 존재하지 않을 경우 에러 처리
        throw new Error('No data found for the specified category.');
      } 
    }
   
  } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const NewsSlice = getDefaultSlice('NewsSlice', [getList, getItem]);

export default NewsSlice.reducer;
