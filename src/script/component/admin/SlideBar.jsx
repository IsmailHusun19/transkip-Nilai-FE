import React from "react";
import { HiOutlineSearch, HiTicket, HiX, } from "react-icons/hi";
import { ImProfile } from "react-icons/im";
import { MdSettings, MdLogout } from "react-icons/md";
import { links } from "./data";
import { useGlobalContext } from "./context";
import { Logout } from "../../config/ApiService";

const SlideBar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  const handleLogout = async () => {
    try{
      const logout = await Logout();
      if(logout.status === 200){
        navigate('/login')
      }
    }catch(e){
      console.error(e)
    }
  }

  return (
    <div
      className={`transition-all z-20  duration-500  fixed top-0 ${
        isSidebarOpen ? "left-0" : "-left-64"
      }`}
    >
      <div className="flex h-screen shadow-xl overflow-y-auto flex-col bg-white  w-64 px-4 py-8 border-r min-h-screen relative">
        <button
          onClick={closeSidebar}
          className="absolute top-1 right-1  text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
        >
          <HiX className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800">
          BBPVP <span className="text-indigo-500 ml-1">Serang</span>
        </h2>
        <div className="flex flex-col mt-6  justify-between flex-1">
          <nav className="text">
            {links.map((link, index) => {
              const { id, url, text, icon } = link;
              return (
                <a
                  key={id}
                  href={url}
                  className={`capitalize flex items-center px-4 py-2 ${
                    index === 0 ? "hover:bg-slate-200 text-gray-700" : null
                  } ${
                    index > 0
                      ? "mt-2 text-gray-600 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200 transform"
                      : null
                  } rounded-md`}
                >
                  {icon}
                  <span className="mx-4 font-medium">{text}</span>
                </a>
              );
            })}
            <hr className="my-6" />
            <a
              href="/admin/profile"
              className="flex items-center px-4 py-2 mt-2 rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
            >
              <ImProfile className="w-5 h-5" />
              <span className="mx-4 font-medium">Profile</span>
            </a>
            <a
              href="/login"
              onClick={() => handleLogout()}
              className="flex items-center px-4 py-2 mt-2 rounded-md text-gray-600 hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
            >
              <MdLogout className="w-5 h-5" />
              <span className="mx-4 font-medium">Logout</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default SlideBar;
