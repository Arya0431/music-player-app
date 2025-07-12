import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Searchbar, Sidebar, MusicPlayer } from "./components";
import {
  ArtistDetails,
  TopArtists,
  Discover,
  Search,
  TopCharts,
} from "./pages";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-[#181818] via-[#232323] to-[#282828]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Searchbar />
        <div className="px-8 py-4 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            {/* TopPlay component removed - was empty */}
          </div>
        </div>
      </div>
      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
