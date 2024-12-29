import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/axios";

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { rejectWithValue }) => {
    try {
      // Debug token
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);

      const response = await api.get("/todos");
      console.log("API Response:", response.data);
      return response.data.data;
    } catch (error) {
      console.log("API Error:", error.response);
      return rejectWithValue(error.response?.data || "Failed to fetch todos");
    }
  }
);

// Create todo async thunk
export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await api.post("/todos", todoData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update todo async thunk
export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/todos/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error("Update Error:", error);
      console.log("Update Error Response:", error.response);
      console.log("Update Error Status:", error.response?.status);
      console.log(
        "Update Error Message:",
        error.response?.data?.message || error.message
      );

      // Handle specific error
      if (error.response?.data?.message === "No update data provided") {
        console.error("Specific Error: No update data provided");
      }

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete todo async thunk
export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/todos/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to delete todo" });
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearTodos: (state) => {
      state.items = [];
      state.lastFetched = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to fetch todos";
      })

      // Create todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to create todo";
      })

      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload; // Update the specific item
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to update todo";
      })

      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Failed to delete todo";
      });
  },
});

export const { clearErrors, clearTodos } = todoSlice.actions;

// Selectors
export const selectTodos = (state) => state.todos.items;
export const selectTodosLoading = (state) => state.todos.loading;
export const selectTodosError = (state) => state.todos.error;
export const selectLastFetched = (state) => state.todos.lastFetched;

export default todoSlice.reducer;
