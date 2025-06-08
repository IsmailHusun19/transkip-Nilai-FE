import NavbarSebelumLogin from "../component/SebelumLogin/NavbarSebelumLogin";
import BBPVP from "../../assets/BBPVPSerangBanten.jpg";
import BG from "../../assets/bg.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { GetUser } from "../config/ApiService";
import { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
const HalamanUtama = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const dataUser = await GetUser();
        if (dataUser) {
          setUser(dataUser);
          if (dataUser.role === "Admin") {
            navigate("/admin", { replace: true });
            return;
          } else {
            navigate("/home", { replace: true });
            return;
          }
        } else {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.error("Gagal ambil data user:", error);
        navigate("/", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    setLoadingAdmin(true)
    if (!loading && user) {
      if(user?.role === "Admin"){
        navigate('/admin')
      }else{
        navigate('/home');
      }
    }
  }, [loading, user]);



  return (
    <>
      {loading ? (
        <div>Loading ..</div>
      ) : (
        <>
          {user.length !== 0 ? <Navbar /> : <NavbarSebelumLogin />}
          <section
            className="bg-white dark:bg-gray-900"
            style={{ backgroundImage: `url(${BG})` }}
          >
            <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
              <div className="mr-auto place-self-center lg:col-span-7">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                  BBPVP Serang
                </h1>
                <p className="max-w-2xl mb-6 font-normal text-gray-800 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                  Balai Besar Pelatihan Vokasi dan Produktivitas (BBPVP) Serang
                  merupakan unit pelaksana teknis di bawah Kementerian
                  Ketenagakerjaan Republik Indonesia yang berfokus pada
                  peningkatan kompetensi tenaga kerja melalui pelatihan vokasi
                  berkualitas. Dengan fasilitas lengkap, instruktur
                  berpengalaman, dan kurikulum yang relevan dengan kebutuhan
                  industri, BBPVP Serang berkomitmen mencetak SDM unggul,
                  kompeten, dan siap bersaing di dunia kerja.
                </p>
              </div>
              <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                <img className="rounded-lg" src={BBPVP} />
              </div>
            </div>
          </section>

          <section
            className="bg-gray-50 dark:bg-gray-800"
            style={{ backgroundImage: `url(${BG})` }}
          >
            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
              <figure className="max-w-screen-md mx-auto">
                <svg
                  className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                  viewBox="0 0 24 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote>
                  <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                    "BBPVP Serang adalah pilihan tepat untuk pengembangan
                    keterampilan kerja. Menyediakan berbagai program pelatihan
                    vokasi dengan fasilitas lengkap, instruktur profesional, dan
                    kurikulum berbasis industri — solusi ideal bagi Anda yang
                    ingin siap bersaing di dunia kerja."
                  </p>
                </blockquote>
              </figure>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default HalamanUtama;
