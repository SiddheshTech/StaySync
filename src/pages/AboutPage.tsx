import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Shield, 
  Award, 
  Heart,
  Target,
  Eye,
  TrendingUp,
  Globe,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Thompson',
      role: 'CEO & Co-Founder',
      background: 'Former Housing Director at Stanford University',
      image: '👩‍💼',
      description: 'Sarah experienced firsthand the challenges students face finding safe housing during her time at Stanford.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      background: 'Former Software Engineer at Google',
      image: '👨‍💻',
      description: 'Michael brings 10+ years of experience building scalable platforms that connect millions of users safely.'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Safety & Verification',
      background: 'PhD in Psychology, Former Campus Safety Director',
      image: '👩‍🔬',
      description: 'Emily leads our comprehensive safety protocols and verification systems to ensure student security.'
    },
    {
      name: 'David Kim',
      role: 'Head of University Partnerships',
      background: 'Former Dean of Students at UC Berkeley',
      image: '👨‍🎓',
      description: 'David manages relationships with our 200+ university partners and ensures seamless integration.'
    }
  ];

  const milestones = [
    { year: '2019', title: 'Company Founded', description: 'Started with a mission to solve student housing challenges' },
    { year: '2020', title: 'First 10 Universities', description: 'Launched partnerships with leading universities' },
    { year: '2021', title: '10K Students', description: 'Reached our first 10,000 student connections' },
    { year: '2022', title: '100 University Partners', description: 'Expanded to serve students nationwide' },
    { year: '2023', title: 'Safety Certification', description: 'Achieved industry-leading safety standards' },
    { year: '2024', title: '50K+ Happy Students', description: 'Now serving students at 200+ universities' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Every user is verified, every listing is checked, and every interaction is monitored for safety.'
    },
    {
      icon: Heart,
      title: 'Community Building',
      description: 'We believe great housing creates lasting friendships and academic success.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in service, safety, and user experience.'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Quality housing should be accessible to all students, regardless of background.'
    }
  ];

  const achievements = [
    { number: '200+', label: 'University Partners' },
    { number: '50K+', label: 'Students Connected' },
    { number: '95%', label: 'Safety Rating' },
    { number: '4.9/5', label: 'User Satisfaction' },
    { number: '98%', label: 'Successful Matches' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-secondary/20 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🏢 About CampusConnect
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building the Future of{' '}
              <span className="text-gradient">Student Housing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We're on a mission to transform how students find safe, affordable housing near their universities. 
              Every student deserves a home that supports their academic journey and personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {achievements.slice(0, 3).map((achievement, index) => (
              <Card key={index} className="card-gradient text-center hover-lift">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-gradient mb-2">{achievement.number}</div>
                  <div className="text-muted-foreground">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                To create the world's most trusted platform for student housing, where safety, 
                community, and accessibility come together to support academic success and lifelong friendships.
              </p>
              <div className="space-y-3">
                {[
                  'Connect verified students with safe housing options',
                  'Build supportive communities around universities',
                  'Ensure transparent, fair, and accessible housing',
                  'Provide 24/7 support throughout the housing journey'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="w-8 h-8 text-accent" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                A world where every student has access to safe, affordable housing that enhances 
                their university experience and sets them up for success in life.
              </p>
              <Card className="card-gradient">
                <CardContent className="p-6">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Growing Impact</h3>
                    <p className="text-muted-foreground">
                      By 2025, we aim to serve students at 500+ universities across North America, 
                      connecting over 100,000 students with their perfect housing match.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              💎 Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Drives Everything We Do
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our core values guide every decision we make and every feature we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-gradient hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              👥 Meet Our Team
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The People Behind CampusConnect
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team brings together expertise in technology, education, and student services 
              to create the best possible experience for students.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.background}</p>
                  <p className="text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-success/10 text-success border-success/20 mb-4">
              📈 Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Five Years of Growth & Innovation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From a small startup to a trusted platform serving thousands of students nationwide.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gradient-primary"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <Card className="card-gradient hover-lift">
                      <CardContent className="p-6">
                        <div className="text-2xl font-bold text-primary mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-gradient-primary rounded-full border-4 border-background absolute left-1/2 transform -translate-x-1/2"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-accent to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              These numbers represent real students who found their home away from home through CampusConnect.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{achievement.number}</div>
                <div className="text-lg opacity-80">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            🚀 Join Our Mission
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Be Part of Our Story?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Whether you're a student looking for housing, a university seeking partnerships, 
            or someone who shares our mission, we'd love to connect with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="btn-hero">
                <Users className="w-5 h-5 mr-2" />
                Join as Student
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="h-12 px-6">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;