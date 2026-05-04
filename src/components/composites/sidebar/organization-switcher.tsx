'use client';

import type { Organization } from 'better-auth/client/plugins';
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from 'lucide-react';

import { authClient } from '@/integrations/better-auth/auth-client';

import { useOrganizationStore } from '@/stores/organization.store';

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
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/primitives/sidebar';

interface TeamSwitcherProps {
  organizations: Organization[];
}

export const OrganizationSwitcher = ({ organizations }: TeamSwitcherProps) => {
  const { setActiveOrganization, openAddDialog } = useOrganizationStore();

  const { data: activeOrganization } = authClient.useActiveOrganization();

  const fallbackLogo = activeOrganization?.name.charAt(0).toUpperCase();

  if (!activeOrganization) return null;

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
              <AvatarImage src={activeOrganization.logo!} alt={activeOrganization.name} />
              <AvatarFallback>{fallbackLogo}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight font-heading">
              <span className="truncate font-medium">{activeOrganization.name}</span>
            </div>
            <ChevronsUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56" align="start" side="bottom" sideOffset={4}>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">Organizations</DropdownMenuLabel>
              {organizations.map((organization) => (
                <DropdownMenuItem
                  key={organization.name}
                  onClick={() => setActiveOrganization(organization)}
                  className="gap-2 p-2 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarImage src={organization.logo!} alt={organization.name} />
                      <AvatarFallback>{fallbackLogo}</AvatarFallback>
                    </Avatar>
                    {organization.name}
                  </span>
                  {activeOrganization.id === organization.id && <CheckIcon className="size-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="gap-2 p-2" onClick={openAddDialog}>
                <div className="flex size-6 items-center justify-center border bg-secondary">
                  <PlusIcon className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Add organization</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
