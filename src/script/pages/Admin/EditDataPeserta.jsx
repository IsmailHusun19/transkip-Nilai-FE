import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { PutDataUserAdmin, GetPesertaById } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";

const EditDataPeserta = () => {
  const navigate = useNavigate();
  const { idPeserta } = useParams();
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    role: "Peserta",
  });

  const getData = async () => {
    setLoading(true);
    try {
      const getData = await GetPesertaById(idPeserta);
      setForm({
        nama: getData.data.nama,
        email: getData.data.email,
        password: "",
      });
      console.log(getData)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [idPeserta]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const PostData = await PutDataUserAdmin(idPeserta, form);
      await Swal.fire({
        title: "Berhasil",
        text: "Berhasil mengubah data peserta",
        icon: "success",
      }).then(() => {
        navigate('/admin/peserta')
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {!loading ? (
        <>
          {" "}
          <div>
            <Navbar />
            <div
              className={`flex-1 transition-all ease-linear duration-300 h-[calc(100vh-80px)] bg-white text-white p-5 ${
                isSidebarOpen ? "ml-64" : "ml-[0px]"
              }`}
            >
              <form
                className=" flex gap-3 flex-col pb-16"
                onSubmit={handleSubmit}
              >
                <h1 className="text-gray-600 text-xl font-semibold mb-2">
                  Edit Peserta
                </h1>
                <div>
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    id="nama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={form.nama}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={form.email}
                    autoComplete="username"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                </div>
                <div className="flex justify-end items-center gap-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
          <SlideBar />
        </>
      ) : null}
    </>
  );
};

export default EditDataPeserta;
