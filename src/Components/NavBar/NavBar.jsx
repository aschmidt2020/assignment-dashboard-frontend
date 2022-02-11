import { Link, useNavigate} from "react-router-dom";
import AddAssignment from "../AddAssignment/AddAssignment";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = (props) => {
    const navigate = useNavigate();

    function navigateEnroll(){
        navigate(`/course/enroll`);
    }

    return (
        <div className="row">
            <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                    <div className="col-9">
                        <a className="nav-item">
                            <Link to="/" data-toggle="popover" title="Home" data-content="Home" trigger="hover">
                            <h4>Assignment<small className="text-muted">Dashboard</small></h4>
                            </Link>
                            <SearchBar assignments={props.assignments} courses={props.courses} getResults={props.getResults}/>
                        </a>

                    </div>

                    <div className="col-3">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ "width": "100%" }}>
                            <li className="nav-item"> 
                            {props.userInfo && <span><button className="btn btn-outline-primary" onClick={() => navigateEnroll()} style={{'marginRight':'1em'}}> Add Course</button></span>}
                            </li>

                            <li className="nav-item">
                            {props.userInfo && props.userInfo.is_staff && <span> <AddAssignment  courses={props.courses} getAssignments={props.getAssignments}/> </span>}
                            </li>

                            <li className="nav-item">
                            {!props.userInfo && <span> <LoginForm login={props.login} /> <RegistrationForm register={props.register} /> </span>}
                            {props.userInfo && <button type="button" className="btn btn-outline-danger" onClick={props.logout}>Log Out</button>}
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;