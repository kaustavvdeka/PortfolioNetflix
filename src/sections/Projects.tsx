import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  link: string;
  github: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: 'Web Development',
      description: 'A full-featured online shopping experience with real-time inventory management, seamless checkout flow, and personalized recommendations.',
      tech: ['React', 'Node.js', 'MongoDB'],
      image: '/project-1.jpg',
      link: '#',
      github: '#',
    },
    {
      id: 2,
      title: 'Portfolio Dashboard',
      category: 'UI/UX Design',
      description: 'An intuitive analytics dashboard for tracking investment performance in real-time with interactive charts and data visualization.',
      tech: ['Next.js', 'D3.js', 'PostgreSQL'],
      image: '/project-2.jpg',
      link: '#',
      github: '#',
    },
    {
      id: 3,
      title: 'Social Media App',
      category: 'Mobile Development',
      description: 'A connected platform for sharing moments and building communities with real-time messaging and story features.',
      tech: ['React Native', 'Firebase'],
      image: '/project-3.jpg',
      link: '#',
      github: '#',
    },
    {
      id: 4,
      title: 'AI Content Generator',
      category: 'Machine Learning',
      description: 'An intelligent tool that creates personalized content using advanced language models and natural language processing.',
      tech: ['Python', 'TensorFlow', 'OpenAI'],
      image: '/project-4.jpg',
      link: '#',
      github: '#',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.projects-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Project cards animation
      gsap.fromTo(
        '.project-card',
        { x: 100, rotateY: 25, opacity: 0 },
        {
          x: 0,
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const cardWidth = carouselRef.current.querySelector('.project-card')?.clientWidth || 400;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    
    const newIndex = direction === 'left' 
      ? Math.max(0, activeIndex - 1)
      : Math.min(projects.length - 1, activeIndex + 1);
    
    setActiveIndex(newIndex);
    
    carouselRef.current.scrollTo({
      left: newIndex * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#141414] overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-[#E50914]/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="projects-header flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="section-label">Featured Work</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4">
              Projects That <span className="text-gradient">Speak Volumes</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-xl">
              A curated selection of my most impactful work, showcasing creativity and technical excellence
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scrollCarousel('left')}
              className={`p-3 rounded-full border border-white/20 transition-all duration-300 ${
                activeIndex === 0 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#E50914] hover:border-[#E50914] hover:scale-110'
              }`}
              disabled={activeIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className={`p-3 rounded-full border border-white/20 transition-all duration-300 ${
                activeIndex === projects.length - 1 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#E50914] hover:border-[#E50914] hover:scale-110'
              }`}
              disabled={activeIndex === projects.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Projects Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start preserve-3d ${
                index === activeIndex ? 'scale-100' : 'scale-95 opacity-80'
              }`}
            >
              <div className="group relative bg-[#181818] rounded-2xl overflow-hidden border border-white/5 hover:border-[#E50914]/30 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#E50914]/90 text-white text-xs font-semibold rounded-full">
                    {project.category}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.link}
                      className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-[#E50914] transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.github}
                      className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-[#E50914] transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#E50914] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-[#2F2F2F] text-xs text-gray-300 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                carouselRef.current?.scrollTo({
                  left: index * 424,
                  behavior: 'smooth',
                });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-8 bg-[#E50914]' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
