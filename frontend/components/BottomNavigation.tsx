import { Badge } from './ui/badge';
import { 
  Home, 
  FileText, 
  Bell, 
  User,
  BarChart3
} from 'lucide-react';

interface BottomNavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Home' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'material', icon: BarChart3, label: 'Analytics' },
  { id: 'notifications', icon: Bell, label: 'Alerts', badge: 3 },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-white/20 z-50">
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-0 relative transition-colors ${
                isActive 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'text-blue-600' : ''}`} />
                {item.badge && (
                  <Badge 
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 text-black"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs mt-1 truncate ${
                isActive ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}