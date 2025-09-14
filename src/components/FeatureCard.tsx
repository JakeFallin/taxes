

import { Activity, FileText, Shield, Lock, TrendingUp, PieChart, BarChart3 } from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  iconBg: string;
}

const iconMap = {
  // Map to icons that match the screenshot: document, pie/clock, bars, shield/lock
  "📋": FileText,
  "📊": BarChart3,
  "📈": PieChart,
  "🔒": Shield,
};

const FeatureCard = ({ icon, title, description, iconBg }: FeatureCardProps) => {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Activity;
  
  return (
    <a href="#" className="block bg-white rounded-2xl p-8 shadow-sm border border-gray-100 transition-transform hover:scale-[1.02] focus:scale-[1.02] focus:outline-none">
      <div className="flex items-start space-x-6">
        <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className="text-white" size={28} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight">{title}</h3>
          <p className="text-gray-600 leading-relaxed text-base">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default FeatureCard;

