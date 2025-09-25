import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AdminModerationPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reported Content Queue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <Input placeholder="Search reports" />
            <Button variant="secondary">Filters</Button>
          </div>
          <div className="h-40 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
            Queue table placeholder
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Guideline Enforcement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              <li>Warning templates and escalation rules</li>
              <li>Suspension management</li>
              <li>Appeal review workflows</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pattern Recognition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-32 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              Signals & trends placeholder
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminModerationPage;


