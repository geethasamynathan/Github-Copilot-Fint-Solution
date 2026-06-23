import { memo } from "react";
import Card from "./Card";

/**
 * SummaryCard Component
 * Display a single summary statistic
 */
const SummaryCard = memo(({ title, count, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    red: "bg-red-50 text-red-600 border-red-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
  };

  return (
    <Card className={`border border-t-4 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 font-medium text-sm uppercase tracking-wide mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold">{count}</p>
        </div>
        {Icon && (
          <div
            className={`p-3 rounded-lg ${colorClasses[color]} bg-opacity-20`}
          >
            <Icon className="w-8 h-8" />
          </div>
        )}
      </div>
    </Card>
  );
});

SummaryCard.displayName = "SummaryCard";

export default SummaryCard;
