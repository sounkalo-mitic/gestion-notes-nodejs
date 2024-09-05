// src/features/todo/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTasks, createTask, updateTask, deleteTask } from './todoAPI';

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        tasks: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;
