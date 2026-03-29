import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Configurar axios con token
const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Thunks
export const fetchHabits = createAsyncThunk(
  'habits/fetchHabits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/habits');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Error al cargar hábitos');
    }
  }
);

export const createHabit = createAsyncThunk(
  'habits/createHabit',
  async (habitData, { rejectWithValue }) => {
    try {
      const response = await api.post('/habits', habitData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Error al crear hábito');
    }
  }
);

export const completeHabit = createAsyncThunk(
  'habits/completeHabit',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/habits/${id}/complete`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Error al completar hábito');
    }
  }
);

export const deleteHabit = createAsyncThunk(
  'habits/deleteHabit',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/habits/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Error al eliminar hábito');
    }
  }
);

const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    clearHabits: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(completeHabit.fulfilled, (state, action) => {
        const index = state.items.findIndex(h => h._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.items = state.items.filter(h => h._id !== action.payload);
      });
  }
});

export const { clearHabits } = habitsSlice.actions;
export default habitsSlice.reducer;