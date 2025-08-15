
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  title: string;
  value: string;
  isPositive?: boolean;
  className?: string;
}

const PortfolioCard = ({ title, value, isPositive, className }: PortfolioCardProps) => {
  return (
    <div className={cn("p-4 rounded-lg border", className)}>
      <p className="text-sm text-black dark:text-gray-400 mb-1 font-medium">{title}</p>
      <p className={cn(
        "text-lg font-semibold text-white dark:text-white",
        isPositive === true && "text-green-600 dark:text-green-400",
        isPositive === false && "text-red-600 dark:text-red-400",
        isPositive === undefined && "text-white dark:text-white"
      )}>
        {value}
      </p>
    </div>
  );
};

export default PortfolioCard;
