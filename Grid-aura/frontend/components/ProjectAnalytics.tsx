import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Clock, 
  Zap, 
  Users,
  AlertTriangle,
  CheckCircle,
  Target
} from 'lucide-react';

interface ProjectAnalyticsProps {
  project: any;
}

const materialsUsage = [
  { material: 'Steel', current: 850, required: 1200, used: 350 },
  { material: 'Cement', current: 2340, required: 2500, used: 160 },
  { material: 'Bricks', current: 15600, required: 18000, used: 2400 },
  { material: 'Sand', current: 890, required: 900, used: 10 },
  { material: 'Metal Cables', current: 2800, required: 3200, used: 400 }
];

const towersData = [
  { month: 'Jan', completed: 12, planned: 15, pending: 3 },
  { month: 'Feb', completed: 24, planned: 30, pending: 6 },
  { month: 'Mar', completed: 38, planned: 45, pending: 7 },
  { month: 'Apr', completed: 52, planned: 60, pending: 8 },
  { month: 'May', completed: 68, planned: 75, pending: 7 },
  { month: 'Jun', completed: 82, planned: 90, pending: 8 }
];

const costForecast = [
  { month: 'Jan', actual: 2.1, forecast: 2.0, budget: 2.5 },
  { month: 'Feb', actual: 4.3, forecast: 4.2, budget: 5.0 },
  { month: 'Mar', actual: 6.8, forecast: 6.5, budget: 7.5 },
  { month: 'Apr', actual: 9.2, forecast: 8.8, budget: 10.0 },
  { month: 'May', actual: 11.6, forecast: 11.2, budget: 12.5 },
  { month: 'Jun', actual: 13.8, forecast: 13.5, budget: 15.0 }
];

const materialsDistribution = [
  { name: 'Steel', value: 35, color: '#2563eb' },
  { name: 'Cement', value: 25, color: '#10b981' },
  { name: 'Bricks', value: 20, color: '#f59e0b' },
  { name: 'Sand', value: 10, color: '#8b5cf6' },
  { name: 'Others', value: 10, color: '#64748b' }
];

const timelineMilestones = [
  { phase: 'Foundation', status: 'completed', progress: 100, deadline: '2024-02-15' },
  { phase: 'Tower Assembly', status: 'ongoing', progress: 75, deadline: '2024-05-30' },
  { phase: 'Cable Installation', status: 'upcoming', progress: 0, deadline: '2024-08-15' },
  { phase: 'Testing & QA', status: 'upcoming', progress: 0, deadline: '2024-10-30' },
  { phase: 'Commissioning', status: 'upcoming', progress: 0, deadline: '2024-12-15' }
];

export function ProjectAnalytics({ project }: ProjectAnalyticsProps) {
  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
          <p className="text-gray-600">Please select a project from the dashboard to view analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-gray-600 mt-1">Project Analytics & Performance Metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="6months">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Analytics</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Project Progress</p>
                <p className="text-3xl font-bold text-blue-600">{project.completion}%</p>
                <p className="text-sm text-gray-500 mt-1">On track</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Towers Completed</p>
                <p className="text-3xl font-bold text-green-600">82</p>
                <p className="text-sm text-gray-500 mt-1">of 90 planned</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Budget Used</p>
                <p className="text-3xl font-bold text-yellow-600">₹13.8B</p>
                <p className="text-sm text-gray-500 mt-1">of ₹15.0B allocated</p>
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
                <p className="text-sm font-medium text-gray-600">Days Remaining</p>
                <p className="text-3xl font-bold text-purple-600">127</p>
                <p className="text-sm text-gray-500 mt-1">Until deadline</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Materials Usage */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-blue-600" />
              <span>Materials Usage Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {materialsUsage.map((material) => {
                const percentage = (material.current / material.required) * 100;
                const status = percentage >= 90 ? 'high' : percentage >= 70 ? 'medium' : 'low';
                
                return (
                  <div key={material.material} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{material.material}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {material.current.toLocaleString()} / {material.required.toLocaleString()}
                        </span>
                        <Badge 
                          variant={status === 'high' ? 'destructive' : status === 'medium' ? 'secondary' : 'default'}
                          className="text-xs"
                        >
                          {percentage.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Materials Distribution */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Cost Distribution by Material</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={materialsDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {materialsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Towers Progress */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-blue-600" />
              <span>Towers Completed vs Pending</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={towersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="completed" fill="#10b981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="pending" fill="#ef4444" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cost Forecast */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span>Cost Forecast vs Actual</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={costForecast}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="#2563eb"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="budget"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Actual</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm">Forecast</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm">Budget</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Milestones */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-600" />
            <span>Project Timeline & Milestones</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {timelineMilestones.map((milestone, index) => (
              <div key={milestone.phase} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className={`p-2 rounded-lg ${
                  milestone.status === 'completed' ? 'bg-green-100' :
                  milestone.status === 'ongoing' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : milestone.status === 'ongoing' ? (
                    <Clock className="w-5 h-5 text-blue-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{milestone.phase}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        milestone.status === 'completed' ? 'default' :
                        milestone.status === 'ongoing' ? 'secondary' : 'outline'
                      }>
                        {milestone.status}
                      </Badge>
                      <span className="text-sm text-gray-600">{milestone.deadline}</span>
                    </div>
                  </div>
                  <Progress value={milestone.progress} className="h-2" />
                  <p className="text-sm text-gray-600 mt-1">{milestone.progress}% complete</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}