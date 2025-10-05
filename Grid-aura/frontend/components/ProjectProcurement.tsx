import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ShoppingCart, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Plus,
  Search,
  Filter,
  Download,
  TruckIcon,
  Target,
  Calendar
} from 'lucide-react';

interface ProjectProcurementProps {
  project: any;
}

const purchaseOrders = [
  {
    id: 'PO-2024-001',
    material: 'Steel (Structural)',
    quantity: 500,
    unit: 'tons',
    vendor: 'Steel Corp Ltd',
    cost: 37500000,
    orderDate: '2024-01-20',
    expectedDelivery: '2024-02-15',
    status: 'approved',
    progress: 75
  },
  {
    id: 'PO-2024-002',
    material: 'Cement (Grade 53)',
    quantity: 1000,
    unit: 'bags',
    vendor: 'Cement Industries',
    cost: 450000,
    orderDate: '2024-01-22',
    expectedDelivery: '2024-02-10',
    status: 'shipped',
    progress: 90
  },
  {
    id: 'PO-2024-003',
    material: 'Metal Cables (ACSR)',
    quantity: 800,
    unit: 'meters',
    vendor: 'Cable Manufacturing',
    cost: 680000,
    orderDate: '2024-01-25',
    expectedDelivery: '2024-03-05',
    status: 'pending',
    progress: 25
  },
  {
    id: 'PO-2024-004',
    material: 'Concrete Poles',
    quantity: 20,
    unit: 'pieces',
    vendor: 'Pole Industries',
    cost: 500000,
    orderDate: '2024-01-26',
    expectedDelivery: '2024-02-25',
    status: 'approved',
    progress: 60
  }
];

const forecastNeeds = [
  {
    material: 'Steel (Structural)',
    currentStock: 850,
    monthlyUsage: 200,
    daysUntilEmpty: 127,
    recommendedOrder: 350,
    urgency: 'medium',
    estimatedCost: 26250000
  },
  {
    material: 'Bricks (Red Clay)',
    currentStock: 15600,
    monthlyUsage: 3000,
    daysUntilEmpty: 156,
    recommendedOrder: 2400,
    urgency: 'low',
    estimatedCost: 19200
  },
  {
    material: 'Sand (Fine Grade)',
    currentStock: 890,
    monthlyUsage: 150,
    daysUntilEmpty: 178,
    recommendedOrder: 100,
    urgency: 'low',
    estimatedCost: 120000
  },
  {
    material: 'Concrete Poles',
    currentStock: 45,
    monthlyUsage: 8,
    daysUntilEmpty: 169,
    recommendedOrder: 15,
    urgency: 'medium',
    estimatedCost: 375000
  }
];

const vendors = [
  {
    id: 1,
    name: 'Steel Corp Ltd',
    rating: 4.8,
    completedOrders: 24,
    onTimeDelivery: 96,
    materials: ['Steel', 'Metal Cables'],
    contact: '+91-9876543210'
  },
  {
    id: 2,
    name: 'Cement Industries',
    rating: 4.6,
    completedOrders: 18,
    onTimeDelivery: 94,
    materials: ['Cement', 'Concrete'],
    contact: '+91-9876543211'
  },
  {
    id: 3,
    name: 'Cable Manufacturing',
    rating: 4.7,
    completedOrders: 15,
    onTimeDelivery: 92,
    materials: ['Cables', 'Electrical Components'],
    contact: '+91-9876543212'
  },
  {
    id: 4,
    name: 'Pole Industries',
    rating: 4.5,
    completedOrders: 12,
    onTimeDelivery: 88,
    materials: ['Poles', 'Concrete Products'],
    contact: '+91-9876543213'
  }
];

export function ProjectProcurement({ project }: ProjectProcurementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  if (!project) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Project Selected</h3>
          <p className="text-gray-600">Please select a project from the dashboard to view procurement</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = purchaseOrders.filter(order => 
    order.material.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || order.status === statusFilter)
  );

  const totalOrderValue = purchaseOrders.reduce((sum, order) => sum + order.cost, 0);
  const pendingOrders = purchaseOrders.filter(order => order.status === 'pending').length;
  const approvedOrders = purchaseOrders.filter(order => order.status === 'approved').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Procurement Management</h1>
          <p className="text-gray-600 mt-1">{project.name} - Purchase Orders & Vendor Management</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Purchase Order
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{purchaseOrders.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingOrders}</p>
                <p className="text-sm text-yellow-500 mt-1">Awaiting approval</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved Orders</p>
                <p className="text-3xl font-bold text-green-600">{approvedOrders}</p>
                <p className="text-sm text-green-500 mt-1">In progress</p>
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
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-3xl font-bold text-purple-600">₹{(totalOrderValue / 10000000).toFixed(1)}Cr</p>
                <p className="text-sm text-purple-500 mt-1">Current orders</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <TruckIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="forecast">Procurement Forecast</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
        </TabsList>

        {/* Purchase Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          {/* Filters */}
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search orders..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Expected Delivery</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="font-medium text-blue-600">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.orderDate}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.material}</div>
                      </TableCell>
                      <TableCell>
                        <span>{order.quantity.toLocaleString()} {order.unit}</span>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.vendor}</div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">₹{order.cost.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{order.expectedDelivery}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{order.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${order.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                          <Button size="sm">
                            Track
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecast Tab */}
        <TabsContent value="forecast" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Procurement Forecast</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Monthly Usage</TableHead>
                    <TableHead>Days Until Empty</TableHead>
                    <TableHead>Recommended Order</TableHead>
                    <TableHead>Estimated Cost</TableHead>
                    <TableHead>Urgency</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forecastNeeds.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{item.material}</div>
                      </TableCell>
                      <TableCell>
                        <span>{item.currentStock.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span>{item.monthlyUsage.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{item.daysUntilEmpty} days</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{item.recommendedOrder.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <span>₹{item.estimatedCost.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getUrgencyColor(item.urgency)}>
                          {item.urgency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">
                          Create PO
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vendors Tab */}
        <TabsContent value="vendors" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vendors.map((vendor) => (
              <Card key={vendor.id} className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{vendor.name}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-medium">{vendor.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Completed Orders</p>
                        <p className="font-medium">{vendor.completedOrders}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">On-Time Delivery</p>
                        <p className="font-medium">{vendor.onTimeDelivery}%</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Materials</p>
                      <div className="flex flex-wrap gap-1">
                        {vendor.materials.map((material) => (
                          <Badge key={material} variant="outline">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-gray-600">{vendor.contact}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                        <Button size="sm">
                          New Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}