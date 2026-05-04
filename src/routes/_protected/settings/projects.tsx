import { createFileRoute } from '@tanstack/react-router';

import { Projects } from '@/features/settings/projects';

export const Route = createFileRoute('/_protected/settings/projects')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Projects />;
}
