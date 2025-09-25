import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Info
} from 'lucide-react';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(0);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Emma Johnson',
      avatar: 'EJ',
      lastMessage: 'That sounds perfect! When can we schedule a time to meet?',
      timestamp: '2 min ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Alex Chen',
      avatar: 'AC',
      lastMessage: 'I love the location near campus. Is parking included?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Michael Brown',
      avatar: 'MB',
      lastMessage: 'Thanks for sharing the photos of the apartment!',
      timestamp: '3 hours ago',
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: 'Lisa Wang',
      avatar: 'LW',
      lastMessage: 'Hey! I saw your profile and think we might be compatible roommates',
      timestamp: '1 day ago',
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'Emma Johnson',
      content: 'Hi Sarah! I saw your profile and think we could be great roommates. I\'m also a CS student at Berkeley.',
      timestamp: '10:30 AM',
      isMe: false
    },
    {
      id: 2,
      sender: 'me',
      content: 'Hi Emma! Thanks for reaching out. I looked at your profile too and we seem to have a lot in common!',
      timestamp: '10:32 AM',
      isMe: true
    },
    {
      id: 3,
      sender: 'Emma Johnson',
      content: 'Definitely! I saw you\'re interested in the downtown area. I found a really nice 2BR apartment that\'s within our budget range.',
      timestamp: '10:35 AM',
      isMe: false
    },
    {
      id: 4,
      sender: 'me',
      content: 'That sounds interesting! Could you share more details about the location and amenities?',
      timestamp: '10:37 AM',
      isMe: true
    },
    {
      id: 5,
      sender: 'Emma Johnson',
      content: 'Sure! It\'s on Telegraph Ave, about a 10-minute walk to campus. It has a full kitchen, in-unit laundry, and even a small study nook. Rent is $1000 each.',
      timestamp: '10:40 AM',
      isMe: false
    },
    {
      id: 6,
      sender: 'me',
      content: 'That sounds perfect! When can we schedule a time to meet and maybe view the apartment together?',
      timestamp: '10:42 AM',
      isMe: true
    },
    {
      id: 7,
      sender: 'Emma Johnson',
      content: 'That sounds perfect! When can we schedule a time to meet?',
      timestamp: '10:45 AM',
      isMe: false
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation, index) => (
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
                        <h4 className="font-semibold text-sm truncate">{conversation.name}</h4>
                        <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    
                    {conversation.unread > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
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
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Info className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4">
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
                          <div
                            className={`rounded-lg px-4 py-2 ${
                              message.isMe
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className={`text-xs text-muted-foreground mt-1 ${
                            message.isMe ? 'text-right' : 'text-left'
                          }`}>
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} className="px-4">
                      <Send className="w-4 h-4" />
                    </Button>
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
      </div>
    </div>
  );
};

export default MessagesPage;