import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, GraduationCap } from 'lucide-react';

const demoProfiles = [
  { id: 1, name: 'Ananya Sharma', university: 'IIT Bombay', budget: 20000, city: 'Mumbai', traits: ['Early Bird','Non-smoker','Vegetarian'], interests: ['Music','Reading'], cleanliness: 'High', year: '2nd Year', gender: 'Female', bio: 'Friendly and studious. Loves quiet evenings and weekend treks.' },
  { id: 2, name: 'Rohit Mehta', university: 'IIT Delhi', budget: 25000, city: 'Delhi', traits: ['Night Owl','Non-smoker'], interests: ['Gym','Cricket'], cleanliness: 'Medium', year: '3rd Year', gender: 'Male', bio: 'Late-night coder, fitness enthusiast. Keeps common spaces tidy.' },
  { id: 3, name: 'Sara Khan', university: 'BITS Pilani', budget: 18000, city: 'Bangalore', traits: ['Pet Friendly','Vegetarian'], interests: ['Coffee','Design'], cleanliness: 'High', year: 'MBA', gender: 'Female', bio: 'Design lover and coffee person. Enjoys collaborative cooking.' },
  { id: 4, name: 'Dev Patel', university: 'IIM Bangalore', budget: 30000, city: 'Bangalore', traits: ['Quiet','Non-smoker'], interests: ['Startups','Coding'], cleanliness: 'High', year: 'PG', gender: 'Male', bio: 'Startup nerd, values cleanliness and focus during weekdays.' },
];

import { apiGet } from '@/lib/api';

const RoommateProfilePage = () => {
  const { id } = useParams();
  const profile = useMemo(() => demoProfiles.find(p => String(p.id) === id), [id]);
  const [remoteProfile, setRemoteProfile] = useState<any | null>(null);
  useEffect(() => {
    if (!id) return;
    apiGet<any>(`/roommates/${id}`).then(setRemoteProfile).catch(() => setRemoteProfile(null));
  }, [id]);

  const data = remoteProfile || profile;

  if (!data) {
    return (
      <div className="max-w-5xl mx-auto p-4">
        <Link to="/student/flatmates" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4 mr-2" /> Back to results</Link>
        <p className="mt-6">Profile not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <Link to="/student/flatmates" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4 mr-2" /> Back to results</Link>

      <Card>
        <CardContent className="p-6 flex gap-6">
          <Avatar className="w-24 h-24">
            <AvatarFallback className="bg-primary/10 text-primary">{data.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-semibold truncate">{data.name}</h1>
              <Badge variant="secondary" className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {data.university}</Badge>
              <Badge>₹{data.budget.toLocaleString()} / mo</Badge>
              <Badge variant="outline">{data.city}</Badge>
            </div>
            <p className="text-muted-foreground mt-2">{data.bio}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {data.traits.map((t: string) => (<Badge key={t} variant="outline">{t}</Badge>))}
            </div>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <Button asChild><Link to={`/student/messages/${id}`}>Message</Link></Button>
            <Button variant="outline">Save Profile</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="interests">Interests</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader><CardTitle>About</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div>Year: {data.year}</div>
              <div>Gender: {data.gender}</div>
              <div>Cleanliness: {data.cleanliness}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader><CardTitle>Living Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <div>Looking in: {data.city}</div>
              <div>Budget: ₹{data.budget.toLocaleString()} per month</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests">
          <Card>
            <CardHeader><CardTitle>Hobbies & Interests</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {data.interests.map((i: string) => (<Badge key={i} variant="secondary">{i}</Badge>))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RoommateProfilePage;


