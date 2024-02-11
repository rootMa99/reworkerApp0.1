import c from "./FormAddDetails.module.css"
import Select from "react-select";
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
    margin:"auto",
    "&:hover": {
      border: "1px solid orangered",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "100%",
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
    maxHeight: "350px",
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
const optionData = [
  {
    value: "Fil avec manque terminal",
    label: "Fil avec manque terminal",
  },
  {
    value: "Fil avec manque Seal",
    label: "Fil avec manque Seal",
  },
  {
    value: "Fil avec terminal sans patille",
    label: "Fil avec terminal sans patille",
  },
  {
    value: "Fil avec sertissage NOK",
    label: "Fil avec sertissage NOK",
  },
  {
    value: "Fil avec seal qui s'échappe des griffes",
    label: "Fil avec seal qui s'échappe des griffes",
  },
  {
    value: "Fil endommagé",
    label: "Fil endommagé",
  },
  {
    value: "Fil coupé",
    label: "Fil coupé",
  },
  {
    value: "Epissure NOK après '1' réparation",
    label: "Epissure NOK après '1' réparation",
  },
  {
    value: "Ring NOK après '1' réparation",
    label: "Ring NOK après '1' réparation",
  },
  {
    value: "Composant déformé/cassé",
    label: "Composant déformé/cassé",
  },
  {
    value: "bruler",
    label: "bruler",
  }
];

// const dataPost=["US1","US2","US3","US4","US5","US6","US7","US8","US9","US10","CEL 1","CEL 2","CEL 3","CEL 4","CEL 5","CEL 7","CEL 8","CEL 9","CEL 10","CEL 11","CEL 12","CEL 1-A","CEL 13","CEL 14","CEL 15","CEL 15-1","CEL 16","CEL 17","CEL 18","CEL 19","CEL 20","CEL 21","CEL 22","CEL 23","CEL 24","CEL 26","CEL 27","ROB SUB","POST 1","POST 2"]


const FormAddDetails = (p) => {
    const handleSubmit = (event) => {
      event.preventDefault();
      
    };
  
    return (
      <div className={c["form-container"]}>
        <form className={c.form} onSubmit={handleSubmit}>
          <div className={c["form-group"]}>
            <label htmlFor="reference">reference</label>
            <input required name="reference" id="reference" type="text" value={p.refs} disabled/>
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="crew">crew</label>
            <input required name="crew" id="crew" type="text" />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="problem">Problem</label>
            <Select
            options={optionData}
            id="multiSelect"
            inputId="shiftleader1"
            // onChange={changeHandler}
            styles={customStyles}
            defaultValue={" "}
            isMulti
            // onChange={problemChange}
          />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="textarea">Details</label>
            <textarea required cols="25" rows="5" id="textarea" name="textarea"></textarea>
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="pdd">pdd</label>
            <input required name="pdd" id="pdd" type="text" />
          </div>
          <button type="submit" className={c["form-submit-btn"]}>Submit</button>
        </form>
      </div>
    );
  };
  
  export default FormAddDetails;