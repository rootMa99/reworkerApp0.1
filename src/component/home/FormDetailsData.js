import c from "./FormDetailsData.module.css";

const FormDetailsData = (p) => {
  const style =
    p.data.cableStatus === "Repaired"
      ? {
          color: "#006B63",
          fontWeight: "700",
          borderBottom: "9px solid #006B63",
        }
      : p.data.cableStatus === "in-Progress"
      ? {
          color: "#D9F28B",
          fontWeight: "700",
          borderBottom: "9px solid #D9F28B",
        }
      : p.data.cableStatus === "Scrap"
      ? {
          color: "#CF3335",
          fontWeight: "700",
          borderBottom: "9px solid #CF3335",
        }
      : {
          color: "#929D96",
          fontWeight: "700",
          borderBottom: "9px solid #929D96",
        };

  return (
    <div className={c.descrHolder}>
      <div className={c.wrapDt}>
        <h3>reference: </h3>
        <span>{p.data.reference}</span>
      </div>
      <div className={c.wrapDt}>
        <h3>timestamp: </h3>
        {p.data.createdAt.split("T")[0]}
        {" / "}
        <span className={c.timed}>
          {p.data.createdAt.split("T")[1].split(":")[0]}:
          {p.data.createdAt.split("T")[1].split(":")[1]}
        </span>
      </div>
      <div className={c.wrapDt}>
        <h3>crew: </h3>
        <span>{p.data.crew}</span>
      </div>
      <div className={c.wrapDt}>
        <h3>reworker ID: </h3>
        <span>{p.data.reworkerID}</span>
      </div>
      {p.data.reworkerID_CS !== p.data.reworkerID &&
        p.data.reworkerID_CS !== undefined && (
          <div className={c.wrapDt}>
            <h3>reworker ID_cs: </h3>
            <span>{p.data.reworkerID_CS}</span>
          </div>
        )}
      <div className={c.wrapDt}>
        <h3>problem: </h3>
        <ul>
          {p.data.problem.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
      <div className={c.wrapDt}>
        <h3>details: </h3>
        <span>{p.data.details}</span>
      </div>
      <div className={c.wrapDt}>
        <h3>pdd: </h3>
        <span className={c.timed}>{p.data.pDD}</span>
      </div>
      <div className={c.wrapDt}>
        <h3>cable Status: </h3>
        <span style={style}>{p.data.cableStatus}</span>
      </div>

      {p.data.pPD.trim() !== "" && (
        <div className={c.wrapDt}>
          <h3>PPD: </h3>
          <span>{p.data.pPD}</span>
        </div>
      )}
      {p.data.teamleaderAction.trim() !== "" && (
        <div className={c.wrapDt}>
          <h3>teamleader Action: </h3>
          <span>{p.data.teamleaderAction}</span>
        </div>
      )}
      {p.data.idPD.trim() !== "" && (
        <div className={c.wrapDt}>
          <h3>idPD: </h3>
          <span>{p.data.idPD}</span>
        </div>
      )}
      {p.data.cP.trim() !== "" && (
        <div className={c.wrapDt}>
          <h3>cP: </h3>
          <span>{p.data.cP}</span>
        </div>
      )}
      {p.data.auditorAction.trim() !== "" && (
        <div className={c.wrapDt}>
          <h3>auditor Action: </h3>
          <span>{p.data.auditorAction}</span>
        </div>
      )}
    </div>
  );
};

export default FormDetailsData;
