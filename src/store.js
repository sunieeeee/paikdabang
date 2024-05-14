import {configureStore} from '@reduxjs/toolkit';
import HeaderSlice from './slices/HeaderSlice';
import MenuSlice from './slices/MenuSlice';
import NewsSlice from './slices/NewsSlice';
import NewsVisualSlice from './slices/NewsVisualSlice';
import CommunityVisualSlice from './slices/CommunityVisualSlice';

const store = configureStore({
  reducer: {
    //형식 => 이름: 값
    //--> 이름은 보통 리듀서의 객체이름과 통일 시킨다.
    HeaderSlice: HeaderSlice,
    MenuSlice: MenuSlice,
    NewsSlice: NewsSlice,
    NewsVisualSlice: NewsVisualSlice,
    CommunityVisualSlice: CommunityVisualSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export default store;