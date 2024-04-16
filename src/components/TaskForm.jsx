import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task && task.title.trim() && task.description.trim()) {
      if (id) {
        dispatch(editTask(task));
        navigate("/");
      } else {
        dispatch(addTask({ ...task, id: uuid(), completed: false }));
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (id) {
      setTask(tasks.find((task) => task.id === parseInt(id)));
    }
  }, [id, tasks]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task title"
        name="title"
        onChange={handleChange}
        value={task.title}
      />
      <textarea
        placeholder="Task description"
        name="description"
        onChange={handleChange}
        value={task.description}
      ></textarea>
      <button type="submit">{id ? "Edit task" : "Add task"}</button>
    </form>
  );
};

export default TaskForm;
