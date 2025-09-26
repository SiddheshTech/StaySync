import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Users, Search, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiGet } from '@/lib/api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';

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
  const [cleanliness, setCleanliness] = useState<'any' | 'High' | 'Medium' | 'Low'>('any');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'budgetAsc' | 'budgetDesc'>('relevance');

  const profiles = useMemo(() => {
    const filtered = demoProfiles.filter(p => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()) && !p.university.toLowerCase().includes(query.toLowerCase())) return false;
      if (city !== 'any' && p.city.toLowerCase() !== city) return false;
      if (p.budget < budget[0] || p.budget > budget[1]) return false;
      if (onlyFemale && p.gender !== 'Female') return false;
      if (onlyMale && p.gender !== 'Male') return false;
      if (cleanliness !== 'any' && p.cleanliness !== cleanliness) return false;
      if (selectedTraits.length && !selectedTraits.every(t => p.traits.includes(t))) return false;
      if (selectedInterests.length && !selectedInterests.some(i => p.interests.includes(i))) return false;
      return true;
    });
    if (sortBy === 'budgetAsc') return [...filtered].sort((a, b) => a.budget - b.budget);
    if (sortBy === 'budgetDesc') return [...filtered].sort((a, b) => b.budget - a.budget);
    return filtered;
  }, [query, city, budget, onlyFemale, onlyMale, cleanliness, selectedTraits, selectedInterests, sortBy]);

  // Optional: live fetch from backend and replace demoProfiles rendering
  const [remoteProfiles, setRemoteProfiles] = useState<any[] | null>(null);
  useEffect(() => {
    const params: any = {
      q: query,
      city,
      min: budget[0],
      max: budget[1],
      gender: onlyFemale ? 'Female' : onlyMale ? 'Male' : 'any',
      cleanliness,
      traits: selectedTraits.join(','),
      interests: selectedInterests.join(','),
      sort: sortBy,
    };
    apiGet<{ items: any[] }>("/roommates", params).then((data) => setRemoteProfiles(data.items)).catch(() => setRemoteProfiles(null));
  }, [query, city, budget, onlyFemale, onlyMale, cleanliness, selectedTraits, selectedInterests, sortBy]);

  const shownProfiles = remoteProfiles ?? profiles;

  const allTraits = ['Early Bird','Night Owl','Non-smoker','Vegetarian','Pet Friendly','Quiet'];
  const allInterests = ['Music','Gym','Coffee','Design','Cricket','Reading','Startups','Coding'];

  const toggleInArray = (value: string, array: string[], setArray: (v: string[]) => void) => {
    setArray(array.includes(value) ? array.filter(v => v !== value) : [...array, value]);
  };

  const resetFilters = () => {
    setQuery('');
    setCity('any');
    setBudget([15000, 40000]);
    setOnlyFemale(false);
    setOnlyMale(false);
    setCleanliness('any');
    setSelectedTraits([]);
    setSelectedInterests([]);
    setSortBy('relevance');
  };

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
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="basic">
                    <AccordionTrigger>Basic</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
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
                            <Slider value={budget} onValueChange={(v) => setBudget([v[0], v[1]] as [number, number])} min={10000} max={60000} step={5000} />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>₹{budget[0].toLocaleString()}</span>
                              <span>₹{budget[1].toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Gender preference</Label>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Female only</span>
                            <Switch checked={onlyFemale} onCheckedChange={(v) => setOnlyFemale(!!v)} />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Male only</span>
                            <Switch checked={onlyMale} onCheckedChange={(v) => setOnlyMale(!!v)} />
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="compatibility">
                    <AccordionTrigger>Compatibility</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <Label>Cleanliness</Label>
                          <Select value={cleanliness} onValueChange={(v) => setCleanliness(v as any)}>
                            <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="any">Any</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Lifestyle & Traits</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {allTraits.map(t => (
                              <Button key={t} type="button" variant={selectedTraits.includes(t) ? 'default' : 'outline'} size="sm" onClick={() => toggleInArray(t, selectedTraits, setSelectedTraits)}>
                                {t}
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>Interests</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {allInterests.map(i => (
                              <Badge key={i} variant={selectedInterests.includes(i) ? 'default' : 'outline'} className="cursor-pointer" onClick={() => toggleInArray(i, selectedInterests, setSelectedInterests)}>
                                {i}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">We will prioritize profiles sharing any of your selected interests.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sort">
                    <AccordionTrigger>Sort</AccordionTrigger>
                    <AccordionContent>
                      <div>
                        <Label>Sort by</Label>
                        <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
                          <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="relevance">Best match</SelectItem>
                            <SelectItem value="budgetAsc">Budget: Low to High</SelectItem>
                            <SelectItem value="budgetDesc">Budget: High to Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex items-center justify-between pt-2">
                  <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
                  <Button size="sm">Apply Filters</Button>
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
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/student/flatmates/${p.id}`}>View Profile</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link to={`/student/messages/${p.id}`}>Message</Link>
                    </Button>
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


