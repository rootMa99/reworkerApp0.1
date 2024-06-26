import React, { useState } from "react";
import c from "./FormAddDetails.module.css";
import FormDetailsData from "./FormDetailsData";
import { useDispatch, useSelector } from "react-redux";
import { loginSActions } from "../../store/loginSlice";
import api from "../../services/api";
import Select from "react-select";
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
const cmAction = [
  {
    value: "Applied",
    label: "Applied",
  },
  {
    value: "Not Applied",
    label: "Not Applied",
  },
];
const aAction = [
  {
    value: "Validated",
    label: "Validated",
  },
  {
    value: "Not Validated",
    label: "Not Validated",
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

const PopupCmAdSl = (p) => {
  const { isLoged, dataSelect } = useSelector((s) => s.loginr);
  const [dataCm, setDatacm] = useState({
    ref: p.data.reference,
    crew: p.data.crew,
    problem: p.data.problem,
    detail: p.data.details,
    pdd: p.data.pDD,
    cs: p.data.cableStatus,
    ppd: p.data.pPD,
    idpd: p.data.idPD,
    cma: p.data.teamleaderAction,
    audia: p.data.auditorAction,
    cp: p.data.cP,
    sl: p.data.shiftleaderAction,
  });

  const dispatch = useDispatch();
  console.log(p.data);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(dataCm);
    if (isLoged.role === "Teamleader") {
      try {
        const body = {
          pPD: dataCm.ppd,
          idPD: dataCm.idpd,
          teamleaderAction: dataCm.cma,
        };
        const response = await fetch(`${api}/teamleader/update/${p.data._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
        dispatch(loginSActions.addTL({ ...dataCm, id: p.data._id }));
        p.click();
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (isLoged.role === "Auditor") {
      try {
        const body = {
          cP: dataCm.cp,
          auditorAction: dataCm.audia,
        };
        const response = await fetch(`${api}/auditor/update/${p.data._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
        dispatch(loginSActions.addaudit({ ...dataCm, id: p.data._id }));
        p.click();
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (isLoged.role === "Shiftleader") {
      try {
        const body = {
          shiftleaderAction: dataCm.sl,
        };
        const response = await fetch(
          `${api}/shiftleader/update/${p.data._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${isLoged.token}`,
            },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        console.log(data);
        dispatch(loginSActions.addsl({ sl: dataCm.sl, id: p.data._id }));
        p.click();
      } catch (error) {
        console.error("Error:", error);
      }
    }
    if (isLoged.role === "Coordinator") {
      try {
        const body = {
          reference: dataCm.ref,
          crew: dataCm.crew,
          problem: dataCm.problem,
          details: dataCm.detail,
          pDD: dataCm.pdd,
          cableStatus: dataCm.cs,
          pPD: dataCm.ppd,
          idPD: dataCm.idpd,
          teamleaderAction: dataCm.cma,
          cP: dataCm.cp,
          auditorAction: dataCm.audia,
          shiftleaderAction: dataCm.sl,
        };
        const response = await fetch(
          `${api}/coordinator/update/${p.data._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${isLoged.token}`,
            },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        console.log(data);
        dispatch(loginSActions.addRoot({ data: dataCm, id: p.data._id }));
        p.click();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const deleteRec = async () => {
    try {
      const response = await fetch(`${api}/coordinator/delete/${p.data._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });
      const datares = response.data;
      dispatch(loginSActions.deleteRow(p.data._id));
      console.log(datares);
      p.click();
    } catch (error) {
      //alert(error.response.data.msg);
      console.log(error);
    }
  };

  const onchangeHandler = (e, t) => {
    switch (t) {
      case "crew":
        setDatacm((prev) => ({ ...prev, crew: e.value }));
        break;
      case "problem":
        const datap = [];
        t === "problem" && e.map((m) => datap.push(m.value));
        setDatacm((prev) => ({ ...prev, problem: datap }));
        break;
      case "detail":
        setDatacm((prev) => ({ ...prev, detail: e.target.value }));
        break;
      case "pdd":
        setDatacm((prev) => ({ ...prev, pdd: e.value }));
        break;
      case "ppd":
        setDatacm((prev) => ({ ...prev, ppd: e.value }));
        break;
      case "idpd":
        if (/^\d*$/.test(e.target.value)) {
          setDatacm((prev) => ({ ...prev, idpd: e.target.value }));
        }
        break;
      case "cma":
        setDatacm((prev) => ({ ...prev, cma: e.value }));
        break;
      case "audia":
        setDatacm((prev) => ({ ...prev, audia: e.value }));
        break;
      case "cp":
        setDatacm((prev) => ({ ...prev, cp: e.target.value }));
        break;
      case "sld":
        setDatacm((prev) => ({ ...prev, sl: e.target.value }));
        break;
      case "status":
        setDatacm((prev) => ({ ...prev, cs: e.value }));
        break;
      default:
    }
  };
  const classStyleForm =
    isLoged.role === "Coordinator" ? { width: "60rem" } : {};
  return (
    <div className={c["form-container"]} style={classStyleForm}>
      <form className={c.form} onSubmit={submitHandler}>
        {isLoged.role === "Teamleader" && (
          <React.Fragment>
            <h3 className={c.notif}>
              you can set on change ppd, idpd and conste-maitre actions
            </h3>
            <FormDetailsData data={p.data} />

            <div className={c["form-group"]}>
              <label htmlFor="crew">ppd</label>
              <Select
                options={selectCreator(dataSelect.postes)}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                defaultValue={{
                  value: dataCm.ppd,
                  label: dataCm.ppd,
                }}
                onChange={(e) => onchangeHandler(e, "ppd")}
              />
            </div>
            <div className={c["form-group"]}>
              <label htmlFor="idpd">idpd</label>
              <input
                required
                name="idpd"
                id="idpd"
                type="text"
                pattern="[0-9]*"
                onChange={(e) => onchangeHandler(e, "idpd")}
                value={dataCm.idpd}
              />
            </div>
            <div className={c["form-group"]}>
              <label htmlFor="cma">contre-maitre actions</label>
              <Select
                options={cmAction}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                defaultValue={{
                  value: dataCm.cma,
                  label: dataCm.cma,
                }}
                onChange={(e) => onchangeHandler(e, "cma")}
              />
            </div>
          </React.Fragment>
        )}
        {isLoged.role === "Auditor" && (
          <React.Fragment>
            <h3 className={c.notif}>
              you can set or change cp and Auditor actions
            </h3>
            <FormDetailsData data={p.data} />
            <div className={c["form-group"]}>
              <label htmlFor="cp">problem cause</label>
              <input
                required
                name="cp"
                id="cp"
                type="text"
                // pattern="[0-9]*"
                onChange={(e) => onchangeHandler(e, "cp")}
                value={dataCm.cp}
              />
            </div>
            <div className={c["form-group"]}>
              <label htmlFor="audia">Auditor actions</label>
              <Select
                options={aAction}
                id="multiSelect"
                inputId="shiftleader1"
                styles={customStyles}
                defaultValue={{
                  value: dataCm.audia,
                  label: dataCm.audia,
                }}
                onChange={(e) => onchangeHandler(e, "audia")}
              />
            </div>
          </React.Fragment>
        )}
        {isLoged.role === "Shiftleader" && (
          <React.Fragment>
            <h3 className={c.notif}>please set action to this scrap cable</h3>
            <FormDetailsData data={p.data} />
            <div className={c["form-group"]}>
              <label htmlFor="textarea">shiftleader action</label>
              <textarea
                required
                cols="25"
                rows="5"
                id="textarea"
                name="textarea96"
                onChange={(e) => onchangeHandler(e, "sld")}
                value={dataCm.sl}
              ></textarea>
            </div>
          </React.Fragment>
        )}
        {(isLoged.role === "Coordinator" || isLoged.role === "Admin") && (
          <React.Fragment>
            <h3 className={c.notif}>you can update this cable</h3>
            <div className={c.editForm}>
              <div className={c.formpd}>
                <div className={c["form-group"]}>
                  <label htmlFor="reference">reference</label>
                  <input
                    required
                    name="reference"
                    id="reference"
                    type="text"
                    value={dataCm.ref}
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
                    defaultValue={{
                      value: dataCm.crew,
                      label: dataCm.crew,
                    }}
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
                    defaultValue={getlabelandvalue(dataCm.problem)}
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
                    onChange={(e) => onchangeHandler(e, "detail")}
                    value={dataCm.detail}
                  ></textarea>
                </div>
                <div className={c["form-group"]}>
                  <label htmlFor="pdd">pdd</label>
                  <Select
                    options={selectCreator(dataSelect.postes)}
                    id="multiSelect"
                    inputId="shiftleader1"
                    styles={customStyles}
                    defaultValue={{
                      value: dataCm.pdd,
                      label: dataCm.pdd,
                    }}
                    menuPlacement="top"
                    onChange={(e) => onchangeHandler(e, "pdd")}
                  />
                </div>
                <div className={c["form-group"]}>
                  <label htmlFor="crew">ppd</label>
                  <Select
                    options={selectCreator(dataSelect.postes)}
                    id="multiSelect"
                    inputId="shiftleader1"
                    styles={customStyles}
                    defaultValue={{
                      value: dataCm.ppd,
                      label: dataCm.ppd,
                    }}
                    onChange={(e) => onchangeHandler(e, "ppd")}
                  />
                </div>
              </div>
              <div className={c.formpd}>
                <div className={c["form-group"]}>
                  <label htmlFor="problem">cable status</label>
                  <Select
                    options={statusC}
                    id="multiSelect"
                    inputId="shiftleader1"
                    styles={customStyles}
                    defaultValue={{
                      value: dataCm.cs,
                      label: dataCm.cs,
                    }}
                    onChange={(e) => onchangeHandler(e, "status")}
                  />
                </div>
                <div className={c["form-group"]}>
                  <label htmlFor="idpd">idpd</label>
                  <input
                    required
                    name="idpd"
                    id="idpd"
                    type="text"
                    pattern="[0-9]*"
                    onChange={(e) => onchangeHandler(e, "idpd")}
                    value={dataCm.idpd}
                  />
                </div>
                <div className={c["form-group"]}>
                  <label htmlFor="cma">contre-maitre action</label>
                  <Select
                    options={cmAction}
                    id="multiSelect"
                    inputId="shiftleader1"
                    styles={customStyles}
                    defaultValue={{
                      value: dataCm.cma,
                      label: dataCm.cma,
                    }}
                    onChange={(e) => onchangeHandler(e, "cma")}
                  />
                </div>
                <div className={c["form-group"]}>
                  <label htmlFor="cp">cause de problem</label>
                  <input
                    name="cp"
                    id="cp"
                    type="text"
                    // pattern="[0-9]*"
                    onChange={(e) => onchangeHandler(e, "cp")}
                    value={dataCm.cp}
                  />
                </div>
                <div className={c["form-group"]}>
                  <label htmlFor="audia">Auditor actions</label>
                  <input
                    name="audia"
                    id="audia"
                    type="text"
                    onChange={(e) => onchangeHandler(e, "audia")}
                    value={dataCm.audia}
                  />
                </div>
                <div className={c["form-group"]}>
                  <label htmlFor="textarea">shiftleader action</label>
                  <textarea
                    cols="25"
                    rows="5"
                    id="textarea"
                    name="textarea96"
                    onChange={(e) => onchangeHandler(e, "sld")}
                    value={dataCm.sl}
                  ></textarea>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        {isLoged.role === "Admin" ? (
          <div className={c["form-submit-btn-holder"]}>
            <button type="submit" className={c["form-submit-btnS"]}>
              Update
            </button>
            <button
              type="button"
              className={c["form-submit-btnD"]}
              onClick={deleteRec}
            >
              Delete
            </button>
          </div>
        ) : (
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default PopupCmAdSl;
