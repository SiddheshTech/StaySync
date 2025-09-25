import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Building, 
  Users, 
  Award, 
  CheckCircle,
  Search,
  MapPin,
  Star,
  GraduationCap,
  Shield,
  TrendingUp,
  Globe,
  Mail,
  Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import universityPartners from '@/assets/university-partners.jpg';

const UniversityPartnersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const partnerUniversities = [
    {
      name: 'Stanford University',
      location: 'Palo Alto, CA',
      students: '17,000+',
      rating: 4.9,
      specialPrograms: ['Engineering', 'Business', 'Medicine'],
      verified: true,
      logo: '🏛️'
    },
    {
      name: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      students: '45,000+',
      rating: 4.8,
      specialPrograms: ['Engineering', 'Law', 'Public Policy'],
      verified: true,
      logo: '🐻'
    },
    {
      name: 'Massachusetts Institute of Technology',
      location: 'Cambridge, MA',
      students: '11,000+',
      rating: 4.9,
      specialPrograms: ['Technology', 'Science', 'Engineering'],
      verified: true,
      logo: '⚙️'
    },
    {
      name: 'New York University',
      location: 'New York, NY',
      students: '50,000+',
      rating: 4.7,
      specialPrograms: ['Arts', 'Business', 'Medicine'],
      verified: true,
      logo: '🗽'
    },
    {
      name: 'University of Southern California',
      location: 'Los Angeles, CA',
      students: '47,000+',
      rating: 4.8,
      specialPrograms: ['Film', 'Business', 'Engineering'],
      verified: true,
      logo: '🎬'
    },
    {
      name: 'University of Texas at Austin',
      location: 'Austin, TX',
      students: '51,000+',
      rating: 4.6,
      specialPrograms: ['Business', 'Engineering', 'Liberal Arts'],
      verified: true,
      logo: '🤠'
    }
  ];

  const partnershipBenefits = [
    {
      icon: Shield,
      title: 'Enhanced Verification',
      description: 'Direct integration with university systems for instant student verification',
      details: [
        'Real-time enrollment verification',
        'Automatic student status updates',
        'University ID cross-referencing',
        'Academic standing verification'
      ]
    },
    {
      icon: Award,
      title: 'Exclusive Programs',
      description: 'Special housing programs and discounts for partner university students',
      details: [
        'University-sponsored housing options',
        'Discounted premium features',
        'Priority matching services',
        'Exclusive community events'
      ]
    },
    {
      icon: Users,
      title: 'Campus Integration',
      description: 'Seamless integration with campus services and student support',
      details: [
        'Campus housing office coordination',
        'Student services collaboration',
        'Academic calendar integration',
        'Campus safety partnerships'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Success Tracking',
      description: 'Comprehensive analytics and reporting for university administrators',
      details: [
        'Student housing success metrics',
        'Safety and satisfaction reports',
        'Demographic and trend analysis',
        'Custom reporting dashboards'
      ]
    }
  ];

  const partnershipProcess = [
    {
      step: '1',
      title: 'Initial Consultation',
      description: 'Meet with our university partnership team to discuss your institution\'s needs',
      timeline: '1 week'
    },
    {
      step: '2',
      title: 'Integration Planning',
      description: 'Develop a custom integration plan for your university systems',
      timeline: '2-3 weeks'
    },
    {
      step: '3',
      title: 'Pilot Program',
      description: 'Launch a pilot program with select students and housing options',
      timeline: '1 month'
    },
    {
      step: '4',
      title: 'Full Deployment',
      description: 'Roll out CampusConnect to your entire student body',
      timeline: '2 weeks'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      title: 'Director of Student Housing',
      university: 'UC Berkeley',
      quote: 'CampusConnect has transformed how our students find safe, affordable housing. The verification system gives us confidence in student safety.',
      image: '👩‍🏫'
    },
    {
      name: 'Michael Chen',
      title: 'Dean of Students',
      university: 'Stanford University',
      quote: 'The integration with our systems is seamless. Students love the platform, and we\'ve seen a significant increase in housing satisfaction.',
      image: '👨‍💼'
    },
    {
      name: 'Prof. Emily Rodriguez',
      title: 'Student Services Director',
      university: 'MIT',
      quote: 'The safety features and verification process align perfectly with our commitment to student wellbeing and security.',
      image: '👩‍🔬'
    }
  ];

  const stats = [
    { number: '200+', label: 'Partner Universities' },
    { number: '50K+', label: 'Students Served' },
    { number: '95%', label: 'University Satisfaction' },
    { number: '24/7', label: 'Administrative Support' }
  ];

  const filteredUniversities = partnerUniversities.filter(uni =>
    uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    uni.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-secondary/20 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🏛️ University Partnerships
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted by Leading{' '}
              <span className="text-gradient">Universities Nationwide</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              We partner directly with universities to provide verified, safe housing solutions 
              for their students. Join 200+ institutions that trust CampusConnect.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={universityPartners}
              alt="University partnerships showcase"
              className="w-full h-64 object-cover rounded-3xl shadow-strong"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 rounded-3xl flex items-center justify-center">
              <div className="text-center text-white">
                <Building className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Nationwide Coverage</h3>
                <p className="text-xl">From coast to coast, we serve your students</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Search */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your University
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Search our network of partner universities to see the benefits available to your students.
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search universities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUniversities.map((university, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-4xl">{university.logo}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{university.name}</h3>
                        {university.verified && (
                          <CheckCircle className="w-5 h-5 text-success" />
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{university.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Students</span>
                      <span className="font-medium">{university.students}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{university.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground mb-2 block">Popular Programs</span>
                    <div className="flex flex-wrap gap-2">
                      {university.specialPrograms.map((program, progIndex) => (
                        <Badge key={progIndex} variant="outline" className="text-xs">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    View Partnership Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              🎯 Partnership Benefits
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Universities Get
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our partnerships provide comprehensive benefits that enhance student safety, 
              satisfaction, and academic success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnershipBenefits.map((benefit, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-4">{benefit.description}</p>
                  <div className="space-y-2">
                    {benefit.details.map((detail, detailIndex) => (
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

      {/* Partnership Process */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🚀 Partnership Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Become a Partner
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our streamlined partnership process gets your university connected 
              and serving students in just a few weeks.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-primary transform -translate-y-1/2 hidden lg:block"></div>
            <div className="grid lg:grid-cols-4 gap-8">
              {partnershipProcess.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="card-gradient hover-lift">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <Badge className="bg-accent/10 text-accent border-accent/20">
                        {step.timeline}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="btn-hero">
              <Mail className="w-5 h-5 mr-2" />
              Start Partnership Process
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-success/10 text-success border-success/20 mb-4">
              💬 University Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What University Leaders Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear directly from university administrators about their experience with CampusConnect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{testimonial.image}</div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                      <div className="text-sm text-primary">{testimonial.university}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-accent to-primary-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <GraduationCap className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Partner with CampusConnect?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 200+ universities that trust CampusConnect to provide safe, 
            verified housing solutions for their students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-semibold">
              <Mail className="w-5 h-5 mr-2" />
              Contact Partnership Team
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversityPartnersPage;