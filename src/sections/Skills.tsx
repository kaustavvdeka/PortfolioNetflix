import { useEffect, useRef } from 'react';
import { 
  Code2, 
  Palette, 
  Server, 
  Database, 
  GitBranch, 
  Cloud,
  Layers,
  Terminal,
  Figma,
  Box
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'React / Next.js', level: 95, icon: Code2 },
        { name: 'TypeScript', level: 90, icon: Terminal },
        { name: 'Tailwind CSS', level: 95, icon: Palette },
        { name: 'Three.js / WebGL', level: 80, icon: Layers },
      ],
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', level: 85, icon: Server },
        { name: 'Python', level: 80, icon: Terminal },
        { name: 'PostgreSQL', level: 85, icon: Database },
        { name: 'GraphQL', level: 75, icon: GitBranch },
      ],
    },
    {
      title: 'Design & Tools',
      skills: [
        { name: 'Figma', level: 90, icon: Figma },
        { name: 'Git / GitHub', level: 95, icon: GitBranch },
        { name: 'Docker', level: 80, icon: Box },
        { name: 'AWS', level: 75, icon: Cloud },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.skills-header',
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

      // Category cards animation
      gsap.fromTo(
        '.skill-category',
        { rotateY: -45, opacity: 0, x: -50 },
        {
          rotateY: 0,
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          },
        }
      );

      // Skill items animation
      gsap.fromTo(
        '.skill-item',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
          },
        }
      );

      // Progress bars animation
      const progressBars = sectionRef.current?.querySelectorAll('.progress-fill');
      progressBars?.forEach((bar, index) => {
        const level = skillCategories[Math.floor(index / 4)].skills[index % 4].level;
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 60%',
            },
            delay: index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#141414] overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#E50914]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="skills-header text-center mb-16">
          <span className="section-label">My Expertise</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-4">
            Skills That <span className="text-gradient">Drive Results</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit built through years of hands-on experience 
            and continuous learning
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1200">
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className="skill-category bg-[#181818] rounded-2xl p-6 border border-white/5 hover:border-[#E50914]/30 transition-all duration-500 preserve-3d hover:translate-z-10"
            >
              {/* Category Title */}
              <h3 className="text-xl font-bold mb-6 text-white">
                {category.title}
              </h3>

              {/* Skills List */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon;
                  return (
                  <div key={skillIndex} className="skill-item">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-[#E50914]">
                          <IconComponent size={20} />
                        </div>
                        <span className="text-sm font-medium text-gray-200">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-[#E50914]">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: '0%' }}
                      />
                    </div>
                  </div>
                )})}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-16">
          <h3 className="text-center text-lg font-semibold mb-6 text-gray-300">
            Additional Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Redux', 'Next.js', 'Vue.js', 'SASS', 'Webpack', 'Jest',
              'CI/CD', 'REST API', 'MongoDB', 'Firebase', 'Vercel', 'Linux'
            ].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#181818] border border-white/10 rounded-full text-sm text-gray-300 hover:border-[#E50914]/50 hover:text-white transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
