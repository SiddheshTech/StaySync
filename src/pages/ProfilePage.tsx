import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
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
  Edit
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
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
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">SJ</AvatarFallback>
                </Avatar>
                <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
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
          <TabsList className="grid w-full grid-cols-5">
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
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <div className="grid gap-6">
              <Card>
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
                      <p className="text-sm">Sarah Elizabeth Johnson</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-sm">sarah.johnson@berkeley.edu</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-sm">(555) 123-4567</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Pronouns</label>
                      <p className="text-sm">She/Her</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                      <p className="text-sm">March 15, 2002</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                      <p className="text-sm">Mary Johnson (Mom) - (555) 987-6543</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Social Media</label>
                      <p className="text-sm">@sarahj_codes (Instagram)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="academic" className="mt-6">
            <Card>
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
                    <p className="text-sm">University of California, Berkeley</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Major</label>
                    <p className="text-sm">Computer Science</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Minor</label>
                    <p className="text-sm">Mathematics</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                    <p className="text-sm">Junior (3rd Year)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expected Graduation</label>
                    <p className="text-sm">May 2025</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">GPA</label>
                    <p className="text-sm">3.8/4.0</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Study Abroad Plans</label>
                    <p className="text-sm">Spring 2024 - Edinburgh, Scotland</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Research/Internships</label>
                    <p className="text-sm">ML Research Lab, Google Summer Intern 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="lifestyle" className="mt-6">
            <Card>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="housing" className="mt-6">
            <Card>
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
                    <p className="text-sm">$800 - $1,200 per month</p>
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
                    <p className="text-sm">Private room in shared apartment</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Move-in Date</label>
                    <p className="text-sm">August 2024 (Flexible)</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Lease Length</label>
                    <p className="text-sm">9-12 months</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Transportation</label>
                    <p className="text-sm">Walking distance to campus or BART</p>
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
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <Card>
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
                      <span className="text-sm">Profile Photo</span>
                      <Badge variant="secondary">Verified Users Only</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Contact Information</span>
                      <Badge variant="secondary">Matches Only</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Academic Information</span>
                      <Badge variant="secondary">Public</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Lifestyle Details</span>
                      <Badge variant="secondary">Potential Roommates</Badge>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Security Status</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Two-Factor Authentication</span>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Enabled
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Verification</span>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Phone Verification</span>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Student ID Verification</span>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        Verified
                      </Badge>
                    </div>
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

export default ProfilePage;