import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { GetPelatihan, PostPenilaian } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const TambahDataPenilaian = () => {
  const navigate = useNavigate();
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [formPelatihan, setFormPelatihan] = useState({
    pelatihanId: "",
    status: "",
  });
  const [pelatihan, setPelatihan] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const getData = await GetPelatihan();
      const data = getData.map((item) => ({
        value: item.id,
        label: item.nama,
      }));
      setPelatihan(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setFormPelatihan((prev) => ({
      ...prev,
      pelatihanId: selectedOption.value,
    }));
  };

  const handleStatusChange = (e) => {
    const value = e.target.value === "true"; // konversi dari string ke boolean
    setFormPelatihan((prev) => ({
      ...prev,
      status: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      pelatihanId: formPelatihan.pelatihanId,
      status: formPelatihan.status,
      penilaian: [],
    };
    try {
      const PostData = await PostPenilaian(data);
      console.log(PostData);
      await Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambah data penilaian",
        icon: "success",
      }).then(() => {
        navigate(`/admin/penilaian`);
      });
    } catch (e) {
      console.error(e);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pelatihan sudah ada penilaian",
      });
    }
  };

  return (
    <>
      {!loading ? (
        <>
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
                  Tambah Penilaian
                </h1>
                <div>
                  <label
                    htmlFor="pelatihanId"
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-white"
                  >
                    Pelatihan
                  </label>
                  <Select
                    id="pelatihanId"
                    options={pelatihan}
                    onChange={handleSelectChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    classNamePrefix="select"
                    placeholder="Pilih pelatihan..."
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pilih Status
                  </label>
                  <select
                    id="status"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formPelatihan.status}
                    required
                    onChange={handleStatusChange}
                  >
                    <option value={""}>Status</option>
                    <option value={true}>Aktif</option>
                    <option value={false}>Tidak Aktif</option>
                  </select>
                </div>
                <div className="flex justify-end items-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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

export default TambahDataPenilaian;
