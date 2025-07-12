import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SongCard } from "../components";

// Toast notification component
const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-spotify-green text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
      {message}
    </div>
  );
};

const getPlaylists = () => {
  try {
    return JSON.parse(localStorage.getItem("playlists")) || [];
  } catch {
    return [];
  }
};

const savePlaylists = (playlists) => {
  localStorage.setItem("playlists", JSON.stringify(playlists));
  window.dispatchEvent(new Event("storage"));
};

const Playlists = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [playlists, setPlaylists] = useState(getPlaylists());
  const [newName, setNewName] = useState("");
  const [selected, setSelected] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    const handleStorage = () => setPlaylists(getPlaylists());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addPlaylist = () => {
    if (!newName.trim()) return;
    const updated = [...playlists, { name: newName.trim(), songs: [] }];
    setPlaylists(updated);
    savePlaylists(updated);
    setNewName("");
    setToastMessage(`Playlist "${newName.trim()}" created successfully!`);
    setIsToastVisible(true);
  };

  const deletePlaylist = (idx) => {
    const updated = playlists.filter((_, i) => i !== idx);
    setPlaylists(updated);
    savePlaylists(updated);
    if (selected === idx) setSelected(null);
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-6">
        Playlists
      </h2>
      <div className="flex items-center mb-6 gap-2">
        <input
          className="bg-[#232323] text-white rounded px-4 py-2 mr-2 focus:ring-2 focus:ring-spotify-green"
          placeholder="New playlist name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          className="bg-spotify-green text-white font-bold px-4 py-2 rounded hover:scale-105 transition-transform"
          onClick={addPlaylist}
        >
          Create
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mb-8">
        {playlists.map((pl, idx) => (
          <div
            key={pl.name}
            className={`bg-[#232323] rounded-lg px-6 py-4 cursor-pointer shadow-md hover:shadow-lg transition-shadow ${
              selected === idx ? "ring-2 ring-spotify-green" : ""
            }`}
            onClick={() => setSelected(idx)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-bold text-lg">{pl.name}</span>
              <button
                className="ml-4 text-red-400 hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  deletePlaylist(idx);
                }}
                aria-label="Delete playlist"
              >
                &times;
              </button>
            </div>
            <span className="text-gray-400 text-sm">
              {pl.songs.length} songs
            </span>
          </div>
        ))}
      </div>
      {selected !== null && playlists[selected] && (
        <div>
          <h3 className="font-bold text-2xl text-white mb-4">
            {playlists[selected].name}
          </h3>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {playlists[selected].songs.length === 0 ? (
              <div className="text-white text-lg">
                No songs in this playlist yet.
              </div>
            ) : (
              playlists[selected].songs.map((song, i) => (
                <SongCard
                  key={song.trackId || song.key}
                  song={song}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={playlists[selected].songs}
                  i={i}
                  isItunes={!!song.previewUrl}
                  isFavoritePage
                />
              ))
            )}
          </div>
        </div>
      )}
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
};

export default Playlists;
