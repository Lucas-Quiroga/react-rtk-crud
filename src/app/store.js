import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/taskSlice";

// creamos el store de Redux para la aplicación
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
