import TextSummarizer from '@ui/TextSummarizer';
import ProductBrochure from '@ui/ProductBrochure';
import ContactTerminal from '@ui/ContactTerminal';

function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero section with text summarizer */}
      <TextSummarizer />
      
      {/* Main content */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Product Brochure */}
        <div id="info" className="mb-16 scroll-mt-20">
          <ProductBrochure />
        </div>
      </div>
      
      {/* Simple divider - same style as TextSummarizer */}
      <div className="w-full border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-black h-8"></div>
      
      {/* Contact section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div id="contact" className="mb-8 scroll-mt-20">
          <ContactTerminal />
        </div>
      </div>
    </div>
  );
}

export default Home;