import React, { useState } from "react";
import Select from "react-select";
// import api from "../../services/api";
import c from "../home/FormAddDetails.module.css";
import { selectCreator } from "../hooks/benifFunc";
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

const Shifts = (p) => {
  const [dataMorning, setDataMorning] = useState({
    shiftName: "M",
    crews: [],
  });
  const [ot, setOt] = useState([{ crew: "", startDate: "", endDate: "" }]);
  const [otn, setOtn] = useState([{ crew: "", startDate: "", endDate: "" }]);
  const [dataEv, setDataEv] = useState({
    shiftName: "S",
    crews: [],
  });
  const [dataNi, setDataNi] = useState({
    shiftName: "N",
    crews: [],
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(dataMorning, dataEv, dataNi, ot, otn);
  };
  const onchangeHandler = (e, t) => {
    const datap = [];
    (t === "sm" || t === "se" || t === "sn") &&
      e.map((m) => datap.push(m.value));
    switch (t) {
      case "sm":
        setDataMorning((prev) => ({ ...prev, crews: datap }));
        break;
      case "se":
        setDataEv((prev) => ({ ...prev, crews: datap }));
        break;
      case "sn":
        setDataNi((prev) => ({ ...prev, crews: datap }));
        break;

      default:
    }
  };
  return (
    <React.Fragment>
      <div
        className={c.formCAdmin}
        style={{ width: "80%" }}
        onSubmit={submitHandler}
      >
        <h1 className={c.title}>Shifts</h1>
        <form className={c.form}>
          <div className={c["form-group"]}>
            <label htmlFor="role">morning</label>
            <Select
              options={selectCreator(p.crews)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              isMulti
              onChange={(e) => onchangeHandler(e, "sm")}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="role">evening</label>
            <Select
              options={selectCreator(p.crews)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              isMulti
              onChange={(e) => onchangeHandler(e, "se")}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="role">nigth</label>
            <Select
              options={selectCreator(p.crews)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              isMulti
              onChange={(e) => onchangeHandler(e, "sn")}
            />
          </div>
          <div className={c.otC}>
            <div className={c.formCAdmin}>
              <h1 className={c.title}>OT morning</h1>
              {ot.map((m, i) => (
                <div className={c.form} key={i}>
                  <div className={c["form-group"]}>
                    <label htmlFor="role">morning</label>
                    <Select
                      options={selectCreator(p.crews)}
                      id="multiSelect"
                      inputId="shiftleader1"
                      styles={customStyles}
                      onChange={(e) => {
                        const newot = [...ot];
                        newot[i].crew = e.value;
                        setOt(newot);
                      }}
                    />
                  </div>
                  <div className={c["form-group"]}>
                    <label htmlFor="role">from</label>
                    <input
                      type="date"
                      onChange={(e) => {
                        const newot = [...ot];
                        newot[i].startDate = e.target.value;
                        setOt(newot);
                      }}
                    />
                  </div>
                  <div className={c["form-group"]}>
                    <label htmlFor="role">to</label>
                    <input
                      type="date"
                      onChange={(e) => {
                        const newot = [...ot];
                        newot[i].endDate = e.target.value;
                        setOt(newot);
                      }}
                    />
                  </div>
                </div>
              ))}
              <h4
                onClick={(e) =>
                  setOt((p) => [...p, { crew: "", startDate: "", endDate: "" }])
                }
                className={c.addP}
              >
                add ot
              </h4>
            </div>
            <div className={c.formCAdmin}>
              <h1 className={c.title}>OT nigth</h1>
              {otn.map((m, i) => (
                <div className={c.form} key={i}>
                  <div className={c["form-group"]}>
                    <label htmlFor="role">morning</label>
                    <Select
                      options={selectCreator(p.crews)}
                      id="multiSelect"
                      inputId="shiftleader1"
                      styles={customStyles}
                      onChange={(e) => {
                        const newot = [...otn];
                        newot[i].crew = e.value;
                        setOtn(newot);
                      }}
                    />
                  </div>
                  <div className={c["form-group"]}>
                    <label htmlFor="role">from</label>
                    <input
                      type="date"
                      onChange={(e) => {
                        const newot = [...otn];
                        newot[i].startDate = e.target.value;
                        setOtn(newot);
                      }}
                    />
                  </div>
                  <div className={c["form-group"]}>
                    <label htmlFor="role">to</label>
                    <input
                      type="date"
                      onChange={(e) => {
                        const newot = [...otn];
                        newot[i].endDate = e.target.value;
                        setOtn(newot);
                      }}
                    />
                  </div>
                </div>
              ))}
              <h4
                onClick={(e) =>
                  setOtn((p) => [
                    ...p,
                    { crew: "", startDate: "", endDate: "" },
                  ])
                }
                className={c.addP}
              >
                add ot
              </h4>
            </div>
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Shifts;
