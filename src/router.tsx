import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import NotFoundError from "./pages/error/NotFoundError";
import Error from "./pages/error/Error";
import GlobalFallback from "./pages/fallback/GlobalFallback";
import Layout from "./components/Layout";

export const ROUTE_PATH = {
  INDEX: "/",
  HOME: "/",
  LOCATION: "/location",
  MYPAGE: "/mypage",
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
        path: ROUTE_PATH.HOME,
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <LocationPage />
          </Suspense>
        ),
      },
      {
        path: ROUTE_PATH.HOME,
        element: (
          <Suspense fallback={<GlobalFallback />}>
            <MyPage />
          </Suspense>
        ),
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
