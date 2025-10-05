import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Zap, Shield, BarChart3, Globe } from 'lucide-react';

interface DesktopLoginProps {
  onLogin: () => void;
}

export function DesktopLogin({ onLogin }: DesktopLoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    organization: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="split-screen">
        {/* Left Panel - Illustration */}
        <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-8 lg:p-12">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-20">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1618071132025-e99a03b6320f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMHRyYW5zbWlzc2lvbiUyMHRvd2VycyUyMGVsZWN0cmljYWwlMjBncmlkJTIwSW5kaWF8ZW58MXx8fHwxNzU5NDc2Mjk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Power Grid Infrastructure"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white space-y-8 max-w-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold">Supply AI</h1>
              </div>
              
              <h2 className="text-2xl font-semibold">
                Intelligent PowerGrid Management
              </h2>
              
              <p className="text-xl text-blue-100 leading-relaxed">
                Advanced forecasting and inventory optimization for India's power infrastructure projects
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 mt-8">
              <div className="glass-panel p-4 text-left">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-5 h-5 text-blue-200" />
                  <div>
                    <h3 className="font-medium">AI-Powered Forecasting</h3>
                    <p className="text-sm text-blue-200">Predict material needs with 98% accuracy</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-4 text-left">
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-blue-200" />
                  <div>
                    <h3 className="font-medium">National Grid Coverage</h3>
                    <p className="text-sm text-blue-200">Manage projects across all Indian states</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-panel p-4 text-left">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-blue-200" />
                  <div>
                    <h3 className="font-medium">Government Grade Security</h3>
                    <p className="text-sm text-blue-200">Enterprise-level data protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-900">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {isSignUp 
                  ? 'Join the future of power grid management' 
                  : 'Sign in to your Supply AI dashboard'
                }
              </p>
            </div>

            {/* Form Card */}
            <Card className="glass-card shadow-lg">
              <CardContent className="p-8 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="bg-white/80 border-gray-200"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Organization</label>
                        <Input
                          type="text"
                          placeholder="Enter your organization"
                          value={formData.organization}
                          onChange={(e) => handleInputChange('organization', e.target.value)}
                          className="bg-white/80 border-gray-200"
                        />
                      </div>
                    </>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-white/80 border-gray-200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Password</label>
                    <Input
                      type="password"
                      placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="bg-white/80 border-gray-200"
                      required
                    />
                  </div>

                  {isSignUp && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="bg-white/80 border-gray-200"
                        required
                      />
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                    size="lg"
                  >
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                    or
                  </span>
                </div>

                {/* Alternative Actions */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full bg-white/50 border-gray-200"
                    onClick={onLogin}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-sm text-blue-600 hover:text-blue-700 hover:underline smooth-transition"
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign in' 
                        : 'Need an account? Sign up'
                      }
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <p className="text-center text-xs text-gray-500">
              Powered by AI • Government of India Initiative
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}