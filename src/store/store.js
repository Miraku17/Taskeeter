// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/features/user/userSlice';
import quoteReducer from '@/features/quote/quoteSlice';
import todoReducer from '@/features/todo/todoSlice'; 

const store = configureStore({
  reducer: {
    user: userReducer,
    quote: quoteReducer,
    todos: todoReducer, 
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
