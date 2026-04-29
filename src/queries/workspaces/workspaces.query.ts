import { useQuery } from '@tanstack/react-query';

import { WORKSPACES_KEYS } from './workspaces.key';
import { getWorkspaces } from './workspaces.service';

interface UseGetWorkspacesQueryProps {
  enabled?: boolean;
}

export const useGetWorkspacesQuery = ({ enabled }: UseGetWorkspacesQueryProps = { enabled: true }) => {
  return useQuery({
    queryKey: WORKSPACES_KEYS.LIST,
    queryFn: getWorkspaces,
    enabled,
  });
};
