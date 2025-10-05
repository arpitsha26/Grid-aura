import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  BarChart3,
  TrendingUp,
  Package
} from 'lucide-react';

interface ReportsProps {
  onNavigate: (screen: string) => void;
}

const reports = [
  {
    id: 1,
    title: 'Monthly Inventory Forecast',
    type: 'Forecast Report',
    date: '2024-01-25',
    format: 'PDF',
    size: '2.4 MB',
    icon: TrendingUp,
    status: 'ready'
  },
  {
    id: 2,
    title: 'Steel Procurement Analysis',
    type: 'Material Report',
    date: '2024-01-24',
    format: 'CSV',
    size: '890 KB',
    icon: Package,
    status: 'ready'
  },
  {
    id: 3,
    title: 'Grid Project Alpha - Q1 Summary',
    type: 'Project Report',
    date: '2024-01-22',
    format: 'PDF',
    size: '5.1 MB',
    icon: BarChart3,
    status: 'ready'
  },
  {
    id: 4,
    title: 'Budget vs Actual Spending',
    type: 'Financial Report',
    date: '2024-01-20',
    format: 'CSV',
    size: '1.2 MB',
    icon: TrendingUp,
    status: 'ready'
  },
  {
    id: 5,
    title: 'Supplier Performance Analysis',
    type: 'Vendor Report',
    date: '2024-01-18',
    format: 'PDF',
    size: '3.8 MB',
    icon: Package,
    status: 'ready'
  },
  {
    id: 6,
    title: 'Risk Assessment - Material Shortage',
    type: 'Risk Report',
    date: '2024-01-15',
    format: 'PDF',
    size: '4.2 MB',
    icon: TrendingUp,
    status: 'processing'
  }
];

export function Reports({ onNavigate }: ReportsProps) {
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
        <div>
          <h1 className="text-xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-muted-foreground">Download and manage your reports</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex-1 grid grid-cols-2 gap-3">
              <Select defaultValue="all-projects">
                <SelectTrigger className="bg-white/50">
                  <SelectValue placeholder="Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-projects">All Projects</SelectItem>
                  <SelectItem value="grid-alpha">Grid Project Alpha</SelectItem>
                  <SelectItem value="grid-beta">Grid Project Beta</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all-dates">
                <SelectTrigger className="bg-white/50">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-dates">All Dates</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate New Report */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Generate New Report</h3>
              <p className="text-sm text-muted-foreground">Create custom reports based on current data</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <FileText className="w-4 h-4 mr-2" />
              Generate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
        
        {reports.map((report) => {
          const Icon = report.icon;
          
          return (
            <Card 
              key={report.id} 
              className="backdrop-blur-sm bg-white/70 border border-white/20 hover:bg-white/80 transition-all"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.type}</p>
                        
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{report.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>{report.format}</span>
                          </div>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge 
                          variant={report.status === 'ready' ? 'default' : 'secondary'}
                          className={report.status === 'ready' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {report.status === 'ready' ? 'Ready' : 'Processing'}
                        </Badge>
                        
                        {report.status === 'ready' && (
                          <Button size="sm" variant="outline" className="px-3">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">24</p>
            <p className="text-sm text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">18</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">2</p>
            <p className="text-sm text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}