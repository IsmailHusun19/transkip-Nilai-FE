import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { FaEye, FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GetPelatihan, DeletePelatihan } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Pelatihan = () => {
  const navigate = useNavigate();
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [pelatihan, setPelatihan] = useState();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSearch, setDataSearch] = useState([]);

  const getData = async () => {
    setLoading(true);
    try {
      const getDataPelatihan = await GetPelatihan();
      setPelatihan(getDataPelatihan);
      console.log(getDataPelatihan);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deletePelatihan = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Apakah anda yakin?",
        text: "Peserta yang bergabung ke pelatihan ini akan terhapus semua",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await DeletePelatihan(id); // Menunggu sampai data dihapus

        await Swal.fire({
          title: "Deleted!",
          text: "Berhasil menghapus pelatihan",
          icon: "success",
        });

        // Setelah konfirmasi berhasil, reload halaman
        location.reload();
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

  useEffect(() => {
    if (!loading && pelatihan) {
      const filteredPelatihan = pelatihan.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (searchTerm) {
        setDataSearch(filteredPelatihan);
      } else {
        setDataSearch(pelatihan);
      }
    }
  }, [searchTerm, pelatihan, loading]);

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
                    Pelatihan
                  </h1>
                </div>
                <div
                  className="cursor-pointer text-gray-600 flex gap-2 items-center border shadow-sm p-2 rounded-md hover:text-gray-800 hover:shadow-md"
                  onClick={() => navigate("/admin/pelatihan/tambah")}
                >
                  <FaPlus className="w-7 h-7" />
                  <h1>Tambah Data</h1>
                </div>
              </div>
              <input
                  type="text"
                  placeholder="Cari nama pelatihan..."
                  className="border w-1/2 px-3 py-2 rounded-md text-gray-800 text-sm mb-3 outline-none focus:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              <div className="relative overflow-x-auto pb-16">
                <div className="shadow-md">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th
                          scope="col"
                          className={`px-6 py-3 ${
                            pelatihan.length === 0
                              ? "min-w-max"
                              : "min-w-[200px]"
                          }`}
                        >
                          Nama
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 ${
                            pelatihan.length === 0
                              ? "min-w-max"
                              : "min-w-[250px]"
                          }`}
                        >
                          Jurusan
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 ${
                            pelatihan.length === 0
                              ? "min-w-max"
                              : "min-w-[150px]"
                          }`}
                        >
                          Periode
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 ${
                            pelatihan.length === 0
                              ? "min-w-max"
                              : "min-w-[150px]"
                          }`}
                        >
                          Instruktur
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 ${
                            pelatihan.length === 0
                              ? "min-w-max"
                              : "min-w-[200px]"
                          }`}
                        >
                          Tanggal Mulai
                        </th>
                        <th
                          scope="col"
                          className={`px-6 py-3 ${
                            pelatihan.length === 0
                              ? "min-w-max"
                              : "min-w-[100px]"
                          }`}
                        >
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Opsi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pelatihan.length === 0 ? (
                        <>
                          <tr>
                            <td
                              colSpan={7}
                              className="text-center font-medium text-gray-600 align-middle h-32"
                            >
                              Data pelatihan masih kosong
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {dataSearch.length === 0 ? (
                            <>
                              {" "}
                              <tr>
                                <td
                                  colSpan={5}
                                  className="text-center font-medium text-gray-600 align-middle h-32"
                                >
                                  Data pelatihan tidak ada
                                </td>
                              </tr>
                            </>
                          ) : (
                            <>
                              {" "}
                              {dataSearch.map((pelatihan) => (
                                <tr
                                  key={pelatihan.id}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {pelatihan.nama}
                                  </th>
                                  <td className="px-6 py-4">
                                    {pelatihan.jurusan.nama}
                                  </td>
                                  <td className="px-6 py-4">
                                    {pelatihan.periode.nama}
                                  </td>
                                  <td className="px-6 py-4">
                                    {pelatihan.instruktur.nama}
                                  </td>
                                  <td className="px-6 py-4">
                                    {new Date(
                                      pelatihan.tanggalMulai
                                    ).toLocaleDateString("id-ID", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </td>
                                  <td className="px-6 py-4">
                                    {(() => {
                                      const tanggalMulai = new Date(
                                        pelatihan.tanggalMulai
                                      );
                                      const periode = pelatihan.periode.nama.toLowerCase();
                                      let tahun = 0;
                                      let bulan = 0;
                                      const periodeRegex =
                                        /(\d+)\s*tahun\s*(\d+)\s*bulan/;
                                      const match = periode.match(periodeRegex);
                                      if (match) {
                                        tahun = parseInt(match[1]);
                                        bulan = parseInt(match[2]);
                                      } else {
                                        const tahunMatch =
                                          periode.match(/(\d+)\s*tahun/);
                                        const bulanMatch =
                                          periode.match(/(\d+)\s*bulan/);

                                        if (tahunMatch)
                                          tahun = parseInt(tahunMatch[1]);
                                        if (bulanMatch)
                                          bulan = parseInt(bulanMatch[1]);
                                      }
                                      const totalBulan = tahun * 12 + bulan;
                                      const tanggalAkhir = new Date(
                                        tanggalMulai
                                      );
                                      tanggalAkhir.setMonth(
                                        tanggalAkhir.getMonth() + totalBulan
                                      );
                                      const isEnded = new Date() > tanggalAkhir;
                                      return isEnded
                                        ? "Selesai"
                                        : "Berlangsung";
                                    })()}
                                  </td>
                                  <td className="px-6 py-4 flex gap-2">
                                    <FaEye className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                    onClick={() => {
                                      navigate(`/admin/detail-pelatihan/${pelatihan.id}`)
                                    }} />{" "}
                                    <FaPencilAlt
                                      onClick={() =>
                                        navigate(
                                          `/admin/pelatihan/edit/${pelatihan.id}`
                                        )
                                      }
                                      className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                    />{" "}
                                    <FaTrash
                                      onClick={() =>
                                        deletePelatihan(pelatihan.id)
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

export default Pelatihan;
