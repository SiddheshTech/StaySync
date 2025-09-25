import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { 
  ArrowLeft,
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Info,
  Paperclip,
  Smile,
  Image as ImageIcon,
  CheckCheck,
  Star,
  Archive,
  Trash2,
  Pin,
  Users,
  Settings,
  Clock,
  Filter,
  Download,
  Share2,
  Heart,
  ThumbsUp,
  Reply,
  Forward,
  Copy,
  Edit,
  X,
  Plus,
  Calendar as CalendarIcon,
  Bell,
  BellOff,
  Volume2,
  VolumeX
} from 'lucide-react';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all');
  const [showConversationDetails, setShowConversationDetails] = useState(false);
  const [showMessageComposer, setShowMessageComposer] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [showReactions, setShowReactions] = useState<number | null>(null);
  const [messageTemplates, setMessageTemplates] = useState([
    "Hi! I saw your profile and think we could be great roommates.",
    "Thanks for reaching out! I'd love to learn more about you.",
    "That sounds perfect! When can we schedule a time to meet?",
    "I'm interested in the apartment you mentioned. Could you share more details?",
    "Thanks for the photos! The place looks amazing."
  ]);

  const conversations = [
    {
      id: 1,
      name: 'Emma Johnson',
      avatar: 'EJ',
      lastMessage: 'That sounds perfect! When can we schedule a time to meet?',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      pinned: true,
      university: 'UC Berkeley',
      major: 'Computer Science',
      year: 'Junior',
      compatibility: 95,
      sharedListings: 2,
      mutualConnections: 3
    },
    {
      id: 2,
      name: 'Alex Chen',
      avatar: 'AC',
      lastMessage: 'I love the location near campus. Is parking included?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      pinned: false,
      university: 'UC Berkeley',
      major: 'Business',
      year: 'Sophomore',
      compatibility: 88,
      sharedListings: 1,
      mutualConnections: 1
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: 'MB',
      lastMessage: 'Thanks for sharing the photos of the apartment!',
      timestamp: '3 hours ago',
      unread: 1,
      online: true,
      pinned: false,
      university: 'UC Berkeley',
      major: 'Psychology',
      year: 'Senior',
      compatibility: 82,
      sharedListings: 0,
      mutualConnections: 2
    },
    {
      id: 4,
      name: 'Lisa Wang',
      avatar: 'LW',
      lastMessage: 'Hey! I saw your profile and think we might be compatible roommates',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      pinned: false,
      university: 'UC Berkeley',
      major: 'Engineering',
      year: 'Graduate',
      compatibility: 90,
      sharedListings: 3,
      mutualConnections: 4
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Emma Johnson',
      content: 'Hi Sarah! I saw your profile and think we could be great roommates. I\'m also a CS student at Berkeley.',
      timestamp: '10:30 AM',
      isMe: false,
      read: true,
      reactions: { heart: 1, thumbsup: 2 },
      attachments: []
    },
    {
      id: 2,
      sender: 'me',
      content: 'Hi Emma! Thanks for reaching out. I looked at your profile too and we seem to have a lot in common!',
      timestamp: '10:32 AM',
      isMe: true,
      read: true,
      reactions: {},
      attachments: []
    },
    {
      id: 3,
      sender: 'Emma Johnson',
      content: 'Definitely! I saw you\'re interested in the downtown area. I found a really nice 2BR apartment that\'s within our budget range.',
      timestamp: '10:35 AM',
      isMe: false,
      read: true,
      reactions: { heart: 1 },
      attachments: [
        { name: 'apartment_photos.pdf', type: 'pdf', size: '2.3 MB' }
      ]
    },
    {
      id: 4,
      sender: 'me',
      content: 'That sounds interesting! Could you share more details about the location and amenities?',
      timestamp: '10:37 AM',
      isMe: true,
      read: true,
      reactions: {},
      attachments: []
    },
    {
      id: 5,
      sender: 'Emma Johnson',
      content: 'Sure! It\'s on Telegraph Ave, about a 10-minute walk to campus. It has a full kitchen, in-unit laundry, and even a small study nook. Rent is $1000 each.',
      timestamp: '10:40 AM',
      isMe: false,
      read: true,
      reactions: { thumbsup: 1 },
      attachments: []
    },
    {
      id: 6,
      sender: 'me',
      content: 'That sounds perfect! When can we schedule a time to meet and maybe view the apartment together?',
      timestamp: '10:42 AM',
      isMe: true,
      read: false,
      reactions: {},
      attachments: []
    },
    {
      id: 7,
      sender: 'Emma Johnson',
      content: 'That sounds perfect! When can we schedule a time to meet?',
      timestamp: '10:45 AM',
      isMe: false,
      read: false,
      reactions: {},
      attachments: []
    }
  ];

  const currentConversation = conversations[selectedConversation];

  const sendMessage = () => {
    if (newMessage.trim()) {
      // Here you would normally send the message to your backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
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
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="text-muted-foreground">Connect with potential roommates</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-210px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setShowMessageComposer(true)}>
                    <Plus className="w-4 h-4 mr-1" />
                    New
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowNotificationSettings(true)}>
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as typeof filter)}>
                <TabsList className="mt-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-330px)]">
                <div className="space-y-1 p-1">
                  {conversations
                    .filter(c => {
                      const matchesFilter = (filter === 'all') || (filter === 'unread' ? c.unread > 0 : !c.unread);
                      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                           c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
                      return matchesFilter && matchesSearch;
                    })
                    .map((conversation, index) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedConversation === index ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedConversation(index)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{conversation.name}</h4>
                          {conversation.pinned && <Badge variant="secondary" className="text-[10px]">Pinned</Badge>}
                          {conversation.compatibility > 90 && <Star className="w-3 h-3 text-yellow-500" />}
                        </div>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{conversation.university}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{conversation.compatibility}% match</span>
                      </div>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {currentConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {currentConversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {currentConversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{currentConversation.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {currentConversation.online ? 'Online' : 'Last seen 2 hours ago'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                          </TooltipTrigger>
                          <TooltipContent>Audio call</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                          </TooltipTrigger>
                          <TooltipContent>Video call</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Info className="w-4 h-4" />
                      </Button>
                          </TooltipTrigger>
                          <TooltipContent>Conversation info</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pin className="w-4 h-4 mr-2" />
                            Pin conversation
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="w-4 h-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Bell className="w-4 h-4 mr-2" />
                            Mute notifications
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100vh-420px)] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                          {!message.isMe && (
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                  {currentConversation.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-muted-foreground">{message.sender}</span>
                            </div>
                          )}
                          <div className="group relative">
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.isMe
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                              {message.attachments.length > 0 && (
                                <div className="mt-2 space-y-1">
                                  {message.attachments.map((attachment, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-2 bg-background/50 rounded">
                                      <Paperclip className="w-3 h-3" />
                                      <span className="text-xs">{attachment.name}</span>
                                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                        <Download className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="absolute -bottom-6 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex items-center gap-1 bg-background border rounded-lg p-1 shadow-lg">
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                  <Reply className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                  <Forward className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          {Object.keys(message.reactions).length > 0 && (
                            <div className="flex items-center gap-1 mt-1">
                              {Object.entries(message.reactions).map(([emoji, count]) => (
                                <Button key={emoji} size="sm" variant="outline" className="h-6 text-xs">
                                  {emoji === 'heart' ? '❤️' : '👍'} {count}
                                </Button>
                              ))}
                            </div>
                          )}
                          <div className={`mt-1 flex items-center gap-2 ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                            <p className="text-xs text-muted-foreground">{message.timestamp}</p>
                            {message.isMe && message.read && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <CheckCheck className="w-3 h-3" /> Read
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                    <div className="mt-4 text-xs text-muted-foreground flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      {currentConversation.name} is typing…
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="space-y-3">
                    {/* Action Buttons Row */}
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Paperclip className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Attach file</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <ImageIcon className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Add image</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Smile className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Emoji</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Clock className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Schedule message</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Share listing</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    {/* Message Input with Templates */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message or use / for templates..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          className="pr-10"
                        />
                        {newMessage.startsWith('/') && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-lg shadow-lg">
                            <div className="p-2">
                              <div className="text-xs font-medium text-muted-foreground mb-2">Templates</div>
                              <div className="space-y-1">
                                {messageTemplates
                                  .filter(template => 
                                    template.toLowerCase().includes(newMessage.slice(1).toLowerCase())
                                  )
                                  .map((template, index) => (
                                    <div
                                      key={index}
                                      className="p-2 text-sm cursor-pointer hover:bg-muted rounded"
                                      onClick={() => setNewMessage(template)}
                                    >
                                      {template}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <Button onClick={sendMessage} className="px-4">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground">Choose a conversation to start messaging</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Conversation Details Modal */}
        <Dialog open={showConversationDetails} onOpenChange={setShowConversationDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Conversation Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">
                    {currentConversation?.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{currentConversation?.name}</h3>
                  <p className="text-muted-foreground">{currentConversation?.university} • {currentConversation?.major}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <Badge variant="secondary">{currentConversation?.compatibility}% Match</Badge>
                    <Badge variant="outline">{currentConversation?.year}</Badge>
                    {currentConversation?.online && <Badge variant="default">Online</Badge>}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Shared Listings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentConversation?.sharedListings}</div>
                    <p className="text-xs text-muted-foreground">Properties in common</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Mutual Connections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{currentConversation?.mutualConnections}</div>
                    <p className="text-xs text-muted-foreground">Shared contacts</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Conversation Settings</Label>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">Mute notifications</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm">Auto-reply when away</span>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Message Composer Modal */}
        <Dialog open={showMessageComposer} onOpenChange={setShowMessageComposer}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {conversations.map((conv) => (
                      <SelectItem key={conv.id} value={conv.id.toString()}>
                        {conv.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Message</Label>
                <Textarea placeholder="Type your message..." className="min-h-[100px]" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="w-4 h-4 mr-2" />
                  Attach
                </Button>
                <Button variant="outline" size="sm">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowMessageComposer(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setShowMessageComposer(false)}>
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Notification Settings Modal */}
        <Dialog open={showNotificationSettings} onOpenChange={setShowNotificationSettings}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Notification Settings</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get email alerts for important messages</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Sound Notifications</Label>
                    <p className="text-sm text-muted-foreground">Play sound for new messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Quiet Hours</Label>
                    <p className="text-sm text-muted-foreground">Disable notifications during sleep hours</p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setShowNotificationSettings(false)}>
                  Save Settings
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default MessagesPage;