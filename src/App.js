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


function App() {
  const { isLoged } = useSelector((s) => s.loginr);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="App">
      <NavBar />
      {
        currentPath === "/feedback" && <FeedBackForm />
      }
      {(!isLoged.login && currentPath !== "/feedback") && <Login />}
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
