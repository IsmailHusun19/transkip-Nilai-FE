import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { GetPelatihanByPeserta } from "../config/ApiService";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

const StudiPembelajaran = () => {
  const [pelatihan, setPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    try {
      const getDataPelatihan = await GetPelatihanByPeserta();
      setPelatihan(getDataPelatihan);
      console.log(getDataPelatihan);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {!loading ? (
        <>
          <Navbar />
          <div className="w-[90%] m-auto rounded-md my-5 min-h-screen">
          <h1 className="mb-1 text-2xl font-bold pb-4">
              Studi Pembelajaran
            </h1>
            <h1 className="mb-3 text-xl pb-4 print:mt-[-20px] print:mb-[-10px] print:pb-2">
              Data Pelatihan
            </h1>
            <div className="relative overflow-x-auto pb-16">
              <div className="shadow-md">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nama
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Jurusan
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Periode
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Instruktur
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Tanggal Mulai
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
                        {pelatihan.map((pelatihan) => (
                          <tr
                            key={pelatihan.id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {pelatihan.pelatihan.nama}
                            </th>
                            <td className="px-6 py-4">
                              {pelatihan.pelatihan.jurusan.nama}
                            </td>
                            <td className="px-6 py-4">
                              {pelatihan.pelatihan.periode.nama}
                            </td>
                            <td className="px-6 py-4">
                              {pelatihan.pelatihan.instruktur.nama}
                            </td>
                            <td className="px-6 py-4">
                              {new Date(
                                pelatihan.pelatihan.tanggalMulai
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
                                  pelatihan.pelatihan.tanggalMulai
                                );
                                const periode =
                                  pelatihan.pelatihan.periode.nama.toLowerCase();
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
                                const tanggalAkhir = new Date(tanggalMulai);
                                tanggalAkhir.setMonth(
                                  tanggalAkhir.getMonth() + totalBulan
                                );
                                const isEnded = new Date() > tanggalAkhir;
                                return isEnded ? "Selesai" : "Berlangsung";
                              })()}
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                              <FaEye onClick={() => navigate(`/detail-studi-pembelajaran/${pelatihan.pelatihan.id}`)} className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md" />{" "}
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
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default StudiPembelajaran;
