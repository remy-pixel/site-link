// HPI 1.7-V
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion';
import { ArrowRight, ArrowDown, Star, Shield, Clock, MoveRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Types & Interfaces ---
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

// --- Canonical Data Sources ---
const FEATURES_DATA: FeatureItem[] = [
  {
    id: 1,
    title: "Timeless Design",
    description: "We create designs that transcend trends, focusing on enduring beauty and functionality.",
    icon: Clock
  },
  {
    id: 2,
    title: "Attention to Detail",
    description: "Every element is carefully considered to ensure a cohesive and refined experience.",
    icon: Star
  },
  {
    id: 3,
    title: "Lasting Impact",
    description: "Our work is designed to make a meaningful impression that resonates over time.",
    icon: Shield
  }
];

// --- Helper Components ---

const ParallaxImage: React.FC<ParallaxImageProps> = ({ src, alt, className, priority = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={1600}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

const RevealText: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        animate={isInView ? { y: 0 } : { y: "100%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const Separator = () => (
  <div className="w-full h-px bg-subtleborder/40" />
);

// --- Main Component ---

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-primary overflow-clip selection:bg-primary selection:text-primary-foreground">
      <Header />

      {/* --- HERO SECTION --- 
          Replicating the structure of the inspiration image:
          Split layout, massive typography left, rounded image right.
      */}
      <section className="relative w-full max-w-[120rem] mx-auto min-h-[90vh] flex flex-col lg:flex-row pt-20 lg:pt-0">
        
        {/* Left Column: Typography & Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 md:p-12 lg:p-16 xl:p-20 z-10">
          <div className="mt-12 lg:mt-24">
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-6xl md:text-7xl lg:text-8xl xl:text-9xl uppercase leading-[0.9] tracking-tighter text-primary"
              >
                Welcome<br />To Our<br />Space
              </motion.h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-12 lg:mt-0">
            <div className="max-w-xs">
              <RevealText delay={0.4} className="font-paragraph text-lg md:text-xl text-secondary italic leading-relaxed">
                Discover a world of possibilities where design meets functionality.
              </RevealText>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-6"
              >
                <a href="/about" className="group inline-flex items-center gap-2 text-sm font-heading uppercase tracking-widest border-b border-primary pb-1 hover:text-secondary transition-colors">
                  Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="hidden md:block"
            >
               <span className="font-heading text-xs uppercase tracking-widest text-mutedgray">Est. 2024</span>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-full lg:w-1/2 h-[60vh] lg:h-auto relative p-4 lg:p-8 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, borderRadius: "0px" }}
            animate={{ scale: 1, opacity: 1, borderRadius: "48px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-full h-full overflow-hidden bg-mutedgray/20"
          >
            <Image
              src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=1"
              alt="Featured design showcase"
              className="w-full h-full object-cover"
              width={1200}
            />
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      <Separator />

      {/* --- STICKY NARRATIVE SECTION --- 
          "Crafted with Purpose" - Using sticky positioning for a magazine-like reading experience.
      */}
      <section className="relative w-full max-w-[120rem] mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Sticky Title */}
          <div className="w-full lg:w-1/3 lg:h-[150vh] relative">
            <div className="sticky top-0 h-screen flex flex-col justify-center p-8 md:p-16 border-r border-subtleborder/40">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="block font-heading text-xs uppercase tracking-[0.2em] text-mutedgray mb-4">Our Philosophy</span>
                <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase leading-none text-primary">
                  Crafted<br />With<br />Purpose
                </h2>
                <div className="mt-12 w-12 h-12 rounded-full border border-primary flex items-center justify-center animate-bounce">
                  <ArrowDown className="w-5 h-5" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="w-full lg:w-2/3 bg-background">
            <div className="flex flex-col">
              {/* Block 1 */}
              <div className="min-h-[50vh] flex items-center p-8 md:p-24 border-b border-subtleborder/40">
                <div className="max-w-2xl">
                  <RevealText className="font-paragraph text-2xl md:text-3xl lg:text-4xl text-secondary italic leading-tight mb-8">
                    "Every detail matters. We believe in creating meaningful experiences that stand the test of time."
                  </RevealText>
                  <p className="font-sans text-base md:text-lg text-mutedgray leading-relaxed">
                    Our approach combines timeless design principles with modern sensibilities to deliver solutions that are both beautiful and functional. We don't just build spaces; we curate atmospheres that breathe and evolve with you.
                  </p>
                </div>
              </div>

              {/* Block 2 - Image Break */}
              <div className="h-[60vh] w-full relative overflow-hidden border-b border-subtleborder/40 group">
                <ParallaxImage 
                  src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=2"
                  alt="Detail shot of design materials"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
                  <span className="font-heading text-white uppercase tracking-widest text-lg">View Project</span>
                </div>
              </div>

              {/* Block 3 */}
              <div className="min-h-[50vh] flex items-center p-8 md:p-24">
                <div className="max-w-2xl ml-auto text-right">
                  <RevealText className="font-paragraph text-2xl md:text-3xl lg:text-4xl text-secondary italic leading-tight mb-8">
                    "Simplicity is the ultimate sophistication."
                  </RevealText>
                  <p className="font-sans text-base md:text-lg text-mutedgray leading-relaxed">
                    We strip away the unnecessary to reveal the essential. In a world of noise, we offer clarity. Our designs are characterized by clean lines, thoughtful proportions, and a harmonious palette that brings a sense of calm to any environment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* --- FEATURES GRID --- 
          Refined grid layout with vertical dividers.
      */}
      <section className="w-full max-w-[120rem] mx-auto py-24 md:py-32 px-6 md:px-12">
        <div className="mb-20 text-center">
          <span className="font-heading text-xs uppercase tracking-[0.2em] text-mutedgray">Core Values</span>
          <h3 className="font-heading text-3xl md:text-5xl uppercase mt-4">The Standards</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-subtleborder/40 divide-y md:divide-y-0 md:divide-x divide-subtleborder/40">
          {FEATURES_DATA.map((feature, index) => (
            <motion.div 
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-8 md:p-12 lg:p-16 flex flex-col items-center text-center hover:bg-mutedgray/5 transition-colors duration-500"
            >
              <div className="mb-8 p-4 rounded-full border border-subtleborder text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <feature.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h4 className="font-heading text-xl uppercase mb-4 tracking-wide">{feature.title}</h4>
              <p className="font-paragraph text-lg text-secondary italic leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- VISUAL BREATHER --- 
          Full bleed parallax section.
      */}
      <section className="w-full h-[80vh] relative overflow-hidden">
        <ParallaxImage 
          src="https://static.wixstatic.com/media/12d367_71ebdd7141d041e4be3d91d80d4578dd~mv2.png?id=3"
          alt="Atmospheric interior shot"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center text-white p-8 border border-white/30 backdrop-blur-sm max-w-2xl mx-4"
          >
            <h2 className="font-heading text-4xl md:text-6xl uppercase mb-4">Illuminate Your Style</h2>
            <p className="font-paragraph text-xl md:text-2xl italic">
              "Light is the first element of design; without it there is no color, form, or texture."
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- 
          Minimalist final call to action.
      */}
      <section className="w-full max-w-[120rem] mx-auto py-32 md:py-48 px-6 md:px-12 bg-background relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-subtleborder to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealText className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.9] mb-12 text-primary">
            Ready To<br />Begin?
          </RevealText>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="/contact"
              className="group relative overflow-hidden px-10 py-5 bg-primary text-primary-foreground font-heading text-sm uppercase tracking-widest hover:bg-secondary transition-colors duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get in Touch <MoveRight className="w-4 h-4" />
              </span>
            </a>
            <a 
              href="/about"
              className="px-10 py-5 border border-subtleborder text-secondary font-heading text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-colors duration-300"
            >
              Read Our Story
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
