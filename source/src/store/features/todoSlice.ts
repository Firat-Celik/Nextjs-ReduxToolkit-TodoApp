import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  description: string;
  isComplete: boolean;
  isDelete: boolean;
  isActive: boolean;
}

interface TodoState {
  todos: Todo[];
  isCompleteCount: number;
  isDeleteCount: number;
  isActiveCount: number;
  isTotalCount: number;
}

const initialState: TodoState = {
  todos: [],
  isCompleteCount: 0,
  isDeleteCount: 0,
  isActiveCount: 0,
  isTotalCount: 0,
};

// export const fetchPerson = createAsyncThunk(
//     "person/fetch",
//     async (thunkAPI) => {
//       const response = await fetch("http://localhost:8000/person", {
//         method: "GET",
//       });
//       const data = response.json();
//       return data;
//     },
// );

export const saveTodo = createAsyncThunk(
    "todo/save",
    async (description: string, thunkAPI) => {
      const response = await fetch("http://localhost:8000/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
        }),
      });
      const data = await response.json();
      return data;
    },
);

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ description: string }>) => {
      state.todos.push({
        id: state.todos.length,
        description: action.payload.description,
        isComplete: false,
        isDelete: false,
        isActive: true
      });
          state.isActiveCount ++;
          state.isTotalCount++;
    },
    clearTodo: (state) => {
      state.todos = [];
    },
    removeTodo: (state, action: PayloadAction<{ id: number }>) => {
      const TodoItem:any = state.todos.find((item) => item.id === action.payload.id);
      TodoItem.isDelete = true;
      TodoItem.isActive = false;
      state.isDeleteCount++;
    },
    editTodo: (state, action: PayloadAction<{ description:string,id: any }>) => {
      const TodoItem:any = state.todos.find((item) => item.id === action.payload.id);
      TodoItem.description=action.payload.description;
    },
    completeTodo: (state, action: PayloadAction<{ id: number }>) => {
      const TodoItem:any = state.todos.find((item) => item.id === action.payload.id);
      TodoItem.isComplete = true;
      TodoItem.isActive = false;
      state.isCompleteCount++;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchPerson.fulfilled, (state, action) => {
    //   state.persons = action.payload;
    // });

    builder.addCase(saveTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
  },
});

export default TodoSlice.reducer;
export const { addTodo,removeTodo,editTodo,completeTodo } = TodoSlice.actions;
