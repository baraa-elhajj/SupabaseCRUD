import { useEffect, useState } from "react";
import "./App.css";
import supabase from "./supabase-client";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Effects
  useEffect(() => {
    fetchTodoList();
  }, []);

  // CRUD functions goes here:
  const fetchTodoList = async () => {
    const { data, error } = await supabase.from("TodoList").select("*");

    if (error) {
      console.log("Error fetching data: ", error);
    } else {
      setTodoList(data);
    }
  };

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
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        <ul>
          {todoList.map((todo) => (
            <li key={todo.id}>
              <p>{todo.name}</p>
              <button> {todo.isCompleted ? "Undo" : "Complete"}</button>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
