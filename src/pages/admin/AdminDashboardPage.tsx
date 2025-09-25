import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BarChart3, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminDashboardPage = () => {
  const stats = [
    { label: 'Housing Demand Index', value: '78', sub: 'This week', icon: BarChart3 },
    { label: 'Active Students', value: '4,312', sub: 'Last 30 days', icon: Users },
    { label: 'Satisfaction Score', value: '4.2/5', sub: 'Quarter to date', icon: TrendingUp },
    { label: 'Identified Issues', value: '23', sub: 'Open problems', icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Platform Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              Usage charts placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li>Increase capacity near North Campus</li>
              <li>Prioritize maintenance for Block C</li>
              <li>Promote carpool communities</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Collaboration Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>Partner with Local Housing Co-ops</li>
              <li>Coordinate with City Transport</li>
              <li>Joint Events with Student Union</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Housing Problem Identification</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>Overbooking in West Dorms</li>
              <li>Price spikes near Semester Start</li>
              <li>Limited Accessibility Options</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Student Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              Survey metrics placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;


