import { useState } from "react";
import { MdClose, MdOutlineDashboard } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaFileAlt, FaUser, FaBuilding } from "react-icons/fa";
import { MdLogout, MdOutlineMenu } from "react-icons/md";
import { useLogoutMutation } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate, Outlet } from "react-router-dom";
import logo from '../assets/logo1.png'

const navList = [
  {
    icon: <BsBarChartFill className="w-6 h-6 text-indigo-600" />,
    name: "Dashboard",
  },
  {
    icon: <FaBuilding className="w-6 h-6 text-indigo-600" />,
    name: "Client",
  },
  {
    icon: <MdOutlineDashboard className="w-6 h-6 text-indigo-600" />,
    name: "Service Request",
  },
  {
    icon: <FaUser className="w-6 h-6 text-indigo-600" />,
    name: "Users",
  },
  {
    icon: <FaFileAlt className="w-6 h-6 text-indigo-600" />,
    name: "Reports",
  },
];

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      toast.success(res.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.msg || error.error);
    }
  };

  return (
    <main>
      <div className="w-full h-full bg-gray-200">
        <div className="flex flex-no-wrap">
          {/* Sidebar starts */}
          <div className="absolute lg:relative w-64 h-screen shadow bg-gray-100 hidden lg:block">
            <div className="h-20 w-full flex justify-center items-center px-8">
              <img src={logo} alt="logo" className="w-20 h-16" />
            </div>
            <ul aria-orientation="vertical" className="pt-2">
              {navList.map((item) => (
                <li
                  key={item.name}
                  className="pl-6 cursor-pointer leading-3 tracking-normal py-4 text-black"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2 text-lg">{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "w-full h-full absolute z-40  transform  translate-x-0 "
                : "   w-full h-full absolute z-40  transform -translate-x-full"
            }
          >
            <div
              className="bg-gray-800 opacity-50 absolute h-full w-full lg:hidden"
              onClick={() => setShow(!show)}
            />
            <div className="absolute z-40 sm:relative w-64 shadow pb-4 bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full">
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex items-center justify-between px-8">
                    <div className="h-16 w-full flex items-center">Pestxz</div>
                    <div
                      id="closeSideBar"
                      className="flex items-center justify-center h-10 w-10"
                      onClick={() => setShow(!show)}
                    >
                      <MdClose className="h-6 w-6" />
                    </div>
                  </div>
                  <ul aria-orientation="vertical" className="py-6">
                    {navList.map((item) => (
                      <li
                        key={item.name}
                        className="pl-6 cursor-pointer text-sm leading-3 tracking-normal py-4 text-black"
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2 xl:text-base md:text-xl text-base">
                            {item.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full">
                  <div className="border-t border-gray-400">
                    <div className="w-full flex items-center justify-between px-5 pt-1">
                      <p className="md:text-xl font-medium text-gray-800 text-base leading-4 ">
                        Jane Doe
                      </p>
                      <button
                        onClick={handleLogout}
                        className="flex items-center text-red-500"
                      >
                        <MdLogout />
                        <span className="ml-2">Sign out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          {/* Sidebar ends */}
          <div className="w-full">
            {/* Navigation starts */}
            <nav className="h-16 lg:hidden flex items-center justify-between lg:justify-end  bg-white shadow relative z-10">
              <div
                className="text-gray-600 ml-8 visible lg:hidden"
                onClick={() => setShow(!show)}
              >
                {!show && <h1 className="text-lg font-semibold">Pestxz</h1>}
              </div>
              <div
                className="text-gray-600 mr-8 visible lg:hidden"
                onClick={() => setShow(!show)}
              >
                {!show && <MdOutlineMenu className="w-7 h-7" />}
              </div>
            </nav>
            <div className="p-5">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Sidebar;
