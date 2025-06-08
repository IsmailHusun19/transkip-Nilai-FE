import {
  GetPelatiahnPenilaianPesertaByIdInstruktur,
  GetPelatihanByInstrukrurById,
} from "../../config/ApiService";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer";
import KopSurat from "../../component/KopSurat";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import "../../../style/app.css";

const DetailPenilaianTranskripNilaiInstruktur = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    documentTitle: "Transkrip Nilai",
    contentRef: componentRef,
  });
  const [pelatihan, setPelatihan] = useState([]);
  const [loading, setLoading] = useState(true);
  const { idPelatihan, idPeserta } = useParams();
  const [penilaian, setPenilaian] = useState([]);
  const [totalJam, setTotalJam] = useState("");
  const [totalJumlah, setTotalJumlah] = useState("");
  const getData = async () => {
    setLoading(true);
    try {
      const getDataPelatihan = await GetPelatiahnPenilaianPesertaByIdInstruktur(
        idPelatihan,
        idPeserta
      );
      const getData = await GetPelatihanByInstrukrurById(idPelatihan);
      console.log(getData);
      console.log(getDataPelatihan);
      setPelatihan(getDataPelatihan);
      function nilaiKeBobotHuruf(nilai) {
        if (nilai >= 85) return { bobot: 4, huruf: "A" };
        if (nilai >= 75) return { bobot: 3, huruf: "B" };
        if (nilai >= 65) return { bobot: 2, huruf: "C" };
        return { bobot: 1, huruf: "D" };
      }
      const penilaianPeserta = getDataPelatihan.peserta.penilaianPeserta;
      const daftarMataPelatihan = getData.penilaian.penilaian;
      const peserta = penilaianPeserta[0];
      const mappedNilai = daftarMataPelatihan.map((item) => {
        const namaMP = item.mataPelatihan;
        const jam = item.jam;
        const nilai =
          peserta?.penilaian?.find?.((p) => p.namaMP === namaMP)?.nilai ?? 0;
        const { bobot, huruf } = nilaiKeBobotHuruf(nilai);
        const jumlah = bobot * jam;

        return {
          mataPelatihan: namaMP,
          jam,
          nilai,
          bobot,
          huruf,
          jumlah,
        };
      });

      console.log(mappedNilai);
      setPenilaian(mappedNilai);
      const totalJam = daftarMataPelatihan.reduce(
        (acc, item) => acc + Number(item.jam),
        0
      );
      const totalJumlah = mappedNilai.reduce(
        (acc, item) => acc + Number(item.jumlah),
        0
      );
      setTotalJam(totalJam);
      setTotalJumlah(totalJumlah);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const angkaHuruf = {
    1: "SATU",
    2: "DUA",
    3: "TIGA",
    4: "EMPAT",
    5: "LIMA",
    6: "ENAM",
    7: "TUJUH",
    8: "DELAPAN",
    9: "SEMBILAN",
    10: "SEPULUH",
  };

  const ubahAngkaDalamTeks = (teks) => {
    const [angka, ...sisa] = teks.split(" ");
    return `${angkaHuruf[angka] || angka} ${sisa.join(" ")}`;
  };
  return (
    <>
      {!loading ? (
        <>
          <Navbar />
          <div>
            <div className="w-[95%] m-auto my-5">
              <div ref={componentRef}>
                <KopSurat />
                <div className="w-full text-gray-800 print:mt-5">
                  <div className="w-full pb-8 pt-6 border-t-4 border-blue-800 rounded-md shadow-md print:shadow-none print:border-none">
                    <h1 className="mb-3 text-base text-center font-semibold px-4 pb-4 border-b border-slate-300 print:mt-[-20px] print:mb-[0px]">
                      NILAI HASIL STUDI
                      <p>PROGRAM PELATIHAN SATU TAHUN</p>
                    </h1>
                    <div className="grid grid-cols-1 mt-6 md:grid-cols-2 print:gap-0 gap-2 px-4 print:text-sm print:grid-cols-1 print-p-0">
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-0">
                        <span className="w-44 flex-shrink-0 block print:font-semibold">
                          NAMA PESERTA
                        </span>{" "}
                        <span className="truncate uppercase">
                          : {pelatihan.peserta.nama}
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-0">
                        <span className="w-44 flex-shrink-0 block print:font-semibold">
                          NOMOR PESERTA
                        </span>{" "}
                        <span className="truncate">
                          : {pelatihan.peserta.id}
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-0">
                        <span className="w-44 flex-shrink-0 block print:font-semibold">
                          PROGRAM STUDI
                        </span>{" "}
                        <span className="truncate uppercase">
                          : TEKNISI{" "}
                          <span>
                            {ubahAngkaDalamTeks(
                              pelatihan.pelatihan.periode.nama
                            )}
                          </span>
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-0">
                        <span className="w-44 flex-shrink-0 block print:font-semibold">
                          PELATIHAN
                        </span>{" "}
                        <span className="truncate uppercase">
                          : TEKNISI {pelatihan.pelatihan.jurusan.nama}
                        </span>
                      </div>
                      <div className="border-0 sm:border print:border-none rounded-sm p-0 flex print:p-0">
                        <span className="w-44 flex-shrink-0 block print:font-semibold">
                          TAHUN AKADEMIK
                        </span>{" "}
                        <span className="truncate uppercase">
                          :{" "}
                          {new Date(
                            pelatihan.pelatihan.tanggalMulai
                          ).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-x-auto pb-16 mt-2 print:mt-0 print:text-sm">
                  <div className="shadow-md print:shadow-none">
                    <table className="w-full text-gray-900">
                      <thead>
                        <tr>
                          <th
                            rowSpan={2}
                            className="border-2 font-semibold border-black text-center py-1 max-w-6 min-w-6"
                          >
                            NO
                          </th>
                          <th
                            rowSpan={2}
                            className="border-2 font-semibold border-black text-center py-1 min-w-[230px]"
                          >
                            MATA PELATIHAN
                          </th>
                          <th
                            rowSpan={2}
                            className="border-2 font-semibold border-black text-center py-1 max-w-14 min-w-14"
                          >
                            JUMLAH JAM PELATIHAN
                          </th>
                          <th
                            colSpan={2}
                            className="border-2 font-semibold border-black text-center py-1 max-w-8 min-w-8"
                          >
                            SKALA NILAI
                          </th>
                          <th
                            rowSpan={2}
                            className="border-2 font-semibold border-black text-center py-1 max-w-9 min-w-9"
                          >
                            BOBOT NILAI
                          </th>
                          <th
                            rowSpan={2}
                            className="border-2 font-semibold border-black text-center py-1 max-w-6 min-w-6"
                          >
                            JUMLAH
                          </th>
                        </tr>
                        <tr>
                          <th className="border-2 font-semibold border-black text-center py-1 max-w-8 min-w-8">
                            ANGKA
                          </th>
                          <th className="border-2 font-semibold border-black text-center py-1 max-w-8 min-w-8">
                            HURUF
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
                                Data studi pembelajaran masih kosong
                              </td>
                            </tr>
                          </>
                        ) : (
                          <>
                            {penilaian.map((item, index) => (
                              <tr key={index}>
                                <td className="border-2 text-center border-black py-1">
                                  {index + 1}
                                </td>
                                <td className="border-2 text-center border-black py-1">
                                  {item.mataPelatihan}
                                </td>
                                <td className="border-2 text-center border-black py-1">
                                  {item.jam}
                                </td>
                                <td className="border-2 text-center border-black py-1">
                                  {item.nilai}
                                </td>
                                <td className="border-2 text-center border-black py-1">
                                  {item.huruf}
                                </td>
                                <td className="border-2 text-center border-black py-1">
                                  {item.bobot}
                                </td>
                                <td className="border-2 text-center border-black py-1">
                                  {item.jumlah}
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td
                            colSpan={2}
                            className="text-left font-semibold border-2 border-black py-1 pl-2"
                          >
                            Total
                          </td>
                          <td className="text-center border-2 border-black font-semibold py-1">
                            {totalJam}
                          </td>
                          <td
                            colSpan={3}
                            className="text-center border-2 border-black font-semibold py-1"
                          ></td>
                          <td className="text-center border-2 border-black font-semibold py-1">
                            {totalJumlah}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="text-left font-semibold border-2 border-black py-1 pl-2"
                          >
                            Index Prestasi
                          </td>
                          <td
                            colSpan={5}
                            className="text-center border-2 border-black font-semibold py-1"
                          >
                            {(() => {
                              let ip = Number(
                                pelatihan?.peserta?.penilaianPeserta?.[0]
                                  ?.indexPrestasi ?? 0
                              );

                              const angkaKeHuruf = (n) => {
                                const h = [
                                  "",
                                  "Satu",
                                  "Dua",
                                  "Tiga",
                                  "Empat",
                                  "Lima",
                                  "Enam",
                                  "Tujuh",
                                  "Delapan",
                                  "Sembilan",
                                  "Sepuluh",
                                  "Sebelas",
                                ];
                                if (isNaN(n)) return "";
                                if (n < 12) return h[n];
                                if (n < 20) return h[n - 10] + " Belas";
                                if (n < 100) {
                                  const puluhan = Math.floor(n / 10);
                                  const satuan = n % 10;
                                  return (
                                    h[puluhan] +
                                    " Puluh" +
                                    (satuan ? " " + h[satuan] : "")
                                  );
                                }
                                return n.toString();
                              };
                              const ipStr =
                                ip % 1 === 0 ? ip.toFixed(1) : ip.toString();
                              const [utama, desimalRaw] = ipStr.split(".");
                              const hurufUtama = angkaKeHuruf(Number(utama));

                              let hurufDesimal = "";
                              if (desimalRaw !== undefined) {
                                const angkaDesimal = Number(desimalRaw);
                                if (!isNaN(angkaDesimal)) {
                                  hurufDesimal = angkaKeHuruf(angkaDesimal);
                                  if (angkaDesimal === 0) hurufDesimal = "Nol";
                                }
                              }
                              const tampilAngka = `${utama},${desimalRaw}`;

                              return `${tampilAngka} (${hurufUtama}${
                                hurufDesimal ? " Koma " + hurufDesimal : ""
                              })`;
                            })()}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="text-left font-semibold border-2 border-black py-1 pl-2"
                          >
                            Peringkat
                          </td>
                          <td
                            colSpan={5}
                            className="text-center border-2 border-black font-semibold py-1"
                          >
                            {(() => {
                              const peringkat =
                                pelatihan?.peserta?.penilaianPeserta?.[0]
                                  ?.peringkat ?? "-";

                              const huruf = (n) => {
                                const h = [
                                  "",
                                  "Satu",
                                  "Dua",
                                  "Tiga",
                                  "Empat",
                                  "Lima",
                                  "Enam",
                                  "Tujuh",
                                  "Delapan",
                                  "Sembilan",
                                  "Sepuluh",
                                  "Sebelas",
                                ];
                                if (n < 12) return h[n];
                                if (n < 20) return h[n - 10] + " Belas";
                                if (n < 100) {
                                  const puluhan = Math.floor(n / 10);
                                  const satuan = n % 10;
                                  return (
                                    h[puluhan] +
                                    " Puluh" +
                                    (satuan ? " " + h[satuan] : "")
                                  );
                                }
                                return n.toString();
                              };
                              return `${peringkat} (${huruf(peringkat)})${
                                peringkat <= 3 ? " - Lulusan Terbaik" : ""
                              }`;
                            })()}
                          </td>
                        </tr>
                        <tr>
                          <td
                            colSpan={2}
                            className="text-left font-semibold border-2 border-black py-1 pl-2"
                          >
                            Hasil Pelatihan
                          </td>
                          <td
                            colSpan={5}
                            className="text-center border-2 border-black font-semibold py-1"
                          >
                            {pelatihan?.peserta?.penilaianPeserta?.[0]
                              ?.indexPrestasi != null
                              ? pelatihan.peserta.penilaianPeserta[0]
                                  .indexPrestasi >= 3
                                ? "Kompeten"
                                : "Tidak Kompeten"
                              : "-"}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 text-white w-20 h-10 rounded-md"
                  onClick={handlePrint}
                  type="button"
                >
                  Cetak
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : null}
    </>
  );
};

export default DetailPenilaianTranskripNilaiInstruktur;
