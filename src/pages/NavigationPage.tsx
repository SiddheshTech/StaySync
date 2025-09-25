import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Heart, 
  Grid3X3, 
  List, 
  MessageCircle, 
  Video, 
  Camera, 
  Upload, 
  BarChart3,
  Settings,
  Star,
  Phone,
  Share2,
  Eye,
  TrendingUp,
  User,
  Home,
  Bed,
  Bath,
  Car,
  Wifi,
  PawPrint,
  Accessibility,
  Globe,
  Clock,
  Shield,
  Send,
  Paperclip,
  Smile,
  Mic,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Check,
  AlertCircle,
  Download,
  ArrowLeft,
  Compass
} from 'lucide-react';

const NavigationPage = () => {
  const [currentView, setCurrentView] = useState('search');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const fileInputRef = useRef(null);

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

  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Is the room still available?',
      time: '2 min ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Can we schedule a video tour?',
      time: '1 hour ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Anna Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      lastMessage: 'Thanks for the quick response!',
      time: '3 hours ago',
      unread: 1,
      online: true
    }
  ];

  const categories = [
    { name: 'International Student Housing', icon: Globe, count: 245 },
    { name: 'Budget-Friendly Rooms', icon: DollarSign, count: 189 },
    { name: 'Short-term Housing', icon: Clock, count: 76 },
    { name: 'Graduate Student Preferences', icon: User, count: 134 },
    { name: 'Luxury Housing Features', icon: Star, count: 89 },
    { name: 'Accessible Housing', icon: Accessibility, count: 45 },
    { name: 'Pet-friendly Accommodations', icon: PawPrint, count: 67 }
  ];

  const NavButton = ({ icon: Icon, label, view, active }) => (
    <button
      onClick={() => setCurrentView(view)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        active ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon size={20} />
      <span className="hidden md:block">{label}</span>
    </button>
  );

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

  const MessageInterface = () => (
    <div className="flex h-full">
      {/* Conversation List */}
      <Card className="w-80 border-r">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 border-b border-border hover:bg-muted/50 transition-colors text-left ${
                  selectedConversation?.id === conv.id ? 'bg-primary/10' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conv.avatar} alt={conv.name} />
                      <AvatarFallback>{conv.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-foreground truncate">{conv.name}</h4>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <Badge variant="default" className="text-xs">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                    <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{selectedConversation.name}</h4>
                    <p className="text-sm text-muted-foreground">{selectedConversation.online ? 'Online' : 'Last seen 2h ago'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone size={20} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video size={20} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={20} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              <div className="flex justify-start">
                <div className="bg-background rounded-lg px-4 py-2 max-w-xs shadow-sm">
                  <p className="text-sm">Hi! I'm interested in your listing. Is it still available?</p>
                  <span className="text-xs text-muted-foreground">10:30 AM</span>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-xs">
                  <p className="text-sm">Yes, it's still available! Would you like to schedule a tour?</p>
                  <span className="text-xs text-primary-foreground/70">10:32 AM</span>
                </div>
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip size={20} />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="pr-20"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Smile size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Mic size={16} />
                    </Button>
                  </div>
                </div>
                <Button className="btn-hero">
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No conversation selected</h3>
              <p className="text-muted-foreground">Choose a conversation to start messaging</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  const CreateListingForm = () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Listing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
        
        {/* Property Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Property Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Title</label>
                <Input 
                  type="text" 
                  placeholder="e.g., Modern Studio Near Campus"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Type</label>
                <select className="w-full border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent bg-background">
                  <option>Studio</option>
                  <option>1 Bedroom</option>
                  <option>Shared Room</option>
                  <option>House</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                <Input 
                  type="text" 
                  placeholder="Enter full address"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your property..."
                  className="w-full border border-input rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
              </div>
            </div>
          </div>

          {/* Photos Upload */}
          <div>
            <h3 className="text-lg font-medium mb-4">Photos & Media</h3>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <Upload size={32} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground mb-2">Click to upload photos</p>
              <p className="text-sm text-muted-foreground">Drag and drop or browse files</p>
              <input 
                ref={fileInputRef}
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setSelectedPhotos(prev => [...prev, ...files.map(file => ({
                    id: Math.random(),
                    name: file.name,
                    url: URL.createObjectURL(file)
                  }))]);
                }}
              />
            </div>
            {selectedPhotos.length > 0 && (
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
                {selectedPhotos.map((photo) => (
                  <div key={photo.id} className="relative">
                    <img src={photo.url} alt={photo.name} className="w-full h-20 object-cover rounded-lg" />
                    <Button 
                      size="sm"
                      variant="destructive"
                      onClick={() => setSelectedPhotos(prev => prev.filter(p => p.id !== photo.id))}
                      className="absolute -top-2 -right-2 p-1 h-6 w-6"
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-medium mb-4">Pricing & Availability</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Monthly Rent</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="number" 
                    placeholder="1200"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Security Deposit</label>
                <div className="relative">
                  <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    type="number" 
                    placeholder="1200"
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Available From</label>
                <Input 
                  type="date" 
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-medium mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: 'WiFi', icon: Wifi },
                { name: 'Parking', icon: Car },
                { name: 'Kitchen', icon: Home },
                { name: 'Laundry', icon: Settings },
                { name: 'Gym', icon: TrendingUp },
                { name: 'Study Room', icon: Bed },
                { name: 'Pet Friendly', icon: PawPrint },
                { name: 'Accessible', icon: Accessibility }
              ].map((amenity) => (
                <label key={amenity.name} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <amenity.icon size={16} className="text-muted-foreground" />
                  <span className="text-sm">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">
              Save Draft
            </Button>
            <Button className="btn-hero">
              Publish Listing
            </Button>
          </div>
        </div>
        </CardContent>
      </Card>
    </div>
  );

  const ListingDashboard = () => (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-semibold">1,234</p>
              </div>
              <Eye className="text-primary" size={24} />
            </div>
            <div className="flex items-center mt-2 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm ml-1">+12% this week</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inquiries</p>
                <p className="text-2xl font-semibold">67</p>
              </div>
              <MessageCircle className="text-green-500" size={24} />
            </div>
            <div className="flex items-center mt-2 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm ml-1">+8% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-2xl font-semibold">23</p>
              </div>
              <User className="text-purple-500" size={24} />
            </div>
            <div className="flex items-center mt-2 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm ml-1">+15% this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Response Rate</p>
                <p className="text-2xl font-semibold">94%</p>
              </div>
              <BarChart3 className="text-orange-500" size={24} />
            </div>
            <div className="flex items-center mt-2 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm ml-1">+3% this week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Listings */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Listings</CardTitle>
            <Button 
              onClick={() => setCurrentView('create')}
              className="btn-hero"
            >
              <Plus size={16} className="mr-2" />
              New Listing
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties.map((property) => (
              <div key={property.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <img src={property.images[0]} alt={property.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h4 className="font-medium">{property.title}</h4>
                    <p className="text-sm text-muted-foreground">{property.location} • ${property.price}/month</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="font-medium">{Math.floor(Math.random() * 100) + 50}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium">{Math.floor(Math.random() * 20) + 5}</p>
                    <p className="text-xs text-muted-foreground">Inquiries</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Settings size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CategoryBrowser = () => (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Browse by Category</h2>
        <p className="text-muted-foreground">Find the perfect housing that matches your specific needs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="card-hover cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <category.icon size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} listings</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
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

  const renderCurrentView = () => {
    switch (currentView) {
      case 'search':
        return <SearchInterface />;
      case 'categories':
        return <CategoryBrowser />;
      case 'messages':
        return <MessageInterface />;
      case 'create':
        return <CreateListingForm />;
      case 'dashboard':
        return <ListingDashboard />;
      default:
        return <SearchInterface />;
    }
  };

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
            <h1 className="text-3xl font-bold text-foreground">Navigation Hub</h1>
            <p className="text-muted-foreground">Explore housing options and manage your listings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Navigation Menu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Compass className="w-5 h-5" />
                  Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <button
                    onClick={() => setCurrentView('search')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b ${
                      currentView === 'search' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Search className="w-4 h-4" />
                    Search Listings
                  </button>
                  <button
                    onClick={() => setCurrentView('categories')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b ${
                      currentView === 'categories' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                    Browse Categories
                  </button>
                  <button
                    onClick={() => setCurrentView('messages')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b ${
                      currentView === 'messages' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Messages
                  </button>
                  <button
                    onClick={() => setCurrentView('create')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors border-b ${
                      currentView === 'create' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    Create Listing
                  </button>
                  <button
                    onClick={() => setCurrentView('dashboard')}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted/50 transition-colors ${
                      currentView === 'dashboard' ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </button>
                </nav>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/search" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="w-4 h-4 mr-2" />
                    Browse Listings
                  </Button>
                </Link>
                <Link to="/messages" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                </Link>
                <Link to="/profile" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="h-[calc(100vh-12rem)]">
              {renderCurrentView()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;