import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom';
import api from "../../services/api";
import { loginSActions } from "../../store/loginSlice";
import c from "./Login.module.css";
import Notification from "./Notification";

const Login = () => {
  const [loginCred, setLogingCred] = useState({
    name: "",
    pwd: "",
  });
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();

  const ClickHandler = async (e) => {
    e.preventDefault();

    if (loginCred.name.trim() !== "" && loginCred.pwd.trim() !== "") {
      const body = { username: loginCred.name, password: loginCred.pwd };

      try {
        const response = await fetch(`${api}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log(data);
        dispatch(
          loginSActions.login({
            role: data.user.role,
            id: data.user.id,
            username: data.user.username,
            token: data.accessToken,
          })
        );
      } catch (error) {
        console.error("Error:", error);
        setErr(true);
      }
    }
    
  };

  const nameChangeHadler = (e) => {
    setLogingCred((p) => ({ ...p, name: e.target.value }));
  };

  const pwdChangeHadler = (e) => {
    setLogingCred((p) => ({ ...p, pwd: e.target.value }));
  };

  if (err) {
    setTimeout(() => {
      setErr(false);
    }, 10000);
  }

  return (
    <React.Fragment>
      <form className={c["Form-container"]} onSubmit={ClickHandler}>
        <h2 className={c["login-title"]}> Login </h2>

        <div>
          <div id="error" className={c["error-message"]}></div>
        </div>
        <div className={c["user-container"]}>
          <input
            type="text"
            name="matricule"
            placeholder="User Name"
            className={c["username"]}
            value={loginCred.name}
            onChange={nameChangeHadler}
          />
        </div>

        <div className={c["password-container"]}>
          <input
            type="password"
            name="password"
            placeholder="User Password"
            className={c["userpassword"]}
            value={loginCred.pwd}
            onChange={pwdChangeHadler}
          />
        </div>

        <button className={c["Login"]}>Submit</button>
      </form>
      {
        err && <Notification message="The username or password you entered is incorrect. Please try again." />
      }
    </React.Fragment>
  );
};

export default Login;
