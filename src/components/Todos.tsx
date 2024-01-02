// src/components/Todos.tsx
import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <br />
      <div className="Todos-container">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-card">
            <h2 className="todo-title">
              {todo.title} - {todo.completed ? "Done" : "In Progress"}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
