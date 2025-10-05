import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Zap, MapPin, Zap as Tower } from "lucide-react";

interface GridAuraAuthProps {
  onLogin: () => void;
}

export function GridAuraAuth({ onLogin }: GridAuraAuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
  <div className="min-h-screen min-w-screen bg-white flex flex-col lg:flex-row">
      {/* Left Panel - Illustration */}
      <div
        className={`relative bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700 flex items-center justify-center w-full lg:w-1/2 py-16 px-4 sm:p-8 lg:p-12 transition-all duration-500 ${
          isSignUp ? "animate-slide-from-right" : "animate-slide-from-left"
        }`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* India Map Outline */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 400 500" className="w-full h-full">
              {/* Simplified India outline */}
              <path
                d="M150 80 C 180 70, 220 80, 250 90 L 270 110 C 280 130, 290 150, 300 170 L 320 200 C 330 230, 340 260, 335 290 L 330 320 C 325 350, 315 380, 300 400 L 280 420 C 250 440, 220 450, 190 445 L 160 440 C 130 435, 110 425, 100 405 L 95 385 C 90 365, 95 345, 105 325 L 115 305 C 125 285, 135 265, 140 245 L 145 225 C 148 205, 150 185, 150 165 Z"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Transmission Towers */}
          <div className="absolute top-1/4 left-1/4">
            <Tower className="w-8 h-8 text-white/30 animate-pulse" />
          </div>
          <div className="absolute top-1/2 right-1/3">
            <Tower className="w-6 h-6 text-white/20 animate-pulse delay-1000" />
          </div>
          <div className="absolute bottom-1/3 left-1/2">
            <Tower className="w-7 h-7 text-white/25 animate-pulse delay-500" />
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 h-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="border-l border-white/20"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
  <div className="relative z-10 text-center text-white space-y-6 mx-auto px-4 sm:px-0 w-full max-w-lg">
          <div
            className={`space-y-4 transition-all duration-500 ${
              isSignUp ? "animate-slide-from-left" : "animate-slide-from-right"
            }`}
          >
            <div className="flex items-center justify-center space-x-3 mb-6 sm:mb-8">
              <div className="p-2 sm:p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold">
                Grid<span className="text-blue-200">Aura</span>
              </h1>
            </div>

            <h2 className="text-xl sm:text-2xl font-medium">
              {isSignUp ? "Join the Grid Revolution" : "Welcome to GridAura"}
            </h2>

            <p className="text-base sm:text-xl text-blue-100 leading-relaxed">
              {isSignUp
                ? "Advanced forecasting and procurement for India's power infrastructure"
                : "Forecast. Procure. Power the Grid."}
            </p>
          </div>

          {/* Toggle Button */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <Button
              variant="outline"
              onClick={toggleMode}
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all duration-300"
            >
              {isSignUp
                ? "Already have an account? Sign In"
                : "Need an account? Sign Up"}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          <Card
            className={`glass-card shadow-xl flex-1 w-full transition-all duration-500 ${
              isSignUp ? "animate-slide-from-right" : "animate-slide-from-left"
            }`}
          >
            <CardContent className="p-4 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {isSignUp ? "Create Account" : "Sign In"}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {isSignUp
                    ? "Start managing power grid projects"
                    : "Access your GridAura dashboard"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {isSignUp && (
                  <div className="animate-slide-from-right">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="h-10 sm:h-12 bg-white/80 border-gray-200 rounded-lg text-black"
                      required
                    />
                  </div>
                )}

                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-10 sm:h-12 bg-white/80 border-gray-200 rounded-lg text-black"
                    required
                  />
                </div>

                <div>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="h-10 sm:h-12 bg-white/80 border-gray-200 rounded-lg text-black"
                    required
                  />
                </div>

                {isSignUp && (
                  <div className="animate-slide-from-right">
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="h-10 sm:h-12 bg-white/80 border-gray-200 rounded-lg text-black"
                      required
                    />
                  </div>
                )}

                  <Button
                    type="submit"
                    className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    size="lg"
                  >
                  {isSignUp ? "Create Account" : "Sign In"}
                </Button>
              </form>

              {/* Footer */}
              <div className="text-center mt-6">
                <p className="text-xs text-gray-500">
                  Powered by AI • Government of India Initiative
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
