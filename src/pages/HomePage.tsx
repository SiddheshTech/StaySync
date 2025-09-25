import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Users, 
  Shield, 
  Star, 
  ChevronRight,
  CheckCircle,
  Home,
  UserCheck,
  MessageCircle,
  Award,
  Play
} from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';
import universityPartners from '@/assets/university-partners.jpg';
import safetyIcon from '@/assets/safety-icon.jpg';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const features = [
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'Our AI-powered system matches you with compatible roommates based on lifestyle preferences, study habits, and academic goals.'
    },
    {
      icon: Shield,
      title: 'Verified Safety',
      description: 'All listings and users are verified through our comprehensive safety protocol, including background checks and university validation.'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Join study groups, social events, and connect with students from your university to build lasting friendships.'
    },
    {
      icon: Award,
      title: 'University Partnerships',
      description: 'Exclusive access to verified housing through our partnerships with over 200 universities nationwide.'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Sign up with your university email and complete your detailed profile including preferences and lifestyle.'
    },
    {
      step: '02',
      title: 'Browse & Match',
      description: 'Use our smart search to find compatible roommates and housing options near your campus.'
    },
    {
      step: '03',
      title: 'Connect Safely',
      description: 'Chat with potential roommates through our secure messaging system and arrange safe meetups.'
    },
    {
      step: '04',
      title: 'Move In Together',
      description: 'Finalize your housing arrangements and start building your university community.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      university: 'Stanford University',
      text: 'CampusConnect helped me find amazing roommates who became my best friends. The safety verification gave my parents peace of mind too!',
      rating: 5,
      image: '👩‍🎓'
    },
    {
      name: 'Marcus Johnson',
      university: 'UCLA',
      text: 'As an international student, finding housing was my biggest worry. This platform made it so easy and secure.',
      rating: 5,
      image: '👨‍🎓'
    },
    {
      name: 'Emma Rodriguez',
      university: 'NYU',
      text: 'The matching algorithm is incredible! My roommates and I have the same study schedule and lifestyle preferences.',
      rating: 5,
      image: '👩‍💼'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Students Connected' },
    { number: '200+', label: 'University Partners' },
    { number: '95%', label: 'Safety Rating' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-background via-secondary/20 to-accent/10">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="shape-blob w-96 h-96 -top-48 -right-48 animate-float"></div>
          <div className="shape-blob w-64 h-64 -bottom-32 -left-32 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  🎓 Trusted by 200+ Universities
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Find Your Perfect{' '}
                  <span className="text-gradient">University Housing</span>{' '}
                  & Roommates
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Connect with verified students, discover safe housing options, and build your university community. 
                  Join thousands of students who found their home away from home.
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-medium border border-border/50">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter your university or city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border-0 bg-muted/50"
                    />
                  </div>
                  <Button className="btn-hero h-12 px-8">
                    <Search className="w-5 h-5 mr-2" />
                    Find Housing
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Free to join • Verified students only • Safe & secure</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button className="btn-hero">
                    Get Started Free
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" className="flex items-center space-x-2 h-12 px-6">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </Button>
              </div>
            </div>

            <div className="relative animate-slide-in-right lg:animate-scale-in">
              <div className="relative rounded-3xl overflow-hidden shadow-strong">
                <img
                  src={heroImage}
                  alt="Students in modern shared living space"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-medium border border-border/50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gradient">50K+</div>
                    <div className="text-sm text-muted-foreground">Happy Students</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              ✨ Why Choose CampusConnect
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for{' '}
              <span className="text-gradient">Safe Student Housing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform combines smart technology with human verification 
              to create the safest, most reliable student housing experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🚀 Simple Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How CampusConnect Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in minutes and find your perfect housing match in just four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full">
                    <ChevronRight className="w-6 h-6 text-primary mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button className="btn-hero">
                Learn More About Our Process
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-success/10 text-success border-success/20 mb-4">
              💬 Student Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Students Say About Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands of students who found their perfect housing match through CampusConnect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.university}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners Section */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🏛️ Trusted Partners
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Partnered with Leading Universities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We work directly with universities to ensure safe, verified housing options for their students.
            </p>
          </div>

          <div className="relative">
            <img
              src={universityPartners}
              alt="University partnerships"
              className="w-full h-64 object-cover rounded-3xl shadow-medium"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 rounded-3xl flex items-center justify-center">
              <div className="text-center text-white">
                <h3 className="text-4xl font-bold mb-2">200+</h3>
                <p className="text-xl">University Partners Nationwide</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/universities">
              <Button className="btn-hero">
                View All Partners
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-accent to-primary-light text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="shape-blob w-96 h-96 -top-48 -right-48 bg-white/10"></div>
          <div className="shape-blob w-64 h-64 -bottom-32 -left-32 bg-white/10"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect University Housing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who found their home away from home through CampusConnect. 
            Safe, verified, and completely free to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-semibold">
                <UserCheck className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;