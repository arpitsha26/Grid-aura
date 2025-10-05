import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Zap, 
  Building, 
  Truck, 
  Box, 
  Mountain, 
  Plus, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  Activity
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const inventoryData = [
  { name: 'Steel', current: 850, required: 1200, icon: Building, status: 'low' },
  { name: 'Cement', current: 2340, required: 2500, icon: Box, status: 'good' },
  { name: 'Bricks', current: 15600, required: 18000, icon: Box, status: 'medium' },
  { name: 'Balu', current: 890, required: 900, icon: Mountain, status: 'good' },
  { name: 'Morang', current: 156, required: 200, icon: Truck, status: 'low' },
];

const forecastData = [
  { month: 'Jan', steel: 800, cement: 2200, bricks: 15000 },
  { month: 'Feb', steel: 1200, cement: 2500, bricks: 18000 },
  { month: 'Mar', steel: 900, cement: 2100, bricks: 16500 },
  { month: 'Apr', steel: 1100, cement: 2400, bricks: 17200 },
  { month: 'May', steel: 950, cement: 2000, bricks: 15800 },
  { month: 'Jun', steel: 1300, cement: 2600, bricks: 19000 },
];

export function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Power Grid Project Alpha</h1>
          <p className="text-sm text-muted-foreground">Inventory Management Dashboard</p>
        </div>
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-black">
            JD
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Alert Banner */}
      <Alert className="bg-red-50 border-red-200">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <strong>Steel running low</strong> – reorder in 5 days to avoid project delays
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <Button 
          className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 whitespace-nowrap"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stock
        </Button>
        <Button 
          variant="outline" 
          className="bg-white/70 border-white/30 whitespace-nowrap"
          onClick={() => onNavigate('reports')}
        >
          <FileText className="w-4 h-4 mr-2" />
          Forecast Report
        </Button>
      </div>

      {/* Inventory Status Cards */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Inventory Status</h2>
        <div className="grid grid-cols-1 gap-3">
          {inventoryData.map((item) => {
            const Icon = item.icon;
            const percentage = (item.current / item.required) * 100;
            
            return (
              <Card 
                key={item.name} 
                className="backdrop-blur-sm bg-white/70 border border-white/20 hover:bg-white/80 transition-all cursor-pointer"
                onClick={() => onNavigate('material')}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'low' ? 'bg-red-100' :
                        item.status === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          item.status === 'low' ? 'text-red-600' :
                          item.status === 'medium' ? 'text-yellow-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.current.toLocaleString()} / {item.required.toLocaleString()} units
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={item.status === 'low' ? 'destructive' : item.status === 'medium' ? 'secondary' : 'default'}>
                        {percentage.toFixed(0)}%
                      </Badge>
                      <div className="w-16 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            item.status === 'low' ? 'bg-red-500' :
                            item.status === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Forecast Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">6-Month Demand Forecast</h2>
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Bar dataKey="steel" fill="#2563eb" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="cement" fill="#10b981" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="bricks" fill="#0ea5e9" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-sm">Steel</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span className="text-sm">Cement</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-sky-600 rounded"></div>
                <span className="text-sm">Bricks</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4 text-center">
            <Activity className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">98.5%</p>
            <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-muted-foreground">Days Saved</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}