import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../../shared/api/client';
import type { MessageResponse } from '../types';

export function verifyEmailRequest(token: string): Promise<MessageResponse> {
  return apiFetch<MessageResponse>('/api/auth/verify', {
    method: 'POST',
    body: { token },
    skipAuth: true
  });
}

export function useVerifyEmailMutation() {
  return useMutation({ mutationFn: verifyEmailRequest });
}
