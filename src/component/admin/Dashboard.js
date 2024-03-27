import React, { useCallback, useEffect, useState } from "react";
import ReUtilChartDashbord from "./ReUtilChartDashbord";
import Select from "react-select";
import { useSelector } from "react-redux";
import c from "./Dashboard.module.css";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",

    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol"`,

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
const Dashboard = (p) => {
    const [crewsFetch, setCrewsFetch] = useState({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      crews: "",
      cableStatus: "",
      problems: "",
    });
  return (
    <React.Fragment>
    <div className={c.headerD}>
    <div className={c.inputHi}>
      <div className={c["form-group"]}>
        <label htmlFor="trainingType">Cable Condition</label>
        <Select
          options={[]}
          id="multiSelect"
          inputId="shiftleader1"
          styles={customStyles}
          placeholder="select Cable Condition"
        />
      </div>
      <div className={c["form-group"]}>
        <label htmlFor="ed">end date</label>
        <input
          required
          name="ed"
          id="ed"
          type="month"
          value={
            crewsFetch.month > 9
              ? `${crewsFetch.year}-${crewsFetch.month}`
              : `${crewsFetch.year}-0${crewsFetch.month}`
          }
          placeholder="enter TS/h"
          onChange={(e) => {
            const value = e.target.value.split("-");
            console.log(value);
            setCrewsFetch((p) => ({
              ...p,
              year: value[0],
              month: +value[1],
            }));
          }}
        />
      </div>
    </div>
  </div>
      <ReUtilChartDashbord title="crews" crewsFetch={crewsFetch}/>
    </React.Fragment>
  );
};

export default Dashboard;
