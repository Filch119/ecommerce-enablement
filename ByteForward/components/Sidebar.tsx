import React from 'react';
import { Page } from '../types';
import { DashboardIcon, AddProductIcon, ExploreIcon, SettingsIcon, PricingIcon, LogoIcon } from '../constants';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  page: Page;
  currentPage: Page;
  onNavigate: (page: Page) => void;
}> = ({ icon, label, page, currentPage, onNavigate }) => {
  const isActive = currentPage === page;
  return (
    <li className="flex-1 md:flex-none">
      <button
        onClick={() => onNavigate(page)}
        className={`flex flex-col md:flex-row items-center justify-center md:justify-start w-full h-full md:h-auto p-1 md:p-3 md:my-1 rounded-none md:rounded-lg transition-all duration-200 ${
          isActive
            ? 'text-blue-600 md:bg-blue-600 md:text-white md:shadow-lg'
            : 'text-gray-500 hover:bg-blue-100 hover:text-blue-600'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        {icon}
        <span className="ml-0 md:ml-4 mt-1 md:mt-0 text-xs text-center md:text-base font-medium">{label}</span>
      </button>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-50 md:relative h-16 md:h-screen md:w-64 bg-white/80 backdrop-blur-sm flex md:flex-col border-t border-gray-200/80 md:border-t-0 md:border-r md:border-gray-200">
      <div className="hidden md:flex items-center mb-10 p-2">
        <LogoIcon className="w-8 h-8 text-blue-600" />
        <h1 className="text-xl font-bold ml-3 text-gray-900">OmniSell</h1>
      </div>
      <nav className="flex-1 w-full">
        <ul className="flex flex-row justify-around items-center h-full md:flex-col md:items-stretch md:justify-start">
          <NavItem icon={<DashboardIcon className="w-5 h-5"/>} label="Dashboard" page={Page.Dashboard} currentPage={currentPage} onNavigate={onNavigate} />
          <NavItem icon={<AddProductIcon className="w-5 h-5"/>} label="Add Product" page={Page.AddProduct} currentPage={currentPage} onNavigate={onNavigate} />
          <NavItem icon={<ExploreIcon className="w-5 h-5"/>} label="Explore" page={Page.Explore} currentPage={currentPage} onNavigate={onNavigate} />
          <NavItem icon={<SettingsIcon className="w-5 h-5"/>} label="Settings" page={Page.Settings} currentPage={currentPage} onNavigate={onNavigate} />
          <NavItem icon={<PricingIcon className="w-5 h-5"/>} label="Pricing" page={Page.Pricing} currentPage={currentPage} onNavigate={onNavigate} />
        </ul>
      </nav>
      <div className="hidden md:block mt-auto p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-sm text-gray-600">© 2024 OmniSell Inc.</p>
        <p className="text-xs text-gray-500 mt-1">Unifying Commerce.</p>
      </div>
    </aside>
  );
};

export default Sidebar;