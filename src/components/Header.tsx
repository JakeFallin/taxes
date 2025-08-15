
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
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
                  Learn
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto hover:bg-transparent">
                  Integrations
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto hover:bg-transparent">
                  Products
                </Button>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-lg font-medium h-auto">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-48 p-2 bg-white shadow-lg border rounded-md">
                    <div className="flex flex-col space-y-1">
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        Tax Guide
                      </Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        Crypto Glossary
                      </Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        Blog
                      </Button>
                      <Button variant="ghost" className="justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                        Support
                      </Button>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-orange-500 rounded-none px-0 pb-3 pt-3 text-lg font-medium h-auto hover:bg-transparent">
                  Pricing
                </Button>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              EN
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            
            {/* Auth buttons */}
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                Log in
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
