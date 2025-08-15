
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Home, Wallet, PieChart, Receipt, TrendingUp, TrendingDown, BarChart3, DollarSign, Settings as SettingsIcon, LogOut, Heart, Ban, FileText, Sun, Moon, RotateCcw } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import PortfolioCard from "./PortfolioCard";
import AssetDistributionChart from "./AssetDistributionChart";
import TaxSummary from "./TaxSummary";
import PerformanceChart from "./PerformanceChart";
import YourAssetsTable from "./YourAssetsTable";
import AccountHealth from "./AccountHealth";
import Wallets from "./Wallets";
import Transactions from "./Transactions";
import Spam from "./Spam";
import TaxLossHarvesting from "./TaxLossHarvesting";
import Prices from "./Prices";
import Taxes from "./Taxes";
import Performance from "./Performance";
import Settings from "./Settings";
import { useNavigate } from "react-router-dom";
import EnhancedAssetDistributionChart from "./EnhancedAssetDistributionChart";
import CompactPerformanceChart from "./CompactPerformanceChart";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = [
  { title: "Portfolio", icon: PieChart, url: "/portfolio", key: "portfolio" },
  { title: "Account Health", icon: Heart, url: "/health", key: "health" },
  { title: "Wallets", icon: Wallet, url: "/wallets", key: "wallets" },
  { title: "Transactions", icon: Receipt, url: "/transactions", key: "transactions" },
  { title: "Spam", icon: Ban, url: "/spam", key: "spam" },
  { title: "Taxes", icon: FileText, url: "/taxes", key: "taxes" },
  { title: "Tax Loss Harvesting", icon: TrendingDown, url: "/tax-loss-harvesting", key: "tax-loss-harvesting" },
  { title: "Performance", icon: BarChart3, url: "/performance", key: "performance" },
  { title: "Prices", icon: DollarSign, url: "/prices", key: "prices" },
  { title: "Settings", icon: SettingsIcon, url: "/settings", key: "settings" },
];

const AppSidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <Sidebar 
      className="border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 group-data-[state=collapsed]:bg-gray-900"
      collapsible="icon"
    >
      <SidebarContent>
        <div className="p-6 flex items-center gap-3 group-data-[collapsible=icon]:p-3 group-data-[collapsible=icon]:justify-center group-data-[state=collapsed]:border-none">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white group-data-[collapsible=icon]:hidden">Kryptools</h2>
        </div>
        <SidebarGroup>
          <SidebarGroupContent className="pt-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    tooltip={item.title}
                    className={`text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group-data-[state=collapsed]:text-gray-400 group-data-[state=collapsed]:hover:text-white group-data-[state=collapsed]:hover:bg-gray-700 ${
                      activeTab === item.key ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white group-data-[state=collapsed]:bg-gray-700 group-data-[state=collapsed]:text-white' : ''
                    }`}
                  >
                    <button 
                      onClick={() => setActiveTab(item.key)}
                      className="flex items-center gap-3 px-6 py-3 w-full text-left group-data-[collapsible=icon]:px-3 group-data-[collapsible=icon]:justify-center"
                    >
                      <item.icon size={20} />
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Log Out"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 group-data-[state=collapsed]:text-gray-400 group-data-[state=collapsed]:hover:text-white group-data-[state=collapsed]:hover:bg-gray-700"
            >
              <button 
                onClick={handleLogOut}
                className="flex items-center gap-3 px-6 py-3 w-full text-left group-data-[collapsible=icon]:px-3 group-data-[collapsible=icon]:justify-center"
              >
                <LogOut size={20} />
                <span className="group-data-[collapsible=icon]:hidden">Log Out</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isViewSwapped, setIsViewSwapped] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('ALL');
  const portfolioOverviewRef = useRef<HTMLDivElement>(null);
  const assetDistributionRef = useRef<HTMLDivElement>(null);

  // Initialize light mode by default, only use localStorage if it exists
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      // Ensure we're in light mode by default
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
      // Set localStorage to light mode if not already set
      if (savedDarkMode === null) {
        localStorage.setItem('darkMode', 'false');
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "portfolio":
        return "Portfolio";
      case "health":
        return "Account Health";
      case "wallets":
        return "Wallets";
      case "transactions":
        return "Transactions";
      case "spam":
        return "Spam";
      case "taxes":
        return "Taxes";
      case "tax-loss-harvesting":
        return "Tax Loss Harvesting";
      case "performance":
        return "Performance";
      case "prices":
        return "Asset Prices";
      case "settings":
        return "Settings";
      default:
        return "Portfolio";
    }
  };

  // Effect to handle height matching when view is swapped
  useEffect(() => {
    if (isViewSwapped && portfolioOverviewRef.current && assetDistributionRef.current) {
      const portfolioHeight = portfolioOverviewRef.current.offsetHeight;
      assetDistributionRef.current.style.height = `${portfolioHeight}px`;
      
      // Debug logging
      console.log(
        `Graph height: ${portfolioHeight}px\n`,
        `Asset box height: ${assetDistributionRef.current.offsetHeight}px`
      );
    } else if (!isViewSwapped && assetDistributionRef.current) {
      // Reset to original height
      assetDistributionRef.current.style.height = '';
    }
  }, [isViewSwapped]);

  const timePeriods = ['1M', '3M', '1Y', 'ALL'];

  const renderContent = () => {
    switch (activeTab) {
      case "health":
        return <AccountHealth />;
      case "wallets":
        return <Wallets />;
      case "transactions":
        return <Transactions />;
      case "spam":
        return <Spam />;
      case "tax-loss-harvesting":
        return <TaxLossHarvesting />;
      case "prices":
        return <Prices />;
      case "taxes":
        return <Taxes />;
      case "performance":
        return <Performance />;
      case "settings":
        return <Settings />;
      case "portfolio":
      default:
        return (
          <div className="space-y-8">
            {/* Performance Chart and Right Sidebar */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-0 ${isViewSwapped ? 'swapped-view' : ''}`}>
              {/* Left Section - Performance Chart or Asset Distribution */}
              <div className="lg:col-span-2 pr-6">
                {!isViewSwapped ? (
                  <div ref={portfolioOverviewRef} className="portfolio-overview">
                    <PerformanceChart />
                  </div>
                ) : (
                  <div 
                    ref={assetDistributionRef}
                    className="asset-distribution bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm asset-distribution-container"
                  >
                    <div className="p-6 pb-4">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Asset Distribution</h2>
                    </div>
                    <div className="p-6 pt-2 flex-1 pie-chart-wrapper">
                      <EnhancedAssetDistributionChart isSwapped={isViewSwapped} />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right sidebar - takes 1 column, flush to the right */}
              <div className="space-y-4 flex flex-col">
                {/* Portfolio Value - expanded to include all value-related metrics */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Portfolio Value</h2>
                  <div className="space-y-2">
                    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                      <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">Total Value</p>
                      <p className="text-lg font-semibold text-black dark:text-white">
                        $13,076
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                      <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">Cost Basis</p>
                      <p className="text-lg font-semibold text-black dark:text-white">
                        $12,950
                      </p>
                    </div>
                    <PortfolioCard
                      title="Unrealized Return"
                      value="$126 (+0.97%)"
                      isPositive={true}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 p-3"
                    />
                  </div>
                </div>

                {/* Asset Distribution Chart or Performance Chart - adjusted to fill remaining height */}
                <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 flex flex-col ${isViewSwapped ? 'h-[340px]' : ''}`}>
                  {!isViewSwapped ? (
                    <>
                      <div className="p-4 pb-2">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Asset Distribution</h2>
                      </div>
                      
                      <div className="flex items-center justify-between gap-6 p-4 pt-2 flex-1">
                        {/* Asset list on the left */}
                        <ScrollArea className="flex-1 h-full">
                          <div className="space-y-3 pr-2">
                            {[
                              { name: 'Bitcoin (BTC)', color: '#f7931a' },
                              { name: 'Ethereum (ETH)', color: '#627eea' },
                              { name: 'Cardano (ADA)', color: '#0033ad' },
                              { name: 'Solana (SOL)', color: '#9945ff' },
                              { name: 'Others', color: '#6b7280' },
                            ].map((asset) => (
                              <div key={asset.name} className="flex items-center gap-3">
                                <div 
                                  className="w-3 h-3 rounded-full flex-shrink-0" 
                                  style={{ backgroundColor: asset.color }}
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{asset.name}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        
                        {/* Smaller pie chart on the right */}
                        <div className="w-32 h-32 flex items-center justify-center flex-shrink-0">
                          <AssetDistributionChart />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 pb-2 relative">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio Overview</h2>
                          <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                            {timePeriods.map(period => (
                              <Button
                                key={period}
                                variant={selectedPeriod === period ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setSelectedPeriod(period)}
                                className={selectedPeriod === period 
                                  ? "bg-orange-500 dark:bg-orange-600 text-white shadow-sm hover:bg-orange-600 dark:hover:bg-orange-700 text-xs px-2 py-1 h-7" 
                                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-gray-600 text-xs px-2 py-1 h-7"
                                }
                              >
                                {period}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 pt-2 flex-1 relative">
                        <CompactPerformanceChart selectedPeriod={selectedPeriod} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tax Summary - moved to full width */}
            <TaxSummary />

            {/* Your Assets Table - now directly below Tax Summary */}
            <YourAssetsTable />

            {/* Footer - aligned with main content */}
            <div className="bg-gray-50 dark:bg-gray-900 -mx-6 px-6 pt-12 pb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-none ml-6">
                {/* Product Column */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Integrations</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Crypto Tax Calculator</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Crypto Portfolio Tracker</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Crypto Profit Calculator</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">For Accountants</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">For Businesses</a></li>
                  </ul>
                </div>

                {/* Resources Column */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Pricing</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Help & Support</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Crypto Tax Accountants</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Crypto Tax Guide</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Crypto Glossary</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Reviews</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Feedback</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Compare</a></li>
                  </ul>
                </div>

                {/* Company Column */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Blog</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">About</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Partners</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Affiliates</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Media</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Contact Us</a></li>
                  </ul>
                </div>

                {/* Legal Column */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Disclaimer</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Security</a></li>
                    <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Cookie Preferences</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
        <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{getPageTitle()}</h1>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Switch View Toggle Button - only show on portfolio tab */}
                {activeTab === "portfolio" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsViewSwapped(!isViewSwapped)}
                    className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 bg-white dark:bg-gray-800"
                  >
                    <RotateCcw size={16} />
                    Switch View
                  </Button>
                )}
                {/* Dark mode toggle */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <SidebarTrigger className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800" />
              </div>
            </div>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
