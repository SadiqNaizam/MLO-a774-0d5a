import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';

// Organism Components - Assuming they are created and export necessary types
// If types are not exported by components, they would be defined here.
// For this task, we define data structures and assume components accept them.
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import SalesOverviewCard from '@/components/Dashboard/SalesOverviewCard';
import PerformanceCard from '@/components/Dashboard/PerformanceCard';
import TrafficSourcesCard from '@/components/Dashboard/TrafficSourcesCard';
import ClientResponseCard from '@/components/Dashboard/ClientResponseCard';
import RecentActivity from '@/components/Dashboard/RecentActivity';

import { Users, MousePointerSquare, FileText, Activity, TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

// Data structure interfaces
// These would ideally be co-located with their respective components or in a shared types file.

export interface StatCardData {
  id: string;
  title: string;
  value: string; // Formatted value string
  change: string;
  changeType: 'positive' | 'negative';
  icon: LucideIcon;
  timeframe: string;
}

export interface SalesOverviewChartPoint {
  name: string; // e.g., 'Aug 21'
  sales: number;
  // Add other optional series if needed, e.g. lastPeriodSales
}

export interface PerformanceChartPoint {
  month: string; // e.g., 'Jan'
  target: number;
  paid: number;
  pending: number;
}

export interface TrafficSourceItem {
  id: string;
  source: string;
  value: number;
  formattedValue: string;
  color: string; // e.g., 'hsl(var(--prd-accent-purple-val))'
}

export interface ClientResponseChartPoint {
  time: string; // e.g., '7am'
  responses: number;
}

export interface ActivityItem {
  id: string;
  user: string;
  userAvatar?: string; // URL to avatar image
  date: string; // e.g., '22 Aug'
  time: string; // e.g., '5.32 pm'
  duration: string; // e.g., '00.18.25'
  commission: string; // Formatted currency string
  status: 'Successful' | 'Pending' | 'Failed';
}

const DashboardOverviewPage: React.FC = () => {
  const statCardsData: StatCardData[] = [
    {
      id: 'visitors',
      title: 'Total Visitors',
      value: '2,01,620',
      change: '+2.31%',
      changeType: 'positive' as const,
      icon: Users,
      timeframe: 'From Last Month',
    },
    {
      id: 'clicks',
      title: 'Total Clicks',
      value: '1,96,325',
      change: '+5.93%',
      changeType: 'positive' as const,
      icon: MousePointerSquare,
      timeframe: 'From Last Month',
    },
    {
      id: 'commission',
      title: 'Commission',
      value: '1,20,145',
      change: '+9.05%',
      changeType: 'positive' as const,
      icon: FileText, // As per image, a document icon
      timeframe: 'From Last Month',
    },
    {
      id: 'bounceRate',
      title: 'Bounce Rate',
      value: '1,546',
      change: '-1.03%',
      changeType: 'negative' as const,
      icon: Activity, // Generic activity/trend icon
      timeframe: 'From Last Month',
    },
  ];

  const salesOverviewData: SalesOverviewChartPoint[] = [
    { name: 'Aug 21', sales: 32000 },
    { name: 'Aug 22', sales: 45000 },
    { name: 'Aug 23', sales: 38000 },
    { name: 'Aug 24', sales: 52000 },
    { name: 'Aug 25', sales: 47000 },
    { name: 'Aug 26', sales: 60000 }, // Highlighted point in image: $25,254 (may be specific calculation inside component)
    { name: 'Aug 27', sales: 55000 },
    { name: 'Aug 28', sales: 75000 },
    { name: 'Aug 29', sales: 95000 },
    { name: 'Aug 30', sales: 88000 },
  ];

  const performanceData: PerformanceChartPoint[] = [
    { month: 'Jan', target: 5000000, paid: 3200000, pending: 500000 },
    { month: 'Feb', target: 5500000, paid: 4100000, pending: 300000 },
    { month: 'Mar', target: 4800000, paid: 3000000, pending: 600000 },
    { month: 'Apr', target: 6000000, paid: 2500000, pending: 400000 },
    { month: 'May', target: 5200000, paid: 3800000, pending: 200000 },
    { month: 'Jun', target: 5800000, paid: 4500000, pending: 700000 },
    { month: 'Jul', target: 6200000, paid: 5000000, pending: 300000 },
    { month: 'Aug', target: 7000000, paid: 5800000, pending: 500000 }, // Image shows Aug slightly lower than Nov peak
    { month: 'Sep', target: 6500000, paid: 4000000, pending: 800000 },
    { month: 'Oct', target: 6800000, paid: 5500000, pending: 200000 },
    { month: 'Nov', target: 8000000, paid: 6000000, pending: 300000 }, // Image example target 6M, paid 5.7M, pending 0.3M for Nov
    { month: 'Dec', target: 7500000, paid: 5200000, pending: 600000 },
  ];

  const trafficSourcesData: TrafficSourceItem[] = [
    { id: 'google', source: 'Google', value: 89528, formattedValue: '89,528', color: 'hsl(var(--prd-accent-purple-val))' },
    { id: 'social', source: 'Social Media', value: 57658, formattedValue: '57,658', color: 'hsl(var(--prd-accent-green-val))' },
    { id: 'direct', source: 'Direct Message', value: 22717, formattedValue: '22,717', color: 'hsl(var(--prd-secondary-text-val))' }, 
  ];

  const clientResponseData: ClientResponseChartPoint[] = [
    { time: '7am', responses: 120 }, { time: '8am', responses: 100 },
    { time: '9am', responses: 150 }, { time: '10am', responses: 130 },
    { time: '11am', responses: 180 }, { time: '12pm', responses: 220 },
    { time: '1pm', responses: 280 }, { time: '2pm', responses: 250 },
    { time: '3pm', responses: 230 },
  ];
  const todayResponsesCount = 16468;

  const recentActivityData: ActivityItem[] = [
    {
      id: '1',
      user: 'Esther Howard',
      userAvatar: 'https://i.pravatar.cc/150?u=estherh',
      date: '22 Aug',
      time: '5.32 pm',
      duration: '00.18.25',
      commission: '38,582 USD',
      status: 'Successful' as const,
    },
    {
      id: '2',
      user: 'Cameron Williamson',
      userAvatar: 'https://i.pravatar.cc/150?u=cameronw',
      date: '22 Aug',
      time: '6.12 pm',
      duration: '00.13.39',
      commission: '35,957 USD',
      status: 'Pending' as const,
    },
    {
      id: '3',
      user: 'Brooklyn Simmons',
      userAvatar: 'https://i.pravatar.cc/150?u=brooklyns',
      date: '22 Aug',
      time: '6.50 pm',
      duration: '00.32.21',
      commission: '30,291 USD',
      status: 'Successful' as const,
    },
     {
      id: '4',
      user: 'Jenny Wilson',
      userAvatar: 'https://i.pravatar.cc/150?u=jennyw',
      date: '22 Aug',
      time: '7.15 pm',
      duration: '00.10.05',
      commission: '28,500 USD',
      status: 'Failed' as const,
    },
  ];

  return (
    <MainAppLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-primary-text md:text-3xl">Dashboard</h1>
        
        <StatsCardGrid stats={statCardsData} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <SalesOverviewCard data={salesOverviewData} />
          </div>

          <div className="lg:col-span-2">
            <PerformanceCard data={performanceData} />
          </div>
          
          <TrafficSourcesCard data={trafficSourcesData} />
          
          <ClientResponseCard data={clientResponseData} todayResponses={todayResponsesCount} />

          <div className="lg:col-span-2">
            <RecentActivity activities={recentActivityData} />
          </div>
        </div>
      </div>
    </MainAppLayout>
  );
};

export default DashboardOverviewPage;
