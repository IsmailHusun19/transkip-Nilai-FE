import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { GetPeriode, GetJurusan, GetInstruktur, PostPelatihan } from "../../config/ApiService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TambahDataPelatihan = () => {
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [periode, setPeriode] = useState();
  const [loading, setLoading] = useState(true);
  const [jurusan, setJurusan] = useState();
  const [instruktur, setInstruktur] = useState();
  const [form, setForm] = useState({
    nama: "",
    tanggalMulai: "",
    jurusanId: "",
    periodeId: "",
    instrukturId: "",
  });

  const getData = async () => {
    setLoading(true);
    try {
      const getDataPeriode = await GetPeriode();
      const getDataJurusan = await GetJurusan();
      const getDataInstruktur = await GetInstruktur();
      const periodeAktif = getDataPeriode.data.filter((item) => item.aktif === true);
      const jurusanAktif = getDataJurusan.data.filter((item) => item.aktif === true);
      setPeriode(periodeAktif);
      setJurusan(jurusanAktif);
      setInstruktur(getDataInstruktur.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'tanggalMulai' && value) {
      const date = new Date(value);
      date.setHours(8, 0, 0, 0);
      setForm({ ...form, [id]: date.toISOString() });
    } else {
      setForm({ ...form, [id]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const postData = await PostPelatihan(form)
      console.log(postData)
      await Swal.fire({
        title: "Berhasil",
        text: "Berhasil menambah pelatihan",
        icon: "success",
      }).then(() => {
        setForm({
          nama: "",
          tanggalMulai: "",
          jurusanId: "",
          periodeId: "",
          instrukturId: "",
        })
      });
    }catch(e){
      console.error(e)
    }
  };

  return (
    <>
      {!loading ? (
        <>
          {" "}
          <div>
            <Navbar />
            <div
              className={`flex-1 transition-all ease-linear duration-300 h-[calc(100vh-80px)] bg-white text-white p-5 ${
                isSidebarOpen ? "ml-64" : "ml-[0px]"
              }`}
            >
              <form
                className=" flex gap-3 flex-col pb-16"
                onSubmit={handleSubmit}
              >
                <h1 className="text-gray-600 text-xl font-semibold mb-2">
                  Tambah Pelatihan
                </h1>
                <div>
                  <label
                    htmlFor="nama"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nama Pelatihan
                  </label>
                  <input
                    type="text"
                    id="nama"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={form.nama}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="tanggalMulai"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tanggal Mulai Pelatihan
                  </label>
                  <input
                    type="date"
                    id="tanggalMulai"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={form.tanggalMulai.split('T')[0]} // Mengambil tanggal tanpa waktu
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="jurusanId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pilih Jurusan
                  </label>
                  <select
                    id="jurusanId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={form.jurusanId}
                    required
                    onChange={handleChange}
                  >
                    <option value={""}>Pilih Jurusan</option>
                    {jurusan.map((jurusan) => (
                      <option key={jurusan.id} value={jurusan.id}>
                        {jurusan.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="periodeId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pilih Periode
                  </label>
                  <select
                    id="periodeId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={form.periodeId}
                    required
                    onChange={handleChange}
                  >
                    <option value={""}>Pilih Periode</option>
                    {periode.map((periode) => (
                      <option key={periode.id} value={periode.id}>
                        {periode.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="instrukturId"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pilih Instruktur
                  </label>
                  <select
                    id="instrukturId"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={form.instrukturId}
                    required
                    onChange={handleChange}
                  >
                    <option value={""}>Pilih Instruktur</option>
                    {instruktur.map((instruktur) => (
                      <option key={instruktur.id} value={instruktur.id}>
                        {instruktur.nama}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end items-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
          <SlideBar />
        </>
      ) : null}
    </>
  );
};

export default TambahDataPelatihan;
