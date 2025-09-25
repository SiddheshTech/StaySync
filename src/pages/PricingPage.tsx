import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle,
  X,
  Star,
  Shield,
  Zap,
  Crown,
  Users,
  MessageCircle,
  Award,
  TrendingUp,
  Globe,
  Clock,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for students getting started with basic housing search',
      icon: Users,
      popular: false,
      features: [
        { name: 'Create profile and browse listings', included: true },
        { name: 'Basic messaging with matches', included: true },
        { name: 'University email verification', included: true },
        { name: 'Standard safety features', included: true },
        { name: 'Community groups access', included: true },
        { name: 'Mobile app access', included: true },
        { name: 'Advanced matching algorithm', included: false },
        { name: 'Priority support', included: false },
        { name: 'Background check access', included: false },
        { name: 'Unlimited messaging', included: false }
      ],
      cta: 'Get Started Free',
      ctaVariant: 'outline' as const
    },
    {
      name: 'Premium',
      price: 9.99,
      period: 'month',
      description: 'Enhanced features for serious housing seekers',
      icon: Zap,
      popular: true,
      features: [
        { name: 'Everything in Free plan', included: true },
        { name: 'Advanced matching algorithm', included: true },
        { name: 'Unlimited messaging', included: true },
        { name: 'Priority in search results', included: true },
        { name: 'Background check access', included: true },
        { name: 'Priority customer support', included: true },
        { name: 'Advanced filters and search', included: true },
        { name: 'Read receipt on messages', included: true },
        { name: 'Profile boost features', included: true },
        { name: 'University partnership perks', included: false }
      ],
      cta: 'Start Premium Trial',
      ctaVariant: 'default' as const
    },
    {
      name: 'University Sponsored',
      price: 0,
      period: 'for students',
      description: 'Full premium features sponsored by your university',
      icon: Crown,
      popular: false,
      features: [
        { name: 'Everything in Premium plan', included: true },
        { name: 'University partnership perks', included: true },
        { name: 'Exclusive university housing', included: true },
        { name: 'Campus-specific features', included: true },
        { name: 'Direct university support', included: true },
        { name: 'Academic calendar integration', included: true },
        { name: 'Campus event notifications', included: true },
        { name: 'University verified roommates', included: true },
        { name: 'Special university discounts', included: true },
        { name: 'Dedicated university liaison', included: true }
      ],
      cta: 'Check University Status',
      ctaVariant: 'outline' as const
    }
  ];

  const faqs = [
    {
      question: 'Is CampusConnect really free for students?',
      answer: 'Yes! Our basic plan is completely free and includes all essential features like profile creation, browsing, basic messaging, and safety verification. You can successfully find housing without ever paying a penny.'
    },
    {
      question: 'What does Premium add that Free doesn\'t have?',
      answer: 'Premium includes our advanced AI matching algorithm, unlimited messaging, priority placement in search results, background check access, priority support, and advanced search filters. It\'s designed for students who want the best possible matching experience.'
    },
    {
      question: 'How do University Sponsored accounts work?',
      answer: 'Some universities partner with us to provide premium features at no cost to their students. If your university is a partner, you automatically get premium features for free. Check with your housing office or contact us to see if your university participates.'
    },
    {
      question: 'Can I cancel my Premium subscription anytime?',
      answer: 'Absolutely! You can cancel your Premium subscription at any time. You\'ll continue to have premium features until the end of your current billing period, then automatically switch to our free plan.'
    },
    {
      question: 'Are there any hidden fees or charges?',
      answer: 'No hidden fees ever! The prices shown are exactly what you pay. Background checks through our partner service have a separate fee, but this is clearly disclosed and completely optional.'
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Our free plan is already designed with students in mind! Premium is priced affordably at less than the cost of a pizza per month. Some universities also sponsor premium access for their students.'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Safety First',
      description: 'All plans include comprehensive safety features and verification'
    },
    {
      icon: Clock,
      title: 'No Contracts',
      description: 'Cancel anytime with no long-term commitments required'
    },
    {
      icon: Globe,
      title: 'Nationwide Access',
      description: 'Access to housing near 200+ universities across the country'
    },
    {
      icon: Award,
      title: 'Success Guarantee',
      description: '95% of students find housing within 30 days using our platform'
    }
  ];

  const universityPartners = [
    'Stanford University', 'UC Berkeley', 'MIT', 'NYU', 'USC', 'UT Austin',
    'Harvard University', 'Yale University', 'Columbia University', 'UCLA'
  ];

  const stats = [
    { number: '95%', label: 'Success Rate' },
    { number: '50K+', label: 'Happy Students' },
    { number: '$0', label: 'Setup Fees' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-background via-secondary/20 to-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              💰 Simple & Transparent Pricing
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Housing for{' '}
              <span className="text-gradient">Free</span>{' '}
              or Get Premium Features
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
              Start completely free with all essential features, or upgrade to Premium 
              for advanced matching and priority support. No hidden fees, ever.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`card-gradient hover-lift relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        {feature.included ? (
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={feature.included ? '' : 'text-muted-foreground'}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Link to="/register">
                      <Button 
                        className={plan.ctaVariant === 'default' ? 'btn-hero w-full' : 'w-full'} 
                        variant={plan.ctaVariant}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
              ✨ Why Choose CampusConnect
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              More Than Just Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Every plan includes our commitment to safety, transparency, and student success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-gradient hover-lift text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-success/10 text-success border-success/20 mb-4">
              🏛️ University Sponsored Plans
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your University Might Sponsor Premium
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Many universities partner with us to provide premium features at no cost to their students. 
              Check if your university is one of our partners.
            </p>

            <div className="bg-card rounded-3xl p-8 shadow-medium border border-border/50 mb-8">
              <h3 className="text-2xl font-bold mb-6">Partner Universities</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {universityPartners.map((university, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium">{university}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/universities">
                <Button className="btn-hero">
                  View All University Partners
                </Button>
              </Link>
              <Button variant="outline" className="h-12 px-6">
                Contact Your Housing Office
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              ❓ Pricing Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="card-gradient">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-accent to-primary-light text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Housing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Start with our free plan and upgrade anytime. No contracts, no hidden fees, 
            just safe and successful housing matches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="bg-white text-primary hover:bg-white/90 h-14 px-8 text-lg font-semibold">
                <UserPlus className="w-5 h-5 mr-2" />
                Start Free Today
              </Button>
            </Link>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 h-14 px-8 text-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Talk to Our Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;