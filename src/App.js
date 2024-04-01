import { Suspense } from "react";
import "./App.css";
import NavBar from "./component/ui/NavBar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./component/home/Home";
import { useSelector } from "react-redux";
import Login from "./component/ui/Login";
import Admin from "./component/admin/Admin";
import Dashboard from "./component/admin/Dashboard";
import FeedBackForm from "./component/home/FeedBackForm";
// import api from "./services/api";
// import { loginSActions } from "./store/loginSlice";

function App() {
  const { isLoged } = useSelector((s) => s.loginr);
  const location = useLocation();
  const currentPath = location.pathname;
  //   const dispatch=useDispatch();

  //   const callback=useCallback(async ()=>{
  //     try {
  //       const response = await fetch(`${api}/metadata`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${isLoged.token}`,
  //         },
  //       });

  //       const data = await response.json();
  //       console.log(data);
  //       dispatch(
  //         loginSActions.addDataSelect(data)
  //       );
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }, [dispatch, isLoged.token])

  // useEffect(()=>{
  //   callback();
  // }, [callback])

  return (
    <div className="App">
      <NavBar />
      {
        currentPath === "/fb" && <FeedBackForm />
      }
      {!isLoged.login && <Login />}
      {isLoged.login && (
        <Suspense>
          <Routes>
            <Route index path="/" element={<Navigate replace to="/home" />} />
            <Route exact path="/home" element={<Home />} />
            {isLoged.role === "Admin" && (
              <Route exact path="/config" element={<Admin />} />
            )}
            {isLoged.role !== "Reworker" && (
              <Route exact path="/dashboard" element={<Dashboard />} />
            )}
            <Route index path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </Suspense>
      )}
    </div>
  );
}

export default App;
