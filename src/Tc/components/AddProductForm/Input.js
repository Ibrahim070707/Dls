import React from "react";

const Input = ({
  placeholder,
  onChange,
  value,
  defaultValue,
  type,
  Required,
}) => {
  return (
    <div>
      <input
        style={{ borderRadius: "5px", width: "100%" }}
        className="appearance-none block bg-white text-gray-700 border border-gray-200 rounded-xl py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-black f01"
        type={type ? type : "text"}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultValue}
        required={Required}
      />
    </div>
  );
};

export default Input;
