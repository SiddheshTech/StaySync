import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BrandBar from '@/components/BrandBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Users,
  Home,
  Heart,
  Star,
  Wifi,
  Car,
  Dumbbell,
  Coffee,
  Calendar
} from 'lucide-react';

const SearchPage = () => {
  const [budgetRange, setBudgetRange] = useState([500, 2000]);
  const [showFilters, setShowFilters] = useState(false);

  const listings = [
    {
      id: 1,
      type: 'apartment',
      title: 'Modern Studio in Downtown Berkeley',
      location: 'Downtown Berkeley',
      rent: 1200,
      bedrooms: 0,
      bathrooms: 1,
      sqft: 450,
      amenities: ['WiFi', 'Laundry', 'Parking'],
      rating: 4.8,
      reviews: 24,
      distance: '0.3 miles from campus',
      available: '2024-08-01',
      landlord: {
        name: 'Berkeley Properties',
        rating: 4.6,
        avatar: 'BP'
      },
      images: 3,
      featured: true
    },
    {
      id: 2,
      type: 'roommate',
      title: 'Looking for Female Roommate - 2BR Apartment',
      location: 'North Berkeley',
      rent: 900,
      bedrooms: 1,
      bathrooms: 1,
      roommate: {
        name: 'Emma Johnson',
        major: 'Computer Science',
        year: 'Junior',
        avatar: 'EJ'
      },
      amenities: ['WiFi', 'Kitchen', 'Study Room'],
      rating: 4.9,
      compatibility: 95,
      distance: '0.8 miles from campus',
      available: '2024-08-15',
      images: 5
    },
    {
      id: 3,
      type: 'apartment',
      title: 'Cozy 1BR Near Campus',
      location: 'Southside Berkeley',
      rent: 1500,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 600,
      amenities: ['WiFi', 'Gym', 'Pool'],
      rating: 4.5,
      reviews: 18,
      distance: '0.2 miles from campus',
      available: '2024-09-01',
      landlord: {
        name: 'Campus Living LLC',
        rating: 4.3,
        avatar: 'CL'
      },
      images: 4
    },
    {
      id: 4,
      type: 'roommate',
      title: 'Grad Student Seeking Quiet Roommate',
      location: 'Albany',
      rent: 750,
      bedrooms: 1,
      bathrooms: 1,
      roommate: {
        name: 'Alex Chen',
        major: 'Physics PhD',
        year: 'Graduate',
        avatar: 'AC'
      },
      amenities: ['WiFi', 'Parking', 'Quiet'],
      rating: 4.7,
      compatibility: 88,
      distance: '1.2 miles from campus',
      available: '2024-08-01',
      images: 2
    }
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'parking':
        return <Car className="w-3 h-3" />;
      case 'gym':
        return <Dumbbell className="w-3 h-3" />;
      default:
        return <Coffee className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Browse Listings" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Browse Listings</h1>
            <p className="text-muted-foreground">Find your perfect housing match</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <Label>Search Location</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Berkeley, Oakland..." className="pl-10" />
                  </div>
                </div>

                {/* Listing Type */}
                <div className="space-y-2">
                  <Label>Listing Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Listings</SelectItem>
                      <SelectItem value="apartment">Apartments</SelectItem>
                      <SelectItem value="roommate">Roommate Match</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <Label>Budget Range (per month)</Label>
                  <div className="px-3">
                    <Slider
                      value={budgetRange}
                      onValueChange={setBudgetRange}
                      max={3000}
                      min={400}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>${budgetRange[0]}</span>
                      <span>${budgetRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {[0, 1, 2, 3, '4+'].map((beds) => (
                      <Button
                        key={beds}
                        variant="outline"
                        size="sm"
                        className="p-2 h-8"
                      >
                        {beds === 0 ? 'Studio' : beds}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="space-y-2">
                  <Label>Amenities</Label>
                  <div className="space-y-2">
                    {['WiFi', 'Parking', 'Laundry', 'Gym', 'Pool', 'Study Room'].map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox id={amenity} />
                        <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Distance */}
                <div className="space-y-2">
                  <Label>Distance from Campus</Label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Distance</SelectItem>
                      <SelectItem value="0.5">Within 0.5 miles</SelectItem>
                      <SelectItem value="1">Within 1 mile</SelectItem>
                      <SelectItem value="2">Within 2 miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full btn-hero">
                  Apply Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">{listings.length} listings found</h2>
                <p className="text-muted-foreground">Showing results for Berkeley area</p>
              </div>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Listings Grid */}
            <div className="space-y-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Image Placeholder */}
                      <div className="lg:w-64 h-48 bg-muted rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Home className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">{listing.images} photos</p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">{listing.title}</h3>
                              {listing.featured && (
                                <Badge variant="default" className="bg-yellow-500">Featured</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {listing.location}
                              </div>
                              <span>{listing.distance}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-primary">${listing.rent}</p>
                            <p className="text-xs text-muted-foreground">per month</p>
                          </div>
                          
                          {listing.type === 'apartment' ? (
                            <>
                              <div className="text-center">
                                <p className="text-lg font-semibold">{listing.bedrooms === 0 ? 'Studio' : listing.bedrooms}</p>
                                <p className="text-xs text-muted-foreground">bedrooms</p>
                              </div>
                              <div className="text-center">
                                <p className="text-lg font-semibold">{listing.bathrooms}</p>
                                <p className="text-xs text-muted-foreground">bathrooms</p>
                              </div>
                              <div className="text-center">
                                <p className="text-lg font-semibold">{listing.sqft}</p>
                                <p className="text-xs text-muted-foreground">sq ft</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="text-center">
                                <p className="text-lg font-semibold">{listing.compatibility}%</p>
                                <p className="text-xs text-muted-foreground">compatibility</p>
                              </div>
                              <div className="text-center">
                                <Avatar className="w-8 h-8 mx-auto mb-1">
                                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                    {listing.roommate?.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <p className="text-xs text-muted-foreground">{listing.roommate?.name}</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-semibold">{listing.roommate?.major}</p>
                                <p className="text-xs text-muted-foreground">{listing.roommate?.year}</p>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{listing.rating}</span>
                            {listing.reviews && (
                              <span className="text-sm text-muted-foreground">({listing.reviews} reviews)</span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Available {new Date(listing.available).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          {listing.amenities.slice(0, 3).map((amenity) => (
                            <Badge key={amenity} variant="outline" className="flex items-center gap-1">
                              {getAmenityIcon(amenity)}
                              {amenity}
                            </Badge>
                          ))}
                          {listing.amenities.length > 3 && (
                            <Badge variant="outline">+{listing.amenities.length - 3} more</Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          {listing.type === 'apartment' ? (
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {listing.landlord?.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">{listing.landlord?.name}</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{listing.landlord?.rating}</span>
                              </div>
                            </div>
                          ) : (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {listing.compatibility}% Compatible
                            </Badge>
                          )}
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button size="sm" className="btn-hero">
                              {listing.type === 'apartment' ? 'Contact' : 'Message'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;