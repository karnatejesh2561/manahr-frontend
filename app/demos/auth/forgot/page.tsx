import ForgotWrapper from "./forgot-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Password Recovery Demo',
    description: 'Password recovery demo page for secure forgotten password flows in SaaS products.',
    path: '/demos/auth/forgot',
    keywords: ['password recovery', 'forgot password demo', 'authentication reset'],
});

export default function ForgotPage() {
    return (
        <ForgotWrapper />
    );
}