// WI-HPI
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Textarea } from '@/components/ui/textarea';
import type { CaseStudies, PricingPackages, Services } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Code,
  Globe,
  Layout,
  Send,
  Zap
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// --- Animation Components ---

const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  fullWidth?: boolean;
}> = ({ children, delay = 0, direction = 'up', className = '', fullWidth = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionOffset[direction] }}
      transition={{ duration: 0.7, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Main Component ---

export default function HomePage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Services[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [pricingPackages, setPricingPackages] = useState<PricingPackages[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form State
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [message, setMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Refs for scrolling
  const reviewFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [servicesData, caseStudiesData, pricingData] = await Promise.all([
        BaseCrudService.getAll<Services>('services', [], { limit: 6 }),
        BaseCrudService.getAll<CaseStudies>('casestudies', [], { limit: 3 }),
        BaseCrudService.getAll<PricingPackages>('pricingpackages', [], { limit: 3 })
      ]);

      setServices(servicesData.items);
      setCaseStudies(caseStudiesData.items);
      setPricingPackages(pricingData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Review request:', { email, website, message });
    setFormStatus('success');
    setEmail('');
    setWebsite('');
    setMessage('');

    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const scrollToReview = () => {
    reviewFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner className="w-12 h-12 text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <Header />
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 sm:pt-12 md:pt-20 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[#0A0E1A] z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-background z-0" />

        {/* Subtle animated glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[300px] sm:h-[500px] md:h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"
        />

        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="text-center">
            <FadeIn delay={0.05} direction="up">
              <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 md:hidden">
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl shadow-primary/30">
                   <Image
                     src="https://static.wixstatic.com/media/6d0f2e_754e8835c6ad4a128ba4a340eff000f8~mv2.png"
                     alt="StratoCS Logo"
                     width={160}
                     height={160}
                     className="w-full h-full object-cover"
                   />
                 </div>
                 <div className="text-left">
                   <h2 className="text-white font-bold text-3xl sm:text-5xl md:text-7xl leading-tight">StratoCS</h2>
                 </div>
               </div>
            </FadeIn>

            <FadeIn delay={0.1} direction="up">
              <h1 className="text-white tracking-tight mb-4 sm:mb-6 md:mb-8 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-weight-normal font-normal leading-tight">
                Clean websites. Built for growth.
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} direction="up">
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
                We design, rebuild, and optimize websites so businesses look professional and convert more visitors into leads.
              </p>
            </FadeIn>

            <FadeIn delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center px-2">
                <Button
                  size="lg"
                  className="h-11 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-md font-medium w-full sm:w-auto"
                  onClick={scrollToReview}
                >
                  Get a FREE Website Review
                  <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-11 sm:h-12 md:h-14 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40 transition-all duration-300 rounded-md w-full sm:w-auto"
                  onClick={() => navigate('/services')}
                >
                  View Services
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50"
        >

        </motion.div>
      </section>
      {/* FREE REVIEW TEASER SECTION - REDESIGNED */}
      {/* PAID SERVICES SECTION */}
      <section className="py-12 sm:py-16 md:py-32 bg-[#0D1221] relative overflow-hidden px-4">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              <FadeIn direction="left">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 sm:mb-4 md:mb-6">
                    FREE Website Review
                  </h2>
                  <p className="text-xs sm:text-sm md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6 md:mb-8">
                    Send us your website and we&apos;ll review it within 48 hours.
                    You&apos;ll receive clear, practical suggestions to improve structure and conversions.
                  </p>
                  <p className="text-xs sm:text-sm md:text-lg text-white/80 mb-4 sm:mb-6 md:mb-8">
                    No commitment required.
                  </p>

                  <Button
                    size="lg"
                    className="h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 text-xs sm:text-sm md:text-base bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300 rounded-md font-medium w-full sm:w-auto"
                    onClick={scrollToReview}
                  >
                    Request Free Review
                    <ChevronRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </FadeIn>

              <FadeIn direction="right" delay={0.2}>
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur opacity-100" />
                  <Card className="relative bg-[#151B2B] border-white/5 p-4 sm:p-6 md:p-8">
                    <div className="space-y-3 sm:space-y-4 md:space-y-6">
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-xs sm:text-sm md:text-base mb-0.5">Code Analysis</h4>
                          <p className="text-xs text-muted-foreground">Performance & structure check</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-xs sm:text-sm md:text-base mb-0.5">UX Review</h4>
                          <p className="text-xs text-muted-foreground">User journey & layout optimization</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium text-xs sm:text-sm md:text-base mb-0.5">Conversion Tips</h4>
                          <p className="text-xs text-muted-foreground">Actionable growth strategies</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16 md:py-32 bg-[#0A0E1A] px-4">
        <div className="container mx-auto">
          <FadeIn className="mb-10 sm:mb-14 md:mb-20 text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-heading font-bold text-white mb-2 sm:mb-3 md:mb-4">
              Paid Services
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">Professional solutions for growing businesses</p>
          </FadeIn>

          <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
            {services.length > 0 ? (
              services.slice(0, 3).map((service, index) => (
                <StaggerItem key={service._id} className="h-full">
                  <Link to={`/services`} className="block h-full group">
                    <Card className="h-full bg-gradient-to-br from-[#151B2B] to-[#111625] border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/10 group-hover:bg-gradient-to-br group-hover:from-[#1a2133] group-hover:to-[#151B2B]">
                      <CardHeader className="pb-4 sm:pb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 sm:mb-6 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                          {index === 0 ? <Layout className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" /> :
                           index === 1 ? <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" /> :
                           <Globe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />}
                        </div>
                        <CardTitle className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                          {service.serviceName}
                        </CardTitle>
                        {service.tagline && (
                          <p className="text-primary/80 text-xs sm:text-sm font-medium">{service.tagline}</p>
                        )}
                      </CardHeader>
                      <CardContent className="pb-6 sm:pb-8">
                        <p className="text-muted-foreground leading-relaxed mb-4 sm:mb-8 text-xs sm:text-sm md:text-base">
                          {service.description}
                        </p>
                        {service.benefits && (
                          <ul className="space-y-2 sm:space-y-3 md:space-y-4">
                            {service.benefits.split('\n').slice(0, 4).map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground/90">
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary/80 mt-0.5 shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                      <CardFooter className="pt-4 sm:pt-6 border-t border-white/5">
                        <Button variant="link" className="text-primary p-0 h-auto hover:text-primary/80 group-hover:text-primary text-xs sm:text-sm">
                          Learn more <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                </StaggerItem>
              ))
            ) : (
              // Fallback if no data (matches screenshot structure)
              (<>
                {[
                  { title: "Website Builds", desc: "We design clean, modern websites built from scratch for growing businesses." },
                  { title: "Website Improvements", desc: "We redesign and optimize existing websites to improve clarity and conversions." },
                  { title: "Landing Pages", desc: "High-conversion one-page websites focused on one clear objective." }
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <Card className="h-full bg-[#111625] border-white/5 p-6 sm:p-8 hover:border-white/10 transition-all duration-300 hover:-translate-y-1">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">{item.title}</h3>
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{item.desc}</p>
                    </Card>
                  </StaggerItem>
                ))}
              </>)
            )}
          </StaggerContainer>

          <FadeIn delay={0.4} className="text-center mt-10 sm:mt-12 md:mt-16">
            <Button
              variant="outline"
              size="lg"
              className="border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12"
              onClick={() => navigate('/contact')}
            >
              Get in Touch
            </Button>
          </FadeIn>
        </div>
      </section>
      {/* REVIEW FORM SECTION (Functional Destination) */}
      <section id="review-section" ref={reviewFormRef} className="py-12 sm:py-16 md:py-32 bg-background relative px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
              <FadeIn direction="right">
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-heading font-bold text-white mb-4 sm:mb-5 md:mb-6">
                    Ready to improve your website?
                  </h2>
                  <p className="text-xs sm:text-sm md:text-lg text-muted-foreground mb-6 sm:mb-8">
                    Fill out the form to get your free, no-obligation review. We'll analyze your design, structure, and conversion potential.
                  </p>

                  <div className="space-y-4 sm:space-y-5 md:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Code className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-xs sm:text-sm md:text-base">Code Analysis</h4>
                        <p className="text-xs text-muted-foreground">Performance & structure check</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Layout className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-xs sm:text-sm md:text-base">UX Review</h4>
                        <p className="text-xs text-muted-foreground">User journey & layout optimization</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-xs sm:text-sm md:text-base">Conversion Tips</h4>
                        <p className="text-xs text-muted-foreground">Actionable growth strategies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn direction="left" delay={0.2}>
                <Card className="bg-[#151B2B] border-white/10 p-4 sm:p-6 md:p-8 shadow-2xl">
                  {formStatus === 'success' ? (
                    <div className="text-center py-8 sm:py-10 md:py-12">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Request Received!</h3>
                      <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                        We'll review your website and get back to you within 48 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          required
                          className="bg-[#0A0E1A] border-white/10 text-white placeholder:text-white/20 focus:border-primary focus:ring-primary text-xs sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="website" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                          Website URL
                        </label>
                        <Input
                          id="website"
                          type="url"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="https://yourwebsite.com"
                          required
                          className="bg-[#0A0E1A] border-white/10 text-white placeholder:text-white/20 focus:border-primary focus:ring-primary text-xs sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white mb-1.5 sm:mb-2">
                          Specific Concerns (Optional)
                        </label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="What would you like us to focus on?"
                          rows={3}
                          className="bg-[#0A0E1A] border-white/10 text-white placeholder:text-white/20 focus:border-primary focus:ring-primary resize-none text-xs sm:text-sm"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-white text-black hover:bg-white/90 transition-all text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12"
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? (
                          <LoadingSpinner className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        ) : (
                          <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                        )}
                        {formStatus === 'submitting' ? 'Sending...' : 'Get Free Review'}
                      </Button>
                    </form>
                  )}
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
