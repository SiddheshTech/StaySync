import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const AdminSupportPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Support Tickets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-40 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
            Tickets list placeholder
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Reply & Communication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="To: student@university.edu" />
            <Textarea placeholder="Type your response..." />
            <div className="flex gap-2">
              <Button className="btn-hero">Send</Button>
              <Button variant="secondary">Escalate</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Case Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>Documentation templates</li>
              <li>Resolution confirmation tracking</li>
              <li>Feedback analysis</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSupportPage;


