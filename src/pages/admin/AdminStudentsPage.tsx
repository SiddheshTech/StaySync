import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const AdminStudentsPage = () => {
  const [status, setStatus] = useState<string>('all');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [loading, setLoading] = useState(false);
  const [importText, setImportText] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const base = import.meta.env.VITE_API_URL || '';
        const params = new URLSearchParams({ q: query, status, page: String(page), pageSize: String(pageSize) });
        const res = await fetch(`${base}/admin/students?${params.toString()}`, { signal: controller.signal });
        const data = await res.json();
        if (res.ok) {
          setRows((data.items || []).map((s: any) => ({ id: s._id, name: s.name, email: s.email, studentId: s.studentId, status: s.status || 'pending' })));
          setTotal(data.total || 0);
        }
      } finally { setLoading(false); }
    }
    load();
    return () => controller.abort();
  }, [status, query, page]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  async function updateStatus(id: string, next: string) {
    const base = import.meta.env.VITE_API_URL || '';
    await fetch(`${base}/admin/students/${id}/status`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: next }) });
    setPage(1);
    setQuery(q => q + '');
  }

  async function bulkImport() {
    const base = import.meta.env.VITE_API_URL || '';
    const res = await fetch(`${base}/admin/students/import`, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: importText });
    if (res.ok) {
      setImportText('');
      setPage(1);
      setQuery(q => q + '');
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <Input value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Paste CSV or JSON array: name,email,studentId" />
            </div>
            <Button onClick={bulkImport} className="btn-hero">Import & Verify</Button>
          </div>
          <p className="text-xs text-muted-foreground">CSV format: name,email,studentId. Records default to pending.</p>
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
            <CardTitle>Students Directory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
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
              <Input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search by name, email or ID" />
            </div>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 gap-2 p-2 text-xs text-muted-foreground border-b">
                <div>ID</div><div>Name</div><div>Email</div><div>Student ID</div><div>Status</div>
              </div>
              {rows.map(r => (
                <div key={r.id} className="grid grid-cols-5 gap-2 p-2 text-sm items-center">
                  <div className="truncate">{r.id}</div>
                  <div className="truncate">{r.name}</div>
                  <div className="truncate">{r.email || '—'}</div>
                  <div className="truncate">{r.studentId || '—'}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="capitalize">{r.status}</Badge>
                    {r.status !== 'verified' && (
                      <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, 'verified')}>Verify</Button>
                    )}
                    {r.status !== 'rejected' && (
                      <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, 'rejected')}>Reject</Button>
                    )}
                    {r.status !== 'pending' && (
                      <Button size="sm" variant="outline" onClick={() => updateStatus(r.id, 'pending')}>Reset</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div>Total: {total}{loading ? ' • Loading...' : ''}</div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" disabled={page===1} onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</Button>
                <span>Page {page} / {totalPages}</span>
                <Button size="sm" variant="outline" disabled={page===totalPages} onClick={()=>setPage(p=>Math.min(totalPages,p+1))}>Next</Button>
              </div>
            </div>
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


