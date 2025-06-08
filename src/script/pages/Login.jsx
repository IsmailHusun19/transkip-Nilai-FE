import logo from "../../assets/BBPVP.jpg";
import bgImage from "../../assets/BBPVPSerangBanten.jpg";
import { Apilogin, GetUser } from "../config/ApiService";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
import UserCheck from "../config/userCheck";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [getUser, setUser] = useState();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("status"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    try {
      const login = await Apilogin(data);
      if (!login) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Password atau email anda salah!",
        });
      } else {
        navigate("/home");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSetData = (data) => {
    setUser(data);
    setUserData(data);
    if (data) {
      localStorage.setItem("status", JSON.stringify(true));
      navigate('/home')
    } else {
      localStorage.setItem("status", JSON.stringify(false));
    }
  };

  useEffect(() => {
    if(userData){
      setLoading(true)
    }else{
      setLoading(false)
    }
  }, [userData])

  useEffect(() => {
    if (loading && userData) {
      if(getUser?.role === "Admin"){
        navigate('/admin')
      }else{
        navigate('/home');
      }
    }
  }, [loading, userData]);

  

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <UserCheck setData={handleSetData} />
          <div
            className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 bg-slate-300 bg-cover bg-no-repeat backdrop-brightness-50"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="p-8 bg-white shadow-lg min-w-[440px] rounded-lg">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center items-center gap-2">
                  <img
                    alt="Your Company"
                    src={logo}
                    className="h-20 rounded-full"
                  />
                  <h1 className="text-slate-700 font-extrabold text-2xl">
                    BBPVP Serang
                  </h1>
                </div>
                <h2 className="mt-3 text-center text-2xl/9 font-bold tracking-tight text-slate-700">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  action="#"
                  method="POST"
                  onSubmit={handleLogin}
                  className="space-y-3 mt-5"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-800 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-800 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="mt-5 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
