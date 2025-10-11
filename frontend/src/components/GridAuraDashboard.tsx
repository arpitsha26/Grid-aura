import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ProjectSelector } from './ProjectSelector';
import { IndiaMap } from './IndiaMap';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  TrendingUp, 
  Building2, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign,
  Users,
  Zap,
  Calendar,
  Search,
  Filter,
  Bell,
  Package,
  MapPin
} from 'lucide-react';

interface GridAuraDashboardProps {
  onSelectProject: (project: any) => void;
  selectedProject: any;
  onNavigateToMaterialDetails?: (project: any) => void;
}

const overviewStats = {
  totalProjects: 127,
  completed: 45,
  ongoing: 58,
  upcoming: 24,
  totalBudget: 15.8,
  spentBudget: 9.2,
  teamMembers: 1247,
  states: 20
};

const criticalAlerts = [
  {
    id: 1,
    type: 'critical',
    icon: AlertTriangle,
    title: 'Steel stock low in Jharkhand Project',
    message: 'Need 1000kg in 7 days',
    project: 'Jharkhand Rural Grid',
    timestamp: '5 min ago',
    color: 'bg-red-500'
  },
  {
    id: 2,
    type: 'warning',
    icon: Clock,
    title: 'Cement in Bihar Project will last 5 days',
    message: 'Recommended to order within 2 days',
    project: 'Bihar Transmission Line',
    timestamp: '12 min ago',
    color: 'bg-yellow-500'
  },
  {
    id: 3,
    type: 'info',
    icon: Package,
    title: 'Material delivery completed in Kerala',
    message: 'Bricks and cement stock replenished',
    project: 'Kerala Backwater Grid',
    timestamp: '1 hour ago',
    color: 'bg-blue-500'
  },
  {
    id: 4,
    type: 'warning',
    icon: DollarSign,
    title: 'Budget threshold reached in Tamil Nadu',
    message: '90% of allocated budget utilized',
    project: 'Tamil Nadu Coastal Grid',
    timestamp: '2 hours ago',
    color: 'bg-yellow-500'
  }
];

const timelineData = [
  { month: 'Jan', completed: 3, ongoing: 12, planned: 8 },
  { month: 'Feb', completed: 7, ongoing: 15, planned: 6 },
  { month: 'Mar', completed: 12, ongoing: 18, planned: 4 },
  { month: 'Apr', completed: 18, ongoing: 22, planned: 7 },
  { month: 'May', completed: 25, ongoing: 28, planned: 9 },
  { month: 'Jun', completed: 32, ongoing: 35, planned: 12 }
];

const projectStatusData = [
  { name: 'Completed', value: 45, color: '#10b981' },
  { name: 'Ongoing', value: 58, color: '#2563eb' },
  { name: 'Upcoming', value: 24, color: '#64748b' },
];

export function GridAuraDashboard({ onSelectProject, selectedProject, onNavigateToMaterialDetails }: GridAuraDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleStateClick = (stateName: string) => {
    console.log('Clicked state:', stateName);
  };

  const getAlertIcon = (alert: any) => {
    const Icon = alert.icon;
    return <Icon className={`w-4 h-4 ${
      alert.type === 'critical' ? 'text-red-600' :
      alert.type === 'warning' ? 'text-yellow-600' : 'text-blue-600'
    }`} />;
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 md:p-6 max-w-full text-black">
      {/* Header */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-black">
            Grid<span className="text-blue-600">Aura</span> Dashboard
          </h1>
          <p className="text-black mt-1">Comprehensive overview of national power infrastructure projects</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2 text-white" />
            <span className="text-white">Export Report</span>
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Zap className="w-3 h-3 mr-1" />
            System Online
          </Badge>
        </div>
      </div>

      {/* Project Selector with Search */}
      <Card className="glass-card w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-black">Project Selector</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={stateFilter} onValueChange={setStateFilter} >
                <SelectTrigger className="w-40 text-white ">
                  <Filter className="w-4 h-4 mr-2 text-white" />
                  <SelectValue placeholder="Filter by state" className="text-black
                  bg-white-100" />
                </SelectTrigger>
                <SelectContent className="bg-blue-100">
  <SelectItem 
    value="all" 
    className="text-white font-bold bg-transparent hover:bg-blue-200"
  >
    All States
  </SelectItem>
  <SelectItem 
    value="delhi" 
    className="text-black bg-blue-100 font-medium hover:bg-blue-200"
  >
    Delhi
  </SelectItem>
  <SelectItem 
    value="maharashtra" 
    className="text-black bg-blue-100 font-medium hover:bg-blue-200"
  >
    Maharashtra
  </SelectItem>
  <SelectItem 
    value="kerala" 
    className="text-black bg-blue-100 font-medium hover:bg-blue-200"
  >
    Kerala
  </SelectItem>
  <SelectItem 
    value="rajasthan" 
    className="text-black bg-blue-100 font-medium hover:bg-blue-200"
  >
    Rajasthan
  </SelectItem>
</SelectContent>

              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ProjectSelector 
            onNavigateToMaterialDetails={onNavigateToMaterialDetails}
          />
        </CardContent>
      </Card>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Alerts & Notifications Panel */}
  <Card className="glass-card w-full min-h-screen">
    <CardHeader>
      <CardTitle className="flex items-center space-x-2 text-black">
        <Bell className="w-5 h-5 text-yellow-600" />
        <span className="text-black">Alerts & Notifications</span>
        <Badge variant="destructive" className="ml-auto text-white">
          {criticalAlerts.filter(a => a.type === 'critical').length}
        </Badge>
      </CardTitle>
    </CardHeader>
          <CardContent className="space-y-4">
            {criticalAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'critical' ? 'bg-red-50 border-l-red-500' :
                alert.type === 'warning' ? 'bg-yellow-50 border-l-yellow-500' :
                'bg-blue-50 border-l-blue-500'
              } transition-all hover:shadow-sm`}>
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded ${
                    alert.type === 'critical' ? 'bg-red-100' :
                    alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {getAlertIcon(alert)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-black text-sm">{alert.title}</h4>
                    <p className="text-sm text-black mt-1">{alert.message}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-black/70">{alert.project}</span>
                      <span className="text-xs text-black/50">{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              <span className="text-white">View All Notifications</span>
            </Button>
          </CardContent>
        </Card>

        {/* Analytics Overview */}
  <Card className="glass-card w-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-black">Analytics Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{overviewStats.completed}</div>
                <div className="text-sm font-medium text-black">Completed</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{overviewStats.ongoing}</div>
                <div className="text-sm font-medium text-black">Ongoing</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{overviewStats.upcoming}</div>
                <div className="text-sm font-medium text-black">Upcoming</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{overviewStats.states}</div>
                <div className="text-sm font-medium text-black">States</div>
              </div>
            </div>
            
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="ongoing"
                    stackId="1"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.8}
                  />
                  <Area
                    type="monotone"
                    dataKey="planned"
                    stackId="1"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive India Map with Filters */}
  <Card className="glass-card w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-black">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-black">Interactive India Map</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="ongoing" className="rounded" defaultChecked />
                  <label htmlFor="ongoing" className="flex items-center space-x-1 text-black">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-black">Ongoing</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="completed" className="rounded" defaultChecked />
                  <label htmlFor="completed" className="flex items-center space-x-1 text-black">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-black">Completed</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="upcoming" className="rounded" defaultChecked />
                  <label htmlFor="upcoming" className="flex items-center space-x-1 text-black">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-black">Upcoming</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="critical" className="rounded" defaultChecked />
                  <label htmlFor="critical" className="flex items-center space-x-1 text-black">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-black">Critical</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <IndiaMap onStateClick={handleStateClick} />
        </CardContent>
      </Card>

      {/* Quick Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="glass-card w-full">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Total Projects</p>
                <p className="text-3xl font-bold text-black">{overviewStats.totalProjects}</p>
                <p className="text-sm mt-1 text-black">Across {overviewStats.states} states</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card w-full">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Budget Utilization</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-3xl font-bold text-black">₹{overviewStats.spentBudget}B</p>
                  <p className="text-sm text-black">of ₹{overviewStats.totalBudget}B</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(overviewStats.spentBudget / overviewStats.totalBudget) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card w-full">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Team Members</p>
                <p className="text-3xl font-bold text-black">{overviewStats.teamMembers.toLocaleString()}</p>
                <p className="text-sm mt-1 text-black">+5.2% this month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card w-full">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-black">Active Alerts</p>
                <p className="text-3xl font-bold text-black">{criticalAlerts.filter(a => a.type === 'critical').length}</p>
                <p className="text-sm mt-1 text-black">Require attention</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}