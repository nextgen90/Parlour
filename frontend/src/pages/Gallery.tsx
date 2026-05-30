import { useState } from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const GalleryVideoPlayer = ({ videoId }: { videoId: string }) => {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <div className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35]">
        <ReactPlayer 
          url={`https://www.youtube.com/watch?v=${videoId}`}
          playing={playing}
          muted={muted}
          loop={true}
          width="100%"
          height="100%"
          config={{
            youtube: {
              // @ts-ignore
              playerVars: { 
                showinfo: 0, 
                controls: 0,
                modestbranding: 1,
                rel: 0,
                vq: 'hd1080'
              }
            }
          }}
        />
      </div>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-10 pointer-events-auto">
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setPlaying(!playing); }}
          className="p-3 bg-black/60 rounded-full text-white hover:text-[var(--color-tertiary)] hover:bg-black/80 transition-colors backdrop-blur-md"
        >
          {playing ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMuted(!muted); }}
          className="p-3 bg-black/60 rounded-full text-white hover:text-[var(--color-tertiary)] hover:bg-black/80 transition-colors backdrop-blur-md"
        >
          {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </div>
  );
};
const IMAGES = [
  { id: 1, src: '/gallery/gallery_interior.png', title: 'Haute Couture Interior', span: 'md:col-span-2 md:row-span-2' },
  { id: 2, src: '/gallery/gallery_makeup.png', title: 'Bridal Artistry', span: 'md:col-span-1 md:row-span-1' },
  { id: 3, src: '/gallery/gallery_facial.png', title: 'Cellular Hydration', span: 'md:col-span-1 md:row-span-1' },
  { id: 4, src: '/gallery/gallery_hair.png', title: 'French Balayage', span: 'md:col-span-1 md:row-span-2' },
  { id: 5, src: '/gallery/gallery_products.png', title: 'Organic Apothecary', span: 'md:col-span-2 md:row-span-1' }
];

export default function Gallery() {
  return (
    <div className="w-full bg-[var(--color-bg-deep)] text-white py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-secondary)]">Visual Journey</span>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mt-4 mb-6">Our <span className="gold-gradient-text">Gallery</span></h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-[var(--color-tertiary)] to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[300px]">
          {IMAGES.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-xl border border-white/5 shadow-2xl group cursor-pointer ${img.span} h-[300px] md:h-auto`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition duration-500 z-10" />
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out" 
              />
              <div className="absolute bottom-8 left-8 right-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="uppercase tracking-widest text-[10px] font-bold text-[var(--color-tertiary)] mb-2 block">Premium Aesthetic</span>
                <h3 className="text-xl md:text-2xl font-headline font-semibold text-white drop-shadow-lg">{img.title}</h3>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-tertiary)]/30 rounded-xl transition-colors duration-500 z-30 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Videos Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 mt-32"
          id="videos"
        >
          <span className="uppercase tracking-[0.3em] text-xs font-semibold text-[var(--color-secondary)]">Cinematic Experience</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mt-4 mb-6">Service <span className="gold-gradient-text">Films</span></h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-[var(--color-tertiary)] to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 1, src: 'ef6cyfvYmhc', title: 'Hair Couture & Styling' },
            { id: 2, src: 'AZt7ZzEbp5M', title: 'Advanced Skin Therapy' },
            { id: 3, src: 'XgQktrFN2dQ', title: 'Bridal & Editorial Makeup' }
          ].map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-black group h-[400px]"
            >
              <div className="absolute inset-0 w-full h-full">
                <GalleryVideoPlayer videoId={video.src} />
              </div>
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                  {video.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
