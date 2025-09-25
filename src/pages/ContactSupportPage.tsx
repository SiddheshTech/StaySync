import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Phone, Mail, MessageSquare, Video, Users, GraduationCap, AlertCircle } from 'lucide-react';

const ContactSupportPage = () => {
  const tickets = [
    { id: 'TT-1042', subject: 'Billing discrepancy', status: 'Open', priority: 'High', updated: '2h ago' },
    { id: 'TT-1037', subject: 'Unable to upload ID', status: 'Pending', priority: 'Medium', updated: '6h ago' },
    { id: 'TT-1029', subject: 'Match results seem off', status: 'Resolved', priority: 'Low', updated: '1d ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Contact & Support</h1>
          <p className="text-muted-foreground">Get help via chat, email, phone, or community channels</p>
        </div>

        <Tabs defaultValue="channels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="channels">Support Channels</TabsTrigger>
            <TabsTrigger value="ticket">Create Ticket</TabsTrigger>
            <TabsTrigger value="manage">Manage Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="channels" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Live Chat</CardTitle>
                  <CardDescription>Chat with support (9am-6pm)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="secondary">Available</Badge>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email Ticket</CardTitle>
                  <CardDescription>Get a response within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">support@staysync.com</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</CardTitle>
                  <CardDescription>Urgent issues (9am-6pm)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">+1 (555) 010-1234</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2"><Video className="w-4 h-4" /> Video Support</CardTitle>
                  <CardDescription>Schedule a video call for complex issues</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" variant="outline">Request a Call</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2"><Users className="w-4 h-4" /> Community Forum</CardTitle>
                  <CardDescription>Get help from other students</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Go to Community</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2"><GraduationCap className="w-4 h-4" /> University Liaison</CardTitle>
                  <CardDescription>Contact your campus point of contact</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Find Liaison</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ticket" className="space-y-6">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>Create a Support Ticket</CardTitle>
                <CardDescription>Describe the issue and set priority</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Subject" />
                  <Input placeholder="Category (Billing, Technical, Safety, etc.)" />
                  <Input placeholder="Priority (Low, Medium, High)" />
                </div>
                <Textarea placeholder="Describe your issue with as much detail as possible" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input type="file" multiple />
                  <Input placeholder="Callback phone (optional)" />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="btn-hero">Submit Ticket</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>My Tickets</CardTitle>
                <CardDescription>Track progress and status updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {tickets.map(t => (
                  <div key={t.id} className="border rounded-md p-3 text-sm flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{t.id} • {t.subject}</div>
                      <div className="text-muted-foreground">Updated {t.updated}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{t.status}</Badge>
                      <Badge>{t.priority}</Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Resolution & Feedback</CardTitle>
                <CardDescription>Confirm resolutions, escalate, or rate support</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="border rounded-md p-3">
                  <div className="font-medium mb-2">Resolution Confirmation</div>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline">Mark as Resolved</Button>
                    <Button size="sm" variant="outline"><AlertCircle className="w-4 h-4 mr-1" /> Escalate</Button>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="font-medium mb-2">Rate Support</div>
                  <div className="space-y-2">
                    <Input placeholder="1-5 stars" />
                    <Textarea placeholder="Optional comments" />
                    <Button size="sm">Submit Rating</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContactSupportPage;


