import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  todos: [],
  selectedTodo: null,
  isEditTodoModalOpen: false,
  newTodo: null,
  isAddTodoTodoModalOpen: false
};

export const todoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setTodos: (state, action) => {
        state.todos = action.payload;
    },
    setSelectedTodo: (state, action) => {
        state.selectedTodo = action.payload;
    },
    setIsEditTodoModalOpen: (state, action) => {
        state.isEditTodoModalOpen = action.payload;
    },
    setNewTodo: (state, action) => {
        state.newTodo = action.payload;
    },
    setIsAddTodoModalOpen: (state, action) => {
        state.isAddTodoTodoModalOpen = action.payload
    }
  }
});

export const { setTodos, setSelectedTodo, setIsEditTodoModalOpen, setNewTodo, setIsAddTodoModalOpen } = todoSlice.actions;

export default todoSlice.reducer;
