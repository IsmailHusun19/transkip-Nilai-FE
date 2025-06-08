import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { PostPesertaPelatihan, GetPeserta } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const TambahPesertaPelatihan = () => {
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const navigate = useNavigate()
  const { idPelatihan } = useParams();
  const [loading, setLoading] = useState(true);
  const [peserta, setPeserta] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    pelatihanId: parseInt(idPelatihan),
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const getDataPeserta = await GetPeserta();
      const data = getDataPeserta.data.map((item) => ({
        value: item.id,
        label: item.nama,
      }));
      setPeserta(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setForm({ ...form, userId: selectedOption.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const PostDataPesertaPelatihan = await PostPesertaPelatihan(form);
      await Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambah peserta pelatihan",
        icon: "success",
      }).then(() => {
        setForm({
          userId: "",
          pelatihanId: parseInt(idPelatihan),
        });
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Peserta sudah pernah bergabung ke pelatihan",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    formData.append("pelatihanId", idPelatihan);

    try {
      const response = await axios.post(
        "http://localhost:3000/peserta-pelatihan/upload",
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
        navigate(`/admin/detail-pelatihan/${idPelatihan}`)
      });
    } catch (error) {
      console.error("Upload gagal:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menambahkan peserta",
      });
    }finally{
      setOpen(false);
    }
  }

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
                              href="/PesertaPelatihan.xlsx"
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
              <form
                className=" flex gap-3 flex-col pb-16"
                onSubmit={handleSubmit}
              >
                <h1 className="text-gray-600 text-xl font-semibold mb-2">
                  Tambah Peserta Pelatihan
                </h1>
                <div>
                  <label
                    htmlFor="userId"
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
                  >
                    Nama Peserta
                  </label>
                  <Select
                    id="userId"
                    options={peserta}
                    onChange={handleSelectChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    classNamePrefix="select"
                    placeholder="Pilih peserta..."
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
      ) : null}
    </>
  );
};

export default TambahPesertaPelatihan;
