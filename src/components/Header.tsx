
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [openResources, setOpenResources] = useState(false);
  const [openServices, setOpenServices] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const threshold = 8;
      if (y <= 0) {
        setShowHeader(true);
      } else if (y > lastY + threshold) {
        setShowHeader(false);
      } else if (y < lastY - threshold) {
        setShowHeader(true);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 w-full bg-gray-50 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center py-3 gap-1">
            <span className="flex items-center justify-center h-10 w-10 rounded-full bg-orange-500 text-white text-lg font-bold">K</span>
            <span className="font-bold text-gray-900 text-3xl leading-none">ryptools</span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="space-x-10">
              <NavigationMenuItem>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto hover:bg-transparent">
                  {t('header.learn')}
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto hover:bg-transparent">
                  {t('header.integrations')}
                </Button>
              </NavigationMenuItem>
              
              {/* Services (Tjenester) dropdown - replaces Products */}
              <NavigationMenuItem className="relative">
                <button
                  className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto bg-transparent inline-flex items-center gap-1"
                  onClick={() => setOpenServices(v => !v)}
                  onMouseEnter={() => setOpenServices(true)}
                  onMouseLeave={() => setOpenServices(false)}
                >
                  Tjenester
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                {openServices && (
                  <div
                    className="absolute left-0 top-full mt-2 w-64 p-2 bg-white shadow-lg border rounded-md"
                    onMouseEnter={() => setOpenServices(true)}
                    onMouseLeave={() => setOpenServices(false)}
                  >
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">Skattekalkulator</Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">Porteføljeoversikt</Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">Ytelsesindikatorer</Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">Skattetapsrealisering</Button>
                    </div>
                  </div>
                )}
              </NavigationMenuItem>
              
              <NavigationMenuItem className="relative">
                <button
                  className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto bg-transparent inline-flex items-center gap-1"
                  onClick={() => setOpenResources(v => !v)}
                  onMouseEnter={() => setOpenResources(true)}
                  onMouseLeave={() => setOpenResources(false)}
                >
                  Ressurser
                  <ChevronDown size={16} className="text-gray-500" />
                </button>
                {openResources && (
                  <div
                    className="absolute left-0 top-full mt-2 w-56 p-2 bg-white shadow-lg border rounded-md"
                    onMouseEnter={() => setOpenResources(true)}
                    onMouseLeave={() => setOpenResources(false)}
                  >
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">Skatteguide</Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">Krypto-ordbok</Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">Blogg</Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">Støtte</Button>
                    </div>
                  </div>
                )}
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto hover:bg-transparent">
                  {t('header.pricing')}
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className={`text-gray-600 hover:text-gray-900 ${language==='no' ? 'font-semibold' : ''}`} onClick={() => setLanguage('no')}>NO</Button>
              <span className="text-gray-400">/</span>
              <Button variant="ghost" size="sm" className={`text-gray-600 hover:text-gray-900 ${language==='en' ? 'font-semibold' : ''}`} onClick={() => setLanguage('en')}>EN</Button>
            </div>
            
            {/* Auth buttons */}
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                {t('header.login')}
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                {t('header.signup')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
    <div className="h-20"></div>
    </>
  );
};

export default Header;
