import { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Ticket } from "lucide-react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url = searchTerm
          ? `http://localhost:3000/api/events?search=${searchTerm}`
          : `http://localhost:3000/api/events`;

        const response = await fetch(url);
        const data = await response.json();

        if (Array.isArray(data)) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchEvents();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <Ticket /> Evently
          </h1>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
            Sign In
          </button>
        </div>
      </nav>

      <header className="bg-indigo-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Find your next unforgettable experience
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, artists, or venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium transition">
              Search
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          Upcoming Events
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gray-200 w-full"></div>
              <div className="p-5">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h4>
                <div className="flex items-center text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {new Date(event.date).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="font-bold text-indigo-600">
                    {event.price === 0 || event.price === "Free"
                      ? "Free"
                      : `$${event.price}`}
                  </span>
                  <button className="text-indigo-600 font-medium hover:text-indigo-800">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
