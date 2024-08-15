import { createAsyncThunk } from "@reduxjs/toolkit";
import getDefaultSlice from "@/helper/ReduxHelper";
import axios from "axios";

const API_URL = "/data.json";

/** Ajax 처리를 위한 미들웨어 함수 정의 */
export const getList = createAsyncThunk(
  "MenuSlice/getList",
  async (payload, { rejectWithValue }) => {
    let result = null;

    try {
      const response = await axios.get(API_URL);
      const subvisualMenu = response.data.subvisual_menu;

      // 카테고리에 해당하는 아이템 필터링
      if (payload.category) {
        if (payload.category === "menu_new") {
          result = subvisualMenu;
        } else {
          result = subvisualMenu.find(
            (item) => item.category === payload.category
          );
        }

        if (!result) {
          // 해당 카테고리가 존재하지 않을 경우 에러 처리
          throw new Error("No data found for the specified category.");
        }
      }
    } catch (err) {
      result = rejectWithValue(err.response);
    }
    console.log(result);
    return result;
  }
);

const MenuSlice = getDefaultSlice("MenuSlice", [getList]);

export default MenuSlice.reducer;