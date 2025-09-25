import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Shield,
  Users,
  Star,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const typeParam = searchParams.get('type');
  const defaultLoginType = (typeParam === 'university' ? 'university' : 'student') as 'student' | 'university';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    loginType: defaultLoginType
  });
  const { toast } = useToast();

  const benefits = [
    {
      icon: Shield,
      title: 'Safe & Verified',
      description: 'All users verified through university systems'
    },
    {
      icon: Users,
      title: '50K+ Students',
      description: 'Join thousands of successful housing matches'
    },
    {
      icon: Star,
      title: '4.9/5 Rating',
      description: 'Trusted by students and universities nationwide'
    }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful!",
      description: "Welcome back to CampusConnect!",
    });
    
    // Redirect based on login type
    if (formData.loginType === 'university') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Reset Link Sent",
      description: "Check your email for password reset instructions.",
    });
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `Logging in with your ${provider} account...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Welcome Back */}
          <div className="space-y-8">
            <div>
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                👋 Welcome Back
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Continue Your{' '}
                <span className="text-gradient">Housing Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Sign in to access your matches, messages, and continue finding 
                your perfect university housing solution.
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
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <div className="text-xl font-bold">Secure Login</div>
                </div>
                <p className="text-muted-foreground">
                  Your account is protected with industry-standard security measures
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div>
            <Card className="card-gradient shadow-strong">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="text-muted-foreground">
                  Sign in to your CampusConnect account
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Login Type Toggle */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                  <Button
                    type="button"
                    variant={formData.loginType === 'student' ? 'default' : 'ghost'}
                    className="h-10"
                    onClick={() => handleInputChange('loginType', 'student')}
                  >
                    Student Login
                  </Button>
                  <Button
                    type="button"
                    variant={formData.loginType === 'university' ? 'default' : 'ghost'}
                    className="h-10"
                    onClick={() => handleInputChange('loginType', 'university')}
                  >
                    University Portal
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {formData.loginType === 'student' ? 'University Email' : 'Institution Email'}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder={
                          formData.loginType === 'student' 
                            ? 'yourname@university.edu' 
                            : 'admin@university.edu'
                        }
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10 h-12"
                        required
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

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={formData.rememberMe}
                        onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
                      />
                      <Label htmlFor="remember" className="text-sm cursor-pointer">
                        Remember me
                      </Label>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button type="submit" className="btn-hero w-full">
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </form>

                {formData.loginType === 'student' && (
                  <>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin('Google')}
                        className="h-12"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialLogin('Microsoft')}
                        className="h-12"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                        </svg>
                        Microsoft
                      </Button>
                    </div>
                  </>
                )}

                {formData.loginType === 'university' && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div className="text-sm">
                        <h4 className="font-semibold text-primary mb-1">University Portal</h4>
                        <p className="text-muted-foreground">
                          Access administrative features, student management, and partnership settings. 
                          Contact support if you need assistance with your university account.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center pt-6 border-t">
                  <p className="text-muted-foreground">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Sign up for free
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

export default LoginPage;