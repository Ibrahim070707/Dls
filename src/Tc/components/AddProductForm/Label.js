import React from "react";

const Label = ({ label, Required }) => {
  return (
    <p className="f02">
      {label} {Required ? <span className="text-lg text-red-500">*</span> : ""}
    </p>
  );
};

export default Label;
