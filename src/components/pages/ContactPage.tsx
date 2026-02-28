import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-24 md:py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary uppercase mb-8">
            Get in Touch
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-secondary italic leading-relaxed">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>
      </section>

      {/* Contact Form Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary uppercase mb-8">
              Let's Connect
            </h2>
            <p className="font-paragraph text-base md:text-lg text-secondary italic mb-12 leading-relaxed">
              Whether you have a question, a project idea, or just want to say hello, we're here to listen. Fill out the form and we'll get back to you shortly.
            </p>

            <div className="space-y-8">
              <div className="border border-subtleborder rounded-2xl p-8">
                <h3 className="font-heading text-lg text-primary uppercase mb-3">
                  Response Time
                </h3>
                <p className="font-paragraph text-base text-secondary italic">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>

              <div className="border border-subtleborder rounded-2xl p-8">
                <h3 className="font-heading text-lg text-primary uppercase mb-3">
                  Office Hours
                </h3>
                <p className="font-paragraph text-base text-secondary italic">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="border border-subtleborder rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-heading text-sm text-primary uppercase tracking-wider mb-2 block">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-subtleborder focus:border-primary font-paragraph italic"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-heading text-sm text-primary uppercase tracking-wider mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-subtleborder focus:border-primary font-paragraph italic"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="font-heading text-sm text-primary uppercase tracking-wider mb-2 block">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border-subtleborder focus:border-primary font-paragraph italic"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <Label htmlFor="message" className="font-heading text-sm text-primary uppercase tracking-wider mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full border-subtleborder focus:border-primary font-paragraph italic resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-primary rounded-lg"
                >
                  <p className="font-paragraph text-sm text-primary italic">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 border border-primary bg-transparent text-primary font-heading text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
