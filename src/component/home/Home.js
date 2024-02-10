import { useState } from "react";
import c from "./Home.module.css";
import BackDrop from "../ui/BackDrop";
import PopupFormRef from "./PopupFormRef";
const Home = (p) => {
  const [popUp, setPopUp] = useState(false);

  const clickHandler = (e) => {
    setPopUp(!popUp);
  };

  return (
    <div className={c.holder}>
      {popUp && <BackDrop  click={clickHandler}/>}
      {popUp && <PopupFormRef />}

      <button className={c.button} onClick={clickHandler}>
        add reference
      </button>

      <table className={`${c.table}`}>
        <thead>
          <tr style={{ backgroundColor: "black" }}>
            <th>Matricule</th>
            <th>reference</th>
            <th>pdd</th>
            <th>pcd</th>
            <th>crew</th>
            <th>reworkid</th>
            <th>team Leader</th>
            <th>shift Leader</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Matricule</td>
            <td>reference</td>
            <td>pdd</td>
            <td>pcd</td>
            <td>crew</td>
            <td>reworkid</td>
            <td>team Leader</td>
            <td>shift Leader</td>
            <td>status</td>
          </tr>
          <tr>
            <td>Matricule</td>
            <td>reference</td>
            <td>pdd</td>
            <td>pcd</td>
            <td>crew</td>
            <td>reworkid</td>
            <td>team Leader</td>
            <td>shift Leader</td>
            <td>status</td>
          </tr>
          <tr>
            <td>Matricule</td>
            <td>reference</td>
            <td>pdd</td>
            <td>pcd</td>
            <td>crew</td>
            <td>reworkid</td>
            <td>team Leader</td>
            <td>shift Leader</td>
            <td>status</td>
          </tr>
          <tr>
            <td>Matricule</td>
            <td>reference</td>
            <td>pdd</td>
            <td>pcd</td>
            <td>crew</td>
            <td>reworkid</td>
            <td>team Leader</td>
            <td>shift Leader</td>
            <td>status</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Home;
