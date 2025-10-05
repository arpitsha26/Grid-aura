import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft, 
  Building, 
  TrendingDown, 
  AlertTriangle, 
  FileText,
  Calendar,
  Target
} from 'lucide-react';

interface MaterialDetailProps {
  onNavigate: (screen: string) => void;
}

const usageData = [
  { week: 'Week 1', usage: 120, forecast: 110 },
  { week: 'Week 2', usage: 145, forecast: 140 },
  { week: 'Week 3', usage: 165, forecast: 160 },
  { week: 'Week 4', usage: 135, forecast: 150 },
  { week: 'Week 5', usage: 175, forecast: 170 },
  { week: 'Week 6', usage: 155, forecast: 165 },
  { week: 'Week 7', usage: 180, forecast: 175 },
  { week: 'Week 8', usage: 190, forecast: 185 },
];

const recentTransactions = [
  { date: '2024-01-15', type: 'Received', amount: 500, supplier: 'Steel Corp Ltd' },
  { date: '2024-01-10', type: 'Used', amount: -120, project: 'Grid Section A' },
  { date: '2024-01-08', type: 'Used', amount: -95, project: 'Grid Section B' },
  { date: '2024-01-05', type: 'Received', amount: 300, supplier: 'Metro Steel' },
];

export function MaterialDetail({ onNavigate }: MaterialDetailProps) {
  const currentStock = 850;
  const requiredStock = 1200;
  const gap = requiredStock - currentStock;
  const stockPercentage = (currentStock / requiredStock) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onNavigate('dashboard')}
          className="p-2"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Building className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Steel</h1>
            <p className="text-sm text-muted-foreground">Structural Steel Inventory</p>
          </div>
        </div>
      </div>

      {/* Stock Overview Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Current Stock</p>
            <p className="text-xl font-bold text-gray-900">{currentStock.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">tons</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Required Stock</p>
            <p className="text-xl font-bold text-gray-900">{requiredStock.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">tons</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">Remaining Gap</p>
            <p className="text-xl font-bold text-red-600">{gap.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">tons</p>
          </CardContent>
        </Card>
      </div>

      {/* Stock Level Progress */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            Stock Level
            <Badge variant="destructive" className="text-xs">
              {stockPercentage.toFixed(1)}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Progress value={stockPercentage} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0 tons</span>
            <span>{requiredStock.toLocaleString()} tons</span>
          </div>
        </CardContent>
      </Card>

      {/* Usage Trend Chart */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center space-x-2">
            <TrendingDown className="w-5 h-5 text-blue-600" />
            <span>Usage Trend</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#2563eb" 
                  fill="#2563eb" 
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#10b981" 
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span className="text-sm">Actual Usage</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded"></div>
              <span className="text-sm">Forecast</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-900">Critical Stock Level</h3>
              <p className="text-sm text-red-700 mt-1">
                Steel inventory is below safety threshold. Recommend immediate procurement of {gap} tons to avoid project delays.
              </p>
              <div className="flex items-center space-x-2 mt-2 text-xs text-red-600">
                <Calendar className="w-3 h-3" />
                <span>Expected shortage in 5 days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentTransactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium text-sm">{transaction.type}</p>
                <p className="text-xs text-muted-foreground">
                  {transaction.supplier || transaction.project} • {transaction.date}
                </p>
              </div>
              <Badge 
                variant={transaction.amount > 0 ? "default" : "secondary"}
                className={transaction.amount > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
              >
                {transaction.amount > 0 ? '+' : ''}{transaction.amount} tons
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Action Button */}
      <Button 
        className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
        size="lg"
      >
        <FileText className="w-5 h-5 mr-2" />
        Generate Procurement Plan
      </Button>
    </div>
  );
}