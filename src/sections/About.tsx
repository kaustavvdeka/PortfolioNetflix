import { useEffect, useRef } from 'react';
import { Download, Code, Users, Award, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { icon: Code, value: 50, suffix: '+', label: 'Projects Completed' },
    { icon: Clock, value: 5, suffix: '+', label: 'Years Experience' },
    { icon: Users, value: 30, suffix: '+', label: 'Happy Clients' },
    { icon: Award, value: 100, suffix: '%', label: 'Satisfaction' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label animation
      gsap.fromTo(
        '.about-label',
        { width: 0, opacity: 0 },
        {
          width: 'auto',
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Headline animation
      gsap.fromTo(
        '.about-headline span',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Body text animation
      gsap.fromTo(
        '.about-text',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        '.about-image',
        { rotateY: -90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-value');
      statElements?.forEach((el, index) => {
        const target = stats[index].value;
        gsap.fromTo(
          el,
          { innerText: 0, scale: 0.8, opacity: 0 },
          {
            innerText: target,
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
            delay: index * 0.1,
          }
        );
      });

      // Stats cards animation
      gsap.fromTo(
        '.stat-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Parallax effect
      gsap.to('.about-image', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#141414] overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#E50914]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative perspective-1200 order-2 lg:order-1">
            <div className="about-image relative preserve-3d">
              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-[#E50914]/30 rounded-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E50914]/10 rounded-2xl" />
              
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about-profile.png"
                  alt="About"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/40 to-transparent" />
              </div>

              {/* Experience Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#E50914] text-white px-6 py-4 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">2+</div>
                <div className="text-sm">Years Exp.</div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Section Label */}
            <div className="about-label overflow-hidden">
              <span className="section-label">About Me</span>
            </div>

            {/* Headline */}
            <h2 className="about-headline text-4xl lg:text-5xl font-bold leading-tight">
              <span className="inline-block">Turning</span>{' '}
              <span className="inline-block text-gradient">Vision</span>{' '}
              <span className="inline-block">Into</span>{' '}
              <span className="inline-block">Reality</span>
            </h2>

            {/* Body Text */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="about-text">
              With over five years of experience, I specialize in engineering digital solutions where high-level performance meets intuitive design. What started as a fascination with the inner workings of the web has matured into a career dedicated to building scalable, impactful systems that function as flawlessly as they look. </p>
              <p className="about-text">
               I bridge the gap between complex backend logic and seamless frontend experiences. For me, full-stack development isn’t just about writing code—it’s about architecting digital products that are as scalable as they are user-friendly.
              </p>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="stat-card bg-[#181818] rounded-xl p-4 text-center hover:bg-[#2F2F2F] transition-colors duration-300 group"
                >
                  <stat.icon className="w-6 h-6 text-[#E50914] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="stat-value text-2xl font-bold text-white">
                    0{stat.suffix}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="netflix-btn flex items-center gap-2 group">
                <Download size={18} className="group-hover:animate-bounce" />
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
