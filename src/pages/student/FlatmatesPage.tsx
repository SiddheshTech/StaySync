import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Users, Search, GraduationCap, Coffee, Moon, Music, Dumbbell } from 'lucide-react';

const demoProfiles = [
  { id: 1, name: 'Ananya Sharma', university: 'IIT Bombay', budget: 20000, city: 'Mumbai', traits: ['Early Bird','Non-smoker','Vegetarian'], interests: ['Music','Reading'], cleanliness: 'High', year: '2nd Year', gender: 'Female' },
  { id: 2, name: 'Rohit Mehta', university: 'IIT Delhi', budget: 25000, city: 'Delhi', traits: ['Night Owl','Non-smoker'], interests: ['Gym','Cricket'], cleanliness: 'Medium', year: '3rd Year', gender: 'Male' },
  { id: 3, name: 'Sara Khan', university: 'BITS Pilani', budget: 18000, city: 'Bangalore', traits: ['Pet Friendly','Vegetarian'], interests: ['Coffee','Design'], cleanliness: 'High', year: 'MBA', gender: 'Female' },
  { id: 4, name: 'Dev Patel', university: 'IIM Bangalore', budget: 30000, city: 'Bangalore', traits: ['Quiet','Non-smoker'], interests: ['Startups','Coding'], cleanliness: 'High', year: 'PG', gender: 'Male' },
];

const FlatmatesPage = () => {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('any');
  const [budget, setBudget] = useState<[number, number]>([15000, 40000]);
  const [onlyFemale, setOnlyFemale] = useState(false);
  const [onlyMale, setOnlyMale] = useState(false);

  const profiles = useMemo(() => {
    return demoProfiles.filter(p => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.university.toLowerCase().includes(query.toLowerCase())) return false;
      if (city !== 'any' && p.city.toLowerCase() !== city) return false;
      if (p.budget < budget[0] || p.budget > budget[1]) return false;
      if (onlyFemale && p.gender !== 'Female') return false;
      if (onlyMale && p.gender !== 'Male') return false;
      return true;
    });
  }, [query, city, budget, onlyFemale, onlyMale]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Find Flatmates</h1>
            <p className="text-muted-foreground">Match with compatible students based on lifestyle and budget</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Search name or university" value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div>
                  <Label>City</Label>
                  <Select value={city} onValueChange={setCity}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Budget (₹/mo)</Label>
                  <div className="px-2">
                    <Slider value={budget} onValueChange={setBudget} min={10000} max={60000} step={5000} />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>₹{budget[0].toLocaleString()}</span>
                      <span>₹{budget[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Gender preference</Label>
                  <div className="flex items-center gap-2"><Checkbox checked={onlyFemale} onCheckedChange={(v) => setOnlyFemale(!!v)} /> <span className="text-sm">Female only</span></div>
                  <div className="flex items-center gap-2"><Checkbox checked={onlyMale} onCheckedChange={(v) => setOnlyMale(!!v)} /> <span className="text-sm">Male only</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{profiles.length} matches</h2>
                <p className="text-muted-foreground">Based on your filters</p>
              </div>
            </div>
            {profiles.map(p => (
              <Card key={p.id} className="hover-lift">
                <CardContent className="p-4 flex gap-4 items-center">
                  <Avatar className="w-12 h-12"><AvatarFallback className="bg-primary/10 text-primary">{p.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold truncate">{p.name}</div>
                      <Badge variant="secondary" className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {p.university}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{p.city} • Budget: ₹{p.budget.toLocaleString()} / mo • Cleanliness: {p.cleanliness}</div>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs">
                      {p.traits.slice(0,3).map(t => (<Badge key={t} variant="outline">{t}</Badge>))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">View Profile</Button>
                    <Button size="sm">Message</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlatmatesPage;


