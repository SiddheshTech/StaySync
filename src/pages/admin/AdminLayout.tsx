import { ReactNode } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutGrid, Users, BarChart3, ShieldCheck, LifeBuoy } from 'lucide-react';

interface AdminLayoutProps {
  children?: ReactNode;
}

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutGrid },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { name: 'Moderation', href: '/admin/moderation', icon: ShieldCheck },
  { name: 'Support', href: '/admin/support', icon: LifeBuoy },
];

const AdminLayout = (_props: AdminLayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">University Admin</h1>
          <p className="text-sm text-muted-foreground">Manage students, insights, and platform operations</p>
        </div>
        <Badge variant="secondary">University Portal</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <aside className="md:col-span-3">
          <Card className="p-2">
            <nav className="space-y-1">
              {adminNav.map((item) => (
                <Link key={item.name} to={item.href} className="block">
                  <Button
                    variant={isActive(item.href) ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </Card>
        </aside>

        <section className="md:col-span-9">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AdminLayout;


