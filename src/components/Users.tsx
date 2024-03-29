// src/components/Users.tsx
import React, { useState, useEffect } from "react";
import "./Users.css";
import { User } from "../interfaces/User";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching Users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="Users-title">Users List</h1>
      <div className="Users-container">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h2 className="user-title">
              {user.id} - {user.username}
            </h2>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
