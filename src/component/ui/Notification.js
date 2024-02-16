import React from "react";
import c from "./Notification.module.css";
import api from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { loginSActions } from "../../store/loginSlice";
const Notification = (p) => {
  const {isLoged} = useSelector(
    (s) => s.loginr
  );
  const dispatch=useDispatch();
  const classe = !p.urg
    ? `${c["notifications-container"]}`
    : `${c["notifications-containerurg"]}`;
  const classealt = !p.urg ? `${c["alert"]}` : `${c["alerturg"]}`;
  const classealtP = !p.urg
    ? `${c["alert-prompt-wrap"]}`
    : `${c["alert-prompt-wrap-urg"]}`;

  const clickHandler=async (e, t)=>{
    if (t==="cancel"){
      p.close();
    }
    if (t==="continue"){
      try {
        const response = await fetch(`${api}/logistics/delete/${p.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        });

        const data = await response.json();
        dispatch(loginSActions.deleteRef(p.id));
        console.log(data)
      } catch (error) {
        console.error("Error:", error);
      }
      p.close();
    }
  }


  return (
    <React.Fragment>
      {p.del ? (
        <div className={`${c.notify} ${c.anim}`}>
          <p>do you want to delete this ref <span>{p.refid}</span> ?</p>
          <div className={c.btnHolder}>
            <button onClick={e=>clickHandler(e, "cancel")}>
              <span>cancel</span>
            </button>
            <button onClick={e=>clickHandler(e, "continue")}>
              <span>continue anyway</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={classe}>
          <div className={classealt}>
            <div className={c["flex"]}>
              <div
                className={c["flex-shrink-0"]}
                style={p.urg ? { color: "rgb(238 245 134)" } : {}}
              >
                <svg
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className={c["h-5 w-5 alert-svg"]}
                >
                  <path
                    clipRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
              <div className={classealtP}>
                <p className={`${c["text-sm"]} ${c["text-yellow-700"]}`}>
                  {p.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Notification;
