import { useCallback, useEffect, useState } from "react";
import c from "./Home.module.css";
import BackDrop from "../ui/BackDrop";
import PopupFormRef from "./PopupFormRef";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { loginSActions } from "../../store/loginSlice";
const Home = (p) => {
  const [popUp, setPopUp] = useState(false);
  const [page, setPage] = useState({ page: 1, totalPage: 0 });
  const { urgent, isLoged, data } = useSelector((s) => s.loginr);
  const dispatch = useDispatch();

  console.log(urgent);
  const clickHandler = (e) => {
    setPopUp(!popUp);
  };

  const callback = useCallback(async () => {
    try {
      const response = await fetch(`${api}/data?page=${page.page}&limit=5`, {
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
  }, [dispatch, page.page, isLoged.token]);

  useEffect(() => {
    callback();
  }, [callback]);

  const onclickHandler = (e, t) => {
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
            <th width="auto">date/time</th>
            <th width="auto">Ref</th>
            <th>Equipe</th>
            <th width="20%">Problem</th>
            <th>Details</th>
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
                <td style={{padding:"8px 0"}}>
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
                <td>{m.cableStatus}</td>
                <td>{m.pPD}</td>
                <td>{m.idPD}</td>
                <td>{m.teamLeaderAction}</td>
                <td>{m.cP}</td>
                <td>{m.auditorAction}</td>
                <td>{m.shiftLeaderAction}</td>
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
  );
};

export default Home;
