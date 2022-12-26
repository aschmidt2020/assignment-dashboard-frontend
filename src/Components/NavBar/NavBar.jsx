import { Link, useNavigate } from "react-router-dom";
import AddAssignment from "../AddAssignment/AddAssignment";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import SearchBar from "../SearchBar/SearchBar";
import swal from "sweetalert";
import icon from "../../Documents/apple-touch-icon.png";
import { useStore } from "../../app/store";

const NavBar = (props) => {
  const navigate = useNavigate();
  const userInfo = useStore((state) => state.userInfo);

  function navigateEnroll() {
    navigate(`/course/enroll`);
  }

  function handleClickLogout() {
    swal({
      title: "Sign Out",
      text: "Are you sure you would like to sign out? \n\n IMPORTANT: Make sure you save your notes!",
      icon: "warning",
      buttons: ["Cancel", "Sign Out"],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        useStore.getState().logout();
      }
    });
  }

  return (
    <div className="row">
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" style={{ marginLeft: "10px" }}>
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div className="col-1">
              <li className="nav-item">
                <Link to="/" data-toggle="popover" title="Home" data-content="Home" trigger="hover">
                  <img src={icon} alt="abacus" style={{ height: "30px", width: "30px" }}></img>
                </Link>
              </li>
            </div>
            <div className="col-1" style={{ marginLeft: "-7em", marginRight: "7em" }}>
              <li className="nav-item">
                <Link to="/" data-toggle="popover" title="Home" data-content="Home" trigger="hover">
                  <h4>Assignment<small>Dashboard</small></h4>
                </Link>
              </li>
            </div>

            <div className="col-7">
              <SearchBar />
            </div>

            <div className="col-3">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ width: "100%" }}>
                <li className="nav-item">
                  {userInfo && (<span><button className="btn btn-outline-primary" data-toggle="popover" title="Courses" data-content="Courses" trigger="hover" onClick={() => navigateEnroll()} style={{ marginRight: "1em" }}><i className="bi bi-card-list"></i></button></span>)}
                </li>

                <li className="nav-item">
                  {userInfo && userInfo.is_staff && (<span><AddAssignment /></span>)}
                </li>

                <li className="nav-item">
                  {!userInfo && (<span><LoginForm /> <RegistrationForm /></span>)}
                  {userInfo && (<button type="button" className="btn btn-outline-danger" data-toggle="popover" title="Log Out" data-content="Log Out" trigger="hover" onClick={() => handleClickLogout()}><i className="bi bi-box-arrow-right"></i></button>)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
