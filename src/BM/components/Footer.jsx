import React from "react";

const Footer = () => (
  <div
    style={{
      position: "fixed",
      bottom: "0px",
      height: "75px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <p className="text-center" style={{ color: "#33373E" }}>
      <b>&copy;2022 All rights reserved by .com</b>
    </p>
  </div>
);

export default Footer;
