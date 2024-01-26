import React, { useState, useEffect } from "react";
import "./Posts.css";
import { Post } from "../interfaces/Post";
import { User } from "../interfaces/User";

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchUsername, setSearchUsername] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();

        setPosts(postsData);
        setUsers(usersData);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getUserNameById = (userId: number): string => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown User";
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUsername(event.target.value);

    const filtered = posts.filter((post) =>
      getUserNameById(post.userId)
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div>
      <br />
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter username"
          value={searchUsername}
          onInput={handleSearch}
        />
      </div>
      <div className="posts-container">
        {filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <p className="post-author">{getUserNameById(post.userId)}</p>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
