import React from 'react';

interface StatBoxProps {
  icon: string;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: { value: string; direction: 'up' | 'down' | 'stable' };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export const StatBox: React.FC<StatBoxProps> = ({
  icon,
  title,
  value,
  subtitle,
  trend,
  color = 'blue',
}) => {
  const colorMap = {
    blue: 'border-blue-200 bg-blue-50',
    green: 'border-green-200 bg-green-50',
    purple: 'border-purple-200 bg-purple-50',
    orange: 'border-orange-200 bg-orange-50',
    red: 'border-red-200 bg-red-50',
  };

  const trendIcon = {
    up: '📈',
    down: '📉',
    stable: '➡️',
  };

  return (
    <div className={`border ${colorMap[color]} rounded-xl p-6 hover:shadow-lg transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-gray-900">{value}</p>
            {trend && (
              <span className="text-sm font-semibold text-green-600">
                {trendIcon[trend.direction]} {trend.value}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500 mt-2">{subtitle}</p>}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

