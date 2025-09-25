import { Link } from 'react-router-dom';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
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
  AlertCircle
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

  const onSubmit = (values: ApplicationFormValues) => {
    console.log('Application submitted', values);
    toast({ title: 'Application submitted', description: 'Your application was submitted successfully.' });
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="applications">Active Applications</TabsTrigger>
            <TabsTrigger value="saved">Saved Listings</TabsTrigger>
            <TabsTrigger value="apply">Apply</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
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
          <TabsContent value="apply" className="space-y-6">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>Housing Application</CardTitle>
                <CardDescription>Complete all sections and upload supporting documents</CardDescription>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Direct Messages</CardTitle>
                  <CardDescription>Chat with listers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-48 border rounded-md p-3 overflow-auto text-sm space-y-2">
                    <div><span className="font-medium">You:</span> Hi, is the unit still available?</div>
                    <div><span className="font-medium">Lister:</span> Yes, would you like to schedule a viewing?</div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Write a message..." />
                    <Button><MessageSquare className="w-4 h-4 mr-1" /> Send</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Interview Scheduling</CardTitle>
                  <CardDescription>Propose or confirm slots</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input type="date" />
                    <Input type="time" />
                    <Button>Request Slot</Button>
                  </div>
                  <div className="text-sm text-muted-foreground">Next scheduled: Friday, 4:30 PM</div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Questions & Clarifications</CardTitle>
                  <CardDescription>Ask and track responses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start justify-between border rounded-md p-3">
                      <div>
                        <div className="font-medium">Are utilities included?</div>
                        <div className="text-muted-foreground">Lister: Water and trash included; electricity separate.</div>
                      </div>
                      <Badge variant="secondary">Answered</Badge>
                    </div>
                    <div className="flex items-start justify-between border rounded-md p-3">
                      <div>
                        <div className="font-medium">Is parking available?</div>
                        <div className="text-muted-foreground">Awaiting response</div>
                      </div>
                      <Badge>Pending</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Ask a question..." />
                    <Button>Submit</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Document Sharing</CardTitle>
                  <CardDescription>Send files to listers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input type="file" />
                    <Input placeholder="Description (optional)" />
                    <Button>Share</Button>
                  </div>
                  <div className="text-xs text-muted-foreground">Allowed types: PDF, JPG, PNG. Max 10MB each.</div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Status Notifications</CardTitle>
                  <CardDescription>Recent updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-600" /> Your application for Downtown Studio moved to Background Check.</div>
                  <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-600" /> One document failed verification. Please re-upload.</div>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> Interview confirmed for Friday, 4:30 PM.</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ApplicationsPage;