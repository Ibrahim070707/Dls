import React, { useState } from "react";
// import "../Login.css";
import { FaKey, FaLock, FaRegEnvelope } from "react-icons/fa";
import { useStateContext } from "../contexts/ContextProvider";
import { Toaster, toast } from "react-hot-toast";

function Login() {
  const { Base_Url } = useStateContext();
  const [FormData, setFormData] = useState({ type: 3, employee_id: "", password: "" });
  const [ButtonDisabled, setButtonDisabled] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault()
    if (FormData.employee_id) {
      if (FormData.password) {
        setButtonDisabled(true);
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(FormData);

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`${Base_Url}employee/Login`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.Status === 200) {
              setButtonDisabled(false);
              localStorage.setItem("TCIsLoggedIn", "true");
              localStorage.setItem("EmpData", JSON.stringify(result.Data));
              localStorage.setItem("token", result.Token);
              window.location.reload();
            } else if (result.Status === 420) {
              toast.error("Invalid Employee ID");
              setButtonDisabled(false);
            } else if (result.Status === 421) {
              toast.error("Incorrect Password");
              setButtonDisabled(false);
            }
          })
          .catch((error) => console.log("LoginError", error));
      } else {
        toast.error("Password Field Is Required");
      }
    } else {
      toast.error("Employee ID Field Is Required");
    }
  };
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          id: "25663",
          duration: 7000,
        }}
      />
      <form onSubmit={handleLogin}>
        <div className="body ">
          <section className="flex flex-col">
            <h1>TeleCaller Login</h1>
            <div className="inputbox mt-5">
              <input
                type="test"
                required
                onChange={(e) => {
                  setFormData({ ...FormData, ["employee_id"]: e.target.value });
                  setButtonDisabled(false);
                }}
              />
              <label htmlFor="" style={{ display: "flex", alignItems: "center" }}>
                <FaKey
                  style={{ fontSize: "25px" }}
                  className="text-white mr-2"
                />
                Employee ID
              </label>
            </div>
            <div className="inputbox mt-7">
              <input
                type="password"
                required
                onChange={(e) => {
                  setFormData({ ...FormData, ["password"]: e.target.value });
                  setButtonDisabled(false);
                }}
              />
              <label htmlFor="" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <FaLock
                  className="text-white mr-2"
                  style={{ fontSize: "25px" }}
                />
                Password
              </label>
            </div>
            {ButtonDisabled ? (
              <div className="flex my-5 justify-center items-center">
                <div className="lds-ring mt-7 text-white">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <button className="LoginBtn mt-7" type="submit">
                Log in
              </button>
            )}
          </section>
        </div>
      </form>
    </>
  );
}

export default Login;
