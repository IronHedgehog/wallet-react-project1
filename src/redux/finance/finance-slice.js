import { createSlice } from "@reduxjs/toolkit";
import { colors } from "assets/const";
import { toast } from "react-toastify";
import { logOut, refresh } from "redux/session/auth-operation";
import {
  addTransaction,
  allTransactions,
  getCategories,
  getSummary,
} from "./finance-operation";

const initialState = {
  data: null,
  totalBalance: null,
  summary: null,
  error: null,
  categories: null,
  loading: false,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  extraReducers: {
    [allTransactions.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [allTransactions.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },
    [allTransactions.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      if (payload) {
        toast.error("Fatal error");
      }
    },
    [getSummary.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getSummary.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.summary = payload;
    },
    [getSummary.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      if (payload) {
        toast.error("Fatal error");
      }
    },

    [getCategories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.categories = payload.map((obj, i) => {
        return obj.type === "EXPENSE"
          ? { ...obj, backgroundColor: colors[i] }
          : obj;
      });
    },
    [getCategories.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      if (payload) {
        toast.error("Fatal error");
      }
    },
    [addTransaction.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [addTransaction.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload) {
        toast.success("Add successfull");
      } else {
        toast.error("Try later");
      }
      state.data = [...state.data, payload];
      state.totalBalance = payload.balanceAfter;
    },
    [addTransaction.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      if (payload === "Request failed with status code 409") {
        toast.error("Error, try another one");
      } else {
        toast.error("Try later");
      }
    },
    [logOut.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [logOut.fulfilled]: (state) => {
      state.loading = false;
      state.data = null;
      state.totalBalance = null;
      state.summary = null;
      state.error = null;
      state.categories = null;
    },
    [logOut.rejected]: (state, { payload }) => {
      state.loading = false;
      if (payload) {
        toast.error("you are not authorized");
      } else {
        toast.error("try later");
      }
      state.error = payload;
    },

    [refresh.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [refresh.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.totalBalance = payload.balance;
    },
    [refresh.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { resetFinance } = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
