import React, { lazy } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import ErrorBoundary from '@components/shared/ErrorBoundry';
import { Suspense } from '@components/shared/Suspense';
import { ROUTE_PATHS } from '@/utils/constants/route.paths';

import { ProtectedRoute } from './protected.route';
import { DashboardLayout } from '@/layouts/main-layout';

const withErrorBoundaryAndSuspense = <P extends {}>(Component: React.ComponentType<P>) => {
  return (props: P) => (
    <ErrorBoundary>
      <Suspense>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

// Lazy-loaded pages
const SignIn = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/auth-pages/sign-in')));

const News = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/news-pages/news-page')));
const NewsList = withErrorBoundaryAndSuspense(lazy(() => import('@/components/pages/news/news-list')));
const PostNews = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/news-pages/news-post-page')));
const EditNews = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/news-pages/news-edit-page')));

const Admins = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/admin-pages/admins-page')));
const AdminsList = withErrorBoundaryAndSuspense(lazy(() => import('@/components/pages/admin/admins-list')));
const CreateAdmin = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/admin-pages/admin-create-page')));
const UpdateAdmin = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/admin-pages/admin-update-page')));

const Telegram = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/telegram-pages/telegram-page')));
const TelegramsList = withErrorBoundaryAndSuspense(lazy(() => import('@/components/pages/telegram/telegram-list')));
const CreateTelegram = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/telegram-pages/telegram-create-page')));
const UpdateTelegram = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/telegram-pages/telegram-update-page')));

const NotFound = withErrorBoundaryAndSuspense(lazy(() => import('@/pages/not-found-page')));

const routes = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <Navigate to={`${ROUTE_PATHS.DASHBOARD}/${ROUTE_PATHS.GET_NEWS}`} replace />,
  },
  // Auth
  {
    path: ROUTE_PATHS.LOGIN,
    element: <SignIn />,
  },
  // Dashboard
  {
    path: ROUTE_PATHS.DASHBOARD,
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={ROUTE_PATHS.GET_NEWS} replace />,
      },
      // News
      {
        path: ROUTE_PATHS.GET_NEWS,
        element: <News />,
        children: [
          {
            index: true,
            element: <NewsList />,
          },
          {
            path: ROUTE_PATHS.POST_NEWS,
            element: <PostNews />,
          },
          {
            path: ROUTE_PATHS.EDIT_NEWS,
            element: <EditNews />,
          },
        ],
      },
      // Admin
      {
        path: ROUTE_PATHS.GET_ADMINS,
        element: <Admins />,
        children: [
          {
            index: true,
            element: <AdminsList />,
          },
          {
            path: ROUTE_PATHS.CREATE_ADMIN,
            element: <CreateAdmin />,
          },
          {
            path: ROUTE_PATHS.UPDATE_ADMIN,
            element: <UpdateAdmin />,
          },
        ],
      },
      // Telegram
      {
        path: ROUTE_PATHS.GET_TELEGRAM,
        element: <Telegram />,
        children: [
          {
            index: true,
            element: <TelegramsList />,
          },
          {
            path: ROUTE_PATHS.CREATE_TELEGRAM,
            element: <CreateTelegram />,
          },
          {
            path: ROUTE_PATHS.UPDATE_TELEGRAM,
            element: <UpdateTelegram />,
          },
        ],
      },
    ],
  },
  // 404 Not Found
  {
    path: '*',
    element: <NotFound />,
  },
]);

const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;
