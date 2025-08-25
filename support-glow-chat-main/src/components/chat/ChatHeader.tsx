import { Phone, User, Settings, Star, BookOpen, Shield, HelpCircle, MoreHorizontal } from 'lucide-react';

const headerIcons = [
  { Icon: Phone, label: 'Call Support', color: '#4CAF50' },
  { Icon: User, label: 'Profile', color: '#2196F3' },
  { Icon: Settings, label: 'Settings', color: '#607D8B' },
  { Icon: Star, label: 'Favorites', color: '#FF9800' },
  { Icon: BookOpen, label: 'Documentation', color: '#9C27B0' },
  { Icon: Shield, label: 'Security', color: '#F44336' },
  { Icon: HelpCircle, label: 'Help', color: '#00BCD4' },
  { Icon: MoreHorizontal, label: 'More Options', color: '#795548' }
];

export const ChatHeader = () => {
  return (
    <div className="bg-[hsl(var(--header-bg))] p-4 shadow-lg">
      <div className="flex items-center justify-center gap-3">
        {headerIcons.map(({ Icon, label, color }, index) => (
          <div
            key={index}
            className="header-icon hover-scale group relative"
            title={label}
          >
            <Icon className="w-5 h-5" style={{ color }} />
            
            {/* Tooltip */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};