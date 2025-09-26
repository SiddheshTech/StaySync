import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  UserPlus, 
  Mail, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertCircle,
  Building,
  User,
  Phone,
  Upload,
  Star
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    university: '',
    graduationYear: '',
    major: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });
  const { toast } = useToast();

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Tell us about yourself' },
    { number: 2, title: 'University', description: 'Your academic details' },
    { number: 3, title: 'Security', description: 'Create your account' },
    { number: 4, title: 'Verification', description: 'Verify your identity' }
  ];

  const universities = [
    'Stanford University',
    'University of California, Berkeley',
    'Massachusetts Institute of Technology',
    'New York University',
    'University of Southern California',
    'University of Texas at Austin',
    'Harvard University',
    'Yale University',
    'Columbia University',
    'UCLA'
  ];

  const graduationYears = [
    '2024', '2025', '2026', '2027', '2028', '2029', '2030'
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Verified Safety',
      description: 'All users verified through university email and ID'
    },
    {
      icon: Star,
      title: 'Smart Matching',
      description: 'AI-powered roommate compatibility matching'
    },
    {
      icon: Building,
      title: '200+ Universities',
      description: 'Nationwide coverage at partner universities'
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    try {
      const baseUrl = (import.meta as any).env?.VITE_API_URL || `${location.protocol}//${location.hostname}:8080`;
      const res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          password: formData.password
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Registration failed');
      }
      const data = await res.json();
      localStorage.setItem('auth_token', data.token);
      toast({ title: 'Registration Successful!', description: 'Welcome to StaySync.' });
      // Navigate to student dashboard after register
      // Use router navigation first, then hard-redirect as fallback
      (window as any).appNavigate
        ? (window as any).appNavigate('/student/dashboard', { replace: true })
        : null;
      setTimeout(() => {
        if (!location.pathname.startsWith('/student')) {
          window.location.href = '/student/dashboard';
        }
      }, 0);
    } catch (err: any) {
      toast({ title: 'Registration failed', description: err.message, variant: 'destructive' as any });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-16 h-16 bg-gradient-primary rounded-2xl p-4 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Tell Us About Yourself</h2>
              <p className="text-muted-foreground">Let's start with your basic information</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building className="w-16 h-16 bg-gradient-primary rounded-2xl p-4 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Your University Details</h2>
              <p className="text-muted-foreground">Help us verify your student status</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="university">University</Label>
              <Select value={formData.university} onValueChange={(value) => handleInputChange('university', value)}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your university" />
                </SelectTrigger>
                <SelectContent>
                  {universities.map((university) => (
                    <SelectItem key={university} value={university}>
                      {university}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="graduationYear">Expected Graduation</Label>
                <Select value={formData.graduationYear} onValueChange={(value) => handleInputChange('graduationYear', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {graduationYears.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="major">Major/Field of Study</Label>
                <Input
                  id="major"
                  placeholder="e.g., Computer Science"
                  value={formData.major}
                  onChange={(e) => handleInputChange('major', e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Lock className="w-16 h-16 bg-gradient-primary rounded-2xl p-4 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Create Your Account</h2>
              <p className="text-muted-foreground">Secure your account with a strong password</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">University Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="yourname@university.edu"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Must be your official university email ending in .edu
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                />
                <div className="text-sm">
                  <Label htmlFor="terms" className="cursor-pointer">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={formData.agreeToMarketing}
                  onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked)}
                />
                <div className="text-sm">
                  <Label htmlFor="marketing" className="cursor-pointer">
                    Send me housing tips, safety updates, and platform news (optional)
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 bg-gradient-primary rounded-2xl p-4 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Verify Your Identity</h2>
              <p className="text-muted-foreground">Upload your student ID for verification</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Student ID</h3>
              <p className="text-muted-foreground mb-4">
                Please upload a clear photo of your current student ID card
              </p>
              <Button variant="outline" className="mb-4">
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
              <div className="text-sm text-muted-foreground">
                Accepted formats: JPG, PNG, PDF (max 5MB)
              </div>
            </div>

            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <div className="text-sm">
                  <h4 className="font-semibold text-success mb-1">Why we need this</h4>
                  <p className="text-muted-foreground">
                    Student ID verification ensures a safe community of verified students only. 
                    Your information is encrypted and never shared with other users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Benefits */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                🎓 Join CampusConnect
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Find Your Perfect{' '}
                <span className="text-gradient">University Housing</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join 50,000+ students who found safe, verified housing through our platform. 
                Registration is free and takes just a few minutes.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card rounded-3xl p-6 shadow-medium border border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-gradient mb-2">100% Free</div>
                <p className="text-muted-foreground">
                  Always free to join, browse, and find your perfect housing match
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div>
            <Card className="card-gradient shadow-strong">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Create Your Account</h2>
                  <Badge variant="outline">Step {currentStep} of 4</Badge>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center space-x-2">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.number
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {currentStep > step.number ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          step.number
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-2 ${
                          currentStep > step.number ? 'bg-primary' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  {renderStepContent()}

                  <div className="flex items-center justify-between pt-6">
                    {currentStep > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevStep}
                        className="h-12 px-6"
                      >
                        Previous
                      </Button>
                    )}
                    
                    <div className="flex-1" />
                    
                    {currentStep < 4 ? (
                      <Button 
                        type="button" 
                        onClick={handleNextStep}
                        className="btn-hero"
                        disabled={!formData.firstName || !formData.lastName}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className="btn-hero"
                        disabled={!formData.agreeToTerms}
                      >
                        <UserPlus className="w-5 h-5 mr-2" />
                        Create Account
                      </Button>
                    )}
                  </div>
                </form>

                <div className="text-center pt-6 border-t">
                  <p className="text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login?type=student" className="text-primary hover:underline font-medium">
                      Student sign in
                    </Link>
                    {' '}or{' '}
                    <Link to="/login?type=university" className="text-primary hover:underline font-medium">
                      University portal
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;