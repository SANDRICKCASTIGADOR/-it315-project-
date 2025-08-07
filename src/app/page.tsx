import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UploadDialog } from "./_components/upload-dialog";
import { getMyImages } from "~/server/queries";
import { ImageModal } from "./_components/image-modal";

export const dynamic = "force-dynamic";

async function PropertyListings() {
  const images = await getMyImages();
  
  return (
    <div className="relative">
      {/* Enhanced property sales header section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 mb-8">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative flex justify-between items-center">
          <div>
           <h2 className="text-3xl font-bold text-white mb-2">Explore Available Properties</h2>
             <p className="text-blue-100">Browse listings and discover your future home</p>
          </div>
          <UploadDialog />
        </div>
      </div>
      
      {/* Enhanced property grid layout */}
      <div className="px-6 pb-12">
        {images.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 max-w-md mx-auto border border-gray-200 shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No properties found</h3>
                <p className="text-gray-500">Check back soon or explore other listings available now</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {images.map((image, index) => (
              <ImageModal key={image.id} image={image}>
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  {/* Property image container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={`House for Sale ${image.id}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Status badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
                      For Sale
                    </div>
                    
                   {/* Price badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm font-bold rounded-lg">
                     ₱{(Math.floor(Math.random() * 25000000) + 12500000).toLocaleString()}
                    </div>
                    
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Property details overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md mb-3">
                          Stunning {Math.floor(Math.random() * 3) + 3} bedroom home in desirable neighborhood
                        </p>
                        
                        {/* Property features */}
                        <div className="flex items-center gap-4 text-white text-xs mb-4">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                            </svg>
                            {Math.floor(Math.random() * 3) + 3} bed
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                            </svg>
                            {Math.floor(Math.random() * 2) + 2} bath
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2M16 4h2a2 2 0 012 2v2M16 20h2a2 2 0 002-2v-2"></path>
                            </svg>
                            {(Math.floor(Math.random() * 800) + 1200)} sqft
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="flex gap-2 mt-2">
                          <button className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors duration-200 border border-white/30">
                            View Details
                          </button>
                          <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg text-white text-sm font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg">
                            Schedule Tour
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Favorite heart icon */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-white/30 to-white/10 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Property info footer */}
                  <div className="p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600 font-medium">Excellent Location</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Listed {Math.floor(Math.random() * 30) + 1} days ago
                      </div>
                    </div>
                  </div>
                  
                  {/* Image name */}
                  <div className="text-center p-2 bg-gray-50">
                    {image.imageName || image.fileName}
                  </div>
                </div>
              </ImageModal>
            ))}
          </div>
        )}
        
        {/* Your snippet integrated here - Property Stats Modal Content */}
        <div className="hidden">
          {/* This is where your dialog content would be used in the ImageModal component */}
          <div className="flex-1 p-6">
            <div className="DialogHeader">
              <div className="DialogTitle">Property Details</div>
              <div className="DialogDescription">
                {/* Property name would go here */}
                <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                  <div className="text-white/80">
                    <div className="text-2xl font-bold">100+</div>
                    <div className="text-xs">Homes Sold</div>
                  </div>
                  <div className="text-white/80">
                    <div className="text-2xl font-bold">₱1.5M</div>
                    <div className="text-xs">Avg Price</div>
                  </div>
                  <div className="text-white/80">
                    <div className="text-2xl font-bold">4.8★</div>
                    <div className="text-xs">Agent Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SignedOut>
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
          {/* Real estate themed background image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`
              }}
            ></div>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
            {/* Gradient overlay with real estate theme colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40"></div>
          </div>
          
          {/* Floating background elements */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-32 right-32 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/10 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          {/* Content Card */}
          <div className="relative z-20 text-center bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 max-w-lg mx-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-sm rounded-full mx-auto mb-8 flex items-center justify-center border border-white/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
           <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Welcome to HomeHub</h1>
             <p className="text-blue-100 mb-8 leading-relaxed text-lg drop-shadow-md">
                Sign in to browse beautiful properties, save your favorites, and find the perfect place to call home
             </p>
            <div className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                Sign In to Start Exploring
            </div>

            
           {/* Feature highlights - User view */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div className="text-white/80">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs">Listings Available</div>
            </div>
          <div className="text-white/80">
              <div className="text-2xl font-bold">₱500K</div>
              <div className="text-xs">Starting Price</div>
          </div>
          <div className="text-white/80">
             <div className="text-2xl font-bold">4.9★</div>
             <div className="text-xs">User Satisfaction</div>
          </div>
          </div>

            
            {/* Decorative elements */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-blue-400/40 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-indigo-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-purple-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </SignedOut>
      
      <SignedIn>
        <div className="relative overflow-hidden">
          {/* Real estate business dashboard banner */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-16">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div className="relative text-center text-white max-w-4xl mx-auto px-6">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Welcome Back!
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 font-light leading-relaxed mb-6">
                Explore your dream home with ease – browse listings, discover properties, and take the next step toward your future.
              </p>
            </div>
          </div>
          <PropertyListings />
        </div>
      </SignedIn>
    </main>
  );
}