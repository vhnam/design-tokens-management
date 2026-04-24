'use client';

import { ChevronsUpDownIcon, PlusIcon } from 'lucide-react';

import type { Workspace } from '@/types/workspace';

import { useWorkspaceStore } from '@/stores/workspace.store';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/primitives/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/primitives/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/primitives/sidebar';

interface TeamSwitcherProps {
  workspaces: Workspace[];
}

export const WorkspaceSwitcher = ({ workspaces }: TeamSwitcherProps) => {
  const { isMobile } = useSidebar();
  const { activeWorkspace, setActiveWorkspace, openAddDialog } = useWorkspaceStore();

  const displayed = activeWorkspace ?? workspaces[0];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              />
            }
          >
            <Avatar>
              <AvatarImage src={displayed.image} alt={displayed.name} />
              <AvatarFallback>{displayed.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight font-heading">
              <span className="truncate font-medium">{displayed.name}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56" align="start" side={isMobile ? 'bottom' : 'right'} sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
              {workspaces.map((workspace) => (
                <DropdownMenuItem
                  key={workspace.name}
                  onClick={() => setActiveWorkspace(workspace)}
                  className="gap-2 p-2"
                >
                  <Avatar size="sm">
                    <AvatarImage src={workspace.image} alt={workspace.name} />
                    <AvatarFallback>{workspace.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  {workspace.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 p-2" onClick={openAddDialog}>
                <div className="flex size-6 items-center justify-center border bg-secondary">
                  <PlusIcon className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Add workspace</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
