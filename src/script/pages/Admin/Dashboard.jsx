import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import Navbar from "../../component/admin/Navbar";
import { GetLaporanJumlah, GetPeserta } from "../../config/ApiService";
import {
  FaHome,
  FaUserFriends,
  FaCalendarAlt,
  FaGraduationCap,
  FaClipboardList,
  FaUniversity,
} from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const Dashboard = () => {
  const { isSidebarOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [peserta, setPeserta] = useState([]);
  const [form, setForm] = useState({
    jumlahPeserta: "",
    jumlahInstruktur: "",
    jumlahJurusan: "",
    jumlahPelatihan: "",
  });

  // Simpan semua data bulanan per tahun di sini
  const [dataAll, setDataAll] = useState({});

  // Data untuk chart sesuai tahun yang dipilih
  const [tahun, setTahun] = useState("2025");
  const [data, setData] = useState([]);

  const chartRef = useRef(null);

  const getData = async () => {
    setLoading(true);
    try {
      const getData = await GetLaporanJumlah();
      const getPeserta = await GetPeserta();
      setPeserta(getPeserta.data);

      setForm({
        jumlahPeserta: getData.jumlahPeserta,
        jumlahInstruktur: getData.jumlahInstruktur,
        jumlahJurusan: getData.jumlahJurusan,
        jumlahPelatihan: getData.jumlahPelatihan,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi mengolah data peserta jadi data bulanan per tahun
  function dummyData(pesertaArray) {
    const hasil = {};

    pesertaArray.forEach(({ tanggalDaftar }) => {
      const date = new Date(tanggalDaftar);
      const tahun = date.getFullYear();
      const bulanIndex = date.getMonth();

      if (!hasil[tahun]) {
        hasil[tahun] = Array(12).fill(0);
      }

      hasil[tahun][bulanIndex]++;
    });

    const hasilAkhir = {};

    for (const thn in hasil) {
      hasilAkhir[thn] = hasil[thn].map((jumlah, i) => ({
        bulan: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][i],
        peserta: jumlah,
      }));
    }

    return hasilAkhir;
  }

  useEffect(() => {
    getData();
  }, []);

  // Proses peserta jadi dataAll setiap peserta atau loading berubah
  useEffect(() => {
    if (!loading && peserta.length > 0) {
      const processed = dummyData(peserta);
      setDataAll(processed);
    }
  }, [loading, peserta]);

  // Update data chart jika tahun atau dataAll berubah
  useEffect(() => {
    if (dataAll[tahun]) {
      setData(dataAll[tahun]);
    } else {
      setData([]);
    }
  }, [tahun, dataAll]);

  const handleExport = () => {
    if (!chartRef.current) return;
    html2canvas(chartRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `statistik-peserta-${tahun}.jpg`);
        }
      }, "image/jpeg");
    });
  };

  return (
    <>
      {!loading ? (
        <>
          <main className="overflow-x-hidden">
            <Navbar />
            <div
              className={`flex-1 transition-all ease-linear duration-300 h-[calc(100vh-80px)] bg-white text-white px-5 py-[30px] ${
                isSidebarOpen ? "ml-64" : "ml-[0px]"
              }`}
            >
              <div>
                <div className="w-full grid grid-cols-4 justify-between items-center gap-4">
                  <div
                    className="w-full h-32 flex flex-col justify-center px-3 gap-1 rounded-lg border-l-8 bg-white border-blue-600"
                    style={{ boxShadow: "2px 2px 5px rgba(0,0,1)" }}
                  >
                    <div className="flex gap-3 justify-between items-center">
                      <CountUp
                        end={form.jumlahPeserta}
                        duration={1}
                        separator="."
                        className="text-gray-800 text-5xl font-medium"
                      />
                      <FaUserFriends className="w-16 text-blue-600 h-16" />
                    </div>
                    <span className="text-gray-600 text-sm">
                      Jumlah Peserta
                    </span>
                  </div>
                  <div
                    className="w-full h-32 flex flex-col justify-center px-3 gap-1 rounded-lg border-l-8 bg-white border-orange-600"
                    style={{ boxShadow: "2px 2px 5px rgba(0,0,1)" }}
                  >
                    <div className="flex gap-3 justify-between items-center">
                      <CountUp
                        end={form.jumlahInstruktur}
                        duration={1}
                        separator="."
                        className="text-gray-800 text-5xl font-medium"
                      />
                      <FaGraduationCap className="w-16 text-orange-600 h-16" />
                    </div>
                    <span className="text-gray-600 text-sm">
                      Jumlah Instruktur
                    </span>
                  </div>
                  <div
                    className="w-full h-32 flex flex-col justify-center px-3 gap-1 rounded-lg border-l-8 bg-white border-purple-600"
                    style={{ boxShadow: "2px 2px 5px rgba(0,0,1)" }}
                  >
                    <div className="flex gap-3 justify-between items-center">
                      <CountUp
                        end={form.jumlahJurusan}
                        duration={1}
                        separator="."
                        className="text-gray-800 text-5xl font-medium"
                      />
                      <FaUniversity className="w-16 text-purple-600 h-16" />
                    </div>
                    <span className="text-gray-600 text-sm">
                      Jumlah Jurusan
                    </span>
                  </div>
                  <div
                    className="w-full h-32 flex flex-col justify-center px-3 gap-1 rounded-lg border-l-8 bg-white border-green-600"
                    style={{ boxShadow: "2px 2px 5px rgba(0,0,1)" }}
                  >
                    <div className="flex gap-3 justify-between items-center">
                      <CountUp
                        end={form.jumlahPelatihan}
                        duration={1}
                        separator="."
                        className="text-gray-800 text-5xl font-medium"
                      />
                      <FaBookOpenReader className="w-16 text-green-600 h-16" />
                    </div>
                    <span className="text-gray-600 text-sm">
                      Jumlah Pelatihan
                    </span>
                  </div>
                </div>
              </div>
              <div ref={chartRef} className="mt-4">
                <div
                  className="p-4 bg-white rounded-xl"
                  style={{ boxShadow: "2px 2px 5px rgba(0,0,1)" }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">
                      Statistik Peserta
                    </h2>
                    <select
                      className="border rounded w-24 h-9 text-gray-600"
                      value={tahun}
                      onChange={(e) => setTahun(e.target.value)}
                    >
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                    <div className="w-24 h-9 flex justify-center items-center text-center">
                    <button
                      onClick={handleExport}
                      className="bg-blue-600 w-full h-full text-white rounded text-sm hover:bg-blue-700"
                    >
                      Export JPG
                    </button>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="bulan" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="peserta"
                        fill="#8884d8"
                        name="Jumlah Peserta"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </main>
          <SlideBar />
        </>
      ) : null}
    </>
  );
};

export default Dashboard;
