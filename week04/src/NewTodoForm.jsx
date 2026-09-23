import { useState } from "react";
import "./styling/Button.css";

export default function NewTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task"
      />
      <button className="button" disabled={text.trim().length === 0}>
        Add
      </button>
    </form>
  );
}
