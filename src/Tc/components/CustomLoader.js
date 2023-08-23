import React from "react";
import "../loader.css";

function CustomLoader() {
  return (
    <div className="CustomCenter" style={{ height: "80vh" }}>
      <div
        className="Myloader"
        style={{ borderTop: "2px solid #1677ff" }}
      ></div>
    </div>
  );
}

export default CustomLoader;
