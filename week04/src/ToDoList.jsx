import { useState, useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import ToDoItem from "./ToDoItem";
import Parse from "parse";

const TodoItem = Parse.Object.extend("TodoItem");

export default function ToDoList({ firstName }) {
  let h1style = { color: "deeppink", backgroundColor: "white" };

  let [todos, setTodos] = useState([]);

  async function loadTodos() {
    // we are creating a query object for objects of type TodoItem
    const query = new Parse.Query(TodoItem);

    query.equalTo("done", false); //only show those not done
    query.ascending("createdAt");

    // await
    const result = await query.find();

    let todosInDB = [];

    for (const item of results) {
      todosInDB.push({
        id: item.id,
        text: item.get("text"),
        done: item.get("done"),
      });
    }

    setTodos(todosInDB);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  // This is the function that adds a new task (newTask is a String)
  function handleAdd(newTaskText) {
    const item = new TodoItem(); // this creates a row in the table
    item.set("text", newTaskText);
    item.set("done", false);
    item.save().then(onSuccessfulSave).catch(onError);

    function onSuccessfulSave(savedItem) {
      let newTodos = [
        ...todos,
        { id: savedItem.id, text: newTaskText, done: false },
      ];
      setTodos(newTodos);
    }

    function onError(error) {
      alert(error.message);
    }
  }

  function handleDelete(idToDelete) {
    // as we only have the id, we must build a 'stand in' object pointing at that row
    const item = ToDoItem.createWithoutData(idToDelete);

    // destroy() deletes the row on the server; only then drop it from the screen
    item
      .destroy()
      .then(() => {
        let newTodos = todos.filter((each) => each.id !== idToDelete);
        setTodos(newTodos);
      })
      .catch((error) => alert(error.message));
  }

  // check mark has been toggled
  function handleToggle(id) {
    const todo = todos.find((each) => each.id === id);

    const item = TodoItem.createWithoutData(id);
    item.set("done", !todo.done);

    item
      .save()
      .then(() => {
        let newTodos = todos.map((t) =>
          t.id === id ? { ...t, done: !t.done } : t,
        );

        setTodos(newTodos);
      })
      .catch(() => console.log("something went wrong"));
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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
