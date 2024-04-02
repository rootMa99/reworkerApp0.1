import React, { useState } from "react";
import c from "./FormAddDetails.module.css";
import api from "../../services/api";

const FeedBackForm = (p) => {
  const [data, setData] = useState({ c: "", v: "", cr: "", w: "", p: "" });
  const [returnedData, setReturnedData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${api}/metadata/feedback?Wire=${data.w}&Color=${data.cr}&Connecteur=${data.c}&Voie=${data.v}&Poste=${data.p}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const datar = await response.json();
      setReturnedData(datar);
      console.log(datar);
      setData({ c: "", v: "", cr: "", w: "", p: "" });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <React.Fragment>
      <div className={c["form-container"]} style={{ top: "25vh" }}>
        <form
          className={c.form}
          onSubmit={handleSubmit}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className={c["form-group"]}>
            <label htmlFor="Connecteur">Connecteur</label>
            <input
              name="Connecteur"
              id="Connecteur"
              type="text"
              onChange={(e) => setData((p) => ({ ...p, c: e.target.value }))}
              value={data.c}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="voie">voie</label>
            <input
              name="voie"
              id="voie"
              type="text"
              onChange={(e) => setData((p) => ({ ...p, v: +e.target.value }))}
              value={data.v}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="color">color</label>
            <input
              name="color"
              id="color"
              type="text"
              onChange={(e) => setData((p) => ({ ...p, cr: e.target.value }))}
              value={data.cr}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="wire">wire</label>
            <input
              name="wire"
              id="wire"
              type="text"
              onChange={(e) => setData((p) => ({ ...p, w: e.target.value }))}
              value={data.w}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="poste">poste</label>
            <input
              name="poste"
              id="poste"
              type="text"
              onChange={(e) => setData((p) => ({ ...p, p: e.target.value }))}
              value={data.p}
            />
          </div>
          <button type="submit" className={c["form-submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
      <div
        className={c.historyContainer}
        style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "53rem",
          backgroundColor: "#212121",
        }}
      >
        <h3 className={c.historyH2}>result</h3>
        <ul
          className={`${c.historyList} ${c.res}`}
          style={{ width: "100%", margin: 0 }}
        >
          <li style={{ color: "#f84018", padding: 0 }}>
            <span style={{ width: "10%" }}>wire</span>
            <span style={{ width: "20%" }}>color</span>
            <span style={{ width: "20%" }}>connecteur</span>
            <span style={{ width: "20%" }}>voie</span>
            <span style={{ width: "30%" }}>Poste/Cellule</span>
          </li>
        </ul>
        <ul className={`${c.historyList} ${c.res}`} style={{ width: "100%" }}>
          {returnedData.length > 0 &&
            returnedData.map((f, i) => (
              <li key={i}>
                <span style={{ width: "10%" }}>{f.Wire}</span>
                <span style={{ width: "20%" }}>{f.Color}</span>
                <span style={{ width: "20%" }}>{f.Connecteur}</span>
                <span style={{ width: "20%" }}>{f.Voie}</span>
                <span style={{ width: "30%" }}>{f["Poste/Cellule"]}</span>
              </li>
            ))}
          {returnedData.length === 0 && (
            <h3 className={c.historyH2}>no data found</h3>
          )}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default FeedBackForm;
