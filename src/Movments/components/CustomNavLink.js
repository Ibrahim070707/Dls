import React from "react";
import { FaRegCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../BM/sidebar.css";

function CustomNavLink(props) {
  const Data = props.data;
  const TabIndex = localStorage.getItem("ActiveTabIndex");
  const SubTabIndex = localStorage.getItem("SubActiveTabIndex");
  console.log("TabIndex", TabIndex);
  const ActiveSingleClass = "BranchSideNavIcons dropdown-btna my-3 activenav";
  const InActiveSingleClass = "BranchSideNavIcons dropdown-btna my-3";

  const ActiveDropClass = "BranchSideNavIcons dropdown-btn activenav";
  const InActiveDropClass = "BranchSideNavIcons dropdown-btn";
  return (
    <div
      style={{
        width: "97%",
        maxHeight: "600px",
        overflowY: "scroll",
      }}
    >
      {Data.map((el, index) => {
        return el.IsDropDown === 1 ? (
          <div
            key={index}
            className="sidebar my-3"
            style={{ boxShadow: "0", transition: "0.5s", fontSize: "12px" }}
          >
            <button
              className={
                TabIndex == index + 1 ? ActiveDropClass : InActiveDropClass
              }
              id={el.id}
              style={{
                borderRadius: "5px",
                fontSize: "10px",
                padding: "6px 20px",
              }}
            >
              <span
                className="text-center text-sm items-center gap-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                  fontSize: "10px",
                }}
              >
                {el.icon}
                {el.Tile}
              </span>
            </button>

            <div className="dropdown-container">
              <ul className="mt-1">
                {el.Links.map((ael, i) => {
                  return (
                    <Link to={ael.To} key={i}>
                      <li
                        id={ael.id}
                        key={index}
                        style={{ borderRadius: "5px", fontSize: "10px" }}
                        className="h-6 my-1 hover:bg-[#f1f1f1] hover:text-black centeredSideNav"
                      >
                        <FaRegCircle className="mx-2" />
                        {ael.Title}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="sidebar my-3 "
            style={{
              boxShadow: "0",
              transition: "0.5s",
            }}
          >
            <Link to={el.To}>
              <button
                id={el.id}
                style={{
                  borderRadius: "5px",
                  fontSize: "10px",
                  padding: "6px 20px",
                }}
                className={
                  TabIndex == index + 1
                    ? ActiveSingleClass
                    : InActiveSingleClass
                }
              >
                <span
                  className="text-center items-center gap-2 "
                  style={{
                    display: " grid",
                    gridTemplateColumns: "auto auto auto",
                    fontSize: "10px",
                  }}
                >
                  {el.icon}
                  {el.Tile}
                </span>
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default CustomNavLink;
