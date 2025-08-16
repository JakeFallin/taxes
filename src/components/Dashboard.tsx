
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Home, Wallet, PieChart, Receipt, TrendingUp, TrendingDown, BarChart3, DollarSign, Settings as SettingsIcon, LogOut, Heart, Ban, FileText, Sun, Moon, RotateCcw, Bot } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useWallets } from "@/hooks/useWallets";
import { useTransactions } from "@/hooks/useTransactions";
import { useAuthContext } from "@/contexts/AuthContext";
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
import { BlockchainServiceTest } from "./BlockchainServiceTest";
import AiAssistant from "./AiAssistant";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import EnhancedAssetDistributionChart from "./EnhancedAssetDistributionChart";
import CompactPerformanceChart from "./CompactPerformanceChart";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = [
  { title: "Portfolio", icon: PieChart, url: "/portfolio", key: "portfolio" },
  { title: "Wallets", icon: Wallet, url: "/wallets", key: "wallets" },
  { title: "Transactions", icon: Receipt, url: "/transactions", key: "transactions" },
  { title: "Spam", icon: Ban, url: "/spam", key: "spam" },
  { title: "Taxes", icon: FileText, url: "/taxes", key: "taxes" },
  { title: "Account Health", icon: Heart, url: "/health", key: "health" },
  { title: "Tax Loss Harvesting", icon: TrendingDown, url: "/tax-loss-harvesting", key: "tax-loss-harvesting" },
  { title: "Performance", icon: BarChart3, url: "/performance", key: "performance" },
  { title: "Prices", icon: DollarSign, url: "/prices", key: "prices" },
  { title: "AI Assistant", icon: Bot, url: "/ai", key: "ai" },
  { title: "Settings", icon: SettingsIcon, url: "/settings", key: "settings" },
];

const AppSidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
  const { t } = useLanguage();
  const menuLabel = (key: string) => {
    switch (key) {
      case 'portfolio': return t('menu.portfolio');
      case 'wallets': return t('menu.wallets');
      case 'transactions': return t('menu.transactions');
      case 'spam': return t('menu.spam');
      case 'taxes': return t('menu.taxes');
      case 'health': return t('menu.health');
      case 'tax-loss-harvesting': return t('menu.taxLossHarvesting');
      case 'performance': return t('menu.performance');
      case 'prices': return t('menu.prices');
      case 'settings': return t('menu.settings');
      default: return key;
    }
  };
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
                      <span className="group-data-[collapsible=icon]:hidden">{menuLabel(item.key)}</span>
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
  const usePlaceholders = true;
  const { t } = useLanguage();
  
  // Database hooks
  const { user } = useAuthContext();
  const { wallets, loading: walletsLoading } = useWallets();
  const { 
    transactions, 
    portfolioSummary, 
    loading: transactionsLoading,
    getAssetCount 
  } = useTransactions();

  // Calculate total portfolio value from wallet balances
  const getTotalPortfolioValue = () => {
    console.log('🔍 Calculating total portfolio value from wallets:', wallets)
    const total = wallets.reduce((total, wallet) => {
      console.log(`🔍 Wallet ${wallet.nickname}: balance = ${wallet.balance}`)
      return total + (wallet.balance || 0)
    }, 0)
    const nokValue = convertToNOK(total, getDisplayCurrency())
    console.log('🔍 Total portfolio value:', total, getDisplayCurrency())
    console.log('🔍 Total portfolio value in NOK:', nokValue.toLocaleString(), 'NOK')
    return total
  }

    // Get currency for display (for now, show ETH if any Ethereum wallet, otherwise show the first wallet's currency)
  const getDisplayCurrency = () => {
    if (wallets.length === 0) return 'ETH'

    // Check if we have any Ethereum wallets
    const hasEthereum = wallets.some(wallet =>
      wallet.blockchain?.toLowerCase().includes('ethereum')
    )

    if (hasEthereum) return 'ETH'

    // Return the first wallet's blockchain currency
    const firstWallet = wallets[0]
    if (firstWallet.blockchain?.toLowerCase().includes('bitcoin')) return 'BTC'
    if (firstWallet.blockchain?.toLowerCase().includes('polygon')) return 'MATIC'
    if (firstWallet.blockchain?.toLowerCase().includes('binance')) return 'BNB'

    return 'ETH' // Default fallback
  }

  // Convert crypto value to NOK (Norwegian Krone)
  const convertToNOK = (cryptoValue: number, cryptoCurrency: string) => {
    // Mock exchange rates - in production, these would come from a real API
    const exchangeRates: { [key: string]: number } = {
      'ETH': 35000, // 1 ETH = 35,000 NOK (approximate)
      'BTC': 1200000, // 1 BTC = 1,200,000 NOK (approximate)
      'MATIC': 25, // 1 MATIC = 25 NOK (approximate)
      'BNB': 8000, // 1 BNB = 8,000 NOK (approximate)
    }
    
    const rate = exchangeRates[cryptoCurrency] || 1
    return cryptoValue * rate
  }

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
        return t('menu.portfolio');
      case "health":
        return t('menu.health');
      case "wallets":
        return t('menu.wallets');
      case "transactions":
        return t('menu.transactions');
      case "spam":
        return t('menu.spam');
      case "taxes":
        return t('menu.taxes');
      case "tax-loss-harvesting":
        return t('menu.taxLossHarvesting');
      case "performance":
        return t('menu.performance');
      case "prices":
        return t('menu.prices');
      case "settings":
        return t('menu.settings');
      default:
        return t('menu.portfolio');
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

  // Debug effect to log when wallets change
  useEffect(() => {
    console.log('🔍 Dashboard wallets changed:', wallets)
    console.log('🔍 Total portfolio value:', getTotalPortfolioValue())
  }, [wallets])

  const timePeriods = ['1M', '3M', '1Y', 'ALL'];

  // Mock fallback distribution for compact asset list
  const mockSmallDistribution = [
    { asset: 'BTC', percent: 45 },
    { asset: 'ETH', percent: 35 },
    { asset: 'ADA', percent: 8 },
    { asset: 'SOL', percent: 5 },
    { asset: 'MATIC', percent: 3 },
    { asset: 'LINK', percent: 2 },
    { asset: 'LTC', percent: 1.5 },
    { asset: 'Others', percent: 0.5 }
  ];

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
      case "blockchain-test":
        return <BlockchainServiceTest />;
      case "ai":
        return <AiAssistant />;
      case "settings":
        return <Settings />;
      case "portfolio":
      default:
        return (
          <div className="space-y-8">
            {/* Performance Chart and Right Sidebar */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-0 ${isViewSwapped ? 'swapped-view' : ''}`}>
              {/* Left Section - Performance Chart or Asset Distribution */}
              <div className="lg:col-span-2 pr-6 flex flex-col">
                {!isViewSwapped ? (
                  <div ref={portfolioOverviewRef} className="portfolio-overview bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 flex flex-col">
                    <div className="p-4 pb-2 flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.portfolioPerformance')}</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsViewSwapped(!isViewSwapped)}
                        className="flex items-center gap-2 text-xs px-3 py-1 h-8"
                      >
                        <RotateCcw size={14} />
                        {t('dashboard.swapView')}
                      </Button>
                    </div>
                    <div className="flex-1 p-4 pt-2 min-h-[360px]">
                      <PerformanceChart />
                    </div>
                  </div>
                ) : (
                  <div 
                    ref={assetDistributionRef}
                    className="asset-distribution bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm asset-distribution-container flex-1 flex flex-col"
                  >
                    <div className="p-6 pb-4 flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('dashboard.assetDistribution')}</h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsViewSwapped(!isViewSwapped)}
                        className="flex items-center gap-2 text-xs px-3 py-1 h-8"
                      >
                        <RotateCcw size={14} />
                        {t('dashboard.swapView')}
                      </Button>
                    </div>
                    <div className="p-6 pt-2 flex-1 pie-chart-wrapper h-[360px]">
                      <EnhancedAssetDistributionChart isSwapped={isViewSwapped} />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right sidebar - takes 1 column, flush to the right */}
              <div className="space-y-4 flex flex-col">
                {/* Portfolio Value - expanded to include all value-related metrics */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t('dashboard.portfolioValue')}</h2>
                  <div className="space-y-2">
                    {transactionsLoading ? (
                      <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                        <p className="text-sm text-gray-500">{t('common.loading')}</p>
                      </div>
                    ) : (
                      <>
                        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                          <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">{t('dashboard.totalValue')}</p>
                          <p className="text-lg font-semibold text-black dark:text-white">
                            {usePlaceholders ? 'NOK 4,856,085,563.965' : `NOK ${convertToNOK(getTotalPortfolioValue(), getDisplayCurrency()).toLocaleString()}`}
                          </p>
                         
                        </div>
                        {/* Unrealized Return */}
                        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                          <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">{t('dashboard.unrealizedReturn')}</p>
                          <div className="flex items-baseline gap-2">
                            <p className={`text-lg font-semibold ${usePlaceholders ? 'text-green-600 dark:text-green-400' : 'text-green-600 dark:text-green-400'}`}>
                              {usePlaceholders ? 'NOK 1,514,740.00' : 'NOK 0.00'}
                            </p>
                            <span className={`text-sm font-medium ${usePlaceholders ? 'text-green-600 dark:text-green-400' : 'text-green-600 dark:text-green-400'}`}>
                              {usePlaceholders ? '+13.10%' : '+0.00%'}
                            </span>
                          </div>
                        </div>
                        {/* Cost Basis */}
                        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                          <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">{t('dashboard.costBasis')}</p>
                          <p className="text-lg font-semibold text-black dark:text-white">
                            {usePlaceholders ? 'NOK 3,341,345,823.965' : 'NOK 0.00'}
                          </p>
                        </div>
                        
                        <div className="flex">
                          
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                          <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">{t('dashboard.assets')}</p>
                          <p className="text-lg font-semibold text-black dark:text-white">
                            {usePlaceholders ? `14 ${t('dashboard.assets')}` : `${getAssetCount()} ${t('dashboard.assets')}`}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                          <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">{t('dashboard.wallets')}</p>
                          <p className="text-lg font-semibold text-black dark:text-white">
                            {usePlaceholders ? `8 ${t('dashboard.connected')}` : `${wallets.length} ${t('dashboard.connected')}`}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                          <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">{t('dashboard.transactions')}</p>
                          <p className="text-lg font-semibold text-black dark:text-white">
                            {usePlaceholders ? `3179 ${t('dashboard.total')}` : `${wallets.reduce((total, wallet) => total + (wallet.total_transactions || 0), 0)} ${t('dashboard.total')}`}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Asset Distribution Chart or Performance Chart - adjusted to fill remaining height */}
                <div className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex-1 flex flex-col ${isViewSwapped ? 'h-[420px]' : ''}`}>
                  {!isViewSwapped ? (
                    <>
                      <div className="p-4 pb-2 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.assetDistribution')}</h2>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsViewSwapped(!isViewSwapped)}
                          className="flex items-center gap-1 text-xs px-2 py-1 h-6 hover:bg-gray-100 dark:hover:bg-gray-700"
                          title={t('dashboard.swapView')}
                        >
                          <RotateCcw size={12} />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between gap-6 p-4 pt-2 flex-1">
                        {/* Asset list on the left */}
                        <ScrollArea className="flex-1 h-full">
                          <div className="space-y-3 pr-1">
                            {transactionsLoading ? (
                              <div className="text-sm text-gray-500">Loading assets...</div>
                            ) : Object.keys(portfolioSummary).length === 0 ? (
                              <div className="text-[11px] leading-tight text-gray-600 dark:text-gray-300 space-y-0.5">
                                {mockSmallDistribution.map((row) => (
                                  <div key={row.asset} className="flex items-center gap-2">
                                    <span>{row.asset}</span>
                                    <span className="font-medium">{row.percent}%</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              Object.entries(portfolioSummary).map(([asset, data]) => (
                                <div key={asset} className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div 
                                      className="w-3 h-3 rounded-full flex-shrink-0" 
                                      style={{ backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)` }}
                                    />
                                    <span className="text-sm text-gray-600 dark:text-gray-300">{asset}</span>
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    ${data.totalValue.toLocaleString()}
                                  </span>
                                </div>
                              ))
                            )}
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
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t('dashboard.portfolioOverview')}</h2>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsViewSwapped(!isViewSwapped)}
                              className="flex items-center gap-1 text-xs px-2 py-1 h-6 hover:bg-gray-100 dark:hover:bg-gray-700"
                              title={t('dashboard.swapView')}
                            >
                              <RotateCcw size={12} />
                            </Button>
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
                      <div className="p-4 pt-2 flex-1 relative h-[360px]">
                        <CompactPerformanceChart selectedPeriod={selectedPeriod} />
                      </div>
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

          
            <div className="flex flex-col gap-4"></div>
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
               
                {/* Debug button */}
                            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                console.log('🔍 Manual debug triggered')
                console.log('🔍 Current wallets:', wallets)
                const totalValue = getTotalPortfolioValue()
                const nokValue = convertToNOK(totalValue, getDisplayCurrency())
                console.log('🔍 Total value:', totalValue, getDisplayCurrency())
                console.log('🔍 Total value in NOK:', nokValue.toLocaleString(), 'NOK')
                console.log('🔍 Wallets loading:', walletsLoading)
              }}
              className="flex items-center gap-2 bg-red-100 dark:bg-red-700 border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-600"
            >
              Debug
            </Button>
                {/* Dark mode toggle */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                  {isDarkMode ? t('common.lightMode') : t('common.darkMode')}
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
