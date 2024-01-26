// src/components/Todos.tsx
import React, { useState, useEffect } from "react";
import "./Todos.css";
import { Todo } from "../interfaces/Todo";
import { User } from "../interfaces/User";


const Todos: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const [todosResponse, usersResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/todos"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        const todosData = await todosResponse.json();
        const usersData = await usersResponse.json();

        setTodos(todosData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTodos();
  }, []);

  const getUserNameById = (userId: number): string => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown User";
  };

  return (
    <div>
      <br />
      <div className="Todos-container">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={"todo-card-" + (todo.completed ? "done" : "inprogress")}
          >
            <p className="todo-author">{getUserNameById(todo.userId)}</p>
            <h2
              className={
                "todo-status-" + (todo.completed ? "done" : "inprogress")
              }
            >
              {todo.completed ? "Done" : "In Progress"}
            </h2>

            <p className="todo-title">{todo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
