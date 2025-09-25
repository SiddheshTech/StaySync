import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  MapPin, 
  Heart, 
  Grid3X3, 
  List, 
  MessageCircle, 
  Video, 
  Star,
  ArrowLeft,
  X
} from 'lucide-react';

const NavigationPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const properties = [
    {
      id: 1,
      title: 'Modern Studio Near Campus',
      price: 1200,
      location: 'Downtown',
      distance: '0.5 miles from campus',
      rating: 4.8,
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop'],
      amenities: ['Wifi', 'Laundry', 'Parking'],
      roommates: 0,
      available: '2024-08-01',
      compatibility: 92
    },
    {
      id: 2,
      title: 'Shared Apartment with International Students',
      price: 800,
      location: 'University District',
      distance: '0.2 miles from campus',
      rating: 4.6,
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop'],
      amenities: ['Wifi', 'Kitchen', 'Study Room'],
      roommates: 2,
      available: '2024-09-01',
      compatibility: 87
    },
    {
      id: 3,
      title: 'Luxury Single Room with Balcony',
      price: 1500,
      location: 'City Center',
      distance: '1.2 miles from campus',
      rating: 4.9,
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop'],
      amenities: ['Gym', 'Pool', 'Concierge'],
      roommates: 0,
      available: '2024-07-15',
      compatibility: 95
    }
  ];



  const PropertyCard = ({ property }) => (
    <Card className="card-hover">
      <div className="relative">
        <img 
          src={property.images[0]} 
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <Button 
          size="sm" 
          variant="secondary" 
          className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background"
        >
          <Heart size={16} />
        </Button>
        <Badge className="absolute bottom-3 left-3 bg-green-500 hover:bg-green-500">
          {property.compatibility}% Match
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-foreground line-clamp-2">{property.title}</h3>
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-muted-foreground">{property.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin size={14} className="mr-1" />
          <span className="text-sm">{property.location} • {property.distance}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-foreground">${property.price}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
          <div className="flex space-x-1">
            <Button size="sm" variant="ghost">
              <MessageCircle size={16} />
            </Button>
            <Button size="sm" variant="ghost">
              <Video size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const FilterPanel = () => (
    <Card className={`fixed md:relative top-0 left-0 h-full w-80 transform transition-transform z-40 ${
      showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowFilters(false)}
            className="md:hidden"
          >
            <X size={20} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
          <div className="space-y-2">
            <input type="range" min="500" max="3000" className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>$500</span>
              <span>$3000</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Location</label>
          <select className="w-full border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent bg-background">
            <option>Any Location</option>
            <option>Downtown</option>
            <option>University District</option>
            <option>City Center</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Move-in Date</label>
          <Input 
            type="date" 
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Roommates</label>
          <div className="space-y-2">
            {['No roommates', '1 roommate', '2+ roommates', 'No preference'].map((option) => (
              <label key={option} className="flex items-center">
                <input type="radio" name="roommates" className="mr-2" />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Amenities</label>
          <div className="space-y-2">
            {['WiFi', 'Parking', 'Laundry', 'Kitchen', 'Gym', 'Study Room'].map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">{amenity}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );





  const SearchInterface = () => (
    <div className="flex h-full">
      {showFilters && <FilterPanel />}
      
      <div className="flex-1 flex flex-col">
        {/* Search Header */}
        <Card className="border-b">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search for housing near your university..."
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
              >
                <Filter size={20} className="mr-2" />
                <span className="hidden md:block">Filters</span>
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">245 results found</span>
                <select className="border border-input rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent bg-background">
                  <option>Sort by Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Highest Rated</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={() => setViewMode('grid')}
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                >
                  <Grid3X3 size={20} />
                </Button>
                <Button 
                  onClick={() => setViewMode('list')}
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                >
                  <List size={20} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-6 bg-muted/30">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-subtle">
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
            <h1 className="text-3xl font-bold text-foreground">Search Listings</h1>
            <p className="text-muted-foreground">Find your perfect housing match</p>
          </div>
        </div>

        {/* Search Interface */}
        <div className="h-[calc(100vh-12rem)]">
          <SearchInterface />
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;