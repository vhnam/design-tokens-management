import { Link } from '@tanstack/react-router';
import { ChevronsUpDownIcon, LogOutIcon, UserIcon } from 'lucide-react';

import type { User } from '@/types/auth';

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

interface NavUserProps {
  user: User;
  onLogout: () => void;
}

interface UserProfileProps {
  user: User;
  showEmail?: boolean;
}

const UserProfile = ({ user, showEmail = false }: UserProfileProps) => {
  const fallbackName = user.name
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join('');

  return (
    <>
      <Avatar>
        <AvatarImage src={user.image ?? ''} alt={user.name} />
        <AvatarFallback className="bg-accent text-accent-foreground">{fallbackName}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        {showEmail && <span className="truncate text-xs text-muted-foreground">{user.email}</span>}
      </div>
    </>
  );
};

export function NavUser({ user, onLogout }: NavUserProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}>
            <UserProfile user={user} />
            <ChevronsUpDownIcon className="ml-auto size-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <UserProfile user={user} showEmail />
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <Link to="/settings/account">
                    <UserIcon />
                    Account
                  </Link>
                }
              />
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
