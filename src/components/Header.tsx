
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  return (
    <header className="w-full bg-gray-50 backdrop-blur supports-[backdrop-filter]:bg-gray-50/60">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-bold text-gray-900 text-xl">Kryptools</span>
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
              
              <NavigationMenuItem>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto hover:bg-transparent">
                  {t('header.products')}
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem className="relative">
                <button
                  className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto bg-transparent"
                  onClick={() => setOpenResources(v => !v)}
                  onMouseEnter={() => setOpenResources(true)}
                  onMouseLeave={() => setOpenResources(false)}
                >
                  {t('header.resources')}
                </button>
                {openResources && (
                  <div
                    className="absolute left-0 top-full mt-2 w-56 p-2 bg-white shadow-lg border rounded-md"
                    onMouseEnter={() => setOpenResources(true)}
                    onMouseLeave={() => setOpenResources(false)}
                  >
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        {t('header.taxGuide')}
                      </Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        {t('header.glossary')}
                      </Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        {t('header.blog')}
                      </Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        {t('header.support')}
                      </Button>
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
  );
};

export default Header;
