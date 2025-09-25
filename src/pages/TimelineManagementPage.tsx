import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BrandBar from '@/components/BrandBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  Plus,
  Edit,
  Trash2,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  RefreshCw,
  Download,
  Share2,
  Bell,
  BellOff,
  Settings,
  Eye,
  EyeOff,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Home,
  User,
  Users,
  Building,
  DollarSign,
  CreditCard,
  FileCheck,
  FileX,
  Upload,
  Download as DownloadIcon,
  Send,
  Archive,
  Flag,
  Star,
  Heart,
  Bookmark,
  Copy,
  Link,
  Lock,
  Unlock,
  Shield,
  Zap,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Timer,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Pentagon,
  Diamond,
  Heart as HeartIcon,
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  Flag as FlagIcon,
  Copy as CopyIcon,
  Share2 as Share2Icon,
  Link as LinkIcon,
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  BarChart3 as BarChart3Icon,
  PieChart as PieChartIcon,
  Activity as ActivityIcon,
  Timer as TimerIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  Square as SquareIcon,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Hexagon as HexagonIcon,
  Octagon as OctagonIcon,
  Pentagon as PentagonIcon,
  Diamond as DiamondIcon
} from 'lucide-react';

const TimelineManagementPage = () => {
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [showAddEventDialog, setShowAddEventDialog] = useState(false);
  const [showEventDetailDialog, setShowEventDetailDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock timeline data
  const applications = [
    {
      id: 1,
      property: 'Downtown Studio Apartment',
      location: '2847 Telegraph Ave, Berkeley, CA',
      status: 'in_progress',
      progress: 75,
      currentStep: 'Background Check',
      totalSteps: 6,
      completedSteps: 4,
      timeline: [
        {
          id: 1,
          title: 'Application Submitted',
          description: 'Your application was successfully submitted and is under review',
          date: '2024-01-15T10:30:00Z',
          status: 'completed',
          type: 'application',
          priority: 'high',
          estimatedDuration: '1 hour',
          actualDuration: '45 minutes',
          assignedTo: 'System',
          notes: 'All required documents uploaded',
          attachments: ['application.pdf', 'id_verification.pdf'],
          nextAction: null,
          completedBy: 'System',
          completedAt: '2024-01-15T11:15:00Z'
        },
        {
          id: 2,
          title: 'Initial Review',
          description: 'Application passed initial screening and document verification',
          date: '2024-01-16T09:00:00Z',
          status: 'completed',
          type: 'review',
          priority: 'high',
          estimatedDuration: '2 hours',
          actualDuration: '1.5 hours',
          assignedTo: 'Property Management Team',
          notes: 'All documents verified, income requirements met',
          attachments: ['review_report.pdf'],
          nextAction: 'Schedule background check',
          completedBy: 'Sarah Johnson',
          completedAt: '2024-01-16T10:30:00Z'
        },
        {
          id: 3,
          title: 'Document Verification',
          description: 'All submitted documents have been verified and approved',
          date: '2024-01-18T14:00:00Z',
          status: 'completed',
          type: 'verification',
          priority: 'medium',
          estimatedDuration: '3 hours',
          actualDuration: '2.5 hours',
          assignedTo: 'Verification Team',
          notes: 'Bank statements, employment verification, and references confirmed',
          attachments: ['verification_report.pdf', 'bank_statements.pdf'],
          nextAction: 'Initiate background check',
          completedBy: 'Mike Chen',
          completedAt: '2024-01-18T16:30:00Z'
        },
        {
          id: 4,
          title: 'Background Check Initiated',
          description: 'Background check has been initiated with third-party service',
          date: '2024-01-20T08:00:00Z',
          status: 'in_progress',
          type: 'background_check',
          priority: 'high',
          estimatedDuration: '3-5 business days',
          actualDuration: null,
          assignedTo: 'Background Check Service',
          notes: 'Waiting for results from Checkr Inc.',
          attachments: ['background_check_request.pdf'],
          nextAction: 'Monitor progress and notify when complete',
          completedBy: null,
          completedAt: null
        },
        {
          id: 5,
          title: 'Interview Scheduled',
          description: 'Virtual interview scheduled with property manager',
          date: '2024-01-25T15:00:00Z',
          status: 'pending',
          type: 'interview',
          priority: 'high',
          estimatedDuration: '30 minutes',
          actualDuration: null,
          assignedTo: 'Property Manager',
          notes: 'Interview will cover lifestyle preferences and expectations',
          attachments: ['interview_invite.pdf'],
          nextAction: 'Send reminder 24 hours before',
          completedBy: null,
          completedAt: null
        },
        {
          id: 6,
          title: 'Final Decision',
          description: 'Final approval decision will be made based on all factors',
          date: '2024-01-30T17:00:00Z',
          status: 'pending',
          type: 'decision',
          priority: 'high',
          estimatedDuration: '1 hour',
          actualDuration: null,
          assignedTo: 'Property Management Team',
          notes: 'Decision will be communicated within 24 hours',
          attachments: [],
          nextAction: 'Review all materials and make final decision',
          completedBy: null,
          completedAt: null
        }
      ]
    },
    {
      id: 2,
      property: 'Campus View Apartments',
      location: '123 University Ave, Berkeley, CA',
      status: 'approved',
      progress: 100,
      currentStep: 'Completed',
      totalSteps: 5,
      completedSteps: 5,
      timeline: [
        {
          id: 1,
          title: 'Application Submitted',
          description: 'Application submitted successfully',
          date: '2024-01-10T09:00:00Z',
          status: 'completed',
          type: 'application',
          priority: 'high',
          estimatedDuration: '1 hour',
          actualDuration: '30 minutes',
          assignedTo: 'System',
          notes: 'Quick submission with all documents',
          attachments: ['application.pdf'],
          nextAction: null,
          completedBy: 'System',
          completedAt: '2024-01-10T09:30:00Z'
        },
        {
          id: 2,
          title: 'Review Completed',
          description: 'Application approved after review',
          date: '2024-01-12T11:00:00Z',
          status: 'completed',
          type: 'review',
          priority: 'high',
          estimatedDuration: '2 hours',
          actualDuration: '1 hour',
          assignedTo: 'Property Management Team',
          notes: 'Excellent candidate, fast-tracked approval',
          attachments: ['approval_letter.pdf'],
          nextAction: 'Prepare lease documents',
          completedBy: 'Lisa Wang',
          completedAt: '2024-01-12T12:00:00Z'
        },
        {
          id: 3,
          title: 'Lease Signed',
          description: 'Lease agreement signed and executed',
          date: '2024-01-15T14:00:00Z',
          status: 'completed',
          type: 'lease',
          priority: 'high',
          estimatedDuration: '1 hour',
          actualDuration: '45 minutes',
          assignedTo: 'Legal Team',
          notes: 'All terms agreed upon',
          attachments: ['signed_lease.pdf'],
          nextAction: 'Schedule move-in',
          completedBy: 'Legal Team',
          completedAt: '2024-01-15T14:45:00Z'
        },
        {
          id: 4,
          title: 'Move-in Scheduled',
          description: 'Move-in date confirmed and scheduled',
          date: '2024-01-20T10:00:00Z',
          status: 'completed',
          type: 'move_in',
          priority: 'medium',
          estimatedDuration: '30 minutes',
          actualDuration: '20 minutes',
          assignedTo: 'Property Manager',
          notes: 'Keys and welcome package prepared',
          attachments: ['move_in_checklist.pdf'],
          nextAction: 'Conduct move-in inspection',
          completedBy: 'Property Manager',
          completedAt: '2024-01-20T10:20:00Z'
        },
        {
          id: 5,
          title: 'Application Approved',
          description: 'Application fully approved and tenant confirmed',
          date: '2024-01-22T16:00:00Z',
          status: 'completed',
          type: 'approval',
          priority: 'high',
          estimatedDuration: '15 minutes',
          actualDuration: '10 minutes',
          assignedTo: 'Property Management Team',
          notes: 'Welcome to your new home!',
          attachments: ['welcome_package.pdf'],
          nextAction: null,
          completedBy: 'Property Management Team',
          completedAt: '2024-01-22T16:10:00Z'
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="default" className="bg-blue-500">In Progress</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="text-xs">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary" className="text-xs">Low</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{priority}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <FileText className="w-4 h-4" />;
      case 'review':
        return <Eye className="w-4 h-4" />;
      case 'verification':
        return <CheckCircle className="w-4 h-4" />;
      case 'background_check':
        return <Shield className="w-4 h-4" />;
      case 'interview':
        return <MessageSquare className="w-4 h-4" />;
      case 'decision':
        return <Target className="w-4 h-4" />;
      case 'lease':
        return <FileCheck className="w-4 h-4" />;
      case 'move_in':
        return <Home className="w-4 h-4" />;
      case 'approval':
        return <Star className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    if (sortBy === 'date') {
      const aDate = new Date(a.timeline[0]?.date || 0);
      const bDate = new Date(b.timeline[0]?.date || 0);
      return sortOrder === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
    }
    if (sortBy === 'progress') {
      return sortOrder === 'asc' ? a.progress - b.progress : b.progress - a.progress;
    }
    return 0;
  });

  const handleViewEvent = (event: any) => {
    setSelectedEvent(event);
    setShowEventDetailDialog(true);
  };

  const handleAddEvent = () => {
    setShowAddEventDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Timeline Management" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/applications')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Timeline Management</h1>
            <p className="text-muted-foreground">Track and manage application progress across all properties</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleAddEvent}>
              <Plus className="w-4 h-4 mr-2" />
              Add Event
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold text-primary">{applications.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-blue-500">{applications.filter(a => a.status === 'in_progress').length}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-green-500">{applications.filter(a => a.status === 'approved').length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Processing Time</p>
                  <p className="text-2xl font-bold text-orange-500">5.2 days</p>
                </div>
                <Timer className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 gap-4 items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="property">Property</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Applications Timeline */}
        <div className="space-y-6">
          {sortedApplications.map((application) => (
            <Card key={application.id} className="card-hover">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{application.property}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {application.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(application.status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedApplication(application.id)}
                    >
                      {selectedApplication === application.id ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{application.progress}% Complete</span>
                  </div>
                  <Progress value={application.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Step</span>
                    <span className="font-medium">{application.currentStep}</span>
                  </div>
                </div>
              </CardHeader>

              {selectedApplication === application.id && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Timeline Events</h4>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Bell className="w-4 h-4 mr-2" />
                          Notifications
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
                      <div className="space-y-6">
                        {application.timeline.map((event, index) => (
                          <div key={event.id} className="relative flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              event.status === 'completed' 
                                ? 'bg-green-500 text-white' 
                                : event.status === 'in_progress'
                                ? 'bg-blue-500 text-white'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {event.status === 'completed' ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : event.status === 'in_progress' ? (
                                <Clock className="w-4 h-4" />
                              ) : (
                                getTypeIcon(event.type)
                              )}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <h5 className="font-semibold text-sm">{event.title}</h5>
                                  {getPriorityBadge(event.priority)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(event.date).toLocaleDateString()}
                                  </span>
                                  {getStatusBadge(event.status)}
                                </div>
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                <div className="space-y-1">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Type:</span>
                                    <span className="capitalize">{event.type.replace('_', ' ')}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Assigned to:</span>
                                    <span>{event.assignedTo}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Duration:</span>
                                    <span>{event.actualDuration || event.estimatedDuration}</span>
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  {event.completedBy && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Completed by:</span>
                                      <span>{event.completedBy}</span>
                                    </div>
                                  )}
                                  {event.completedAt && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Completed at:</span>
                                      <span>{new Date(event.completedAt).toLocaleString()}</span>
                                    </div>
                                  )}
                                  {event.nextAction && (
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Next action:</span>
                                      <span className="text-blue-600">{event.nextAction}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {event.notes && (
                                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">Notes:</p>
                                  <p className="text-xs">{event.notes}</p>
                                </div>
                              )}

                              {event.attachments && event.attachments.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs font-medium text-muted-foreground mb-2">Attachments:</p>
                                  <div className="flex flex-wrap gap-1">
                                    {event.attachments.map((attachment, idx) => (
                                      <Badge key={idx} variant="outline" className="text-xs">
                                        <FileText className="w-3 h-3 mr-1" />
                                        {attachment}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex items-center gap-2 mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewEvent(event)}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  View Details
                                </Button>
                                {event.status === 'pending' && (
                                  <Button variant="outline" size="sm">
                                    <Edit className="w-3 h-3 mr-1" />
                                    Edit
                                  </Button>
                                )}
                                <Button variant="outline" size="sm">
                                  <Bell className="w-3 h-3 mr-1" />
                                  Notify
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Add Event Dialog */}
        <Dialog open={showAddEventDialog} onOpenChange={setShowAddEventDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Timeline Event</DialogTitle>
              <DialogDescription>Create a new event in the application timeline</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Application</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select application" />
                    </SelectTrigger>
                    <SelectContent>
                      {applications.map((app) => (
                        <SelectItem key={app.id} value={app.id.toString()}>
                          {app.property}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Event Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="application">Application</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="verification">Verification</SelectItem>
                      <SelectItem value="background_check">Background Check</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="decision">Decision</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label>Event Title</Label>
                <Input placeholder="Enter event title" />
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Enter event description" rows={3} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Assigned To</Label>
                  <Input placeholder="Enter assignee" />
                </div>
              </div>
              
              <div>
                <Label>Estimated Duration</Label>
                <Input placeholder="e.g., 2 hours, 1 day" />
              </div>
              
              <div>
                <Label>Notes</Label>
                <Textarea placeholder="Additional notes or instructions" rows={2} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddEventDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAddEventDialog(false)}>
                Add Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Event Detail Dialog */}
        <Dialog open={showEventDetailDialog} onOpenChange={setShowEventDetailDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.title}</DialogTitle>
              <DialogDescription>Detailed view of timeline event</DialogDescription>
            </DialogHeader>
            {selectedEvent && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Event Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          {getStatusBadge(selectedEvent.status)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span className="capitalize">{selectedEvent.type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Priority:</span>
                          {getPriorityBadge(selectedEvent.priority)}
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{new Date(selectedEvent.date).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Assigned to:</span>
                          <span>{selectedEvent.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Timing</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Estimated Duration:</span>
                          <span>{selectedEvent.estimatedDuration}</span>
                        </div>
                        {selectedEvent.actualDuration && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Actual Duration:</span>
                            <span>{selectedEvent.actualDuration}</span>
                          </div>
                        )}
                        {selectedEvent.completedAt && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Completed at:</span>
                            <span>{new Date(selectedEvent.completedAt).toLocaleString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
                
                {selectedEvent.notes && (
                  <div>
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <p className="text-sm text-muted-foreground">{selectedEvent.notes}</p>
                  </div>
                )}
                
                {selectedEvent.nextAction && (
                  <div>
                    <h4 className="font-semibold mb-2">Next Action</h4>
                    <p className="text-sm text-blue-600">{selectedEvent.nextAction}</p>
                  </div>
                )}
                
                {selectedEvent.attachments && selectedEvent.attachments.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Attachments</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.attachments.map((attachment, idx) => (
                        <Badge key={idx} variant="outline" className="cursor-pointer">
                          <FileText className="w-3 h-3 mr-1" />
                          {attachment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEventDetailDialog(false)}>
                Close
              </Button>
              <Button>
                <Edit className="w-4 h-4 mr-2" />
                Edit Event
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TimelineManagementPage;
