import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, Dribbble,Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'kaustav.mani.deka@aus.ac.in' },
    { icon: Phone, label: 'Phone', value: '+91 8822182088' },
    { icon: MapPin, label: 'Location', value: 'Guwahati, Assam' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/kaustavvdeka' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/kaustav-mani-deka-b6798a24b/' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Dribbble, label: 'Dribbble', href: '#' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/electrophile_kd/' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel animation
      gsap.fromTo(
        '.contact-left',
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Right panel animation
      gsap.fromTo(
        '.contact-right',
        { clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', opacity: 0 },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Content animations
      gsap.fromTo(
        '.contact-headline span',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.contact-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );

      gsap.fromTo(
        '.social-icon',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      gsap.fromTo(
        '.form-field',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#141414] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#E50914]/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden">
          {/* Left Panel - Info */}
          <div className="contact-left bg-[#181818] p-8 lg:p-12">
            {/* Section Label */}
            <span className="section-label">Get In Touch</span>

            {/* Headline */}
            <h2 className="contact-headline text-3xl lg:text-4xl font-bold mt-4 mb-4">
              <span className="inline-block">Let's</span>{' '}
              <span className="inline-block text-gradient">Create</span>{' '}
              <span className="inline-block">Something</span>{' '}
              <span className="inline-block">Amazing</span>
            </h2>

            <p className="text-gray-400 mb-8">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-[#2F2F2F] rounded-xl flex items-center justify-center group-hover:bg-[#E50914] transition-colors duration-300">
                    <item.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{item.label}</div>
                    <div className="text-white font-medium">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <div className="text-sm text-gray-400 mb-4">Follow Me</div>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-icon w-10 h-10 bg-[#2F2F2F] rounded-full flex items-center justify-center hover:bg-[#E50914] hover:rotate-[360deg] transition-all duration-500"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="contact-right bg-[#0f0f0f] p-8 lg:p-12">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all duration-300 outline-none"
                    placeholder="Your name"
                  />
                </div>

                {/* Email Field */}
                <div className="form-field">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all duration-300 outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-field">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all duration-300 outline-none"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message Field */}
              <div className="form-field">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] transition-all duration-300 outline-none resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full netflix-btn flex items-center justify-center gap-2 group ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : submitted ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
