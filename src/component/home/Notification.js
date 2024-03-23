import c from "./Notification.module.css";

const Notification = (p) => {
  const mssg = p.mssg === undefined
  ? "We're having trouble connecting to the server. Please check your internet connection and try again, (If the problem persists, please contact us)"
  : p.mssg;
  return (
    <div
      className={c.notification}
      style={p.error && (p.success? { backgroundColor: "#006B63" } :{ backgroundColor: "#B70404" })}
    >
      <p>
        {p.error
          ? mssg
          : p.file
          ? "The Excel File has been successfully uploaded."
          : p.mssg}
      </p>
    </div>
  );
};

export default Notification;
