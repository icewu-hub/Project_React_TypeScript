// src/components/Albums.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Albums.css";
import { Album } from "../interfaces/Album";
import { User } from "./User";

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const [albumsResponse, usersResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/albums"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        const albumsData = await albumsResponse.json();
        const usersData = await usersResponse.json();

        setAlbums(albumsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAlbums();
  }, []);

  const getUserNameById = (userId: number): string => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : "Unknown User";
  };

  return (
    <div>
      <h1 className="albums-page-title">Albums</h1>
      <div className="Albums-container">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <p className="album-author">{getUserNameById(album.userId)}</p>
            <h2 className="album-id">
              <Link className="Albums" to="/photos" state={{ from: album.id }}>
                Album - {album.id}
              </Link>
            </h2>

            <p className="album-title">{album.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
