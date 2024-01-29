import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const inputRef = useRef(null);
  const [err, setErr] = useState("hidden");
  const baseURL = "http://localhost:3000/";
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const firstName = inputRef.current[0].value;
    const lastName = inputRef.current[1].value;
    const email = inputRef.current[2].value;
    const password = inputRef.current[3].value;
    const repeatPassword = inputRef.current[4].value;
    if (repeatPassword !== password) {
      setErr("");
      return;
    } else {
      setErr("hidden");
    }
    try {
      const response = await axios.post(`${baseURL}api/v1/signup`, {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response);
    } catch (error) {}
  };
  return (
    <div className="bg-blue-200 min-h-screen flex justify-center items-center">
      <div className=" bg-white px-8 pt-10 pb-6 w-[360px]">
        <p className=" text-center font-semibold text-4xl mb-6 text-blue-600">
          Register
        </p>
        <div>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
            ref={inputRef}
          >
            <input
              type="text"
              placeholder="Firstname"
              className="p-2 border-2 "
            />
            <input
              type="text"
              placeholder="lastname"
              className="p-2 border-2 "
            />
            <input type="email" placeholder="Email" className="p-2 border-2 " />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border-2 "
            />
            <input
              type="password"
              placeholder="Repeat Password"
              className={`p-2 border-2`}
            />
            <span className={`text-xs text-red-500 ${err}`}>
              Passwords must be same!
            </span>
            {/* <label
              htmlFor="file"
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src={addAvatar} alt="addavatar" className="w-10" />
              <span className=" text-blue-800">Add Your Image</span>
            </label>
            <input type="file" name="" id="file" className="hidden" /> */}
            <button
              type="submit"
              className=" bg-blue-400 text-white p-2 text-lg hover:rounded-md transition-all mt-5"
            >
              Signup
            </button>
          </form>
        </div>
        <div className=" text-center my-4 text-blue-900">
          Already Have Account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
