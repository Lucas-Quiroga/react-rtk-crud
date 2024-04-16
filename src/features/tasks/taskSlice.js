import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Learn Redux",
    description: "The store, actions, and reducers, oh my!",
    completed: false,
  },
  {
    id: 2,
    title: "Learn React",
    description: "The fundamentals, including hooks!",
    completed: false,
  },
];

//esto seria equivalente a const [tasks, setTasks] = useState([])
export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  //creamos los reducers que son funciones que modifican el estado de la aplicación (por ej: setState)
  reducers: {
    //dato: payload es un término común en Redux para referirse a los datos que se pasan a las acciones (parametro de la funció)
    //action.payload es el objeto que pasamos al llamar a la acción
    addTask: (state, action) => {
      state.push(action.payload);
    },
    //action.payload es el id que pasamos al llamar a la acción
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },

    //action.payload es el id que pasamos al llamar a la acción
    completeTask: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});

//exportamos las acciones para poder usarlas en otros archivos
export const { addTask, deleteTask, completeTask, editTask } =
  taskSlice.actions;
//exportamos el reducer para poder usarlo en otros archivos
export default taskSlice.reducer;
