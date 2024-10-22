import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8080/tasks';  


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get(API_URL);  
  return response.data;
});

//========================= Add a new task =========================
export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
  const response = await axios.post(API_URL, task);  
  return response.data;
});

// =========================Edit a task =========================
export const editTask = createAsyncThunk('tasks/editTask', async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);  
  return response.data;
});

//========================= Delete a task=========================
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await axios.delete(`${API_URL}/${taskId}`);  
  return taskId;
});

//========================= Move a task =========================
export const moveTask = createAsyncThunk('tasks/moveTask', async ({ id, direction }) => {
  const response = await axios.get(`${API_URL}/${id}`);
  const task = response.data;
  
  //========================= Logic for moving task's stage =========================
  const newStage = task.stage + direction;
  if (newStage >= 0 && newStage <= 3) { 
    const updatedTask = { ...task, stage: newStage };
    const updateResponse = await axios.put(`${API_URL}/${id}`, updatedTask);  
    return updateResponse.data;
  }
  return task;
});

//========================= Redux slice =========================
const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;  // ========================= fetched tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.push(action.payload);  //========================= Add
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;  //========================= edit
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return state.filter((task) => task.id !== action.payload);  //========================= Remove task 
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state[index].stage = action.payload.stage;  //========================= Update 
        }
      });
  },
});

export default taskSlice.reducer;
