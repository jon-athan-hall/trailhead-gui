import { Alert, Button, Container, Loader, Stack, Title } from '@mantine/core';
import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useVerifyEmailMutation } from '../features/auth/api/use-verify-email';
import { ApiError } from '../shared/api/errors';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const verifyMutation = useVerifyEmailMutation();
  const firedRef = useRef(false);

  useEffect(() => {
    if (!token || firedRef.current) return;
    firedRef.current = true;
    verifyMutation.mutate(token);
  }, [token, verifyMutation]);

  const errorMessage =
    verifyMutation.error instanceof ApiError
      ? verifyMutation.error.message
      : verifyMutation.isError
        ? 'Verification failed'
        : null;

  return (
    <Container size="xs" py="xl">
      <Stack>
        <Title order={2}>Verify your email</Title>
        {!token && (
          <Alert color="red">Missing verification token. Check the link in your email.</Alert>
        )}
        {token && verifyMutation.isPending && <Loader />}
        {verifyMutation.isSuccess && (
          <>
            <Alert color="green">Your email has been verified.</Alert>
            <Button component={Link} to="/login">
              Continue to sign in
            </Button>
          </>
        )}
        {errorMessage && <Alert color="red">{errorMessage}</Alert>}
      </Stack>
    </Container>
  );
}