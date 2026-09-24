import { useState, useEffect } from "react";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "./services/todoServices";
import { use } from "react";
import NewTodoForm from "./NewTodoForm";
import ToDoItem from "./ToDoItem";

export default function ToDoList({ firstName }) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      setTodos(await fetchTodos());
    }
    load();
  }, []);

  async function handleAdd(newTask) {
    const created = await createTodo(newTask);
    setTodos([...todos, created]);
  }

  async function handleDelete(idToDelete) {
    await deleteTodo(idToDelete);
    setTodos(todos.filter((each) => each.id !== idToDelete));
  }

  async function handleToggle(id) {
    const todo = todos.find((t) => t.id === id);
    await setTodoDone(id, !todo.done);
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  return (
    <>
      <h1> To Do List for {firstName}</h1>
      {todos.length === 0 ? (
        <>Nothing to do</>
      ) : (
        <ul>
          {todos.map((elem, index) => (
            <ToDoItem
              key={elem.id}
              elem={elem}
              onDelete={handleDelete}
              onChange={handleToggle}
            />
          ))}
        </ul>
      )}

      <NewTodoForm onAdd={handleAdd} />
    </>
  );
}
