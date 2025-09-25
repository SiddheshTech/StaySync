import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import BrandBar from '@/components/BrandBar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { 
  ArrowLeft,
  User, 
  GraduationCap, 
  Home, 
  Shield, 
  Settings,
  Camera,
  Check,
  AlertCircle,
  Edit,
  Upload,
  ShieldCheck,
  FileCheck2,
  Lock,
  Eye,
  Globe,
  UserCheck,
  Bell,
  CreditCard,
  Phone,
  Mail
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState(65);
  const [twoFAEnabled, setTwoFAEnabled] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'matches' | 'verified'>('matches');
  const [dob, setDob] = useState<Date | undefined>(new Date('2002-03-15'));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Profile" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profile Management</h1>
            <p className="text-muted-foreground">Manage your profile information and preferences</p>
          </div>
        </div>

        {/* Profile Overview Card */}
        <Card className="mb-8 card-gradient shadow-strong border border-border/50 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24 ring-4 ring-white/60 rounded-full">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">SJ</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0" onClick={() => setShowPhotoDialog(true)}>
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">Sarah Johnson</h2>
                    <p className="text-muted-foreground">Computer Science • Junior • UC Berkeley</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified Student
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Profile 85% Complete
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Profile Completion</p>
                    <Progress value={85} className="w-32 mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 sticky top-4 z-10 bg-background/80 backdrop-blur rounded-xl border p-1">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="academic" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Academic
            </TabsTrigger>
            <TabsTrigger value="lifestyle" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Lifestyle
            </TabsTrigger>
            <TabsTrigger value="housing" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Housing
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Verification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <div className="grid gap-6">
              <Card className="rounded-2xl shadow-medium border border-border/60">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Personal Information
                    <Link to="/profile/edit/personal">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </CardTitle>
                  <CardDescription>Your basic personal details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <Input defaultValue="Sarah Elizabeth Johnson" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <div className="flex items-center gap-2">
                        <Input type="email" defaultValue="sarah.johnson@berkeley.edu" />
                        <Badge variant="secondary" className="flex items-center gap-1"><Mail className="w-3 h-3" /> Verified</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <div className="flex items-center gap-2">
                        <Input defaultValue="(555) 123-4567" />
                        <Badge variant="secondary" className="flex items-center gap-1"><Phone className="w-3 h-3" /> Verified</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Pronouns</label>
                      <Select defaultValue="sheher">
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sheher">She/Her</SelectItem>
                          <SelectItem value="hehim">He/Him</SelectItem>
                          <SelectItem value="theythem">They/Them</SelectItem>
                          <SelectItem value="custom">Prefer to specify</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                      <Calendar selected={dob} onSelect={setDob} mode="single" className="rounded-md border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                      <Input defaultValue="Mary Johnson (Mom) - (555) 987-6543" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Social Media Links</label>
                      <Input defaultValue="@sarahj_codes (Instagram)" />
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <Button className="btn-hero">Save Personal Info</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="mt-6">
            <Card className="rounded-2xl shadow-medium border border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Academic Information
                  <Link to="/profile/edit/academic">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>Your university and academic details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">University</label>
                    <Input defaultValue="University of California, Berkeley" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Major</label>
                    <Input defaultValue="Computer Science" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Minor</label>
                    <Input defaultValue="Mathematics" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                    <Select defaultValue="junior">
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="freshman">Freshman</SelectItem>
                        <SelectItem value="sophomore">Sophomore</SelectItem>
                        <SelectItem value="junior">Junior</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expected Graduation</label>
                    <Input defaultValue="May 2025" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">GPA</label>
                    <Select defaultValue="hide">
                      <SelectTrigger><SelectValue placeholder="Disclosure" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hide">Hide GPA</SelectItem>
                        <SelectItem value="show">Show GPA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Study Abroad Plans</label>
                    <Input defaultValue="Spring 2024 - Edinburgh, Scotland" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Research/Internships</label>
                    <Textarea defaultValue="ML Research Lab, Google Summer Intern 2023" />
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button className="btn-hero">Save Academic Info</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="lifestyle" className="mt-6">
            <Card className="rounded-2xl shadow-medium border border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Lifestyle & Preferences
                  <Link to="/profile/edit/lifestyle">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>Your living habits and compatibility preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Living Habits</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Cleanliness</span>
                        <Badge variant="secondary">Very Clean</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Noise Level</span>
                        <Badge variant="secondary">Quiet</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sleep Schedule</span>
                        <Badge variant="secondary">Early Bird</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Social Level</span>
                        <Badge variant="secondary">Moderately Social</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Interests & Hobbies</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Coding', 'Reading', 'Yoga', 'Hiking', 'Coffee', 'Gaming', 'Movies', 'Music'].map((interest) => (
                        <Badge key={interest} variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Daily Routine</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Wake up:</span>
                      <p>6:30 AM</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Study time:</span>
                      <p>9 AM - 3 PM</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Exercise:</span>
                      <p>4 PM - 5 PM</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Sleep:</span>
                      <p>10:30 PM</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Compatibility Questionnaire</h4>
                    {['Smoking', 'Pets', 'Guests', 'Parties', 'Quiet Hours'].map((q) => (
                      <div key={q} className="flex items-center justify-between">
                        <span className="text-sm">{q}</span>
                        <Select defaultValue="sometimes">
                          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="sometimes">Sometimes</SelectItem>
                            <SelectItem value="often">Often</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Social Preferences</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Attend social events</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Study with others</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Share chores equally</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                <div>
                  <Button className="btn-hero">Save Lifestyle</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="housing" className="mt-6">
            <Card className="rounded-2xl shadow-medium border border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Housing Preferences
                  <Link to="/profile/edit/housing">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>Your housing requirements and preferences</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                    <Input defaultValue="$800 - $1,200 per month" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Preferred Locations</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['Berkeley', 'Oakland', 'Albany'].map((location) => (
                        <Badge key={location} variant="outline" className="text-xs">{location}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Room Type</label>
                    <Select defaultValue="private">
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private room in shared apartment</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="shared">Shared room</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Move-in Date</label>
                    <Input defaultValue="August 2024 (Flexible)" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Lease Length</label>
                    <Select defaultValue="9-12">
                      <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="9-12">9-12 months</SelectItem>
                        <SelectItem value="12+">12+ months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Transportation</label>
                    <Input defaultValue="Walking distance to campus or BART" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Required Amenities</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['WiFi', 'Laundry', 'Kitchen', 'Parking', 'Study Space'].map((amenity) => (
                        <Badge key={amenity} variant="outline" className="text-xs">{amenity}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-6">
                <Button className="btn-hero">Save Housing</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <Card className="rounded-2xl shadow-medium border border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Privacy & Security Settings
                  <Link to="/profile/edit/privacy">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>Control your privacy settings and account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Profile Visibility</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Profile Visibility</span>
                      <Select defaultValue={profileVisibility}>
                        <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="matches">Matches Only</SelectItem>
                          <SelectItem value="verified">Verified Users Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {[
                      'Profile Photo',
                      'Contact Information',
                      'Academic Information',
                      'Lifestyle Details'
                    ].map((row) => (
                      <div key={row} className="flex items-center justify-between">
                        <span className="text-sm">{row}</span>
                        <Select defaultValue="matches">
                          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="matches">Matches Only</SelectItem>
                            <SelectItem value="verified">Verified Only</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Security Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Two-Factor Authentication</span>
                      <Switch checked={twoFAEnabled} onCheckedChange={setTwoFAEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Verification</span>
                      <Badge variant="secondary" className="flex items-center gap-1"><Check className="w-3 h-3" /> Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phone Verification</span>
                      <Badge variant="secondary" className="flex items-center gap-1"><Check className="w-3 h-3" /> Verified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Student ID Verification</span>
                      <Badge variant="secondary" className="flex items-center gap-1"><Check className="w-3 h-3" /> Verified</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <Button className="btn-hero">Save Privacy & Security</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="mt-6">
            <Card className="rounded-2xl shadow-medium border border-border/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Verification Dashboard
                  <Badge variant="secondary">{verificationProgress}% Complete</Badge>
                </CardTitle>
                <CardDescription>Upload and verify your documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: 'University Email', desc: 'Verify your .edu email address', status: 'Verified' },
                    { title: 'Phone Number', desc: 'Verify your phone via SMS', status: 'Verified' },
                    { title: 'Student ID', desc: 'Upload your student ID card', status: 'Pending' },
                    { title: 'Government ID', desc: 'Upload passport or driver\'s license', status: 'Pending' },
                  ].map((item, idx) => (
                    <Card key={idx}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center justify-between">
                          {item.title}
                          <Badge variant={item.status === 'Verified' ? 'secondary' : 'outline'}>{item.status}</Badge>
                        </CardTitle>
                        <CardDescription>{item.desc}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Upload className="w-4 h-4" />
                          {item.status === 'Verified' ? 'Re-upload' : 'Upload'}
                        </Button>
                        <Button className="btn-hero" variant={item.status === 'Verified' ? 'default' : 'default'}>
                          {item.status === 'Verified' ? 'View' : 'Submit'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Keep your verification up to date. We\'ll remind you before expiration.</p>
                  </div>
                  <Button variant="outline">Remind Me Later</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Photo Upload Dialog (placeholder UX) */}
        <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Profile Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-6 border rounded-lg text-center text-sm text-muted-foreground">Drag & drop or click to upload. Cropping tools would appear here.</div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPhotoDialog(false)}>Cancel</Button>
                <Button onClick={() => setShowPhotoDialog(false)}>Save Photo</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;