import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { searchSongs } from "../redux/services/itunesApi";

const Discover = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [songs, setSongs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    setError(null);
    searchSongs("top")
      .then(setSongs)
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  }, []);

  if (isFetching) return <Loader title="Loading trending songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover Trending
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs.map((song, i) => (
          <SongCard
            key={song.trackId}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={songs}
            i={i}
            isItunes
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
