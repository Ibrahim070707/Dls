import React, { useEffect, useState } from "react";
import { FaRegCalendar, FaRegClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

function Reminders({ Height, MaxHeight, Data }) {
  // const [RemindersData, setRemindersData] = useState([]);
  // const UserData = JSON.parse(localStorage.getItem("data"));
  // const Token = localStorage.getItem("token");
  const navigate = useNavigate();
  // const { Base_Url } = useStateContext();
  const [RemindersId, setRemindersId] = useState([]);

  // useEffect(() => {
  //   GetRemindersData();
  // }, []);

  // const GetRemindersData = () => {
  //   if (UserData) {
  //     var myHeaders = new Headers();
  //     myHeaders.append("Accept", "application/json");
  //     myHeaders.append("Authorization", `Bearer ${Token}`);

  //     var requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };

  //     fetch(`${Base_Url}GetEmp/Reminder/${UserData.id}`, requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result.Status === 200) {
  //           setRemindersData(result.data);
  //         }
  //       })
  //       .catch((error) => console.log("error", error));
  //   }
  // };
  Data.map((el, index) => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const currentTime = currentDate.getTime();

      // Convert target date and time to a single timestamp for comparison
      const [year, month, day] = el.date.split("-");
      const [hours, minutes] = el.time.split(":");
      const targetTimestamp = new Date(
        year,
        month - 1,
        day,
        hours,
        minutes
      ).getTime();

      if (currentTime >= targetTimestamp) {
        setRemindersId((prevIds) => [...prevIds, el.id]);
      }
    }, 5000);
  });

  return (
    <div
      className="mt-5 bg-white rounded-2xl w-full p-3 mb-5 shadow-md "
      style={{
        width: "100%",
        height: Height,
        maxHeight: MaxHeight,
        overflowY: "scroll",
      }}
    >
      <p className="text-sm text-center">Reminders</p>
      <div>
        {Data.length != 0 ? (
          Data.map((el, index) => {
            return (
              <div className="p-1 my-1" key={index}>
                <div
                  className="bg-slate-200 py-1 px-2 rounded-md flex flex-col"
                  style={{ width: "100%" }}
                >
                  <div>
                    <p className="text-sm font-semibold float-left">
                      {el.status === "1" ? (
                        <p
                          className="text-yellow-500 SMF"
                          style={{
                            color: RemindersId.includes(el.id) ? "red" : null,
                          }}
                        >
                          Connect
                        </p>
                      ) : el.status === "2" ? (
                        <p
                          className="text-green-500 SMF"
                          style={{
                            color: RemindersId.includes(el.id) ? "red" : null,
                          }}
                        >
                          Convience
                        </p>
                      ) : el.status === "4" ? (
                        <p
                          className="text-green-500 SMF"
                          style={{
                            color: RemindersId.includes(el.id) ? "red" : null,
                          }}
                        >
                          Appointment
                        </p>
                      ) : el.status === "5" ? (
                        <p
                          className="text-green-500 SMF"
                          style={{
                            color: RemindersId.includes(el.id) ? "red" : null,
                          }}
                        >
                          Convert
                        </p>
                      ) : (
                        <p
                          className="text-red-500 SMF"
                          style={{
                            color: RemindersId.includes(el.id) ? "red" : null,
                          }}
                        >
                          Lost
                        </p>
                      )}
                    </p>
                    <br />
                    <p className="font-semibold float-left SMF">
                      {el.case_id} - {el.customer_name}
                    </p>
                  </div>
                  <div className="flex justify-between mt-3">
                    <span
                      className="SMF float-left flex justify-center items-center flex-row"
                      style={{
                        color: RemindersId.includes(el.id) ? "red" : null,
                      }}
                    >
                      <FaRegClock />
                      &nbsp; {el.time}
                    </span>
                    <span
                      className="SMF float-left flex justify-center items-center flex-row"
                      style={{
                        color: RemindersId.includes(el.id) ? "red" : null,
                      }}
                    >
                      <FaRegCalendar />
                      &nbsp;{el.date}
                    </span>
                  </div>
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => {
                        navigate(`/ViewCaseDetails/${el.case_id}`);
                        window.location.reload(false);
                      }}
                      className="bg-green-100 text-green-700 px-5 rounded-lg SMF py-1"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-1 my-2">
            <div
              className=" bg-slate-200 p-2 rounded-2xl flex flex-col"
              style={{ width: "100%" }}
            >
              <span className="text-sm flex justify-center items-center">
                No Reminders Available
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reminders;
