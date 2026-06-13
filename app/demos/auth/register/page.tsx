import RegisterWrapper from "./register-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Register Demo',
  description: 'Authentication demo page showing a user registration flow for SaaS applications.',
  path: '/demos/auth/register',
  keywords: ['register demo', 'signup page', 'user onboarding'],
});

export default function RegisterPage() {
  return (
    <RegisterWrapper />
  );
}