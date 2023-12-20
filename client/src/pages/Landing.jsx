import { useState } from "react";
import { Button } from "../components";
import hotel from "../assets/hotel.png";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLoginMutation } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../redux/helperSlice";

const Landing = () => {
  const { user, locationId } = useSelector((store) => store.helper);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(`Welcome ${res.name}`);
      setForm({ email: "", password: "" });
      if (locationId) return navigate(`/location/${locationId}`);
      else if (res.role === "ClientEmployee" || res.role === "PestEmployee") {
        navigate("/dashboard/complaints");
        return;
      } else {
        navigate("/dashboard/stats");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <section className="bg-gray-700 bg-opacity-60 bg-[url('https://res.cloudinary.com/djc8opvcg/image/upload/v1701669902/samples/Caravela_Beach_Resort_eukgag.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
      <div className="pt:mt-0 mx-auto flex flex-col items-center justify-center px-6 py-8 h-screen">
        <div className="mb-6 flex items-center text-3xl font-semibold text-white">
          <img className="mr-5 h-10 w-10" src={hotel} alt="logo" />
          Client CRM
        </div>
        <div className="w-[350px] rounded-lg bg-white shadow dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6 lg:space-y-8">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block dark:text-white font-medium"
                >
                  Email
                </label>
                <input
                  className="w-full py-0.5 px-2 border-2 rounded-md outline-none transition border-neutral-300 focus:border-black"
                  placeholder="jon@doe.com"
                  required
                  type="email"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block dark:text-white font-medium"
                >
                  Password
                </label>
                <input
                  className="w-full py-0.5 px-2 border-2 rounded-md outline-none transition border-neutral-300 focus:border-black"
                  placeholder="••••••••"
                  required
                  type="password"
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  label="Log in"
                  isLoading={isLoading}
                  disabled={isLoading}
                  width="w-full"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;
