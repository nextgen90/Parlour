import { motion } from 'framer-motion';
import { Star, CheckCircle, Sparkles, Clock, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES_DETAILED = [
  {
    id: 'hair',
    title: 'Hair Couture & Styling',
    subtitle: 'Haute Coiffure & Couture Coloring',
    price: 'From ₹4,999',
    video: 'https://drive.google.com/uc?export=download&id=1P-kb_0dDGH5lRIvqPotVoim3B3ojfS9j',
    features: [
      'Custom Couture Haircut & Blowout by senior stylists',
      'French Balayage & Premium Glossing treatments',
      'Olaplex® intensive bond-building therapy',
      'Keratin-infused cellular restoration',
      'Personalized hair and scalp health diagnostic session'
    ],
    duration: '120 - 180 Mins',
    experience: 'Relax in our private hair washing salon with back-massage chairs, accompanied by organic champagne.'
  },
  {
    id: 'skin',
    title: 'Advanced Skin Therapy',
    subtitle: 'Deep Cellular Regeneration Clinic',
    price: 'From ₹5,999',
    video: 'https://drive.google.com/uc?export=download&id=1hLZCCd9zvJQEhg04unwlz6sdEQ6RBkHg',
    features: [
      'Bespoke chemical & fruit enzyme peels',
      'Double action Hydro-Facial for intensive hydration',
      'Clinical LED light therapy & skin barrier therapy',
      'Anti-aging lymphatic drainage face massage',
      'Medical-grade serum infusion targeting pigmentation'
    ],
    duration: '75 - 90 Mins',
    experience: 'Performed in a low-lit, aromatherapy-scented room with pure silk linens and tranquil soundscapes.'
  },
  {
    id: 'makeup',
    title: 'Bridal & Editorial Makeup',
    subtitle: 'Signature High-Definition Artistry',
    price: 'From ₹14,999',
    video: 'https://drive.google.com/uc?export=download&id=1_GG7p_DR1wa4jOlvlXHR6hMFGE_3dJUS',
    features: [
      'High-Definition (HD) airbrush makeup for flawless longevity',
      'Premium mink-effect lash integration',
      'Pre-wedding trail, custom mood-board creation, & skincare prep',
      'Hairstyling including designer hair accessories & dupatta draping',
      'Luxury touch-up kit with premium lip color & blotting sheets'
    ],
    duration: '180 - 240 Mins',
    experience: 'A dedicated private bridal suite with ambient lighting, catering to you and your bridal party with premium snacks.'
  }
];

export default function Services() {
  const handleBookNow = (serviceName: string) => {
    window.location.assign(`/?service=${encodeURIComponent(serviceName)}#booking`);
  };

  return (
    <div className="w-full bg-[var(--color-bg-deep)] text-white py-20">
      {/* Header */}
      <section className="relative text-center max-w-4xl mx-auto px-6 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-secondary)] inline-flex items-center gap-2">
            <Sparkles size={14} className="text-[var(--color-tertiary)] animate-pulse" /> Elite Aesthetics & Rituals
          </span>
          <h1 className="text-4xl sm:text-6xl font-headline font-bold mt-4 mb-6 leading-tight">
            Our Detailed <span className="gold-gradient-text">Signature Services</span>
          </h1>
          <p className="text-gray-400 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Delve into the precise technicalities and luxury features that define our world-class treatments. Click book to secure your exclusive slot.
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-tertiary)] to-transparent mx-auto mt-8"></div>
        </motion.div>
      </section>

      {/* Services Detailed List */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32">
        {SERVICES_DETAILED.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <section 
              key={service.id} 
              id={service.id} 
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
            >
              {/* Media Section (Premium Video Loop) */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 relative group block cursor-pointer"
              >
                <Link to="/gallery#videos">
                  <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-primary)] rounded-xl opacity-10 blur-xl group-hover:opacity-20 transition duration-1000"></div>
                <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl h-[350px] sm:h-[450px]">
                  <video 
                    src={service.video} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[var(--color-secondary)] bg-black/60 px-4 py-2 backdrop-blur-md border border-white/5 rounded-full flex items-center gap-2">
                      <Clock size={12} /> {service.duration}
                    </span>
                    <span className="text-sm font-headline font-semibold text-white bg-[var(--color-bg-deep)] border border-[var(--color-tertiary)]/30 px-4 py-2 rounded-full">
                      {service.price}
                    </span>
                  </div>
                </div>
                </Link>
              </motion.div>

              {/* Detail Content Section */}
              <motion.div 
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 flex flex-col justify-center"
              >
                <span className="text-xs uppercase tracking-wider text-[var(--color-secondary)] font-semibold mb-2 block">{service.subtitle}</span>
                <h2 className="text-3xl sm:text-4xl font-headline font-bold text-white mb-6 group-hover:text-[var(--color-tertiary)] transition-colors">{service.title}</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">{service.experience}</p>
                
                <h4 className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4 flex items-center gap-2">
                  <CheckCircle size={14} className="text-[var(--color-tertiary)]" /> What's Included:
                </h4>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-300 font-light">
                      <Star size={14} className="text-[var(--color-tertiary)] mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4">
                  <button 
                    onClick={() => handleBookNow(service.title)}
                    className="px-8 py-4 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] text-black rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition duration-300 shadow-lg shadow-yellow-600/10"
                  >
                    Book This Ritual
                  </button>
                  <a 
                    href="#contact" 
                    className="px-6 py-4 border border-white/10 hover:border-[var(--color-tertiary)] text-white hover:text-[var(--color-tertiary)] rounded-sm text-xs font-bold uppercase tracking-[0.2em] transition duration-300 flex items-center gap-2"
                  >
                    <Heart size={14} /> Inquiry
                  </a>
                </div>
              </motion.div>
            </section>
          );
        })}
      </div>

      {/* Safety & Premium Service Guarantees */}
      <section className="py-24 bg-[var(--color-bg-card)] mt-32 border-t border-b border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center">
            <ShieldCheck className="text-[var(--color-tertiary)] mb-4" size={40} />
            <h3 className="text-lg font-headline font-bold mb-2">Pure Sterilization</h3>
            <p className="text-sm text-gray-400 font-light max-w-xs">All tools undergo medical-grade autoclave sterilization before every signature treatment.</p>
          </div>
          <div className="flex flex-col items-center">
            <Star className="text-[var(--color-tertiary)] mb-4" size={40} />
            <h3 className="text-lg font-headline font-bold mb-2">Elite Certified Stylists</h3>
            <p className="text-sm text-gray-400 font-light max-w-xs">Our artists receive ongoing haute-coiffure training in London, Paris, and Milan.</p>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="text-[var(--color-tertiary)] mb-4" size={40} />
            <h3 className="text-lg font-headline font-bold mb-2">100% Organic Products</h3>
            <p className="text-sm text-gray-400 font-light max-w-xs">We exclusively source premium biological, cruelty-free, and vegan hair and skin care lines.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
