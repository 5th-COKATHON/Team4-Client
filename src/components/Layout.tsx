import { Outlet } from "react-router-dom";
import Home from "@/assets/svg/home.svg?react";
<<<<<<< HEAD
import Sns from "@/assets/svg/sns.svg?react";
import Who from "@/assets/svg/who.svg?react";
=======
import Sns from "@/assets/svg/location.svg?react";
import Who from "@/assets/svg/mypage.svg?react";
>>>>>>> master
import { ROUTE_PATH } from "@/router";
// import { Toaster } from "sonner";
import Navbar from "./Navbar";

/**
 * Content + Navbar(선택) 로 이루어진 기본 layout
 * @returns
 */
const Layout = () => {
  const GNB = useGNB();

  return (
    <div className="flex h-dvh w-full flex-col">
      {/* <Toaster
        position="top-center"
        toastOptions={{
          className:
            "flex w-fit justify-center rounded-full border-none bg-primary-normal px-600 py-300 font-Binggrae text-body-2 text-white",
        }}
      /> */}
      <Outlet />
      <Navbar NavList={GNB} />
    </div>
  );
};

export default Layout;

/**
 * 각 Navbar 요소들에 대한 제어
 * @returns
 */
const useGNB = () => {
  return [
    {
      icon: <Home />,
      label: "홈",
      path: ROUTE_PATH.HOME,
    },
    {
      icon: <Sns />,
      label: "위치",
      path: ROUTE_PATH.LOCATION,
    },
    {
      icon: <Who />,
      label: "마이페이지",
      path: ROUTE_PATH.MYPAGE,
    },
  ];
};
