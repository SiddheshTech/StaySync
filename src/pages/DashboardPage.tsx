import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  Activity
} from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      </div>
    </div>
  );
};

export default DashboardPage;