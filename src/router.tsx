import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFoundError from "./pages/error/NotFoundError";
import Error from "./pages/error/Error";
import GlobalFallback from "./pages/fallback/GlobalFallback";
import Layout from "./components/Layout";
<<<<<<< HEAD
=======
import LoginLayout from "./components/LoginLayout";
import Email from "./pages/login/Email";
import Nickname from "./pages/login/Nickname";
>>>>>>> master

export const ROUTE_PATH = {
  INDEX: "/",
  HOME: "/",
  LOCATION: "/location",
  MYPAGE: "/mypage",
<<<<<<< HEAD
=======
  LOGIN: "/login",
  EMAIL: "/login/email",
  NICKNAME: "/login/nickname",
>>>>>>> master
} as const;

const HomePage = lazy(() => import("@/pages/Home"));
const LocationPage = lazy(() => import("@/pages/Location"));
const MyPage = lazy(() => import("@/pages/Mypage"));

const routes: RouteObject[] = [
  {
    path: ROUTE_PATH.INDEX,
    element: (
      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<GlobalFallback />}>
          <Layout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
<<<<<<< HEAD
        path: ROUTE_PATH.HOME,
=======
        path: ROUTE_PATH.LOCATION,
>>>>>>> master
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <LocationPage />
          </Suspense>
        ),
      },
      {
<<<<<<< HEAD
        path: ROUTE_PATH.HOME,
=======
        path: ROUTE_PATH.MYPAGE,
>>>>>>> master
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <MyPage />
          </Suspense>
        ),
      },
    ],
  },

  {
<<<<<<< HEAD
=======
    path: ROUTE_PATH.LOGIN,
    element: (
      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<GlobalFallback />}>
          <LoginLayout />
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        path: ROUTE_PATH.EMAIL,
        element: <Email />,
      },
      {
        path: ROUTE_PATH.NICKNAME,
        element: <Nickname />,
      },
    ],
  },

  {
>>>>>>> master
    path: "*",
    element: (
      <Suspense fallback={<GlobalFallback />}>
        <NotFoundError />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(routes);

export default router;
