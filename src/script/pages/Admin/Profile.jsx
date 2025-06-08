import Navbar from "../../component/admin/Navbar";
import { useGlobalContext } from "../../component/admin/context";
import SlideBar from "../../component/admin/SlideBar";
import { GetUser, PutDataUser } from "../../config/ApiService";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ImgProfile from "../../../assets/Profile.png";
import axios from "axios";


const Profile = () => {
  const [dataUser, setDataUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const { openSidebar, isSidebarOpen } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    alamat: "",
    noTelepon: "",
    tanggalLahir: "",
    periode: "",
    foto: "",
  });

  // Fungsi untuk ambil data user
  const getData = async () => {
    setLoading(true);
    try {
      const getData = await GetUser();
      if (getData) {
        setDataUser(getData);
        console.log(getData)
        setFormData({
          nama: getData.nama || "",
          email: getData.email || "",
          password: getData.password || "",
          alamat: getData.alamat || "",
          noTelepon: getData.noTelepon || "",
          foto: getData.foto || "",
          tanggalLahir: getData.tanggalLahir
            ? new Date(getData.tanggalLahir).toISOString().split("T")[0]
            : "",

          periode: getData.periode || "",
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = { ...formData };
      delete dataToSubmit.periode;
      if (!formData.password) {
        delete dataToSubmit.password;
      }
      const response = await PutDataUser(dataToSubmit);
      if (response.status === 200) {
        await Swal.fire({
          title: "Berhasil",
          text: "Berhasil edit data diri",
          icon: "success",
        }).then(() => {
          location.reload();
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("foto", selectedFile);

    try {
      const response = await axios.put(
        "http://localhost:3000/user/foto",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      await Swal.fire({
        title: "Berhasil",
        text: "Berhasil edit data diri",
        icon: "success",
      }).then(() => {
        location.reload();
      });
    } catch (error) {
      console.error("Upload gagal:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <div>
            <Navbar />
            <div
              className={`flex-1 transition-all ease-linear duration-300 min-h-[calc(100vh-80px)] bg-white text-white p-5 ${
                isSidebarOpen ? "ml-64" : "ml-[0px]"
              }`}
            >
              <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                  <div>

                    <div className="bg-white rounded p-4 px-4 md:p-8 mb-6">
                      <div className="grid text-gray-800 gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="flex gap-2 flex-col text-gray-600">
                          <p className="font-medium text-lg">Rincian Pribadi</p>
                          <p>Harap lengkapi semua kolom.</p>
                          <div className="w-full my-5 flex justify-center h-auto items-center">
                            <img
                              src={
                                previewUrl ||
                                (formData.foto
                                  ? `http://localhost:3000${formData.foto}`
                                  :  ImgProfile)
                              }
                              alt="Preview"
                              className="w-44 h-44 object-cover rounded-full"
                            />
                          </div>
                          <input
                            type="file"
                            name="foto"
                            onChange={handleFileChange}
                            accept="image/*"
                          />

                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleUpload}
                          >
                            Upload Foto
                          </button>
                        </div>

                        <div className="lg:col-span-2">
                          <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                              <div className="md:col-span-5">
                                <label htmlFor="nama">Nama Lengkap</label>
                                <input
                                  type="text"
                                  name="nama"
                                  id="nama"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  value={formData.nama}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="md:col-span-5">
                                <label htmlFor="email">Email Address</label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  placeholder="email@domain.com"
                                  autoComplete="username"
                                  value={formData.email}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="md:col-span-3">
                                <label htmlFor="noTelepon">Nomor Telepon</label>
                                <input
                                  type="number"
                                  name="noTelepon"
                                  id="noTelepon"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  placeholder=""
                                  value={formData.noTelepon}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="md:col-span-2">
                                <label htmlFor="tanggalLahir">
                                  Tanggal Lahir
                                </label>
                                <input
                                  type="date"
                                  name="tanggalLahir"
                                  id="tanggalLahir"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  placeholder=""
                                  value={formData.tanggalLahir}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="md:col-span-5">
                                <label htmlFor="alamat">Alamat</label>
                                <textarea
                                  rows={5}
                                  name="alamat"
                                  id="alamat"
                                  className="border mt-1 rounded px-4 w-full bg-gray-50 min-h-[40px] py-2"
                                  value={formData.alamat}
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="md:col-span-5">
                                <label htmlFor="password">Password</label>
                                <input
                                  type="password"
                                  name="password"
                                  id="password"
                                  autoComplete="current-password"
                                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="md:col-span-5 text-right">
                                <div className="inline-flex items-end gap-5">
                                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Update
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default Profile;
