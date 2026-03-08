import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const fetchHabits = createAsyncThunk(
  'habits/fetchHabits',
  async () => {
    const response = await axios.get(`${API_URL}/habits`)
    return response.data.data
  }
)

export const createHabit = createAsyncThunk(
  'habits/createHabit',
  async (habitData) => {
    const response = await axios.post(`${API_URL}/habits`, habitData)
    return response.data.data
  }
)

export const completeHabit = createAsyncThunk(
  'habits/completeHabit',
  async (id) => {
    const response = await axios.post(`${API_URL}/habits/${id}/complete`)
    return response.data.data
  }
)

const habitsSlice = createSlice({
  name: 'habits',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(completeHabit.fulfilled, (state, action) => {
        const index = state.items.findIndex(h => h._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
  },
})

export default habitsSlice.reducer