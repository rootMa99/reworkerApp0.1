import React from "react";
import c from "./FormAddDetails.module.css";
import FormDetailsData from "./FormDetailsData";

const PopupCmAdSl = (p) => {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={c["form-container"]}>
      <form className={c.form} onSubmit={submitHandler}>
        <h3 className={c.notif}>
          you can set on change ppd, idpd and conste-maitre actions
        </h3>
        <FormDetailsData data={p.data} />
        <React.Fragment>
          <div className={c["form-group"]}>
            <label htmlFor="ppd">ppd</label>
            <input required name="ppd" id="ppd" type="text" />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="idpd">idpd</label>
            <input required name="idpd" id="idpd" type="text" />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="cma">conste-maitre actions</label>
            <input required name="cma" id="cma" type="text" />
          </div>
        </React.Fragment>

        <button type="submit" className={c["form-submit-btn"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PopupCmAdSl;
