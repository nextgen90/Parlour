import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import AIChatWidget from './components/AIChatWidget';
import { Menu, X } from 'lucide-react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBookClick = () => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname === '/') {
      const bookingElem = document.getElementById('booking');
      if (bookingElem) {
        bookingElem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#booking';
    }
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    setIsMobileMenuOpen(false);
    if (window.location.pathname === '/') {
      e.preventDefault();
      const testElem = document.getElementById('testimonials');
      if (testElem) {
        testElem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/#testimonials';
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[var(--color-bg-deep)]">
        <header className="sticky top-0 z-50 bg-black/95 border-b border-white/10 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 md:h-20">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" onClick={closeMobileMenu} className="text-lg md:text-2xl font-headline font-bold text-[var(--color-tertiary)] uppercase tracking-wider">
                  BEAUTY SALON
                </Link>
              </div>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-8">
                <Link to="/" className="text-white hover:text-[var(--color-tertiary)] px-3 py-2 text-sm font-medium uppercase tracking-widest transition-colors">Home</Link>
                <Link to="/services" className="text-white hover:text-[var(--color-tertiary)] px-3 py-2 text-sm font-medium uppercase tracking-widest transition-colors">Services</Link>
                <Link to="/#testimonials" onClick={handleAboutClick} className="text-white hover:text-[var(--color-tertiary)] px-3 py-2 text-sm font-medium uppercase tracking-widest transition-colors">About</Link>
                <Link to="/gallery" className="text-white hover:text-[var(--color-tertiary)] px-3 py-2 text-sm font-medium uppercase tracking-widest transition-colors">Gallery</Link>
              </nav>
              
              <div className="hidden md:block">
                <button 
                  onClick={handleBookClick}
                  className="bg-[var(--color-tertiary)] text-black px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors duration-300"
                >
                  Book Appointment
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-3">
                <button 
                  onClick={handleBookClick}
                  className="bg-[var(--color-tertiary)] text-black px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
                >
                  Book
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white p-2 focus:outline-none"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black/95 border-b border-white/10 backdrop-blur-md z-40 shadow-xl">
              <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
                <Link to="/" onClick={closeMobileMenu} className="text-white hover:text-[var(--color-tertiary)] block px-3 py-4 text-base font-medium uppercase tracking-widest border-b border-white/5">Home</Link>
                <Link to="/services" onClick={closeMobileMenu} className="text-white hover:text-[var(--color-tertiary)] block px-3 py-4 text-base font-medium uppercase tracking-widest border-b border-white/5">Services</Link>
                <Link to="/#testimonials" onClick={handleAboutClick} className="text-white hover:text-[var(--color-tertiary)] block px-3 py-4 text-base font-medium uppercase tracking-widest border-b border-white/5">About</Link>
                <Link to="/gallery" onClick={closeMobileMenu} className="text-white hover:text-[var(--color-tertiary)] block px-3 py-4 text-base font-medium uppercase tracking-widest">Gallery</Link>
              </div>
            </div>
          )}
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>

        <footer className="bg-black py-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl font-headline font-bold text-[var(--color-tertiary)] mb-4">BEAUTY SALON</h3>
            <p className="text-sm text-gray-500 uppercase tracking-widest">&copy; {new Date().getFullYear()} Beauty Salon. All rights reserved.</p>
          </div>
        </footer>
        <AIChatWidget />
      </div>
    </Router>
  );
}

export default App;
