import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  BarChart3,
  Package,
  ShoppingCart,
  FileText,
  Bell,
  User,
  Home,
  Zap,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  selectedProject: any;
  onLogout: () => void;
}

const navigationItems = [
  { id: "dashboard", icon: Home, label: "Dashboard", global: true },
  { id: "analytics", icon: BarChart3, label: "Analytics", project: true },
  { id: "inventory", icon: Package, label: "Inventory", project: true },
  { id: "reports", icon: FileText, label: "Reports", project: true },
  { id: "notifications", icon: Bell, label: "Notifications", badge: 5 },
  { id: "profile", icon: User, label: "Profile", global: true },
];

export function Sidebar({
  currentPage,
  onNavigate,
  selectedProject,
  onLogout,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const userData = localStorage.getItem("gridAuraUser");
    if (userData) {
      try {
        const parsed = JSON.parse(userData) as { fullName?: string; email?: string };
        setUserName(parsed.fullName || "");
        setUserEmail(parsed.email || "");
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  const userInitials = userName
    ? userName
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "GD"; // GridAura Default

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`glass-panel border-r border-gray-200 smooth-transition hidden md:flex flex-col h-screen fixed top-0 left-0 z-30 bg-white/80 backdrop-blur-lg ${
          collapsed ? "w-16" : "w-72"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-600 rounded-lg">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h1 className="font-bold text-lg text-gray-900">
                      Grid<span className="text-blue-600 text-md">Aura</span>
                    </h1>
                    <p className="text-xs text-gray-500">
                      PowerGrid Management
                    </p>
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="p-2"
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Project Context */}
            {!collapsed && selectedProject && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 truncate">
                      {selectedProject.name}
                    </p>
                    <p className="text-xs text-blue-600">
                      {selectedProject.state} • {selectedProject.status}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const showItem =
                item.global ||
                (item.project && selectedProject) ||
                (!item.global && !item.project);

              if (!showItem) return null;

              const alwaysWhite = ["dashboard", "notifications", "profile", "analytics", "inventory", "reports"].includes(item.id);
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start p-3 ${
                    isActive
                      ? alwaysWhite
                        ? "bg-gray-200 text-gray-700 shadow-sm"
                        : "bg-blue-600 text-white shadow-sm"
                      : alwaysWhite
                        ? "text-white hover:bg-gray-100"
                        : "text-gray-700 hover:bg-gray-100"
                  } smooth-transition`}
                  onClick={() => onNavigate(item.id)}
                >
                  <Icon
                    className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"} ${alwaysWhite ? (isActive ? 'text-gray-700' : 'text-white') : (isActive ? 'text-white' : '')}`}
                  />
                  {!collapsed && (
                    <>
                      <span className={`flex-1 text-left ${alwaysWhite ? (isActive ? 'text-gray-700 font-semibold' : 'text-white') : (isActive ? 'text-white font-semibold' : '')}`}>{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant="destructive"
                          className={`h-5 w-5 p-0 flex items-center justify-center text-xs ${alwaysWhite ? (isActive ? 'text-gray-700' : 'text-white') : (isActive ? 'text-white' : '')}`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            {!collapsed && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-black text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">{userName || "User"}</p>
                  <p className="text-xs text-black truncate">{userEmail || ""}</p>
                </div>
              </div>
            )}

            <Button
              variant="ghost"
              className={`$
                collapsed ? "w-full p-2" : "w-full justify-start p-3"
              } text-white bg-blue-600 hover:text-blue-100 hover:bg-blue-700`}
              onClick={onLogout}
            >
              <LogOut className={`${collapsed ? "w-5 h-5" : "w-5 h-5 mr-3"} text-white`} />
              {!collapsed && "Sign Out"}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 border-t border-gray-200 flex justify-between px-2 py-1 shadow-lg">
        {navigationItems
          .filter((item) => item.global || item.project)
          .map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                className={`flex-1 flex flex-col items-center justify-center py-1 ${
                  isActive ? "text-white bg-blue-600" : "text-gray-500"
                } focus:outline-none`}
                onClick={() => onNavigate(item.id)}
              >
                <Icon className={`w-6 h-6 mb-0.5 ${isActive ? 'text-white' : ''}`} />
                <span className={`text-xs leading-none ${isActive ? 'text-white font-semibold' : ''}`}>{item.label}</span>
              </button>
            );
          })}
        <button
          className="flex-1 flex flex-col items-center justify-center py-1 text-white bg-blue-600 focus:outline-none"
          onClick={onLogout}
        >
          <LogOut className="w-6 h-6 mb-0.5 text-white" />
          <span className="text-xs leading-none text-white">Sign Out</span>
        </button>
      </div>
    </>
  );
}
