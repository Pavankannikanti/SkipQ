import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="w-full py-6 px-4 bg-background border-t border-border text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2 mt-10">
    <div className="flex items-center gap-2">
      <span>&copy; {new Date().getFullYear()} SkipQ</span>
      <span className="hidden sm:inline">|</span>
      <span>All rights reserved.</span>
    </div>
    <div className="flex items-center gap-4">
      <Link to="/terms" className="hover:underline">Terms of Use</Link>
      <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
    </div>
  </footer>
);

export default Footer;
