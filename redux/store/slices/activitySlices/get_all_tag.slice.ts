
import { Tags } from "@/models/activityInterface";
import activityService from "@/services/activityService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UserState {
  datas: Tags[];
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: UserState = {
  datas: [],
  loading: false,
  error: null,
};

// Sử dụng createAsyncThunk để tạo action async gọi API
export const fetchTagWork = createAsyncThunk(
  "user/fetchTagWork",
  async (_, thunkAPI) => {
    try {
      const data = await activityService.getAllTag();
      return data; // Trả về kết quả từ API
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch User Infos");
    }
  }
);

const tagWorkSlice = createSlice({
  name: "tag_work",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagWork.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagWork.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.loading = false;
          state.datas = action.payload.data;
        }
      })
      .addCase(fetchTagWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
}).reducer;

export default tagWorkSlice;
