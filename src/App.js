import { Suspense } from "react";
import "./App.css";
import NavBar from "./component/ui/NavBar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./component/home/Home";
import { useSelector } from "react-redux";
import Login from "./component/ui/Login";
function App() {
  const { isLoged } = useSelector((s) => s.loginr);

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
