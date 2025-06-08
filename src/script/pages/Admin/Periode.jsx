import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { FaEye, FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GetPeriode, DeletePeriode } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Periode = () => {
    const navigate = useNavigate()
  const [periode, setPeriode] = useState();
  const [loading, setLoading] = useState(true);
  const { openSidebar, isSidebarOpen } = useGlobalContext();

  const getDataPeriode = async () => {
    setLoading(true);
    try {
      const getData = await GetPeriode();
      setPeriode(getData.data);
      console.log(getData.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deletePeriode = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Pelatihan dan peserta yang ada dalam periode ini akan terhapus",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await DeletePeriode(id);
        await Swal.fire({
          title: "Deleted!",
          text: "Berhasil menghapus pelatihan",
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

  useEffect(() => {
    getDataPeriode();
  }, []);

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
              <div className="relative flex justify-end mb-5">
                <div className="absolute top-3 left-0 h-[45.33px]">
                  <h1 className="text-gray-600 text-xl font-semibold">
                    Periode
                  </h1>
                </div>
                <div
                  className="cursor-pointer text-gray-600 flex gap-2 items-center border shadow-sm p-2 rounded-md hover:text-gray-800 hover:shadow-md"
                  onClick={() => navigate("/admin/periode/tambah")}
                >
                  <FaPlus className="w-7 h-7" />
                  <h1>Tambah Data</h1>
                </div>
              </div>
              <div className="relative overflow-x-auto pb-16">
                <div className="shadow-md">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Periode
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 ${
                            periode.length === 0 ? "min-w-max" : "min-w-[200px]"
                          }`}
                        >
                          Tanggal Dibuat
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Opsi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {periode.length === 0 ? (
                        <>
                          <tr>
                            <td
                              colSpan={4}
                              className="text-center font-medium text-gray-600 align-middle h-32"
                            >
                              Data pelatihan masih kosong
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {periode.map((periode) => (
                            <tr
                              key={periode.id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {periode.nama}
                              </th>
                              <td className="px-6 py-4">
                                {periode.aktif ? "Aktif" : "Tidak Aktif"}
                              </td>
                              <td className="px-6 py-4">
                                {new Date(
                                  periode.dibuatPada
                                ).toLocaleDateString("id-ID", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </td>
                              <td className="px-6 py-4 flex gap-2">
                                <FaPencilAlt
                                  onClick={() =>
                                    navigate(
                                      `/admin/periode/edit/${periode.id}`
                                    )
                                  }
                                  className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                />{" "}
                                <FaTrash
                                  onClick={() => deletePeriode(periode.id)}
                                  className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                />
                              </td>
                            </tr>
                          ))}
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

export default Periode;
