import React from 'react';

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

const PricingCard: React.FC<{
  tier: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
}> = ({ tier, price, description, features, isFeatured = false }) => (
  <div className={`p-8 rounded-2xl shadow-lg transition-all duration-300 ${isFeatured ? 'bg-blue-600 text-white md:transform md:scale-105' : 'bg-white border border-gray-200/80'}`}>
    <h3 className="text-2xl font-bold">{tier}</h3>
    <p className={`mt-2 ${isFeatured ? 'text-blue-200' : 'text-gray-500'}`}>{description}</p>
    <p className="mt-6">
      <span className="text-5xl font-extrabold">{price}</span>
      <span className={`text-lg ml-1 ${isFeatured ? 'text-blue-200' : 'text-gray-500'}`}>/month</span>
    </p>
    <button className={`w-full py-3 mt-8 font-semibold rounded-lg transition-colors duration-200 ${isFeatured ? 'bg-white text-blue-600 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-500'}`}>
      Choose Plan
    </button>
    <ul className="mt-8 space-y-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckIcon />
          <span className="ml-3">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in text-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Flexible Pricing for Every Seller</h1>
      <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Choose a plan that scales with your business. No hidden fees, cancel anytime.</p>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        <PricingCard
          tier="Basic"
          price="$29"
          description="For new sellers getting started."
          features={[
            'Up to 50 products',
            'Connect 2 platforms',
            'Basic analytics',
            'Email support'
          ]}
        />
        <PricingCard
          tier="Premium"
          price="$79"
          description="For growing businesses and power sellers."
          features={[
            'Unlimited products',
            'Connect all platforms',
            'AI SEO Assistant',
            'Advanced analytics & reports',
            'Priority support'
          ]}
          isFeatured={true}
        />
        <PricingCard
          tier="Enterprise"
          price="Custom"
          description="For large agencies and brands."
          features={[
            'White-label solution',
            'Dedicated account manager',
            'Custom integrations',
            'API access'
          ]}
        />
      </div>
       <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900">Success-Based Pricing</h3>
          <p className="text-gray-500 mt-2">Prefer to pay as you go? We can also partner with you for a small percentage of sales generated through our platform. <a href="#" className="text-blue-600 font-semibold hover:underline">Contact us</a> for more details.</p>
        </div>
    </div>
  );
};

export default Pricing;