import {configureStore} from '@reduxjs/toolkit';
import HeaderSlice from './slices/HeaderSlice';
import MenuSlice from './slices/MenuSlice';
import NewsSlice from './slices/NewsSlice';
import NewsVisualSlice from './slices/NewsVisualSlice';
import CommunityVisualSlice from './slices/CommunityVisualSlice';
import CommunitySlice from './slices/CommunitySlice';
import StoreVisualSlice from './slices/StoreVisualSlice';
import StoreSearchSlice from './slices/StoreSearchSlice';
import BannerWrapSlice from "./slices/BannerWrapSlice";
import BannerSearchSlice from "./slices/BannerSearchSlice";
import SnsWrapSlice from "./slices/SnsWrapSlice";

const store = configureStore({
  reducer: {
    //형식 => 이름: 값
    //--> 이름은 보통 리듀서의 객체이름과 통일 시킨다.
    HeaderSlice: HeaderSlice,
    MenuSlice: MenuSlice,
    NewsSlice: NewsSlice,
    NewsVisualSlice: NewsVisualSlice,
    CommunityVisualSlice: CommunityVisualSlice,
    CommunitySlice: CommunitySlice,
    StoreVisualSlice: StoreVisualSlice,
    StoreSearchSlice: StoreSearchSlice,
    BannerWrapSlice: BannerWrapSlice,
    BannerSearchSlice: BannerSearchSlice,
    SnsWrapSlice: SnsWrapSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;