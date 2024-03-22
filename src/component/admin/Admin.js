import Select from "react-select";
import c from "../home/FormAddDetails.module.css";

const ROLES = [
  {
    value: "Logistics",
    label: "Logistics",
  },
  {
    value: "Reworker",
    label: "Reworker",
  },
  {
    value: "Teamleader",
    label: "Teamleader",
  },
  {
    value: "Auditor",
    label: "Auditor",
  },
  {
    value: "ShiftLeader",
    label: "ShiftLeader",
  },
  {
    value: "Coordinator",
    label: "Coordinator",
  },
];
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
const Admin = (p) => {
  return (
    <div className={c.formCAdmin}>
    <h1 className={c.title}>Create a New Account</h1>
      <form className={c.form}>
        <div className={c["form-group"]}>
          <label htmlFor="userName">userName</label>
          <input required name="userName" id="userName" type="text" placeholder="enter userName"/>
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="password">password</label>
          <input required name="password" id="password" type="text" placeholder="enter password"/>
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="crew">role</label>
          <Select
            options={ROLES}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
          />
        </div>
        <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
      </form>
    </div>
  );
};

export default Admin;
