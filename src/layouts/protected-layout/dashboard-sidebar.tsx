'use client';

import { BoxesIcon, BriefcaseIcon, UsersRoundIcon } from 'lucide-react';
import { forwardRef } from 'react';
import type { ComponentProps, Ref } from 'react';

import type { UserSession } from '@/types/auth';
import type { Workspace } from '@/types/workspace';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from '@/components/primitives/sidebar';

import { NavMain, type NavMainItem } from '@/components/composites/sidebar/nav-main';
import { NavUser } from '@/components/composites/sidebar/nav-user';
import { WorkspaceSwitcher } from '@/components/composites/sidebar/workspace-switcher';

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
  {
    title: 'Workspace',
    url: '/settings/workspace',
    icon: <BoxesIcon />,
  },
];

interface DashboardSidebarProps extends ComponentProps<typeof Sidebar> {
  session: UserSession;
  workspaces: Workspace[];
  onLogout: () => void;
}

export const DashboardSidebar = forwardRef<ComponentProps<typeof Sidebar>, DashboardSidebarProps>(
  ({ session, workspaces, onLogout, ...props }, ref) => {
    return (
      <Sidebar collapsible="icon" {...props} ref={ref as Ref<HTMLDivElement>}>
        <SidebarHeader>
          <WorkspaceSwitcher workspaces={workspaces} />
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
