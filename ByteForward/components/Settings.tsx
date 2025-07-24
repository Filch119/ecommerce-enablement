import React from 'react';
import type { Platform } from '../types';

interface SettingsProps {
  platforms: Platform[];
  onLinkToggle: (platformId: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ platforms, onLinkToggle }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">Connect your accounts to enable automated product listing.</p>
      
      <div className="bg-white rounded-xl shadow-md border border-gray-200/80">
        <h2 className="text-xl font-semibold text-gray-900 p-4 md:p-6 border-b border-gray-200">Platform Integrations</h2>
        <div className="p-4 md:p-6 space-y-4">
          {platforms.map(platform => (
            <div key={platform.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 border border-gray-200/80 p-4 rounded-lg gap-4">
              <div className="flex items-center gap-4">
                {platform.icon}
                <span className="text-lg font-medium text-gray-900">{platform.name}</span>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex-1 text-right sm:text-left">
                    {platform.isLinked ? (
                    <span className="text-sm text-green-600 font-semibold flex items-center justify-end sm:justify-start gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Connected
                    </span>
                    ) : (
                    <span className="text-sm text-gray-500">Not Connected</span>
                    )}
                </div>
                <button
                  onClick={() => onLinkToggle(platform.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 min-w-[110px] text-center ${
                    platform.isLinked 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {platform.isLinked ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;