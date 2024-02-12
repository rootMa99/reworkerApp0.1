import { useSelector } from "react-redux";
import c from "./FormAddDetails.module.css";
import Select from "react-select";
import { selectCreator } from "../hooks/benifFunc";
import React, { useState } from "react";
import Notification from "../ui/Notification";
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
      border: "1px solid orangered",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "97%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "orangered",
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
      backgroundColor: "orangered",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};

const FormAddDetails = (p) => {
  const { dataSelect, urgent } = useSelector((s) => s.loginr);
  const [dataInp, setDataInp] = useState({
    reference: p.refs,
    crew: "",
    problem: [],
    details: "",
    pdd: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(dataInp);
  };

  const onchangeHandler = (e, t) => {
    const datap = [];
    t === "problem" && e.map((m) => datap.push(m.value));
    switch (t) {
      case "problem":
        setDataInp((prev) => ({ ...prev, problem: datap }));
        break;
      case "crew":
        setDataInp((prev) => ({ ...prev, crew: e.value }));
        break;
      case "pdd":
        setDataInp((prev) => ({ ...prev, pdd: e.value }));
        break;
      default:
        setDataInp((prev) => ({ ...prev, details: e.target.value }));
    }
  };
  return (
    <React.Fragment>
      {urgent && <Notification message="caution: this cable is urgent, please don't ignore it" urg={true} />}
      <div className={c["form-container"]}>
        <form className={c.form} onSubmit={handleSubmit}>
          <div className={c["form-group"]}>
            <label htmlFor="reference">reference</label>
            <input
              required
              name="reference"
              id="reference"
              type="text"
              value={p.refs}
              disabled
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="crew">crew</label>
            <Select
              options={selectCreator(dataSelect.crews)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              defaultValue={" "}
              onChange={(e) => onchangeHandler(e, "crew")}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="problem">Problem</label>
            <Select
              options={selectCreator(dataSelect.problems)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              defaultValue={" "}
              isMulti
              onChange={(e) => onchangeHandler(e, "problem")}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="textarea">Details</label>
            <textarea
              required
              cols="25"
              rows="5"
              id="textarea"
              name="textarea96"
              onChange={onchangeHandler}
            ></textarea>
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="pdd">pdd</label>
            <Select
              options={selectCreator(dataSelect.postes)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              defaultValue={" "}
              menuPlacement="top"
              onChange={(e) => onchangeHandler(e, "pdd")}
            />
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default FormAddDetails;
