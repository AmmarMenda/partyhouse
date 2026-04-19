import { useState, useEffect, useRef } from "react";
import { Search, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const scrollContainerRef = useRef(null);

  const fetchEvents = async (query = "") => {
    setIsSearching(true);
    try {
      const url = query
        ? `https://partyhouse-0due.onrender.com/api/events?search=${query}`
        : `https://partyhouse-0due.onrender.com/api/events`;

      const response = await fetch(url);
      const data = await response.json();

      if (Array.isArray(data)) {
        setEvents(data);
        setAnimationKey(prev => prev + 1); // Trigger animation
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setSubmittedSearch(searchTerm);
    fetchEvents(searchTerm);
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black">
      {/* Top Bar */}
      <nav className="bg-white border-b-4 border-black p-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center w-full">
          <div className="flex justify-start">
             {/* Left spacer to balance the grid for perfect centering */}
          </div>
          
          <div className="flex justify-center items-center min-w-max" style={{ gap: "64px" }}>
            <img 
              src="/ticket.png" 
              alt="Logo" 
              className="w-auto"
              style={{ height: "48px" }}
            />
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none whitespace-nowrap">
              PARTYHOUSE
            </h1>
          </div>
          
          <div className="flex justify-end items-center min-w-max">
            <SignedOut>
              <div className="flex gap-4 md:gap-10">
                <SignInButton mode="modal">
                  <button className="bg-white border-4 border-black px-6 md:px-12 py-3 md:py-5 font-black uppercase hover:bg-black hover:text-white transition-colors brutalist-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-sm md:text-xl">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-black text-white border-4 border-black px-6 md:px-12 py-3 md:py-5 font-black uppercase hover:bg-white hover:text-black transition-colors brutalist-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none text-sm md:text-xl">
                    Join
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="border-4 border-black brutalist-shadow-sm rounded-full overflow-hidden w-[48px] h-[48px] md:w-[64px] md:h-[64px] flex items-center justify-center bg-white cursor-pointer hover:scale-105 transition-transform">
                <UserButton afterSignOutUrl="/"/>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>

      {/* Hero / Search */}
      <header className="bg-white border-b-8 border-black py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-16 tracking-tighter">
            FIND YOUR <br />
            <span className="bg-yellow-400 px-4 py-2 border-4 border-black brutalist-shadow inline-block mt-6">EXPERIENCE</span>
          </h2>
          
          <form onSubmit={handleSearch} className="relative max-w-5xl mx-auto mt-20">
            <div className={`flex border-8 border-black bg-white brutalist-shadow transition-all ${isSearching ? 'opacity-50' : ''}`}>
              <div className="flex-1 flex items-center px-8 border-r-8 border-black">
                <Search className="text-black w-8 h-8 mr-6" />
                <input
                  type="text"
                  placeholder="SEARCH EVENTS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-6 font-black uppercase focus:outline-none placeholder:text-gray-400 bg-transparent text-2xl md:text-3xl"
                />
              </div>
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-black text-white px-12 md:px-16 py-6 font-black uppercase hover:bg-yellow-400 hover:text-black transition-colors text-2xl md:text-3xl active:bg-yellow-500"
              >
                {isSearching ? '...' : 'GO'}
              </button>
            </div>
          </form>
        </div>
      </header>

      {/* Events Sections */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h3 className="text-5xl font-black uppercase tracking-tight italic">
              {submittedSearch ? `Results for: ${submittedSearch}` : 'Upcoming Events'}
            </h3>
            <div className="h-3 w-48 bg-black mt-2"></div>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll("left")}
              className="bg-white border-4 border-black p-4 hover:bg-yellow-400 transition-colors brutalist-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Previous events"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="bg-white border-4 border-black p-4 hover:bg-yellow-400 transition-colors brutalist-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              aria-label="Next events"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div 
          key={animationKey}
          ref={scrollContainerRef}
          className={`flex gap-10 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth px-2 ${animationKey > 0 ? 'animate-brutalist-slide' : ''}`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="flex-none w-[350px] md:w-[450px] snap-start"
              >
                <div className="bg-white border-4 border-black brutalist-shadow-hover h-full flex flex-col transition-transform">
                  <div className="h-72 bg-gray-200 border-b-4 border-black relative overflow-hidden group">
                    <img 
                      src={event.image_url || `https://picsum.photos/seed/${event.id}/800/600`} 
                      alt={event.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
                    />
                    <div className="absolute top-6 left-6 bg-yellow-400 border-2 border-black px-3 py-1 font-black uppercase text-sm tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {event.category || "LIVE"}
                    </div>
                  </div>
                  
                  <div className="p-10 flex-grow flex flex-col bg-white">
                    <h4 className="text-4xl font-black uppercase mb-8 leading-none tracking-tighter">
                      {event.title}
                    </h4>
                    
                    <div className="space-y-4 mb-10">
                      <div className="flex items-center font-bold uppercase text-base tracking-tight">
                        <Calendar className="w-6 h-6 mr-4 text-gray-500" />
                        <span>
                          {new Date(event.date).toLocaleDateString(undefined, {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center font-bold uppercase text-base tracking-tight">
                        <MapPin className="w-6 h-6 mr-4 text-gray-500" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto flex justify-between items-center pt-8 border-t-8 border-black">
                      <span className="text-4xl font-black italic tracking-tighter">
                        {event.price === 0 || event.price === "Free"
                          ? "FREE"
                          : `$${event.price}`}
                      </span>
                      <button className="bg-black text-white border-4 border-black px-8 py-4 font-black uppercase text-base hover:bg-yellow-400 hover:text-black transition-all brutalist-shadow-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                        TICKETS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full py-24 text-center border-8 border-black border-dashed bg-white">
              <p className="text-3xl font-black uppercase italic tracking-widest text-gray-400">
                {submittedSearch ? `No matches for "${submittedSearch}"` : 'No events available'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer / Info Section */}
      <footer className="bg-black text-white py-24 px-6 border-t-[16px] border-yellow-400 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-7xl font-black uppercase italic mb-10 tracking-tighter">STAY LOUD.</h2>
          <p className="text-2xl font-bold uppercase text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            The premier platform for finding DIY shows, underground galleries, and high-energy house parties.
          </p>
          <div className="pt-12 border-t-4 border-white/20 inline-block px-20">
             <p className="text-base font-black uppercase mb-2 tracking-widest">© 2026 PARTY HOUSE</p>
             <p className="text-sm font-bold uppercase text-gray-500">ALL RIGHTS RESERVED</p>
          </div>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default App;

