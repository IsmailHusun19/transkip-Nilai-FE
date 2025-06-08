import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "./context";
import Profile from "../../../assets/Profile.png";
import { GetUser } from "../../config/ApiService";

const Navbar = () => {
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    alamat: "",
    noTelepon: "",
    tanggalLahir: "",
    periode: "",
    foto: "",
  });

  // Fungsi untuk ambil data user
  const getData = async () => {
    setLoading(true);
    try {
      const getData = await GetUser();
      if (getData) {
        setDataUser(getData);
        setFormData({
          nama: getData.nama || "",
          email: getData.email || "",
          password: getData.password || "",
          alamat: getData.alamat || "",
          noTelepon: getData.noTelepon || "",
          foto: getData.foto || "",
          tanggalLahir: getData.tanggalLahir
            ? new Date(getData.tanggalLahir).toISOString().split("T")[0]
            : "",

          periode: getData.periode || "",
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          {" "}
          <div className="w-full h-20">
            <div>
              <div className="w-full z-10 h-20 shadow-md fixed flex justify-end items-center gap-2 p-2 bg-white text-sm">
                <h1
                  className={`absolute top-1/2 transform -translate-y-1/2 text-base text-gray-600 font-medium transition-all ease-linear duration-300 ${
                    isSidebarOpen ? "left-[270px]" : "left-20"
                  }`}
                >
                  Dashboard
                </h1>

                <div className="pr-6 flex justify-center items-center gap-2">
                  <h1 className="font-semibold text-gray-600 text-base">
                    {formData.nama}
                  </h1>
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={formData.foto ? `http://localhost:3000${formData.foto}` : Profile}
                    className="size-10 p-0 rounded-full border-1 border-gray-600 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={openSidebar}
            className={`${
              isSidebarOpen ? "-translate-x-8" : "translate-x-0"
            } fixed z-10 top-6 shadow-lg transition transform ease-linear duration-500 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800`}
          >
            <FaBars className="w-5 h-5" />
          </button>
        </>
      ) : null}
    </>
  );
};

export default Navbar;
