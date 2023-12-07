import { useState } from "react";
import { MdClose, MdOutlineDashboard } from "react-icons/md";
import { BsBarChartFill, BsDatabaseFillAdd } from "react-icons/bs";
import { FaFileAlt, FaUser, FaBuilding } from "react-icons/fa";
import { MdLogout, MdOutlineMenu } from "react-icons/md";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
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
    icon: <BsDatabaseFillAdd className="w-6 h-6" />,
    name: "Services",
    to: "/services",
  },
  {
    icon: <MdOutlineDashboard className="w-6 h-6" />,
    name: "Complaints",
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
    <aside className="antialiased">
      <nav className="bg-slate-200 border-b-2 border-gray-500 py-2 lg:py-2.5 fixed top-0 left-0 right-0">
        <div className="flex justify-between lg:justify-center items-center mx-5">
          <div className="lg:hidden">
            <button onClick={() => setShow(!show)}>
              {!show && <AiOutlineMenuUnfold className="w-9 h-9" />}
            </button>
          </div>
          <div className="flex items-center">
            <img src={logo} className="mr-2 h-10" alt="Logo" />
            <span className="text-center text-2xl font-semibold whitespace-nowrap">
              PestXZ
            </span>
          </div>
        </div>
      </nav>
      <aside
        className={`fixed top-0 left-0 w-64 h-screen transition-transform -translate-x-full border-r-2 mt-[56px] lg:mt-[60px]  bg-slate-200 border-gray-500 ${
          show ? "translate-x-0" : "lg:translate-x-0"
        }`}
      >
        {show && (
          <div className="flex justify-end">
            <AiOutlineMenuFold
              onClick={() => setShow(!show)}
              className="lg:hidden w-9 h-9  mr-5 text-red-500"
            />
          </div>
        )}
        <div className="overflow-y-auto px-3 h-full">
          <ul className="space-y-4 mt-2">
            {navList.map((item) => (
              <li key={item.name} className="hover:bg-gray-300">
                <button
                  onClick={() => handleNavigate(item.to)}
                  className="flex items-center p-2 text-base font-medium text-gray-800 rounded-lg "
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
