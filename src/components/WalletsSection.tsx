
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const WalletsSection = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Wallets</h2>
      
      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">₿</span>
          </div>
          <span className="text-gray-900">Bitcoin (BTC)</span>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400">
            Add Currency
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 hover:text-gray-900 hover:border-gray-400">
            Add Service
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletsSection;
