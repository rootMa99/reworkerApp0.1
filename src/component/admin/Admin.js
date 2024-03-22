import Select from "react-select";
import c from "../home/FormAddDetails.module.css";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import BackDrop from "../ui/BackDrop";
const ROLES = [
  {
    value: "Logistics",
    label: "Logistics",
  },
  {
    value: "Reworker",
    label: "Reworker",
  },
  {
    value: "Teamleader",
    label: "Teamleader",
  },
  {
    value: "Auditor",
    label: "Auditor",
  },
  {
    value: "ShiftLeader",
    label: "ShiftLeader",
  },
  {
    value: "Coordinator",
    label: "Coordinator",
  },
];
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "97%",
    height: "auto",
    fontWeight: "600",
    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                    "Segoe UI Symbol"`,
    letterSpacing: "2px",
    textAlign: "center",
    outline: "none",
    border: "1px solid #414141",
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: "auto",
    "&:hover": {
      border: "1px solid #f33716",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "97%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                    "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "200px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f33716",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};
const Admin = (p) => {
  const { isLoged } = useSelector((s) => s.loginr);
  const [data, setData] = useState({ data: [], totalItems: 0 });
  const [selectedData, setSelectedData] = useState({});
  const [aut, setAut] = useState(false);

  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [isLoged.token]);

  useEffect(() => {
    callback();
  }, [callback]);

  const close = () => {
    setAut(false);
  };

  const clickUser = (e, m) => {
    setSelectedData({
      id: m._id,
      username: m.username,
      isActive: m.isActive,
      password: "",
    });
  };

  return (
    <React.Fragment>
      {aut && (
        <React.Fragment>
          <BackDrop click={close} />
          <div className={`${c.formCAdmin} ${c.updateAcc}`}>
            <h1 className={c.title}>update Account</h1>
            <form className={c.form}>
              <div className={c["form-group"]}>
                <label htmlFor="userName">userName</label>
                <input
                  required
                  name="userName"
                  id="userName"
                  type="text"
                  placeholder="enter userName"
                  value={selectedData.username}
                />
              </div>
              <div className={c["form-group"]}>
                <label htmlFor="password">password</label>
                <input
                  required
                  name="password"
                  id="password"
                  type="text"
                  placeholder="enter password"
                />
              </div>
              <div className={c["form-group"]}>
                <label htmlFor="crew">Status</label>
                <Select
                  options={ROLES}
                  id="multiSelect"
                  inputId="shiftleader1"
                  styles={customStyles}
                  value={{
                    value: selectedData.isActive
                      ? "activate"
                      : "not activate",
                    label: selectedData.isActive
                      ? "activate"
                      : "not activate",
                  }}
                />
              </div>
              <button type="submit" className={c["form-submit-btn"]}>
                update
              </button>
              <span className={c.deletion}>delete this Account!</span>
            </form>
          </div>
        </React.Fragment>
      )}
      <div className={c.formCAdmin}>
        <h1 className={c.title}>Create a New Account</h1>
        <form className={c.form}>
          <div className={c["form-group"]}>
            <label htmlFor="userName">userName</label>
            <input
              required
              name="userName"
              id="userName"
              type="text"
              placeholder="enter userName"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="password">password</label>
            <input
              required
              name="password"
              id="password"
              type="text"
              placeholder="enter password"
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="crew">role</label>
            <Select
              options={ROLES}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
            />
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
      <div className={c.CAdminUserList}>
        <h3 className={c.titlenb}>
          nb users <span>{data.totalItems}</span>
        </h3>
        {data.data.length > 0 &&
          data.data.map((m) => (
            <div
              key={m._id}
              className={c.listOfUser}
              onClick={(e) => clickUser(e, m)}
            >
              <div className={c.detailsData}>
                <h3>userName</h3>
                <h2>{m.username}</h2>
              </div>
              <div className={c.detailsData}>
                <h3>role</h3>
                <h2>{m.role}</h2>
              </div>
              <div className={c.detailsData}>
                <h3>time created</h3>
                <h2>{m.createdAt.split("T")[0]}</h2>
              </div>
              <div className={c.detailsData}>
                <h3>status</h3>
                <h2>{m.isActive ? "active" : "not active"}</h2>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default Admin;
