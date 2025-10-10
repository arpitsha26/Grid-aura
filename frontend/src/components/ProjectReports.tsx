import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  Package, 
  DollarSign,
  BarChart3,
  Target,
  Eye,
  Share
} from 'lucide-react';

interface ProjectReportsProps {
  project: any;
}

const inventoryReports = [
  {
    id: 'INV-2024-001',
    title: 'Monthly Inventory Status',
    type: 'Inventory',
    date: '2024-01-31',
    format: 'PDF',
    size: '2.4 MB',
    status: 'ready',
    description: 'Complete inventory status with stock levels and forecasts'
  },
  {
    id: 'INV-2024-002',
    title: 'Material Consumption Analysis',
    type: 'Inventory',
    date: '2024-01-28',
    format: 'Excel',
    size: '1.8 MB',
    status: 'ready',
    description: 'Detailed analysis of material consumption patterns'
  },
  {
    id: 'INV-2024-003',
    title: 'Stock Movement Report',
    type: 'Inventory',
    date: '2024-01-25',
    format: 'PDF',
    size: '3.2 MB',
    status: 'generating',
    description: 'Weekly stock movement and procurement activities'
  }
];

const procurementReports = [
  {
    id: 'PROC-2024-001',
    title: 'Purchase Order Summary',
    type: 'Procurement',
    date: '2024-01-30',
    format: 'PDF',
    size: '1.9 MB',
    status: 'ready',
    description: 'Summary of all purchase orders and vendor performance'
  },
  {
    id: 'PROC-2024-002',
    title: 'Vendor Performance Analysis',
    type: 'Procurement',
    date: '2024-01-27',
    format: 'Excel',
    size: '2.1 MB',
    status: 'ready',
    description: 'Detailed vendor performance metrics and ratings'
  },
  {
    id: 'PROC-2024-003',
    title: 'Cost Analysis Report',
    type: 'Procurement',
    date: '2024-01-24',
    format: 'PDF',
    size: '2.8 MB',
    status: 'ready',
    description: 'Material cost analysis and budget variance'
  }
];

const costReports = [
  {
    id: 'COST-2024-001',
    title: 'Budget vs Actual Spending',
    type: 'Cost',
    date: '2024-01-31',
    format: 'Excel',
    size: '1.6 MB',
    status: 'ready',
    description: 'Comprehensive budget analysis with variance reports'
  },
  {
    id: 'COST-2024-002',
    title: 'Cost Forecast Report',
    type: 'Cost',
    date: '2024-01-29',
    format: 'PDF',
    size: '2.3 MB',
    status: 'ready',
    description: 'Future cost projections and budget recommendations'
  },
  {
    id: 'COST-2024-003',
    title: 'Material Cost Trends',
    type: 'Cost',
    date: '2024-01-26',
    format: 'Excel',
    size: '1.9 MB',
    status: 'generating',
    description: 'Historical cost trends and market analysis'
  }
];

const progressReports = [
  {
    id: 'PROG-2024-001',
    title: 'Project Progress Summary',
    type: 'Progress',
    date: '2024-01-31',
    format: 'PDF',
    size: '4.1 MB',
    status: 'ready',
    description: 'Overall project progress with milestone tracking'
  },
  {
    id: 'PROG-2024-002',
    title: 'Tower Completion Status',
    type: 'Progress',
    date: '2024-01-28',
    format: 'Excel',
    size: '2.7 MB',
    status: 'ready',
    description: 'Detailed tower-wise completion status and timeline'
  },
  {
    id: 'PROG-2024-003',
    title: 'Weekly Progress Report',
    type: 'Progress',
    date: '2024-01-26',
    format: 'PDF',
    size: '1.8 MB',
    status: 'ready',
    description: 'Weekly progress update with photos and metrics'
  }
];

const reportCategories = [
  { id: 'inventory', label: 'Inventory Reports', count: inventoryReports.length, icon: Package },
  { id: 'cost', label: 'Cost Reports', count: costReports.length, icon: DollarSign },
  { id: 'progress', label: 'Progress Reports', count: progressReports.length, icon: TrendingUp }
];

export function ProjectReports({ project }: ProjectReportsProps) {
  const [selectedCategory, setSelectedCategory] = useState('inventory');
  const [dateFilter, setDateFilter] = useState('all');

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
          <p className="text-gray-600">Please select a project from the dashboard to view reports</p>
        </div>
      </div>
    );
  }

  const getReportsByCategory = () => {
    switch (selectedCategory) {
      case 'inventory': return inventoryReports;
      case 'cost': return costReports;
      case 'progress': return progressReports;
      default: return [];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalReports = inventoryReports.length + costReports.length + progressReports.length;
  const readyReports = [
    ...inventoryReports,
    ...costReports,
    ...progressReports
  ].filter(report => report.status === 'ready').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Reports & Analytics</h1>
          <p className="text-black mt-1">{project.name} - Comprehensive Project Reports</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Target className="w-4 h-4 mr-2" />
            Generate Custom Report
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{totalReports}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ready for Download</p>
                <p className="text-3xl font-bold text-green-600">{readyReports}</p>
                <p className="text-sm text-green-500 mt-1">Available now</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Download className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-purple-600">18</p>
                <p className="text-sm text-purple-500 mt-1">Reports generated</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing</p>
                <p className="text-3xl font-bold text-yellow-600">2</p>
                <p className="text-sm text-yellow-500 mt-1">Reports in queue</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reportCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card
              key={category.id}
              className={`cursor-pointer smooth-transition hover:shadow-md ${
                selectedCategory === category.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'glass-card hover:bg-white'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`p-3 rounded-lg mx-auto mb-3 w-fit ${
                  selectedCategory === category.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    selectedCategory === category.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="font-medium text-black">{category.label}</h3>
                <p className="text-sm text-black mt-1">{category.count} reports</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reports Table */}
      <Card className="glass-card">
        <CardHeader>
            <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-black">{reportCategories.find(cat => cat.id === selectedCategory)?.label}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="text-black">Report Title</TableHead>
                <TableHead className="text-black">Description</TableHead>
                <TableHead className="text-black">Date</TableHead>
                <TableHead className="text-black">Format</TableHead>
                <TableHead className="text-black">Size</TableHead>
                <TableHead className="text-black">Status</TableHead>
                <TableHead className="text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getReportsByCategory().map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-black">{report.title}</div>
                      <div className="text-sm text-black">{report.id}</div>
                    </div>
                  </TableCell>
                    <TableCell>
                    <p className="text-sm text-black max-w-xs">{report.description}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-black">{report.date}</span>
                    </div>
                  </TableCell>
                    <TableCell>
                    <Badge variant="outline" className="text-black">{report.format}</Badge>
                  </TableCell>
                    <TableCell>
                    <span className="text-sm text-black">{report.size}</span>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        Preview
                      </Button>
                      {report.status === 'ready' && (
                        <>
                          <Button size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Export Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <FileText className="w-8 h-8 text-blue-600" />
              <span className="font-medium">Export as PDF</span>
              <span className="text-sm text-gray-600">Formatted for printing</span>
            </Button>
            
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <BarChart3 className="w-8 h-8 text-green-600" />
              <span className="font-medium">Export as Excel</span>
              <span className="text-sm text-gray-600">Data analysis format</span>
            </Button>
            
            <Button variant="outline" className="p-6 h-auto flex-col space-y-2">
              <Share className="w-8 h-8 text-purple-600" />
              <span className="font-medium">Email Reports</span>
              <span className="text-sm text-gray-600">Send to stakeholders</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}