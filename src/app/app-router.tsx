import { useRoutes, type RouteObject } from 'react-router-dom';
import { authPublicRoutes, RequireAuth, RequireRole } from '../features/auth';
import { roleAdminRoutes } from '../features/role';
import { userAdminRoutes, userAuthenticatedRoutes } from '../features/user';
import { pageAuthenticatedRoutes, pageFallbackRoute } from '../pages/routes';
import { AppLayout } from './app-layout';

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      ...authPublicRoutes,
      {
        element: <RequireAuth />,
        children: [
          ...pageAuthenticatedRoutes,
          ...userAuthenticatedRoutes,
          {
            element: <RequireRole role="ROLE_ADMIN" />,
            children: [...userAdminRoutes, ...roleAdminRoutes]
          }
        ]
      },
      pageFallbackRoute
    ]
  }
];

export function AppRouter() {
  return useRoutes(routes);
}
