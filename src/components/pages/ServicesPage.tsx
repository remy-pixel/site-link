import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { ProcessSteps, Services } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Animation Components
const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}> = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null);
  const isInViewport = useInView(ref, { once: true, margin: "-50px" });

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
      animate={isInViewport ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionOffset[direction] }}
      transition={{ duration: 0.7, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInViewport = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInViewport ? "show" : "hidden"}
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

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          el.classList.add('is-visible');
        }, delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0`}>{children}</div>;
};

export default function ServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Services[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessSteps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [servicesData, processData] = await Promise.all([
        BaseCrudService.getAll<Services>('services', [], { limit: 50 }),
        BaseCrudService.getAll<ProcessSteps>('processsteps', [], { limit: 50 })
      ]);
      setServices(servicesData.items);
      setProcessSteps(processData.items.sort((a, b) => (a.stepOrder || 0) - (b.stepOrder || 0)));
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(74,144,226,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="container mx-auto relative z-10">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 sm:mb-5 md:mb-6">
                Our Services
              </h1>
              <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-muted-foreground">
                Comprehensive website solutions designed to help your business grow and convert more visitors into customers
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-secondary/10 px-4">
        <div className="container mx-auto">
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : services.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
                {services.slice(0, 3).map((service, index) => (
                  <AnimatedElement key={service._id} delay={index * 100}>
                    <Card className="bg-card border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] h-full">
                      {service.serviceImage && (
                        <div className="aspect-video overflow-hidden">
                          <Image
                            src={service.serviceImage}
                            alt={service.serviceName || 'Service'}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            width={600}
                          />
                        </div>
                      )}
                      <div className="p-4 sm:p-6 md:p-8">
                        <h2 className="text-lg sm:text-xl md:text-3xl font-heading font-bold text-card-foreground mb-2 sm:mb-3">
                          {service.serviceName}
                        </h2>

                        {service.tagline && (
                          <p className="text-primary font-semibold text-xs sm:text-sm md:text-lg mb-3 sm:mb-4">
                            {service.tagline}
                          </p>
                        )}

                        <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm md:text-base">
                          {service.description}
                        </p>

                        {service.benefits && (
                          <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                            <h3 className="text-sm sm:text-base md:text-lg font-heading font-bold text-card-foreground mb-2 sm:mb-3">
                              Key Benefits:
                            </h3>
                            {service.benefits.split('\n').filter(b => b.trim()).map((benefit, i) => (
                              <div key={i} className="flex items-start gap-2 sm:gap-3">
                                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-muted-foreground text-xs sm:text-sm md:text-base">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {service.ctaUrl && service.ctaText && (
                          <Button
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:scale-[1.02] text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11"
                            onClick={() => {
                              if (service.ctaUrl?.startsWith('http')) {
                                window.location.href = service.ctaUrl;
                              } else {
                                navigate(service.ctaUrl || '/contact');
                              }
                            }}
                          >
                            {service.ctaText}
                            <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                          </Button>
                        )}
                      </div>
                    </Card>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No services available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      {processSteps.length > 0 && (
        <section className="py-12 sm:py-16 md:py-32 bg-[#0D1221] relative overflow-hidden px-4">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

          <div className="container mx-auto relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
              <FadeIn>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-white mb-3 sm:mb-4">
                  Our Process
                </h2>
                <p className="text-muted-foreground max-w-md text-xs sm:text-sm md:text-base">
                  A proven methodology to transform your digital presence from concept to conversion.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <Button variant="link" className="text-primary p-0 h-auto hover:text-primary/80 text-xs sm:text-sm md:text-base" onClick={() => navigate('/about')}>
                  Learn more about us <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </FadeIn>
            </div>

            <StaggerContainer className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {processSteps.map((step) => (
                <StaggerItem key={step._id}>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                    <Card className="relative h-full bg-[#151B2B] border-white/5 p-4 sm:p-5 md:p-6 hover:bg-[#1a2133] transition-colors duration-300">
                      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white/5 mb-4 sm:mb-5 md:mb-6 group-hover:text-primary/10 transition-colors">
                        {String(step.stepOrder || 0).padStart(2, '0')}
                      </div>
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                        {step.stepName}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {step.shortDescription || step.description}
                      </p>
                    </Card>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background px-4">
        <div className="container mx-auto">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 sm:mb-5 md:mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xs sm:text-sm md:text-lg text-muted-foreground mb-6 sm:mb-8">
                Let&apos;s discuss how we can help your business grow with a professional, high-converting website.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12"
                  onClick={() => navigate('/contact')}
                >
                  Get in Touch
                  <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
