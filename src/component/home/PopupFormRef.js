import React, { useEffect, useRef, useState } from "react";
import c from "./PopupFormRef.module.css";
import FormAddDetails from "./FormAddDetails";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { loginSActions } from "../../store/loginSlice";

const PopupFormRef = (p) => {
  const inputRef = useRef(null);
  const [refd, setRefd] = useState("");
  const [init, setInit] = useState(false);
  const dispatch = useDispatch();
  const { isLoged } = useSelector((s) => s.loginr);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (refd.length > 9) {
      alert("reference invalid, please try again");
      return;
    }
    try {
      const response = await fetch(`${api}/data/${refd}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      dispatch(
        loginSActions.setUrgent({ urgent: data.isUrgent, data: data.data })
      );
    } catch (error) {
      console.error("Error:", error);
    }

    setInit(true);
    console.log(refd);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setRefd(value.trim().length === 8 ? value : value.slice(1));
  };

  return (
    <React.Fragment>
      {!init ? (
        <form className={c["Message"]} onSubmit={submitHandler}>
          <input
            title="reference"
            ref={inputRef}
            tabIndex="1"
            placeholder="reference.."
            className={c["MsgInput"]}
            type="text"
            onChange={handleInputChange}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.0"
            width="30.000000pt"
            height="30.000000pt"
            viewBox="0 0 30.000000 30.000000"
            preserveAspectRatio="xMidYMid meet"
            className={c["SendSVG"]}
            onClick={submitHandler}
          >
            <g
              transform="translate(0.000000,30.000000) scale(0.100000,-0.100000)"
              fill="#ffffff70"
              stroke="none"
            >
              <path d="M44 256 c-3 -8 -4 -29 -2 -48 3 -31 5 -33 56 -42 28 -5 52 -13 52 -16 0 -3 -24 -11 -52 -16 -52 -9 -53 -9 -56 -48 -2 -21 1 -43 6 -48 10 -10 232 97 232 112 0 7 -211 120 -224 120 -4 0 -9 -6 -12 -14z"></path>
            </g>
          </svg>
          <span className={c.l}></span>
        </form>
      ) : (
        <FormAddDetails refs={refd} click={p.click} page={p.page} />
      )}
    </React.Fragment>
  );
};

export default PopupFormRef;
