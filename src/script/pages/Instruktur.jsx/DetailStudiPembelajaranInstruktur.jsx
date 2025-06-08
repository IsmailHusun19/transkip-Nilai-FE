import { useParams } from "react-router-dom";
import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";
import { GetPelatihanByInstrukrurById } from "../../config/ApiService";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import '../../../style/app.css'
import KopSurat from "../../component/KopSurat";

const DetailStudiPembelajaranInstruktur = () => {
  const [pelatihan, setPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idPelatihan } = useParams();
  console.log(idPelatihan);

  const getData = async () => {
    setLoading(true);
    try {
      const getDataPelatihan = await GetPelatihanByInstrukrurById(idPelatihan);
      setPelatihan(getDataPelatihan);
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

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: "Laporan Studi Pembelajaran",
    contentRef: componentRef,
  });

  return (
    <>
      {!loading ? (
        <>
          <Navbar />
          <div className="relative w-[95%] m-auto py-5 flex justify-end flex-col mb-4">
            <div ref={componentRef}>
            <KopSurat/>
            <div className="w-full text-gray-600 print:mt-5">
              <div className="w-full pb-8 pt-6 border-t-4 border-blue-800 rounded-md shadow-md print:shadow-none print:border-none">
                <h1 className="mb-3 text-xl px-4 pb-4 border-b border-slate-300 print:mt-[-20px] print:mb-[-10px] print:pb-2">
                  Data Pelatihan
                </h1>
                <div className="grid grid-cols-1 mt-6 md:grid-cols-2 gap-4 px-4 print:grid-cols-2 print:gap-0 print:text-sm">
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
                      Email
                    </span>{" "}
                    <span className="truncate">
                      : {pelatihan.instruktur.email}
                    </span>
                  </div>
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
                        const periode = pelatihan.periode.nama.toLowerCase();
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
            <div className="relative overflow-x-auto pb-16 mt-5">
              <div className="shadow-md print:shadow-none">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 min-w-[70px]">
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
                    {pelatihan.penilaian.penilaian.length === 0 ? (
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
                        {pelatihan.penilaian.penilaian.map(
                          (pelatihan, index) => (
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
                                {pelatihan.mataPelatihan}
                              </td>
                              <td className="px-6 py-4">{pelatihan.tempat}</td>
                              <td className="px-6 py-4 text-center">
                                {pelatihan.jam}
                              </td>
                            </tr>
                          )
                        )}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            </div>
            <div className="flex justify-end">
            <button className="bg-blue-600 text-white w-20 h-10 rounded-md" onClick={handlePrint} type="button">Cetak</button>
            </div>
          </div>
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default DetailStudiPembelajaranInstruktur;
