import { useState } from "react";
import c from "./Home.module.css";
import BackDrop from "../ui/BackDrop";
import PopupFormRef from "./PopupFormRef";
import { useSelector } from "react-redux";
const Home = (p) => {
  const [popUp, setPopUp] = useState(false);
  const { urgent } = useSelector((s) => s.loginr);

  console.log(urgent)
  const clickHandler = (e) => {
    setPopUp(!popUp);
  };

  return (
    <div className={c.holder}>
      {popUp && <BackDrop click={clickHandler} />}
      {popUp && <PopupFormRef />}

      <button className={c.button} onClick={clickHandler}>
        add reference
      </button>

      <table className={`${c.table}`}>
        <thead>
          <tr style={{ backgroundColor: "black" }}>
            <th>date/time</th>
            <th>Ref</th>
            <th>Equipe</th>
            <th>Problem</th>
            <th>Details</th>
            <th>pdd*</th>
            <th>Status</th>
            <th>PPD*</th>
            <th>IdPD*</th>
            <th>CM. Action</th>
            <th>CP*</th>
            <th>Aud. Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>date/time</td>
            <td>Ref</td>
            <td>Equipe</td>
            <td>Problem</td>
            <td>Details</td>
            <td>pdd*</td>
            <td>Status</td>
            <td>PPD*</td>
            <td>IdPD*</td>
            <td>Foreman Action</td>
            <td>CP*</td>
            <td>Audit Action</td>
          </tr>
        </tbody>
      </table>
      <div className={c.ter}>
        <ul className={c.underList}>
          <li className={c.list}>
            pdd*: <span>poste detecteur</span>
          </li>
          <li className={c.list}>
            PPD*: <span>poste detecteur</span>
          </li>
          <li className={c.list}>
            IDPD*: <span>poste detecteur</span>
          </li>
          <li className={c.list}>
            CP*: <span>poste detecteur</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
