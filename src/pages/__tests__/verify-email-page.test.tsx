import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError } from '../../shared/api/errors';
import { VerifyEmailPage } from '../verify-email-page';

const { verifyMock } = vi.hoisted(() => ({ verifyMock: vi.fn() }));
vi.mock('../../features/auth/api/use-verify-email', async () => {
  const { useMutation } = await import('@tanstack/react-query');
  return {
    verifyEmailRequest: (token: string) => verifyMock(token),
    useVerifyEmailMutation: () =>
      useMutation({ mutationFn: (token: string) => verifyMock(token) })
  };
});

afterEach(() => {
  verifyMock.mockReset();
});

function renderAt(url: string) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(
    <MantineProvider>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[url]}>
          <Routes>
            <Route path="/verify" element={<VerifyEmailPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </MantineProvider>
  );
}

describe('VerifyEmailPage', () => {
  it('shows an error when no token is in the URL', () => {
    renderAt('/verify');
    expect(screen.getByText(/missing verification token/i)).toBeInTheDocument();
    expect(verifyMock).not.toHaveBeenCalled();
  });

  it('calls verify and shows success on a valid token', async () => {
    verifyMock.mockResolvedValue({ message: 'ok' });
    renderAt('/verify?token=abc123');
    await waitFor(() => expect(verifyMock).toHaveBeenCalledWith('abc123'));
    expect(await screen.findByText(/your email has been verified/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /continue to sign in/i })).toHaveAttribute('href', '/login');
  });

  it('surfaces ApiError messages from the backend', async () => {
    verifyMock.mockRejectedValue(
      new ApiError(400, 'Token expired', {
        timestamp: '',
        status: 400,
        error: 'Bad Request',
        message: 'Token expired',
        path: '/api/auth/verify'
      })
    );
    renderAt('/verify?token=expired');
    expect(await screen.findByText('Token expired')).toBeInTheDocument();
  });
});