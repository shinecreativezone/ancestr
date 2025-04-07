import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
export function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-warmth-500 to-memory-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="font-serif font-bold text-xl text-gray-900">Ancestr.</span>
        </Link>
        
        {isMobile ? <button onClick={toggleMenu} className="text-gray-700">
            {isMenuOpen ? <X /> : <Menu />}
          </button> : <nav className="flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-3">
              <Link to="/avatar-type">
                <Button variant="outline" className="font-medium">Try Demo</Button>
              </Link>
              <Link to="/waitlist">
                <Button className="btn-gradient">Join Waitlist</Button>
              </Link>
            </div>
          </nav>}
      </div>
      
      {/* Mobile menu */}
      {isMobile && isMenuOpen && <div className="fixed inset-0 top-16 bg-white z-40 animate-fade-in">
          <nav className="container flex flex-col py-8 space-y-6">
            <NavLinks mobile />
            <div className="flex flex-col space-y-3 pt-4">
              <Link to="/avatar-type" onClick={toggleMenu}>
                <Button variant="outline" className="w-full">Try Demo</Button>
              </Link>
              <Link to="/waitlist" onClick={toggleMenu}>
                <Button className="w-full btn-gradient">Join Waitlist</Button>
              </Link>
            </div>
          </nav>
        </div>}
    </header>;
}
function NavLinks({
  mobile = false
}: {
  mobile?: boolean;
}) {
  const baseClasses = "font-medium transition-colors";
  const mobileClasses = "text-lg py-2 border-b border-gray-100";
  const desktopClasses = "text-gray-600 hover:text-gray-900";
  const links = [{
    path: "/how-it-works",
    label: "How It Works"
  }, {
    path: "/pricing",
    label: "Pricing"
  }, {
    path: "/about",
    label: "About"
  }, {
    path: "/faq",
    label: "FAQ"
  }];
  return <>
      {links.map(link => <Link key={link.path} to={link.path} className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}>
          {link.label}
        </Link>)}
    </>;
}