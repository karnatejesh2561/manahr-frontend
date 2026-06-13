import SettingsWrapper from "./settings-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Settings Dashboard Demo',
    description: 'Workspace settings and configuration demo with security, integrations, and personalization controls.',
    path: '/demos/settings',
    keywords: ['settings dashboard', 'workspace configuration', 'user preferences'],
});

export default function SettingsPage() {
    return (
        <SettingsWrapper />
    );
}