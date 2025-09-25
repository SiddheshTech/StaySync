import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BrandBar from '@/components/BrandBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
  AlertCircle,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Upload,
  FileText,
  Phone,
  Mail,
  Star,
  Building,
  Home,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Shield,
  Heart,
  Share2,
  Send,
  Archive,
  Flag,
  Settings,
  Camera,
  Video,
  Mic,
  Paperclip,
  Smile,
  Plus,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  RefreshCw,
  Bell,
  Lock,
  Unlock,
  Copy,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [showDocumentDialog, setShowDocumentDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Mock application data - in real app, this would come from API
  const application = {
    id: parseInt(id || '1'),
    property: 'Downtown Studio Apartment',
    location: '2847 Telegraph Ave, Berkeley, CA',
    rent: '$1,200/month',
    applicationDate: '2024-01-15',
    status: 'pending',
    landlord: 'Property Management Co.',
    landlordEmail: 'contact@propertymgmt.com',
    landlordPhone: '(555) 123-4567',
    moveInDate: '2024-08-01',
    progress: 75,
    nextStep: 'Background check in progress',
    priority: 'high',
    compatibility: 92,
    amenities: ['Wifi', 'Laundry', 'Parking', 'Gym', 'Pool', 'Concierge'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
    ],
    timeline: [
      { date: '2024-01-15', event: 'Application submitted', status: 'completed', description: 'Your application was successfully submitted' },
      { date: '2024-01-16', event: 'Initial review', status: 'completed', description: 'Application passed initial screening' },
      { date: '2024-01-18', event: 'Document verification', status: 'completed', description: 'All required documents verified' },
      { date: '2024-01-20', event: 'Background check', status: 'in_progress', description: 'Background check is currently being processed' },
      { date: '2024-01-25', event: 'Interview scheduled', status: 'pending', description: 'Interview will be scheduled soon' },
      { date: '2024-01-30', event: 'Final decision', status: 'pending', description: 'Final decision will be made' }
    ],
    documents: [
      { name: 'ID Verification', status: 'approved', uploaded: '2024-01-15', size: '2.3 MB', type: 'PDF' },
      { name: 'Financial Statement', status: 'approved', uploaded: '2024-01-15', size: '1.8 MB', type: 'PDF' },
      { name: 'Enrollment Proof', status: 'pending', uploaded: '2024-01-16', size: '1.2 MB', type: 'PDF' },
      { name: 'Reference Letter', status: 'rejected', uploaded: '2024-01-17', size: '0.9 MB', type: 'PDF' }
    ],
    messages: [
      { from: 'landlord', message: 'Thank you for your application. We will review it within 2 business days.', time: '2024-01-15 14:30', read: true },
      { from: 'you', message: 'I have uploaded all required documents. Please let me know if you need anything else.', time: '2024-01-16 09:15', read: true },
      { from: 'landlord', message: 'Your background check is in progress. We will notify you once it\'s complete.', time: '2024-01-20 11:45', read: false },
      { from: 'you', message: 'Thank you for the update. I\'m looking forward to hearing from you soon.', time: '2024-01-20 15:20', read: true }
    ],
    propertyDetails: {
      bedrooms: 1,
      bathrooms: 1,
      sqft: 650,
      yearBuilt: 2018,
      parking: 'Assigned',
      petPolicy: 'Cats allowed, dogs under 25lbs',
      smoking: 'Non-smoking',
      furnished: 'Unfurnished',
      utilities: 'Water and trash included',
      deposit: '$1,200',
      leaseLength: '12 months'
    },
    neighborhood: {
      walkScore: 85,
      transitScore: 78,
      bikeScore: 92,
      nearby: ['UC Berkeley (0.5 mi)', 'Downtown Berkeley (0.3 mi)', 'BART Station (0.4 mi)'],
      restaurants: 45,
      grocery: 8
    }
  };

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
      case 'completed':
        return <Badge variant="default" className="flex items-center gap-1 bg-green-500">
          <CheckCircle className="w-3 h-3" />
          Completed
        </Badge>;
      case 'in_progress':
        return <Badge variant="default" className="flex items-center gap-1 bg-blue-500">
          <Clock className="w-3 h-3" />
          In Progress
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, this would send message to API
      console.log('Sending message:', newMessage);
      setNewMessage('');
      setShowMessageDialog(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Application Details" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/applications')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">{application.property}</h1>
            <p className="text-muted-foreground">{application.location}</p>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(application.status)}
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="property">Property</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Property Images */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Property Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={application.images[0]} 
                        alt={application.property}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {application.images.slice(1).map((img, index) => (
                        <div key={index} className="aspect-video rounded-lg overflow-hidden bg-muted">
                          <img 
                            src={img} 
                            alt={`${application.property} ${index + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Application Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Application Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      {getStatusBadge(application.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{application.progress}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Priority</span>
                      <Badge variant="outline" className="capitalize">{application.priority}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Compatibility</span>
                      <span className="text-sm font-medium">{application.compatibility}%</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Applied</span>
                      <span className="text-sm font-medium">{new Date(application.applicationDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Move-in Date</span>
                      <span className="text-sm font-medium">{new Date(application.moveInDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rent</span>
                      <span className="text-sm font-medium">{application.rent}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Next Step</h4>
                    <p className="text-sm text-muted-foreground">{application.nextStep}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Landlord Information */}
            <Card>
              <CardHeader>
                <CardTitle>Landlord Information</CardTitle>
                <CardDescription>Contact details for property management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {application.landlord.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{application.landlord}</h4>
                        <p className="text-sm text-muted-foreground">Property Manager</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{application.landlordEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{application.landlordPhone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Property Management Co.</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
                <CardDescription>Track the progress of your application step by step</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
                  <div className="space-y-8">
                    {application.timeline.map((step, index) => (
                      <div key={index} className="relative flex items-start gap-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          step.status === 'completed' 
                            ? 'bg-green-500 text-white' 
                            : step.status === 'in_progress'
                            ? 'bg-blue-500 text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : step.status === 'in_progress' ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <AlertCircle className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-lg">{step.event}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {new Date(step.date).toLocaleDateString()}
                              </span>
                              {getStatusBadge(step.status)}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-3">{step.description}</p>
                          {step.status === 'in_progress' && (
                            <div className="flex items-center gap-2 text-sm text-blue-600">
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Processing...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Document Management</h2>
                <p className="text-muted-foreground">Upload and manage your application documents</p>
              </div>
              <Button onClick={() => setShowDocumentDialog(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {application.documents.map((doc, index) => (
                <Card key={index} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-medium">{doc.name}</h4>
                          <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                        </div>
                      </div>
                      {getStatusBadge(doc.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Uploaded</span>
                        <span>{new Date(doc.uploaded).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Conversation</CardTitle>
                  <CardDescription>Chat with {application.landlord}</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-96">
                    <div className="space-y-4 p-4">
                      {application.messages.map((message, index) => (
                        <div key={index} className={`flex ${message.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs p-3 rounded-lg ${
                            message.from === 'you' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-xs opacity-70">{message.time}</p>
                              {message.from === 'landlord' && !message.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Type a message..." 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button size="sm" onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common communication tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Calendar className="w-6 h-6" />
                      <span>Schedule Viewing</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <FileText className="w-6 h-6" />
                      <span>Share Document</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <MessageSquare className="w-6 h-6" />
                      <span>Ask Question</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col gap-2">
                      <Phone className="w-6 h-6" />
                      <span>Request Call</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Property Tab */}
          <TabsContent value="property" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <Home className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{application.propertyDetails.bedrooms} Bed</p>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <Building className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{application.propertyDetails.bathrooms} Bath</p>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{application.propertyDetails.sqft} sq ft</p>
                      <p className="text-sm text-muted-foreground">Square Feet</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="font-semibold">{application.propertyDetails.yearBuilt}</p>
                      <p className="text-sm text-muted-foreground">Year Built</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Additional Details</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Parking:</span>
                        <span>{application.propertyDetails.parking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pet Policy:</span>
                        <span>{application.propertyDetails.petPolicy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Smoking:</span>
                        <span>{application.propertyDetails.smoking}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Furnished:</span>
                        <span>{application.propertyDetails.furnished}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Utilities:</span>
                        <span>{application.propertyDetails.utilities}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Deposit:</span>
                        <span>{application.propertyDetails.deposit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lease Length:</span>
                        <span>{application.propertyDetails.leaseLength}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Neighborhood</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-primary">{application.neighborhood.walkScore}</p>
                      <p className="text-sm text-muted-foreground">Walk Score</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-primary">{application.neighborhood.transitScore}</p>
                      <p className="text-sm text-muted-foreground">Transit Score</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <p className="text-2xl font-bold text-primary">{application.neighborhood.bikeScore}</p>
                      <p className="text-sm text-muted-foreground">Bike Score</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Nearby Places</h4>
                    <div className="space-y-2">
                      {application.neighborhood.nearby.map((place, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{place}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Local Amenities</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Restaurants:</span>
                        <span>{application.neighborhood.restaurants} nearby</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grocery Stores:</span>
                        <span>{application.neighborhood.grocery} nearby</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
                <CardDescription>Features and facilities available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {application.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                      <Wifi className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Communication
                  </CardTitle>
                  <CardDescription>Stay in touch with the landlord</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Request Viewing
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documents
                  </CardTitle>
                  <CardDescription>Manage your application files</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    View Documents
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Application
                  </CardTitle>
                  <CardDescription>Manage your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Edit className="w-4 h-4 mr-2" />
                    Update Application
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Status
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Withdraw Application
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Message Dialog */}
        <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message</DialogTitle>
              <DialogDescription>Send a message to {application.landlord}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Message</Label>
                <Textarea 
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendMessage}>
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Document Upload Dialog */}
        <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Document</DialogTitle>
              <DialogDescription>Upload a new document for your application</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Select Document Type</Label>
                <select className="w-full p-2 border rounded-md">
                  <option>ID Verification</option>
                  <option>Financial Statement</option>
                  <option>Enrollment Proof</option>
                  <option>Reference Letter</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <Label>Upload File</Label>
                <Input type="file" accept=".pdf,.jpg,.jpeg,.png" />
              </div>
              <div>
                <Label>Description (Optional)</Label>
                <Textarea placeholder="Add a description for this document..." rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowDocumentDialog(false)}>
                Upload Document
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;
