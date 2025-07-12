import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { searchSongs } from "../redux/services/itunesApi";

const TopCharts = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [songs, setSongs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    setError(null);
    searchSongs("top charts")
      .then(setSongs)
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  }, []);

  if (isFetching) return <Loader title="Loading Top Charts..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Charts
      </h2>
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

export default TopCharts;
