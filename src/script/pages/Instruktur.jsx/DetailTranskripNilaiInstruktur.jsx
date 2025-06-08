import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import {
  GetPelatihanByInstrukrurById,
  GetAllPesertaPelatihanById,
  PutPeringkatPeserta,
} from "../../config/ApiService";
import { useEffect, useState } from "react";
import { FaEye, FaPen } from "react-icons/fa";
const DetailTranskripNilaiInstruktur = () => {
  const [pelatihan, setPelatihan] = useState([]);
  const [peserta, setPeserta] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idPelatihan } = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    setLoading(true);
    try {
      const getDataPelatihan = await GetPelatihanByInstrukrurById(idPelatihan);
      const getData = await GetAllPesertaPelatihanById(idPelatihan);
  
      const peringkatList = getData.data
        .filter(item =>
          item.peserta.penilaianPeserta.length > 0 &&
          item.peserta.penilaianPeserta[0].indexPrestasi != null
        )
        .sort((a, b) =>
          b.peserta.penilaianPeserta[0].indexPrestasi -
          a.peserta.penilaianPeserta[0].indexPrestasi
        )
        .map((item, index) => ({
          userId: item.peserta.id,
          peringkat: index + 1,
        }));
  
      // PUT peringkat ke backend
      await PutPeringkatPeserta(idPelatihan, peringkatList);
  
      // 🆕 Re-fetch data setelah update agar peringkat terbaru masuk ke frontend
      const updatedData = await GetAllPesertaPelatihanById(idPelatihan);
  
      setPelatihan(getDataPelatihan);
      setPeserta(updatedData.data);
      console.log(getDataPelatihan)
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
          <div className="relative w-[95%] m-auto py-5 flex justify-end flex-col mb-4">
            <div>
              <div className="w-full text-gray-600 print:mt-5">
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
                        : {pelatihan.nama}
                      </span>
                    </div>
                    <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                      <span className="w-28 flex-shrink-0 block print:font-semibold">
                        Tanggal Mulai
                      </span>{" "}
                      <span className="truncate">
                        :{" "}
                        {new Date(
                          pelatihan.tanggalMulai
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
                        : {pelatihan.instruktur.nama}
                      </span>
                    </div>
                    <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                      <span className="w-28 flex-shrink-0 block print:font-semibold">
                        Jurusan
                      </span>{" "}
                      <span className="truncate">
                        : {pelatihan.jurusan.nama}
                      </span>
                    </div>
                    <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-1">
                      <span className="w-28 flex-shrink-0 block print:font-semibold">
                        Periode
                      </span>{" "}
                      <span className="truncate">
                        : {pelatihan.periode.nama}
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
                            pelatihan.tanggalMulai
                          );
                          const periode = pelatihan.periode.nama.toLowerCase();;
                          let tahun = 0;
                          let bulan = 0;
                          const periodeRegex = /(\d+)\s*tahun\s*(\d+)\s*bulan/;
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
              <div className="relative overflow-x-auto mt-5 mb-16">
                <div className="shadow-md print:shadow-none">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3 min-w-[70px]">
                          No
                        </th>
                        <th scope="col" className="w-full px-6 py-3">
                          Nama Peserta
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[150px]">
                          Index Prestasi
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[150px]">
                          Peringkat
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[200px]">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 min-w-[150px]">
                          Opsi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {peserta.length === 0 ? (
                        <>
                          <tr>
                            <td
                              colSpan={3}
                              className="text-center font-medium text-gray-600 align-middle h-32"
                            >
                              Data studi pembelajaran masih kosong
                            </td>
                          </tr>
                        </>
                      ) : (
                        <>
                          {peserta.map((peserta, index) => (
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
                                {peserta.peserta.nama}
                              </td>
                              <td className="px-6 py-4">
                                {peserta.peserta.penilaianPeserta?.[0]
                                  ?.indexPrestasi ?? "Belum ada"}
                              </td>
                              <td className="px-6 py-4">
                                {peserta.peserta.penilaianPeserta?.[0]
                                  ?.peringkat ?? "Belum ada"}
                              </td>
                              <td className="px-6 py-4">
                                {(() => {
                                  const ip =
                                    peserta.peserta.penilaianPeserta?.[0]
                                      ?.indexPrestasi;

                                  if (ip === undefined || ip === null) {
                                    return "Belum ada";
                                  } else if (ip < 3) {
                                    return <span className="text-red-600 font-semibold">Tidak Kompeten</span>;
                                  } else {
                                    return <span className="text-green-600 font-semibold">Kompeten</span>;
                                  }
                                })()}
                              </td>
                              <td className="px-6 py-4 flex gap-2">
                                <FaEye
                                  onClick={() =>
                                    navigate(
                                      `/penilaian-detail-transkrip-nilai-instruktur/${idPelatihan}/${peserta.userId}`
                                    )
                                  }
                                  className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                />{" "}
                                <FaPen
                                  onClick={() =>
                                    navigate(
                                      `/penilaian-transkrip-nilai/${pelatihan.penilaian.id}/${idPelatihan}/${peserta.userId}`
                                    )
                                  }
                                  className="border border-black w-5 h-5 p-1 box-content cursor-pointer hover:text-gray-800 rounded-md"
                                />{" "}
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
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default DetailTranskripNilaiInstruktur;
