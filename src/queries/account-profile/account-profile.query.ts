import { useQuery } from '@tanstack/react-query';

import { ACCOUNT_PROFILE_KEYS } from './account-profile.key';
import { getAccountProfile } from './account-profile.service';

interface UseGetAccountProfileQueryProps {
  enabled?: boolean;
}

export const useGetAccountProfileQuery = ({ enabled }: UseGetAccountProfileQueryProps = { enabled: true }) => {
  return useQuery({
    queryKey: ACCOUNT_PROFILE_KEYS.DETAIL,
    queryFn: getAccountProfile,
    enabled,
  });
};
