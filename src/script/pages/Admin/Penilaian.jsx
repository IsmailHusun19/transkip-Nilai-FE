import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { FaEye, FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GetPenilaian, DeletePenilaian } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Penilaian = () => {
  const navigate = useNavigate();
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [penilaian, setPenilaian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const getDataPenilaian = await GetPenilaian();
      console.log(getDataPenilaian);
      setPenilaian(getDataPenilaian);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!loading && penilaian) {
      const filteredPenilaian = penilaian.filter((item) =>
        item.pelatihan.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (searchTerm) {
        setDataSearch(filteredPenilaian);
      } else {
        setDataSearch(penilaian);
      }
    }
  }, [searchTerm, penilaian, loading]);

  const deletePenilaian = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Penilaian akan dihapus",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await DeletePenilaian(id);

        await Swal.fire({
          title: "Deleted!",
          text: "Berhasil menghapus penilaian",
          icon: "success",
        });
        location.reload();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
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
              <div className="relative flex justify-end mb-4">
                <div className="absolute top-3 left-0 h-[45.33px]">
                  <h1 className="text-gray-600 text-xl font-semibold">
                    Penilaian
                  </h1>
                </div>
                <div
                  className="cursor-pointer text-gray-600 flex gap-2 items-center border shadow-sm p-2 rounded-md hover:text-gray-800 hover:shadow-md"
                  onClick={() => navigate("/admin/penilaian/tambah")}
                >
                  <FaPlus className="w-7 h-7" />
                  <h1>Tambah Data</h1>
                </div>
              </div>
              <input
                type="text"
                placeholder="Cari nama penilaian..."
                className="border w-1/2 px-3 py-2 rounded-md text-gray-800 text-sm mb-3 outline-none focus:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="relative overflow-x-auto pb-16">
                <div className="shadow-md">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="w-full px-6 py-3">
                          Pelatihan
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Opsi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {penilaian.length === 0 ? (
                        <>
                          <tr>
                            <td
                              colSpan={3}
                              className="text-center font-medium text-gray-600 align-middle h-32"
                            >
                              Data penilaian masih kosong
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {dataSearch.length === 0 ? (
                            <>
                              <tr>
                                <td
                                  colSpan={3}
                                  className="text-center font-medium text-gray-600 align-middle h-32"
                                >
                                  Data penilaian tidak ada
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              {dataSearch.map((penilaian, index) => (
                                <tr
                                  key={penilaian.id}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {index + 1}
                                  </th>
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {penilaian.pelatihan.nama}
                                  </th>
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {penilaian.status ? "Aktif" : "Tidak Aktif"}
                                  </th>
                                  <td className="px-6 py-4 flex gap-2">
                                    <FaEye
                                      onClick={() =>
                                        navigate(
                                          `/admin/detail-penilaian/${penilaian.id}`
                                        )
                                      }
                                      className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                    />{" "}
                                    <FaPencilAlt
                                      onClick={() =>
                                        navigate(
                                          `/admin/penilaian/edit/${penilaian.id}`
                                        )
                                      }
                                      className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                    />{" "}
                                    <FaTrash
                                      onClick={() =>
                                        deletePenilaian(penilaian.id)
                                      }
                                      className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                    />
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <SlideBar />
        </>
      ) : null}
    </>
  );
};

export default Penilaian;
