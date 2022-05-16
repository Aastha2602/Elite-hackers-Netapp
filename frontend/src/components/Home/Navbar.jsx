import React from "react";
import {NavLink} from "react-router-dom";
// import { Link } from "react-scroll";
import "./Navbar.css";
const Navbar = () =>{
  return(
    <>
    <div className="container-fluid nav_bg">
      <div className='row'>
        <div className="col-10 mx-auto">
 <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" id="navbarbrand" to="#">Elite Hackers</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav" id="navbarnav">
        <li className="nav-item" id="nav-item">
          <NavLink className="nav-link active" id="nav-link" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item" id="nav-item">
          <NavLink className="nav-link" id="nav-link" to="/puzzles">FAQs</NavLink>
        </li>
        {/* <li className="nav-item" id="nav-item">
        <NavLink className="nav-link" id="AboutUs" to="/AboutUs">AboutUs</NavLink>
        </li> */}
        <li className="nav-item" id="nav-item">
          <NavLink className="nav-link" id="nav-link" to="/contact">Contact Us</NavLink>
        </li>
               
      </ul>
    </div>
  </div>
</nav>
</div>
</div>
</div>
</>
  );
};
export default Navbar;