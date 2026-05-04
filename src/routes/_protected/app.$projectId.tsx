import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/app/$projectId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { projectId } = Route.useParams();

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-bold font-heading">Project</h1>
      <p className="text-sm text-muted-foreground">Project ID: {projectId}</p>
    </div>
  );
}
