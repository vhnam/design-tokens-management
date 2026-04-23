'use client';

import { Columns3CogIcon, HelpCircleIcon, TerminalSquareIcon } from 'lucide-react';
import { forwardRef } from 'react';
import type { ComponentProps, Ref } from 'react';

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
import { NavSecondary } from '@/components/composites/sidebar/nav-secondary';
import { NavUser } from '@/components/composites/sidebar/nav-user';
import { WorkspaceSwitcher } from '@/components/composites/sidebar/workspace-switcher';

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
          url: '/tokens/component-tokens',
        },
      ],
    },
    {
      title: 'Branding',
      url: '#',
      icon: <Columns3CogIcon />,
      isActive: true,
      items: [
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
  navSecondary: [
    {
      title: 'Help',
      url: '/help',
      icon: HelpCircleIcon,
      isActive: false,
    },
  ],
};

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  session: UserSession;
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
          <NavMain items={data.navMain} />
          <NavSecondary className="mt-auto" items={data.navSecondary} />
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
