import React, { useCallback, useEffect, useState } from "react";
import c from "./Home.module.css";
import BackDrop from "../ui/BackDrop";
import PopupFormRef from "./PopupFormRef";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { loginSActions } from "../../store/loginSlice";
import PopupCmAdSl from "./PopupCmAdSl";
import trash from "../../assets/trash.png";
import UploadExcelData from "./UploadExcelData";
import Notification from "../ui/Notification";

const stylec = (status) => {
  return status === "Repaired"
    ? {
        color: "#006B63",
        fontWeight: "700",
        borderBottom: "9px solid #006B63",
      }
    : status === "in-Progress"
    ? {
        color: "#D9F28B",
        fontWeight: "700",
        borderBottom: "9px solid #D9F28B",
      }
    : status === "Scrap"
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
};

const Home = (p) => {
  const [popUp, setPopUp] = useState(false);
  const [popUpEdite, setPopUpEdite] = useState({ states: false, data: {} });
  const [page, setPage] = useState({ page: 1, totalPage: 0 });
  const [pagescrap, setPagescrap] = useState({ page: 1, totalPage: 0 });
  const { urgent, isLoged, data, urgentData, scrap, logistics, sertissage } =
    useSelector((s) => s.loginr);
  const [notify, setNotify] = useState({ logic: false, id: 0, ref: "" });

  const dispatch = useDispatch();

  console.log(urgent);
  const clickHandler = (e) => {
    isLoged.role === "Reworker" && setPopUp(!popUp);
    isLoged.role !== "Reworker" &&
      setPopUpEdite((prev) => ({ ...prev, states: !prev.states }));
  };

  useEffect(() => {
    const keyDownHandler = (e) => {
      if (isLoged.role === "Reworker") {
        clickHandler();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoged.role]);

  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/metadata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(loginSActions.addDataSelect(data));
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(`${api}/data?page=${page.page}&limit=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setPage((prev) => ({
        ...prev,
        totalPage: data.totalPages,
      }));
      dispatch(loginSActions.addData({ data: data.data, status: true }));
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(`${api}/data?isUrgentData=${true}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(loginSActions.addUrgentData(data.data));
    } catch (error) {
      console.error("Error:", error);
    }
    try {
      const response = await fetch(`${api}/data?cableStatus=Sertissage`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log("sertissage", data);
      dispatch(loginSActions.addSertissageData(data.data));
    } catch (error) {
      console.error("Error:", error);
    }

    if (isLoged.role === "Shiftleader") {
      try {
        const response = await fetch(
          `${api}/data?cableStatus=Scrap&page=${pagescrap.page}&limit=5`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${isLoged.token}`,
            },
          }
        );

        const data = await response.json();
        setPagescrap((prev) => ({
          ...prev,
          totalPage: data.totalPages,
        }));
        dispatch(loginSActions.addScrap(data.data));
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (isLoged.role === "Logistics") {
      try {
        const response = await fetch(`${api}/logistics`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        });

        const data = await response.json();
        dispatch(loginSActions.addLogisticsData(data));
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [dispatch, page.page, isLoged.token, isLoged.role, pagescrap.page]);

  useEffect(() => {
    callback();
  }, [callback]);

  const onclickHandler = (e, t, scrap) => {
    if (scrap === "scrap") {
      if (t === "plus" && pagescrap.page < pagescrap.totalPage) {
        setPagescrap((prev) => ({
          ...prev,
          page: pagescrap.page + 1,
        }));
      }

      if (t === "min" && pagescrap.page > 1) {
        setPagescrap((prev) => ({
          ...prev,
          page: pagescrap.page - 1,
        }));
      }
    } else {
      if (t === "plus" && page.page < page.totalPage) {
        setPage((prev) => ({
          ...prev,
          page: page.page + 1,
        }));
      }

      if (t === "min" && page.page > 1) {
        setPage((prev) => ({
          ...prev,
          page: page.page - 1,
        }));
      }
    }
  };
  const trClicked = (e, dt) => {
    isLoged.role !== "Reworker" && setPopUpEdite({ states: true, data: dt });
    console.log(dt);
  };

  const deleteHandlerRef = (e, id, ref) => {
    setNotify({ logic: true, id: id, ref: ref });
  };
  const deleteHandlerRefclose = () => {
    setNotify({ logic: false, id: 0, ref: "" });
  };

  return (
    <React.Fragment>
      {notify.logic && (
        <Notification
          del={true}
          id={notify.id}
          refid={notify.ref}
          close={deleteHandlerRefclose}
        />
      )}
      {isLoged.role !== "Logistics" && (
        <div className={c.holder}>
          {(popUp || popUpEdite.states) && <BackDrop click={clickHandler} />}
          {popUp && <PopupFormRef click={clickHandler} page={page.page} />}
          {popUpEdite.states && (
            <PopupCmAdSl data={popUpEdite.data} click={clickHandler} />
          )}

          {isLoged.role === "Reworker" && (
            <React.Fragment>
              <button className={c.button} onClick={clickHandler}>
                scan reference
              </button>
            </React.Fragment>
          )}
          <h2 className={c.titleCab}>urgent cables</h2>
          <table
            className={`${c.table} ${c.tableur}`}
            style={{ marginBottom: "2rem" }}
          >
            <thead>
              <tr style={{ backgroundColor: "black" }}>
                <th width="auto">date/time</th>
                <th width="auto">Ref</th>
                <th>Equipe</th>
                <th width="30%">Problem</th>
                <th width="15%">Details</th>
                <th>pdd*</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {urgentData.length > 0 &&
                urgentData.map((m) => (
                  <tr key={m._id}>
                    <td>
                      {m.createdAt.split("T")[0]}
                      <br />
                      <span className={c.timed}>
                        {m.createdAt.split("T")[1].split(":")[0]}:
                        {m.createdAt.split("T")[1].split(":")[1]}
                      </span>
                    </td>
                    <td>{m.reference}</td>
                    <td>{m.crew}</td>
                    <td style={{ padding: "8px 0" }}>
                      <ul className={c.underl}>
                        {m.problem.map((m, i) => (
                          <li key={i} className={c.listu}>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{m.details}</td>
                    <td>{m.pDD}</td>
                    <td style={stylec(m.cableStatus)}>{m.cableStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <h2 className={c.titleCabS}>Sertissage cables</h2>
          <table
            className={`${c.table} ${c.tableurSER}`}
            style={{ marginBottom: "2rem" }}
          >
            <thead>
              <tr style={{ backgroundColor: "black" }}>
                <th width="auto">date/time</th>
                <th width="auto">Ref</th>
                <th>Equipe</th>
                <th width="30%">Problem</th>
                <th width="15%">Details</th>
                <th>pdd*</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sertissage.length > 0 &&
                sertissage.map((m) => (
                  <tr key={m._id}>
                    <td>
                      {m.createdAt.split("T")[0]}
                      <br />
                      <span className={c.timed}>
                        {m.createdAt.split("T")[1].split(":")[0]}:
                        {m.createdAt.split("T")[1].split(":")[1]}
                      </span>
                    </td>
                    <td>{m.reference}</td>
                    <td>{m.crew}</td>
                    <td style={{ padding: "8px 0" }}>
                      <ul className={c.underl}>
                        {m.problem.map((m, i) => (
                          <li key={i} className={c.listu}>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{m.details}</td>
                    <td>{m.pDD}</td>
                    <td style={stylec(m.cableStatus)}>{m.cableStatus}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoged.role === "Shiftleader" && (
            <React.Fragment>
              <h2 className={c.titleCabsl}>scrap cables</h2>
              <table
                className={`${c.table} ${c.tableurscrap}`}
                // style={{ marginBottom: "2rem" }}
              >
                <thead>
                  <tr style={{ backgroundColor: "black" }}>
                    <th width="auto">date/time</th>
                    <th width="auto">Ref</th>
                    <th>Equipe</th>
                    <th width="15%">Problem</th>
                    <th width="15%">Details</th>
                    <th>pdd*</th>
                    <th>Status</th>
                    <th width="25%">Sl. Action</th>
                  </tr>
                </thead>
                <tbody>
                  {scrap.length > 0 &&
                    scrap.map((m) => (
                      <tr
                        key={m._id}
                        className={isLoged.role !== "Reworker" ? c.hostin : ""}
                        onClick={(e) => trClicked(e, m)}
                      >
                        <td>
                          {m.createdAt.split("T")[0]}
                          <br />
                          <span className={c.timed}>
                            {m.createdAt.split("T")[1].split(":")[0]}:
                            {m.createdAt.split("T")[1].split(":")[1]}
                          </span>
                        </td>
                        <td>{m.reference}</td>
                        <td>{m.crew}</td>
                        <td style={{ padding: "8px 0" }}>
                          <ul className={c.underl}>
                            {m.problem.map((m, i) => (
                              <li key={i} className={c.listu}>
                                {m}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>{m.details}</td>
                        <td>{m.pDD}</td>
                        <td style={stylec(m.cableStatus)}>{m.cableStatus}</td>
                        <td>{m.shiftleaderAction}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </React.Fragment>
          )}

          {isLoged.role === "Shiftleader" && (
            <div className={c.pagination}>
              <span
                className={c.paginationd}
                onClick={(e) => onclickHandler(e, "min", "scrap")}
              >
                &laquo;
              </span>
              <span>
                {pagescrap.page}/{pagescrap.totalPage}
              </span>
              <span
                className={c.paginationd}
                onClick={(e) => onclickHandler(e, "plus", "scrap")}
              >
                &raquo;
              </span>
            </div>
          )}

          <h2 className={c.titleCab2}>all cables</h2>
          <table className={`${c.table}`}>
            <thead>
              <tr style={{ backgroundColor: "black" }}>
                <th width="auto">date/time</th>
                <th width="auto">Ref</th>
                <th>Equipe</th>
                <th width="15%">Problem</th>
                <th width="15%">Details</th>
                <th>pdd*</th>
                <th>Status</th>
                <th>PPD*</th>
                <th>IdPD*</th>
                <th>CM. Action</th>
                <th>CP*</th>
                <th>audi. Action</th>
                <th>Sl. Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((m) => (
                  <tr
                    key={m._id}
                    className={isLoged.role !== "Reworker" ? c.hostin : ""}
                    onClick={(e) => trClicked(e, m)}
                  >
                    <td>
                      {m.createdAt.split("T")[0]}
                      <br />
                      <span className={c.timed}>
                        {m.createdAt.split("T")[1].split(":")[0]}:
                        {m.createdAt.split("T")[1].split(":")[1]}
                      </span>
                    </td>
                    <td>{m.reference}</td>
                    <td>{m.crew}</td>
                    <td style={{ padding: "8px 0" }}>
                      <ul className={c.underl}>
                        {m.problem.map((m, i) => (
                          <li key={i} className={c.listu}>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{m.details}</td>
                    <td>{m.pDD}</td>
                    <td style={stylec(m.cableStatus)}>{m.cableStatus}</td>
                    <td>{m.pPD}</td>
                    <td>{m.idPD}</td>
                    <td>{m.teamleaderAction}</td>
                    <td>{m.cP}</td>
                    <td>{m.auditorAction}</td>
                    <td>{m.shiftleaderAction}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className={c.pagination}>
            <span
              className={c.paginationd}
              onClick={(e) => onclickHandler(e, "min")}
            >
              &laquo;
            </span>
            <span>
              {page.page}/{page.totalPage}
            </span>
            <span
              className={c.paginationd}
              onClick={(e) => onclickHandler(e, "plus")}
            >
              &raquo;
            </span>
          </div>
          <div className={c.ter}>
            <ul className={c.underList}>
              <li className={c.list}>
                PDD*: <span>poste détecte défaut </span>
              </li>
              <li className={c.list}>
                PPD*: <span>poste produit défaut</span>
              </li>
              <li className={c.list}>
                IDPD*: <span>ID produit défaut</span>
              </li>
              <li className={c.list}>
                CP*: <span>cause de problem</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      {isLoged.role === "Logistics" && (
        <div className={c.holder}>
          <div className={c.holderlog}>
            <div className={c.holderref}>
              <h2>list urgent</h2>
              <ul>
                {logistics.length > 0 &&
                  logistics.map((m) => (
                    <li key={m._id}>
                      <div>ref:</div>
                      <span className={c.ref}>{m.ref}</span>
                      <div className={c.datet}>
                        <div>created At:</div>
                        <div>
                          <span>{m.createdAt.split("T")[0]}</span>
                          <br />
                          <span className={c.timed}>
                            {m.createdAt.split("T")[1].split(":")[0]}:
                            {m.createdAt.split("T")[1].split(":")[1]}
                          </span>
                        </div>
                      </div>
                      <img
                        src={trash}
                        alt="trash"
                        onClick={(e) => deleteHandlerRef(e, m._id, m.ref)}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className={c.holderupload}>
              <h2>upload list urgent</h2>
              <UploadExcelData />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Home;
