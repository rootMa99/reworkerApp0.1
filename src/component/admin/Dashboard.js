import React from "react";
import ReUtilChartDashbord from "./ReUtilChartDashbord";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import c from "./Dashboard.module.css";
import { loginSActions } from "../../store/loginSlice";
import { selectCreator } from "../hooks/benifFunc";
import api from "../../services/api";
import { Link } from "react-router-dom";
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
const statusC = [
  {
    value: "in-Progress",
    label: "in-Progress",
  },
  {
    value: "Repaired",
    label: "Repaired",
  },
  {
    value: "Scrap",
    label: "Scrap",
  },
  {
    value: "Sertissage",
    label: "Sertissage",
  },
];
const Dashboard = (p) => {
  const { dataFilter, dataSelect } = useSelector((s) => s.loginr);
  const dispatch = useDispatch();
  console.log(dataSelect);

  return (
    <React.Fragment>
      <div className={c.headerD}>
        <div className={c.inputHi}>
          <div className={c["form-group"]}>
            <label htmlFor="trainingType">crews</label>
            <Select
              options={selectCreator(dataSelect.crews)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="select Crews"
              onChange={(e) => {
                dispatch(loginSActions.editcrew(e));
              }}
              isMulti
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="trainingType">problems</label>
            <Select
              options={selectCreator(dataSelect.problems)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="select problems"
              onChange={(e) => {
                dispatch(loginSActions.editproblems(e));
              }}
              isMulti
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="trainingType">Cable Status</label>
            <Select
              options={statusC}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              placeholder="select Cable Status"
              onChange={(e) => {
                dispatch(loginSActions.editcableStatus(e));
              }}
              isMulti
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
                dataFilter.month > 9
                  ? `${dataFilter.year}-${dataFilter.month}`
                  : `${dataFilter.year}-0${dataFilter.month}`
              }
              placeholder="enter TS/h"
              onChange={(e) => {
                const value = e.target.value.split("-");
                dispatch(
                  loginSActions.editYM({ year: value[0], month: +value[1] })
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className={c.btnhelperholder}>
        <Link
          to={`${api}/data/export/repairdata/excel?year=${
            dataFilter.year
          }&month=${dataFilter.month}&cableStatus=${dataFilter.cableStatus
            .map((m) => m.value)
            .toString()}&crews=${dataFilter.crews
            .map((m) => m.value)
            .toString()}&problems=${dataFilter.problems
            .map((m) => m.value)
            .toString()}`}
        >
          <button className={c.button} type="button">
            <span className={c["button__text"]}>Download</span>
            <span className={c["button__icon"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 35 35"
                id="bdd05811-e15d-428c-bb53-8661459f9307"
                data-name="Layer 2"
                className={c.svg}
              >
                <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
              </svg>
            </span>
          </button>
        </Link>
      </div>

      <ReUtilChartDashbord title="crews" type="crew" />
      <ReUtilChartDashbord title="problems" type="problem" />
      <ReUtilChartDashbord title="cablestatuses" type="cableStatus" />
    </React.Fragment>
  );
};

export default Dashboard;
