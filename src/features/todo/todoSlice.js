import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  todos: [],
  selectedTodo: null,
  isEditTodoModalOpen: false,
  newTodo: null,
  isAddTodoModalOpen: false
};

export const todoSlice = createSlice({
  name: 'todo',
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
        state.isAddTodoModalOpen = action.payload
    }
  }
});

export const { setTodos, setSelectedTodo, setIsEditTodoModalOpen, setNewTodo, setIsAddTodoModalOpen } = todoSlice.actions;

export default todoSlice.reducer;
