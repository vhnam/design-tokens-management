import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/tokens/semantic-tokens')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_protected/tokens/semantic-tokens"!</div>
}
