import UsersWrapper from "./users-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Users & Permissions Demo',
    description: 'User management demo for invitations, roles, permissions, and security oversight.',
    path: '/demos/users',
    keywords: ['user management', 'permissions dashboard', 'role-based access control'],
});

export default function UsersPage() {
    return (
        <UsersWrapper />
    );
}