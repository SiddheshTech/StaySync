import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const AdminStudentsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input placeholder="Upload CSV of students (placeholder)" />
            <Button className="btn-hero">Verify</Button>
          </div>
          <p className="text-xs text-muted-foreground">Supports university email and enrollment ID formats.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Community Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              University-specific groups placeholder
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Case Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>Open: 12 • In Progress: 5 • Resolved: 31</li>
              <li>Avg. first response: 3h 12m</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Academic Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              Calendar integration placeholder
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Campus Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>Housing Office Contacts</li>
              <li>Counseling & Support</li>
              <li>Emergency Services</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency Coordination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-24 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              Contact workflows placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminStudentsPage;


