import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Zap, Building2 } from 'lucide-react';

// Leaflet Imports
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { LatLngTuple, LatLngBoundsLiteral } from 'leaflet';

// ⚠️ IMPORTANT: Fix for default Leaflet marker icons not showing up in React apps
// This is necessary to correctly load the marker images from unpkg.
// delete (L.Icon.Default.prototype as any)._get  IconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// --- Interfaces and Data (Using Real Lat/Lon Coordinates) ---

interface StateData {
  name: string;
  projects: number;
  completed: number;
  ongoing: number;
  upcoming: number;
  // Using Lat/Lon for Leaflet
  coordinates: { lat: number; lon: number };
}

interface IndiaMapProps {
  onStateClick: (state: string) => void;
}

// NOTE: These are approximate central geographical coordinates for states in India.
const stateData: { [key: string]: StateData } = {
  'MH': { name: 'Maharashtra', projects: 8, completed: 3, ongoing: 3, upcoming: 2, coordinates: { lat: 19.75, lon: 75.71 } },
  'DL': { name: 'Delhi', projects: 5, completed: 2, ongoing: 2, upcoming: 1, coordinates: { lat: 28.70, lon: 77.10 } },
  'KA': { name: 'Karnataka', projects: 6, completed: 4, ongoing: 1, upcoming: 1, coordinates: { lat: 15.31, lon: 74.19 } },
  'KL': { name: 'Kerala', projects: 4, completed: 1, ongoing: 1, upcoming: 2, coordinates: { lat: 10.85, lon: 76.27 } },
  'TN': { name: 'Tamil Nadu', projects: 7, completed: 3, ongoing: 2, upcoming: 2, coordinates: { lat: 11.12, lon: 78.65 } },
  'RJ': { name: 'Rajasthan', projects: 9, completed: 2, ongoing: 4, upcoming: 3, coordinates: { lat: 27.02, lon: 74.21 } },
  'UP': { name: 'Uttar Pradesh', projects: 12, completed: 4, ongoing: 5, upcoming: 3, coordinates: { lat: 26.84, lon: 80.94 } },
  'WB': { name: 'West Bengal', projects: 6, completed: 2, ongoing: 2, upcoming: 2, coordinates: { lat: 22.98, lon: 87.85 } },
  'GJ': { name: 'Gujarat', projects: 8, completed: 3, ongoing: 3, upcoming: 2, coordinates: { lat: 22.25, lon: 71.19 } },
  'AP': { name: 'Andhra Pradesh', projects: 5, completed: 2, ongoing: 2, upcoming: 1, coordinates: { lat: 15.91, lon: 80.77 } },
  'MP': { name: 'Madhya Pradesh', projects: 7, completed: 2, ongoing: 3, upcoming: 2, coordinates: { lat: 22.97, lon: 78.65 } },
  'OR': { name: 'Odisha', projects: 4, completed: 1, ongoing: 2, upcoming: 1, coordinates: { lat: 20.95, lon: 85.52 } },
  'PB': { name: 'Punjab', projects: 4, completed: 2, ongoing: 1, upcoming: 1, coordinates: { lat: 31.14, lon: 75.34 } },
  'HR': { name: 'Haryana', projects: 3, completed: 1, ongoing: 1, upcoming: 1, coordinates: { lat: 29.05, lon: 76.08 } },
  'JH': { name: 'Jharkhand', projects: 3, completed: 1, ongoing: 1, upcoming: 1, coordinates: { lat: 23.61, lon: 85.27 } },
  'AS': { name: 'Assam', projects: 3, completed: 1, ongoing: 1, upcoming: 1, coordinates: { lat: 26.20, lon: 92.93 } },
  'BR': { name: 'Bihar', projects: 4, completed: 1, ongoing: 2, upcoming: 1, coordinates: { lat: 25.09, lon: 85.31 } },
  'CG': { name: 'Chhattisgarh', projects: 3, completed: 1, ongoing: 1, upcoming: 1, coordinates: { lat: 21.27, lon: 81.86 } },
  'UK': { name: 'Uttarakhand', projects: 2, completed: 1, ongoing: 1, upcoming: 0, coordinates: { lat: 30.06, lon: 79.01 } },
  'HP': { name: 'Himachal Pradesh', projects: 2, completed: 1, ongoing: 1, upcoming: 0, coordinates: { lat: 31.10, lon: 77.17 } }
};

// --- Custom Marker Component ---

const StateMarker = ({ stateCode, state, onStateClick }: { stateCode: string, state: StateData, onStateClick: (state: string) => void }) => {
  // Determine color and radius based on project intensity
  const getProjectColor = (projects: number) => {
    if (projects >= 10) return '#1d4ed8'; // blue-700
    if (projects >= 7) return '#2563eb'; // blue-600
    if (projects >= 4) return '#3b82f6'; // blue-500
    return '#93c5fd'; // blue-300
  };

  const color = getProjectColor(state.projects);
  // Scale radius based on the number of projects (min radius of 10 for visibility)
  const radius = Math.max(10, state.projects * 1.5);

  // Custom HTML Icon for the state code label overlay
  const labelIcon = L.divIcon({
    className: 'project-label-icon bg-transparent flex items-center justify-center',
    html: `<div style="color: white; font-weight: 600; font-size: 10px; line-height: 1; pointer-events: none;">${stateCode}</div>`,
    iconSize: [radius * 2, radius * 2],
    iconAnchor: [radius, radius]
  });

  return (
    <CircleMarker
      center={[state.coordinates.lat, state.coordinates.lon]}
      pathOptions={{ color: color, fillColor: color, fillOpacity: 0.8, weight: 2 }}
      radius={radius}
      eventHandlers={{
        click: () => onStateClick(state.name),
      }}
    >
      {/* Overlay Marker for the State Code label inside the circle */}
      <Marker 
        position={[state.coordinates.lat, state.coordinates.lon]}
        icon={labelIcon}
        zIndexOffset={100} // Ensure the label is on top of the circle
      />

      {/* Popup Content for detailed stats */}
      <Popup>
        <div className="p-1 space-y-2">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">{state.name}</h3>
            <Badge variant="default" style={{ backgroundColor: color }}>
              {state.projects} projects
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="text-green-600 font-bold">{state.completed}</div>
              <div className="text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-bold">{state.ongoing}</div>
              <div className="text-gray-500">Ongoing</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 font-bold">{state.upcoming}</div>
              <div className="text-gray-500">Upcoming</div>
            </div>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};


// --- Main Component ---

export function IndiaMap({ onStateClick }: IndiaMapProps) {
  // Center of India and bounds to restrict map movement
  const indiaCenter: LatLngTuple = useMemo(() => [22.0, 78.0], []);
  const indiaBounds: LatLngBoundsLiteral = useMemo(() => [[8.0, 68.0], [37.0, 98.0]], []);

  // Calculate total statistics
  const totalProjects = Object.values(stateData).reduce((sum, state) => sum + state.projects, 0);
  const statesCovered = Object.keys(stateData).length;

  return (
    <Card className="glass-card h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          <span>Project Distribution Map</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col">
        {/* Leaflet Map Container */}
        <div className="w-full flex-grow mb-4">
          <MapContainer 
            center={indiaCenter} 
            zoom={5} 
            scrollWheelZoom={true}
            className="w-full h-full border border-gray-200 rounded-lg shadow-inner"
            maxBounds={indiaBounds} // Confine map panning
            minZoom={4} // Prevent zooming too far out
            style={{ height: '400px' }} // Essential for Leaflet to render
          >
            {/* Base Map Tiles (OpenStreetMap) */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* State Markers */}
            {Object.entries(stateData).map(([stateCode, state]) => (
              <StateMarker 
                key={stateCode} 
                stateCode={stateCode} 
                state={state} 
                onStateClick={onStateClick} 
              />
            ))}
          </MapContainer>
        </div>

        {/* --- */}

        {/* Legend */}
        <div className="space-y-3 w-full mt-2">
          <h4 className="text-sm font-medium text-gray-700">Project Intensity</h4>
          <div className="flex items-center space-x-4 text-xs flex-wrap">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#93c5fd' }}></div>
              <span className="text-gray-600">1-3 projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
              <span className="text-gray-600">4-6 projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#2563eb' }}></div>
              <span className="text-gray-600">7-9 projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#1d4ed8' }}></div>
              <span className="text-gray-600">10+ projects</span>
            </div>
          </div>
        </div>
        
        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Zap className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Total Projects</p>
              <p className="text-lg font-bold text-blue-700">{totalProjects}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Building2 className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">States Covered</p>
              <p className="text-lg font-bold text-green-700">{statesCovered}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}