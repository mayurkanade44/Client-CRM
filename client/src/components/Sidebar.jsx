import { useState } from "react";
import { MdClose, MdOutlineDashboard } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import { FaFileAlt, FaUser, FaBuilding } from "react-icons/fa";
import { MdLogout, MdOutlineMenu } from "react-icons/md";
import { useLogoutMutation } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo12.png";

const navList = [
  {
    icon: <BsBarChartFill className="w-6 h-6 " />,
    name: "Dashboard",
    to: "",
  },
  {
    icon: <FaBuilding className="w-6 h-6" />,
    name: "Clients",
    to: "/clients",
  },
  {
    icon: <MdOutlineDashboard className="w-6 h-6" />,
    name: "Service Request",
    to: "/request",
  },
  {
    icon: <FaUser className="w-6 h-6" />,
    name: "Users",
    to: "/users",
  },
  {
    icon: <FaFileAlt className="w-6 h-6" />,
    name: "Reports",
    to: "/reports",
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

  const handleNavigate = (to) => {
    setShow(!show);
    navigate(`/dashboard${to}`);
  };

  return (
    <aside className="antialiased bg-gray-50">
      <nav className="bg-white border-b-2 border-gray-200 pr-10 pl-4 py-2 lg:py-2.5 dark:bg-gray-800 dark:border-gray-600 fixed top-0 left-0 right-0">
        <div className="flex flex-wrap justify-center items-center">
          <div className="flex justify-start items-center">
            <button onClick={() => setShow(!show)}>
              <MdOutlineMenu className="lg:hidden w-12 h-12 mr-5" />
            </button>
            <img src={logo} className="mr-3 h-10" alt="Logo" />
            <span className="text-center  text-2xl font-semibold whitespace-nowrap dark:text-white">
              PestXZ
            </span>
          </div>
        </div>
      </nav>
      <aside
        className={`fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full bg-white border-r-2 border-gray-200 dark:bg-gray-800 dark:border-gray-600 ${
          show ? "translate-x-0" : "lg:translate-x-0"
        }`}
      >
        <div className="overflow-y-auto py-5 px-3 pt-12 h-full bg-white dark:bg-gray-800">
          <ul className="space-y-4 mt-5">
            {navList.map((item) => (
              <li
                key={item.name}
                className="hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <button
                  onClick={() => handleNavigate(item.to)}
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white  group"
                >
                  {item.icon}
                  <span className="ml-3 text-xl">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </aside>
  );
};
export default Sidebar;
