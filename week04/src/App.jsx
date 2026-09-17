import "./App.css";
import ToDoList from "./ToDoList.jsx";
import Parse from "parse";

function App() {
  Parse.initialize(
    "lJ5r2MjkEiKZjS8mUb38Guz3UKDrmQ0Ugs0XZac9",
    "N5UHESaVa5tVH7gQUxYITr2y87yLWB03WLyp1Xg7",
  );

  Parse.serverURL = "https://parseapi.back4app.com";

  const annasToDoList = [
    { id: "anna-1", text: "Call the landlord", done: false },
    { id: "anna-2", text: "Book the dentist", done: false },
  ];

  const konstantinaToDoList = [
    { id: "konstantina-1", text: "Buy milk", done: false },
    { id: "konstantina-2", text: "Book the dentist", done: false },
  ];

  return (
    <>
      <ToDoList firstName={"Anna"} todos={annasToDoList} />
      <ToDoList firstName={"Konstantina"} todos={konstantinaToDoList} />
    </>
  );
}

export default App;
