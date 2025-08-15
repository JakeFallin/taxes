
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

const TaxSummary = () => {
  return (
    <Card className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Tax Summary</CardTitle>
        <Button 
          variant="ghost" 
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          More
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tax Years Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">Tax year</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-900 dark:text-white font-medium">2025</span>
                <Lock size={14} className="text-gray-500 dark:text-gray-400" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 dark:text-white font-medium">2024</span>
                <Lock size={14} className="text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">Gains</h3>
            <div className="space-y-3">
              <div className="text-red-500 dark:text-red-400 font-medium">-NOK 7,242</div>
              <div className="text-red-500 dark:text-red-400 font-medium">-NOK 5,771</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">Income</h3>
            <div className="space-y-3">
              <div className="text-gray-900 dark:text-white font-medium">NOK 0</div>
              <div className="text-gray-900 dark:text-white font-medium">NOK 0</div>
            </div>
          </div>
        </div>

        {/* Tax Estimates Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Estimated Tax Rate</h4>
            <div className="text-gray-900 dark:text-white text-xl font-bold">30%</div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Capital gains tax</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Taxable P&L (Est.)</h4>
            <div className="text-green-600 dark:text-green-400 text-xl font-bold">$1,514.74</div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Unrealized gains</p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Estimated Tax Due</h4>
            <div className="text-orange-600 dark:text-orange-400 text-xl font-bold">$454.42</div>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">Based on current gains</p>
          </div>
        </div>

        {/* Additional Tax Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium mb-3">Short-term vs Long-term</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Short-term gains:</span>
                <span className="text-gray-900 dark:text-white">$892.30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Long-term gains:</span>
                <span className="text-gray-900 dark:text-white">$622.44</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-900 dark:text-white font-medium mb-3">Tax Loss Harvesting</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Potential savings:</span>
                <span className="text-green-600 dark:text-green-400">$136.33</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Harvested losses:</span>
                <span className="text-gray-900 dark:text-white">-$2,174.82</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button 
            variant="outline" 
            className="w-full md:w-auto px-8 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
          >
            Download Tax Reports
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxSummary;
