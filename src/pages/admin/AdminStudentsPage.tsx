import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const AdminStudentsPage = () => {
  const [status, setStatus] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  const rows = useMemo(
    () => [
      { id: 'S-1001', name: 'Aisha Khan', status: 'pending' },
      { id: 'S-1002', name: 'Liam Patel', status: 'verified' },
      { id: 'S-1003', name: 'Sofia Chen', status: 'pending' },
      { id: 'S-1004', name: 'Ethan Garcia', status: 'rejected' },
    ].filter(r => (status === 'all' || r.status === status) && (r.name.toLowerCase().includes(query.toLowerCase()) || r.id.toLowerCase().includes(query.toLowerCase()))),
    [status, query],
  );

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
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or ID" />
            </div>
            <div className="rounded-md border">
              <div className="grid grid-cols-3 gap-2 p-2 text-xs text-muted-foreground border-b">
                <div>ID</div><div>Name</div><div>Status</div>
              </div>
              {rows.map(r => (
                <div key={r.id} className="grid grid-cols-3 gap-2 p-2 text-sm">
                  <div>{r.id}</div>
                  <div>{r.name}</div>
                  <div className="capitalize">{r.status}</div>
                </div>
              ))}
            </div>
            <ul className="text-xs text-muted-foreground">
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


