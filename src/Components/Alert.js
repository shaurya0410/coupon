import React from "react";

export default function Alert(props) {
  const closeAlert = () => {
    props.setAlert({ status: false, message: "", type: "" });
  };
  return (
    <div
      className="alertBox"
      style={{
        "backgroundColor":
          props.alert.type === "success" ? "rgb(56, 142, 60)" :" rgb(211, 47, 47)",
      }}
    >
      <div>{props.alert.message}</div>
      <span className="closeAlert" onClick={closeAlert}>
        x
      </span>
    </div>
  );
}
