import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
            About Us
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-secondary italic leading-relaxed">
            We are dedicated to creating meaningful experiences through thoughtful design and meticulous craftsmanship.
          </p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary uppercase mb-6">
              Our Story
            </h2>
            <p className="font-paragraph text-base md:text-lg text-secondary italic mb-6 leading-relaxed">
              Founded on the principles of timeless design and exceptional quality, we have been creating experiences that resonate with people on a deeper level. Our journey began with a simple belief: that great design should be both beautiful and functional.
            </p>
            <p className="font-paragraph text-base md:text-lg text-secondary italic leading-relaxed">
              Today, we continue to push boundaries while staying true to our core values of simplicity, elegance, and attention to detail. Every project we undertake is an opportunity to create something extraordinary.
            </p>
          </motion.div>

          <motion.div
            className="rounded-3xl overflow-hidden bg-mutedgray"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="https://static.wixstatic.com/media/c9b5f3_56616aee4bb141ad84a2289b18e7c144~mv2.png?originWidth=768&originHeight=576"
              alt="Our workspace and creative process"
              className="w-full h-full object-cover"
              width={800}
            />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-16 md:py-24">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-primary uppercase mb-6">
            Our Values
          </h2>
          <p className="font-paragraph text-base md:text-lg text-secondary italic max-w-3xl mx-auto">
            These principles guide everything we do and shape the way we approach each project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
          <motion.div
            className="border border-subtleborder rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-xl md:text-2xl text-primary uppercase mb-4">
              Excellence
            </h3>
            <p className="font-paragraph text-base text-secondary italic">
              We are committed to delivering the highest quality in everything we create, never settling for anything less than exceptional.
            </p>
          </motion.div>

          <motion.div
            className="border border-subtleborder rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-heading text-xl md:text-2xl text-primary uppercase mb-4">
              Integrity
            </h3>
            <p className="font-paragraph text-base text-secondary italic">
              Honesty and transparency are at the heart of our relationships with clients and partners.
            </p>
          </motion.div>

          <motion.div
            className="border border-subtleborder rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-heading text-xl md:text-2xl text-primary uppercase mb-4">
              Innovation
            </h3>
            <p className="font-paragraph text-base text-secondary italic">
              We embrace new ideas and approaches while respecting timeless design principles.
            </p>
          </motion.div>

          <motion.div
            className="border border-subtleborder rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-heading text-xl md:text-2xl text-primary uppercase mb-4">
              Collaboration
            </h3>
            <p className="font-paragraph text-base text-secondary italic">
              We believe the best results come from working closely with our clients and understanding their vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 md:px-16 py-24 md:py-32">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl text-primary uppercase mb-6">
            Let's Work Together
          </h2>
          <p className="font-paragraph text-base md:text-lg text-secondary italic mb-8">
            Ready to bring your vision to life? We'd love to hear from you.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 border border-primary text-primary font-heading text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            Get in Touch
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
