import { useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // CRUD functions goes here:
  const addTodo = async () => {
    const newTodoData = {
      name: newTodo,
      isCompleted: false,
    };

    // Insert into Supabase database
    const { data, error } = await supabase
      .from("TodoList")
      .insert([newTodoData])
      .single();

    if (error) {
      console.log("Error adding todo: ", error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo("");
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="New todo ..."
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        <ul></ul>
      </div>
    </>
  );
}

export default App;
