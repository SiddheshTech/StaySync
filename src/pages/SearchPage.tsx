import { useState, useEffect, useMemo } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
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
  Calendar,
  Map,
  List,
  Grid3X3,
  SortAsc,
  SortDesc,
  Save,
  Bell,
  Share2,
  Eye,
  Clock,
  TrendingUp,
  Award,
  Shield,
  Zap,
  Target,
  Bookmark,
  FilterX,
  RefreshCw,
  Settings,
  BarChart3,
  Compass,
  Layers,
  Building,
  TreePine,
  Bus,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Camera,
  Video,
  Play,
  ChevronDown,
  ChevronUp,
  X,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Info,
  Lightbulb,
  Sparkles,
  BookOpen,
  Droplets,
  Waves
} from 'lucide-react';

const SearchPage = () => {
  // State management for comprehensive search functionality
  const [budgetRange, setBudgetRange] = useState([15000, 60000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'map'>('list');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['apartment', 'roommate']);
  const [distanceRange, setDistanceRange] = useState([0, 5]);
  const [bedroomCount, setBedroomCount] = useState<number | null>(null);
  const [bathroomCount, setBathroomCount] = useState<number | null>(null);
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | null>(null);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [comparisonList, setComparisonList] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [favoriteListings, setFavoriteListings] = useState<number[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchAlerts, setSearchAlerts] = useState<any[]>([]);
  const [showSearchAnalytics, setShowSearchAnalytics] = useState(false);
  
  // Derived: active filters summary
  const activeFilterChips = useMemo(() => {
    const chips: { key: string; label: string; onClear: () => void }[] = [];
    if (searchQuery) chips.push({ key: 'q', label: `"${searchQuery}"`, onClear: () => setSearchQuery('') });
    if (selectedTypes.length && selectedTypes.length < 2) chips.push({ key: 'type', label: selectedTypes[0] === 'apartment' ? 'Apartments' : 'Roommates', onClear: () => setSelectedTypes(['apartment','roommate']) });
    if (bedroomCount !== null) chips.push({ key: 'bed', label: `${bedroomCount === 0 ? 'Studio' : bedroomCount} bed`, onClear: () => setBedroomCount(null) });
    if (bathroomCount !== null) chips.push({ key: 'bath', label: `${bathroomCount} bath`, onClear: () => setBathroomCount(null) });
    if (selectedAmenities.length) chips.push({ key: 'amen', label: `${selectedAmenities.length} amenities`, onClear: () => setSelectedAmenities([]) });
    if (budgetRange[0] !== 15000 || budgetRange[1] !== 60000) chips.push({ key: 'budget', label: `₹${budgetRange[0].toLocaleString()}–₹${budgetRange[1].toLocaleString()}`, onClear: () => setBudgetRange([15000,60000]) });
    if (distanceRange[0] !== 0 || distanceRange[1] !== 5) chips.push({ key: 'dist', label: `≤ ${distanceRange[1]} km`, onClear: () => setDistanceRange([0,5]) });
    return chips;
  }, [searchQuery, selectedTypes, bedroomCount, bathroomCount, selectedAmenities, budgetRange, distanceRange]);

  // Enhanced listings data with comprehensive information
  const listings = [
    {
      id: 1,
      type: 'apartment',
      title: 'Modern Studio in Connaught Place',
      location: 'Connaught Place, Delhi',
      rent: 25000,
      bedrooms: 0,
      bathrooms: 1,
      sqft: 450,
      amenities: ['WiFi', 'Laundry', 'Parking', 'Gym', 'Pool', 'Study Room'],
      rating: 4.8,
      reviews: 24,
      distance: 0.5,
      available: '2024-08-01',
      landlord: {
        name: 'Berkeley Properties',
        rating: 4.6,
        avatar: 'BP',
        verified: true,
        responseTime: '2 hours'
      },
      images: 8,
      featured: true,
      moveInDate: '2024-08-01',
      leaseLength: '12 months',
      deposit: 25000,
      utilities: 'Included',
      petFriendly: false,
      smokingAllowed: false,
      furnished: true,
      airConditioning: true,
      heating: true,
      dishwasher: true,
      washerDryer: true,
      balcony: false,
      parking: 'Covered',
      security: '24/7',
      nearbyTransit: ['BART', 'AC Transit'],
      walkScore: 85,
      bikeScore: 92,
      transitScore: 78,
      description: 'Beautiful modern studio with premium amenities in the heart of downtown Berkeley. Perfect for students who want to be close to campus and city life.',
      highlights: ['Prime Location', 'Modern Amenities', 'Student-Friendly'],
      virtualTour: true,
      videoTour: true,
      lastUpdated: '2024-01-15',
      views: 1247,
      saves: 89,
      applications: 12
    },
    {
      id: 2,
      type: 'roommate',
      title: 'Looking for Female Roommate - 2BR Apartment',
      location: 'Koramangala, Bangalore',
      rent: 18000,
      bedrooms: 1,
      bathrooms: 1,
      roommate: {
        name: 'Emma Johnson',
        major: 'Computer Science',
        year: 'Junior',
        avatar: 'EJ',
        age: 20,
        interests: ['Coding', 'Hiking', 'Photography'],
        lifestyle: 'Quiet, studious',
        socialLevel: 'Medium',
        cleanliness: 'Very Clean'
      },
      amenities: ['WiFi', 'Kitchen', 'Study Room', 'Garden', 'Parking'],
      rating: 4.9,
      compatibility: 95,
      distance: 1.2,
      available: '2024-08-15',
      images: 6,
      moveInDate: '2024-08-15',
      leaseLength: 'Flexible',
      deposit: 18000,
      utilities: 'Split',
      petFriendly: true,
      smokingAllowed: false,
      furnished: false,
      airConditioning: false,
      heating: true,
      dishwasher: true,
      washerDryer: true,
      balcony: true,
      parking: 'Street',
      security: 'Building',
      nearbyTransit: ['AC Transit'],
      walkScore: 72,
      bikeScore: 85,
      transitScore: 65,
      description: 'Looking for a responsible female roommate to share a beautiful 2BR apartment. Great location with easy access to campus and local amenities.',
      highlights: ['Female Only', 'Pet Friendly', 'Flexible Lease'],
      virtualTour: false,
      videoTour: true,
      lastUpdated: '2024-01-14',
      views: 892,
      saves: 67,
      applications: 8
    },
    {
      id: 3,
      type: 'apartment',
      title: 'Cozy 1BR Near Campus',
      location: 'Powai, Mumbai',
      rent: 30000,
      bedrooms: 1,
      bathrooms: 1,
      sqft: 600,
      amenities: ['WiFi', 'Gym', 'Pool', 'Laundry', 'Parking'],
      rating: 4.5,
      reviews: 18,
      distance: 0.8,
      available: '2024-09-01',
      landlord: {
        name: 'Campus Living LLC',
        rating: 4.3,
        avatar: 'CL',
        verified: true,
        responseTime: '4 hours'
      },
      images: 5,
      moveInDate: '2024-09-01',
      leaseLength: '12 months',
      deposit: 30000,
      utilities: 'Not Included',
      petFriendly: true,
      smokingAllowed: false,
      furnished: false,
      airConditioning: true,
      heating: true,
      dishwasher: true,
      washerDryer: true,
      balcony: true,
      parking: 'Assigned',
      security: 'Building',
      nearbyTransit: ['BART', 'AC Transit'],
      walkScore: 78,
      bikeScore: 88,
      transitScore: 82,
      description: 'Charming 1BR apartment just steps from campus. Perfect for graduate students who want convenience and comfort.',
      highlights: ['Campus Proximity', 'Pet Friendly', 'Modern Building'],
      virtualTour: true,
      videoTour: false,
      lastUpdated: '2024-01-13',
      views: 1563,
      saves: 134,
      applications: 19
    },
    {
      id: 4,
      type: 'roommate',
      title: 'Grad Student Seeking Quiet Roommate',
      location: 'Indiranagar, Bangalore',
      rent: 15000,
      bedrooms: 1,
      bathrooms: 1,
      roommate: {
        name: 'Alex Chen',
        major: 'Physics PhD',
        year: 'Graduate',
        avatar: 'AC',
        age: 26,
        interests: ['Research', 'Reading', 'Coffee'],
        lifestyle: 'Very quiet, focused on studies',
        socialLevel: 'Low',
        cleanliness: 'Extremely Clean'
      },
      amenities: ['WiFi', 'Parking', 'Quiet', 'Study Space', 'Kitchen'],
      rating: 4.7,
      compatibility: 88,
      distance: 2.1,
      available: '2024-08-01',
      images: 4,
      moveInDate: '2024-08-01',
      leaseLength: '12 months',
      deposit: 15000,
      utilities: 'Split',
      petFriendly: false,
      smokingAllowed: false,
      furnished: true,
      airConditioning: false,
      heating: true,
      dishwasher: true,
      washerDryer: true,
      balcony: false,
      parking: 'Garage',
      security: 'Building',
      nearbyTransit: ['AC Transit', 'BART'],
      walkScore: 65,
      bikeScore: 78,
      transitScore: 72,
      description: 'Quiet, studious environment perfect for graduate students. Looking for someone who values peace and academic focus.',
      highlights: ['Quiet Environment', 'Grad Student', 'Furnished'],
      virtualTour: false,
      videoTour: false,
      lastUpdated: '2024-01-12',
      views: 634,
      saves: 45,
      applications: 6
    },
    {
      id: 5,
      type: 'apartment',
      title: 'Luxury 2BR with City Views',
      location: 'Bandra West, Mumbai',
      rent: 56000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1200,
      amenities: ['WiFi', 'Gym', 'Pool', 'Laundry', 'Parking', 'Balcony', 'Dishwasher'],
      rating: 4.9,
      reviews: 31,
      distance: 3.5,
      available: '2024-07-15',
      landlord: {
        name: 'Hillside Properties',
        rating: 4.8,
        avatar: 'HP',
        verified: true,
        responseTime: '1 hour'
      },
      images: 12,
      featured: true,
      moveInDate: '2024-07-15',
      leaseLength: '12 months',
      deposit: 56000,
      utilities: 'Not Included',
      petFriendly: true,
      smokingAllowed: false,
      furnished: false,
      airConditioning: true,
      heating: true,
      dishwasher: true,
      washerDryer: true,
      balcony: true,
      parking: 'Garage',
      security: '24/7',
      nearbyTransit: ['AC Transit'],
      walkScore: 45,
      bikeScore: 65,
      transitScore: 55,
      description: 'Stunning 2BR apartment with panoramic bay views. Perfect for students who want luxury and space.',
      highlights: ['Bay Views', 'Luxury Amenities', 'Spacious'],
      virtualTour: true,
      videoTour: true,
      lastUpdated: '2024-01-11',
      views: 2341,
      saves: 198,
      applications: 25
    }
  ];

  // Comprehensive utility functions
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return <Wifi className="w-3 h-3" />;
      case 'parking':
        return <Car className="w-3 h-3" />;
      case 'gym':
        return <Dumbbell className="w-3 h-3" />;
      case 'laundry':
        return <RefreshCw className="w-3 h-3" />;
      case 'pool':
        return <Waves className="w-3 h-3" />;
      case 'study room':
        return <BookOpen className="w-3 h-3" />;
      case 'kitchen':
        return <Utensils className="w-3 h-3" />;
      case 'garden':
        return <TreePine className="w-3 h-3" />;
      case 'balcony':
        return <Building className="w-3 h-3" />;
      case 'dishwasher':
        return <Droplets className="w-3 h-3" />;
      default:
        return <Coffee className="w-3 h-3" />;
    }
  };

  // Advanced filtering logic
  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      // Search query filter
      if (searchQuery && !listing.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !listing.location.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Budget filter
      if (listing.rent < budgetRange[0] || listing.rent > budgetRange[1]) {
        return false;
      }

      // Type filter
      if (!selectedTypes.includes(listing.type)) {
        return false;
      }

      // Distance filter
      if (listing.distance < distanceRange[0] || listing.distance > distanceRange[1]) {
        return false;
      }

      // Bedroom filter
      if (bedroomCount !== null && listing.bedrooms !== bedroomCount) {
        return false;
      }

      // Bathroom filter
      if (bathroomCount !== null && listing.bathrooms !== bathroomCount) {
        return false;
      }

      // Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllAmenities = selectedAmenities.every(amenity => 
          listing.amenities.includes(amenity)
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [listings, searchQuery, budgetRange, selectedTypes, distanceRange, bedroomCount, bathroomCount, selectedAmenities]);

  // Sorting logic
  const sortedListings = useMemo(() => {
    const sorted = [...filteredListings];
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.rent - b.rent);
      case 'price-high':
        return sorted.sort((a, b) => b.rent - a.rent);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
      case 'distance':
        return sorted.sort((a, b) => a.distance - b.distance);
      case 'relevance':
      default:
        return sorted.sort((a, b) => {
          // Featured listings first, then by rating
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }
  }, [filteredListings, sortBy]);

  // Save search functionality
  const saveSearch = () => {
    const searchParams = {
      query: searchQuery,
      budget: budgetRange,
      types: selectedTypes,
      amenities: selectedAmenities,
      distance: distanceRange,
      bedrooms: bedroomCount,
      bathrooms: bathroomCount
    };
    setSavedSearches(prev => [...prev, JSON.stringify(searchParams)]);
  };

  // Add to comparison
  const toggleComparison = (listingId: number) => {
    setComparisonList(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  // Toggle favorite
  const toggleFavorite = (listingId: number) => {
    setFavoriteListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setBudgetRange([15000, 60000]);
    setSelectedTypes(['apartment', 'roommate']);
    setSelectedAmenities([]);
    setDistanceRange([0, 5]);
    setBedroomCount(null);
    setBathroomCount(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Advanced Search" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header with Search Analytics */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
          <Link to="/dashboard">
              <Button variant="outline" size="sm" className="hover-lift">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
              <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Advanced Search
              </h1>
              <p className="text-muted-foreground text-lg">Find your perfect housing match with AI-powered recommendations</p>
            </div>
          </div>
          
          {/* Search Analytics Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowSearchAnalytics(!showSearchAnalytics)}
              className="hover-lift"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button
              variant="outline"
              onClick={saveSearch}
              className="hover-lift"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Search
            </Button>
          </div>
        </div>

        {/* Search Analytics Panel */}
        {showSearchAnalytics && (
          <Card className="mb-8 card-gradient">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Search Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{sortedListings.length}</div>
                  <div className="text-sm text-muted-foreground">Total Results</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">₹{Math.round((budgetRange[0] + budgetRange[1]) / 2).toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Avg. Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">4.7</div>
                  <div className="text-sm text-muted-foreground">Avg. Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">0.8</div>
                  <div className="text-sm text-muted-foreground">Avg. Distance</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Search Bar */}
        <Card className="mb-8 card-gradient">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search by location (Delhi, Mumbai, Bangalore...), property name, or amenities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-lg"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="hover-lift"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {(activeFilterChips.length > 0) && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFilterChips.length}
                    </Badge>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="hover-lift"
                >
                  <FilterX className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active filters chips */}
        {activeFilterChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {activeFilterChips.map(chip => (
              <Badge key={chip.key} variant="outline" className="flex items-center gap-1">
                {chip.label}
                <Button size="icon" variant="ghost" className="h-5 w-5" onClick={chip.onClear}>
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={clearFilters}>Reset all</Button>
          </div>
        )}

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
                    <Input placeholder="Delhi, Mumbai, Bangalore..." className="pl-10" />
                  </div>
                </div>

                {/* Listing Type */}
                <div className="space-y-2">
                  <Label>Listing Type</Label>
                  <Select defaultValue="all" onValueChange={(v) => setSelectedTypes(v === 'all' ? ['apartment','roommate'] : [v])}>
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
                      max={100000}
                      min={10000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-1">
                      <span>₹{budgetRange[0].toLocaleString()}</span>
                      <span>₹{budgetRange[1].toLocaleString()}</span>
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
                        className={`p-2 h-8 ${bedroomCount === (beds === '4+' ? 4 : (beds as number)) ? 'bg-primary/10 border-primary' : ''}`}
                        onClick={() => setBedroomCount(beds === '4+' ? 4 : (beds as number))}
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
                    {['WiFi', 'Parking', 'Laundry', 'Gym', 'Pool', 'Study Room'].map((amenity) => {
                      const checked = selectedAmenities.includes(amenity);
                      return (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox id={amenity} checked={checked} onCheckedChange={(v) => {
                            setSelectedAmenities(prev => v ? [...prev, amenity] : prev.filter(a => a !== amenity));
                          }} />
                          <Label htmlFor={amenity} className="text-sm">{amenity}</Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Distance */}
                <div className="space-y-2">
                  <Label>Distance from Campus</Label>
                  <Select defaultValue="any" onValueChange={(v) => setDistanceRange([0, v === 'any' ? 5 : Number(v)])}>
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

                <div className="flex gap-2">
                  <Button className="w-full btn-hero" onClick={() => setShowFilters(false)}>Apply Filters</Button>
                  <Button variant="outline" className="w-full" onClick={clearFilters}>Reset</Button>
                </div>
                
                {/* Quick budget presets */}
                <div className="pt-2">
                  <Label className="text-xs text-muted-foreground">Quick budget</Label>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {[
                      [15000,25000],
                      [25000,40000],
                      [40000,60000],
                    ].map((range) => (
                      <Button key={range.join('-')} size="sm" variant="outline" onClick={() => setBudgetRange(range as [number,number])}>
                        ₹{range[0].toLocaleString()}–₹{range[1].toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">{listings.length} listings found</h2>
                <p className="text-muted-foreground">Showing results for Indian cities</p>
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
                            <p className="text-2xl font-bold text-primary">₹{listing.rent.toLocaleString()}</p>
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
                            <Link to={`/listing/${listing.id}`}>
                              <Button variant="outline" size="sm">View Details</Button>
                            </Link>
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