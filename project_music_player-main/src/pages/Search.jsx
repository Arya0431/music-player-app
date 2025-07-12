import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Error, Loader, SongCard } from "../components";
import { searchSongs } from "../redux/services/itunesApi";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [songs, setSongs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;
    setIsFetching(true);
    setError(null);
    searchSongs(searchTerm)
      .then(setSongs)
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  }, [searchTerm]);

  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for <span className="font-black">{searchTerm}</span>
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

export default Search;
