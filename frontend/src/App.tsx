import { useEffect, useState } from 'react';
import { GridAuraSplashScreen } from './components/GridAuraSplashScreen';
import { GridAuraAuth } from './components/GridAuraAuth';
import { Sidebar } from './components/Sidebar';
import { GridAuraDashboard } from './components/GridAuraDashboard';
import { ProjectAnalytics } from './components/ProjectAnalytics';
import { ProjectInventory } from './components/ProjectInventory';
import { ProjectReports } from './components/ProjectReports';
import { ProjectNotifications } from './components/ProjectNotifications';
import { DesktopProfile } from './components/DesktopProfile';
import 'leaflet/dist/leaflet.css';

type Page = 'splash' | 'login' | 'dashboard' | 'analytics' | 'inventory' | 'reports' | 'notifications' | 'profile';

interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
}

interface Project {
  id: string;
  name: string;
  state: string;
  status: 'ongoing' | 'completed' | 'upcoming' | 'delayed';
  completion: number;
  deadline: string;
  team: number;
  priority: 'high' | 'medium' | 'low';
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Delhi-NCR Grid Expansion',
    state: 'Delhi',
    status: 'ongoing',
    completion: 75,
    deadline: '2024-06-15',
    team: 45,
    priority: 'high'
  },
  {
    id: '2', 
    name: 'Mumbai Coastal Transmission',
    state: 'Maharashtra',
    status: 'ongoing',
    completion: 60,
    deadline: '2024-08-20',
    team: 32,
    priority: 'high'
  },
  {
    id: '3',
    name: 'Kerala Backwater Grid',
    state: 'Kerala',
    status: 'upcoming',
    completion: 0,
    deadline: '2024-12-10',
    team: 28,
    priority: 'medium'
  },
  {
    id: '4',
    name: 'Rajasthan Solar Integration',
    state: 'Rajasthan',
    status: 'ongoing',
    completion: 85,
    deadline: '2024-04-30',
    team: 52,
    priority: 'high'
  },
  {
    id: '5',
    name: 'Bengal Rural Electrification',
    state: 'West Bengal',
    status: 'delayed',
    completion: 40,
    deadline: '2024-07-15',
    team: 38,
    priority: 'medium'
  },
  {
    id: '6',
    name: 'Karnataka Tech Corridor',
    state: 'Karnataka',
    status: 'completed',
    completion: 100,
    deadline: '2024-02-28',
    team: 41,
    priority: 'low'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Restore auth from storage on first load
  useEffect(() => {
    const token = localStorage.getItem('gridAuraToken');
    const userData = localStorage.getItem('gridAuraUser');
    if (token && userData) {
      try {
        const parsed: User = JSON.parse(userData);
        setUser(parsed);
      } catch {
        // If parsing fails, clear invalid data
        localStorage.removeItem('gridAuraUser');
      }
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    } else if (currentPage === 'splash') {
      // If no auth, proceed to login after splash completes via handler
    }
  }, []);

  const handleSplashComplete = () => {
    setCurrentPage('login');
  };

  const handleLogin = () => {
    // On successful auth, details are stored by GridAuraAuth
    const userData = localStorage.getItem('gridAuraUser');
    if (userData) {
      try {
        const parsed: User = JSON.parse(userData);
        setUser(parsed);
      } catch {
        // ignore parse error, rely on token only
      }
    }
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setSelectedProject(null);
    setCurrentPage('login');
    // Clear persisted auth
    localStorage.removeItem('gridAuraToken');
    localStorage.removeItem('gridAuraUser');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    // Auto-navigate to analytics when a project is selected (unless already on dashboard or profile)
    if (currentPage !== 'dashboard' && currentPage !== 'profile') {
      setCurrentPage('analytics');
    }
  };

  // Render splash screen first
  if (currentPage === 'splash') {
    return <GridAuraSplashScreen onComplete={handleSplashComplete} />;
  }

  // Render login page if not logged in
  if (!isLoggedIn) {
    return <GridAuraAuth onLogin={handleLogin} />;
  }

  // Main desktop layout with sidebar
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col md:flex-row">
      {/* Sidebar: hidden on mobile, visible on md+ */}
      <Sidebar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        selectedProject={selectedProject}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto w-full md:ml-72">
        <div className="max-w-full md:max-w-7xl mx-auto p-2 sm:p-4 md:p-8">
          {currentPage === 'dashboard' && (
            <GridAuraDashboard 
              onSelectProject={handleSelectProject}
              selectedProject={selectedProject}
            />
          )}
          {currentPage === 'analytics' && (
            <ProjectAnalytics project={selectedProject} />
          )}
          {currentPage === 'inventory' && (
            <ProjectInventory project={selectedProject} />
          )}
          {currentPage === 'reports' && (
            <ProjectReports project={selectedProject} />
          )}
          {currentPage === 'notifications' && (
            <ProjectNotifications project={selectedProject} />
          )}
          {currentPage === 'profile' && (
            <DesktopProfile onNavigate={handleNavigate} />
          )}
        </div>
      </div>
    </div>
  );
}
