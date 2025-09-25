import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  UserCheck, 
  Lock, 
  Eye,
  AlertTriangle,
  Phone,
  MessageCircle,
  FileCheck,
  Award,
  CheckCircle,
  Users,
  Bell,
  Camera,
  Smartphone,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import safetyIcon from '@/assets/safety-icon.jpg';

const SafetyPage = () => {
  const safetyFeatures = [
    {
      icon: UserCheck,
      title: 'Identity Verification',
      description: 'Multi-step verification process ensures every user is a real, enrolled student',
      details: [
        'University email verification required',
        'Student ID document upload and review',
        'Cross-reference with university enrollment',
        'Photo verification with government ID',
        'Optional background check available'
      ]
    },
    {
      icon: Lock,
      title: 'Secure Communication',
      description: 'All conversations happen through our encrypted, monitored messaging system',
      details: [
        'End-to-end encrypted messaging',
        'No personal contact info shared until you choose',
        'AI monitoring for inappropriate content',
        'Report and block features available',
        'Message history for accountability'
      ]
    },
    {
      icon: Eye,
      title: '24/7 Monitoring',
      description: 'Our safety team continuously monitors the platform for suspicious activity',
      details: [
        'Real-time activity monitoring',
        'Automated suspicious behavior detection',
        'Human safety team review',
        'Immediate response to reports',
        'Proactive safety interventions'
      ]
    },
    {
      icon: Bell,
      title: 'Safety Alerts',
      description: 'Instant notifications about safety updates and important information',
      details: [
        'Emergency alert system',
        'Safety tip notifications',
        'Suspicious activity warnings',
        'University-specific safety updates',
        'Community safety reports'
      ]
    }
  ];

  const verificationSteps = [
    {
      step: '1',
      title: 'Email Verification',
      description: 'Sign up with your official .edu email address',
      requirements: ['Valid university email (@university.edu)', 'Email confirmation required', 'Domain verification with university database']
    },
    {
      step: '2',
      title: 'Student ID Upload',
      description: 'Upload a clear photo of your current student ID',
      requirements: ['Current academic year ID', 'Clearly visible photo and details', 'Manual review by safety team']
    },
    {
      step: '3',
      title: 'Profile Review',
      description: 'Our team reviews your profile and documents',
      requirements: ['Profile completeness check', 'Document authenticity verification', 'University enrollment confirmation']
    },
    {
      step: '4',
      title: 'Safety Badge',
      description: 'Get your verified badge and access full features',
      requirements: ['Full platform access granted', 'Verified badge displayed', 'Ongoing monitoring enabled']
    }
  ];

  const safetyTips = [
    {
      category: 'Meeting Potential Roommates',
      icon: Users,
      tips: [
        'Always meet in public places first',
        'Bring a friend to initial meetups',
        'Use our check-in feature during meetings',
        'Trust your instincts - if something feels off, leave',
        'Video chat before meeting in person'
      ]
    },
    {
      category: 'Sharing Information',
      icon: Lock,
      tips: [
        'Never share personal financial information',
        'Don\'t give out your full address until you\'re sure',
        'Use CampusConnect messaging for initial conversations',
        'Be cautious about sharing social media profiles',
        'Don\'t send money or payments outside official channels'
      ]
    },
    {
      category: 'Housing Visits',
      icon: Camera,
      tips: [
        'Visit potential housing during daylight hours',
        'Ask for a virtual tour first',
        'Bring someone with you to property visits',
        'Check that locks and security features work',
        'Verify the person showing you the place lives there'
      ]
    },
    {
      category: 'Online Safety',
      icon: Smartphone,
      tips: [
        'Use strong, unique passwords',
        'Enable two-factor authentication',
        'Don\'t click suspicious links in messages',
        'Report inappropriate behavior immediately',
        'Keep your app updated to the latest version'
      ]
    }
  ];

  const emergencyContacts = [
    {
      type: 'CampusConnect Safety Team',
      contact: 'safety@campusconnect.com',
      phone: '1-800-SAFE-NOW',
      available: '24/7',
      description: 'For platform-related safety concerns and reports'
    },
    {
      type: 'Campus Security',
      contact: 'Contact your university',
      phone: 'University-specific number',
      available: '24/7',
      description: 'For on-campus safety issues and emergencies'
    },
    {
      type: 'Local Emergency Services',
      contact: '911',
      phone: '911',
      available: '24/7',
      description: 'For immediate emergencies requiring police, fire, or medical'
    },
    {
      type: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      phone: '741741',
      available: '24/7',
      description: 'For mental health support and crisis intervention'
    }
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II Compliant',
      description: 'Highest standards for security, availability, and confidentiality',
      icon: Award
    },
    {
      name: 'FERPA Compliant',
      description: 'Protects student educational records and privacy',
      icon: FileCheck
    },
    {
      name: 'University Partnerships',
      description: 'Direct partnerships with 200+ universities for verification',
      icon: Users
    },
    {
      name: 'Background Check Partner',
      description: 'Optional background checks through certified providers',
      icon: Shield
    }
  ];

  const stats = [
    { number: '99.8%', label: 'Safety Score' },
    { number: '<5min', label: 'Emergency Response Time' },
    { number: '200+', label: 'University Partnerships' },
    { number: '24/7', label: 'Safety Monitoring' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-secondary/20 to-success/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-success/10 text-success border-success/20">
                  🛡️ Your Safety is Our Priority
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  The Safest Way to Find{' '}
                  <span className="text-gradient">University Housing</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  We've built the most comprehensive safety system in student housing. 
                  Every user is verified, every interaction is monitored, and help is always available 24/7.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gradient mb-1">{stat.number}</div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button className="btn-hero">
                    <Shield className="w-5 h-5 mr-2" />
                    Join Safely Today
                  </Button>
                </Link>
                <Button variant="outline" className="h-12 px-6">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Safety Team
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-strong">
                <img
                  src={safetyIcon}
                  alt="Safety and security illustration"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-success/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🔒 Safety Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Multi-Layer Protection System
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive safety system combines technology, human oversight, 
              and university partnerships to create the safest student housing platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-success to-primary rounded-2xl flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              ✅ Verification Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Verify Every Student
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our rigorous 4-step verification process ensures that every user on the platform 
              is a real, enrolled student at a verified university.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-primary transform -translate-y-1/2 hidden lg:block"></div>
            <div className="grid lg:grid-cols-4 gap-8">
              {verificationSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="card-gradient hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <div className="space-y-2">
                        {step.requirements.map((req, reqIndex) => (
                          <div key={reqIndex} className="flex items-start space-x-2 text-left">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{req}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-warning/10 text-warning border-warning/20 mb-4">
              💡 Safety Tips
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Safe While Finding Housing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow these important safety guidelines to protect yourself throughout 
              your housing search and roommate matching process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyTips.map((category, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-warning to-accent rounded-2xl flex items-center justify-center mb-4">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-destructive/10 text-destructive border-destructive/20 mb-4">
              🚨 Emergency Resources
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Help When You Need It
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Save these important contact numbers and know that help is always available 
              when you need it most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {emergencyContacts.map((contact, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-destructive to-warning rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{contact.type}</h3>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{contact.contact}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-mono">{contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{contact.available}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">{contact.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🏆 Certifications & Compliance
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industry-Leading Security Standards
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We maintain the highest security and privacy standards, with certifications 
              from leading industry organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="card-gradient hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{cert.name}</h3>
                  <p className="text-muted-foreground text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-success via-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Join the Safest Student Housing Platform
          </h2>
          <p className="text-xl mb-8 opacity-90">
            With industry-leading safety measures, 24/7 support, and university partnerships, 
            CampusConnect is the secure choice for finding your perfect housing match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-semibold">
                <Shield className="w-5 h-5 mr-2" />
                Get Started Safely
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Safety Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafetyPage;