import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import axios from "axios";
import { Dropdown } from "antd";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { GlobalContext } from "./context/context";
import { baseURL } from "./core";
import Profile from "./pages/Profile";
import Chat from "./pages/Chat";

const App = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.withCredentials = true;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${baseURL}api/v1/profile`, {
          withCredentials: true,
        });
        dispatch({
          type: "USER_LOGIN",
          payload: response.data.data,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "USER_LOGOUT",
        });
      }
    };
    checkLoginStatus();
  }, []);

  const logoutHandle = async () => {
    try {
      const response = await axios.post(
        `${baseURL}api/v1/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "USER_LOGOUT",
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const openMenu = () => {
    setMobile(true);
  };

  return (
    <BrowserRouter>
      {state.isLogin === true ? (
        <>
          <nav className="flex gap-12 items-center justify-between z-30 mb-5 bg-gray-200 p-2 w-full translate-y-0 fixed transition duration-100 ease-in-out">
            <div>
              <Link to="/">
                <p className="font-extrabold text-5xl">Logo</p>
              </Link>
            </div>
            <div
              className={`${
                mobile
                  ? "absolute top-[61px] left-0 w-full bg-gray-200 p-2"
                  : " hidden items-center md:flex"
              }`}
            >
              <ul className="flex gap-2 flex-col items-start md:flex-row">
                <li className="text-xl font-normal">
                  <Link to="/">Home</Link>
                </li>
                <li className="text-xl font-normal">
                  <Link to={`/profile/${state.user._id}`}>Profile</Link>
                </li>
                <li className="text-xl font-normal">
                  <Link to={`/chat`}>Chat</Link>
                </li>
              </ul>
              <Dropdown
                trigger={["click"]}
                dropdownRender={() => (
                  <div className=" p-[6px] flex flex-col gap-2 bg-white rounded-lg shadow-xl cursor-pointer text-base">
                    <span onClick={logoutHandle}>Logout</span>
                  </div>
                )}
              >
                <div className="w-[60px] h-[60px] rounded-full cursor-pointer">
                  <img
                    src="https://images.pexels.com/photos/2389476/pexels-photo-2389476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt=""
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
              </Dropdown>
            </div>
            {mobile ? (
              <VscChromeClose onClick={() => setMobile(false)} />
            ) : (
              <SlMenu className="md:hidden" onClick={openMenu} />
            )}
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            <Route path={`profile/:userId`} element={<Profile />} />
            <Route path="chat" element={<Chat />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}
      {state.isLogin === false ? (
        <Routes>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path={`profile/:userId`} element={<Profile />} />
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      ) : null}

      {state.isLogin === null ? (
        <div>
          <h1>Loading</h1>
        </div>
      ) : null}
    </BrowserRouter>
  );
};

export default App;
