import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Calendar, ThumbsUp, Share2, ArrowUp, ArrowDown, Flag, Shield, Search as SearchIcon, Filter } from 'lucide-react';

const CommunityPage = () => {
  const posts = [
    { id: 1, author: 'Alex Chen', tag: 'Housing Tips', content: 'Pro tip: Tour at different times to check noise levels.', likes: 24, comments: 3 },
    { id: 2, author: 'Leah Park', tag: 'Roommate Life', content: 'Set clear chore schedules—saved our friendship.', likes: 18, comments: 4 },
    { id: 3, author: 'Sam Patel', tag: 'Neighborhoods', content: 'Southside is lively; Northside is quieter. Choose your vibe.', likes: 12, comments: 2 },
  ];

  const events = [
    { id: 1, title: 'Meet & Greet', date: 'Fri 6:00 PM', location: 'Campus Coffee Shop' },
    { id: 2, title: 'Lease Basics 101', date: 'Tue 4:00 PM', location: 'Student Center' },
    { id: 3, title: 'Neighborhood Walking Tour', date: 'Sat 10:00 AM', location: 'Main Quad' },
  ];

  const groups = [
    { id: 1, name: 'Quiet Study Roommates', members: 128 },
    { id: 2, name: 'Budget-Friendly Housing', members: 214 },
    { id: 3, name: 'Pet-Friendly Rentals', members: 96 },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Community</h1>
            <p className="text-muted-foreground">Connect with other students, share tips, and join events</p>
          </div>
        </div>

        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="forum">Forum</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>Share an update</CardTitle>
                <CardDescription>Ask questions, share experiences, or offer advice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea placeholder="What would you like to share?" />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="btn-hero">Post</Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                {posts.map((p) => (
                  <Card key={p.id} className="card-hover">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">{p.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{p.author}</div>
                          <Badge variant="secondary">{p.tag}</Badge>
                        </div>
                      </div>
                      <div className="text-sm">{p.content}</div>
                      <div className="flex gap-3 text-sm">
                        <Button size="sm" variant="outline"><ThumbsUp className="w-4 h-4 mr-1" /> {p.likes}</Button>
                        <Button size="sm" variant="outline"><MessageSquare className="w-4 h-4 mr-1" /> {p.comments}</Button>
                        <Button size="sm" variant="outline"><Share2 className="w-4 h-4 mr-1" /> Share</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Quick Join Groups</CardTitle>
                    <CardDescription>Find peers with similar needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {groups.map(g => (
                      <div key={g.id} className="flex items-center justify-between border rounded-md p-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">{g.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{g.members} members</Badge>
                          <Button size="sm" variant="outline">Join</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="forum" className="space-y-6">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>Forum & Discussion Boards</CardTitle>
                <CardDescription>Ask questions, share experiences, and help others</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-1 space-y-2">
                    <div className="text-sm font-medium">Categories</div>
                    <div className="space-y-2 text-sm">
                      {[
                        'General housing advice and tips',
                        'University-specific discussions',
                        'International student support',
                        'Budget and financial planning',
                        'Roommate relationship advice',
                        'Legal rights and tenant issues',
                        'Local area recommendations',
                      ].map((c, i) => (
                        <Button key={i} variant="outline" className="w-full justify-start">{c}</Button>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="col-span-2 flex items-center gap-2">
                        <SearchIcon className="w-4 h-4" />
                        <Input placeholder="Search threads..." />
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        <Input placeholder="Filter: recent / top / unanswered" />
                      </div>
                    </div>

                    <div className="border rounded-md p-4 space-y-3">
                      <div className="text-sm font-medium">Create Topic</div>
                      <Input placeholder="Topic title" />
                      <Textarea placeholder="Describe your question or share your experience" />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Preview</Button>
                        <Button className="btn-hero">Post Topic</Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[1,2,3].map((id) => (
                        <div key={id} className="border rounded-md p-3">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center gap-1">
                              <Button size="icon" variant="outline"><ArrowUp className="w-4 h-4" /></Button>
                              <div className="text-sm font-medium">42</div>
                              <Button size="icon" variant="outline"><ArrowDown className="w-4 h-4" /></Button>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium">How do I handle split utilities fairly?</div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary">Budget and financial planning</Badge>
                                  <Button size="sm" variant="outline"><Shield className="w-4 h-4 mr-1" /> Moderate</Button>
                                  <Button size="sm" variant="outline"><Flag className="w-4 h-4 mr-1" /> Report</Button>
                                </div>
                              </div>
                              <div className="text-xs text-muted-foreground">Posted by Alex • 3h ago • 6 replies • 1.2k views</div>

                              <div className="mt-3 space-y-3">
                                {[1,2].map((cid) => (
                                  <div key={cid} className="flex items-start gap-3 border rounded-md p-3 bg-muted/40">
                                    <Avatar>
                                      <AvatarFallback className="bg-primary/10 text-primary">U{cid}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="text-sm"><span className="font-medium">User{cid}</span> I recommend tracking on a shared spreadsheet, and agreeing on a baseline usage.</div>
                                      <div className="flex items-center gap-2 mt-2">
                                        <Button size="sm" variant="outline"><ThumbsUp className="w-4 h-4 mr-1" /> Upvote</Button>
                                        <Button size="sm" variant="outline"><MessageSquare className="w-4 h-4 mr-1" /> Reply</Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <div className="flex gap-2">
                                  <Input placeholder="Write a reply..." />
                                  <Button>Reply</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>Community Guidelines</CardTitle>
                <CardDescription>Keep the community helpful and respectful</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <div className="font-semibold">Posting rules and regulations</div>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Stay on topic and provide helpful, accurate info.</li>
                    <li>No harassment, hate speech, or personal attacks.</li>
                    <li>Do not share private information without consent.</li>
                  </ul>
                  <div className="font-semibold">Respectful communication standards</div>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Assume good intent and be constructive.</li>
                    <li>Disagree with ideas, not people.</li>
                  </ul>
                  <div className="font-semibold">Privacy and safety guidelines</div>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Remove sensitive data from shared documents.</li>
                    <li>Use built-in tools to report safety concerns.</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="font-semibold">Spam and self-promotion policies</div>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>No unsolicited advertisements.</li>
                    <li>Self-promotion allowed in designated threads only.</li>
                  </ul>
                  <div className="font-semibold">Moderation procedures</div>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Posts may be removed for guideline violations.</li>
                    <li>Repeat offenses may lead to temporary bans.</li>
                  </ul>
                  <div className="font-semibold">Consequence and appeal processes</div>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Appeal via Help & Support with details and context.</li>
                    <li>Moderators will review within 7 business days.</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="events" className="space-y-6">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>Create an Event</CardTitle>
                <CardDescription>Plan meetups and student gatherings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Event title" />
                  <Input placeholder="Location / venue" />
                  <Input type="date" />
                  <Input type="time" />
                  <Input placeholder="Capacity (number)" />
                  <Input type="file" multiple />
                </div>
                <Textarea placeholder="Event description and requirements" />
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="btn-hero">Create Event</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>Upcoming & Managed Events</CardTitle>
                <CardDescription>RSVPs, announcements, and more</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {events.map(e => (
                  <div key={e.id} className="border rounded-md p-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <div className="font-medium">{e.title}</div>
                          <div className="text-muted-foreground">{e.date} • {e.location}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Details</Button>
                        <Button size="sm">RSVP</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="border rounded-md p-3">
                        <div className="font-medium mb-2">RSVPs</div>
                        <div className="flex items-center justify-between"><span>Going</span><Badge variant="secondary">24</Badge></div>
                        <div className="flex items-center justify-between"><span>Interested</span><Badge variant="secondary">12</Badge></div>
                        <div className="flex items-center justify-between"><span>Capacity</span><Badge>50</Badge></div>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="font-medium mb-2">Announcements</div>
                        <div className="space-y-2">
                          <div className="border rounded p-2">Reminder: Bring student ID for check-in.</div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Input placeholder="New announcement..." />
                          <Button size="sm">Post</Button>
                        </div>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="font-medium mb-2">Check-in</div>
                        <div className="space-y-2">
                          <Button size="sm" variant="outline">Open Check-in</Button>
                          <Button size="sm" variant="outline">Download Attendance</Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="border rounded-md p-3">
                        <div className="font-medium mb-2">Feedback</div>
                        <div className="space-y-2">
                          <div className="border rounded p-2">Loved the venue, great networking!</div>
                          <div className="border rounded p-2">Could use a quieter space for Q&A.</div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Input placeholder="Share feedback..." />
                          <Button size="sm">Send</Button>
                        </div>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="font-medium mb-2">Photos & Memories</div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="aspect-video bg-muted rounded" />
                          <div className="aspect-video bg-muted rounded" />
                          <div className="aspect-video bg-muted rounded" />
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Input type="file" multiple />
                          <Button size="sm">Upload</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-6">
            <Card className="card-hover">
              <CardHeader className="pb-3">
                <CardTitle>Find Groups</CardTitle>
                <CardDescription>Search and filter communities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Search groups..." />
                  <Input placeholder="Filter by interest..." />
                  <Button>Search</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groups.map(g => (
                    <Card key={g.id}>
                      <CardContent className="p-4 space-y-2">
                        <div className="font-medium">{g.name}</div>
                        <div className="text-sm text-muted-foreground">{g.members} members</div>
                        <Button size="sm" variant="outline">View</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CommunityPage;


