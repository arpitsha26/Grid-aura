import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  Bell,
  Package,
  TrendingDown
} from 'lucide-react';

interface NotificationsProps {
  onNavigate: (screen: string) => void;
}

const notifications = [
  {
    id: 1,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Critical Stock Alert',
    message: 'Steel inventory below safety threshold (850/1200 tons). Immediate action required.',
    time: '5 minutes ago',
    actionText: 'View Details',
    read: false
  },
  {
    id: 2,
    type: 'warning',
    icon: Clock,
    title: 'Procurement Due',
    message: 'Cement procurement scheduled for tomorrow. Verify supplier delivery schedule.',
    time: '2 hours ago',
    actionText: 'Schedule Review',
    read: false
  },
  {
    id: 3,
    type: 'warning',
    icon: DollarSign,
    title: 'Budget Threshold Alert',
    message: 'Material spending reached 85% of allocated budget for Q1.',
    time: '4 hours ago',
    actionText: 'View Budget',
    read: true
  },
  {
    id: 4,
    type: 'info',
    icon: Package,
    title: 'Delivery Confirmation',
    message: 'Brick shipment (5,000 units) delivered successfully to Grid Project Alpha.',
    time: '1 day ago',
    actionText: 'Update Inventory',
    read: true
  },
  {
    id: 5,
    type: 'success',
    icon: CheckCircle,
    title: 'Forecast Update Complete',
    message: 'Monthly demand forecast has been updated with 98.5% accuracy rating.',
    time: '1 day ago',
    actionText: 'View Report',
    read: true
  },
  {
    id: 6,
    type: 'warning',
    icon: TrendingDown,
    title: 'Usage Anomaly Detected',
    message: 'Unusual spike in Morang consumption detected in Grid Section B.',
    time: '2 days ago',
    actionText: 'Investigate',
    read: true
  },
  {
    id: 7,
    type: 'info',
    icon: Bell,
    title: 'System Maintenance',
    message: 'Scheduled system maintenance completed. All forecasting models updated.',
    time: '3 days ago',
    actionText: 'View Changelog',
    read: true
  }
];

export function Notifications({ onNavigate }: NotificationsProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationColors = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-l-red-500',
          icon: 'text-red-600',
          badge: 'bg-red-100 text-red-800'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-l-yellow-500',
          icon: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-l-green-500',
          icon: 'text-green-600',
          badge: 'bg-green-100 text-green-800'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-l-blue-500',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-800'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onNavigate('dashboard')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
            <p className="text-sm text-muted-foreground">Stay updated with important alerts</p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <Badge className="bg-red-100 text-red-800">
            {unreadCount} new
          </Badge>
        )}
      </div>

      {/* Mark All as Read */}
      {unreadCount > 0 && (
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Unread Notifications</h3>
                <p className="text-sm text-muted-foreground">You have {unreadCount} unread notifications</p>
              </div>
              <Button variant="outline" size="sm">
                Mark All as Read
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          const colors = getNotificationColors(notification.type);
          
          return (
            <Card 
              key={notification.id} 
              className={`backdrop-blur-sm border-l-4 ${colors.border} ${
                notification.read 
                  ? 'bg-white/50 border-white/20' 
                  : 'bg-white/80 border-white/30 shadow-sm'
              } hover:bg-white/90 transition-all`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 ${colors.bg} rounded-lg`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        
                        <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                          
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs px-3 py-1 h-auto"
                          >
                            {notification.actionText}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-red-600">{notifications.filter(n => n.type === 'critical').length}</p>
            <p className="text-xs text-muted-foreground">Critical</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-yellow-600">{notifications.filter(n => n.type === 'warning').length}</p>
            <p className="text-xs text-muted-foreground">Warning</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-blue-600">{notifications.filter(n => n.type === 'info').length}</p>
            <p className="text-xs text-muted-foreground">Info</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-3 text-center">
            <p className="text-lg font-bold text-green-600">{notifications.filter(n => n.type === 'success').length}</p>
            <p className="text-xs text-muted-foreground">Success</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}