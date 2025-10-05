import { ImageWithFallback } from './figma/ImageWithFallback';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1554735231-7cf7be4c7126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3dlciUyMGdyaWQlMjBlbGVjdHJpY2FsJTIwbGluZXMlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NTkzODYzMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Power Grid Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Abstract Grid Pattern Overlay */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="z-10 text-center space-y-8 px-8">
        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white tracking-wider">
            Supplai
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Tagline */}
        <p className="text-xl text-blue-100 max-w-sm mx-auto leading-relaxed">
          Smart Forecasting for Smarter Grids
        </p>

        {/* Loading Animation */}
        <div className="space-y-4 mt-12">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <button 
            onClick={onComplete}
            className="text-blue-200 hover:text-white transition-colors underline"
          >
            Skip
          </button>
        </div>
      </div>

      {/* Auto advance after 3 seconds */}
      <div className="absolute bottom-0 left-0 right-0">
        <div 
          className="h-1 bg-gradient-to-r from-green-400 to-blue-400 transition-all duration-3000 ease-out"
          style={{ width: '100%', animation: 'loading 3s ease-out forwards' }}
          onAnimationEnd={onComplete}
        ></div>
      </div>

      <style jsx>{`
        @keyframes loading {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}