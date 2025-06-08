import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { GetPenilaianById, PutDetailPenilaian } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Pelatihan from "./Pelatihan";

const MengelolaPenilaian = () => {
  const { idPenilaian } = useParams();
  const navigate = useNavigate();
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState([{ mataPelatihan: "", tempat: "", jam: "" }]);

  const handleAddRow = () => {
    setForm([...form, { mataPelatihan: "", jam: "" }]);
  };

  const getData = async () => {
    setLoading(true);
    try {
      const data = await GetPenilaianById(idPenilaian);
      if (data.penilaian && data.penilaian.length > 0) {
        setForm(data.penilaian);
      } else {
        setForm([{ mataPelatihan: "", tempat: "", jam: "" }]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [idPenilaian]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForm = [...form];
    updatedForm[index][name] = value;
    setForm(updatedForm);
  };

  const handleDeleteRow = (index) => {
    const updatedForm = [...form];
    updatedForm.splice(index, 1);
    setForm(updatedForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
        penilaian: form
    }
    try {
      const PutData = await PutDetailPenilaian (idPenilaian, data);
      await Swal.fire({
        title: "Berhasil",
        text: "Berhasil mengelola penilaian",
        icon: "success",
      }).then(() => {
        navigate(`/admin/detail-penilaian/${idPenilaian}`);
      });
    } catch (e) {
      console.error(e);
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
                  Mengelola Penilaian
                </h1>
                {form.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg flex justify-center items-center gap-4 py-3 px-2 border shadow-md bg-gray-50"
                  >
                    <div className="w-full">
                      <label
                        htmlFor="mataPelatihan"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mata Pelatihan
                      </label>
                      <input
                        type="text"
                        id="mataPelatihan"
                        name="mataPelatihan"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={item.mataPelatihan}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="tempat"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tempat Pelatihan
                      </label>
                      <input
                        type="text"
                        id="tempat"
                        name="tempat"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={item.tempat}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="jam"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Jam Pelatihan
                      </label>
                      <input
                        type="number"
                        id="jam"
                        name="jam"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={item.jam}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteRow(index)}
                      className="w-44 h-[41.33px] mt-[27px] text-white bg-blue-600 hover:bg-blue-700 rounded-md px-2 py-1"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
                <div className="w-full flex justify-center items-center">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="max-w-max text-blue-600 mt-2"
                >
                  + Tambah Mata Pelatihan
                </button>
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

export default MengelolaPenilaian;
