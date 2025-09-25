import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<string>('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate create action; in real app, call API and then navigate
    navigate('/navigation');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Listing</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Modern Studio Near Campus" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Monthly Rent</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input type="number" className="pl-10" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1200" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter full address" />
              </div>
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="submit" className="btn-hero">Create Listing</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateListingPage;


