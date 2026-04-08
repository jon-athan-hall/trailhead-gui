import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../features/auth';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { NotFoundPage } from '../pages/not-found-page';
import { ForgotPasswordPage } from '../pages/forgot-password-page';
import { RegisterPage } from '../pages/register-page';
import { ResetPasswordPage } from '../pages/reset-password-page';
import { VerifyEmailPage } from '../pages/verify-email-page';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<VerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
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