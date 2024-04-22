import React, { useState } from "react";
import c from "./FormAddDetails.module.css";
import api from "../../services/api";

const FeedBackForm = (p) => {
  const [data, setData] = useState({ c: "", v: "", cr: "", w: "", p: "" });
  const [returnedData, setReturnedData] = useState([]);
  const [isArrival, setIsArrival] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${api}/metadata/feedback?Wire=${data.w}&Color=${data.cr}&Connecteur=${data.c}&Voie=${data.v}&Poste=${data.p}&isArrival=${isArrival}`,
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
      <div
        className={c["form-container"]}
        style={{ top: "25vh", width: "90%" }}
      >
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
              style={{ textTransform: "none" }}
            />
          </div>
          <div className={c["form-group"]}>
            <label htmlFor="voie">voie</label>
            <input
              name="voie"
              id="voie"
              type="text"
              onChange={(e) => setData((p) => ({ ...p, v: e.target.value }))}
              value={data.v}
              style={{ textTransform: "none" }}
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
              style={{ textTransform: "none" }}
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
              style={{ textTransform: "none" }}
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
              style={{ textTransform: "none" }}
            />
          </div>
          <div className={c.checkBox}>
            <input
              type="checkbox"
              id="horns"
              name="horns"
              onChange={(e) => {
                setIsArrival(e.target.checked);
              }}
            />
            <label htmlFor="horns">
              Arrival zone {" "}
              <span>
              Search by arrival zone only.
              </span>
            </label>
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
          width: "90%",
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
            <span style={{ width: "10%" }}>color</span>
            <span style={{ width: "10%" }}>connecteur</span>
            <span style={{ width: "10%" }}>voie</span>
            <span style={{ width: "10%" }}>connecteur-B</span>
            <span style={{ width: "10%" }}>voie-B</span>
            <span style={{ width: "10%" }}>Poste/Cellule</span>
          </li>
        </ul>
        <ul className={`${c.historyList} ${c.res}`} style={{ width: "100%" }}>
          {returnedData.length > 0 &&
            returnedData.map((f, i) => (
              <li key={i}>
                <span style={{ width: "10%" }}>{f.Wire}</span>
                <span style={{ width: "10%" }}>{f.Color}</span>
                <span style={{ width: "10%" }}>{f.Connecteur}</span>
                <span style={{ width: "10%" }}>{f.Voie}</span>
                <span style={{ width: "10%" }}>{f.Connecteur_B}</span>
                <span style={{ width: "10%" }}>{f.Voie_B}</span>
                <span style={{ width: "10%" }}>{f["Poste/Cellule"]}</span>
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
