import { createAsyncThunk } from '@reduxjs/toolkit';
import getDefaultSlice from '@/helper/ReduxHelper';
import axios from 'axios';

const API_URL = '/data.json';

/** Ajax 처리를 위한 미들웨어 함수 정의 */
export const getList = createAsyncThunk('CommunitySlice/getList', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get(API_URL);
    const communityList = response.data.community;

    // 카테고리에 해당하는 아이템 필터링
    if (payload.category) {
        result = communityList.filter(item => item.category === payload.category);
      }

      if (!result) {
        // 해당 카테고리가 존재하지 않을 경우 에러 처리
        throw new Error('No data found for the specified category.');
      } 
    } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

export const getItem = createAsyncThunk('CommunitySlice/getList', async (payload, { rejectWithValue }) => {
  let result = null;

  try {
    const response = await axios.get(API_URL);
    const communityList = response.data.community;

    // 카테고리에 해당하는 아이템 필터링
    if (payload.post_coffeclass) {
        result = communityList.filter(item => item.id === payload.post_coffeclass);
        console.log(result)
      }

      if (!result) {
        // 해당 카테고리가 존재하지 않을 경우 에러 처리
        throw new Error('No data found for the specified post_coffeclass.');
      } 
    } catch (err) {
    result = rejectWithValue(err.response);
  }

  return result;
});

const CommunitySlice = getDefaultSlice('CommunitySlice', [getList]);

export default CommunitySlice.reducer;
