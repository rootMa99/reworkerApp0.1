import React, { useState } from "react";
import c from "./FormAddDetails.module.css";

const DATAC = [
  {
    Connecteur: "1775AB",
    Voie: 24,
    "Poste/Cellule": "US1",
  },
  {
    Connecteur: "1775AB",
    Voie: 40,
    "Poste/Cellule": "US1",
  },
  {
    Connecteur: "1775AB",
    Voie: 17,
    "Poste/Cellule": "US1",
  },
  {
    Connecteur: "1775AB",
    Voie: 4,
    "Poste/Cellule": "US2",
  },
  {
    Connecteur: "1775AB",
    Voie: 5,
    "Poste/Cellule": "US2",
  },
  {
    Connecteur: "1775AB",
    Voie: 23,
    "Poste/Cellule": "US5",
  },
  {
    Connecteur: "1775AB",
    Voie: 19,
    "Poste/Cellule": "US5",
  },
  {
    Connecteur: "1775AB",
    Voie: 22,
    "Poste/Cellule": "US5",
  },
  {
    Connecteur: "1775AB",
    Voie: 49,
    "Poste/Cellule": "US9",
  },
  {
    Connecteur: "1775AB",
    Voie: 33,
    "Poste/Cellule": "US9",
  },
  {
    Connecteur: "1775AB",
    Voie: 22,
    "Poste/Cellule": "US9",
  },
  {
    Connecteur: "1775AB",
    Voie: 35,
    "Poste/Cellule": "US11",
  },
  {
    Connecteur: "1775AB",
    Voie: 51,
    "Poste/Cellule": "US11",
  },
  {
    Connecteur: "1775AB",
    Voie: 30,
    "Poste/Cellule": "Cellule 1",
  },
  {
    Connecteur: "1775AB",
    Voie: 46,
    "Poste/Cellule": "Cellule 1",
  },
  {
    Connecteur: "1775AB",
    Voie: 14,
    "Poste/Cellule": "Cellule 1",
  },
  {
    Connecteur: "1775AB",
    Voie: 69,
    "Poste/Cellule": "Cellule 1",
  },
  {
    Connecteur: "1775AB",
    Voie: 66,
    "Poste/Cellule": "Cellule 2",
  },
  {
    Connecteur: "1775AB",
    Voie: 63,
    "Poste/Cellule": "Cellule 2",
  },
  {
    Connecteur: "1775AB",
    Voie: 16,
    "Poste/Cellule": "Cellule 3",
  },
  {
    Connecteur: "1775AB",
    Voie: 32,
    "Poste/Cellule": "Cellule 3",
  },
  {
    Connecteur: "1775AB",
    Voie: 39,
    "Poste/Cellule": "Cellule 3",
  },
  {
    Connecteur: "1775AB",
    Voie: 65,
    "Poste/Cellule": "Cellule 3",
  },
  {
    Connecteur: "1775AB",
    Voie: 59,
    "Poste/Cellule": "Cellule 3",
  },
  {
    Connecteur: "1775AB",
    Voie: 55,
    "Poste/Cellule": "Cellule 4",
  },
  {
    Connecteur: "1775AB",
    Voie: 34,
    "Poste/Cellule": "Cellule 4",
  },
  {
    Connecteur: "1775AB",
    Voie: 2,
    "Poste/Cellule": "Cellule 4",
  },
  {
    Connecteur: "1775AB",
    Voie: 7,
    "Poste/Cellule": "Cellule 4",
  },
  {
    Connecteur: "1775AB",
    Voie: 60,
    "Poste/Cellule": "Cellule 4",
  },
  {
    Connecteur: "1775AB",
    Voie: 61,
    "Poste/Cellule": "Cellule 4",
  },
  {
    Connecteur: "1775AB",
    Voie: 17,
    "Poste/Cellule": "Cellule 4",
  },
  {
    Connecteur: "1775AB",
    Voie: 57,
    "Poste/Cellule": "Cellule 5",
  },
  {
    Connecteur: "1775AB",
    Voie: 54,
    "Poste/Cellule": "Cellule 5",
  },
  {
    Connecteur: "1775AB",
    Voie: 24,
    "Poste/Cellule": "Cellule 6",
  },
  {
    Connecteur: "1775AB",
    Voie: 40,
    "Poste/Cellule": "Cellule 6",
  },
  {
    Connecteur: "1775AB",
    Voie: 4,
    "Poste/Cellule": "Cellule 8",
  },
  {
    Connecteur: "1775AB",
    Voie: 5,
    "Poste/Cellule": "Cellule 8",
  },
  {
    Connecteur: "1775AB",
    Voie: 29,
    "Poste/Cellule": "Cellule 17",
  },
  {
    Connecteur: "1775AB",
    Voie: 13,
    "Poste/Cellule": "Cellule 17",
  },
  {
    Connecteur: "1775AB",
    Voie: 45,
    "Poste/Cellule": "Cellule 17",
  },
  {
    Connecteur: "1775AB",
    Voie: 44,
    "Poste/Cellule": "Cellule 17",
  },
  {
    Connecteur: "1775AB",
    Voie: 28,
    "Poste/Cellule": "Cellule 17",
  },
  {
    Connecteur: "1775AB",
    Voie: 12,
    "Poste/Cellule": "Cellule 17",
  },
  {
    Connecteur: "1775AB",
    Voie: 50,
    "Poste/Cellule": "Cellule 17",
  },
  {
    Connecteur: "1775AB",
    Voie: 57,
    "Poste/Cellule": "Cellule 24",
  },
  {
    Connecteur: "1775AB",
    Voie: 8,
    "Poste/Cellule": "Cellule 27",
  },
  {
    Connecteur: "1775AB",
    Voie: 67,
    "Poste/Cellule": "Cellule 27",
  },
  {
    Connecteur: "1775AB",
    Voie: 26,
    "Poste/Cellule": "Cellule 31",
  },
  {
    Connecteur: "1775AB",
    Voie: 42,
    "Poste/Cellule": "Cellule 31",
  },
  {
    Connecteur: "1775AB",
    Voie: 10,
    "Poste/Cellule": "Cellule 31",
  },
  {
    Connecteur: "1775AB",
    Voie: 64,
    "Poste/Cellule": "Cellule 31",
  },
  {
    Connecteur: "1775AB",
    Voie: 48,
    "Poste/Cellule": "Cellule 31",
  },
];

const FeedBackForm = (p) => {
  const [data, setData] = useState({ c: "", v: "" });
  const [history, setHistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const r = DATAC.filter(
      (f) => f.Connecteur === data.c && f.Voie === +data.v
    );
    console.log(r);
    if (r.length > 0) {
      alert(r[0]["Poste/Cellule"]);
      if (
        history.findIndex(
          (f) => f.Connecteur === data.c && f.Voie === +data.v
        ) === -1
      ) {
        setHistory((p) => [...p, r[0]]);
      }
    } else {
      alert("no Poste/Cellule found");
    }
  };
  console.log(history, data);
  return (
    <React.Fragment>
      <div className={c["form-container"]}>
        <form className={c.form} onSubmit={handleSubmit}>
          <div className={c["form-group"]}>
            <label htmlFor="reference">Connecteur</label>
            <input
              required
              name="reference"
              id="reference"
              type="text"
              onChange={(e) => setData((p) => ({ ...p, c: e.target.value }))}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="reference">voie</label>
            <input
              required
              name="reference"
              id="references"
              type="text"
              onChange={(e) => setData((p) => ({ ...p, v: +e.target.value }))}
            />
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
      <div className={c.historyContainer}>
        <h3 className={c.historyH2}>history</h3>
        <ul className={c.historyList}>
          <li style={{ color: "#f84018" }}>
            <span style={{ width: "40%" }}>connecteur</span>
            <span style={{ width: "20%" }}>voie</span>
            <span style={{ width: "30%" }}>Poste/Cellule</span>
          </li>
          {history.length > 0 &&
            history.map((f, i) => (
              <li key={i}>
                <span style={{ width: "40%" }}>{f.Connecteur}</span>
                <span style={{ width: "20%" }}>{f.Voie}</span>
                <span style={{ width: "30%" }}>{f["Poste/Cellule"]}</span>
              </li>
            ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default FeedBackForm;
