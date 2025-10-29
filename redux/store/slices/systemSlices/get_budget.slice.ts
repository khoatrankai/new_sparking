
import { Budget } from "@/models/systemInterface";
import systemService from "@/services/systemService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ProductState {
  datas: Budget[]; // Định nghĩa kiểu cho dữ liệu trả về của `product Vat`
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: ProductState = {
  datas: [],
  loading: false,
  error: null,
};

// Sử dụng createAsyncThunk để tạo action async gọi API
export const fetchBudget = createAsyncThunk(
  "system/fetchBudget",
  async (filter:{date_start:string,date_end:string}|undefined, thunkAPI) => {
    try {
      const Profits = await systemService.getAllBudgets(filter);
      return Profits; // Trả về kết quả từ API
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch product Vats");
    }
  }
);

const budgetSystemSlice = createSlice({
  name: "budget_system",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.loading = false;
          state.datas = action.payload.data;
        }
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
}).reducer;

export default budgetSystemSlice;
