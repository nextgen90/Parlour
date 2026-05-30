import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Clock, MapPin, Phone, Sparkles, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import DateTimePicker from '../components/DateTimePicker';

const HERO_SLIDES = [
  {
    image: '/gallery/gallery_hair.png',
    title: 'Experience Professional Beauty Services',
    subtitle: 'Step into a world of pure luxury and bespoke aesthetic treatments designed for your natural radiance.',
    accent: 'Haute Coiffure & Styling'
  },
  {
    image: '/gallery/gallery_facial.png',
    title: 'Advanced Skin Correction & Facials',
    subtitle: 'Deep cellular regeneration and clinical treatments that reveal your skin\'s flawless, youthful glow.',
    accent: 'Advanced Skin Clinic'
  },
  {
    image: '/gallery/gallery_makeup.png',
    title: 'Exquisite Bridal & Makeover Artistry',
    subtitle: 'Make your special moments timeless with our signature high-definition bridal and editorial makeovers.',
    accent: 'Bridal & Special Occasions'
  }
];

const SERVICES = [
  { 
    id: 'hair',
    title: 'Hair Couture & Styling', 
    price: 'From ₹4,999', 
    desc: 'Bespoke cuts, balayage, luxury gloss treatments, and professional extensions designed for you.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=600' 
  },
  { 
    id: 'skin',
    title: 'Advanced Skin Therapy', 
    price: 'From ₹5,999', 
    desc: 'Clinical peels, microdermabrasion, LED light therapy, and bespoke cellular hydration facials.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600' 
  },
  { 
    id: 'makeup',
    title: 'Bridal & Editorial Makeup', 
    price: 'From ₹14,999', 
    desc: 'High-definition airbrush makeup, premium lash integration, and comprehensive trial consultations.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80&w=600' 
  },
];

const TESTIMONIALS = [
  { 
    name: 'Victoria Bennett', 
    role: 'Loyal Client',
    review: 'An absolute masterpiece of a salon. The attention to detail, high-end products, and elite staff make every visit feel like a royal retreat. My hair has never looked or felt better.', 
    rating: 5 
  },
  { 
    name: 'Alexandra Sterling', 
    role: 'Bride',
    review: 'They designed my entire bridal beauty look. The team was phenomenal, keeping me calm and rendering a flawless, high-definition makeup look that lasted beautifully through the entire night.', 
    rating: 5 
  },
  { 
    name: 'Dr. Evelyn Carter', 
    role: 'Aesthetics Enthusiast',
    review: 'Their clinical facials are out of this world. The combination of state-of-the-art technology and deeply relaxing luxury rituals yielded immediate, visible skin correction.', 
    rating: 5 
  }
];

const SERVICE_OPTIONS = [
  'Hair Couture & Styling',
  'Advanced Skin Therapy',
  'Bridal & Editorial Makeup'
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentServiceSlide, setCurrentServiceSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState(() => {
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const serviceParam = params.get('service');
    return {
      name: '',
      phone: '',
      service: (serviceParam && SERVICE_OPTIONS.includes(serviceParam)) ? serviceParam : 'Hair Couture & Styling',
      dateTime: '',
      notes: ''
    };
  });

  // Parse redirect service and smooth scroll logic
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');

    if (window.location.hash === '#booking' || serviceParam) {
      setTimeout(() => {
        const bookingElem = document.getElementById('booking');
        if (bookingElem) {
          bookingElem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentServiceSlide((prev) => (prev + 1) % SERVICES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialSlide((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const nextServiceSlide = () => setCurrentServiceSlide((prev) => (prev + 1) % SERVICES.length);
  const prevServiceSlide = () => setCurrentServiceSlide((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.dateTime) {
      alert('Please fill out all required fields.');
      return;
    }
    setBookingStatus('loading');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          date: formData.dateTime,
          serviceName: formData.service,
          notes: formData.notes
        })
      });
      if (response.ok) {
        setBookingStatus('success');
        setFormData({ name: '', phone: '', service: 'Hair Couture & Styling', dateTime: '', notes: '' });
      } else {
        setBookingStatus('error');
      }
    } catch (err) {
      console.error(err);
      setBookingStatus('error');
    }
  };

  const handleScrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const elem = document.getElementById('booking');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[var(--color-bg-deep)] text-white">
      {/* HERO SLIDER SECTION */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent z-10" />
            <img 
              src={HERO_SLIDES[currentSlide].image} 
              alt={HERO_SLIDES[currentSlide].title} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 z-20 flex items-center pt-20 md:pt-0">
              <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="max-w-3xl"
                >
                  <span className="uppercase tracking-[0.3em] text-xs font-semibold mb-4 inline-flex items-center gap-2 text-[var(--color-secondary)]">
                    <Sparkles size={14} className="text-[var(--color-tertiary)] animate-pulse" /> {HERO_SLIDES[currentSlide].accent}
                  </span>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-headline mb-6 leading-[1.1] text-white">
                    {HERO_SLIDES[currentSlide].title.split(' & ').map((part, i) => (
                      <span key={i} className={i > 0 ? "gold-gradient-text block mt-1" : "block"}>
                        {i > 0 ? `& ${part}` : part}
                      </span>
                    ))}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed">
                    {HERO_SLIDES[currentSlide].subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="#booking" 
                      onClick={handleScrollToBooking}
                      className="px-8 py-4 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] text-black rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition duration-300 shadow-lg shadow-yellow-600/10"
                    >
                      Reserve Appointment
                    </a>
                    <Link to="/services" className="px-8 py-4 border border-white/20 hover:border-[var(--color-tertiary)] hover:text-[var(--color-tertiary)] text-white rounded-sm text-xs font-bold uppercase tracking-[0.2em] transition duration-300">
                      Explore Services
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls */}
        <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 text-white hover:text-[var(--color-tertiary)] border border-white/5 hover:border-[var(--color-tertiary)]/30 transition backdrop-blur-md hidden md:flex items-center justify-center">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 text-white hover:text-[var(--color-tertiary)] border border-white/5 hover:border-[var(--color-tertiary)]/30 transition backdrop-blur-md hidden md:flex items-center justify-center">
          <ChevronRight size={20} />
        </button>

        {/* Slide Progress Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4">
          {HERO_SLIDES.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-[3px] transition-all duration-500 rounded-full ${currentSlide === idx ? 'w-12 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)]' : 'w-4 bg-white/20 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* OUR SERVICES SECTION */}
      <section id="services" className="py-28 bg-[var(--color-bg-deep)] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <span className="uppercase tracking-[0.25em] text-xs font-semibold text-[var(--color-secondary)]">Bespoke Rituals</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mt-4">Our Signature Services</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-[var(--color-tertiary)] to-transparent mx-auto mt-6"></div>
          </div>
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl h-[450px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentServiceSlide}
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
                transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Link 
                  to={`/services#${SERVICES[currentServiceSlide].id}`}
                  className="group cursor-pointer bg-[var(--color-bg-card)] border border-white/5 rounded-xl overflow-hidden shadow-2xl block h-full relative"
                >
                  <div className="h-3/5 w-full relative overflow-hidden">
                    <img 
                      src={SERVICES[currentServiceSlide].image} 
                      alt={SERVICES[currentServiceSlide].title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <span className="absolute bottom-4 left-4 text-[var(--color-tertiary)] font-bold font-headline text-lg bg-black/40 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
                      {SERVICES[currentServiceSlide].price}
                    </span>
                  </div>
                  <div className="h-2/5 p-6 md:p-8 flex flex-col justify-center">
                    <h3 className="text-xl md:text-2xl font-headline font-semibold text-white mb-3 group-hover:text-[var(--color-tertiary)] transition-colors">
                      {SERVICES[currentServiceSlide].title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                      {SERVICES[currentServiceSlide].desc}
                    </p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-tertiary)]/30 rounded-xl transition-colors duration-500 pointer-events-none"></div>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Service Slider Controls */}
            <button onClick={prevServiceSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 text-white hover:text-[var(--color-tertiary)] border border-white/10 transition backdrop-blur-md">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextServiceSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/60 text-white hover:text-[var(--color-tertiary)] border border-white/10 transition backdrop-blur-md">
              <ChevronRight size={20} />
            </button>

            {/* Service Slide Progress Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-3">
              {SERVICES.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentServiceSlide(idx)}
                  className={`h-[3px] transition-all duration-500 rounded-full ${currentServiceSlide === idx ? 'w-8 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)]' : 'w-3 bg-white/30 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="booking" className="py-28 bg-[var(--color-bg-card)] relative border-t border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-primary)]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-tertiary)]/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 items-center relative z-10">
          <div className="lg:w-1/2 relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-primary)] rounded-lg opacity-10 blur-xl group-hover:opacity-20 transition duration-1000"></div>
            <img 
              src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1000" 
              alt="Luxury Parlour Experience" 
              className="w-full h-auto shadow-2xl rounded-lg border border-white/10 relative z-10" 
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <span className="uppercase tracking-[0.25em] text-xs font-semibold text-[var(--color-secondary)]">Secure Your Experience</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mt-4 mb-8">Book An Appointment</h2>
            
            {bookingStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 bg-green-950/20 border border-green-500/30 rounded-lg text-center"
              >
                <ShieldCheck size={48} className="text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Reservation Request Received!</h3>
                <p className="text-sm text-gray-400">Our concierge team will reach out to you shortly to confirm your premium slot.</p>
                <button 
                  onClick={() => setBookingStatus('idle')}
                  className="mt-6 px-6 py-2 border border-green-500/30 text-green-400 hover:bg-green-500/10 rounded-sm text-xs font-bold uppercase tracking-wider transition"
                >
                  Book Another slot
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border-b border-white/20 py-3 bg-transparent text-white focus:outline-none focus:border-[var(--color-tertiary)] transition-colors text-sm" 
                      placeholder="e.g. Catherine Smith" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full border-b border-white/20 py-3 bg-transparent text-white focus:outline-none focus:border-[var(--color-tertiary)] transition-colors text-sm" 
                      placeholder="e.g. +91 98765 43210" 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Highly Premium Custom Dropdown UI */}
                  <div className="relative">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Select Service</label>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full border-b border-white/20 py-3 bg-transparent text-white focus:outline-none focus:border-[var(--color-tertiary)] transition-colors text-sm text-left flex justify-between items-center"
                    >
                      <span>{formData.service}</span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[var(--color-tertiary)]' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 mt-2 bg-[var(--color-bg-card)] border border-white/10 rounded-md shadow-2xl z-30 overflow-hidden"
                        >
                          {SERVICE_OPTIONS.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, service: option });
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-3 text-sm text-left transition-colors hover:bg-[var(--color-tertiary)] hover:text-black flex items-center justify-between ${
                                formData.service === option ? 'text-[var(--color-tertiary)] bg-white/5' : 'text-white'
                              }`}
                            >
                              <span>{option}</span>
                              {formData.service === option && <Check size={14} className="text-[var(--color-tertiary)]" />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Preferred Date & Time *</label>
                    <DateTimePicker 
                      required
                      value={formData.dateTime}
                      onChange={(val) => setFormData({...formData, dateTime: val})}
                    />
                  </div>
                </div>
                <div className="relative z-20">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Special Request (Optional)</label>
                  <textarea 
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full border-b border-white/20 py-3 bg-transparent text-white focus:outline-none focus:border-[var(--color-tertiary)] transition-colors text-sm resize-none" 
                    placeholder="Describe any skin sensitivities, preferred stylist, etc." 
                    rows={2}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={bookingStatus === 'loading'}
                  className="mt-8 px-10 py-4 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] text-black rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition duration-300 w-full disabled:opacity-50"
                >
                  {bookingStatus === 'loading' ? 'Securing Slot...' : 'Confirm Premium Reservation'}
                </button>
                {bookingStatus === 'error' && (
                  <p className="text-xs text-red-400 mt-2 text-center">There was a transmission issue. Please check network or try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-28 bg-[var(--color-bg-deep)] text-center">
        <div className="max-w-6xl mx-auto px-6">
          <span className="uppercase tracking-[0.25em] text-xs font-semibold text-[var(--color-secondary)]">Client Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mt-4 mb-20">Verdicts of Elegance</h2>
          
          <div className="relative w-full max-w-4xl mx-auto h-[350px] sm:h-[300px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentTestimonialSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-card)] border border-white/5 p-8 sm:p-12 rounded-lg shadow-xl"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[var(--color-bg-deep)] flex items-center justify-center border border-white/10 text-[var(--color-tertiary)] font-headline text-2xl font-bold">
                  “
                </div>
                <div className="flex text-[var(--color-tertiary)] mb-6 mt-4 gap-1">
                  {[...Array(TESTIMONIALS[currentTestimonialSlide].rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" className="text-[var(--color-tertiary)]" />)}
                </div>
                <p className="text-gray-300 italic mb-8 text-sm md:text-base font-light leading-relaxed max-w-2xl">"{TESTIMONIALS[currentTestimonialSlide].review}"</p>
                <h4 className="font-headline font-bold text-base text-white">{TESTIMONIALS[currentTestimonialSlide].name}</h4>
                <span className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)] mt-1 font-semibold">{TESTIMONIALS[currentTestimonialSlide].role}</span>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Controls */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {TESTIMONIALS.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentTestimonialSlide(idx)}
                  className={`h-[3px] transition-all duration-500 rounded-full ${currentTestimonialSlide === idx ? 'w-8 bg-[var(--color-tertiary)]' : 'w-3 bg-white/20 hover:bg-white/50'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO SECTION */}
      <section id="contact" className="py-24 bg-black/60 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[var(--color-tertiary)]/30 group-hover:bg-[var(--color-tertiary)]/5 transition duration-300">
              <MapPin className="text-[var(--color-tertiary)]" size={24} />
            </div>
            <h3 className="text-lg font-headline font-bold mb-3 text-white uppercase tracking-wider">Maison Location</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">Fifth Avenue Residence, 4th Floor<br/>Manhattan, NY 10018, USA</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[var(--color-tertiary)]/30 group-hover:bg-[var(--color-tertiary)]/5 transition duration-300">
              <Phone className="text-[var(--color-tertiary)]" size={24} />
            </div>
            <h3 className="text-lg font-headline font-bold mb-3 text-white uppercase tracking-wider">Direct Concierge</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">+91 (22) 555-8900<br/>concierge@parlourelegance.com</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[var(--color-tertiary)]/30 group-hover:bg-[var(--color-tertiary)]/5 transition duration-300">
              <Clock className="text-[var(--color-tertiary)]" size={24} />
            </div>
            <h3 className="text-lg font-headline font-bold mb-3 text-white uppercase tracking-wider">Maison Hours</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">Mon - Sat: 9:00 AM - 9:00 PM<br/>Sunday: 10:00 AM - 6:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
}
