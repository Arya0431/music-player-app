import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlineUserGroup,
  HiOutlineHeart,
} from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

// Logo removed - using text instead

const links = [
  { name: "Discover", to: "/", icon: HiOutlineHome },
  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },
  { name: "Top Charts", to: "/top-charts", icon: HiOutlineHashtag },
  { name: "Favorites", to: "/favorites", icon: HiOutlineHeart },
  { name: "Playlists", to: "/playlists", icon: HiOutlineMenu },
];

const NavLinks = ({ handleClick }) => (
  <div className="mt-10 flex flex-col gap-2">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className={({ isActive }) =>
          `flex flex-row items-center px-4 py-3 rounded-lg font-bold text-base transition-colors duration-200
          ${
            isActive
              ? "bg-[#282828] text-spotify-green shadow-md"
              : "text-gray-400 hover:bg-[#232323] hover:text-spotify-green"
          }
          `
        }
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-3" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[250px] py-10 px-6 bg-[#181818] shadow-2xl min-h-screen">
        <h1 className="text-2xl font-bold text-spotify-green mb-8 text-center">
          Music Player
        </h1>
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="w-6 h-6 mr-2 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-[#181818] shadow-2xl z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <h1 className="text-2xl font-bold text-spotify-green mb-8 text-center">
          Music Player
        </h1>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
