import React, { useState, useMemo } from 'react';
import type { Product, Platform } from '../types';

interface ExploreProps {
  allProducts: Product[];
  allPlatforms: Platform[];
}

const Explore: React.FC<ExploreProps> = ({ allProducts, allPlatforms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProducts, searchTerm]);

  const platformMap = useMemo(() => {
    return allPlatforms.reduce((acc, platform) => {
        acc[platform.id] = platform;
        return acc;
    }, {} as Record<string, Platform>);
  }, [allPlatforms]);

  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Explore the Marketplace</h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Discover unique products from thousands of independent sellers unified on our platform.</p>
      </div>

      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for products or categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-full px-6 py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} 
               className="bg-white border border-gray-200/80 rounded-xl overflow-hidden shadow-md group transition-all duration-300 hover:shadow-blue-500/10 hover:transform hover:-translate-y-1 cursor-pointer"
               onClick={() => setSelectedProduct(product)}>
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-300"></div>
                <div className="absolute top-2 right-2 flex gap-1.5">
                    {product.platforms.map(pId => platformMap[pId] && (
                        <div key={pId} className="w-5 h-5" title={platformMap[pId].name}>{platformMap[pId].icon}</div>
                    ))}
                </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 truncate">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.category}</p>
              <p className="text-xl font-semibold text-blue-600 mt-2">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast" onClick={closeModal}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-4 sm:p-6 m-4" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <p className="text-gray-500 mt-1">${selectedProduct.price.toFixed(2)}</p>
                
                <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="my-4 w-full h-48 sm:h-64 object-cover rounded-lg"/>

                <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                
                <div className="space-y-3">
                    <p className="text-sm font-semibold text-gray-500">View or purchase on:</p>
                    {selectedProduct.platforms.length > 0 ? selectedProduct.platforms.map(pId => {
                        const platform = platformMap[pId];
                        if (!platform) return null;
                        return (
                             <a key={platform.id} href="#" onClick={(e) => { e.preventDefault(); alert(`Redirecting to ${platform.name}... (placeholder)`); }}
                                className={`w-full flex items-center justify-center gap-3 py-3 rounded-lg font-semibold text-white transition-all duration-200 bg-${platform.color} hover:opacity-90`}>
                                {platform.icon}
                                View on {platform.name}
                             </a>
                        )
                    }) : <p className="text-gray-500 text-center py-2">Not available on any platform yet.</p>}
                </div>

                 <button onClick={closeModal} className="mt-6 w-full text-center py-2 text-gray-500 hover:text-gray-800 transition">Close</button>
            </div>
        </div>
      )}
    </div>
  );
};

export default Explore;