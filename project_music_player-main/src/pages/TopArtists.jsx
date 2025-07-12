import React, { useEffect, useState } from "react";
import { Error, Loader } from "../components";
import { searchSongs } from "../redux/services/itunesApi";

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    setError(null);
    searchSongs("top artist")
      .then((results) => {
        // Get unique artists by artistName
        const unique = [];
        const seen = new Set();
        results.forEach((song) => {
          if (!seen.has(song.artistName)) {
            seen.add(song.artistName);
            unique.push(song);
          }
        });
        setArtists(unique.slice(0, 20));
      })
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  }, []);

  if (isFetching) return <Loader title="Loading top artists..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Top Artists
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {artists.map((artist, i) => (
          <div
            key={artist.artistName}
            className="flex flex-col items-center w-[180px] p-4 bg-[#181818] rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
          >
            <img
              src={artist.artworkUrl100}
              alt={artist.artistName}
              className="w-32 h-32 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-4 font-bold text-lg text-white truncate text-center">
              {artist.artistName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
