import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { SongCard, Loader, Error } from "../components";
import { searchSongs } from "../redux/services/itunesApi";

const ArtistDetails = () => {
  const { id: artistName } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [songs, setSongs] = useState([]);
  const [artist, setArtist] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artistName) return;
    setIsFetching(true);
    setError(null);
    searchSongs(artistName)
      .then((results) => {
        setSongs(results);
        setArtist(results[0]);
      })
      .catch((err) => setError(err))
      .finally(() => setIsFetching(false));
  }, [artistName]);

  if (isFetching) return <Loader title="Loading artist details..." />;
  if (error) return <Error />;
  if (!artist)
    return (
      <div className="text-white text-2xl font-bold mt-10 text-center">
        Artist not found.
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center mb-10">
        <img
          src={artist.artworkUrl100}
          alt={artist.artistName}
          className="w-40 h-40 rounded-full object-cover shadow-lg mb-4"
        />
        <h2 className="font-bold text-4xl text-white text-center">
          {artist.artistName}
        </h2>
      </div>
      <h3 className="font-bold text-2xl text-white text-left mb-6 w-full">
        Top Songs
      </h3>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8 w-full">
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

export default ArtistDetails;
