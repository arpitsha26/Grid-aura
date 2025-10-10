import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Package, 
  AlertTriangle, 
  Search, 
  Filter, 
  Download, 
  Plus,
  TrendingDown,
  TrendingUp,
  Calendar,
  Target
} from 'lucide-react';

interface ProjectInventoryProps {
  project: any;
}

const inventoryData = [
  {
    id: 1,
    material: 'Steel (Structural)',
    currentStock: 850,
    requiredStock: 1200,
    shortage: 350,
    unit: 'tons',
    expectedDelivery: '2024-02-15',
    supplier: 'Steel Corp Ltd',
    status: 'critical',
    costPerUnit: 75000,
    lastUpdated: '2024-01-25'
  },
  {
    id: 2,
    material: 'Cement (Grade 53)',
    currentStock: 2340,
    requiredStock: 2500,
    shortage: 160,
    unit: 'bags',
    expectedDelivery: '2024-02-10',
    supplier: 'Cement Industries',
    status: 'low',
    costPerUnit: 450,
    lastUpdated: '2024-01-26'
  },
  {
    id: 3,
    material: 'Bricks (Red Clay)',
    currentStock: 15600,
    requiredStock: 18000,
    shortage: 2400,
    unit: 'pieces',
    expectedDelivery: '2024-02-20',
    supplier: 'Local Brick Yard',
    status: 'medium',
    costPerUnit: 8,
    lastUpdated: '2024-01-25'
  },
  {
    id: 4,
    material: 'Sand (Fine Grade)',
    currentStock: 890,
    requiredStock: 900,
    shortage: 10,
    unit: 'cubic meters',
    expectedDelivery: '2024-02-08',
    supplier: 'Sand Suppliers',
    status: 'good',
    costPerUnit: 1200,
    lastUpdated: '2024-01-26'
  },
  {
    id: 5,
    material: 'Metal Cables (ACSR)',
    currentStock: 2800,
    requiredStock: 3200,
    shortage: 400,
    unit: 'meters',
    expectedDelivery: '2024-03-05',
    supplier: 'Cable Manufacturing',
    status: 'medium',
    costPerUnit: 850,
    lastUpdated: '2024-01-24'
  },
  {
    id: 6,
    material: 'Concrete Poles',
    currentStock: 45,
    requiredStock: 60,
    shortage: 15,
    unit: 'pieces',
    expectedDelivery: '2024-02-25',
    supplier: 'Pole Industries',
    status: 'low',
    costPerUnit: 25000,
    lastUpdated: '2024-01-25'
  }
];

export function ProjectInventory({ project }: ProjectInventoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('material');

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
          <p className="text-gray-600">Please select a project from the dashboard to view inventory</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStockPercentage = (current: number, required: number) => {
    return (current / required) * 100;
  };

  const filteredData = inventoryData
    .filter(item => 
      item.material.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' || item.status === statusFilter)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'shortage': return b.shortage - a.shortage;
        case 'status': return a.status.localeCompare(b.status);
        default: return a.material.localeCompare(b.material);
      }
    });

  const criticalCount = inventoryData.filter(item => item.status === 'critical').length;
  const lowStockCount = inventoryData.filter(item => item.status === 'low').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">{project.name} - Material Stock Tracking</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Inventory
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Material
          </Button>
        </div>
      </div>

      {/* Alert Summary */}
      {(criticalCount > 0 || lowStockCount > 0) && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Inventory Alert:</strong> {criticalCount} critical shortages and {lowStockCount} low stock items require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Materials</p>
                <p className="text-3xl font-bold text-gray-900">{inventoryData.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Items</p>
                <p className="text-3xl font-bold text-red-600">{criticalCount}</p>
                <p className="text-sm text-red-500 mt-1">Immediate action required</p>
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
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-3xl font-bold text-orange-600">{lowStockCount}</p>
                <p className="text-sm text-orange-500 mt-1">Order soon</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-green-600">₹24.8Cr</p>
                <p className="text-sm text-green-500 mt-1">Current inventory</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="low">Low Stock</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="good">Good</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="material">Material Name</SelectItem>
                <SelectItem value="shortage">Shortage Amount</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="text-black">Material Inventory Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Material</TableHead>
                <TableHead className="text-black">Current Stock</TableHead>
                <TableHead className="text-black">Required Stock</TableHead>
                <TableHead className="text-black">Shortage</TableHead>
                <TableHead className="text-black">Status</TableHead>
                <TableHead className="text-black">Expected Delivery</TableHead>
                <TableHead className="text-black">Supplier</TableHead>
                <TableHead className="text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => {
                const stockPercentage = getStockPercentage(item.currentStock, item.requiredStock);
                
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-black">{item.material}</div>
                        <div className="text-sm text-black">Cost: ₹{item.costPerUnit.toLocaleString()}/{item.unit}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-black">{item.currentStock.toLocaleString()} {item.unit}</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              stockPercentage >= 80 ? 'bg-green-500' :
                              stockPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-black">{item.requiredStock.toLocaleString()} {item.unit}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-red-600">
                          {item.shortage.toLocaleString()} {item.unit}
                        </span>
                        {item.shortage > 0 && (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-black">{item.expectedDelivery}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium text-black">{item.supplier}</div>
                        <div className="text-black">Updated: {item.lastUpdated}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                        <Button size="sm">
                          Order
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}