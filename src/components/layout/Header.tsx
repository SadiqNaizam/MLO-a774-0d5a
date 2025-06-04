import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Bell, Settings as SettingsIcon, User, LogOut, CreditCard, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className={cn(
      "fixed top-0 right-0 z-10 flex h-[70px] items-center justify-between border-b border-border bg-card px-6",
      "left-0 md:left-64" // Full width on mobile, offset by sidebar on md+
    )}>
      <div className="flex items-center gap-2">
        {/* Search bar: Input on left, Button on right */}
        <div className="hidden md:flex items-center">
          <Input
            type="search"
            placeholder="Search"
            className="h-10 w-64 rounded-md rounded-r-none border-r-0 focus-visible:ring-offset-0 focus-visible:ring-0"
          />
          <Button variant="default" className="h-10 rounded-l-none px-3">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 p-1 rounded-full h-auto">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150?u=lesliea" alt="Leslie Alexander" />
                <AvatarFallback>LA</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col items-start">
                 <span className="text-sm font-medium text-foreground">Leslie Alexander</span>
              </div>
              <ChevronDown className="ml-auto hidden h-4 w-4 text-muted-foreground lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="flex cursor-pointer items-center">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/billing" className="flex cursor-pointer items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="flex cursor-pointer items-center">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {/* Typically, logout would be a button calling a function */}
              <button onClick={() => alert('Logout action')} className="flex w-full cursor-pointer items-center">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
