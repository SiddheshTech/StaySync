import { ReactNode, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  LayoutGrid, Users, BarChart3, ShieldCheck, LifeBuoy, 
  Settings, HelpCircle, Bell, Menu, X
} from 'lucide-react';
import BrandBar from '@/components/BrandBar';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path: string) => {
    // Highlight parent when on nested routes, but keep exact for root '/admin'
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Top chrome removed: rely on BrandBar for consistent look like student */}

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-white border-r">
            {/* Sidebar header to match student shell */}
            <div className="flex items-center gap-3 p-6 border-b">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">University Admin</h2>
                <p className="text-xs text-muted-foreground">Operations & Insights</p>
              </div>
            </div>
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10"><AvatarFallback className="bg-primary/10 text-primary">UA</AvatarFallback></Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">Admin Name</p>
                  <p className="text-xs text-muted-foreground">Your Institution</p>
                </div>
                <Badge variant="secondary" className="text-xs ml-auto">Admin</Badge>
              </div>
            </div>
            <nav className="flex-1 p-3 space-y-1">
              {adminNav.map((item) => (
                <Link key={item.name} to={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${isActive(item.href) ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="p-3 border-t space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
              <Button variant="ghost" size="sm" className="w-full justify-start"><HelpCircle className="w-4 h-4 mr-2" /> Help</Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="lg:pl-64 flex-1">
          {/* Gradient brand bar to match student shell */}
          <BrandBar badgeText="University Admin" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


