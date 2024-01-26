// src/components/Photos.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Photos.css";
import { Photo } from "../interfaces/Photo";
import { Album } from "../interfaces/Album";
import { User } from "../interfaces/User";


const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const location = useLocation();
  const { from } = location.state ?? { from: null };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        let apiUrl = "https://jsonplaceholder.typicode.com/photos";

        if (from !== null) {
          apiUrl += `?albumId=${from}`;
        }

        const [photosResponse, albumsResponse, usersResponse] =
          await Promise.all([
            fetch(apiUrl),
            fetch("https://jsonplaceholder.typicode.com/albums"),
            fetch("https://jsonplaceholder.typicode.com/users"),
          ]);

        const albumsData = await albumsResponse.json();
        const usersData = await usersResponse.json();
        const photosData = await photosResponse.json();

        setAlbums(albumsData);
        setUsers(usersData);
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching Photos:", error);
      }
    };

    fetchPhotos();
  }, [from]);

  const mapPhotoIdwWithUserName = (albumId: number): string => {
    const album = albums.find((album) => album.id === albumId);
    const user = users.find((user) => user.id === album?.userId);
    return user ? user.username : "Unknown User";
  };

  return (
    <div>
      <div className="Photos-container">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <p className="photo-author">
              {mapPhotoIdwWithUserName(photo.albumId)}
            </p>
            <h2 className="photo-album">Album - {photo.albumId}</h2>
            <p className="photo-title">{photo.title}</p>
            <img src={photo.url} alt={photo.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
