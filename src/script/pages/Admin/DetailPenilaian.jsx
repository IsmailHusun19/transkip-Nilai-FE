import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { FaEye, FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GetPenilaianById } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const DetailPenilaian = () => {
  const navigate = useNavigate();
  const { idPenilaian } = useParams();
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [penilaian, setPenilaian] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const getDataPenilaian = await GetPenilaianById(idPenilaian);
      setPenilaian(getDataPenilaian);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  //   const deletePelatihan = async (id) => {
  //     try {
  //       const result = await Swal.fire({
  //         title: "Apakah anda yakin?",
  //         text: "Peserta yang bergabung ke pelatihan ini akan terhapus semua",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, delete it!",
  //       });

  //       if (result.isConfirmed) {
  //         await DeletePelatihan(id);

  //         await Swal.fire({
  //           title: "Deleted!",
  //           text: "Berhasil menghapus pelatihan",
  //           icon: "success",
  //         });
  //         location.reload();
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    getData();
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
              <div className="relative flex justify-end flex-col mb-4">
                <div className="w-full text-gray-600">
                  <div className="w-full pb-8 pt-6 border-t-4 border-blue-800 rounded-md shadow-md print:shadow-none print:border-none">
                    <h1 className="mb-3 text-xl px-4 pb-4 border-b border-slate-300 print:mt-[-20px] print:mb-[-10px] print:pb-2">
                      Data Pelatihan
                    </h1>
                    <div className="grid grid-cols-1 mt-6 md:grid-cols-2 gap-4 px-4 print:grid-cols-2 print:gap-0 print:text-sm">
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                        <span className="w-28 flex-shrink-0 block print:font-semibold">
                          Pelatihan
                        </span>{" "}
                        <span className="truncate">
                          : {penilaian.pelatihan.nama}
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                        <span className="w-28 flex-shrink-0 block print:font-semibold">
                          Tanggal Mulai
                        </span>{" "}
                        <span className="truncate">
                          :{" "}
                          {new Date(
                            penilaian.pelatihan.tanggalMulai
                          ).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                        <span className="w-28 flex-shrink-0 block print:font-semibold">
                          Instruktur
                        </span>{" "}
                        <span className="truncate">
                          : {penilaian.pelatihan.instruktur.nama}
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                        <span className="w-28 flex-shrink-0 block print:font-semibold">
                          Jurusan
                        </span>{" "}
                        <span className="truncate">
                          : {penilaian.pelatihan.jurusan.nama}
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                        <span className="w-28 flex-shrink-0 block print:font-semibold">
                          Periode
                        </span>{" "}
                        <span className="truncate">
                          : {penilaian.pelatihan.periode.nama}
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                        <span className="w-28 flex-shrink-0 block print:font-semibold">
                          Status
                        </span>{" "}
                        <span className="truncate">
                          :{" "}
                          {(() => {
                            const tanggalMulai = new Date(
                              penilaian.pelatihan.tanggalMulai
                            );
                            const periode = penilaian.pelatihan.periode.nama.toLowerCase();
                            let tahun = 0;
                            let bulan = 0;
                            const periodeRegex =
                              /(\d+)\s*tahun\s*(\d+)\s*bulan/;
                            const match = periode.match(periodeRegex);
                            if (match) {
                              tahun = parseInt(match[1]);
                              bulan = parseInt(match[2]);
                            } else {
                              const tahunMatch = periode.match(/(\d+)\s*tahun/);
                              const bulanMatch = periode.match(/(\d+)\s*bulan/);

                              if (tahunMatch) tahun = parseInt(tahunMatch[1]);
                              if (bulanMatch) bulan = parseInt(bulanMatch[1]);
                            }
                            const totalBulan = tahun * 12 + bulan;
                            const tanggalAkhir = new Date(tanggalMulai);
                            tanggalAkhir.setMonth(
                              tanggalAkhir.getMonth() + totalBulan
                            );
                            const isEnded = new Date() > tanggalAkhir;
                            return isEnded ? "Selesai" : "Berlangsung";
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end items-center mb-3">
                <div
                  className="cursor-pointer text-gray-600 flex gap-2 items-center border shadow-sm p-2 rounded-md hover:text-gray-800 hover:shadow-md"
                  onClick={() =>
                    navigate(`/admin/detail-penilaian/mengelola-penilaian/${idPenilaian}`)
                  }
                >
                  <FaPlus className="w-7 h-7" />
                  <h1>Mengelola Penilaian</h1>
                </div>
              </div>
              <div className="relative overflow-x-auto pb-16">
                <div className="shadow-md">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          No
                        </th>
                        <th scope="col" className="w-full px-6 py-3">
                          Mata Pelatihan
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[150px]">
                          Tempat
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[150px]">
                          Jam Pelatihan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {penilaian.penilaian.length === 0 ? (
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
                          {penilaian.penilaian.map((penilaian, index) => (
                            <tr
                              key={index}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                            >
                              <th
                                scope="row"
                                className="px-6 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {index + 1}
                              </th>
                              <td className="px-6 py-4">
                                {penilaian.mataPelatihan}
                              </td>
                              <td className="px-6 py-4">
                                {penilaian.tempat}
                              </td>
                              <td className="px-6 py-4 text-center">
                                {penilaian.jam}
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

export default DetailPenilaian;
