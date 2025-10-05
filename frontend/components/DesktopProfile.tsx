import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  User, 
  Mail, 
  Lock, 
  Bell, 
  Shield,
  Edit3,
  Save,
  X,
  Phone,
  Building,
  MapPin,
  Calendar,
  Activity
} from 'lucide-react';

interface DesktopProfileProps {
  onNavigate: (page: string) => void;
}

export function DesktopProfile({ onNavigate }: DesktopProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: 'John Doe',
    email: 'john.doe@supplai.gov.in',
    phone: '+91-9876543210',
    designation: 'Senior Project Manager',
    department: 'Power Grid Development',
    organization: 'Ministry of Power, Govt. of India',
    location: 'New Delhi, India',
    joinDate: 'January 2022',
    employeeId: 'EMP-2024-001',
    clearanceLevel: 'Level 3'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsAlerts: true,
    desktopNotifications: false,
    weeklyReports: true,
    criticalAlertsOnly: false,
    dataSync: true,
    darkMode: false,
    language: 'english'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const handleInputChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const recentActivity = [
    { action: 'Generated inventory report', project: 'Delhi-NCR Grid Expansion', time: '2 hours ago' },
    { action: 'Updated material requirements', project: 'Mumbai Coastal Transmission', time: '5 hours ago' },
    { action: 'Approved purchase order PO-2024-001', project: 'Delhi-NCR Grid Expansion', time: '1 day ago' },
    { action: 'Reviewed vendor performance metrics', project: 'Rajasthan Solar Integration', time: '2 days ago' },
    { action: 'Created milestone report', project: 'Kerala Backwater Grid', time: '3 days ago' }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile & Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account information and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-3 h-3 mr-1" />
            {userInfo.clearanceLevel}
          </Badge>
          <Button variant="outline">
            <Activity className="w-4 h-4 mr-2" />
            Activity Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="glass-card lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-black text-2xl">
                  {userInfo.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-xl">{userInfo.fullName}</CardTitle>
            <p className="text-gray-600">{userInfo.designation}</p>
            <p className="text-sm text-blue-600">{userInfo.department}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Building className="w-4 h-4" />
                <span>{userInfo.organization}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{userInfo.location}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined {userInfo.joinDate}</span>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Quick Stats</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15</div>
                  <div className="text-gray-600">Active Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">127</div>
                  <div className="text-gray-600">Reports Generated</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs */}
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Personal Information */}
            <TabsContent value="personal" className="space-y-6">
              <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Personal Information</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      {isEditing ? (
                        <Input
                          value={userInfo.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.fullName}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Employee ID</label>
                      <p className="text-gray-900">{userInfo.employeeId}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      {isEditing ? (
                        <Input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.email}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      {isEditing ? (
                        <Input
                          value={userInfo.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.phone}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Designation</label>
                      {isEditing ? (
                        <Input
                          value={userInfo.designation}
                          onChange={(e) => handleInputChange('designation', e.target.value)}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.designation}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Department</label>
                      {isEditing ? (
                        <Input
                          value={userInfo.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                        />
                      ) : (
                        <p className="text-gray-900">{userInfo.department}</p>
                      )}
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Email Notifications</span>
                        </div>
                        <p className="text-sm text-gray-600">Receive email alerts for important updates</p>
                      </div>
                      <Switch 
                        checked={preferences.emailNotifications} 
                        onCheckedChange={(value) => handlePreferenceChange('emailNotifications', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">SMS Alerts</span>
                        </div>
                        <p className="text-sm text-gray-600">Get critical alerts via SMS</p>
                      </div>
                      <Switch 
                        checked={preferences.smsAlerts} 
                        onCheckedChange={(value) => handlePreferenceChange('smsAlerts', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Bell className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">Desktop Notifications</span>
                        </div>
                        <p className="text-sm text-gray-600">Show browser notifications</p>
                      </div>
                      <Switch 
                        checked={preferences.desktopNotifications} 
                        onCheckedChange={(value) => handlePreferenceChange('desktopNotifications', value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="font-medium">Weekly Reports</span>
                        <p className="text-sm text-gray-600">Receive weekly project summaries</p>
                      </div>
                      <Switch 
                        checked={preferences.weeklyReports} 
                        onCheckedChange={(value) => handlePreferenceChange('weeklyReports', value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>System Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Data Synchronization</span>
                      <p className="text-sm text-gray-600">Sync data across devices</p>
                    </div>
                    <Switch 
                      checked={preferences.dataSync} 
                      onCheckedChange={(value) => handlePreferenceChange('dataSync', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Dark Mode</span>
                      <p className="text-sm text-gray-600">Use dark theme</p>
                    </div>
                    <Switch 
                      checked={preferences.darkMode} 
                      onCheckedChange={(value) => handlePreferenceChange('darkMode', value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Lock className="w-5 h-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium">Change Password</h3>
                          <p className="text-sm text-gray-600">Update your account password</p>
                        </div>
                      </div>
                      <Button variant="outline">Change</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="w-5 h-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-600">Add extra security to your account</p>
                        </div>
                      </div>
                      <Button>Enable</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium">Login Sessions</h3>
                          <p className="text-sm text-gray-600">Manage active login sessions</p>
                        </div>
                      </div>
                      <Button variant="outline">Manage</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Activity className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.project}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}