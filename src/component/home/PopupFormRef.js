import React, { useEffect, useRef, useState } from "react";
import c from "./PopupFormRef.module.css";

const PopupFormRef = (p) => {
  const inputRef = useRef(null);
  const [refd, setRefd] = useState("");
  const [init, setInit] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    alert(refd);
    setInit(true);
  };
  // return (
  //   <form>
  //     <label>
  //       Type something:
  //       <input type="text" ref={inputRef} />
  //     </label>
  //   </form>
  // );
  return (
    <React.Fragment>
      {!init&& <form className={c["Message"]} onSubmit={submitHandler}>
        <input
          title="reference"
          ref={inputRef}
          tabIndex="1"
          placeholder="reference.."
          className={c["MsgInput"]}
          type="text"
          onChange={(e) => setRefd(e.target.value)}
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
      </form>}
    </React.Fragment>
  );
};

export default PopupFormRef;
