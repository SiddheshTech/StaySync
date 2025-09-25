import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const HelpPage = () => {
  const categories = [
    { title: 'Getting started guides', desc: 'New to StaySync? Start here.' },
    { title: 'Account and profile management', desc: 'Manage your account and profile settings.' },
    { title: 'Search and matching assistance', desc: 'Improve results and understand matches.' },
    { title: 'Communication and safety tips', desc: 'Best practices for safe interactions.' },
    { title: 'Billing and payment support', desc: 'Invoices, refunds, and payment methods.' },
    { title: 'Technical troubleshooting', desc: 'Fix common issues and errors.' },
  ];

  const articles = [
    'How to create an effective profile',
    'Safety tips for meeting roommates',
    'Understanding the matching algorithm',
    'Resolving roommate conflicts',
    'Payment and billing questions',
    'Privacy and security settings',
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Help Center</h1>
          <p className="text-muted-foreground">Find answers, tips, and resources to get the most out of StaySync</p>
          <div className="mx-auto max-w-2xl flex items-center gap-2">
            <Search className="w-4 h-4" />
            <Input placeholder="Search help articles..." />
            <Button>Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <Card key={i} className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <CardDescription>{c.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Browse Articles</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-hover">
          <CardHeader className="pb-3">
            <CardTitle>Popular Articles</CardTitle>
            <CardDescription>Frequently read resources</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {articles.map((a, i) => (
              <div key={i} className="flex items-center justify-between border rounded-md p-3 text-sm">
                <span className="font-medium">{a}</span>
                <Badge variant="secondary">Popular</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>Contact our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <a href="/support" className="inline-block">
              <Button className="btn-hero">Go to Contact & Support</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HelpPage;


