import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { GetJurusanById, PutJurusan } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const EditDataJurusan = () => {
  const navigate = useNavigate();
  const { idJurusan } = useParams();
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    nama: "",
    aktif: "",
  });

  const getData = async () => {
    setLoading(true);
    try {
      const getData = await GetJurusanById(idJurusan);
      console.log(getData)
      setForm({
        nama: getData.data.nama,
        aktif: getData.data.aktif,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [idJurusan]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "aktif") {
      setForm({ ...form, [id]: value === "true" });
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const PutData = await PutJurusan(idJurusan, form);
      await Swal.fire({
        title: "Berhasil",
        text: "Berhasil edit jurusan",
        icon: "success",
      }).then(() => {
        navigate("/admin/jurusan");
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
                  Edit Jurusan
                </h1>
                <div>
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Jurusan
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
                    htmlFor="aktif"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                Pilih Status
                  </label>
                  <select
                    id="aktif"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={form.aktif}
                    required
                    onChange={handleChange}
                  >
                    <option value={""}>Status</option>
                    <option value={true}>Aktif</option>
                    <option value={false}>Tidak Aktif</option>
                  </select>
                </div>
                <div className="flex justify-end items-center">
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

export default EditDataJurusan;
