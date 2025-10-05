import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

interface GridAuraSplashScreenProps {
  onComplete: () => void;
}

export function GridAuraSplashScreen({ onComplete }: GridAuraSplashScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowLogo(true), 300);
    const timer2 = setTimeout(() => setShowName(true), 800);
    const timer3 = setTimeout(() => setShowTagline(true), 1300);
    const timer4 = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-l border-white/20"></div>
            ))}
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white">
        {/* Logo */}
        <div className={`transition-all duration-600 ${
          showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Brand Name */}
        <div className={`transition-all duration-600 delay-200 ${
          showName ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <h1 className="text-5xl font-bold mb-2 tracking-tight">
            Grid<span className="text-blue-200">Aura</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transition-all duration-500 delay-400 ${
          showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <p className="text-xl text-blue-100 font-light tracking-wide">
            Forecast. Procure. Power the Grid.
          </p>
        </div>

        {/* Subtle loading indicator */}
        <div className={`mt-12 transition-all duration-500 delay-600 ${
          showTagline ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-200"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}