import EmployeesWrapper from "./employees-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Employee Directory Demo',
    description: 'Employee management dashboard demo for team profiles, roles, and organizational visibility.',
    path: '/demos/employees',
    keywords: ['employee directory', 'team management', 'hr dashboard'],
});

export default function EmployeesPage() {
    return (
        <EmployeesWrapper />
    );
}