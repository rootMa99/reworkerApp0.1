import Select from "react-select";
import c from "../home/FormAddDetails.module.css";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import BackDrop from "../ui/BackDrop";
import { selectCreator } from "../hooks/benifFunc";
import Notification from "../home/Notification";
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

const Admin = (p) => {
  const { isLoged } = useSelector((s) => s.loginr);
  const [data, setData] = useState({ data: [], totalItems: 0 });
  const [selectedData, setSelectedData] = useState({});
  const [aut, setAut] = useState(false);
  const [crews, setCrews] = useState([]);
  const [error, setError]= useState({status:false, mssg:"",success:false});
  const [dataCreateuser, setDataCreateuser]=useState({
    crews:[],password:"", role:"", username:""
  });
  if (error.status) {
    setTimeout(() => {
      setError({status:false, mssg:""});
    }, 8000);
  }

  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/metadata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      setCrews(data.crews);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(`${api}/admin/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [isLoged.token]);

  useEffect(() => {
    callback();
  }, [callback]);

  const close = () => {
    setAut(false);
    selectedData({});
  };

  const clickUser = (e, m) => {
    setSelectedData({
      id: m._id,
      username: m.username,
      isActive: m.isActive,
      password: "",
    });
    setAut(true);
  };

  const submmitHandler = async (e) => {
    e.preventDefault();
    const datau=data.data;

    try {
      const response = await fetch(`${api}/admin/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
        body: JSON.stringify(dataCreateuser),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(" " + data.Error);
    }
      
      datau.push(data)
      setData(p=>({...p, data:datau}));
      setDataCreateuser({
        crews:[],password:"", role:"", username:""
      })
      setError({status:true, mssg:"user successfully created", success:true});
      
    } catch (error) {
      setError({status:true, mssg:error, success:false})
      console.log("Error:", error);
    }
  };
  const deleteAcc=e=>{
    console.log(selectedData)
  }
  const onchangeHandler = (e, t) => {
    const datap = [];
    t === "crews" && e.map((m) => datap.push(m.value));
    switch (t) {
      case "crews":
        setDataCreateuser((prev) => ({ ...prev, crews: datap }));
        break;
      case "password":
        setDataCreateuser((prev) => ({ ...prev, password: e.target.value }));
        break;
      case "role":
        setDataCreateuser((prev) => ({ ...prev, role: e.value }));
        break;
      case "username":
        setDataCreateuser((prev) => ({ ...prev, username: e.target.value }));
        break;
      default:
    }
  };

  console.log(data, 968523 , error.mssg)
  return (
    <React.Fragment>
    {error.status && <Notification error={error.status} success={error.success} mssg={error.mssg.toString()} />}
      {aut && (
        <React.Fragment>
          <BackDrop click={close} />
          <div className={`${c.formCAdmin} ${c.updateAcc}`}>
            <h1 className={c.title}>update Account</h1>
            <form className={c.form}>
              <div className={c["form-group"]}>
                <label htmlFor="userName">userName</label>
                <input
                  required
                  name="userName"
                  id="userName"
                  type="text"
                  placeholder="enter userName"
                  value={selectedData.username}
                />
              </div>
              <div className={c["form-group"]}>
                <label htmlFor="password">password</label>
                <input
                  required
                  name="password"
                  id="password"
                  type="text"
                  placeholder="enter password"
                />
              </div>
              <div className={c["form-group"]}>
                <label htmlFor="crew">Status</label>
                <Select
                  options={ROLES}
                  id="multiSelect"
                  inputId="shiftleader1"
                  styles={customStyles}
                  value={{
                    value: selectedData.isActive ? "activate" : "not activate",
                    label: selectedData.isActive ? "activate" : "not activate",
                  }}
                />
              </div>
              <button type="submit" className={c["form-submit-btn"]}>
                update
              </button>
              <span className={c.deletion} onClick={deleteAcc}>delete this Account!</span>
            </form>
          </div>
        </React.Fragment>
      )}
      <div className={c.formCAdmin}>
        <h1 className={c.title}>Create a New Account</h1>
        <form className={c.form} onSubmit={submmitHandler}>
          <div className={c["form-group"]}>
            <label htmlFor="userName">userName</label>
            <input
              required
              name="userName"
              id="userName"
              type="text"
              placeholder="enter userName"
              onChange={(e) => onchangeHandler(e, "username")}
              value={dataCreateuser.username}
              style={{textTransform:"none"}}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="password">password</label>
            <input
              required
              name="password"
              id="password"
              type="text"
              placeholder="enter password"
              onChange={(e) => onchangeHandler(e, "password")}
              value={dataCreateuser.password}
              style={{textTransform:"none"}}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="role">crews</label>
            <Select
              options={selectCreator(crews)}
              id="multiSelect"
              inputId="shiftleader1"
              styles={customStyles}
              onChange={(e) => onchangeHandler(e, "crews")}
              defaultValue={getlabelandvalue(dataCreateuser.crews)}
              value={getlabelandvalue(dataCreateuser.crews)}
              isMulti
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="role">role</label>
            <Select
              options={ROLES}
              id="multiSelect"
              inputId="shiftleader1"
              onChange={(e) => onchangeHandler(e, "role")}
              defaultValue={{
                value: dataCreateuser.role,
                label: dataCreateuser.role,
              }}
              value={{
                value: dataCreateuser.role,
                label: dataCreateuser.role,
              }}
              styles={customStyles}
            />
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
      <div className={c.CAdminUserList}>
        <h3 className={c.titlenb}>
          nb users <span>{data.totalItems}</span>
        </h3>
        {data.data.length > 0 &&
          data.data.map((m) => (
            <div
              key={m._id}
              className={c.listOfUser}
              onClick={(e) => clickUser(e, m)}
            >
              <div className={c.detailsData}>
                <h3 >userName</h3>
                <h2 style={{textTransform:"none"}}>{m.username}</h2>
              </div>
              <div className={c.detailsData}>
                <h3>role</h3>
                <h2>{m.role}</h2>
              </div>
              <div className={c.detailsData}>
                <h3>time created</h3>
                <h2>{m.createdAt.split("T")[0]}</h2>
              </div>
              <div className={c.detailsData}>
                <h3>status</h3>
                <h2>{m.isActive ? "active" : "not active"}</h2>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default Admin;
