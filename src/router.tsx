import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFoundError from "./pages/error/NotFoundError";
import Error from "./pages/error/Error";
import GlobalFallback from "./pages/fallback/GlobalFallback";
import Layout from "./components/Layout";
import LoginLayout from "./components/LoginLayout";
import Email from "./pages/login/Email";
import Nickname from "./pages/login/Nickname";

export const ROUTE_PATH = {
  INDEX: "/",
  HOME: "/",
  LOCATION: "/location",
  MYPAGE: "/mypage",
  LOGIN: "/login",
  EMAIL: "/login/email",
  NICKNAME: "/login/nickname",
  DIARY: "/diary/:id", // 추가된 부분
} as const;

const HomePage = lazy(() => import("@/pages/Home"));
const LocationPage = lazy(() => import("@/pages/Location"));
const MyPage = lazy(() => import("@/pages/Mypage"));
const DiaryPage = lazy(() => import("@/pages/Diary"));

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
        path: ROUTE_PATH.LOCATION,
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <LocationPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATH.MYPAGE,
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: "/diary/:postId",
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <DiaryPage />
          </Suspense>
        ),
      },
    ],
  },

  {
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
