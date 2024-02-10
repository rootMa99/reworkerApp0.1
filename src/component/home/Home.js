import { useState } from "react";
import c from "./Home.module.css";
import BackDrop from "../ui/BackDrop";
const Home = (p) => {
  const [popUp, setPopUp] = useState(false);

  const clickHandler = (e) => {
    setPopUp(!popUp);
  };

  return (
    <div className={c.holder}>
      {popUp && <BackDrop />}

      <button className={c.button} onClick={clickHandler}>
        add reference
      </button>

      <table className={`${c.table}`}>
        <thead>
          <tr style={{ backgroundColor: "black" }}>
            <th>Matricule</th>
            <th>first Name</th>
            <th>last name</th>
            <th>category</th>
            <th>crew</th>
            <th>planning Leader</th>
            <th>team Leader</th>
            <th>parada</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Matricule</td>
            <td>first Name</td>
            <td>last name</td>
            <td>category</td>
            <td>crew</td>
            <td>planning Leader</td>
            <td>team Leader</td>
            <td>parada</td>
            <td>status</td>
          </tr>
          <tr>
            <td>Matricule</td>
            <td>first Name</td>
            <td>last name</td>
            <td>category</td>
            <td>crew</td>
            <td>planning Leader</td>
            <td>team Leader</td>
            <td>parada</td>
            <td>status</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
