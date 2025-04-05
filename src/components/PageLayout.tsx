
import { NavigationBar } from "./NavigationBar";
import { Footer } from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
  hideFooter?: boolean;
}

export function PageLayout({ 
  children, 
  hideNavigation = false, 
  hideFooter = false 
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavigation && <NavigationBar />}
      <main className="flex-grow">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
}
