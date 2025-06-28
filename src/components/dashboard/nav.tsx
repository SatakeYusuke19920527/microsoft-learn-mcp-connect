'use client';
import { navItems } from '@/config/nav';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const DashboardNav = () => {
  const pathname = usePathname();
  return (
    <nav className="grid gap-2 items-start">
      {navItems.map((item) => {
        return (
          <Button
            key={item.href}
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className={cn(
              'justify-start',
              pathname === item.href && 'bg-accent'
            )}
            asChild
          >
            <Link href={item.href}>
              {item.icon && <item.icon className="w-4 h-4 mr-2" />}
              {item.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default DashboardNav;
