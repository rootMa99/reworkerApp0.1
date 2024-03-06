import { useDispatch, useSelector } from "react-redux";
import c from "./FormAddDetails.module.css";
import Select from "react-select";
import { selectCreator } from "../hooks/benifFunc";
import React, { useState } from "react";
import Notification from "../ui/Notification";
import api from "../../services/api";
import { loginSActions } from "../../store/loginSlice";
import FormDetailsData from "./FormDetailsData";
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

const getlabelandvalue = (data) => {
  const retData = [];
  data.map((m) =>
    retData.push({
      value: m,
      label: m,
    })
  );
  return retData;
};
const FormAddDetails = (p) => {
  const { dataSelect, urgent, isLoged } = useSelector((s) => s.loginr);
  console.log(urgent.data, urgent.data === null);
  const [newAR, setNewAR]=useState(false);
  const [dataInp, setDataInp] = useState({
    reference: p.refs,
    crew: "",
    problem:
      urgent.data === null
        ? []
        : urgent.data.problem === null 
        ? []
        : urgent.data.problem,
    details:
      urgent.data === null
        ? ""
        : urgent.data.details !== null 
        ? urgent.data.details
        : "",
    pdd: "",
  });
  const [statusc, setStatusC] = useState(
    urgent.data === null
      ? ""
      : urgent.data.cableStatus === null 
      ? ""
      : urgent.data.cableStatus
  );
  const dispatch = useDispatch();

  console.log(urgent);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(dataInp);
    let body;
    if (urgent.data === null || newAR) {
      body = {
        reference: dataInp.reference,
        pDD: dataInp.pdd,
        crew: dataInp.crew,
        details: dataInp.details,
        problem: dataInp.problem,
      };
    } else {
      body = {
        reference: urgent.data.reference,
        cableStatus: statusc,
        problem: dataInp.problem,
        details: dataInp.details,
      };
    }
    console.log(body);
    try {
      const response = await fetch(`${api}/reworker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log(data, p.page);
      if (urgent.data === null || newAR) {
        dispatch(loginSActions.unshiftData({ data: data, page: p.page }));
        if (urgent.urgent) {
          dispatch(loginSActions.unshiftDataUrgent(data));
        }
      } else {
        if(statusc==="Sertissage"){
          dispatch(loginSActions.unshiftDataSertissage(data));
        }
        if (urgent.urgent) {
          dispatch(loginSActions.unshiftDataUrgent(data));
        }
        dispatch(
          loginSActions.editStatus({
            cableStatus: statusc,
            id: urgent.data._id,
            data: urgent.data,
            urgent: urgent.urgent,
            details: dataInp.details,
            problem: dataInp.problem,
          })
        );
      }
      p.click();
    } catch (error) {
      console.error("Error:", error);
    }
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
      case "status":
        setStatusC(e.value);
        break;
      default:
        setDataInp((prev) => ({ ...prev, details: e.target.value }));
    }
  };
  return (
    <React.Fragment>
      {urgent.urgent && (
        <Notification
          message="caution: this cable is urgent, please don't ignore it"
          urg={true}
        />
      )}
      <div className={c["form-container"]}>
        <form className={c.form} onSubmit={handleSubmit}>
          {urgent.data === null || newAR ? (
            <React.Fragment>
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
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h3 className={c.notif}>
                This cable has already been stored. Please update its status.
              </h3>
              <FormDetailsData data={urgent.data} />
              <div className={c["form-group"]}>
                <label htmlFor="problem">Problem</label>
                <Select
                  options={selectCreator(dataSelect.problems)}
                  id="multiSelect"
                  inputId="shiftleader1"
                  styles={customStyles}
                  defaultValue={getlabelandvalue(urgent.data.problem)}
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
                  defaultValue={urgent.data.details}
                ></textarea>
              </div>
              <div className={c["form-group"]}>
                <label htmlFor="problem">cable status</label>
                <Select
                  options={statusC}
                  id="multiSelect"
                  inputId="shiftleader1"
                  styles={customStyles}
                  defaultValue={{
                    value: urgent.data.cableStatus,
                    label: urgent.data.cableStatus,
                  }}
                  onChange={(e) => onchangeHandler(e, "status")}
                />
              </div>
            </React.Fragment>
          )}
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
          <h4 className={c.newAutoRefus} onClick={()=>setNewAR(true)}>this cable has been already stored, do you want to open a new autorefus?</h4>
        </form>
      </div>
    </React.Fragment>
  );
};

export default FormAddDetails;
