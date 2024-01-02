// src/components/Photos.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Photo {
  albumId: number;
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}

const Photos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const location = useLocation();
  const { from } = location.state ?? { from: null };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        let apiUrl = "https://jsonplaceholder.typicode.com/photos";

        if (from !== null) {
          apiUrl += `?albumId=${from}`;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching Photos:", error);
      }
    };

    fetchPhotos();
  }, [from]);

  return (
    <div>
      <h1>Photos List</h1>
      <div className="Photos-container">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <h2>
              Album - {photo.albumId} - {photo.title}
            </h2>
            <img src={photo.url} alt={photo.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photos;
