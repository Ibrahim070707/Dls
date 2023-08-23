import React from "react";

const CustomButton = ({ Title, Onclick, BgColor, type }) => {
  return type === 1 ? (
    <button
      type="submit"
      onClick={Onclick}
      style={{ background: `${BgColor}` }}
      className="p-2 rounded-lg text-white hover:bg-[#67f0a5] font-bold w-40 hovernav"
    >
      {Title}
    </button>
  ) : (
    <button
      type="submit"
      style={{ background: `${BgColor}` }}
      className="p-2 rounded-lg text-white hover:bg-[#67f0a5] font-bold w-40 hovernav"
    >
      {Title}
    </button>
  );
};

export default CustomButton;
