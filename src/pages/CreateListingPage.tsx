import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import BrandBar from '@/components/BrandBar';
import { 
  DollarSign,
  MapPin,
  Home,
  Users,
  Bed,
  Bath,
  Car,
  Wifi,
  Utensils,
  Dumbbell,
  Shield,
  Camera,
  Upload,
  Plus,
  Minus,
  X,
  Check,
  AlertCircle,
  Info,
  Save,
  Eye,
  Edit,
  Trash2,
  Copy,
  Share2,
  Calendar,
  Clock,
  Star,
  Heart,
  Bookmark,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Building,
  TreePine,
  Waves,
  Mountain,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Flame,
  Zap,
  Wrench,
  Hammer,
  Paintbrush,
  Palette,
  Lightbulb,
  Tv,
  Radio,
  Headphones,
  Gamepad2,
  Monitor,
  Printer,
  Phone,
  Mail,
  MessageSquare,
  Video,
  Mic,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Maximize,
  Minimize,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Pentagon,
  Diamond,
  Heart as HeartIcon,
  Star as StarIcon,
  Bookmark as BookmarkIcon,
  Flag,
  Tag,
  Hash,
  AtSign,
  Percent,
  Plus as PlusIcon,
  Minus as MinusIcon,
  X as XIcon,
  Check as CheckIcon,
  AlertTriangle,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
  Settings as SettingsIcon,
  Save as SaveIcon,
  Eye as EyeIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Copy as CopyIcon,
  Share2 as Share2Icon,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Star as StarIcon2,
  Heart as HeartIcon2,
  Bookmark as BookmarkIcon2,
  Building as BuildingIcon,
  TreePine as TreePineIcon,
  Waves as WavesIcon,
  Mountain as MountainIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  Cloud as CloudIcon,
  CloudRain as CloudRainIcon,
  CloudSnow as CloudSnowIcon,
  Wind as WindIcon,
  Thermometer as ThermometerIcon,
  Droplets as DropletsIcon,
  Flame as FlameIcon,
  Zap as ZapIcon,
  Wrench as WrenchIcon,
  Hammer as HammerIcon,
  Paintbrush as PaintbrushIcon,
  Palette as PaletteIcon,
  Lightbulb as LightbulbIcon,
  Tv as TvIcon,
  Radio as RadioIcon,
  Headphones as HeadphonesIcon,
  Gamepad2 as Gamepad2Icon,
  Monitor as MonitorIcon,
  Printer as PrinterIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  MessageSquare as MessageSquareIcon,
  Video as VideoIcon,
  Mic as MicIcon,
  Volume2 as Volume2Icon,
  VolumeX as VolumeXIcon,
  Play as PlayIcon,
  Pause as PauseIcon,
  SkipBack as SkipBackIcon,
  SkipForward as SkipForwardIcon,
  Repeat as RepeatIcon,
  Shuffle as ShuffleIcon,
  RotateCcw as RotateCcwIcon,
  RotateCw as RotateCwIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Move as MoveIcon,
  Maximize as MaximizeIcon,
  Minimize as MinimizeIcon,
  Square as SquareIcon,
  Circle as CircleIcon,
  Triangle as TriangleIcon,
  Hexagon as HexagonIcon,
  Octagon as OctagonIcon,
  Pentagon as PentagonIcon,
  Diamond as DiamondIcon,
  ArrowUp,
  Package
} from 'lucide-react';

const CreateListingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    propertyType: '',
    listingType: 'rent',
    
    // Location
    address: '',
    city: '',
    state: '',
    zipCode: '',
    neighborhood: '',
    coordinates: { lat: '', lng: '' },
    
    // Property Details
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: '',
    yearBuilt: '',
    lotSize: '',
    floors: 1,
    parkingSpaces: 0,
    garageType: '',
    
    // Pricing
    monthlyRent: '',
    securityDeposit: '',
    applicationFee: '',
    petDeposit: '',
    utilities: '',
    leaseLength: '',
    availableDate: '',
    
    // Amenities
    amenities: [] as string[],
    appliances: [] as string[],
    features: [] as string[],
    
    // Policies
    petPolicy: '',
    smokingPolicy: '',
    furnished: false,
    utilitiesIncluded: [] as string[],
    
    // Media
    images: [] as File[],
    virtualTour: '',
    floorPlan: null as File | null,
    
    // Contact & Availability
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    showingsAvailable: true,
    showingInstructions: '',
    
    // Additional Information
    highlights: '',
    nearbyAttractions: '',
    transportation: '',
    schools: '',
    additionalNotes: ''
  });

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isDraft, setIsDraft] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Property title and type' },
    { id: 2, title: 'Location', description: 'Address and neighborhood' },
    { id: 3, title: 'Property Details', description: 'Size, rooms, and features' },
    { id: 4, title: 'Pricing', description: 'Rent and fees' },
    { id: 5, title: 'Amenities', description: 'Features and facilities' },
    { id: 6, title: 'Policies', description: 'Rules and restrictions' },
    { id: 7, title: 'Media', description: 'Photos and virtual tour' },
    { id: 8, title: 'Contact', description: 'Availability and contact info' },
    { id: 9, title: 'Review', description: 'Preview and publish' }
  ];

  const propertyTypes = [
    'Apartment', 'House', 'Condo', 'Townhouse', 'Studio', 'Loft', 
    'Duplex', 'Mobile Home', 'Room', 'Shared Space'
  ];

  const amenities = [
    { name: 'Air Conditioning', icon: Thermometer },
    { name: 'Heating', icon: Flame },
    { name: 'Wifi', icon: Wifi },
    { name: 'Cable TV', icon: Tv },
    { name: 'Parking', icon: Car },
    { name: 'Laundry', icon: Waves },
    { name: 'Dishwasher', icon: Utensils },
    { name: 'Gym', icon: Dumbbell },
    { name: 'Pool', icon: Waves },
    { name: 'Balcony', icon: Sun },
    { name: 'Garden', icon: TreePine },
    { name: 'Pet Friendly', icon: Heart },
    { name: 'Furnished', icon: Home },
    { name: 'Security', icon: Shield },
    { name: 'Elevator', icon: ArrowUp },
    { name: 'Storage', icon: Package }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => URL.createObjectURL(file));
    setUploadedImages(prev => [...prev, ...newImages]);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveDraft = () => {
    setIsDraft(true);
    // In real app, save to API
    console.log('Draft saved:', formData);
  };

  const handleSubmit = () => {
    // In real app, submit to API
    console.log('Listing created:', formData);
    navigate('/navigation');
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <BrandBar badgeText="Create Listing" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="sm" onClick={() => navigate('/navigation')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Listings
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Create New Listing</h1>
            <p className="text-muted-foreground">List your property and find the perfect tenants</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={saveDraft}>
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{steps[currentStep - 1].title}</h3>
                <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Steps Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Steps</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-4 cursor-pointer transition-colors ${
                      currentStep === step.id
                        ? 'bg-primary/10 border-r-2 border-primary'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setCurrentStep(step.id)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Property Title *</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder="e.g., Modern 2BR Apartment Near Campus"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="description">Description *</Label>
                          <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe your property in detail..."
                            rows={4}
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="propertyType">Property Type *</Label>
                            <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                              <SelectContent>
                                {propertyTypes.map((type) => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <Label htmlFor="listingType">Listing Type *</Label>
                            <RadioGroup value={formData.listingType} onValueChange={(value) => handleInputChange('listingType', value)}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="rent" id="rent" />
                                <Label htmlFor="rent">For Rent</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="sale" id="sale" />
                                <Label htmlFor="sale">For Sale</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Location */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Location Details</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="address">Street Address *</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="123 Main Street"
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="city">City *</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              placeholder="Berkeley"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State *</Label>
                            <Input
                              id="state"
                              value={formData.state}
                              onChange={(e) => handleInputChange('state', e.target.value)}
                              placeholder="CA"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">ZIP Code *</Label>
                            <Input
                              id="zipCode"
                              value={formData.zipCode}
                              onChange={(e) => handleInputChange('zipCode', e.target.value)}
                              placeholder="94720"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="neighborhood">Neighborhood</Label>
                          <Input
                            id="neighborhood"
                            value={formData.neighborhood}
                            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                            placeholder="Downtown Berkeley"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Property Details */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <Label htmlFor="bedrooms">Bedrooms *</Label>
                            <Input
                              id="bedrooms"
                              type="number"
                              value={formData.bedrooms}
                              onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="bathrooms">Bathrooms *</Label>
                            <Input
                              id="bathrooms"
                              type="number"
                              step="0.5"
                              value={formData.bathrooms}
                              onChange={(e) => handleInputChange('bathrooms', parseFloat(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="squareFeet">Square Feet</Label>
                            <Input
                              id="squareFeet"
                              value={formData.squareFeet}
                              onChange={(e) => handleInputChange('squareFeet', e.target.value)}
                              placeholder="1200"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="yearBuilt">Year Built</Label>
                            <Input
                              id="yearBuilt"
                              value={formData.yearBuilt}
                              onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                              placeholder="2020"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                            <Input
                              id="parkingSpaces"
                              type="number"
                              value={formData.parkingSpaces}
                              onChange={(e) => handleInputChange('parkingSpaces', parseInt(e.target.value) || 0)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="garageType">Garage Type</Label>
                            <Select value={formData.garageType} onValueChange={(value) => handleInputChange('garageType', value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select garage type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="attached">Attached</SelectItem>
                                <SelectItem value="detached">Detached</SelectItem>
                                <SelectItem value="carport">Carport</SelectItem>
                                <SelectItem value="street">Street Parking</SelectItem>
                                <SelectItem value="none">No Parking</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Pricing */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Pricing Information</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="monthlyRent">Monthly Rent *</Label>
                            <div className="relative mt-1">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input
                                id="monthlyRent"
                                type="number"
                                value={formData.monthlyRent}
                                onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                                placeholder="1200"
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="securityDeposit">Security Deposit</Label>
                            <div className="relative mt-1">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input
                                id="securityDeposit"
                                type="number"
                                value={formData.securityDeposit}
                                onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                                placeholder="1200"
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="applicationFee">Application Fee</Label>
                            <div className="relative mt-1">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input
                                id="applicationFee"
                                type="number"
                                value={formData.applicationFee}
                                onChange={(e) => handleInputChange('applicationFee', e.target.value)}
                                placeholder="50"
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="petDeposit">Pet Deposit</Label>
                            <div className="relative mt-1">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input
                                id="petDeposit"
                                type="number"
                                value={formData.petDeposit}
                                onChange={(e) => handleInputChange('petDeposit', e.target.value)}
                                placeholder="300"
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="leaseLength">Lease Length</Label>
                            <Select value={formData.leaseLength} onValueChange={(value) => handleInputChange('leaseLength', value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select lease length" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="month-to-month">Month to Month</SelectItem>
                                <SelectItem value="6-months">6 Months</SelectItem>
                                <SelectItem value="12-months">12 Months</SelectItem>
                                <SelectItem value="18-months">18 Months</SelectItem>
                                <SelectItem value="24-months">24 Months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="availableDate">Available Date</Label>
                            <Input
                              id="availableDate"
                              type="date"
                              value={formData.availableDate}
                              onChange={(e) => handleInputChange('availableDate', e.target.value)}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Amenities */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Amenities & Features</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Select Amenities</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                            {amenities.map((amenity) => {
                              const Icon = amenity.icon;
                              return (
                                <div
                                  key={amenity.name}
                                  className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                                    formData.amenities.includes(amenity.name)
                                      ? 'border-primary bg-primary/10'
                                      : 'hover:bg-muted/50'
                                  }`}
                                  onClick={() => handleAmenityToggle(amenity.name)}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span className="text-sm">{amenity.name}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Policies */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Policies & Rules</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="petPolicy">Pet Policy</Label>
                          <Select value={formData.petPolicy} onValueChange={(value) => handleInputChange('petPolicy', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select pet policy" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pets-allowed">Pets Allowed</SelectItem>
                              <SelectItem value="cats-only">Cats Only</SelectItem>
                              <SelectItem value="dogs-only">Dogs Only</SelectItem>
                              <SelectItem value="small-pets">Small Pets Only</SelectItem>
                              <SelectItem value="no-pets">No Pets</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="smokingPolicy">Smoking Policy</Label>
                          <Select value={formData.smokingPolicy} onValueChange={(value) => handleInputChange('smokingPolicy', value)}>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select smoking policy" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="non-smoking">Non-Smoking</SelectItem>
                              <SelectItem value="smoking-allowed">Smoking Allowed</SelectItem>
                              <SelectItem value="outdoor-only">Outdoor Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="furnished"
                            checked={formData.furnished}
                            onCheckedChange={(checked) => handleInputChange('furnished', checked)}
                          />
                          <Label htmlFor="furnished">Furnished Property</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 7: Media */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Photos & Media</h3>
                      <div className="space-y-4">
                        <div>
                          <Label>Property Photos *</Label>
                          <div className="mt-2">
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                              <Camera className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Upload high-quality photos of your property
                              </p>
                              <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="max-w-xs mx-auto"
                              />
                              <p className="text-xs text-muted-foreground mt-2">
                                Recommended: 5-10 photos, JPG/PNG format, max 10MB each
                              </p>
                            </div>
                          </div>
                        </div>

                        {uploadedImages.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {uploadedImages.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image}
                                  alt={`Property ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg"
                                />
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => removeImage(index)}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div>
                          <Label htmlFor="virtualTour">Virtual Tour URL (Optional)</Label>
                          <Input
                            id="virtualTour"
                            value={formData.virtualTour}
                            onChange={(e) => handleInputChange('virtualTour', e.target.value)}
                            placeholder="https://example.com/virtual-tour"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 8: Contact */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Contact & Availability</h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="contactName">Contact Name *</Label>
                            <Input
                              id="contactName"
                              value={formData.contactName}
                              onChange={(e) => handleInputChange('contactName', e.target.value)}
                              placeholder="John Doe"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="contactPhone">Phone Number *</Label>
                            <Input
                              id="contactPhone"
                              value={formData.contactPhone}
                              onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                              placeholder="(555) 123-4567"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="contactEmail">Email Address *</Label>
                          <Input
                            id="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                            placeholder="john@example.com"
                            className="mt-1"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="showingsAvailable"
                            checked={formData.showingsAvailable}
                            onCheckedChange={(checked) => handleInputChange('showingsAvailable', checked)}
                          />
                          <Label htmlFor="showingsAvailable">Available for Showings</Label>
                        </div>

                        <div>
                          <Label htmlFor="showingInstructions">Showing Instructions</Label>
                          <Textarea
                            id="showingInstructions"
                            value={formData.showingInstructions}
                            onChange={(e) => handleInputChange('showingInstructions', e.target.value)}
                            placeholder="Please call ahead to schedule a showing..."
                            rows={3}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 9: Review */}
                {currentStep === 9 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Review Your Listing</h3>
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">{formData.title}</CardTitle>
                            <CardDescription>{formData.propertyType} • {formData.address}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="text-2xl font-bold text-primary">${formData.monthlyRent}/month</div>
                                <Badge variant="outline">{formData.bedrooms} bed • {formData.bathrooms} bath</Badge>
                              </div>
                              
                              <p className="text-muted-foreground">{formData.description}</p>
                              
                              <div className="flex flex-wrap gap-2">
                                {formData.amenities.map((amenity) => (
                                  <Badge key={amenity} variant="secondary">{amenity}</Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Please review all information carefully before publishing your listing. 
                            You can always edit it later from your dashboard.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {currentStep < steps.length ? (
                      <Button onClick={nextStep}>
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button onClick={handleSubmit} className="btn-hero">
                        <Check className="w-4 h-4 mr-2" />
                        Publish Listing
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Listing Preview</DialogTitle>
              <DialogDescription>How your listing will appear to potential tenants</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{formData.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-primary">${formData.monthlyRent}/month</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{formData.bedrooms} bed</Badge>
                        <Badge variant="outline">{formData.bathrooms} bath</Badge>
                        <Badge variant="outline">{formData.squareFeet} sq ft</Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{formData.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary">{amenity}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateListingPage;


