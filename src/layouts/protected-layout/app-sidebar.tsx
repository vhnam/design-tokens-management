'use client';

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

import { NavUser } from '@/components/composites/sidebar/nav-user';

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
  session: UserSession;
  onLogout: () => void;
}

export const AppSidebar = forwardRef<ComponentProps<typeof Sidebar>, AppSidebarProps>(
  ({ session, onLogout, ...props }, ref) => {
    return (
      <Sidebar collapsible="icon" {...props} ref={ref as Ref<HTMLDivElement>}>
        <SidebarHeader>AHIHI</SidebarHeader>
        <SidebarSeparator className="mx-0" />
        <SidebarContent></SidebarContent>
        <SidebarSeparator className="mx-0" />
        <SidebarFooter>
          <NavUser user={session.user} onLogout={onLogout} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  },
);
