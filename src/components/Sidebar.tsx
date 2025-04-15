
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarTrigger,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home,
  Search,
  Clock,
  User,
  LogIn,
  MapPin,
  PlusCircle,
  Menu,
  Settings,
  BriefcaseBusiness,
  Star,
  CreditCard,
  HelpCircle,
  Bookmark,
  LogOut,
  UserPlus
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isMounted, setIsMounted] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  if (!isMounted) return null;

  const isActive = (path: string) => location.pathname === path;

  const mainLinks = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Search, label: "Find a Q Agent", path: "/browse" },
    { icon: Clock, label: "My Requests", path: "/requests" },
    { icon: BriefcaseBusiness, label: "Available Jobs", path: "/find-jobs" },
    { icon: Bookmark, label: "Favorites", path: "/favorites" },
  ];

  const secondaryLinks = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: CreditCard, label: "Payment", path: "/payment" },
    { icon: MapPin, label: "Locations", path: "/locations" },
    { icon: HelpCircle, label: "Help", path: "/help" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <SidebarComponent className="border-r border-border/50">
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-border/50">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">SQ</span>
          </div>
          <span className="font-semibold text-lg">SkipQ</span>
        </Link>
        {isMobile && (
          <SidebarTrigger className="ml-auto">
            <Button variant="ghost" size="icon">
              <Menu size={20} />
            </Button>
          </SidebarTrigger>
        )}
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainLinks.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton asChild isActive={isActive(link.path)}>
                    <Link to={link.path} className="flex items-center space-x-3 py-1.5">
                      <link.icon size={20} />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="my-4 mx-4 h-px bg-border/50" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryLinks.map((link) => (
                <SidebarMenuItem key={link.path}>
                  <SidebarMenuButton asChild isActive={isActive(link.path)}>
                    <Link to={link.path} className="flex items-center space-x-3 py-1.5">
                      <link.icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {currentUser && (
          <div className="mt-4 px-4">
            <Button asChild className="w-full justify-center gap-2" size="lg">
              <Link to="/new-request">
                <PlusCircle size={18} />
                <span>New Request</span>
              </Link>
            </Button>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <div className="flex flex-col space-y-2">
          {currentUser ? (
            <Button onClick={handleSignOut} className="justify-start w-full" variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          ) : (
            <>
              <Button asChild className="justify-start w-full" variant="default">
                <Link to="/signin">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button asChild className="justify-start w-full" variant="outline">
                <Link to="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Link>
              </Button>
            </>
          )}
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
