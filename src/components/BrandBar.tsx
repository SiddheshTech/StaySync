import { ReactNode } from 'react';
import { Home } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BrandBarProps {
  badgeText?: string;
  title?: string;
  rightSlot?: ReactNode;
}

const BrandBar = ({ badgeText = 'Student Dashboard', title = 'CampusConnect', rightSlot }: BrandBarProps) => {
  return (
    <div className="w-full bg-gradient-to-r from-primary to-secondary text-white shadow-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">{title}</span>
          </div>
          {rightSlot ? (
            rightSlot
          ) : (
            <Badge className="bg-white text-primary border-transparent font-medium shadow-sm">{badgeText}</Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandBar;


