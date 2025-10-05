import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
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
  Calendar
} from 'lucide-react';

interface GlobalDashboardProps {
  onSelectProject: (project: any) => void;
  selectedProject: any;
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

const timelineData = [
  { month: 'Jan', completed: 3, ongoing: 12, planned: 8 },
  { month: 'Feb', completed: 7, ongoing: 15, planned: 6 },
  { month: 'Mar', completed: 12, ongoing: 18, planned: 4 },
  { month: 'Apr', completed: 18, ongoing: 22, planned: 7 },
  { month: 'May', completed: 25, ongoing: 28, planned: 9 },
  { month: 'Jun', completed: 32, ongoing: 35, planned: 12 },
  { month: 'Jul', completed: 38, ongoing: 42, planned: 15 },
  { month: 'Aug', completed: 45, ongoing: 50, planned: 18 },
  { month: 'Sep', completed: 52, ongoing: 58, planned: 21 },
  { month: 'Oct', completed: 58, ongoing: 65, planned: 24 },
];

const budgetData = [
  { month: 'Jan', allocated: 12.5, spent: 8.2, forecast: 11.8 },
  { month: 'Feb', allocated: 13.2, spent: 9.1, forecast: 12.4 },
  { month: 'Mar', allocated: 14.8, spent: 10.3, forecast: 13.9 },
  { month: 'Apr', allocated: 15.2, spent: 11.8, forecast: 14.6 },
  { month: 'May', allocated: 15.8, spent: 13.2, forecast: 15.1 },
  { month: 'Jun', allocated: 16.5, spent: 14.7, forecast: 15.8 },
];

const projectStatusData = [
  { name: 'Completed', value: 45, color: '#10b981' },
  { name: 'Ongoing', value: 58, color: '#2563eb' },
  { name: 'Upcoming', value: 24, color: '#64748b' },
];

export function GlobalDashboard({ onSelectProject, selectedProject }: GlobalDashboardProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const handleStateClick = (stateName: string) => {
    console.log('Clicked state:', stateName);
    // Could filter projects by state or show state-specific data
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PowerGrid Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive overview of national power infrastructure projects</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            System Online
          </Badge>
        </div>
      </div>

      {/* Project Selector */}
      <ProjectSelector 
        projects={[]}
        selectedProject={selectedProject}
        onSelectProject={onSelectProject}
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900">{overviewStats.totalProjects}</p>
                <p className="text-sm text-gray-500 mt-1">Across {overviewStats.states} states</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Project Progress</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-3xl font-bold text-green-600">{overviewStats.completed}</p>
                  <p className="text-sm text-gray-500">completed</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                  <span className="text-blue-600">{overviewStats.ongoing} ongoing</span>
                  <span className="text-gray-500">{overviewStats.upcoming} upcoming</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Utilization</p>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-3xl font-bold text-gray-900">₹{overviewStats.spentBudget}B</p>
                  <p className="text-sm text-gray-500">of ₹{overviewStats.totalBudget}B</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(overviewStats.spentBudget / overviewStats.totalBudget) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-gray-900">{overviewStats.teamMembers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">+5.2% this month</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Chart */}
        <Card className="lg:col-span-2 glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Project Timeline</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button 
                variant={selectedTimeframe === '3months' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedTimeframe('3months')}
              >
                3M
              </Button>
              <Button 
                variant={selectedTimeframe === '6months' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedTimeframe('6months')}
              >
                6M
              </Button>
              <Button 
                variant={selectedTimeframe === '1year' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedTimeframe('1year')}
              >
                1Y
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80">
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
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm">Ongoing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-500 rounded"></div>
                <span className="text-sm">Planned</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Status Distribution */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {projectStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {projectStatusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Analysis */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Budget Analysis</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="allocated"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="spent"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm">Allocated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Spent</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-sm">Forecast</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* India Map */}
        <IndiaMap onStateClick={handleStateClick} />
      </div>
    </div>
  );
}