import React from 'react';

interface CardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, icon, children, action, footer }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-3">
          {icon && <span className="text-2xl">{icon}</span>}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5">{children}</div>

      {/* Footer */}
      {(action || footer) && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          {action && (
            <button
              onClick={action.onClick}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm"
            >
              {action.label}
            </button>
          )}
          {footer && <div className="text-sm text-gray-600">{footer}</div>}
        </div>
      )}
    </div>
  );
};

