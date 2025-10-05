import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Lock, 
  Moon, 
  Sun, 
  LogOut,
  Edit3,
  Shield,
  Bell,
  Smartphone
} from 'lucide-react';

interface ProfileProps {
  onNavigate: (screen: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@supplai.com',
    role: 'Project Manager'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  const handleLogout = () => {
    onNavigate('login');
  };

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
          <h1 className="text-xl font-bold text-gray-900">Profile & Settings  </h1>
          <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile Info */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            Profile Information
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsEditing(!isEditing)}
              className="p-2"
            >
              <Edit3 className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-green-600 text-black text-xl">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    className="bg-white/80"
                  />
                  <Input
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    className="bg-white/80"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-lg">{userInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                  <p className="text-sm text-blue-600">{userInfo.role}</p>
                </div>
              )}
            </div>
          </div>
          
          {isEditing && (
            <div className="flex space-x-2 pt-2">
              <Button size="sm" onClick={handleSave}>Save Changes</Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-muted-foreground">Update your account password</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add extra security to your account</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-5 h-5 text-muted-foreground" /> : <Sun className="w-5 h-5 text-muted-foreground" />}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive alerts and updates</p>
              </div>
            </div>
            <Switch 
              checked={notifications} 
              onCheckedChange={setNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Mobile Sync</p>
                <p className="text-sm text-muted-foreground">Sync data across devices</p>
              </div>
            </div>
            <Switch defaultChecked={true} />
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20">
        <CardHeader>
          <CardTitle>About Supplai</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Version</span>
            <span className="text-sm text-muted-foreground">2.1.0</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Build</span>
            <span className="text-sm text-muted-foreground">2024.01.25</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm">AI Model</span>
            <span className="text-sm text-muted-foreground">Forecast v3.2</span>
          </div>

          <Separator />

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Terms of Service
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              Help & Support
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card className="backdrop-blur-sm bg-white/70 border border-white/20 border-l-4 border-l-red-500">
        <CardContent className="p-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}