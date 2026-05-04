import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../../common/api/client';
import type { MessageResponse } from '../types';

export function resendVerificationRequest(): Promise<MessageResponse> {
  return apiFetch<MessageResponse>('/api/auth/resend-verification', {
    method: 'POST'
  });
}

export function useResendVerificationMutation() {
  return useMutation({ mutationFn: resendVerificationRequest });
}
