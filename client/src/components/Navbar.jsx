import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
import epcorn from "../images/eppl1.png";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link
          to={
            user && (user.role === "Epcorn" || user.role === "Admin")
              ? "/allHotels"
              : "/allServiceRequests"
          }
          className="nav-link active"
          aria-current="page"
        >
          <img src={epcorn} alt="epcorn" style={{ width: 60 }} />
        </Link>
        <div id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user && (
              <li className="nav-item">
                <button className="btn" onClick={() => dispatch(logout())}>
                  <h4>Logout</h4>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
