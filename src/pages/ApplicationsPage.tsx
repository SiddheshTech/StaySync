import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BrandBar from '@/components/BrandBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const ApplicationsPage = () => {
  const applications = [
    {
      id: 1,
      property: 'Downtown Studio Apartment',
      location: '2847 Telegraph Ave, Berkeley, CA',
      rent: '$1,200/month',
      applicationDate: '2024-01-15',
      status: 'pending',
      landlord: 'Property Management Co.',
      moveInDate: '2024-08-01',
      progress: 75,
      nextStep: 'Background check in progress'
    },
    {
      id: 2,
      property: 'Shared 2BR Near Campus',
      location: '1234 Durant Ave, Berkeley, CA',
      rent: '$900/month',
      applicationDate: '2024-01-10',
      status: 'approved',
      landlord: 'Jane Smith',
      moveInDate: '2024-08-15',
      progress: 100,
      nextStep: 'Sign lease agreement'
    },
    {
      id: 3,
      property: 'Modern 3BR House',
      location: '5678 Ashby Ave, Berkeley, CA',
      rent: '$800/month (shared)',
      applicationDate: '2024-01-12',
      status: 'rejected',
      landlord: 'ABC Properties',
      moveInDate: '2024-08-01',
      progress: 50,
      nextStep: 'Application declined'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Pending
        </Badge>;
      case 'approved':
        return <Badge variant="default" className="flex items-center gap-1 bg-green-500">
          <CheckCircle className="w-3 h-3" />
          Approved
        </Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Rejected
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const savedListings = [
    {
      id: 1,
      title: 'Cozy Studio in Downtown',
      location: 'Downtown Berkeley',
      rent: '$1,100/month',
      savedDate: '2 days ago',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: '2BR Apartment with Balcony',
      location: 'North Berkeley',
      rent: '$1,800/month',
      savedDate: '5 days ago',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Shared House Near Campus',
      location: 'Southside Berkeley',
      rent: '$750/month',
      savedDate: '1 week ago',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Applications" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Applications & Bookings</h1>
            <p className="text-muted-foreground">Track your housing applications and saved listings</p>
          </div>
        </div>

        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">Active Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Application Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                      <p className="text-2xl font-bold text-primary">3</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                      <p className="text-2xl font-bold text-primary">1</p>
                    </div>
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Approved</p>
                      <p className="text-2xl font-bold text-primary">1</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{application.property}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {application.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {application.rent}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Move-in: {new Date(application.moveInDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          {getStatusBadge(application.status)}
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Application Progress</span>
                              <span className="text-sm text-muted-foreground">{application.progress}%</span>
                            </div>
                            <Progress value={application.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Applied:</span>
                              <span className="ml-2">{new Date(application.applicationDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Landlord:</span>
                              <span className="ml-2">{application.landlord}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">{application.nextStep}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Landlord
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Saved Listings</h2>
                <p className="text-muted-foreground">Properties you've bookmarked for later</p>
              </div>
              <Badge variant="secondary">{savedListings.length} saved</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedListings.map((listing) => (
                <Card key={listing.id} className="card-hover">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{listing.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {listing.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {listing.rent}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-muted-foreground">Saved {listing.savedDate}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" className="btn-hero">Apply</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationsPage;