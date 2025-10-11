import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  MapPin,
  ChevronLeft,
  ChevronRight,
  Package,
  Layers,
} from 'lucide-react';

// ----------- TYPES -------------
interface Project {
  _id: string;
  name: string;
  location: string;
  budget: number;
  startDate: string;
  endDate: string;
  status: string;
  assets?: any[];
  materials?: any[];
}

interface ProjectSelectorProps {
  onNavigateToMaterialDetails?: (project: Project) => void;
}

export function ProjectSelector({ onNavigateToMaterialDetails }: ProjectSelectorProps = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://grid-aura.onrender.com/api/project');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Navigate to material details page
  const handleSelectProject = async (project: Project) => {
    if (onNavigateToMaterialDetails) {
      // Navigate directly to material details page
      onNavigateToMaterialDetails(project);
    } else {
      // Fallback to original behavior - show details in dashboard
      setDetailsLoading(true);
      setSelectedProject(null);

      try {
        const res = await fetch(
          `https://grid-aura.onrender.com/api/project/${project._id}`
        );
        if (!res.ok) throw new Error('Failed to fetch project details');
        const data = await res.json();
        setSelectedProject(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setDetailsLoading(false);
      }
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      {/* PROJECT LIST */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
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
                key={project._id}
                className={`min-w-[300px] cursor-pointer smooth-transition hover:shadow-md ${
                  selectedProject?._id === project._id
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'hover:bg-white'
                }`}
                onClick={() => handleSelectProject(project)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <span className="text-sm font-medium text-gray-700">
                      ₹{project.budget.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* PROJECT DETAILS */}
      {detailsLoading && (
        <p className="text-center text-gray-500">Loading project details...</p>
      )}

      {selectedProject && !detailsLoading && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{selectedProject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                <strong>Location:</strong> {selectedProject.location}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <Badge className={getStatusColor(selectedProject.status)}>
                  {selectedProject.status}
                </Badge>
              </p>
              <p>
                <strong>Budget:</strong> ₹
                {selectedProject.budget.toLocaleString()}
              </p>
              <p>
                <strong>Start Date:</strong>{' '}
                {new Date(selectedProject.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{' '}
                {new Date(selectedProject.endDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* ASSETS */}
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <CardTitle>Assets</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProject.assets && selectedProject.assets.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {selectedProject.assets.map((asset: any, i: number) => (
                    <li key={i}>{asset.name || 'Unnamed Asset'}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No assets found.</p>
              )}
            </CardContent>
          </Card>

          {/* MATERIALS */}
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              <Package className="w-4 h-4 text-green-500" />
              <CardTitle>Materials</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedProject.materials && selectedProject.materials.length > 0 ? (
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {selectedProject.materials.map((mat: any, i: number) => (
                    <li key={i}>{mat.name || 'Unnamed Material'}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">No materials found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}