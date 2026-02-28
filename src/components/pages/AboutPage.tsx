import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { CompanyValues } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { ArrowRight, Award, Target, Users, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function AboutPage() {
  const navigate = useNavigate();
  const [companyValues, setCompanyValues] = useState<CompanyValues[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCompanyValues();
  }, []);

  const loadCompanyValues = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<CompanyValues>('companyvalues', [], { limit: 50 });
      const sortedValues = result.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      setCompanyValues(sortedValues);
    } catch (error) {
      console.error('Error loading company values:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const iconMap: Record<number, React.ReactNode> = {
    0: <Target className="w-8 h-8 text-primary" />,
    1: <Users className="w-8 h-8 text-primary" />,
    2: <Zap className="w-8 h-8 text-primary" />,
    3: <Award className="w-8 h-8 text-primary" />,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 overflow-hidden px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(74,144,226,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <div className="container mx-auto relative z-10">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-4 sm:mb-5 md:mb-6">
                About StratoCS
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
                We help businesses grow by designing clean, professional websites that convert visitors into customers
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>
      {/* Mission Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-secondary/10 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <Card className="bg-card border-border p-6 sm:p-8 md:p-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-card-foreground mb-4 sm:mb-5 md:mb-6 text-center">
                  Our Mission
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-5 md:mb-6">
                  At StratoCS, we believe that every business deserves a website that not only looks professional but also drives real results. Too many businesses struggle with outdated, confusing websites that fail to convert visitors into customers.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-5 md:mb-6">
                  We specialize in designing, rebuilding, and optimizing websites with a focus on clarity, conversion, and growth. Our approach combines clean design principles with data-driven optimization to create websites that work as hard as you do.
                </p>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  Whether you need a brand new website, a complete redesign, or targeted improvements to boost conversions, we provide practical solutions that deliver measurable results.
                </p>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Meet The Team Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-background px-4">
        <div className="container mx-auto">
          <AnimatedElement>
            <div className="text-center mb-12 sm:mb-14 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4">
                Meet The Team
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                The talented people behind StratoCS
              </p>
            </div>
          </AnimatedElement>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
            <AnimatedElement delay={0}>
              <div className="text-center">
                <div className="mb-4 sm:mb-5 md:mb-6 overflow-hidden rounded-lg h-48 sm:h-56 md:h-64 w-full">
                  <Image
                    src="https://static.wixstatic.com/media/6d0f2e_e86af6d8738d4e6a835c91731e32e869~mv2.png"
                    alt="Remy Robinson"
                    className="w-full h-full object-cover"
                    width={300}
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-foreground mb-1 sm:mb-2">
                  Remy Robinson
                </h3>
                <p className="text-sm sm:text-base text-primary font-semibold">
                  Tech Lead
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="text-center">
                <div className="mb-4 sm:mb-5 md:mb-6 overflow-hidden rounded-lg h-48 sm:h-56 md:h-96 w-full">
                  <Image
                    src="https://static.wixstatic.com/media/6d0f2e_098fe80df32349839ec4e7b0e5cf4931~mv2.avif"
                    alt="Oscar Ramsay-Lewis"
                    className="w-full h-full object-cover"
                    width={300}
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-foreground mb-1 sm:mb-2">
                  Oscar Ramsay-Lewis
                </h3>
                <p className="text-sm sm:text-base text-primary font-semibold">
                  Founder
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="text-center">
                <div className="mb-4 sm:mb-5 md:mb-6 overflow-hidden rounded-lg h-48 sm:h-56 md:h-64 w-full">
                  <Image
                    src="https://static.wixstatic.com/media/6d0f2e_ee0ed6b439764ec89c114dc3879cde6e~mv2.avif"
                    alt="Caleb Stow"
                    className="w-full h-full object-cover"
                    width={300}
                  />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-foreground mb-1 sm:mb-2">
                  Caleb Stow
                </h3>
                <p className="text-sm sm:text-base text-primary font-semibold">
                  Operations & Strategy
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Company Values Section */}
      {companyValues.length > 0 && (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-secondary/10 to-background px-4">
          <div className="container mx-auto">
            <AnimatedElement>
              <div className="text-center mb-12 sm:mb-14 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4">
                  Our Values
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do
                </p>
              </div>
            </AnimatedElement>

            <div className="min-h-[400px]">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
                  {companyValues.map((value, index) => (
                    <AnimatedElement key={value._id} delay={index * 100}>
                      <Card className="bg-card border-border p-6 sm:p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02] h-full">
                        <div className="flex items-start gap-3 sm:gap-4 mb-4">
                          {value.valueImage ? (
                            <div className="w-12 sm:w-16 h-12 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={value.valueImage}
                                alt={value.valueTitle || 'Value'}
                                className="w-full h-full object-cover"
                                width={64}
                              />
                            </div>
                          ) : (
                            <div className="w-12 sm:w-16 h-12 sm:h-16 flex-shrink-0 bg-secondary/50 rounded-lg flex items-center justify-center">
                              {iconMap[index % 4] || <Target className="w-6 sm:w-8 h-6 sm:h-8 text-primary" />}
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-card-foreground mb-1 sm:mb-2">
                              {value.valueTitle}
                            </h3>
                          </div>
                        </div>

                        {value.shortDescription && (
                          <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                            {value.shortDescription}
                          </p>
                        )}

                        {value.clientSignificance && (
                          <div className="mb-3 sm:mb-4">
                            <h4 className="text-xs sm:text-sm font-semibold text-primary mb-1 sm:mb-2">
                              Why It Matters to You:
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {value.clientSignificance}
                            </p>
                          </div>
                        )}

                        {value.whyStratoCSDescription && (
                          <div>
                            <h4 className="text-xs sm:text-sm font-semibold text-primary mb-1 sm:mb-2">
                              Our Approach:
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {value.whyStratoCSDescription}
                            </p>
                          </div>
                        )}
                      </Card>
                    </AnimatedElement>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-secondary/10 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 sm:mb-6">
                  Why Choose StratoCS?
                </h2>
              </div>
            </AnimatedElement>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <AnimatedElement delay={100}>
                <Card className="bg-card border-border p-6 sm:p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-card-foreground mb-3 sm:mb-4">
                    Results-Driven Approach
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                    We don&apos;t just build pretty websites. Every design decision is made with your business goals in mind, focusing on conversions and measurable growth.
                  </p>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <Card className="bg-card border-border p-6 sm:p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-card-foreground mb-3 sm:mb-4">
                    Clean, Modern Design
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                    We believe in simplicity and clarity. Our designs are clean, professional, and focused on delivering your message without unnecessary clutter.
                  </p>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <Card className="bg-card border-border p-6 sm:p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-card-foreground mb-3 sm:mb-4">
                    Transparent Process
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                    No surprises, no hidden fees. We provide clear communication, realistic timelines, and practical recommendations throughout the entire process.
                  </p>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <Card className="bg-card border-border p-6 sm:p-8 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-card-foreground mb-3 sm:mb-4">
                    Ongoing Support
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">We provide ongoing optimization and support to ensure your site continues to perform and grow with your business.</p>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-secondary/10 to-background px-4">
        <div className="container mx-auto">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4 sm:mb-5 md:mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8">
                Let&apos;s discuss how we can help transform your website and drive real growth for your business.
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
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-foreground hover:text-background transition-all hover:scale-[1.02] text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12"
                  onClick={() => navigate('/services')}
                >
                  View Our Services
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
