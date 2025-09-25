import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  UserPlus, 
  Search, 
  MessageCircle, 
  Home,
  Shield,
  Clock,
  CheckCircle,
  Play,
  ArrowRight,
  Star,
  Users,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  const steps = [
    {
      number: '01',
      icon: UserPlus,
      title: 'Create Your Profile',
      description: 'Sign up with your university email and complete your detailed profile.',
      details: [
        'Verify your student status with university email',
        'Upload a profile photo and student ID',
        'Complete lifestyle and preference questionnaire',
        'Set your housing budget and timeline',
        'Enable two-factor authentication for security'
      ],
      timeEstimate: '5-10 minutes',
      tips: 'Complete profiles get 3x more matches!'
    },
    {
      number: '02',
      icon: Search,
      title: 'Browse & Match',
      description: 'Use our smart search to find compatible roommates and housing options.',
      details: [
        'Search by university, location, and budget',
        'Use advanced filters for lifestyle preferences',
        'View compatibility scores with potential roommates',
        'Save favorite listings and profiles',
        'Get personalized recommendations daily'
      ],
      timeEstimate: '15-30 minutes',
      tips: 'Set up alerts to be notified of new matches!'
    },
    {
      number: '03',
      icon: MessageCircle,
      title: 'Connect Safely',
      description: 'Chat with potential roommates through our secure messaging system.',
      details: [
        'Send messages through our secure platform',
        'Share additional photos and information',
        'Schedule virtual or in-person meetups',
        'Use our meetup safety guidelines',
        'Get compatibility insights from our AI'
      ],
      timeEstimate: '1-2 weeks',
      tips: 'Ask about study habits and daily routines!'
    },
    {
      number: '04',
      icon: Home,
      title: 'Move In Together',
      description: 'Finalize your housing arrangements and start building your community.',
      details: [
        'Review lease agreements together',
        'Set up shared expenses and responsibilities',
        'Join your university community groups',
        'Connect with nearby students',
        'Access ongoing support and resources'
      ],
      timeEstimate: '1-2 weeks',
      tips: 'Create a roommate agreement for smooth living!'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Safety',
      description: 'All users verified through university email and ID check',
      benefits: [
        'Student ID verification required',
        'Background check options available',
        'University partnership validation',
        'Secure messaging system',
        'Safety reporting tools'
      ]
    },
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'AI-powered compatibility matching based on lifestyle and preferences',
      benefits: [
        'Advanced compatibility algorithm',
        'Lifestyle preference matching',
        'Study habit compatibility',
        'Budget and location alignment',
        'Personality type matching'
      ]
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect with study groups, social events, and campus activities',
      benefits: [
        'University-specific groups',
        'Study buddy matching',
        'Social event coordination',
        'Academic support networks',
        'Career networking opportunities'
      ]
    }
  ];

  const faqs = [
    {
      question: 'Is CampusConnect really free for students?',
      answer: 'Yes! Basic membership is completely free for verified students. This includes profile creation, browsing, messaging, and basic matching. We offer premium features for enhanced matching and priority support, but the core service remains free.'
    },
    {
      question: 'How do you verify that someone is actually a student?',
      answer: 'We require verification through your official university email address and a valid student ID. We also partner directly with universities to cross-reference enrollment status. Additional verification steps may include background checks for enhanced safety.'
    },
    {
      question: 'What if I don\'t get along with my matched roommate?',
      answer: 'We provide ongoing support throughout your housing journey. Our platform includes conflict resolution resources, and our support team can help mediate issues. We also offer re-matching services if needed, though our compatibility algorithm has a 95% success rate.'
    },
    {
      question: 'How long does it typically take to find a roommate?',
      answer: 'Most students find compatible matches within 2-4 weeks. However, timing can vary based on your location, budget, and specific preferences. Students in major university cities typically find matches faster due to higher user density.'
    },
    {
      question: 'Can international students use CampusConnect?',
      answer: 'Absolutely! We welcome international students and have specific resources to help with their unique housing needs. We can verify international student status through university admissions offices and provide additional support for visa requirements.'
    },
    {
      question: 'What safety measures are in place for meetups?',
      answer: 'We provide comprehensive safety guidelines for meeting potential roommates, including meeting in public places, bringing a friend, and using our check-in feature. We also offer virtual meetup tools and verification badges for added security.'
    }
  ];

  const successStories = [
    {
      name: 'Maria & Jessica',
      university: 'UCLA',
      story: 'Found each other through CampusConnect and became best friends. Now they\'re in their third year living together!',
      outcome: 'Perfect roommate match + lifelong friendship',
      rating: 5
    },
    {
      name: 'Alex & Sam',
      university: 'MIT',
      story: 'Both computer science majors with similar study schedules. Their shared apartment became a study hub for their entire class.',
      outcome: 'Academic support + social community',
      rating: 5
    },
    {
      name: 'Priya & Rachel',
      university: 'Stanford',
      story: 'International and domestic student partnership. Rachel helped Priya navigate campus life while Priya shared her culture.',
      outcome: 'Cultural exchange + mutual support',
      rating: 5
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-secondary/20 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              🚀 Simple Process
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              How CampusConnect{' '}
              <span className="text-gradient">Actually Works</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              From signup to move-in, we guide you through every step of finding your perfect 
              university housing and roommate match. It's easier than you think!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="btn-hero">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center space-x-2 h-12 px-6">
                <Play className="w-5 h-5" />
                <span>Watch Demo Video</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">{step.title}</h2>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{step.timeEstimate}</span>
                        </div>
                        <Badge className="bg-success/10 text-success border-success/20">
                          {step.tips}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="card-gradient hover-lift">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
                          <step.icon className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Step {step.number}: {step.title}</h3>
                        <p className="text-muted-foreground mb-6">{step.description}</p>
                        <Button className="btn-hero">
                          {index === 0 ? 'Get Started' : `Learn More About Step ${step.number}`}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              ✨ Platform Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Makes CampusConnect Different
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with human insight to create 
              the safest and most effective student housing experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground mb-6">{feature.description}</p>
                  <div className="space-y-3">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-success/10 text-success border-success/20 mb-4">
              🌟 Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Real Students, Real Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how CampusConnect has helped thousands of students find not just housing, 
              but lasting friendships and academic support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="card-gradient hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{story.name}</h3>
                  <p className="text-primary font-medium mb-4">{story.university}</p>
                  <p className="text-muted-foreground mb-4">"{story.story}"</p>
                  <div className="bg-success/10 rounded-lg p-3">
                    <p className="text-success font-medium text-sm">{story.outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              ❓ Common Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about using CampusConnect to find your perfect housing match.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-accent to-primary-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Housing Match?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who found their home away from home. 
            The process is simple, safe, and completely free to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-semibold">
                <UserPlus className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/safety">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
                <Shield className="w-5 h-5 mr-2" />
                Learn About Safety
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;