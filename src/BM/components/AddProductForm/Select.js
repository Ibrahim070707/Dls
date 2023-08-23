import React from "react";

const Select = ({ onChange, placeholder, selectLabel }) => {
  return (
    <div>
      <select
        id="countries"
        className="bg-gray-200 border text-gray-400 border-gray-200 font-bold text-sm rounded focus:ring-emerald-500 focus:bg-white focus:border-emerald-500 w-full py-3 px-4 mb-3 leading-tight"
        onChange={onChange}
        placeholder={placeholder}
      >
        <option className="text-gray-400 font-bold" disabled defaultValue>
          {selectLabel}
        </option>
        <option value="1" className="text-gray-700 font-bold">
          Yes
        </option>
        <option value="0" className="text-gray-700 font-bold">
          No
        </option>
      </select>
    </div>
  );
};

export default Select;
