import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../utils/axios";

// quote thunk
export const fetchQuote = createAsyncThunk(
    'quote/fetchQuote',
    async () => {
        try {
            const response = await api.get("/quote");
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
);

// quote slice
const quoteSlice = createSlice({
    name: 'quote',
    initialState: {
        quote: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuote.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuote.fulfilled, (state, action) => {
                state.loading = false;
                state.quote = action.payload;
            })
            .addCase(fetchQuote.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default quoteSlice.reducer;