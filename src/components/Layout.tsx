
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Sidebar from "./Sidebar";
import NavBar from "./NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const location = useLocation();

  // Mount animation
  useEffect(() => {
    setIsMounted(true);

    // Reset scroll position on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="relative min-h-screen flex w-full bg-background">
          <Sidebar />
          <div 
            className={`flex-1 flex flex-col min-h-screen transition-all duration-500 ease-out ${
              isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <NavBar />
            <main className="flex-1 px-4 md:px-6 lg:px-8 py-6">
              {children}
            </main>
            <footer className="py-4 px-6 border-t border-border/40 bg-muted/30 backdrop-blur-sm">
              <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                  © {new Date().getFullYear()} SkipQ. All rights reserved.
                </p>
                <div className="flex items-center space-x-6">
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Terms
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Support
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

export default Layout;
