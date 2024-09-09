import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_URL = 'http://localhost:3000/api/notes';

export const fetchTasks = createAsyncThunk('todo/fetchTasks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createTask = createAsyncThunk('todo/createTask', async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
});

export const updateTask = createAsyncThunk('todo/updateTask', async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk('todo/deleteTask', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});
