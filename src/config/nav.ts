import { NavItem } from '@/types/nav';
import { LayoutDashboard, Settings } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    title: 'MS Learn MCP Connect',
    href: '/ms-learn-mcp-connect',
    icon: LayoutDashboard,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
  // {
  //   title: 'Information',
  //   href: '/dashboard/money',
  //   icon: Image,
  // },
  // {
  //   title: 'Load to MVP',
  //   href: '/dashboard/mvp',
  //   icon: Layers,
  // },
  // {
  //   title: 'PoC Showcase(preview)',
  //   href: '/dashboard/poc-showcase',
  //   icon: ThumbsUpIcon,
  // },
  // {
  //   title: '設定',
  //   href: '/dashboard/settings',
  //   icon: Settings,
  // },
  // {
  //   title: 'Analysis',
  //   href: '/dashboard/analysis',
  //   icon: BarChart2,
  // },
];
