import { useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setTodo] = useState("");

  // CRUD functions goes here

  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="New todo ..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button>Add Todo</button>
      </div>
      <div>
        <ul></ul>
      </div>
    </>
  );
}

export default App;
