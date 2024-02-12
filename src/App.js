import { Suspense, useCallback, useEffect } from "react";
import "./App.css";
import NavBar from "./component/ui/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import { useDispatch, useSelector } from "react-redux";
import Login from "./component/ui/Login";
import api from "./services/api";
import { loginSActions } from "./store/loginSlice";


function App() {
  const { isLoged } = useSelector((s) => s.loginr);
  const dispatch=useDispatch();

  const callback=useCallback(async ()=>{
    try {
      const response = await fetch(`${api}/additionaldata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(
        loginSActions.addDataSelect(data)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }, [dispatch])

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
