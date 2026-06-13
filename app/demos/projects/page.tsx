import ProjectsWrapper from "./projects-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Projects & Sprints Demo',
    description: 'Project management dashboard demo for kanban, sprints, roadmaps, and team delivery visibility.',
    path: '/demos/projects',
    keywords: ['project management', 'sprints dashboard', 'task tracking'],
});

export default function ProjectsPage() {
    return (
        <ProjectsWrapper />
    );
}