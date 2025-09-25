import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Bar, BarChart } from 'recharts';
import { 
  Bell, 
  MessageSquare, 
  Calendar, 
  Heart, 
  Users, 
  Settings, 
  HelpCircle,
  CreditCard,
  Search,
  FileText,
  Activity,
  Home,
  Star,
  LogOut
} from 'lucide-react';

const DashboardPage = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Full-width brand bar */}
      <div className="w-full bg-gradient-to-r from-primary to-secondary text-white shadow-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">CampusConnect</span>
            </div>
            <Badge className="bg-white text-primary border-transparent font-medium shadow-sm">Student Dashboard</Badge>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="space-y-4 sticky top-6 self-start">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Navigation</CardTitle>
                <CardDescription>Quick access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <Link to="/dashboard" className={`flex items-center gap-1 px-3 py-2 rounded-md hover:bg-muted/60 transition-colors ${location.pathname === '/dashboard' ? 'bg-muted/60 font-medium' : ''}`}>
                  <Home className="w-4 h-4" /> Dashboard
                </Link>
                <Link to="/search" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
                  <Search className="w-4 h-4" /> Browse Listings
                </Link>
                <Link to="/messages" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
                  <MessageSquare className="w-4 h-4" /> Messages
                  <Badge variant="secondary" className="ml-auto">5</Badge>
                </Link>
                <Link to="/applications" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
                  <FileText className="w-4 h-4" /> Applications
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Account</CardTitle>
                <CardDescription>Manage your profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1">
                <Link to="/profile" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
                  <Settings className="w-4 h-4" /> Profile
                </Link>
                <Link to="/billing" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
                  <CreditCard className="w-4 h-4" /> Billing
                </Link>
                <Link to="/help" className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-muted/60 transition-colors">
                  <HelpCircle className="w-4 h-4" /> Help & Support
                </Link>
                <button className="w-full flex items-center gap-1 px-3 py-2 rounded-md hover:bg-destructive/10 text-destructive transition-colors">
                  <LogOut className="w-4 h-4" /> Log out
                </button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Panel */}
          <section>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah!</h1>
                <p className="text-muted-foreground">Here's what's happening with your housing search</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  <Badge variant="destructive" className="ml-2">3</Badge>
                </Button>
                <Link to="/profile">
                  <Button className="btn-hero">
                    <Settings className="w-4 h-4 mr-2" />
                    Manage Profile
                  </Button>
                </Link>
              </div>
            </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New Matches</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unread Messages</p>
                  <p className="text-2xl font-bold text-primary">5</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Saved Listings</p>
                  <p className="text-2xl font-bold text-primary">8</p>
                </div>
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold text-primary">3</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights & Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>Matches, messages, and saves over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  matches: { label: 'Matches', color: 'hsl(var(--primary))' },
                  messages: { label: 'Messages', color: 'hsl(var(--secondary))' },
                }}
                className="h-64"
              >
                <ResponsiveContainer>
                  <LineChart data={[
                    { day: 'Mon', matches: 2, messages: 4 },
                    { day: 'Tue', matches: 1, messages: 3 },
                    { day: 'Wed', matches: 3, messages: 5 },
                    { day: 'Thu', matches: 2, messages: 2 },
                    { day: 'Fri', matches: 4, messages: 6 },
                    { day: 'Sat', matches: 1, messages: 3 },
                    { day: 'Sun', matches: 2, messages: 4 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="matches" stroke="var(--color-matches)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="messages" stroke="var(--color-messages)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="flex items-center gap-4 pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: 'hsl(var(--primary))' }} />
                  <span>Matches</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-sm" style={{ backgroundColor: 'hsl(var(--secondary))' }} />
                  <span>Messages</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Profile Completeness</CardTitle>
              <CardDescription>Improve visibility and match quality</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Overall</span>
                  <span className="text-sm font-medium">80%</span>
                </div>
                <Progress value={80} />
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center justify-between"><span>Add a profile photo</span><Badge variant="secondary">Done</Badge></li>
                <li className="flex items-center justify-between"><span>Verify university email</span><Badge variant="secondary">Done</Badge></li>
                <li className="flex items-center justify-between"><span>Fill lifestyle preferences</span><Badge>Pending</Badge></li>
                <li className="flex items-center justify-between"><span>Add budget & move-in date</span><Badge>Pending</Badge></li>
              </ul>
              <Button className="w-full">Complete Profile</Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs: Discover */}
        <Card className="mb-8">
          <CardHeader className="pb-3">
            <CardTitle>Discover</CardTitle>
            <CardDescription>Switch between saved, recommended, and messages</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="recommended">
              <TabsList>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>
              <TabsContent value="recommended" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Downtown Studio', 'Quiet 2BR Near Campus', 'Modern Loft'].map((title, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{title}</h4>
                        <Badge variant="secondary">New</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Walkable area • In-unit laundry</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">$1,200/mo</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="saved" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Campus Village 1BR', 'Maple Apartments', 'Riverside 3BR'].map((title, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-2">
                      <h4 className="font-medium">{title}</h4>
                      <p className="text-sm text-muted-foreground">Saved listing</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">$950/mo</span>
                        <Button size="sm" variant="outline">Open</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="messages" className="mt-4">
                <div className="space-y-3">
                  {[
                    { from: 'Alex Chen', preview: 'Is this place still available?', time: '2h' },
                    { from: 'Leah Park', preview: 'Thanks for the details!', time: '5h' },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center justify-between border rounded-lg p-3 hover:bg-muted/40 transition-colors">
                      <div>
                        <div className="font-medium">{m.from}</div>
                        <div className="text-sm text-muted-foreground">{m.preview}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">{m.time} ago</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'match', message: 'New match with Emma Johnson', time: '2 hours ago', avatar: 'EJ' },
                    { type: 'message', message: 'Message from Alex Chen about shared apartment', time: '4 hours ago', avatar: 'AC' },
                    { type: 'application', message: 'Application submitted for Downtown Studio', time: '1 day ago', avatar: 'DS' },
                    { type: 'favorite', message: 'New listing saved: Modern 2BR near campus', time: '2 days ago', avatar: 'ML' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary">{activity.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* New Matches */}
            <Card>
              <CardHeader>
                <CardTitle>New Roommate Matches</CardTitle>
                <CardDescription>Based on your preferences and compatibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Emma Johnson', major: 'Computer Science', year: 'Junior', compatibility: '95%' },
                    { name: 'Michael Brown', major: 'Business', year: 'Sophomore', compatibility: '88%' },
                    { name: 'Lisa Wang', major: 'Psychology', year: 'Senior', compatibility: '82%' }
                  ].map((match, index) => (
                    <div key={index} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {match.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold">{match.name}</h4>
                          <p className="text-sm text-muted-foreground">{match.major} • {match.year}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{match.compatibility} Match</Badge>
                        <Button size="sm" variant="outline">View Profile</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/search" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Listings
                  </Button>
                </Link>
                <Link to="/messages" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </Link>
                <Link to="/profile" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link to="/help" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Get Help
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary pl-4">
                    <p className="font-medium text-sm">Apartment Viewing</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM</p>
                    <p className="text-xs text-muted-foreground">Downtown Studio</p>
                  </div>
                  <div className="border-l-4 border-secondary pl-4">
                    <p className="font-medium text-sm">Meet & Greet</p>
                    <p className="text-xs text-muted-foreground">Friday, 6:00 PM</p>
                    <p className="text-xs text-muted-foreground">Campus Coffee Shop</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Menu */}
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b">
                    <Settings className="w-4 h-4" />
                    Profile Management
                  </Link>
                  <Link to="/messages" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b">
                    <MessageSquare className="w-4 h-4" />
                    Messages
                  </Link>
                  <Link to="/applications" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b">
                    <FileText className="w-4 h-4" />
                    Applications
                  </Link>
                  <Link to="/billing" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b">
                    <CreditCard className="w-4 h-4" />
                    Billing
                  </Link>
                  <Link to="/help" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    Help & Support
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;