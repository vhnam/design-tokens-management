import { useQuery } from '@tanstack/react-query';

import { PROJECTS_KEYS } from './projects.key';
import { getProjects } from './projects.service';

interface UseGetProjectsQueryProps {
  enabled?: boolean;
}

export const useGetProjectsQuery = ({ enabled }: UseGetProjectsQueryProps = { enabled: true }) => {
  return useQuery({
    queryKey: PROJECTS_KEYS.LIST,
    queryFn: getProjects,
    enabled,
  });
};
