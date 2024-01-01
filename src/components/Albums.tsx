// src/components/Albums.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Albums.css";
interface Album {
  userId: number;
  id: number;
  title: string;
}

const Album: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching Albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div>
      <h1>Albums List</h1>
      <div className="Albums-container">
        {albums.map((album) => (
          <div key={album.id} className="album-card">
            <h2 className="album-title">
              {album.id} -
              <Link className="Albums" to="/photos" state={{ from: album.id }}>
                {album.title}
              </Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
