import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SongCard } from "../components";

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  } catch {
    return [];
  }
};

const Favorites = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [favorites, setFavorites] = useState(getFavorites());

  useEffect(() => {
    const handleStorage = () => setFavorites(getFavorites());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="text-white text-2xl font-bold mt-10 text-center">
        No favorites yet. Click the heart on a song to add!
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Favorites
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {favorites.map((song, i) => (
          <SongCard
            key={song.trackId || song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={favorites}
            i={i}
            isItunes={!!song.previewUrl}
            isFavoritePage
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
