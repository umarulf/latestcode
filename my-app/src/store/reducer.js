// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   categories: [],
//   transaction: [],
//   totalcount: null,
// };

// export const expenseSlice = createSlice({
//   name: "expense",
//   initialState,
//   reducers: {
//     getTransactions: (state) => {},
//     gettotalcount : (state, action) => {
//       state.totalcount= action.payload
//     }

//   },

// });

// export const { getTransactions } = expenseSlice.actions;
// export default expenseSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  transactions: [],
  totalcount: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    getTransactions: (state) => {},
    gettotalcount: (state, action) => {
      state.totalcount = action.payload; // Assuming action.payload is provided
    },
  },
});

export const { getTransactions, gettotalcount } = expenseSlice.actions;
export default expenseSlice.reducer;
