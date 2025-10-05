import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  Info,
  Search,
  Filter,
  Settings,
  Target,
  Package,
  DollarSign,
  Calendar,
  Users
} from 'lucide-react';

interface ProjectNotificationsProps {
  project: any;
}

const notifications = [
  {
    id: 1,
    type: 'critical',
    category: 'inventory',
    title: 'Critical Steel Shortage',
    message: 'Steel inventory has fallen below critical threshold (850/1200 tons). Immediate procurement required to avoid project delays.',
    timestamp: '5 minutes ago',
    read: false,
    actionRequired: true,
    relatedProject: 'Delhi-NCR Grid Expansion',
    priority: 'high'
  },
  {
    id: 2,
    type: 'warning',
    category: 'procurement',
    title: 'Delayed Cement Delivery',
    message: 'Cement delivery from Cement Industries delayed by 3 days. Expected delivery moved to Feb 13, 2024.',
    timestamp: '2 hours ago',
    read: false,
    actionRequired: true,
    relatedProject: 'Delhi-NCR Grid Expansion',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'warning',
    category: 'budget',
    title: 'Budget Threshold Exceeded',
    message: 'Material spending has reached 92% of allocated budget for Q1. Consider budget revision or cost optimization.',
    timestamp: '4 hours ago',
    read: true,
    actionRequired: true,
    relatedProject: 'Delhi-NCR Grid Expansion',
    priority: 'medium'
  },
  {
    id: 4,
    type: 'info',
    category: 'delivery',
    title: 'Successful Material Delivery',
    message: 'Brick shipment (5,000 units) delivered successfully. Inventory updated automatically.',
    timestamp: '1 day ago',
    read: true,
    actionRequired: false,
    relatedProject: 'Delhi-NCR Grid Expansion',
    priority: 'low'
  },
  {
    id: 5,
    type: 'success',
    category: 'milestone',
    title: 'Phase 2 Milestone Achieved',
    message: 'Tower assembly phase completed ahead of schedule. Project is now 75% complete.',
    timestamp: '1 day ago',
    read: true,
    actionRequired: false,
    relatedProject: 'Delhi-NCR Grid Expansion',
    priority: 'low'
  },
  {
    id: 6,
    type: 'warning',
    category: 'timeline',
    title: 'Potential Timeline Risk',
    message: 'Current progress may impact final delivery timeline. Consider resource reallocation.',
    timestamp: '2 days ago',
    read: true,
    actionRequired: true,
    relatedProject: 'Delhi-NCR Grid Expansion',
    priority: 'medium'
  },
  {
    id: 7,
    type: 'info',
    category: 'team',
    title: 'Team Member Assignment',
    message: '3 new team members assigned to electrical installation phase.',
    timestamp: '3 days ago',
    read: true,
    actionRequired: false,
    relatedProject: 'Delhi-NCR Grid Expansion',
    priority: 'low'
  }
];

const alertRules = [
  {
    id: 1,
    name: 'Critical Inventory Alert',
    type: 'inventory',
    condition: 'Stock level below 70%',
    action: 'Email + SMS',
    enabled: true,
    recipients: 3
  },
  {
    id: 2,
    name: 'Budget Threshold Warning',
    type: 'budget',
    condition: 'Spending > 90% of budget',
    action: 'Email notification',
    enabled: true,
    recipients: 5
  },
  {
    id: 3,
    name: 'Delivery Delay Alert',
    type: 'procurement',
    condition: 'Delivery delayed > 2 days',
    action: 'Email + Push notification',
    enabled: true,
    recipients: 4
  },
  {
    id: 4,
    name: 'Milestone Achievement',
    type: 'milestone',
    condition: 'Phase completion',
    action: 'Email notification',
    enabled: true,
    recipients: 8
  }
];

export function ProjectNotifications({ project }: ProjectNotificationsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
          <p className="text-gray-600">Please select a project from the dashboard to view notifications</p>
        </div>
      </div>
    );
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return Clock;
      case 'success': return CheckCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'inventory': return Package;
      case 'procurement': return Bell;
      case 'budget': return DollarSign;
      case 'timeline': return Calendar;
      case 'team': return Users;
      default: return Info;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || notification.category === categoryFilter;
    const matchesReadStatus = !showUnreadOnly || !notification.read;
    
    return matchesSearch && matchesType && matchesCategory && matchesReadStatus;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.type === 'critical').length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.read).length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications & Alerts</h1>
          <p className="text-gray-600 mt-1">{project.name} - Real-time Project Alerts</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Alert Settings
          </Button>
          <Button>
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-3xl font-bold text-blue-600">{unreadCount}</p>
                <p className="text-sm text-blue-500 mt-1">Requires attention</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Info className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical</p>
                <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
                <p className="text-sm text-red-500 mt-1">Immediate action</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Action Required</p>
                <p className="text-3xl font-bold text-orange-600">{actionRequiredCount}</p>
                <p className="text-sm text-orange-500 mt-1">Pending action</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">Active Notifications</TabsTrigger>
          <TabsTrigger value="settings">Alert Settings</TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          {/* Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Success</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="timeline">Timeline</SelectItem>
                    <SelectItem value="team">Team</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={showUnreadOnly ? "default" : "outline"}
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                >
                  Unread Only
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              const CategoryIcon = getCategoryIcon(notification.category);
              const colors = getNotificationColors(notification.type);
              
              return (
                <Card 
                  key={notification.id} 
                  className={`glass-card border-l-4 ${colors.border} ${
                    notification.read 
                      ? 'opacity-75' 
                      : 'shadow-sm'
                  } hover:shadow-md transition-all`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 ${colors.bg} rounded-lg`}>
                        <Icon className={`w-5 h-5 ${colors.icon}`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <div className="flex items-center space-x-1">
                                <CategoryIcon className="w-3 h-3 text-gray-400" />
                                <Badge variant="outline" className="text-xs">
                                  {notification.category}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                              {notification.message}
                            </p>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>{notification.timestamp}</span>
                                <span>•</span>
                                <span>{notification.relatedProject}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {notification.actionRequired && (
                                  <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                                    Action Required
                                  </Badge>
                                )}
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    notification.priority === 'high' ? 'border-red-300 text-red-700' :
                                    notification.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                                    'border-green-300 text-green-700'
                                  }`}
                                >
                                  {notification.priority} priority
                                </Badge>
                                
                                <div className="flex space-x-2">
                                  {!notification.read && (
                                    <Button size="sm" variant="outline">
                                      Mark as Read
                                    </Button>
                                  )}
                                  {notification.actionRequired && (
                                    <Button size="sm">
                                      Take Action
                                    </Button>
                                  )}
                                </div>
                              </div>
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
        </TabsContent>

        {/* Alert Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Alert Rules Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{rule.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <strong>Condition:</strong> {rule.condition}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Action:</strong> {rule.action} • {rule.recipients} recipients
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge variant={rule.enabled ? "default" : "secondary"}>
                        {rule.enabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <Button>
                  <Target className="w-4 h-4 mr-2" />
                  Add New Alert Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}