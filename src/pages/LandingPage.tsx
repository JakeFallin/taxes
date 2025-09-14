
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
    <div className="relative min-h-screen bg-gradient-to-b from-orange-50 via-sky-50 to-white dark:from-purple-950 dark:via-gray-900 dark:to-gray-900">
      {/* Decorative gradient blobs (landing page only) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Top center cloud */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-40 h-[600px] w-[1200px] rounded-full bg-orange-300/60 blur-3xl dark:bg-purple-800/50"></div>
        {/* Left mid blotch */}
        <div className="absolute -left-24 top-1/3 h-[460px] w-[460px] rounded-full bg-orange-400/55 blur-2xl dark:bg-purple-700/55"></div>
        {/* Right lower blotch */}
        <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-orange-300/55 blur-2xl dark:bg-purple-900/55"></div>
        {/* Top-right small accent */}
        <div className="absolute right-[-60px] top-0 h-[260px] w-[260px] rounded-full bg-orange-400/50 blur-2xl dark:bg-purple-600/50"></div>
        {/* Bottom center wash */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-24 h-[520px] w-[980px] rounded-full bg-orange-200/55 blur-3xl dark:bg-purple-800/55"></div>
        {/* Blue swirls to mix with orange (light mode) */}
        <div className="absolute -left-28 -top-10 h-[380px] w-[380px] rounded-full bg-sky-300/50 blur-3xl dark:bg-transparent"></div>
        <div className="absolute right-1/3 top-1/2 -translate-y-1/2 h-[300px] w-[600px] rounded-full rotate-12 bg-sky-200/45 blur-3xl dark:bg-transparent"></div>
        <div className="absolute left-0 bottom-10 h-[260px] w-[420px] rounded-full -rotate-6 bg-blue-200/40 blur-3xl dark:bg-transparent"></div>
        {/* Extra splotchy overlays for more texture (light mode) */}
        <div className="absolute left-1/4 top-20 h-[420px] w-[420px] blur-[110px] opacity-60 mix-blend-multiply dark:opacity-0 bg-[radial-gradient(closest-side,rgba(251,146,60,0.5),transparent)]"></div>
        <div className="absolute right-1/5 top-24 h-[480px] w-[520px] blur-[120px] opacity-55 mix-blend-multiply dark:opacity-0 bg-[radial-gradient(closest-side,rgba(56,189,248,0.45),transparent)]"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/3 h-[820px] w-[820px] blur-[120px] opacity-55 dark:opacity-30 bg-[conic-gradient(from_200deg_at_50%_50%,rgba(251,146,60,0.35),rgba(168,85,247,0.25),rgba(56,189,248,0.25),rgba(251,146,60,0.35))]"></div>
      </div>
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {t('landing.hero.title.before')} <span className="text-orange-500">{t('landing.hero.title.highlight')}</span> {t('landing.hero.title.after')}
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
              {t('landing.hero.ctaFree')}
            </Button>
            <Button variant="ghost" size="lg" className="text-[#132549] hover:text-[#132549] px-16 py-5 text-2xl underline">
              {t('landing.hero.how')}
            </Button>
          </div>
          
          
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
              icon="📈"  
              title={t('landing.feature.tracking.title')}
              description={t('landing.feature.tracking.desc')}
              iconBg="bg-orange-500"
            />
            
            <FeatureCard
              icon="🔄"            
              title={t('landing.feature.overview.title')}
              description={t('landing.feature.overview.desc')}
              iconBg="bg-orange-500"
            />
            
            <FeatureCard
              icon="📈"
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
            Mer enn bare en
          </h2>
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-orange-500 mb-6 leading-tight">
            skattekalkulator.
          </h2>
          <p className="text-2xl text-gray-600 max-w-2xl mx-auto mb-6">
            {t('landing.bottom.question')}
          </p>
          <div className="mt-4">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-16 py-5 text-2xl font-semibold"
              onClick={() => navigate('/auth')}
            >
              {t('landing.hero.ctaFree')}
            </Button>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default LandingPage;
