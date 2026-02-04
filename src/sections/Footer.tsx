import { useEffect, useRef } from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'Mobile Apps',
    'Consulting',
  ];

  const socialLinks = [
    { name: 'GitHub', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Email', href: 'mailto:hello@portfolio.com' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer entrance animation
      gsap.fromTo(
        '.footer-content',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          },
        }
      );

      // Link columns animation
      gsap.fromTo(
        '.footer-column',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#0A0A0A] pt-16 pb-8 overflow-hidden"
    >
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent animate-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#home');
                }}
                className="inline-block text-2xl font-black text-[#E50914] tracking-tighter mb-4 hover:scale-105 transition-transform"
              >
                PORTFOLIO
              </a>
              <p className="text-gray-400 text-sm leading-relaxed">
                Crafting digital experiences that matter. Transforming ideas into 
                immersive web realities with passion and precision.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 text-sm hover:text-[#E50914] transition-colors duration-300 relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#E50914] transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-column">
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-gray-400 text-sm">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="footer-column">
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-[#E50914] transition-colors duration-300 relative group"
                    >
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#E50914] transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <div className="text-gray-500 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Portfolio. All rights reserved.
              </div>

              {/* Credit */}
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <span>Designed with</span>
                <Heart size={14} className="text-[#E50914] fill-[#E50914] animate-pulse" />
                <span>and passion</span>
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 bg-[#181818] rounded-full flex items-center justify-center hover:bg-[#E50914] transition-all duration-300 group"
                aria-label="Back to top"
              >
                <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
