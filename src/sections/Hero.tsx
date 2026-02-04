import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ArrowDown, Play, Info } from 'lucide-react';
import gsap from 'gsap';

// 3D Animated Sphere Component
const AnimatedSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 100, 100]} scale={2}>
      <MeshDistortMaterial
        color="#E50914"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Particle Field Component
const ParticleField = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;
  
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
  }
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#E50914"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// 3D Scene Component
const Scene3D = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#E50914" intensity={0.5} />
      <AnimatedSphere />
      <ParticleField />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const ctx = gsap.context(() => {
      // Content entrance animation
      gsap.fromTo(
        '.hero-title-word',
        { y: 100, opacity: 0, rotateX: 45 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'expo.out',
          delay: 0.7,
        }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          delay: 0.9,
        }
      );

      gsap.fromTo(
        '.hero-image',
        { z: -200, rotateY: 15, opacity: 0 },
        {
          z: 0,
          rotateY: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.5,
        }
      );

      // Scroll parallax effect
      gsap.to('.hero-content', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -100,
        opacity: 0.3,
      });

      gsap.to('.hero-image', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: -50,
        scale: 1.05,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#141414]"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <Scene3D />
        </Canvas>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <div ref={contentRef} className="hero-content space-y-8">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-[#E50914]/10 border border-[#E50914]/30 rounded-full transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 bg-[#E50914] rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#E50914]">Available for Projects</span>
            </div>

            {/* Title */}
            <div className="space-y-2 perspective-1200">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                <span className="hero-title-word inline-block">Kaustav</span>{' '}
                <span className="hero-title-word inline-block text-gradient">Mani </span>{' '}
                <span className="hero-title-word inline-block">Deka</span>{' '}
              </h1>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
              Building high-performance digital products that bridge the gap between bold ideas and user-centric reality.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('#projects')}
                className="hero-cta netflix-btn flex items-center gap-2 group"
              >
                <Play size={18} className="transition-transform group-hover:scale-110" />
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="hero-cta netflix-btn-outline flex items-center gap-2"
              >
                <Info size={18} />
                Contact Me
              </button>
            </div>

            {/* Stats */}
            <div className="hero-cta flex gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-[#E50914]">15+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#E50914]">1+</div>
                <div className="text-sm text-gray-400">Years Exp.</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#E50914]">4+</div>
                <div className="text-sm text-gray-400">Clients</div>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div
            ref={imageRef}
            className="hero-image relative hidden lg:flex items-center justify-center perspective-1200"
          >
            <div className="relative w-full max-w-md preserve-3d">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-[#E50914]/20 rounded-3xl blur-3xl transform scale-110" />
              
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl transform transition-transform duration-500 hover:scale-[1.02] hover:rotate-y-5">
                <img
                  src="/hero-profile.jpeg"
                  alt="Profile"
                  className="w-full h-auto object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#E50914]/20 rounded-full blur-xl animate-float" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#E50914]/30 rounded-full blur-lg animate-float stagger-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection('#about')}
          className="flex flex-col items-center gap-2 text-white/50 hover:text-[#E50914] transition-colors"
        >
          <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
          <ArrowDown size={20} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
