import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="w-full flex items-center justify-center py-4 px-2"
    >
      <div className="flex flex-row items-center w-full max-w-xl bg-[#232323] rounded-full px-4 py-2 shadow-md focus-within:ring-2 focus-within:ring-spotify-green transition-all">
        <FiSearch aria-hidden="true" className="w-5 h-5 text-gray-400 mr-3" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent border-none placeholder-gray-400 outline-none text-base text-white font-semibold py-2"
          placeholder="Search for songs, artists..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Searchbar;
