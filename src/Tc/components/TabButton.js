import React from "react";

function TabButton({ Title, number, onclick, Isactive, type }) {
  const active =
    "bg-[#1677ff] text-white rounded-lg px-2 flex justify-between items-center";
  const inactive =
    "bg-white text-[#1677ff] rounded-lg px-2 flex justify-between items-center hover:bg-[#1677ff] hover:text-white";

  const NavTabs =
    "bg-[#1677ff] text-white rounded-lg px-2 py-2 flex justify-center items-center";
  const NavTabsInactive =
    "bg-white text-[#1677ff] rounded-lg px-2 py-2 flex justify-center items-center hover:bg-[#1677ff] hover:text-white";

  return type ? (
    <button
      onClick={onclick}
      className={Isactive === true ? NavTabs : NavTabsInactive}
      style={{ fontSize: "10px", height: "39px" }}
    >
      <span> {Title}</span>
      {number ? (
        <span className="bg-white text-[#1677ff] p-2 px-2 rounded-lg ">
          {number}
        </span>
      ) : null}
    </button>
  ) : (
    <button
      onClick={onclick}
      className={Isactive === true ? active : inactive}
      style={{ fontSize: "10px", height: "39px" }}
    >
      <span> {Title}</span>
      {number ? (
        <span className="bg-white text-[#1677ff] h-6 w-6 rounded-lg flex justify-center items-center">
          {number}
        </span>
      ) : null}
    </button>
  );
}

export default TabButton;
