'use client';

import type { Organization } from 'better-auth/client/plugins';
import { BoxesIcon, BriefcaseIcon, UsersRoundIcon } from 'lucide-react';
import { forwardRef } from 'react';
import type { ComponentProps, Ref } from 'react';

import { authClient } from '@/integrations/better-auth/auth-client';

import type { UserSession } from '@/types/auth';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/primitives/sidebar';

import { NavMain } from '@/components/composites/sidebar/nav-main';
import type { NavMainItem } from '@/components/composites/sidebar/nav-main';
import { NavUser } from '@/components/composites/sidebar/nav-user';
import { OrganizationSwitcher } from '@/components/composites/sidebar/organization-switcher';

interface DashboardSidebarProps extends ComponentProps<typeof Sidebar> {
  session: UserSession;
  organizations: Organization[];
  onLogout: () => void;
}

export const DashboardSidebar = forwardRef<DashboardSidebarProps, DashboardSidebarProps>(
  ({ session, organizations, onLogout, ...props }, ref) => {
    const { data: activeOrganization } = authClient.useActiveOrganization();
    const isOrganizationOwner = activeOrganization?.members.find(
      (member) => member.userId === session.user.id && member.role === 'owner',
    );

    const navMain: NavMainItem[] = [
      {
        title: 'Projects',
        url: '/settings/projects',
        icon: <BriefcaseIcon />,
      },
      {
        title: 'Members',
        url: '/settings/members',
        icon: <UsersRoundIcon />,
      },
      ...(isOrganizationOwner
        ? [
            {
              title: 'Organization',
              url: '/settings/organization',
              icon: <BoxesIcon />,
            },
          ]
        : []),
    ];

    return (
      <Sidebar collapsible="icon" {...props} ref={ref as Ref<HTMLDivElement>}>
        <SidebarHeader>
          <OrganizationSwitcher organizations={organizations} />
        </SidebarHeader>
        <SidebarSeparator className="mx-0" />
        <SidebarContent>
          <NavMain title="Settings" items={navMain} isCollapsible={false} />
        </SidebarContent>
        <SidebarSeparator className="mx-0" />
        <SidebarFooter>
          <NavUser user={session.user} onLogout={onLogout} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  },
);
