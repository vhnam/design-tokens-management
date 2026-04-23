import { useQuery } from '@tanstack/react-query';

import { WORKSPACES_KEYS } from './workspaces.key';
import { getWorkspaces } from './workspaces.service';

export const useGetWorkspacesQuery = () => {
  return useQuery({
    queryKey: WORKSPACES_KEYS.LIST,
    queryFn: getWorkspaces,
  });
};
