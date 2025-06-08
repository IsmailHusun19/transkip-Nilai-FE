import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { PostUsers } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";

const TambahDataPeserta = () => {
  const navigate = useNavigate();
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    password: "",
    role: "Peserta",
  });
  const [open, setOpen] = useState(false);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const PostData = await PostUsers(form);
      await Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambah peserta",
        icon: "success",
      }).then(() => {
        setForm({
          nama: "",
          email: "",
          password: "",
          role: "Peserta",
        });
      });
    } catch (e) {
      console.error(e);
    }
  };

  const openModalBox = () => {
    setOpen(true);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("File tidak boleh kosong!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/register-excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      await Swal.fire({
        title: "Berhasil",
        text: response.data.message,
        icon: "success",
      }).then(() => {
        navigate(`/admin/peserta`);
      });
    } catch (error) {
      console.error("Upload gagal:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menambahkan peserta",
      });
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div
          className={`flex-1 transition-all ease-linear duration-300 h-[calc(100vh-80px)] bg-white text-white p-5 ${
            isSidebarOpen ? "ml-64" : "ml-[0px]"
          }`}
        >
          <div>
            <Dialog open={open} onClose={setOpen} className="relative z-10">
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
              />

              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                  >
                    <div className="w-[90%] m-auto">
                      <label
                        className="block mb-2 pt-3 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file"
                      >
                        Upload file
                      </label>
                      <input
                        className="block w-full text-sm text-gray-900 p-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="file"
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                      />
                      <p className="text-sm p-2">
                        Note : Upload file excel dengan format{" "}
                        <a
                          href="/registerPeserta.xlsx"
                          download
                          className="text-blue-600 underline"
                        >
                          Unduh template
                        </a>
                      </p>
                    </div>
                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        onClick={() => uploadFile()}
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:ml-3 sm:w-auto"
                      >
                        Upload
                      </button>
                      <button
                        type="button"
                        data-autofocus
                        onClick={() => setOpen(false)}
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Cancel
                      </button>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </div>
          <form className=" flex gap-3 flex-col pb-16" onSubmit={handleSubmit}>
            <h1 className="text-gray-600 text-xl font-semibold mb-2">
              Tambah Peserta
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
              />
            </div>
            <div className="flex justify-end items-center gap-2">
              <button
                type="button"
                onClick={() => openModalBox()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Export
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
      <SlideBar />
    </>
  );
};

export default TambahDataPeserta;
