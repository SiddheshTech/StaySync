import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const pageSize = 5;
  
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

  // Backend-powered listings
  const [listings, setListings] = useState<any[]>([]);
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const baseUrl = (import.meta as any).env?.VITE_API_URL || `${location.protocol}//${location.hostname}:8080`;
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (!(selectedTypes.length === 2)) params.set('type', selectedTypes[0]);
        if (bedroomCount !== null) params.set('beds', String(bedroomCount));
        if (bathroomCount !== null) params.set('baths', String(bathroomCount));
        if (distanceRange[1] !== 5) params.set('dist', String(distanceRange[1]));
        if (selectedAmenities.length) params.set('amen', selectedAmenities.join(','));
        params.set('min', String(budgetRange[0]));
        params.set('max', String(budgetRange[1]));
        params.set('page', String(page));
        params.set('pageSize', String(pageSize));
        const res = await fetch(`${baseUrl}/student/search?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to load listings');
        const data = await res.json();
        setListings(data.items || []);
      } catch {}
      setIsLoading(false);
    };
    load();
  }, [searchQuery, selectedTypes, bedroomCount, bathroomCount, distanceRange, selectedAmenities, budgetRange, page]);

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

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedListings.length / 5));
  const paginatedListings = useMemo(() => {
    const start = (page - 1) * 5;
    return sortedListings.slice(start, start + 5);
  }, [sortedListings, page]);

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
    const payload = JSON.stringify(searchParams);
    setSavedSearches(prev => [...prev, payload]);
    try {
      const existing = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      localStorage.setItem('savedSearches', JSON.stringify([...existing, payload]));
    } catch {}
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
    setPage(1);
  };

  // URL <-> state sync
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const min = Number(searchParams.get('min')) || 15000;
    const max = Number(searchParams.get('max')) || 60000;
    const type = searchParams.get('type');
    const beds = searchParams.get('beds');
    const baths = searchParams.get('baths');
    const dist = Number(searchParams.get('dist'));
    const amen = searchParams.get('amen');
    if (q) setSearchQuery(q);
    setBudgetRange([min, max]);
    if (type) setSelectedTypes(type === 'all' ? ['apartment','roommate'] : [type]);
    if (beds) setBedroomCount(Number(beds));
    if (baths) setBathroomCount(Number(baths));
    if (!Number.isNaN(dist) && dist > 0) setDistanceRange([0, dist]);
    if (amen) setSelectedAmenities(amen.split(',').filter(Boolean));
    try {
      const saved = JSON.parse(localStorage.getItem('savedSearches') || '[]');
      setSavedSearches(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params: any = {};
    if (searchQuery) params.q = searchQuery;
    if (budgetRange[0] !== 15000) params.min = String(budgetRange[0]);
    if (budgetRange[1] !== 60000) params.max = String(budgetRange[1]);
    if (!(selectedTypes.length === 2)) params.type = selectedTypes[0];
    if (bedroomCount !== null) params.beds = String(bedroomCount);
    if (bathroomCount !== null) params.baths = String(bathroomCount);
    if (distanceRange[1] !== 5) params.dist = String(distanceRange[1]);
    if (selectedAmenities.length) params.amen = selectedAmenities.join(',');
    setSearchParams(params, { replace: true });
    setPage(1);
  }, [searchQuery, budgetRange, selectedTypes, bedroomCount, bathroomCount, distanceRange, selectedAmenities, setSearchParams]);

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
              {paginatedListings.map((listing) => (
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
                <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;