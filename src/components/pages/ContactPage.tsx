import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BaseCrudService } from '@/integrations';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

interface ContactSubmission {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  companyName?: string;
  website?: string;
  message: string;
  interestedService?: string;
  submittedAt: Date;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    message: '',
    service: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Create submission record in CMS
      const submissionData: ContactSubmission = {
        _id: crypto.randomUUID(),
        fullName: formData.name,
        email: formData.email,
        phoneNumber: formData.phone || undefined,
        companyName: formData.company || undefined,
        website: formData.website || undefined,
        message: formData.message,
        interestedService: formData.service || undefined,
        submittedAt: new Date(),
      };

      await BaseCrudService.create('contactsubmissions', submissionData);

      // Send email notification to site owner
      const emailResponse = await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        console.warn('Email notification failed, but submission was saved');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Form submission error:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
                Get in Touch
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
                Ready to transform your website? Let&apos;s discuss how we can help your business grow.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>
      {/* Contact Form & Info Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-background to-secondary/10 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Contact Form or Success State */}
            <AnimatedElement>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
                  <div className="mb-6 sm:mb-8">
                    <div className="w-16 sm:w-20 h-16 sm:h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3 sm:mb-4">
                    Thank You — We've Received Your Request
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 max-w-md">
                    Our team will review your details and get back to you within 24 hours to schedule your strategy call.
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-md">
                    If your request is urgent, feel free to email us directly at{' '}
                    <a href="mailto:info@stratocs.com" className="text-primary hover:underline font-medium">
                      info@stratocs.com
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <Card className="bg-card border-border p-6 sm:p-8">
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-card-foreground mb-6">
                    Request a Strategy Call
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-card-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        required
                        className="bg-background border-border text-foreground text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-card-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        required
                        className="bg-background border-border text-foreground text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-card-foreground mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="bg-background border-border text-foreground text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-xs sm:text-sm font-medium text-card-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className="bg-background border-border text-foreground text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-xs sm:text-sm font-medium text-card-foreground mb-2">
                        Current Website (if applicable)
                      </label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                        className="bg-background border-border text-foreground text-xs sm:text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-xs sm:text-sm font-medium text-card-foreground mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-xs sm:text-sm"
                      >
                        <option value="">Select a service</option>
                        <option value="website-build">New Website Build</option>
                        <option value="website-redesign">Website Redesign</option>
                        <option value="website-optimization">Website Optimization</option>
                        <option value="landing-page">Landing Page</option>
                        <option value="free-review">Free Website Review</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-card-foreground mb-2">
                        Tell Us About Your Project *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your goals, challenges, and what you're looking to achieve..."
                        rows={5}
                        required
                        className="bg-background border-border text-foreground text-xs sm:text-sm"
                      />
                    </div>

                    {error && (
                      <div className="text-destructive text-xs sm:text-sm">
                        {error}
                      </div>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-[1.02] text-xs sm:text-sm md:text-base h-10 sm:h-11 md:h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </Card>
              )}
            </AnimatedElement>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <AnimatedElement delay={100}>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4 sm:mb-6">
                    Contact Information
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                    Have questions? We&apos;re here to help. Reach out to us through any of the channels below, and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <Card className="bg-card border-border p-5 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-heading font-bold text-card-foreground mb-1 sm:mb-2">
                        Email Us
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                        For general inquiries and support
                      </p>
                      <a
                        href="mailto:hello@stratocs.com"
                        className="text-xs sm:text-sm text-primary hover:underline font-medium"
                      >info@stratocs.com</a>
                    </div>
                  </div>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <Card className="bg-card border-border p-5 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-heading font-bold text-card-foreground mb-1 sm:mb-2">
                        Call Us
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">Monday - Friday, 9am - 6pm CET</p>
                      <a
                        href="tel:+15551234567"
                        className="text-xs sm:text-sm text-primary hover:underline font-medium"
                      >+32 472 43 07 34</a>
                    </div>
                  </div>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <Card className="bg-card border-border p-5 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-heading font-bold text-card-foreground mb-1 sm:mb-2">
                        Visit Us
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        stratocs.com<br />
                        Serving businesses worldwide
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={500}>
                <Card className="bg-primary/10 border-primary/20 p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg lg:text-xl font-heading font-bold text-foreground mb-2 sm:mb-3">
                    Response Time
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.
                  </p>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-secondary/10 to-background px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-3 sm:mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs sm:text-sm md:text-lg text-muted-foreground">
                  Quick answers to common questions
                </p>
              </div>
            </AnimatedElement>

            <div className="space-y-4 sm:space-y-6">
              <AnimatedElement delay={100}>
                <Card className="bg-card border-border p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-card-foreground mb-2 sm:mb-3">
                    How long does a typical project take?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Project timelines vary based on scope and complexity. A new website build typically takes 2-4 weeks, while redesigns and optimizations can be completed in 1-2 weeks. We'll provide a detailed timeline during our initial consultation.</p>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <Card className="bg-card border-border p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-card-foreground mb-2 sm:mb-3">
                    What&apos;s included in the free website review?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Our free review includes an analysis of your website&apos;s structure, design, user experience, and conversion optimization opportunities. You&apos;ll receive a detailed report with practical recommendations within 48 hours.
                  </p>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <Card className="bg-card border-border p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-card-foreground mb-2 sm:mb-3">
                    Do you offer ongoing support after launch?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Yes! We offer various support and maintenance packages to ensure your website continues to perform optimally. This includes updates, optimization, and ongoing improvements based on performance data.
                  </p>
                </Card>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <Card className="bg-card border-border p-5 sm:p-6">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-card-foreground mb-2 sm:mb-3">
                    What industries do you work with?
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    We work with businesses across all industries, from startups to established companies. Our focus is on creating effective websites that drive results, regardless of your specific industry.
                  </p>
                </Card>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
