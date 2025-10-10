import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataStateRedux } from "@/models/responseInterface";
import { IGetWork2 } from "@/models/activityInterface";
import activityService from "@/services/activityService";

const initialState: DataStateRedux<IGetWork2[]> = {
  datas: [],
  loading: false,
  error: null,
};

export const fetchWorksFilterByUser = createAsyncThunk(
  "work/fetchWorksFilterByUser",
  async (
    filter:
      | {
          date_start?: string;
          date_end?: string;
          contract?: string;
          user?:string
          type?: "date" |"week" | "month" | "year";
          export?: boolean;
        }
      | undefined,
    thunkAPI
  ) => {
    try {
      const response = await activityService.getAllWorksFilterByUser(filter);
      return response;
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch payments");
    }
  }
);

const workFilterByUserSlice = createSlice({
  name: "work-filter-by-user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorksFilterByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorksFilterByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.datas = action.payload.data;
      })
      .addCase(fetchWorksFilterByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
}).reducer;

export default workFilterByUserSlice;
