import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { UploadDialog } from "./_components/upload-dialog";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function RentalListings() {
  const images = await getMyImages();
  
  return (
    <div className="relative">
      {/* Enhanced rental header section */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 mb-8">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Your Rental Properties</h2>
            <p className="text-emerald-100">Manage your listings and grow your rental business</p>
          </div>
          <UploadDialog />
        </div>
      </div>
      
      {/* Enhanced rental grid layout */}
      <div className="px-6 pb-12">
        {images.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-12 max-w-md mx-auto border border-gray-200 shadow-sm">
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No properties listed yet</h3>
              <p className="text-gray-500">Start earning by adding your first rental property</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {images.map((image, index) => (
              <div 
                key={image.id} 
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Property image container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={`Rental Property ${image.id}`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  
                  {/* Status badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg">
                    Available
                  </div>
                  
                  {/* Price badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm text-white text-sm font-bold rounded-lg">
                    ${(Math.floor(Math.random() * 500) + 100)}/night
                  </div>
                  
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Property details overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                        Luxury Property #{image.id}
                      </h3>
                      <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md mb-3">
                        Beautiful {Math.floor(Math.random() * 3) + 2} bedroom property in prime location
                      </p>
                      
                      {/* Property features */}
                      <div className="flex items-center gap-4 text-white text-xs mb-4">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                          </svg>
                          {Math.floor(Math.random() * 3) + 2} bed
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                          </svg>
                          {Math.floor(Math.random() * 2) + 1} bath
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          Downtown
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-2 mt-2">
                        <button className="flex-1 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-colors duration-200 border border-white/30">
                          View Details
                        </button>
                        <button className="flex-1 px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg text-white text-sm font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 shadow-lg">
                          Book Now
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
                      <span className="text-sm text-gray-600 font-medium">4.9 (24)</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last booked 2 days ago
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      <SignedOut>
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
          {/* Rental-themed background image */}
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
              }}
            ></div>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/60"></div>
            {/* Gradient overlay with rental theme colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-teal-900/30 to-cyan-900/40"></div>
          </div>
          
          {/* Floating background elements */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-32 right-32 w-48 h-48 bg-teal-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-cyan-400/10 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          {/* Content Card */}
          <div className="relative z-20 text-center bg-white/10 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20 max-w-lg mx-4">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 backdrop-blur-sm rounded-full mx-auto mb-8 flex items-center justify-center border border-white/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Welcome to RentHub</h1>
            <p className="text-emerald-100 mb-8 leading-relaxed text-lg drop-shadow-md">
              Sign in to manage your rental properties, track bookings, and grow your hospitality business
            </p>
            <div className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
              Sign In to Start Earning
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div className="text-white/80">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs">Properties</div>
              </div>
              <div className="text-white/80">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-xs">Occupancy</div>
              </div>
              <div className="text-white/80">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-xs">Rating</div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="flex justify-center mt-6 space-x-2">
              <div className="w-2 h-2 bg-emerald-400/40 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-teal-400/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </SignedOut>
      
      <SignedIn>
        <div className="relative overflow-hidden">
          {/* Rental business dashboard banner */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 py-16">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20"></div>
            
            {/* Animated background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
            </div>
            
            <div className="relative text-center text-white max-w-4xl mx-auto px-6">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                Welcome Back, Host!
              </h1>
              <p className="text-xl md:text-2xl text-emerald-100 font-light leading-relaxed mb-6">
                Your rental empire awaits – manage properties, track earnings, and delight guests
              </p>
              
              {/* Dashboard stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold">$12,450</div>
                  <div className="text-sm text-emerald-100">This Month</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold">87%</div>
                  <div className="text-sm text-emerald-100">Occupied</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-emerald-100">Bookings</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold">4.8★</div>
                  <div className="text-sm text-emerald-100">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
          
          <RentalListings />
        </div>
      </SignedIn>
    </main>
  );
}