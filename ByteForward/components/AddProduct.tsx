import React, { useState, useRef, useEffect } from 'react';
import type { Product, Platform, ToastType } from '../types';
import { generateSeoContent } from '../services/geminiService';
import { SparklesIcon } from '../constants';

interface AddProductProps {
  onAddProduct: (newProduct: Omit<Product, 'id'>) => void;
  platforms: Platform[];
  showToast: (message: string, type: ToastType) => void;
}

const InputField: React.FC<{ label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string; }> = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
        <input id={id} {...props} className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
    </div>
);

const AddProduct: React.FC<AddProductProps> = ({ onAddProduct, platforms, showToast }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [keywords, setKeywords] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync state with the contentEditable div's innerHTML
    if (descriptionRef.current && descriptionRef.current.innerHTML !== description) {
      descriptionRef.current.innerHTML = description;
    }
  }, [description]);


  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };
  
  const handleGenerateSeo = async () => {
    if (!name && !category) {
        setError("Please provide a Product Name and Category first.");
        return;
    }
    setError(null);
    setIsGenerating(true);
    try {
        const suggestion = await generateSeoContent(name, category, keywords);
        setName(suggestion.title);
        // Convert markdown to simple HTML for the editor
        const htmlDescription = suggestion.description
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/^- (.*$)/gm, '<li class="list-disc ml-4">$1</li>')
            .replace(/\n/g, '<br/>');
        setDescription(htmlDescription);
        showToast('AI content generated!', 'success');
    } catch (e: any) {
        const errorMessage = e.message || "An unknown error occurred.";
        setError(errorMessage);
        showToast(errorMessage, 'error');
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !category || !quantity) {
        setError("Name, Price, Category, and Quantity are required.");
        return;
    }
    onAddProduct({
      name,
      description: descriptionRef.current?.innerText || description, // Use plain text for data model
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      category,
      platforms: selectedPlatforms,
      imageUrl: `https://picsum.photos/seed/${name.replace(/\s+/g, '-')}/400/300`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-500 mb-8">Fill in the details below to list a new product across your linked platforms.</p>
        
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="p-4 md:p-8 bg-white rounded-xl shadow-md border border-gray-200/80 space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-4">Product Details</h2>
                <InputField label="Product Name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Wireless Ergonomic Mouse" />
                <InputField label="Category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Electronics" />
                
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-blue-700 mb-2">Automated SEO Assistant</p>
                    <InputField label="Keywords (optional, comma-separated)" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="e.g. comfortable, gaming, office" />
                    <button
                        type="button"
                        onClick={handleGenerateSeo}
                        disabled={isGenerating}
                        className="mt-3 flex items-center justify-center gap-2 w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                       {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Generating...
                            </>
                        ) : (
                            <>
                                <SparklesIcon />
                                Generate Title & Description with AI
                            </>
                        )}
                    </button>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <div 
                        id="description"
                        ref={descriptionRef}
                        contentEditable
                        onInput={(e) => setDescription(e.currentTarget.innerHTML)}
                        className="w-full bg-gray-100 border border-gray-300 rounded-lg p-4 text-gray-900 prose prose-sm min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                    </div>
                     {description.length === 0 && <p className="text-gray-400 mt-2 text-sm pointer-events-none">Your generated or manually written description will appear here. Click to start typing.</p>}
                    <p className="text-xs text-gray-500 mt-1">Tip: Use the AI generator for a great starting point, then click to edit.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <InputField label="Price ($)" id="price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" placeholder="e.g. 49.99" />
                   <InputField label="Quantity" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} type="number" placeholder="e.g. 100" />
                </div>
            </div>

            <div className="p-4 md:p-8 bg-white rounded-xl shadow-md border border-gray-200/80">
                 <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-4 mb-6">Publish to Platforms</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {platforms.map(platform => (
                        <button
                            type="button"
                            key={platform.id}
                            onClick={() => handlePlatformToggle(platform.id)}
                            disabled={!platform.isLinked}
                            className={`p-4 border-2 rounded-lg flex flex-col items-center justify-center gap-2 transition-all duration-200 ${
                                !platform.isLinked ? 'bg-gray-200 cursor-not-allowed opacity-60' : 
                                (selectedPlatforms.includes(platform.id) ? `border-blue-500 bg-blue-50` : 'border-gray-300 hover:border-blue-500')
                            }`}
                        >
                            <div className={`w-8 h-8 flex items-center justify-center`}>{platform.icon}</div>
                            <span className="font-medium text-gray-900">{platform.name}</span>
                            {!platform.isLinked && <span className="text-xs text-gray-500">(Not Connected)</span>}
                        </button>
                    ))}
                 </div>
            </div>
            
            <div className="flex justify-end">
                <button type="submit" className="w-full sm:w-auto bg-orange-500 text-white font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                    Publish Product
                </button>
            </div>
        </form>
    </div>
  );
};

export default AddProduct;