import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft,
  Save,
  CalendarIcon,
  X,
  Plus,
  Upload
} from 'lucide-react';

const EditProfilePage = () => {
  const { section } = useParams();
  const [date, setDate] = useState<Date>();
  const [interests, setInterests] = useState(['Coding', 'Reading', 'Yoga']);
  const [newInterest, setNewInterest] = useState('');
  const [budgetRange, setBudgetRange] = useState([800, 1200]);

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const renderPersonalForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your basic personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="Sarah" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Johnson" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue="sarah.johnson@berkeley.edu" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
        </div>
        
        <div className="space-y-2">
          <Label>Date of Birth</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pronouns">Pronouns</Label>
          <Select defaultValue="she-her">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="she-her">She/Her</SelectItem>
              <SelectItem value="he-him">He/Him</SelectItem>
              <SelectItem value="they-them">They/Them</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact</Label>
          <Input id="emergencyContact" defaultValue="Mary Johnson (Mom) - (555) 987-6543" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="profilePhoto">Profile Photo</Label>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload New Photo
            </Button>
            <p className="text-sm text-muted-foreground">JPG, PNG up to 5MB</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAcademicForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Academic Information</CardTitle>
        <CardDescription>Update your university and academic details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="university">University</Label>
          <Select defaultValue="uc-berkeley">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="uc-berkeley">University of California, Berkeley</SelectItem>
              <SelectItem value="stanford">Stanford University</SelectItem>
              <SelectItem value="ucla">UCLA</SelectItem>
              <SelectItem value="usc">USC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Input id="major" defaultValue="Computer Science" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minor">Minor (Optional)</Label>
            <Input id="minor" defaultValue="Mathematics" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="academicYear">Academic Year</Label>
            <Select defaultValue="junior">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshman">Freshman</SelectItem>
                <SelectItem value="sophomore">Sophomore</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="graduationDate">Expected Graduation</Label>
            <Input id="graduationDate" type="month" defaultValue="2025-05" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gpa">GPA (Optional)</Label>
          <Input id="gpa" type="number" step="0.1" min="0" max="4" defaultValue="3.8" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="studyAbroad">Study Abroad Plans</Label>
          <Textarea id="studyAbroad" defaultValue="Spring 2024 - Edinburgh, Scotland" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="achievements">Research, Internships & Achievements</Label>
          <Textarea id="achievements" defaultValue="ML Research Lab, Google Summer Intern 2023" />
        </div>
      </CardContent>
    </Card>
  );

  const renderLifestyleForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Lifestyle & Preferences</CardTitle>
        <CardDescription>Tell us about your living habits and interests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Cleanliness Level</Label>
              <Select defaultValue="very-clean">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-clean">Very Clean</SelectItem>
                  <SelectItem value="clean">Clean</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="relaxed">Relaxed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Noise Level Preference</Label>
              <Select defaultValue="quiet">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-quiet">Very Quiet</SelectItem>
                  <SelectItem value="quiet">Quiet</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="lively">Lively</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Sleep Schedule</Label>
              <Select defaultValue="early-bird">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="early-bird">Early Bird</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="night-owl">Night Owl</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Social Level</Label>
              <Select defaultValue="moderately-social">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very-social">Very Social</SelectItem>
                  <SelectItem value="moderately-social">Moderately Social</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="very-private">Very Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Interests & Hobbies</Label>
          <div className="flex flex-wrap gap-2 mb-3">
            {interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                {interest}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => removeInterest(interest)}
                />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add new interest"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addInterest()}
            />
            <Button type="button" onClick={addInterest}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="wakeTime">Wake Up Time</Label>
            <Input id="wakeTime" type="time" defaultValue="06:30" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="studyTime">Study Time</Label>
            <Input id="studyTime" defaultValue="9 AM - 3 PM" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exerciseTime">Exercise Time</Label>
            <Input id="exerciseTime" defaultValue="4 PM - 5 PM" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sleepTime">Sleep Time</Label>
            <Input id="sleepTime" type="time" defaultValue="22:30" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderHousingForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Housing Preferences</CardTitle>
        <CardDescription>Set your housing requirements and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Budget Range (per month)</Label>
          <div className="px-3">
            <Slider
              value={budgetRange}
              onValueChange={setBudgetRange}
              max={3000}
              min={400}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>${budgetRange[0]}</span>
              <span>${budgetRange[1]}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Preferred Locations</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['Berkeley', 'Oakland', 'Albany', 'San Francisco', 'Emeryville', 'Richmond'].map((location) => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox id={location} defaultChecked={['Berkeley', 'Oakland', 'Albany'].includes(location)} />
                <Label htmlFor={location} className="text-sm">{location}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Room Type</Label>
          <Select defaultValue="private-shared">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private-shared">Private room in shared apartment</SelectItem>
              <SelectItem value="shared-room">Shared room</SelectItem>
              <SelectItem value="studio">Studio apartment</SelectItem>
              <SelectItem value="one-bedroom">One bedroom apartment</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
            <Input id="moveInDate" type="date" defaultValue="2024-08-01" />
          </div>
          <div className="space-y-2">
            <Label>Lease Length</Label>
            <Select defaultValue="9-12-months">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3-6-months">3-6 months</SelectItem>
                <SelectItem value="6-9-months">6-9 months</SelectItem>
                <SelectItem value="9-12-months">9-12 months</SelectItem>
                <SelectItem value="12-months-plus">12+ months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Required Amenities</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {['WiFi', 'Laundry', 'Kitchen', 'Parking', 'Study Space', 'Gym', 'Pool', 'Pet Friendly'].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox id={amenity} defaultChecked={['WiFi', 'Laundry', 'Kitchen', 'Parking', 'Study Space'].includes(amenity)} />
                <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Transportation Preferences</Label>
          <Textarea defaultValue="Walking distance to campus or BART" />
        </div>
      </CardContent>
    </Card>
  );

  const renderPrivacyForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>Privacy & Security Settings</CardTitle>
        <CardDescription>Control your privacy settings and security preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold">Profile Visibility</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Profile Photo Visibility</Label>
                <p className="text-sm text-muted-foreground">Who can see your profile photo</p>
              </div>
              <Select defaultValue="verified-only">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Everyone</SelectItem>
                  <SelectItem value="verified-only">Verified Users Only</SelectItem>
                  <SelectItem value="matches-only">Matches Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Contact Information</Label>
                <p className="text-sm text-muted-foreground">Who can see your contact details</p>
              </div>
              <Select defaultValue="matches-only">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Everyone</SelectItem>
                  <SelectItem value="verified-only">Verified Users Only</SelectItem>
                  <SelectItem value="matches-only">Matches Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Academic Information</Label>
                <p className="text-sm text-muted-foreground">Who can see your university details</p>
              </div>
              <Select defaultValue="public">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Everyone</SelectItem>
                  <SelectItem value="verified-only">Verified Users Only</SelectItem>
                  <SelectItem value="matches-only">Matches Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Security Settings</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Login Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified of new logins</p>
              </div>
              <Checkbox defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Password</Label>
                <p className="text-sm text-muted-foreground">Last changed 2 months ago</p>
              </div>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Account Management</h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Download My Data</Label>
                <p className="text-sm text-muted-foreground">Get a copy of your data</p>
              </div>
              <Button variant="outline" size="sm">Download</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Deactivate Account</Label>
                <p className="text-sm text-muted-foreground">Temporarily hide your profile</p>
              </div>
              <Button variant="outline" size="sm">Deactivate</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderForm = () => {
    switch (section) {
      case 'personal':
        return renderPersonalForm();
      case 'academic':
        return renderAcademicForm();
      case 'lifestyle':
        return renderLifestyleForm();
      case 'housing':
        return renderHousingForm();
      case 'privacy':
        return renderPrivacyForm();
      default:
        return renderPersonalForm();
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'personal':
        return 'Personal Information';
      case 'academic':
        return 'Academic Information';
      case 'lifestyle':
        return 'Lifestyle & Preferences';
      case 'housing':
        return 'Housing Preferences';
      case 'privacy':
        return 'Privacy & Security';
      default:
        return 'Profile Information';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Edit {getSectionTitle()}</h1>
              <p className="text-muted-foreground">Update your profile information</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Link to="/profile">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button className="btn-hero">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {renderForm()}
      </div>
    </div>
  );
};

export default EditProfilePage;