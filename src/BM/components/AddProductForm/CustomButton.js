import React from "react";

const CustomButton = ({ Title, Onclick, BgColor, type }) => {
  return type === 1 ? (
    <button
      type="submit"
      onClick={Onclick}
      style={{ background: "#1677ff" }}
      className="p-2 rounded-lg text-white hover:bg-[#1677ff] font-bold w-40 hovernav"
    >
      {Title}
    </button>
  ) : (
    <button
      type="submit"
      style={{ background: "#1677ff" }}
      className="p-2 rounded-lg text-white hover:bg-[#1677ff] font-bold w-40 hovernav"
    >
      {Title}
    </button>
  );
};

export default CustomButton;
