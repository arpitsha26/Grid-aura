import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

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

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
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

export function ProjectSelector({ selectedProject, onSelectProject }: ProjectSelectorProps) {
  const projects = mockProjects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-gray-100 text-gray-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Active Projects</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="p-2">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" className="p-2">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`min-w-[320px] cursor-pointer smooth-transition hover:shadow-md ${
                selectedProject?.id === project.id
                  ? 'ring-2 ring-blue-500 bg-blue-50'
                  : 'glass-card hover:bg-white'
              }`}
              onClick={() => onSelectProject(project)}
            >
              <CardContent className="p-5">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 leading-tight">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{project.state}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(project.priority)}`}></div>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{project.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          project.completion >= 80 ? 'bg-green-500' :
                          project.completion >= 50 ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${project.completion}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Deadline</p>
                        <p className="font-medium text-gray-900">{project.deadline}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-gray-500">Team Size</p>
                        <p className="font-medium text-gray-900">{project.team}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Indicator */}
                  {selectedProject?.id === project.id && (
                    <div className="flex items-center justify-center pt-2">
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">Active Project</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}