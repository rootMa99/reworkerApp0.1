import c from "./FormAddDetails.module.css"
import Select from "react-select";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
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
    border: "2px solid #8b1f04",
    backgroundColor: "rgba(24, 13, 13, 0.37)",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #f84018",
      backgroundColor: "rgba(100, 98, 98, 0.37)",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "100%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#8b1f04",
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
      width: "9px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8a0101",
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
  },
  {
    value: "autres",
    label: "autres",
  },
];

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
            <input required name="problem" id="problem" type="text" />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="textarea">Details?</label>
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