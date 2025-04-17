import TextSummarizer from '@ui/TextSummarizer';
import ProductBrochure from '@ui/ProductBrochure';

function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero section with text summarizer */}
      <TextSummarizer />
      
      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Product Brochure */}
        <div className="mb-8">
          <ProductBrochure />
        </div>
      </div>
    </div>
  );
}

export default Home;