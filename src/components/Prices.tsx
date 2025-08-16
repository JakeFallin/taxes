
import { Search, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Prices = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem('favoriteSymbols');
      if (raw) return new Set(JSON.parse(raw));
    } catch {}
    return new Set();
  });

  const cryptoPrices = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "NOK 1,077,452.07",
      marketCap: "NOK 21T",
      volume24h: "NOK 484B",
      circulatingSupply: "19 878 000",
      change24h: "+3.86%",
      changeColor: "text-green-600",
      bgColor: "bg-orange-500",
      icon: "₿"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "NOK 26,390.39",
      marketCap: "NOK 31.6T",
      volume24h: "NOK 211B",
      circulatingSupply: "120 721 027",
      change24h: "+6.44%",
      changeColor: "text-green-600",
      bgColor: "bg-gray-700",
      icon: "Ξ"
    },
    {
      name: "Tether USDt",
      symbol: "USDT",
      price: "NOK 9.92",
      marketCap: "NOK 15.3T",
      volume24h: "NOK 759B",
      circulatingSupply: "155 485 904 912",
      change24h: "+0.03%",
      changeColor: "text-green-600",
      bgColor: "bg-teal-500",
      icon: "₮"
    },
    {
      name: "XRP",
      symbol: "XRP",
      price: "NOK 23.02",
      marketCap: "NOK 13.4T",
      volume24h: "NOK 40.8B",
      circulatingSupply: "58 881 764 070",
      change24h: "+8.21%",
      changeColor: "text-green-600",
      bgColor: "bg-gray-600",
      icon: "◉"
    },
    {
      name: "BNB",
      symbol: "BNB",
      price: "NOK 6,526.12",
      marketCap: "NOK 9.11T",
      volume24h: "NOK 15.5B",
      circulatingSupply: "140 886 357",
      change24h: "+2.27%",
      changeColor: "text-green-600",
      bgColor: "bg-yellow-500",
      icon: "◆"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "NOK 1,558.89",
      marketCap: "NOK 8.15T",
      volume24h: "NOK 42.7B",
      circulatingSupply: "527 749 933",
      change24h: "+5.68%",
      changeColor: "text-green-600",
      bgColor: "bg-purple-500",
      icon: "◎"
    },
    {
      name: "USDC",
      symbol: "USDC",
      price: "NOK 9.91",
      marketCap: "NOK 6.06T",
      volume24h: "NOK 103B",
      circulatingSupply: "61 629 887 779",
      change24h: "-0.01%",
      changeColor: "text-red-600",
      bgColor: "bg-blue-500",
      icon: "$"
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: "NOK 1.78",
      marketCap: "NOK 2.64T",
      volume24h: "NOK 10.8B",
      circulatingSupply: "149 714 086 384",
      change24h: "+4.13%",
      changeColor: "text-green-600",
      bgColor: "bg-yellow-600",
      icon: "Ð"
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "NOK 6.82",
      marketCap: "NOK 2.3T",
      volume24h: "NOK 7.6B",
      circulatingSupply: "35 100 000 000",
      change24h: "+2.04%",
      changeColor: "text-green-600",
      bgColor: "bg-blue-500",
      icon: "A"
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      price: "NOK 10.45",
      marketCap: "NOK 965B",
      volume24h: "NOK 6.9B",
      circulatingSupply: "9 640 000 000",
      change24h: "+1.12%",
      changeColor: "text-green-600",
      bgColor: "bg-indigo-500",
      icon: "M"
    },
    {
      name: "Toncoin",
      symbol: "TON",
      price: "NOK 96.10",
      marketCap: "NOK 3.2T",
      volume24h: "NOK 19.4B",
      circulatingSupply: "5 100 000 000",
      change24h: "+0.88%",
      changeColor: "text-green-600",
      bgColor: "bg-cyan-500",
      icon: "T"
    },
    {
      name: "TRON",
      symbol: "TRX",
      price: "NOK 1.32",
      marketCap: "NOK 1.1T",
      volume24h: "NOK 4.3B",
      circulatingSupply: "87 000 000 000",
      change24h: "-0.41%",
      changeColor: "text-red-600",
      bgColor: "bg-red-500",
      icon: "▲"
    },
    {
      name: "Polkadot",
      symbol: "DOT",
      price: "NOK 69.14",
      marketCap: "NOK 905B",
      volume24h: "NOK 8.1B",
      circulatingSupply: "1 210 000 000",
      change24h: "+3.02%",
      changeColor: "text-green-600",
      bgColor: "bg-pink-500",
      icon: "●"
    },
    {
      name: "Avalanche",
      symbol: "AVAX",
      price: "NOK 408.50",
      marketCap: "NOK 1.5T",
      volume24h: "NOK 12.7B",
      circulatingSupply: "377 000 000",
      change24h: "-1.12%",
      changeColor: "text-red-600",
      bgColor: "bg-rose-500",
      icon: "A"
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      price: "NOK 220.31",
      marketCap: "NOK 1.3T",
      volume24h: "NOK 15.9B",
      circulatingSupply: "587 000 000",
      change24h: "+2.45%",
      changeColor: "text-green-600",
      bgColor: "bg-blue-700",
      icon: "🔗"
    },
    {
      name: "Shiba Inu",
      symbol: "SHIB",
      price: "NOK 0.00022",
      marketCap: "NOK 1.4T",
      volume24h: "NOK 21.3B",
      circulatingSupply: "589 000 000 000 000",
      change24h: "+4.90%",
      changeColor: "text-green-600",
      bgColor: "bg-red-400",
      icon: "🐾"
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      price: "NOK 1,248.30",
      marketCap: "NOK 930B",
      volume24h: "NOK 6.2B",
      circulatingSupply: "74 600 000",
      change24h: "+0.72%",
      changeColor: "text-green-600",
      bgColor: "bg-gray-500",
      icon: "Ł"
    },
    {
      name: "Bitcoin Cash",
      symbol: "BCH",
      price: "NOK 5,420.10",
      marketCap: "NOK 1.07T",
      volume24h: "NOK 9.3B",
      circulatingSupply: "19 650 000",
      change24h: "-0.64%",
      changeColor: "text-red-600",
      bgColor: "bg-green-700",
      icon: "Ƀ"
    },
    {
      name: "Cosmos",
      symbol: "ATOM",
      price: "NOK 96.44",
      marketCap: "NOK 350B",
      volume24h: "NOK 3.7B",
      circulatingSupply: "360 000 000",
      change24h: "+1.33%",
      changeColor: "text-green-600",
      bgColor: "bg-purple-600",
      icon: "⚛"
    },
    {
      name: "Stellar",
      symbol: "XLM",
      price: "NOK 1.96",
      marketCap: "NOK 270B",
      volume24h: "NOK 1.9B",
      circulatingSupply: "27 000 000 000",
      change24h: "+0.41%",
      changeColor: "text-green-600",
      bgColor: "bg-blue-300",
      icon: "✦"
    },
    {
      name: "Uniswap",
      symbol: "UNI",
      price: "NOK 94.10",
      marketCap: "NOK 740B",
      volume24h: "NOK 5.2B",
      circulatingSupply: "762 000 000",
      change24h: "-0.23%",
      changeColor: "text-red-600",
      bgColor: "bg-pink-400",
      icon: "U"
    },
    {
      name: "Aave",
      symbol: "AAVE",
      price: "NOK 1,920.55",
      marketCap: "NOK 280B",
      volume24h: "NOK 2.4B",
      circulatingSupply: "14 600 000",
      change24h: "+3.18%",
      changeColor: "text-green-600",
      bgColor: "bg-violet-600",
      icon: "Å"
    },
    {
      name: "Sui",
      symbol: "SUI",
      price: "NOK 18.11",
      marketCap: "NOK 180B",
      volume24h: "NOK 1.3B",
      circulatingSupply: "10 000 000 000",
      change24h: "+2.76%",
      changeColor: "text-green-600",
      bgColor: "bg-sky-400",
      icon: "S"
    },
    {
      name: "NEAR Protocol",
      symbol: "NEAR",
      price: "NOK 71.95",
      marketCap: "NOK 690B",
      volume24h: "NOK 7.1B",
      circulatingSupply: "942 000 000",
      change24h: "+4.22%",
      changeColor: "text-green-600",
      bgColor: "bg-emerald-500",
      icon: "N"
    },
    {
      name: "Arbitrum",
      symbol: "ARB",
      price: "NOK 12.40",
      marketCap: "NOK 155B",
      volume24h: "NOK 2.2B",
      circulatingSupply: "12 500 000 000",
      change24h: "-0.84%",
      changeColor: "text-red-600",
      bgColor: "bg-indigo-400",
      icon: "A"
    },
    {
      name: "Optimism",
      symbol: "OP",
      price: "NOK 18.90",
      marketCap: "NOK 230B",
      volume24h: "NOK 2.9B",
      circulatingSupply: "12 100 000 000",
      change24h: "+1.05%",
      changeColor: "text-green-600",
      bgColor: "bg-red-400",
      icon: "O"
    }
    ,
    { name: "Internet Computer", symbol: "ICP", price: "NOK 91.34", marketCap: "NOK 420B", volume24h: "NOK 4.8B", circulatingSupply: "451 000 000", change24h: "+2.11%", changeColor: "text-green-600", bgColor: "bg-gray-400", icon: "I" },
    { name: "Filecoin", symbol: "FIL", price: "NOK 61.02", marketCap: "NOK 320B", volume24h: "NOK 3.2B", circulatingSupply: "5 280 000 000", change24h: "-1.22%", changeColor: "text-red-600", bgColor: "bg-amber-600", icon: "F" },
    { name: "Thorchain", symbol: "RUNE", price: "NOK 39.45", marketCap: "NOK 190B", volume24h: "NOK 2.1B", circulatingSupply: "4 900 000 000", change24h: "+3.05%", changeColor: "text-green-600", bgColor: "bg-slate-600", icon: "R" },
    { name: "Maker", symbol: "MKR", price: "NOK 34,120.22", marketCap: "NOK 330B", volume24h: "NOK 1.4B", circulatingSupply: "300 000", change24h: "+0.84%", changeColor: "text-green-600", bgColor: "bg-green-800", icon: "M" },
    { name: "Lido DAO", symbol: "LDO", price: "NOK 27.65", marketCap: "NOK 79B", volume24h: "NOK 860M", circulatingSupply: "3 000 000 000", change24h: "-0.44%", changeColor: "text-red-600", bgColor: "bg-emerald-600", icon: "L" },
    { name: "Ethereum Name Service", symbol: "ENS", price: "NOK 164.33", marketCap: "NOK 47B", volume24h: "NOK 510M", circulatingSupply: "28 600 000", change24h: "+4.21%", changeColor: "text-green-600", bgColor: "bg-indigo-700", icon: "E" },
    { name: "The Graph", symbol: "GRT", price: "NOK 3.54", marketCap: "NOK 330B", volume24h: "NOK 1.1B", circulatingSupply: "9 200 000 000", change24h: "-1.18%", changeColor: "text-red-600", bgColor: "bg-purple-700", icon: "G" },
    { name: "Algorand", symbol: "ALGO", price: "NOK 2.14", marketCap: "NOK 170B", volume24h: "NOK 920M", circulatingSupply: "7 800 000 000", change24h: "+0.51%", changeColor: "text-green-600", bgColor: "bg-teal-600", icon: "A" },
    { name: "VeChain", symbol: "VET", price: "NOK 0.34", marketCap: "NOK 250B", volume24h: "NOK 1.3B", circulatingSupply: "72 700 000 000", change24h: "-0.73%", changeColor: "text-red-600", bgColor: "bg-lime-600", icon: "V" },
    { name: "Aptos", symbol: "APT", price: "NOK 101.52", marketCap: "NOK 320B", volume24h: "NOK 3.9B", circulatingSupply: "1 000 000 000", change24h: "+2.83%", changeColor: "text-green-600", bgColor: "bg-rose-700", icon: "A" },
    { name: "ApeCoin", symbol: "APE", price: "NOK 13.12", marketCap: "NOK 52B", volume24h: "NOK 780M", circulatingSupply: "3 800 000 000", change24h: "-3.02%", changeColor: "text-red-600", bgColor: "bg-yellow-700", icon: "🦍" },
    { name: "Decentraland", symbol: "MANA", price: "NOK 4.45", marketCap: "NOK 90B", volume24h: "NOK 1.0B", circulatingSupply: "2 100 000 000", change24h: "+1.44%", changeColor: "text-green-600", bgColor: "bg-pink-700", icon: "M" },
    { name: "The Sandbox", symbol: "SAND", price: "NOK 3.12", marketCap: "NOK 65B", volume24h: "NOK 820M", circulatingSupply: "3 000 000 000", change24h: "-0.22%", changeColor: "text-red-600", bgColor: "bg-orange-700", icon: "S" },
    { name: "Immutable", symbol: "IMX", price: "NOK 39.27", marketCap: "NOK 210B", volume24h: "NOK 2.0B", circulatingSupply: "2 200 000 000", change24h: "+0.95%", changeColor: "text-green-600", bgColor: "bg-cyan-600", icon: "I" },
    { name: "Injective", symbol: "INJ", price: "NOK 608.30", marketCap: "NOK 110B", volume24h: "NOK 1.5B", circulatingSupply: "190 000 000", change24h: "-1.42%", changeColor: "text-red-600", bgColor: "bg-slate-700", icon: "I" },
    { name: "Stacks", symbol: "STX", price: "NOK 26.44", marketCap: "NOK 250B", volume24h: "NOK 2.2B", circulatingSupply: "1 400 000 000", change24h: "+3.18%", changeColor: "text-green-600", bgColor: "bg-amber-700", icon: "S" },
    { name: "Tezos", symbol: "XTZ", price: "NOK 8.10", marketCap: "NOK 77B", volume24h: "NOK 630M", circulatingSupply: "9 500 000 000", change24h: "-0.67%", changeColor: "text-red-600", bgColor: "bg-indigo-500", icon: "T" },
    { name: "Theta Network", symbol: "THETA", price: "NOK 17.30", marketCap: "NOK 172B", volume24h: "NOK 1.4B", circulatingSupply: "10 000 000 000", change24h: "+0.34%", changeColor: "text-green-600", bgColor: "bg-purple-800", icon: "Θ" },
    { name: "Fantom", symbol: "FTM", price: "NOK 5.66", marketCap: "NOK 135B", volume24h: "NOK 1.1B", circulatingSupply: "3 100 000 000", change24h: "-1.08%", changeColor: "text-red-600", bgColor: "bg-blue-800", icon: "F" },
    { name: "MultiversX", symbol: "EGLD", price: "NOK 694.55", marketCap: "NOK 170B", volume24h: "NOK 900M", circulatingSupply: "24 000 000", change24h: "+2.02%", changeColor: "text-green-600", bgColor: "bg-yellow-800", icon: "E" },
    { name: "Kaspa", symbol: "KAS", price: "NOK 3.02", marketCap: "NOK 320B", volume24h: "NOK 1.7B", circulatingSupply: "112 000 000 000", change24h: "+4.44%", changeColor: "text-green-600", bgColor: "bg-gray-800", icon: "K" },
    { name: "Hedera", symbol: "HBAR", price: "NOK 1.21", marketCap: "NOK 190B", volume24h: "NOK 1.2B", circulatingSupply: "65 000 000 000", change24h: "-0.18%", changeColor: "text-red-600", bgColor: "bg-emerald-700", icon: "H" },
    { name: "Flow", symbol: "FLOW", price: "NOK 7.41", marketCap: "NOK 110B", volume24h: "NOK 680M", circulatingSupply: "10 300 000 000", change24h: "+0.92%", changeColor: "text-green-600", bgColor: "bg-green-700", icon: "F" },
    { name: "LUNAC", symbol: "LUNC", price: "NOK 0.00084", marketCap: "NOK 48B", volume24h: "NOK 420M", circulatingSupply: "5 700 000 000 000", change24h: "+6.11%", changeColor: "text-green-600", bgColor: "bg-gray-500", icon: "L" },
    { name: "Pepe", symbol: "PEPE", price: "NOK 0.00012", marketCap: "NOK 155B", volume24h: "NOK 3.3B", circulatingSupply: "420 000 000 000 000", change24h: "-2.18%", changeColor: "text-red-600", bgColor: "bg-green-600", icon: "🐸" },
    { name: "Bonk", symbol: "BONK", price: "NOK 0.000026", marketCap: "NOK 85B", volume24h: "NOK 1.9B", circulatingSupply: "65 000 000 000 000", change24h: "+5.02%", changeColor: "text-green-600", bgColor: "bg-orange-600", icon: "🐶" },
    { name: "dogwifhat", symbol: "WIF", price: "NOK 23.10", marketCap: "NOK 230B", volume24h: "NOK 2.6B", circulatingSupply: "9 800 000 000", change24h: "-1.44%", changeColor: "text-red-600", bgColor: "bg-pink-600", icon: "🧢" },
    { name: "Jupiter", symbol: "JUP", price: "NOK 10.55", marketCap: "NOK 110B", volume24h: "NOK 1.5B", circulatingSupply: "10 000 000 000", change24h: "+2.21%", changeColor: "text-green-600", bgColor: "bg-indigo-600", icon: "J" },
    { name: "Sei", symbol: "SEI", price: "NOK 6.77", marketCap: "NOK 75B", volume24h: "NOK 900M", circulatingSupply: "12 000 000 000", change24h: "-0.26%", changeColor: "text-red-600", bgColor: "bg-cyan-700", icon: "S" },
    { name: "Starknet", symbol: "STRK", price: "NOK 14.40", marketCap: "NOK 120B", volume24h: "NOK 1.8B", circulatingSupply: "8 200 000 000", change24h: "+1.14%", changeColor: "text-green-600", bgColor: "bg-purple-500", icon: "S" },
    { name: "Pyth Network", symbol: "PYTH", price: "NOK 4.09", marketCap: "NOK 38B", volume24h: "NOK 520M", circulatingSupply: "9 200 000 000", change24h: "-0.92%", changeColor: "text-red-600", bgColor: "bg-blue-500", icon: "P" },
    { name: "Jito", symbol: "JTO", price: "NOK 31.80", marketCap: "NOK 62B", volume24h: "NOK 760M", circulatingSupply: "1 950 000 000", change24h: "+3.92%", changeColor: "text-green-600", bgColor: "bg-emerald-800", icon: "J" },
    { name: "Sushi", symbol: "SUSHI", price: "NOK 13.11", marketCap: "NOK 32B", volume24h: "NOK 540M", circulatingSupply: "245 000 000", change24h: "-1.06%", changeColor: "text-red-600", bgColor: "bg-red-700", icon: "🍣" },
    { name: "Curve DAO", symbol: "CRV", price: "NOK 5.06", marketCap: "NOK 47B", volume24h: "NOK 600M", circulatingSupply: "9 400 000 000", change24h: "+0.88%", changeColor: "text-green-600", bgColor: "bg-gray-700", icon: "C" },
    { name: "Convex", symbol: "CVX", price: "NOK 38.25", marketCap: "NOK 30B", volume24h: "NOK 410M", circulatingSupply: "780 000 000", change24h: "-0.34%", changeColor: "text-red-600", bgColor: "bg-yellow-600", icon: "C" },
    { name: "Rocket Pool", symbol: "RPL", price: "NOK 236.41", marketCap: "NOK 47B", volume24h: "NOK 360M", circulatingSupply: "200 000 000", change24h: "+1.20%", changeColor: "text-green-600", bgColor: "bg-orange-700", icon: "R" },
    { name: "dYdX", symbol: "DYDX", price: "NOK 23.40", marketCap: "NOK 52B", volume24h: "NOK 1.1B", circulatingSupply: "2 400 000 000", change24h: "-1.55%", changeColor: "text-red-600", bgColor: "bg-violet-700", icon: "D" }
  ];
  const [rows, setRows] = useState(cryptoPrices);

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(symbol)) next.delete(symbol); else next.add(symbol);
      return next;
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem('favoriteSymbols', JSON.stringify(Array.from(favorites)));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    const fetchBitcoinToday = async () => {
      try {
        const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
        if (!baseUrl || !anonKey) {
          console.warn("Supabase env not set; skipping live BTC price fetch");
          return;
        }
        const url = `${baseUrl}/functions/v1/historical-prices?id=bitcoin&vs_currency=nok&days=1&interval=hourly`;
        const resp = await fetch(url, {
          headers: { Authorization: `Bearer ${anonKey}` },
        });
        if (!resp.ok) {
          console.warn("BTC price fetch failed:", resp.status, await resp.text());
          return;
        }
        const data = await resp.json();
        const points: Array<{ timestamp: number; price?: number }> = data?.points || [];
        const last = [...points].reverse().find(p => typeof p.price === 'number');
        if (!last || typeof last.price !== 'number') return;
        const nok = last.price;
        setRows(prev => prev.map(item => (
          item.symbol === 'BTC'
            ? { ...item, price: `NOK ${nok.toLocaleString('nb-NO', { maximumFractionDigits: 2 })}` }
            : item
        )));
      } catch (err) {
        console.warn("BTC price fetch exception:", err);
      }
    };
    fetchBitcoinToday();
  }, []);

  const displayedRows = activeTab === 'watchlist' ? rows.filter(r => favorites.has(r.symbol)) : rows;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
          <input
            type="text"
            placeholder={t('prices.search')}
            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <div></div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button 
            onClick={() => setActiveTab("all")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "all" 
                ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" 
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {t('prices.all')}
          </button>
          <button 
            onClick={() => setActiveTab("watchlist")}
            className={`border-b-2 py-2 px-1 text-sm font-medium ${
              activeTab === "watchlist" 
                ? "border-orange-500 text-orange-500 dark:border-orange-400 dark:text-orange-400" 
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            {t('prices.watchlist')}
          </button>
        </nav>
      </div>

      {/* Prices Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('prices.th.coin')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('prices.th.price')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('prices.th.marketCap')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('prices.th.vol24h')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('prices.th.circSupply')}</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700 dark:text-gray-300">{t('prices.th.change24h')}</th>
              </tr>
            </thead>
            <tbody>
              {displayedRows.map((crypto, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleFavorite(crypto.symbol)}
                        className="cursor-pointer"
                        title={favorites.has(crypto.symbol) ? 'Unfavorite' : 'Favorite'}
                        aria-label={favorites.has(crypto.symbol) ? 'Unfavorite' : 'Favorite'}
                      >
                        <Star
                          size={16}
                          className={favorites.has(crypto.symbol) ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-500'}
                          fill={favorites.has(crypto.symbol) ? 'currentColor' : 'none'}
                        />
                      </button>
                      <div className={`w-8 h-8 ${crypto.bgColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {crypto.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{crypto.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900 dark:text-white">{crypto.price}</td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{crypto.marketCap}</td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{crypto.volume24h}</td>
                  <td className="py-4 px-4 text-gray-900 dark:text-white">{crypto.circulatingSupply}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      crypto.changeColor === 'text-green-600' 
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                        : 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400'
                    }`}>
                      {crypto.change24h}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Prices;
