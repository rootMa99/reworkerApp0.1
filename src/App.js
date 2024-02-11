import { Suspense, useCallback, useEffect } from "react";
import "./App.css";
import NavBar from "./component/ui/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import { useSelector } from "react-redux";
import Login from "./component/ui/Login";
import api from "./services/api";


function App() {
  const { isLoged } = useSelector((s) => s.loginr);

  const callback=useCallback(async ()=>{
    try {
      const response = await fetch(`${api}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      // dispatch(
      //   loginSActions.login({
      //     role: data.user.role,
      //     id: data.user.id,
      //     username: data.user.username,
      //     token: data.token,
      //   })
      // );
    } catch (error) {
      console.error("Error:", error);
    }
  }, [])

useEffect(()=>{
  callback();
}, [callback])

  return (
    <div className="App">
      <NavBar />
      {!isLoged.login && <Login />}
      {isLoged.login && (
        
        <Suspense>
          <Routes>
            <Route index path="/" element={<Navigate replace to="/home" />} />
            <Route exact path="/home" element={<Home />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
