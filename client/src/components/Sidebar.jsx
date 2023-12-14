import { useState } from "react";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { BsBarChartFill, BsDatabaseFillAdd } from "react-icons/bs";
import { FaBuilding, FaFileAlt, FaPowerOff, FaUser } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo12.png";
import { useLogoutMutation } from "../redux/userSlice";
import { useSelector } from "react-redux";

const navList = [
  {
    icon: <BsBarChartFill className="w-6 h-6 " />,
    name: "Dashboard",
    to: "",
    role: ["Admin", "ClientAdmin"],
  },
  {
    icon: <FaBuilding className="w-6 h-6" />,
    name: "Clients",
    to: "/clients",
    role: ["Admin"],
  },
  {
    icon: <BsDatabaseFillAdd className="w-6 h-6" />,
    name: "Services",
    to: "/services",
    role: ["Admin"],
  },
  {
    icon: <MdOutlineDashboard className="w-6 h-6" />,
    name: "Complaints",
    to: "/complaints",
    role: ["Admin", "ClientAdmin", "ClientEmployee", "PestEmployee"],
  },
  {
    icon: <FaUser className="w-6 h-6" />,
    name: "Users",
    to: "/users",
    role: ["Admin", "ClientAdmin"],
  },
  {
    icon: <FaFileAlt className="w-6 h-6" />,
    name: "Reports",
    to: "/reports",
    role: ["Admin", "ClientAdmin"],
  },
];

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("");

  const { user } = useSelector((store) => store.helper);
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
    setActive(to);
  };

  return (
    <aside className="antialiased">
      <nav className="bg-slate-200 border-b-2 z-50 border-gray-500 py-2 lg:py-2.5 fixed top-0 left-0 lg:left-40 right-0">
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
        className={`fixed top-0 left-0 w-60 z-50 h-screen transition-transform -translate-x-full border-r-2 bg-slate-700 border-gray-500 ${
          show ? "translate-x-0" : "lg:translate-x-0"
        }`}
      >
        {show && (
          <div className="flex justify-end">
            <AiOutlineMenuFold
              onClick={() => setShow(!show)}
              className="lg:hidden w-9 h-9 mt-3 mr-5 text-red-500"
            />
          </div>
        )}
        <div className="overflow-y-auto h-full">
          <ul className="space-y-4 mt-5 lg:mt-20">
            {navList.map((item) => {
              return (
                item.role.includes(user.role) && (
                  <li
                    key={item.name}
                    className={`hover:bg-gray-800 px-3 ${
                      active === item.to && "bg-gray-800"
                    }`}
                  >
                    <button
                      onClick={() => handleNavigate(item.to)}
                      className="flex items-center p-2 text-base font-medium text-white rounded-lg "
                    >
                      {item.icon}
                      <span className="ml-3 text-xl">{item.name}</span>
                    </button>
                  </li>
                )
              );
            })}
          </ul>
          <div className="absolute bottom-0 left-0 flex justify-center py-5 w-full">
            <button onClick={handleLogout}>
              <div className="flex justify-center items-center font-medium text-xl tracking-wider text-sky-400 hover:text-red-500">
                <FaPowerOff className="mr-2" />
                Logout
              </div>
            </button>
          </div>
        </div>
      </aside>
    </aside>
  );
};
export default Sidebar;
