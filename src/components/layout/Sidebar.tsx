import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Home,
  FileText,
  PieChart,
  Database,
  Settings as SettingsIcon, // Renamed to avoid conflict with potential Settings component
  HelpCircle,
  ChevronRight,
  BarChartBig,
} from 'lucide-react';

interface ChildNavItem {
  label: string;
  href: string;
  icon: React.ElementType; 
}

interface NavItem {
  label: string;
  href: string; // For parent items that only toggle, this can be '#'
  icon: React.ElementType;
  children?: ChildNavItem[];
}

const navItemsList: NavItem[] = [
  { label: 'Overview', href: '/', icon: Home },
  {
    label: 'Reports',
    href: '/reports', // Base path for active state checking
    icon: FileText,
    children: [
      { label: 'Sales Reports', href: '/reports/sales', icon: FileText },
      { label: 'User Activity', href: '/reports/users', icon: FileText },
    ],
  },
  { label: 'Analytics', href: '/analytics', icon: PieChart },
  { label: 'Data Sources', href: '/data-sources', icon: Database },
  { label: 'Setting', href: '/settings', icon: SettingsIcon },
  { label: 'Help', href: '/help', icon: HelpCircle },
];

interface SidebarNavItemProps {
  item: NavItem;
  currentPath: string;
  isChild?: boolean;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ item, currentPath, isChild = false }) => {
  const initialOpenState = item.children ? item.children.some(child => currentPath.startsWith(child.href)) : false;
  const [isOpen, setIsOpen] = useState(initialOpenState);

  const isActive = (!item.children && currentPath === item.href) || 
                   (item.children && !isOpen && currentPath.startsWith(item.href) && !item.children.some(child => currentPath === child.href) && item.href !== '/'); // Parent active if path matches parent href and no child is active

  const isParentOfActiveChild = item.children ? item.children.some(child => currentPath === child.href) : false;

  if (item.children) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground',
              (isActive || isParentOfActiveChild) && 'bg-sidebar-foreground/10',
            )}
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            <span className="flex-grow text-left">{item.label}</span>
            <ChevronRight className={cn('ml-2 h-4 w-4 flex-shrink-0 transition-transform', isOpen && 'rotate-90')} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-7 pt-1 space-y-1">
          {item.children.map((child) => (
            <SidebarNavItem key={child.href} item={{...child, children: undefined}} currentPath={currentPath} isChild={true} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link to={item.href} className="block w-full">
      <Button
        variant="ghost"
        className={cn(
          'w-full justify-start rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground',
          isActive && 'bg-sidebar-foreground/10',
          isChild && 'pl-0', // Align text with parent icon if it's a child without an icon or adjust padding
        )}
      >
        {!isChild && <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />}
        {isChild && <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />} {/* Smaller icon for children or remove */} 
        <span className="flex-grow text-left">{item.label}</span>
      </Button>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="fixed left-0 top-0 z-20 flex h-full w-64 flex-col border-r border-sidebar-foreground/10 bg-sidebar text-sidebar-foreground">
      <div className="flex h-[70px] items-center border-b border-sidebar-foreground/10 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <BarChartBig className="h-7 w-7 text-white" />
          <h1 className="text-xl font-bold text-white">DataAI</h1>
        </Link>
      </div>
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-4">
        {navItemsList.map((item) => (
          <SidebarNavItem key={item.label} item={item} currentPath={currentPath} />
        ))}
      </nav>
      <div className="mt-auto border-t border-sidebar-foreground/10 p-4">
        <div className="rounded-lg bg-sidebar-foreground/5 p-4">
          <div className="flex items-center mb-2">
            <BarChartBig className="h-7 w-7 text-white mr-3" />
            <div>
              <h3 className="text-md font-semibold text-white">Data AI Pro</h3>
              <p className="text-xs text-sidebar-foreground/80">
                Full access to all features.
              </p>
            </div>
          </div>
          <Button size="sm" className="w-full bg-white text-primary hover:bg-white/90 focus-visible:ring-white">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
