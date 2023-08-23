import React from "react";

function DisabledInput({ placeholder, value }) {
  return (
    <input
      style={{ borderRadius: "5px", width: "100%" }}
      className="block px-4 py-2 mb-2 font-semibold leading-tight text-gray-700 bg-white border border-gray-200 appearance-none rounded-xl focus:outline-none focus:bg-white f01 "
      value={value}
      placeholder={placeholder}
      disabled
      readOnly
    />
  );
}

export default DisabledInput;
