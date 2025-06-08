import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import { useNavigate } from "react-router-dom";
import {
  GetPenilaianById,
  GetPelatihanByInstrukrurById,
  PostPenilaianPeserta,
  PutPenilaianPeserta,
  GetPenilaianPesertaById,
} from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const PenilaianTranskripNilai = () => {
  const [penilaian, setPenilaian] = useState([]);
  const [pelatihan, setPelatihan] = useState([]);
  const [indexPrestasi, setIndexPrestasi] = useState("");
  const [nilai, setNilai] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idPenilaian, idPelatihan, idPeserta } = useParams();

  const getData = async () => {
    setLoading(true);
    try {
      const getDataPenilaian = await GetPenilaianById(idPenilaian);
      const getDataPelatihan = await   GetPelatihanByInstrukrurById(idPelatihan);
      const getPenilaian =
        (await GetPenilaianPesertaById(idPeserta, idPelatihan)) || [];
      setPelatihan(getDataPelatihan);
      console.log(getDataPelatihan.penilaian.status);
      setPenilaian(getDataPenilaian);
      const hasil = getDataPenilaian.penilaian.map((item) => {
        const mataPelatihan = item.mataPelatihan;
        const nilaiPelatihan = parseInt(getPenilaian[mataPelatihan]) || 0;
        return nilaiPelatihan;
      });
      const getBobot = (nilai) => {
        if (nilai >= 85) return 4; // A
        if (nilai >= 75) return 3; // B
        if (nilai >= 65) return 2; // C
        return 1; // Nilai < 65 tetap diberi bobot 1 (tidak 0)
      };

      let totalNilaiBobot = 0;
      let totalJam = 0;

      for (
        let i = 0;
        i < getDataPelatihan.penilaian.penilaian.length;
        i++
      ) {
        const jam =
          Number(getDataPelatihan.penilaian.penilaian[i].jam) || 0;
        const nilai = Number(hasil[i]) || 0;
        const bobot = getBobot(nilai);

        totalNilaiBobot += jam * bobot;
        totalJam += jam;
      }

      const indexPrestasi =
        totalJam > 0 ? (totalNilaiBobot / totalJam).toFixed(2) : 0;
      setIndexPrestasi(indexPrestasi);
      setNilai(hasil);
      console.log(getDataPelatihan)
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeNilai = (index, value) => {
    const updatedNilai = [...nilai];
    updatedNilai[index] = value;
    setNilai(updatedNilai);
  };

  const handleUpdateNilai = async (e) => {
    e.preventDefault();
    const nilaiObject = {};
    penilaian.penilaian.forEach((item, index) => {
      nilaiObject[item.mataPelatihan] = Number(nilai[index]) || 0;
    });
    const getBobot = (nilai) => {
      if (nilai >= 85) return 4; // A
      if (nilai >= 75) return 3; // B
      if (nilai >= 65) return 2; // C
      return 1; // Nilai < 65 = bobot 1
    };
    let totalNilaiBobot = 0;
    let totalJam = 0;

    for (let i = 0; i < penilaian.penilaian.length; i++) {
      const jam = Number(penilaian.penilaian[i].jam) || 0;
      const nilaiAngka = Number(nilai[i]) || 0;
      const bobot = getBobot(nilaiAngka);
      totalNilaiBobot += jam * bobot;
      totalJam += jam;
    }

    const calculatedIndex =
      totalJam > 0 ? (totalNilaiBobot / totalJam).toFixed(2) : 0;

    const payload = {
      userId: parseInt(idPeserta),
      pelatihanId: parseInt(idPelatihan),
      penilaian: nilaiObject,
      indexPrestasi: parseFloat(calculatedIndex),
    };

    try {
      const postData = await PostPenilaianPeserta(payload);
      if (postData === undefined) {
        await PutPenilaianPeserta(payload);
      }
      Swal.fire("Berhasil", "Penilaian berhasil diperbarui.", "success");
      getData();
    } catch (e) {
      console.log(e);
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
                          const periode = pelatihan.periode.nama;
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
            </div>
            <div className="py-5 my-5 shadow-md rounded-md border-t-4 border-blue-800">
              <h1 className="mb-3 text-xl px-4 pb-4 border-b border-slate-300 print:mt-[-20px] print:mb-[-10px] print:pb-2">
                Penilaian
              </h1>
              <form onSubmit={handleUpdateNilai}>
                <div className="relative overflow-x-auto mt-5 px-4">
                  <div className="">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 border border-gray-800 py-3 min-w-[70px]"
                          >
                            No
                          </th>
                          <th
                            scope="col"
                            className="w-full border border-gray-800 px-6 py-3"
                          >
                            Mata Pelatihan
                          </th>
                          <th
                            scope="col"
                            className="px-6 border border-gray-800 py-3 min-w-[200px]"
                          >
                            Jumlah Jam Pelatihan
                          </th>
                          <th
                            scope="col"
                            className="px-6 border border-gray-800 py-3 min-w-[150px]"
                          >
                            Nilai
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
                                Mata pelatihan masih kosong
                              </td>
                            </tr>
                          </>
                        ) : (
                          <>
                            {penilaian.penilaian.map((penilaian, index) => (
                              <tr
                                key={index}
                                className="bg-white border border-gray-800"
                              >
                                <th
                                  scope="row"
                                  className="px-6 border border-gray-800 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  {index + 1}
                                </th>
                                <td className="px-6 border border-gray-800 py-4">
                                  {penilaian.mataPelatihan}
                                </td>
                                <td className="px-6 border border-gray-800 py-4">
                                  {penilaian.jam}
                                </td>
                                <td className="px-6 border border-gray-800 py-4">
                                  <input
                                    type="text"
                                    id="nilai"
                                    value={nilai[index] ?? ""}
                                    disabled={pelatihan.penilaian.status ? false : true}
                                    onChange={(e) =>
                                      handleChangeNilai(index, e.target.value)
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className="flex justify-end items-center px-4 mt-5">
                  {pelatihan.penilaian.status ? (
                    <>
                      {" "}
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Update Nilai
                      </button>
                    </>
                  ) : (
                    <>
                      <h1>Penilaian telah dikunci</h1>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default PenilaianTranskripNilai;
