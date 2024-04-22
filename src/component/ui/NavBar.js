import { NavLink } from "react-router-dom";
import c from "./NavBar.module.css";
import imglogo from "../../assets/aptiv-logo.svg";
import { useSelector } from "react-redux";
import React from "react";

const NavBar = (p) => {
  const { isLoged } = useSelector((s) => s.loginr);

  return (
    <div className={c.navBar}>
      <div className={c.logo}>
        <NavLink to="/home">
          <img src={imglogo} alt="logo for aptiv" />
        </NavLink>
      </div>
      {isLoged.login && (
        <div className={c.links}>
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? c.activeLink : c.link)}
              >
                home
              </NavLink>
            </li>
            {isLoged.role === "Admin" && (
              <React.Fragment>
                <li>
                  <NavLink
                    to="/config"
                    className={({ isActive }) =>
                      isActive ? c.activeLink : c.link
                    }
                  >
                    Config
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {isLoged.role !== "Reworker" && (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? c.activeLink : c.link
                  }
                >
                  dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
export default NavBar;
