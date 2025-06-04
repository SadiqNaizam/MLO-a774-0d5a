import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      {/* Header is positioned fixed with left-64 on md screens, so it doesn't need direct ml here */}
      <Header /> 
      <main
        className={cn(
          'p-6 bg-background min-w-0 overflow-y-auto',
          'md:ml-64 mt-[70px]', // Margin for fixed sidebar (on md+) and fixed header
          'min-h-[calc(100vh-70px)]' // Ensure main content area fills viewport height below header
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainAppLayout;
