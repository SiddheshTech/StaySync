import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BrandBar from '@/components/BrandBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, MapPin, Star, Calendar, Share2, Heart, Shield, Check,
  Wifi, Car, Dumbbell, Utensils, Waves, Building, Phone, Mail, Clock,
  Camera, Video, Ruler, KeyRound, DoorOpen, LayoutPanelLeft,
  Train, Bus, Bike, Footprints
} from 'lucide-react';

// Detailed dataset for 5 listings matching SearchPage theme & INR context
const demoListings = [
  {
    id: 1,
    title: 'Modern Studio in Connaught Place',
    location: 'Connaught Place, Delhi',
    rent: 25000,
    bedrooms: 0,
    bathrooms: 1,
    sqft: 450,
    rating: 4.8,
    reviews: 24,
    distanceKm: 0.8,
    moveInDate: '2024-08-01',
    leaseLength: '12 months',
    deposit: 25000,
    utilities: 'Included',
    petFriendly: false,
    furnished: true,
    parking: 'Covered',
    security: '24/7',
    nearbyTransit: ['Metro (Rajiv Chowk)', 'Bus'],
    walkScore: 92,
    bikeScore: 80,
    transitScore: 88,
    amenities: ['WiFi','Laundry','Parking','Gym','Pool','Study Room','Air Conditioning','Washer/Dryer'],
    highlights: ['Prime central location','Modern fittings','Ideal for students & interns'],
    description: 'Beautiful modern studio with premium amenities and quick access to Rajiv Chowk metro, eateries and co-working hubs. Perfect for students and young professionals seeking a safe, well-connected address.',
    images: ['/placeholder.svg','/placeholder.svg','/placeholder.svg','/placeholder.svg'],
    landlord: { name: 'Capital Homes', rating: 4.6, avatar: 'CH', verified: true, responseTime: '2 hours' }
  },
  {
    id: 2,
    title: 'Looking for Female Roommate - 2BR Apartment',
    location: 'Koramangala, Bangalore',
    rent: 18000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 520,
    rating: 4.9,
    reviews: 11,
    distanceKm: 1.2,
    moveInDate: '2024-08-15',
    leaseLength: 'Flexible',
    deposit: 18000,
    utilities: 'Split',
    petFriendly: true,
    furnished: false,
    parking: 'Street',
    security: 'Building',
    nearbyTransit: ['BMTC Bus','Metro (Indiranagar via bus)'],
    walkScore: 85,
    bikeScore: 88,
    transitScore: 72,
    amenities: ['WiFi','Kitchen','Study Room','Garden','Parking','Washer/Dryer'],
    highlights: ['Female-only roommate','Pet friendly','Near cafes & tech parks'],
    description: 'Spacious 2BR with a welcoming roommate. Peaceful lane close to 100 ft Road cafes, supermarkets, and co-working spaces. Ideal for students and early-career professionals.',
    images: ['/placeholder.svg','/placeholder.svg','/placeholder.svg'],
    landlord: { name: 'Owner-Managed', rating: 4.7, avatar: 'OM', verified: true, responseTime: '4 hours' }
  },
  {
    id: 3,
    title: 'Cozy 1BR Near Campus',
    location: 'Powai, Mumbai',
    rent: 30000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    rating: 4.5,
    reviews: 18,
    distanceKm: 0.8,
    moveInDate: '2024-09-01',
    leaseLength: '12 months',
    deposit: 30000,
    utilities: 'Not Included',
    petFriendly: true,
    furnished: false,
    parking: 'Assigned',
    security: 'Building',
    nearbyTransit: ['Metro (Saki Naka)','BEST Bus'],
    walkScore: 78,
    bikeScore: 70,
    transitScore: 82,
    amenities: ['WiFi','Gym','Pool','Laundry','Parking','Air Conditioning','Dishwasher'],
    highlights: ['Close to campus','Modern building','Great clubhouse'],
    description: 'Comfortable 1BR in a modern society with amenities and strong security. Quick commute to campus and lakeside trails.',
    images: ['/placeholder.svg','/placeholder.svg','/placeholder.svg','/placeholder.svg'],
    landlord: { name: 'Campus Living LLC', rating: 4.3, avatar: 'CL', verified: true, responseTime: '6 hours' }
  },
  {
    id: 4,
    title: 'Grad Student Seeking Quiet Roommate',
    location: 'Indiranagar, Bangalore',
    rent: 15000,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 480,
    rating: 4.7,
    reviews: 9,
    distanceKm: 2.1,
    moveInDate: '2024-08-01',
    leaseLength: '12 months',
    deposit: 15000,
    utilities: 'Split',
    petFriendly: false,
    furnished: true,
    parking: 'Garage',
    security: 'Building',
    nearbyTransit: ['Metro (Indiranagar)','BMTC Bus'],
    walkScore: 86,
    bikeScore: 78,
    transitScore: 74,
    amenities: ['WiFi','Parking','Quiet','Study Space','Kitchen','Washer/Dryer'],
    highlights: ['Academic-friendly','Quiet street','Fully furnished'],
    description: 'Ideal for a graduate student who values a peaceful environment. Study-friendly setup with strong WiFi and dedicated desk space.',
    images: ['/placeholder.svg','/placeholder.svg'],
    landlord: { name: 'Alex Chen (Tenant)', rating: 4.7, avatar: 'AC', verified: true, responseTime: '3 hours' }
  },
  {
    id: 5,
    title: 'Luxury 2BR with City Views',
    location: 'Bandra West, Mumbai',
    rent: 56000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    rating: 4.9,
    reviews: 31,
    distanceKm: 3.5,
    moveInDate: '2024-07-15',
    leaseLength: '12 months',
    deposit: 56000,
    utilities: 'Not Included',
    petFriendly: true,
    furnished: false,
    parking: 'Garage',
    security: '24/7',
    nearbyTransit: ['Metro (Bandra)','BEST Bus'],
    walkScore: 90,
    bikeScore: 75,
    transitScore: 80,
    amenities: ['WiFi','Gym','Pool','Laundry','Parking','Balcony','Dishwasher','Air Conditioning'],
    highlights: ['Panoramic views','Premium society','High security'],
    description: 'Stunning 2BR with expansive city views, high-floor unit, and access to premium clubhouse facilities. Suits executives or students wanting upscale living.',
    images: ['/placeholder.svg','/placeholder.svg','/placeholder.svg','/placeholder.svg','/placeholder.svg'],
    landlord: { name: 'Hillside Properties', rating: 4.8, avatar: 'HP', verified: true, responseTime: '1 hour' }
  }
];

const amenityIcon = (name: string) => {
  const key = name.toLowerCase();
  if (key.includes('wifi')) return <Wifi className="w-3 h-3" />;
  if (key.includes('parking')) return <Car className="w-3 h-3" />;
  if (key.includes('gym')) return <Dumbbell className="w-3 h-3" />;
  if (key.includes('pool')) return <Waves className="w-3 h-3" />;
  if (key.includes('kitchen') || key.includes('dishwasher')) return <Utensils className="w-3 h-3" />;
  return <Building className="w-3 h-3" />;
};

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = useMemo(() => {
    const numId = Number(id);
    return demoListings.find(l => l.id === numId);
  }, [id]);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <BrandBar badgeText="Listing Details" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-2xl font-semibold mb-4">Listing not found</div>
              <Button variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Go Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Listing Details" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Results
          </Button>
          <div className="flex gap-2">
            <Button variant="outline"><Share2 className="w-4 h-4 mr-2" /> Share</Button>
            <Button variant="outline"><Heart className="w-4 h-4 mr-2" /> Save</Button>
          </div>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">{listing.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {listing.location}</div>
            <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {listing.rating} ({listing.reviews} reviews)</div>
            <div className="flex items-center gap-1"><Footprints className="w-4 h-4" /> {listing.distanceKm} km to campus</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gallery placeholder */}
          <Card className="lg:col-span-2">
            <CardContent className="p-4">
              <div className="aspect-video rounded-xl bg-muted flex items-center justify-center">
                <div className="text-center">
                  <Building className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Gallery placeholder</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-video rounded-md bg-muted" />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="text-3xl font-bold text-primary">₹{listing.rent.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-lg font-semibold">{listing.bedrooms ?? 1}</div>
                  <div className="text-xs text-muted-foreground">Bedrooms</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{listing.bathrooms}</div>
                  <div className="text-xs text-muted-foreground">Bathrooms</div>
                </div>
                <div>
                  <div className="text-lg font-semibold">{listing.sqft ?? 550}</div>
                  <div className="text-xs text-muted-foreground">Sq ft</div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8"><AvatarFallback className="bg-primary/10 text-primary">{listing?.landlord?.avatar ?? 'LL'}</AvatarFallback></Avatar>
                <div className="text-sm">
                  <div className="font-medium flex items-center gap-2">
                    {listing?.landlord?.name ?? 'Verified Landlord'}
                    <Badge variant="secondary" className="flex items-center gap-1"><Shield className="w-3 h-3" /> Verified</Badge>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {listing?.landlord?.rating ?? 4.6}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="border rounded-md p-2 flex items-center gap-2"><KeyRound className="w-3 h-3" /> Deposit: ₹{listing.deposit.toLocaleString()}</div>
                <div className="border rounded-md p-2 flex items-center gap-2"><LayoutPanelLeft className="w-3 h-3" /> Lease: {listing.leaseLength}</div>
                <div className="border rounded-md p-2 flex items-center gap-2"><Clock className="w-3 h-3" /> Move-in: {new Date(listing.moveInDate).toLocaleDateString()}</div>
                <div className="border rounded-md p-2 flex items-center gap-2"><Ruler className="w-3 h-3" /> Parking: {listing.parking}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button>Contact</Button>
                <Button variant="outline">Schedule Visit <Calendar className="w-4 h-4 ml-2" /></Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader className="pb-2"><CardTitle>About this place</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{listing.description}</p>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2"><CardTitle>Highlights</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      {listing.highlights?.map((h: string) => (
                        <div key={h} className="flex items-center gap-2 text-sm"><Check className="w-4 h-4 text-success" /> {h}</div>
                      ))}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2"><CardTitle>Transit & Scores</CardTitle></CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div className="flex items-center gap-2"><Train className="w-4 h-4" /> {listing.nearbyTransit?.join(', ')}</div>
                      <div className="flex items-center gap-2"><Footprints className="w-4 h-4" /> Walk Score: {listing.walkScore}</div>
                      <div className="flex items-center gap-2"><Bike className="w-4 h-4" /> Bike Score: {listing.bikeScore}</div>
                      <div className="flex items-center gap-2"><Bus className="w-4 h-4" /> Transit Score: {listing.transitScore}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2"><CardTitle>Virtual Media</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-2 gap-2 text-sm">
                      <Button variant="outline"><Camera className="w-4 h-4 mr-2" /> Photos</Button>
                      <Button variant="outline"><Video className="w-4 h-4 mr-2" /> Video</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {listing.amenities?.map((a) => (
                    <div key={a} className="flex items-center gap-2 border rounded-md p-2 text-sm">
                      {amenityIcon(a)}
                      <span>{a}</span>
                      <Check className="w-3 h-3 text-success ml-auto" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="policies" className="space-y-3 text-sm">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="border rounded-md p-3">Lease: {listing.leaseLength}. Move-in after {new Date(listing.moveInDate).toLocaleDateString()}.</div>
                  <div className="border rounded-md p-3">Deposit: ₹{listing.deposit.toLocaleString()} • Utilities: {listing.utilities}</div>
                  <div className="border rounded-md p-3">Furnished: {listing.furnished ? 'Yes' : 'No'} • Pet friendly: {listing.petFriendly ? 'Yes' : 'No'}</div>
                  <div className="border rounded-md p-3">Security: {listing.security}</div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-3">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="text-sm text-muted-foreground">Near public transit, cafes, and grocery stores.</div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input placeholder="Your full name" className="mt-1" />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input placeholder="Your phone" className="mt-1" />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Message</Label>
                        <Textarea rows={4} placeholder={`Hello, I am interested in ${listing.title}. When can I schedule a visit?`} className="mt-1" />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button><Phone className="w-4 h-4 mr-2" /> Request Call</Button>
                      <Button variant="outline"><Mail className="w-4 h-4 mr-2" /> Send Message</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faqs" className="space-y-3">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="q1">
                    <AccordionTrigger>What documents are required?</AccordionTrigger>
                    <AccordionContent>Standard KYC (ID proof), student ID or employment proof, and basic references if applicable.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q2">
                    <AccordionTrigger>How is maintenance handled?</AccordionTrigger>
                    <AccordionContent>Report issues via the app or WhatsApp. Typical response within 24-48 hours.</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="q3">
                    <AccordionTrigger>Is there a lock-in period?</AccordionTrigger>
                    <AccordionContent>Most leases require a 3-month minimum. Early exit may forfeit part of the deposit.</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Similar listings */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Similar Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {demoListings.filter(l => l.id !== listing.id).slice(0,3).map(sim => (
              <Card key={sim.id} className="hover-lift">
                <CardContent className="p-4 space-y-3">
                  <div className="aspect-video bg-muted rounded-lg" />
                  <div className="font-medium line-clamp-1">{sim.title}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {sim.location}</div>
                  <div className="text-primary font-semibold">₹{sim.rent.toLocaleString()} / mo</div>
                  <Link to={`/listing/${sim.id}`}>
                    <Button variant="outline" size="sm" className="w-full">View</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;


