import React from 'react';
import { Page, type Product, type Platform } from '../types';
import { AddProductIcon, DashboardIcon, PricingIcon, CheckCircleIcon, ExploreIcon, SettingsIcon } from '../constants';

interface DashboardProps {
  products: Product[];
  platforms: Platform[];
  onNavigate: (page: Page) => void;
  isChecklistDismissed: boolean;
  onDismissChecklist: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200/80 flex items-center space-x-4 transition hover:bg-gray-50 hover:shadow-blue-500/10">
        <div className="bg-gray-100 p-3 rounded-lg">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="bg-white border border-gray-200/80 rounded-lg p-4 flex flex-col gap-3">
        <div className="flex items-center gap-4">
            <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1">
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
            </div>
        </div>
        <div className="border-t border-gray-200 pt-3 flex flex-col gap-2 text-sm">
            <div className="flex justify-between items-center">
                <span className="text-gray-500">Price</span>
                <span className="font-mono text-gray-700">${product.price.toFixed(2)}</span>
            </div>
             <div className="flex justify-between items-center">
                <span className="text-gray-500">Stock</span>
                <span className="font-mono text-gray-700">{product.quantity} units</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.platforms.length > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {product.platforms.length > 0 ? `Live on ${product.platforms.length} platform(s)` : 'Draft'}
                </span>
            </div>
        </div>
    </div>
);

const ProductRow: React.FC<{ product: Product }> = ({ product }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="p-4 flex items-center">
            <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover mr-4" />
            <div>
                <p className="font-semibold text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
            </div>
        </td>
        <td className="p-4 text-lg font-mono text-gray-700">${product.price.toFixed(2)}</td>
        <td className="p-4 text-gray-700">{product.quantity}</td>
        <td className="p-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${product.platforms.length > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {product.platforms.length > 0 ? `Live on ${product.platforms.length} platform(s)` : 'Draft'}
            </span>
        </td>
    </tr>
);

const GettingStarted: React.FC<{
    platforms: Platform[];
    products: Product[];
    onNavigate: (page: Page) => void;
    onDismiss: () => void;
}> = ({ platforms, products, onNavigate, onDismiss }) => {
    const hasLinkedPlatform = platforms.some(p => p.isLinked);
    const hasAddedProduct = products.length > 0;
    
    const checklist = [
        { id: 'connect', title: 'Connect your first platform', isDone: hasLinkedPlatform, page: Page.Settings, icon: <SettingsIcon/> },
        { id: 'add', title: 'Add your first product', isDone: hasAddedProduct, page: Page.AddProduct, icon: <AddProductIcon/> },
        { id: 'explore', title: 'Explore the marketplace', isDone: false, page: Page.Explore, icon: <ExploreIcon/> },
    ];
    
    if (hasLinkedPlatform && hasAddedProduct) return null;

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-lg p-4 md:p-6 relative">
            <button onClick={onDismiss} className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 transition-colors">&times;</button>
            <h2 className="text-xl font-bold text-blue-900 mb-4">Your Setup Guide</h2>
            <div className="space-y-3">
                {checklist.map(item => (
                    <button key={item.id} onClick={() => onNavigate(item.page)} className={`w-full text-left p-3 rounded-lg flex items-center gap-4 transition-all ${item.isDone ? 'bg-gray-200 text-gray-500 line-through' : 'bg-white hover:bg-blue-100 border border-gray-200'}`}>
                       {item.isDone ? <CheckCircleIcon className="w-6 h-6 text-green-400"/> : <div className="w-6 h-6 flex-shrink-0 text-gray-500">{item.icon}</div>}
                        <span className="flex-1 font-medium">{item.title}</span>
                         {!item.isDone && <span className="text-xs text-blue-600 font-bold">START</span>}
                    </button>
                ))}
            </div>
        </div>
    )
};


const Dashboard: React.FC<DashboardProps> = ({ products, platforms, onNavigate, isChecklistDismissed, onDismissChecklist }) => {
  const linkedPlatformsCount = platforms.filter(p => p.isLinked).length;
  const totalSales = 1250.50; // Mock data
  const user = {
    name: 'Maria Dela Cruz',
    avatarUrl: `https://i.pravatar.cc/150?u=maria_delacruz`,
    plan: 'Premium',
  };

  return (
    <div className="space-y-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
             <div className="flex items-center gap-4">
                <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full border-2 border-blue-500 p-1 object-cover" />
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back,</h1>
                    <p className="text-xl sm:text-2xl font-semibold text-gray-600 -mt-1">{user.name}!</p>
                    <span className="mt-1 inline-block text-xs font-semibold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">{user.plan} Plan</span>
                </div>
            </div>
            <button
                onClick={() => onNavigate(Page.AddProduct)}
                className="flex items-center justify-center w-full sm:w-auto gap-2 bg-blue-600 text-white font-semibold px-5 py-3 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 shrink-0"
            >
                <AddProductIcon className="w-5 h-5"/>
                Add New Product
            </button>
        </div>

        {!isChecklistDismissed && (
             <GettingStarted platforms={platforms} products={products} onNavigate={onNavigate} onDismiss={onDismissChecklist}/>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Products" value={products.length} icon={<DashboardIcon className="text-blue-500"/>} />
            <StatCard title="Linked Platforms" value={`${linkedPlatformsCount}`} icon={<DashboardIcon className="text-green-500"/>} />
            <StatCard title="Total Sales" value={`$${totalSales.toLocaleString()}`} icon={<PricingIcon className="text-yellow-500"/>} />
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200/80">
            <h2 className="text-xl font-bold text-gray-900 p-4 md:p-6 border-b border-gray-200">Recent Products</h2>
             {products.length === 0 ? (
                 <div className="text-center py-12 text-gray-500">
                    <p>No products yet.</p>
                    <button onClick={() => onNavigate(Page.AddProduct)} className="mt-2 text-blue-600 font-semibold hover:underline">Add your first product</button>
                 </div>
             ) : (
                <>
                 {/* Mobile List */}
                <div className="md:hidden p-4 space-y-4">
                    {products.slice(0, 4).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                            <tr>
                                <th className="p-4 font-semibold">Product</th>
                                <th className="p-4 font-semibold">Price</th>
                                <th className="p-4 font-semibold">Stock</th>
                                <th className="p-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.slice(0, 4).map(product => (
                                <ProductRow key={product.id} product={product} />
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
             )}
        </div>
    </div>
  );
};

export default Dashboard;