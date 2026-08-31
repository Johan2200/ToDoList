import "./App.css";
import ToDoList from "./ToDoList.jsx";
import ToDoPanel from "./ToDoPanel.jsx";

function App() {
  const johansToDoList = [
    "buy new wheel for extra bike",
    "replace the rusty wheel extra bike",
  ];
  const laterToDoList = ["Buy baby stroller", "sign up for a dentist"];

  return (
    <>
      <ToDoList firstName={"Johan"} todos={johansToDoList} />
      <ToDoList firstName={"Johan (later)"} todos={laterToDoList} />
    </>
  );
}

export default App;
