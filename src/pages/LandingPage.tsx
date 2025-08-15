
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Track Your Crypto
            <br />
            Calculate Your Taxes
            <br />
            <span className="text-orange-500">Automatically</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            Connect your wallets and exchanges, track your assets automatically, and generate accurate tax reports with ease. Take control of your crypto finances.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 text-xl font-semibold"
              onClick={() => navigate('/auth')}
            >
              Get started
            </Button>
            <Button variant="ghost" size="lg" className="text-gray-700 hover:text-gray-900 px-8 py-4 text-xl underline">
              See How It Works →
            </Button>
          </div>
          
          <p className="text-lg text-gray-500 mt-6">
            No credit card required • Set up in 2 minutes
          </p>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold mb-4 text-xl">What You Get</p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Everything You Need in One Place
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Stop using spreadsheets and multiple apps. We bring all your crypto 
              information together so you can focus on making smart investment decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon="📋"
              title="Simplified Tax Reporting"
              description="Generate comprehensive tax reports compatible with tax software. Calculate capital gains and losses effortlessly."
              iconBg="bg-orange-500"
            />
            
            <FeatureCard
              icon="📊"
              title="Automatic Portfolio Tracking"
              description="Connect your wallets and exchanges to automatically sync transactions and track your crypto portfolio value in real time."
              iconBg="bg-orange-500"
            />
            
            <FeatureCard
              icon="📈"
              title="Comprehensive Asset Overview"
              description="View all your crypto assets across different wallets and blockchains in one unified dashboard."
              iconBg="bg-orange-500"
            />
            
            <FeatureCard
              icon="🔒"
              title="Secure & Private"
              description="Your financial data matters. We prioritize security and privacy in handling your information."
              iconBg="bg-orange-500"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Slogan Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight">
            Save time.
            <br />
            Save money.
          </h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of crypto investors who trust us with their portfolio tracking and tax reporting.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <span className="font-bold text-gray-900">Kryptools</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Making crypto taxes simple for everyone.
              </p>
              <div className="flex space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Integrations</li>
                <li>Crypto Tax Calculator</li>
                <li>Crypto Portfolio Tracker</li>
                <li>Crypto Profit Calculator</li>
                <li>For Accountants</li>
                <li>For Businesses</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Pricing</li>
                <li>Help & Support</li>
                <li>Crypto Tax Accountants</li>
                <li>Crypto Tax Guide</li>
                <li>Crypto Glossary</li>
                <li>Reviews</li>
                <li>Feedback</li>
                <li>Compare</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Blog</li>
                <li>About</li>
                <li>Partners</li>
                <li>Affiliates</li>
                <li>Media</li>
                <li>Contact Us</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Disclaimer</li>
                <li>Security</li>
                <li>Cookie Preferences</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-500">© 2025 Kryptools. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
