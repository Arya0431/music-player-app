import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaPlay, FaPause, FaHeart, FaRegHeart, FaPlus } from "react-icons/fa";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

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

const isSongFavorite = (song) => {
  try {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    // Use trackId for iTunes songs, key for Shazam songs
    const songId = song.trackId || song.key;
    return favs.some((fav) => {
      const favId = fav.trackId || fav.key;
      return favId === songId;
    });
  } catch {
    return false;
  }
};

const toggleFavorite = (song) => {
  try {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    const songId = song.trackId || song.key;

    const existingIndex = favs.findIndex((fav) => {
      const favId = fav.trackId || fav.key;
      return favId === songId;
    });

    if (existingIndex !== -1) {
      favs.splice(existingIndex, 1);
    } else {
      favs.push(song);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
    window.dispatchEvent(new Event("storage"));
  } catch {}
};

const SongCard = ({
  song,
  isPlaying,
  activeSong,
  data,
  i,
  isItunes,
  isFavoritePage,
}) => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [favorite, setFavorite] = useState(isSongFavorite(song));
  const [showPlaylistDropdown, setShowPlaylistDropdown] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Pause all other audio elements when this one starts
  useEffect(() => {
    const handlePlay = (e) => {
      document.querySelectorAll("audio").forEach((audio) => {
        if (audio !== e.target) {
          audio.pause();
        }
      });
    };
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("play", handlePlay);
    }
    return () => {
      if (audio) {
        audio.removeEventListener("play", handlePlay);
      }
    };
  }, []);

  // Keep isPreviewPlaying in sync with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleAudioPlay = () => setIsPreviewPlaying(true);
    const handleAudioPause = () => setIsPreviewPlaying(false);
    audio.addEventListener("play", handleAudioPlay);
    audio.addEventListener("pause", handleAudioPause);
    audio.addEventListener("ended", handleAudioPause);
    return () => {
      audio.removeEventListener("play", handleAudioPlay);
      audio.removeEventListener("pause", handleAudioPause);
      audio.removeEventListener("ended", handleAudioPause);
    };
  }, []);

  // Sync favorite state with localStorage
  useEffect(() => {
    const syncFavorite = () => {
      // Only update if the song's favorite status actually changed
      const newFavoriteStatus = isSongFavorite(song);
      setFavorite(newFavoriteStatus);
    };
    window.addEventListener("storage", syncFavorite);
    return () => window.removeEventListener("storage", syncFavorite);
  }, [song]);

  useEffect(() => {
    setPlaylists(JSON.parse(localStorage.getItem("playlists")) || []);
    const handleStorage = () =>
      setPlaylists(JSON.parse(localStorage.getItem("playlists")) || []);
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const addToPlaylist = (playlistIdx) => {
    const all = JSON.parse(localStorage.getItem("playlists")) || [];
    const exists = all[playlistIdx].songs.some(
      (s) => s.trackId === song.trackId || s.key === song.key
    );
    if (!exists) {
      all[playlistIdx].songs.push(song);
      localStorage.setItem("playlists", JSON.stringify(all));
      window.dispatchEvent(new Event("storage"));
      setToastMessage("Song added to playlist!");
      setIsToastVisible(true);
    } else {
      setToastMessage("Song already in playlist!");
      setIsToastVisible(true);
    }
    setShowPlaylistDropdown(false);
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // Custom play/pause for iTunes preview
  const handlePreviewPlayPause = (e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  // iTunes fields
  const image = isItunes ? song.artworkUrl100 : song.images?.coverart;
  const title = isItunes ? song.trackName : song.title;
  const subtitle = isItunes ? song.artistName : song.subtitle;
  const previewUrl = isItunes ? song.previewUrl : song.hub?.actions?.[1]?.uri;

  return (
    <div className="flex flex-col w-[220px] p-4 bg-[#181818] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group relative">
      {/* Heart Icon */}
      <button
        className="absolute top-3 right-3 z-20 text-spotify-green hover:scale-110 transition-transform"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(song);
          setFavorite(isSongFavorite(song)); // Always check the real status from localStorage
          setToastMessage(
            favorite
              ? "Song removed from favorites!"
              : "Song added to favorites!"
          );
          setIsToastVisible(true);
        }}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
      </button>
      {/* Playlist Icon */}
      <div className="absolute top-3 left-3 z-20">
        <button
          className="text-white hover:text-spotify-green hover:scale-110 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            setShowPlaylistDropdown((v) => !v);
          }}
          aria-label="Add to playlist"
        >
          <FaPlus size={20} />
        </button>
        {showPlaylistDropdown && (
          <div className="absolute left-0 mt-2 bg-[#232323] rounded shadow-lg p-2 min-w-[120px]">
            {playlists.length === 0 ? (
              <div className="text-gray-400 text-sm">No playlists</div>
            ) : (
              playlists.map((pl, idx) => (
                <button
                  key={pl.name}
                  className="block w-full text-left text-white hover:text-spotify-green py-1 px-2 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToPlaylist(idx);
                  }}
                >
                  {pl.name}
                </button>
              ))
            )}
          </div>
        )}
      </div>
      <img
        alt="song_img"
        src={image}
        className="w-44 h-44 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
      />
      {isItunes ? (
        previewUrl ? (
          <>
            <audio ref={audioRef} src={previewUrl} preload="none" />
            <button
              onClick={handlePreviewPlayPause}
              className="absolute flex items-center justify-center w-14 h-14 rounded-full bg-[#1DB954] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              type="button"
              aria-label={isPreviewPlaying ? "Pause preview" : "Play preview"}
            >
              {isPreviewPlaying ? <FaPause size={28} /> : <FaPlay size={28} />}
            </button>
          </>
        ) : (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-400 text-xs bg-[#181818] px-2 py-1 rounded">
            Preview not available
          </span>
        )
      ) : (
        <button
          onClick={handlePlayClick}
          className="absolute flex items-center justify-center w-14 h-14 rounded-full bg-[#1DB954] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          type="button"
          aria-label="Play preview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
            />
          </svg>
        </button>
      )}
      <div className="mt-4 flex flex-col items-center">
        <p className="font-bold text-lg text-white truncate w-full text-center">
          {title}
        </p>
        <p className="text-sm text-gray-400 mt-1 truncate w-full text-center">
          {subtitle}
        </p>
      </div>
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
};

export default SongCard;
