import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../features/auth';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { NotFoundPage } from '../pages/not-found-page';
import { RegisterPage } from '../pages/register-page';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}