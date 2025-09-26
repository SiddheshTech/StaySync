import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';

interface Message {
  id: number;
  fromMe: boolean;
  text: string;
  timestamp: string;
}

import { apiGet, apiPost } from '@/lib/api';

const ConversationPage = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');

  const send = () => {
    if (!draft.trim()) return;
    setMessages(prev => [...prev, { id: prev.length + 1, fromMe: true, text: draft.trim(), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    apiPost(`/messages/${id}`, { text: draft.trim() }).catch(() => {});
    setDraft('');
  };

  useEffect(() => {
    if (!id) return;
    apiGet<{ items: { from: string; to: string; text: string; sentAt: string }[] }>(`/messages/${id}`)
      .then(({ items }) => {
        const tokenUserId = localStorage.getItem('userId') || '';
        const mapped: Message[] = items.map((m, idx) => ({ id: idx + 1, text: m.text, fromMe: m.from === tokenUserId, timestamp: new Date(m.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
        setMessages(mapped);
      })
      .catch(() => {});
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Link to="/student/flatmates" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4 mr-2" /> Back to results</Link>

      <Card className="h-[70vh] flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8"><AvatarFallback className="bg-primary/10 text-primary">RM</AvatarFallback></Avatar>
            <CardTitle className="text-base">Conversation with User #{id}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-3">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.fromMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-2xl px-4 py-2 text-sm max-w-[75%] ${m.fromMe ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <div>{m.text}</div>
                <div className="text-[10px] opacity-70 mt-1 text-right">{m.timestamp}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Input placeholder="Type a message" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
        <Button onClick={send}>Send</Button>
      </div>
    </div>
  );
};

export default ConversationPage;


