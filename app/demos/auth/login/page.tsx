import LoginWrapper from "./login-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Login Demo',
    description: 'Authentication demo page showcasing login workflow for enterprise SaaS products.',
    path: '/demos/auth/login',
    keywords: ['login demo', 'authentication page', 'enterprise login'],
});

export default function LoginPage() {
    return (
        <LoginWrapper />
    );
}