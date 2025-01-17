<<<<<<< HEAD
import React from "react";

const Home = () => {
  return (
    <div className="flex h-full flex-grow flex-col justify-between overflow-scroll">
      home
    </div>
=======
import { ROUTE_PATH } from "@/router";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL의 쿼리 문자열에서 access_token과 refresh_token을 획득
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const accessToken = params.get("access");
    const refreshToken = params.get("refresh");
    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      navigate(ROUTE_PATH.HOME, { replace: true });
    } else {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate(ROUTE_PATH.EMAIL);
        return;
      }
    }
  }, []);

  return (
    <div className="flex h-full flex-grow flex-col justify-between">home</div>
>>>>>>> master
  );
};

export default Home;
