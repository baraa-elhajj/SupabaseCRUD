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

  const completeTodo = async (id, isCompleted) => {
    const { _, error } = await supabase
      .from("TodoList")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    if (error) {
      console.log("Error updating todo: ", error);
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !isCompleted } : todo
      );
      setTodoList(updatedTodoList);
    }
  };

  const deleteTodo = () => {};

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
              <button onClick={() => completeTodo(todo.id, todo.isCompleted)}>
                {" "}
                {todo.isCompleted ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
