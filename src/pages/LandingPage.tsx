
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {t('landing.hero.line1')}
            <br />
            {t('landing.hero.line2')}
            <br />
            <span className="text-orange-500">{t('landing.hero.auto')}</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('landing.hero.desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-6">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-16 py-5 text-2xl font-semibold"
              onClick={() => navigate('/auth')}
            >
              {t('landing.hero.cta')}
            </Button>
            <Button variant="ghost" size="lg" className="text-[#132549] hover:text-[#132549] px-16 py-5 text-2xl underline">
              {t('landing.hero.how')}
            </Button>
          </div>
          
          <p className="text-lg text-gray-500 mt-6">
            {t('landing.hero.badge')}
          </p>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-orange-500 font-semibold mb-4 text-xl">{t('landing.whatYouGet')}</p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('landing.everythingTitle')}
            </h2>
            <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t('landing.everythingDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon="📋"
              title={t('landing.feature.tax.title')}
              description={t('landing.feature.tax.desc')}
              iconBg="bg-orange-500"
            />
            
            <FeatureCard
              icon="📊"
              title={t('landing.feature.tracking.title')}
              description={t('landing.feature.tracking.desc')}
              iconBg="bg-orange-500"
            />
            
            <FeatureCard
              icon="📈"
              title={t('landing.feature.overview.title')}
              description={t('landing.feature.overview.desc')}
              iconBg="bg-orange-500"
            />
            
            <FeatureCard
              icon="🔒"
              title={t('landing.feature.secure.title')}
              description={t('landing.feature.secure.desc')}
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
            {t('landing.slogan.line1')}
         
          </h2>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-orange-500 mb-6 leading-tight">
            
            {t('landing.slogan.line2')}
          </h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
            {t('landing.slogan.desc')}
          </p>
        </div>
      </section>

    
    </div>
  );
};

export default LandingPage;
