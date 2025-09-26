import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BrandBar from '@/components/BrandBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
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
  Filter,
  Search,
  Plus,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Building,
  Home,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Shield,
  Heart,
  Bookmark,
  Share2,
  Copy,
  Send,
  Archive,
  Flag,
  Settings,
  Bell
} from 'lucide-react';

const applicationSchema = z.object({
  // Applicant Information
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().min(7, 'Enter a valid phone'),
  university: z.string().min(1, 'University is required'),
  studentId: z.string().min(1, 'Student ID is required'),
  // References
  refName: z.string().min(1, 'Reference name is required'),
  refRelationship: z.string().min(1, 'Relationship is required'),
  refPhone: z.string().min(7, 'Reference phone is required'),
  refEmail: z.string().email('Enter a valid email'),
  // Financial
  monthlyBudget: z.string().min(1, 'Monthly budget is required'),
  incomeSource: z.string().min(1, 'Income source is required'),
  guarantor: z.string().optional(),
  // Housing history
  prevAddress: z.string().optional(),
  livingExperience: z.string().optional(),
  landlordName: z.string().optional(),
  landlordPhone: z.string().optional(),
  // Roommate compatibility
  cleanliness: z.string().min(1, 'Select cleanliness level'),
  noiseTolerance: z.string().min(1, 'Select noise tolerance'),
  sleepSchedule: z.string().min(1, 'Select sleep schedule'),
  allergies: z.string().optional(),
  // Move-in timeline
  targetMoveIn: z.string().min(1, 'Select timeline'),
  stayLength: z.string().min(1, 'Select expected stay length'),
  notes: z.string().optional(),
  // Supporting documents
  idUpload: z.any().optional(),
  financialDocs: z.any().optional(),
  enrollmentProof: z.any().optional(),
  backgroundCheckConsent: z.boolean().default(false).refine(v => v === true, { message: 'Authorization required' }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showApplicationDetail, setShowApplicationDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [summary, setSummary] = useState<any>({ total: 0, pending: 0, approved: 0, rejected: 0, successRate: 0 });

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '', university: '', studentId: '',
      refName: '', refRelationship: '', refPhone: '', refEmail: '',
      monthlyBudget: '', incomeSource: '', guarantor: '',
      prevAddress: '', livingExperience: '', landlordName: '', landlordPhone: '',
      cleanliness: '', noiseTolerance: '', sleepSchedule: '', allergies: '',
      targetMoveIn: '', stayLength: '', notes: '',
      backgroundCheckConsent: false,
    }
  });

  const [apps, setApps] = useState<any[]>([]);
  const onSubmit = async (values: ApplicationFormValues) => {
    try {
      const baseUrl = (import.meta as any).env?.VITE_API_URL || `${location.protocol}//${location.hostname}:8080`;
      const token = localStorage.getItem('auth_token') || '';
      const res = await fetch(`${baseUrl}/student/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          applicant: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            university: values.university,
            studentId: values.studentId
          },
          property: `${values.firstName} ${values.lastName} Application`,
          location: values.university,
          rent: `$${values.monthlyBudget}/month`,
          moveInDate: values.targetMoveIn,
          references: {
            refName: values.refName,
            refRelationship: values.refRelationship,
            refPhone: values.refPhone,
            refEmail: values.refEmail
          },
          financial: {
            monthlyBudget: values.monthlyBudget,
            incomeSource: values.incomeSource,
            guarantor: values.guarantor || ''
          },
          history: {
            prevAddress: values.prevAddress || '',
            livingExperience: values.livingExperience || '',
            landlordName: values.landlordName || '',
            landlordPhone: values.landlordPhone || ''
          },
          compatibilityInfo: {
            cleanliness: values.cleanliness,
            noiseTolerance: values.noiseTolerance,
            sleepSchedule: values.sleepSchedule,
            allergies: values.allergies || ''
          },
          notes: values.notes || '',
          amenities: ['Wifi','Laundry']
        })
      });
      if (!res.ok) throw new Error('Failed to submit application');
      toast({ title: 'Application submitted', description: 'Your application was submitted successfully.' });
      await loadApplications();
    } catch (e: any) {
      toast({ title: 'Submission failed', description: e.message, variant: 'destructive' as any });
    }
  };

  const loadApplications = async () => {
    const baseUrl = (import.meta as any).env?.VITE_API_URL || `${location.protocol}//${location.hostname}:8080`;
    const token = localStorage.getItem('auth_token') || '';
    try {
      const endpoint = statusFilter === 'all' ? '/student/applications' : '/student/applications/active';
      const res = await fetch(`${baseUrl}${endpoint}`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load applications');
      const data = await res.json();
      setApps(data.items || []);
    } catch {}
  };

  const loadSummary = async () => {
    const baseUrl = (import.meta as any).env?.VITE_API_URL || `${location.protocol}//${location.hostname}:8080`;
    const token = localStorage.getItem('auth_token') || '';
    try {
      const res = await fetch(`${baseUrl}/student/applications/summary`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to load summary');
      const data = await res.json();
      setSummary(data);
    } catch {}
  };

  useEffect(() => { loadApplications(); loadSummary(); }, [statusFilter]);

  const handleViewApplication = (application: any) => {
    setSelectedApplication(application);
    setShowApplicationDetail(true);
  };

  const handleWithdrawApplication = (applicationId: number) => {
    toast({ title: 'Application Withdrawn', description: 'Your application has been withdrawn successfully.' });
    setShowWithdrawDialog(false);
  };

  const handleUpdateApplication = (applicationId: number) => {
    setShowUpdateDialog(true);
  };
  const applications = [
    {
      id: 1,
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
      amenities: ['Wifi', 'Laundry', 'Parking', 'Gym'],
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop'],
      timeline: [
        { date: '2024-01-15', event: 'Application submitted', status: 'completed' },
        { date: '2024-01-16', event: 'Initial review', status: 'completed' },
        { date: '2024-01-18', event: 'Document verification', status: 'completed' },
        { date: '2024-01-20', event: 'Background check', status: 'in_progress' },
        { date: '2024-01-25', event: 'Interview scheduled', status: 'pending' },
        { date: '2024-01-30', event: 'Final decision', status: 'pending' }
      ],
      documents: [
        { name: 'ID Verification', status: 'approved', uploaded: '2024-01-15' },
        { name: 'Financial Statement', status: 'approved', uploaded: '2024-01-15' },
        { name: 'Enrollment Proof', status: 'pending', uploaded: '2024-01-16' }
      ],
      messages: [
        { from: 'landlord', message: 'Thank you for your application. We will review it within 2 business days.', time: '2024-01-15 14:30' },
        { from: 'you', message: 'I have uploaded all required documents. Please let me know if you need anything else.', time: '2024-01-16 09:15' }
      ]
    },
    {
      id: 2,
      property: 'Shared 2BR Near Campus',
      location: '1234 Durant Ave, Berkeley, CA',
      rent: '$900/month',
      applicationDate: '2024-01-10',
      status: 'approved',
      landlord: 'Jane Smith',
      landlordEmail: 'jane.smith@email.com',
      landlordPhone: '(555) 987-6543',
      moveInDate: '2024-08-15',
      progress: 100,
      nextStep: 'Sign lease agreement',
      priority: 'medium',
      compatibility: 88,
      amenities: ['Wifi', 'Kitchen', 'Study Room', 'Balcony'],
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'],
      timeline: [
        { date: '2024-01-10', event: 'Application submitted', status: 'completed' },
        { date: '2024-01-11', event: 'Initial review', status: 'completed' },
        { date: '2024-01-12', event: 'Document verification', status: 'completed' },
        { date: '2024-01-13', event: 'Background check', status: 'completed' },
        { date: '2024-01-14', event: 'Interview completed', status: 'completed' },
        { date: '2024-01-15', event: 'Application approved', status: 'completed' }
      ],
      documents: [
        { name: 'ID Verification', status: 'approved', uploaded: '2024-01-10' },
        { name: 'Financial Statement', status: 'approved', uploaded: '2024-01-10' },
        { name: 'Enrollment Proof', status: 'approved', uploaded: '2024-01-11' }
      ],
      messages: [
        { from: 'landlord', message: 'Congratulations! Your application has been approved. Please review the lease agreement.', time: '2024-01-15 16:45' },
        { from: 'you', message: 'Thank you! I will review the lease and get back to you by tomorrow.', time: '2024-01-15 17:20' }
      ]
    },
    {
      id: 3,
      property: 'Modern 3BR House',
      location: '5678 Ashby Ave, Berkeley, CA',
      rent: '$800/month (shared)',
      applicationDate: '2024-01-12',
      status: 'rejected',
      landlord: 'ABC Properties',
      landlordEmail: 'applications@abcproperties.com',
      landlordPhone: '(555) 456-7890',
      moveInDate: '2024-08-01',
      progress: 50,
      nextStep: 'Application declined',
      priority: 'low',
      compatibility: 75,
      amenities: ['Wifi', 'Garden', 'Parking', 'Pet-friendly'],
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'],
      timeline: [
        { date: '2024-01-12', event: 'Application submitted', status: 'completed' },
        { date: '2024-01-13', event: 'Initial review', status: 'completed' },
        { date: '2024-01-14', event: 'Document verification', status: 'failed' },
        { date: '2024-01-15', event: 'Application declined', status: 'completed' }
      ],
      documents: [
        { name: 'ID Verification', status: 'approved', uploaded: '2024-01-12' },
        { name: 'Financial Statement', status: 'rejected', uploaded: '2024-01-12' },
        { name: 'Enrollment Proof', status: 'approved', uploaded: '2024-01-13' }
      ],
      messages: [
        { from: 'landlord', message: 'Unfortunately, we cannot proceed with your application due to incomplete financial documentation.', time: '2024-01-15 11:30' },
        { from: 'you', message: 'I understand. Thank you for considering my application.', time: '2024-01-15 12:15' }
      ]
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="applications">Active Applications</TabsTrigger>
            <TabsTrigger value="apply">New Application</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="communications">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            {/* Search and Filter Bar */}
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => { loadApplications(); loadSummary(); }}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Application
                  </Button>
                </div>
              </div>
            </Card>

            {/* Application Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                      <p className="text-2xl font-bold text-primary">{summary.total}</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                      <p className="text-2xl font-bold text-orange-500">{summary.pending}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Approved</p>
                      <p className="text-2xl font-bold text-green-500">{summary.approved}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                      <p className="text-2xl font-bold text-blue-500">{summary.successRate}%</p>
                    </div>
                    <Star className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
              {(apps.length ? apps : applications)
                .filter(app => 
                  (statusFilter === 'all' || app.status === statusFilter) &&
                  (searchQuery === '' || app.property.toLowerCase().includes(searchQuery.toLowerCase()) || app.location.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((application) => (
                <Card key={application.id} className="card-hover group">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Property Image */}
                      <div className="w-full lg:w-48 h-32 lg:h-40 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={application.images[0]} 
                          alt={application.property}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      {/* Main Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-xl font-semibold">{application.property}</h3>
                              {application.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">High Priority</Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {application.compatibility}% Match
                              </Badge>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-2">
                              {application.amenities.slice(0, 4).map((amenity, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                              {application.amenities.length > 4 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{application.amenities.length - 4} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {getStatusBadge(application.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewApplication(application)}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleUpdateApplication(application.id)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Update Application
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Contact Landlord
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download Documents
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => setShowWithdrawDialog(true)}
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Withdraw Application
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        
                        {/* Progress and Status */}
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Application Progress</span>
                              <span className="text-sm text-muted-foreground">{application.progress}%</span>
                            </div>
                            <Progress value={application.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Applied:</span>
                              <span className="ml-2 font-medium">{new Date(application.applicationDate).toLocaleDateString()}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Landlord:</span>
                              <span className="ml-2 font-medium">{application.landlord}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Priority:</span>
                              <span className="ml-2 font-medium capitalize">{application.priority}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm font-medium">{application.nextStep}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 lg:w-32">
                        <Button 
                          onClick={() => handleViewApplication(application)}
                          className="w-full"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" className="w-full">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apply" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">New Application</h2>
                <p className="text-muted-foreground">Create a comprehensive housing application</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Form
                </Button>
                <Button size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
              </div>
            </div>

            {/* Application Progress */}
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Application Progress</span>
                  <span>0% Complete</span>
                </div>
                <Progress value={0} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Complete all required sections to submit your application
                </p>
              </div>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">Housing Application Form</CardTitle>
                    <CardDescription>Complete all sections and upload supporting documents</CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    Estimated time: 10-15 minutes
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="applicant-info">
                        <AccordionTrigger>Applicant Information</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="firstName" render={({ field }) => (
                              <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Sarah" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="lastName" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Lee" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="sarah@university.edu" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="university" render={({ field }) => (
                              <FormItem>
                                <FormLabel>University</FormLabel>
                                <FormControl>
                                  <Input placeholder="UC Berkeley" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="studentId" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Student ID</FormLabel>
                                <FormControl>
                                  <Input placeholder="12345678" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="references">
                        <AccordionTrigger>References & Contact</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="refName" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reference name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jane Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="refRelationship" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Relationship</FormLabel>
                                <FormControl>
                                  <Input placeholder="Advisor / Landlord / Employer" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="refPhone" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reference phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 987-6543" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="refEmail" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reference email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="jane@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="financial">
                        <AccordionTrigger>Financial Capability</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="monthlyBudget" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Monthly budget (USD)</FormLabel>
                                <FormControl>
                                  <Input placeholder="1200" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="incomeSource" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Income source</FormLabel>
                                <FormControl>
                                  <Input placeholder="Family support / Part-time job / Scholarship" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="guarantor" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Guarantor (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Parent or sponsor name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="history">
                        <AccordionTrigger>Housing History & Experience</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="prevAddress" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Previous address</FormLabel>
                                <FormControl>
                                  <Input placeholder="Last residence" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="livingExperience" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Shared living experience</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Briefly describe your housing experience" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="landlordName" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Previous landlord name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Smith" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="landlordPhone" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Previous landlord phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="(555) 555-1234" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="compatibility">
                        <AccordionTrigger>Roommate Compatibility</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="cleanliness" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cleanliness</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="very_tidy">Very tidy</SelectItem>
                                      <SelectItem value="tidy">Tidy</SelectItem>
                                      <SelectItem value="casual">Casual</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="noiseTolerance" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Noise tolerance</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select tolerance" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="quiet">Quiet only</SelectItem>
                                      <SelectItem value="moderate">Moderate</SelectItem>
                                      <SelectItem value="lively">Lively OK</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="sleepSchedule" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sleep schedule</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select schedule" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="early">Early sleeper</SelectItem>
                                      <SelectItem value="regular">Regular</SelectItem>
                                      <SelectItem value="late">Night owl</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="allergies" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Allergies or sensitivities</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., pets, smoke, fragrances" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="timeline">
                        <AccordionTrigger>Move-in Timeline</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="targetMoveIn" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Target move-in</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select timeframe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="immediate">Immediate</SelectItem>
                                      <SelectItem value="30days">Within 30 days</SelectItem>
                                      <SelectItem value="60days">60-90 days</SelectItem>
                                      <SelectItem value="semester">Next semester</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="stayLength" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expected stay length</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="semester">1 semester</SelectItem>
                                      <SelectItem value="year">Academic year</SelectItem>
                                      <SelectItem value="long">12+ months</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <div className="mt-4">
                            <FormField control={form.control} name="notes" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Notes for landlord (optional)</FormLabel>
                                <FormControl>
                                  <Textarea placeholder="Anything else they should know?" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="documents">
                        <AccordionTrigger>Supporting Documents</AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="idUpload" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Identity verification (ID/Passport)</FormLabel>
                                <FormControl>
                                  <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="financialDocs" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Financial documentation</FormLabel>
                                <FormControl>
                                  <Input type="file" multiple onChange={(e) => field.onChange(e.target.files)} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="enrollmentProof" render={({ field }) => (
                              <FormItem>
                                <FormLabel>Academic enrollment proof</FormLabel>
                                <FormControl>
                                  <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )} />
                          </div>
                          <div className="mt-4">
                            <FormField
                              control={form.control}
                              name="backgroundCheckConsent"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                  <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel>Authorize background check</FormLabel>
                                    <p className="text-xs text-muted-foreground">I consent to a background check as part of my application.</p>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="flex justify-end gap-3">
                      <Button type="reset" variant="outline" onClick={() => form.reset()}>Reset</Button>
                      <Button type="submit" className="btn-hero">Submit Application</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Application Timeline</h2>
                <p className="text-muted-foreground">Track the progress of all your applications</p>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="space-y-6">
              {applications.map((application) => (
                <Card key={application.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{application.property}</CardTitle>
                        <CardDescription>{application.location}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(application.status)}
                        <Badge variant="outline">{application.compatibility}% Match</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted"></div>
                      <div className="space-y-6">
                        {application.timeline.map((step, index) => (
                          <div key={index} className="relative flex items-start gap-4">
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
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{step.event}</h4>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(step.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {step.status === 'completed' && 'Completed successfully'}
                                {step.status === 'in_progress' && 'Currently in progress'}
                                {step.status === 'pending' && 'Awaiting processing'}
                                {step.status === 'failed' && 'Requires attention'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Document Management</h2>
                <p className="text-muted-foreground">Upload and manage your application documents</p>
              </div>
              <Button size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {applications.map((application) => (
                <Card key={application.id} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-lg">{application.property}</CardTitle>
                    <CardDescription>{application.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {application.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Uploaded {new Date(doc.uploaded).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={doc.status === 'approved' ? 'default' : doc.status === 'rejected' ? 'destructive' : 'secondary'}
                            >
                              {doc.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Application Progress</CardTitle>
                  <CardDescription>Overall completion and current stage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm"><span>Downtown Studio</span><span>75%</span></div>
                    <Progress value={75} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm"><span>Shared 2BR Near Campus</span><span>100%</span></div>
                    <Progress value={100} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2 text-sm"><span>Modern 3BR House</span><span>50%</span></div>
                    <Progress value={50} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Timeline & Interviews</CardTitle>
                  <CardDescription>Upcoming events and milestones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Viewing: Tomorrow, 2:00 PM</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Interview: Friday, 4:30 PM</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Response expected by: Oct 5</div>
                  <div className="flex items-center gap-2"><AlertCircle className="w-4 h-4 text-primary" /> Next step: Background check</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Decision Status</CardTitle>
                  <CardDescription>Manage outcomes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Shared 2BR Near Campus</span>
                    <Badge className="bg-green-500">Accepted</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Modern 3BR House</span>
                    <Badge variant="destructive">Rejected</Badge>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <Button size="sm" variant="outline"><CheckCircle className="w-4 h-4 mr-1" /> Accept Offer</Button>
                    <Button size="sm" variant="outline"><XCircle className="w-4 h-4 mr-1" /> Decline</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Alternative Suggestions</CardTitle>
                <CardDescription>Similar options you may like</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Quiet 1BR Near Library', 'Sunny Studio by Park', 'Affordable Room in 4BR'].map((title, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{title}</h4>
                        <Badge variant="secondary">Alt</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Walkable • In-unit laundry</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">$1,050/mo</span>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communications" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Messages & Communications</h2>
                <p className="text-muted-foreground">Stay connected with landlords and property managers</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Message
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Conversations</CardTitle>
                  <CardDescription>Your active conversations</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-96">
                    <div className="space-y-1">
                      {applications.map((app) => (
                        <div key={app.id} className="p-4 border-b hover:bg-muted/50 cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {app.landlord.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-sm truncate">{app.landlord}</h4>
                                <span className="text-xs text-muted-foreground">
                                  {app.messages[app.messages.length - 1]?.time.split(' ')[1]}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                {app.property}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {app.messages[app.messages.length - 1]?.message}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Badge variant="outline" className="text-xs">
                                {app.status}
                              </Badge>
                              {app.messages.some(m => m.from === 'landlord') && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Property Management Co.</CardTitle>
                      <CardDescription>Downtown Studio Apartment</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-80 p-4">
                    <div className="space-y-4">
                      {applications[0].messages.map((message, index) => (
                        <div key={index} className={`flex ${message.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs p-3 rounded-lg ${
                            message.from === 'you' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input placeholder="Type a message..." />
                      <Button size="sm">
                        <Send className="w-4 h-4 mr-2" />
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="card-hover">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Schedule Viewing</h3>
                  <p className="text-sm text-muted-foreground mb-3">Book property tours</p>
                  <Button size="sm" className="w-full">Schedule</Button>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Document Sharing</h3>
                  <p className="text-sm text-muted-foreground mb-3">Upload files securely</p>
                  <Button size="sm" variant="outline" className="w-full">Upload</Button>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Quick Questions</h3>
                  <p className="text-sm text-muted-foreground mb-3">Ask about property details</p>
                  <Button size="sm" variant="outline" className="w-full">Ask</Button>
                </CardContent>
              </Card>

              <Card className="card-hover">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-1">Notifications</h3>
                  <p className="text-sm text-muted-foreground mb-3">Manage alerts</p>
                  <Button size="sm" variant="outline" className="w-full">Settings</Button>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'message', title: 'New message from Jane Smith', time: '2 hours ago', icon: MessageSquare, color: 'text-blue-600' },
                    { type: 'document', title: 'Document approved: Financial Statement', time: '4 hours ago', icon: FileText, color: 'text-green-600' },
                    { type: 'schedule', title: 'Viewing scheduled for tomorrow', time: '1 day ago', icon: Calendar, color: 'text-purple-600' },
                    { type: 'status', title: 'Application status updated', time: '2 days ago', icon: CheckCircle, color: 'text-orange-600' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Application Detail Dialog */}
        <Dialog open={showApplicationDetail} onOpenChange={setShowApplicationDetail}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedApplication?.property}</DialogTitle>
              <DialogDescription>{selectedApplication?.location}</DialogDescription>
            </DialogHeader>
            
            {selectedApplication && (
              <div className="space-y-6">
                {/* Property Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={selectedApplication.images[0]} 
                        alt={selectedApplication.property}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="font-semibold">{selectedApplication.rent}</p>
                        <p className="text-sm text-muted-foreground">Monthly Rent</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="font-semibold">{new Date(selectedApplication.moveInDate).toLocaleDateString()}</p>
                        <p className="text-sm text-muted-foreground">Move-in Date</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Landlord Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedApplication.landlord}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedApplication.landlordEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedApplication.landlordPhone}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary">{amenity}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Timeline */}
                <div>
                  <h3 className="font-semibold mb-4">Application Timeline</h3>
                  <div className="space-y-4">
                    {selectedApplication.timeline.map((step, index) => (
                      <div key={index} className="flex items-center gap-4">
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
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{step.event}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(step.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {step.status === 'completed' && 'Completed successfully'}
                            {step.status === 'in_progress' && 'Currently in progress'}
                            {step.status === 'pending' && 'Awaiting processing'}
                            {step.status === 'failed' && 'Requires attention'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div>
                  <h3 className="font-semibold mb-4">Messages</h3>
                  <ScrollArea className="h-48 border rounded-lg p-4">
                    <div className="space-y-3">
                      {selectedApplication.messages.map((message, index) => (
                        <div key={index} className={`flex ${message.from === 'you' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs p-3 rounded-lg ${
                            message.from === 'you' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">{message.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="Type a message..." />
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Withdraw Application Dialog */}
        <Dialog open={showWithdrawDialog} onOpenChange={setShowWithdrawDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Withdraw Application</DialogTitle>
              <DialogDescription>
                Are you sure you want to withdraw this application? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowWithdrawDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => handleWithdrawApplication(1)}>
                Withdraw Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Update Application Dialog */}
        <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Update Application</DialogTitle>
              <DialogDescription>
                Make changes to your application information.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Additional Notes</Label>
                <Textarea placeholder="Add any additional information..." />
              </div>
              <div>
                <Label>Upload Additional Documents</Label>
                <Input type="file" multiple />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowUpdateDialog(false)}>
                Update Application
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ApplicationsPage;