import React from "react";

const Label = ({ label, Required }) => {
  return (
    <p className="f03">
      {label} {Required ? <span className="f01 text-red-500">*</span> : ""}
    </p>
  );
};

export default Label;
