import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Menu, Clock, BriefcaseBusiness, User, Settings, LogOut } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import JoinWaitlistForm from "@/components/JoinWaitlistForm";

const NavBar = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/signin");
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!currentUser || !currentUser.displayName) return "SQ";
    return currentUser.displayName
      .split(" ")
      .map(name => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (!isMounted) return null;

  return (
    <div className={`sticky top-0 z-30 w-full transition-all duration-300 ${
      isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background"
    }`}>
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {isMobile && (
          <SidebarTrigger>
            <Button variant="ghost" size="icon">
              <Menu size={20} />
            </Button>
          </SidebarTrigger>
        )}
        
        {!isMobile && (
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SQ</span>
              </div>
              <span className="font-semibold text-lg">SkipQ</span>
            </Link>
            
            <div className="hidden md:flex space-x-1 ml-6">
              <Button variant="ghost" asChild className="text-sm font-medium">
                <Link to="/browse">Find a Q Agent</Link>
              </Button>
              <Button variant="ghost" asChild className="text-sm font-medium">
                <Link to="/requests">My Requests</Link>
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          {/* Join Waitlist Button - always visible */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="font-semibold">
                Join Waitlist
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <JoinWaitlistForm />
            </DialogContent>
          </Dialog>
          {currentUser && (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </Button>
              
              <div className="hidden sm:flex">
                <Button variant="outline" size="sm" asChild className="gap-2 rounded-l-full rounded-r-none border-r-0">
                  <Link to="/new-request">
                    <Clock className="h-4 w-4" />
                    <span className="hidden md:inline">Request</span>
                  </Link>
                </Button>
                
                <Button variant="default" size="sm" asChild className="gap-2 rounded-r-full rounded-l-none">
                  <Link to="/find-jobs">
                    <BriefcaseBusiness className="h-4 w-4" />
                    <span className="hidden md:inline">Find Jobs</span>
                  </Link>
                </Button>
              </div>
            </>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 transition-transform hover:scale-105 cursor-pointer">
                <AvatarImage src={currentUser?.photoURL || ""} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {currentUser ? (
                <>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/signin" className="cursor-pointer">Sign in</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup" className="cursor-pointer">Create account</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
