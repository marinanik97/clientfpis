import React from "react";
import { NavLink } from "react-router-dom";
import "./style/Menu.css";

const Menu = () => {
  return (
    // <header className="main-header">
    //   <nav>
    //     <ul className="menu-style">
    //       <li>
    //         <NavLink to="/" exact>
    //           Home
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/createtype">Kreiranje tipa uzorka</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/createreport">Kreiranje izveštaja</NavLink>
    //       </li>
    //     </ul>
    //   </nav>
    // </header>

    <header className="main-header">
      <nav>
        <ul className="menu-style">
          <li>
            <NavLink
              to="/"
              exact
              activeStyle={{
                fontWeight: "bold",
                color: "#008080",
              }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/createtype"
              activeStyle={{
                fontWeight: "bold",
                color: "#008080",
              }}
            >
              Manipulacija rezultatima
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/createreport"
              activeStyle={{
                fontWeight: "bold",
                color: "#008080",
              }}
            >
              Patients
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              activeStyle={{
                fontWeight: "bold",
                color: "#008080",
              }}
            >
              Log in
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/card"
              activeStyle={{
                fontWeight: "bold",
                color: "#008080",
              }}
            >
              Kreiranje izveštaja
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Menu;
