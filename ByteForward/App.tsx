import React, { useState, useCallback, useEffect } from 'react';
import { Page, type Platform, type Product, type ToastType } from './types';
import { INITIAL_PLATFORMS, MOCK_PRODUCTS } from './constants';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AddProduct from './components/AddProduct';
import Explore from './components/Explore';
import Settings from './components/Settings';
import Pricing from './components/Pricing';
import Toast from './components/Toast';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
  const [platforms, setPlatforms] = useState<Platform[]>(INITIAL_PLATFORMS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [toast, setToast] = useState<{ message: string; type: ToastType; visible: boolean }>({ message: '', type: 'success', visible: false });
  
  const [isChecklistDismissed, setChecklistDismissed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('checklistDismissed') || 'false');
    } catch {
      return false;
    }
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(t => ({ ...t, visible: false }));
    }, 4000);
  };

  const handleSetPage = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);
  
  const handlePlatformLinkToggle = (platformId: string) => {
    let platformName = '';
    let isNowLinked = false;
    setPlatforms(prevPlatforms =>
      prevPlatforms.map(p => {
        if (p.id === platformId) {
          platformName = p.name;
          isNowLinked = !p.isLinked;
          return { ...p, isLinked: isNowLinked };
        }
        return p;
      })
    );
    showToast(
      `${isNowLinked ? 'Connected to' : 'Disconnected from'} ${platformName} successfully!`,
      'success'
    );
  };
  
  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const productWithId = { ...newProduct, id: `prod${Date.now()}` };
    setProducts(prevProducts => [productWithId, ...prevProducts]);
    setCurrentPage(Page.Dashboard);
    showToast('Product added successfully!', 'success');
  };

  const handleDismissChecklist = () => {
    setChecklistDismissed(true);
    localStorage.setItem('checklistDismissed', 'true');
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Dashboard:
        return <Dashboard 
                  products={products} 
                  platforms={platforms}
                  onNavigate={handleSetPage} 
                  isChecklistDismissed={isChecklistDismissed}
                  onDismissChecklist={handleDismissChecklist}
               />;
      case Page.AddProduct:
        return <AddProduct onAddProduct={handleAddProduct} platforms={platforms} showToast={showToast} />;
      case Page.Explore:
        return <Explore allProducts={products} allPlatforms={platforms} />;
      case Page.Settings:
        return <Settings platforms={platforms} onLinkToggle={handlePlatformLinkToggle} />;
      case Page.Pricing:
        return <Pricing />;
      default:
        return <Dashboard 
                  products={products} 
                  platforms={platforms}
                  onNavigate={handleSetPage} 
                  isChecklistDismissed={isChecklistDismissed}
                  onDismissChecklist={handleDismissChecklist}
               />;
    }
  };

  return (
    <div className="relative md:flex h-screen bg-gray-50 text-gray-800">
      <Toast 
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
      <Sidebar currentPage={currentPage} onNavigate={handleSetPage} />
      <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto pb-20 md:pb-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;