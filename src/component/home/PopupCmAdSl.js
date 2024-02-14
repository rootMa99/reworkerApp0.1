import React, { useState } from "react";
import c from "./FormAddDetails.module.css";
import FormDetailsData from "./FormDetailsData";
import { useDispatch, useSelector } from "react-redux";
import { loginSActions } from "../../store/loginSlice";

const PopupCmAdSl = (p) => {
  const { isLoged } = useSelector((s) => s.loginr);
  const [dataCm, setDatacm] = useState({
    ppd: "",
    idpd: "",
    cma: "",
  });
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(dataCm);
    dispatch(loginSActions.addTL({ ...dataCm, id: p.data._id }));
  };
  const onchangeHandler = (e, t) => {
    console.log(e.target.value);
    switch (t) {
      case "ppd":
        setDatacm((prev) => ({ ...prev, ppd: e.target.value }));
        break;
      case "idpd":
        setDatacm((prev) => ({ ...prev, idpd: e.target.value }));
        break;
      case "cma":
        setDatacm((prev) => ({ ...prev, cma: e.target.value }));
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
              <label htmlFor="ppd">ppd</label>
              <input
                required
                name="ppd"
                id="ppd"
                type="text"
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
                onChange={(e) => onchangeHandler(e, "idpd")}
              />
            </div>
            <div className={c["form-group"]}>
              <label htmlFor="cma">conste-maitre actions</label>
              <input
                required
                name="cma"
                id="cma"
                type="text"
                onChange={(e) => onchangeHandler(e, "cma")}
              />
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
