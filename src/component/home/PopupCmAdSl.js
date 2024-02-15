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
const PopupCmAdSl = (p) => {
  const { isLoged, dataSelect } = useSelector((s) => s.loginr);
  const [dataCm, setDatacm] = useState({
    ppd: p.data.pPD,
    idpd: p.data.idPD,
    cma: p.data.teamLeaderAction,
    audia: p.data.auditorAction,
    cp: p.data.cP,
    sl: p.data.shiftLeaderAction,
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
          teamLeaderAction: dataCm.cma,
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
    if (isLoged.role === "ShiftLeader") {
      try {
        const body = {
            shiftLeaderAction: dataCm.sl,
        };
        const response = await fetch(`${api}/shiftleader/update/${p.data._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log(data);
        dispatch(loginSActions.addsl({ sl:dataCm.sl, id: p.data._id }));
        p.click();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const onchangeHandler = (e, t) => {
    switch (t) {
      case "ppd":
        setDatacm((prev) => ({ ...prev, ppd: e.value }));
        break;
      case "idpd":
        if (/^\d*$/.test(e.target.value)) {
          setDatacm((prev) => ({ ...prev, idpd: e.target.value }));
        }
        break;
      case "cma":
        setDatacm((prev) => ({ ...prev, cma: e.target.value }));
        break;
      case "audia":
        setDatacm((prev) => ({ ...prev, audia: e.target.value }));
        break;
      case "cp":
        setDatacm((prev) => ({ ...prev, cp: e.target.value }));
        break;
      case "sld":
        setDatacm((prev) => ({ ...prev, sl: e.target.value }));
        break;
      default:
    }
  };

  return (
    <div className={c["form-container"]}>
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
              <label htmlFor="cma">au actions</label>
              <input
                required
                name="cma"
                id="cma"
                type="text"
                onChange={(e) => onchangeHandler(e, "cma")}
                value={dataCm.cma}
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
              <label htmlFor="cp">cp</label>
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
              <input
                required
                name="audia"
                id="audia"
                type="text"
                onChange={(e) => onchangeHandler(e, "audia")}
                value={dataCm.audia}
              />
            </div>
          </React.Fragment>
        )}
        {isLoged.role === "ShiftLeader" && (
          <React.Fragment>
            <h3 className={c.notif}>
              please set action to this scrap cable
            </h3>
            <FormDetailsData data={p.data} />
            <div className={c["form-group"]}>
            <label htmlFor="textarea">Details</label>
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

        <button type="submit" className={c["form-submit-btn"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PopupCmAdSl;
