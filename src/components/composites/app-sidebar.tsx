'use client';

import { Columns3CogIcon, TerminalSquareIcon } from 'lucide-react';
import { forwardRef } from 'react';
import type { ComponentProps, Ref } from 'react';

import type { Session } from '@/lib/auth';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/primitives/sidebar';

import { NavMain } from '@/components/composites/nav-main';
import { NavUser } from '@/components/composites/nav-user';
import { WorkspaceSwitcher } from '@/components/composites/workspace-switcher';

const data = {
  workspaces: [
    {
      name: 'Acme Inc',
    },
    {
      name: 'Acme Corp.',
    },
    {
      name: 'Evil Corp.',
    },
  ],
  navMain: [
    {
      title: 'Tokens',
      url: '#',
      icon: <TerminalSquareIcon />,
      isActive: true,
      items: [
        {
          title: 'Primitive Tokens',
          url: '/tokens/primitive-tokens',
        },
        {
          title: 'Semantic Tokens',
          url: '/tokens/semantic-tokens',
        },
        {
          title: 'Component Tokens',
          url: '#',
        },
      ],
    },
    {
      title: 'Configuration',
      url: '#',
      icon: <Columns3CogIcon />,
      isActive: true,
      items: [
        {
          title: 'Workspaces',
          url: '#',
        },
        {
          title: 'Brands',
          url: '#',
        },
        {
          title: 'Brand Overrides',
          url: '#',
        },
      ],
    },
  ],
};

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  session: Session;
  onLogout: () => void;
}

export const AppSidebar = forwardRef<ComponentProps<typeof Sidebar>, AppSidebarProps>(
  ({ session, onLogout, ...props }, ref) => {
    return (
      <Sidebar collapsible="icon" {...props} ref={ref as Ref<HTMLDivElement>}>
        <SidebarHeader>
          <WorkspaceSwitcher workspaces={data.workspaces} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain title="Platform" items={data.navMain} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={session.user} onLogout={onLogout} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  },
);
