import React from "react";

const TextArea = ({ placeholder, onChange, value, defaultValue }) => {
  return (
    <div>
      <textarea
        className="w-full appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none font-bold focus:bg-white focus:border-black placeholder:font-bold"
        name=""
        placeholder={placeholder}
        cols="35"
        rows="5"
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      ></textarea>
    </div>
  );
};

export default TextArea;
