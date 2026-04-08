import { Alert, Container, Divider, Stack, Title } from '@mantine/core';
import { useAuth } from '../features/auth/hooks/use-auth';
import { ChangePasswordForm, ProfileDetailsForm } from '../features/users';

export function ProfilePage() {
  const { user, updateUser } = useAuth();

  if (!user) {
    return (
      <Container size="sm" py="xl">
        <Alert color="red">You must be signed in to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="xl">
        <Title order={2}>Your profile</Title>
        <ProfileDetailsForm
          userId={user.id}
          initialName={user.name}
          initialEmail={user.email}
          onUpdated={(patch) => updateUser(patch)}
        />
        <Divider />
        <ChangePasswordForm userId={user.id} />
      </Stack>
    </Container>
  );
}