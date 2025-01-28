import { lazy } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import ErrorBoundry from '@components/shared/ErrorBoundry';
import Suspense from '@components/shared/Suspense';

import { ROUTE_PATHS } from '@/utils/constants/route.paths';

import MainLayout from '@/layouts/main-layout';
import ProtectedRoute from './protected.route';

const News = lazy(() => import('@/pages/News'));
const Admin = lazy(() => import('@/pages/Admin'));
const SignIn = lazy(() => import('@/pages/SignIn'));
const Telegram = lazy(() => import('@/pages/Telegram'));
const AccountSettings = lazy(() => import('@/pages/AccountSettings'));

const NotFound = lazy(() => import('@/pages/NotFound'));

const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <Navigate to={`${ROUTE_PATHS.DASHBOARD}`} replace />,
  },
  // Auth Route
  {
    path: ROUTE_PATHS.LOGIN,
    element: (
      <ErrorBoundry>
        <Suspense>
          <SignIn />
        </Suspense>
      </ErrorBoundry>
    ),
  },
  // Dashboard
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: (
      <ErrorBoundry>
        <Suspense>
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        </Suspense>
      </ErrorBoundry>
    ),
    children: [
      {
        index: true,
        element: (
          <ErrorBoundry>
            <Suspense>
              <News />
            </Suspense>
          </ErrorBoundry>
        ),
      },
      {
        path: ROUTE_PATHS.ADMINS_LIST,
        element: (
          <ErrorBoundry>
            <Suspense>
              <Admin />
            </Suspense>
          </ErrorBoundry>
        ),
      },
      {
        path: ROUTE_PATHS.TELEGRAM_LIST,
        element: (
          <ErrorBoundry>
            <Suspense>
              <Telegram />
            </Suspense>
          </ErrorBoundry>
        ),
      },
      {
        path: ROUTE_PATHS.ACCOUNT_SETTINGS,
        element: (
          <ErrorBoundry>
            <Suspense>
              <AccountSettings />
            </Suspense>
          </ErrorBoundry>
        ),
      },
    ],
  },
  // 404 Not Found
  {
    path: '*',
    element: (
      <ErrorBoundry>
        <Suspense>
          <NotFound />
        </Suspense>
      </ErrorBoundry>
    ),
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;
