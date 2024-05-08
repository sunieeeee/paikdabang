/**
 * /src/helpers/ReduxHelper.js
 * 
 * ReduxSlice를 작업하면서 반복되는 중복코드의 모듈화
 */
import {createSlice} from '@reduxjs/toolkit';

//리덕스가 로딩 상태를 관리하는 상태값을 생성하는 함수
function pending(state, {meta, payload}) {
  return {...state, loading: true, error: null}
}

//리덕스가 성공 상태를 관리하는 상태값을 생성하는 함수
function fulfilled(state, {meta, payload}) {
  return {
    data: payload, //백엔드에서 받은 데이터
    loading: false,
    error: null
  }
}

//리덕스가 실패 상태를 관리하는 상태값을 생성하는 함수
function rejected(state, {meta, payload}) {
  console.log(payload);
  return {
    ...state,
    loading: false,
    error: {
      code: payload?.status || 500,
      message: payload?.statusText || 'Server Error'
    }
  }
}

//리덕스 Slice객체를 생성하는 함수
function getDefaultSlice(slideName, asyncReducers=[], callback=null) {
  return createSlice({
    name: slideName,
    initialState: {
      data: null,
      loading: false,
      error: null
    },
    extraReducers: (builder) => {
      asyncReducers.forEach((v, i) => {
        builder.addCase(v.pending, pending);
        builder.addCase(v.fulfilled, callback || fulfilled);
        builder.addCase(v.rejected, rejected);
      })
    }
  })
}

export default getDefaultSlice;