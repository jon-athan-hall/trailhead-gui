import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AuthContext, type AuthContextValue } from '../hooks/auth-context';
import { RequireRole } from '../guards';
import type { AuthUser } from '../types';

function makeAuth(overrides: Partial<AuthContextValue>): AuthContextValue {
  return {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    setSession: () => {},
    clearSession: () => {},
    ...overrides
  };
}

const adminUser: AuthUser = {
  id: '1',
  name: 'Admin',
  email: 'admin@example.com',
  roles: ['ROLE_ADMIN', 'ROLE_USER'],
  verified: true
};

const plainUser: AuthUser = { ...adminUser, id: '2', roles: ['ROLE_USER'] };

function renderAt(path: string, ctx: AuthContextValue) {
  return render(
    <AuthContext.Provider value={ctx}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/login" element={<div>login page</div>} />
          <Route path="/" element={<div>home page</div>} />
          <Route
            path="/admin"
            element={
              <RequireRole role="ROLE_ADMIN">
                <div>admin page</div>
              </RequireRole>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('RequireRole', () => {
  it('renders nothing while auth is loading', () => {
    const { container } = renderAt('/admin', makeAuth({ isLoading: true }));
    expect(container).toBeEmptyDOMElement();
  });

  it('redirects unauthenticated users to /login', () => {
    renderAt('/admin', makeAuth({ isAuthenticated: false }));
    expect(screen.getByText('login page')).toBeInTheDocument();
  });

  it('redirects authenticated users without the role to /', () => {
    renderAt('/admin', makeAuth({ user: plainUser, isAuthenticated: true }));
    expect(screen.getByText('home page')).toBeInTheDocument();
  });

  it('renders children when the user has the required role', () => {
    renderAt('/admin', makeAuth({ user: adminUser, isAuthenticated: true }));
    expect(screen.getByText('admin page')).toBeInTheDocument();
  });
});