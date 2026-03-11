import './portfolio.css';
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code2, Zap } from 'lucide-react';

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('sobre-mi');
  const [scrollY, setScrollY] = useState(0);
  const [particleArray, setParticleArray] = useState([]);
  const canvasRef = useRef(null);

  

  const sections = ["sobre-mi", "experiencia", "proyectos", "contacto"];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + height
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const useReveal = () => {
    useEffect(() => {
      const elements = document.querySelectorAll(".reveal");
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
  
      elements.forEach((el) => observer.observe(el));
  
      return () => observer.disconnect();
    }, []);
  };

  useReveal();

  const menu = [
    { label: "Sobre mí", id: "sobre-mi" },
    { label: "Experiencia", id: "experiencia" },
    { label: "Proyectos", id: "proyectos" },
    { label: "Educación", id: "educacion" },
    { label: "Contacto", id: "contacto" },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
  
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  // Track mouse for gradient effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    setParticleArray(particles);

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 15, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > canvas.width || p.x < 0) p.vx *= -1;
        if (p.y > canvas.height || p.y < 0) p.vy *= -1;

        ctx.fillStyle = `rgba(0, 217, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const technologies = [
    'React', 'Vue', 'JavaScript', 'TypeScript', 'Python', 'Java',
    'C#', 'C++', 'C', 'Node.js', 'SQL', '.NET', 'Go', 'Unity', 'ROS2', 'Kafka'
  ];

  const experience = [
    {
      title: 'Desarrolladora de Software',
      company: 'Gestión Tributaria Territorial',
      period: '[FECHA DE INICIO - PRESENTE]',
      points: [
        'Migración de servicios WCF heredados a APIs modernas',
        'Desarrollo de múltiples servicios API en C# con documentación Swagger',
        'Trabajo con PL/SQL y .NET para optimización de sistemas',
        'Participación activa en mejora de arquitectura y rendimiento'
      ]
    },
    {
      title: 'Prácticas en Desarrollo de Software',
      company: 'Wispcontrol, Elche, Alicante',
      period: '[PERÍODO DE PRÁCTICAS]',
      points: [
        'Desarrollo de software de gestión para proveedores de Internet',
        'Implementación de nuevas funcionalidades en JavaScript, HTML y PHP',
        'Realización de pruebas de funcionalidad y aseguramiento de calidad',
        'Garantía del buen rendimiento y estabilidad del sistema'
      ]
    },
    {
      title: 'Proyectos Académicos y Personales',
      company: 'Múltiples iniciativas de desarrollo',
      period: '[EN PROCESO]',
      points: [
        'Librería de Tracing y Profiling para ROS2 en sistemas robóticos distribuidos',
        'Desarrollo de juego en Unity (Puffy) en equipo multidisciplinario',
        'Virtualización de espectáculos con drones usando sistemas distribuidos y Kafka',
        'Aplicación segura de votación en Go con E2EE y cifrado en descanso'
      ]
    }
  ];

  const projects = [
    {
      title: 'Librería Tracing & Profiling ROS2',
      description: 'Herramienta para monitorización y optimización del rendimiento de nodos en sistemas robóticos distribuidos, integrada en un monoplaza autónomo de Formula Student.',
      tags: ['ROS2', 'C++', 'Performance', 'Distributed Systems'],
      icon: '🤖'
    },
    {
      title: 'Puffy - Mascota Virtual',
      description: 'Juego interactivo desarrollado en Unity y C#. Participación en diseño, programación y pruebas en colaboración estrecha con equipo multidisciplinario.',
      tags: ['Unity', 'C#', 'Gamedev', 'Teamwork'],
      icon: '🎮'
    },
    {
      title: 'Virtualización de Espectáculo con Drones',
      description: 'Sistema distribuido conectando tres ordenadores mediante Kafka con comunicación segura. Arquitectura cliente/servidor robusta y escalable.',
      tags: ['Kafka', 'Distributed Systems', 'Architecture'],
      icon: '🚁'
    },
    {
      title: 'Aplicación Segura de Votación en Go',
      description: 'Sistema de votación secreta con arquitectura cliente/servidor. Implementa autenticación segura, cifrado E2EE, almacenamiento seguro y copias de seguridad.',
      tags: ['Go', 'Security', 'Encryption', 'HTTPS'],
      icon: '🔐'
    },
    {
      title: 'Software de Gestión para ISP',
      description: 'Aplicación para gestión de proveedores de Internet. Desarrollo en JavaScript, HTML y PHP con enfoque en funcionalidad y rendimiento.',
      tags: ['JavaScript', 'PHP', 'HTML', 'Web App'],
      icon: '🌐'
    }
  ];

  const languages = [
    { name: 'Español', level: 'Nativo' },
    { name: 'Valenciano', level: 'Nativo' },
    { name: 'Inglés', level: 'Avanzado' },
    { name: 'Francés', level: 'Básico' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      

      <canvas ref={canvasRef} className="fixed inset-0" />

      {/* Glow effect following mouse */}
      <div
        className="glow-effect bg-cyan-400/20"
        style={{
          width: '300px',
          height: '300px',
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          transition: 'all 0.15s ease-out'
        }}
      />

      <div className="content">
        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-cyan-500/20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="mono text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500">
              MDL
            </div>
            <div className="flex gap-8 text-sm">
              {menu.map((item) => (
                <div
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-item cursor-pointer transition ${
                    activeSection === item.id
                      ? "text-cyan-400"
                      : "text-gray-300 hover:text-cyan-400"
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="min-h-screen flex items-center px-6 pt-20">
          <div className="max-w-4xl mx-auto">
            <div className="animate-slide-left">
              <p className="mono text-cyan-400 text-sm tracking-widest">Bienvenido a mi portafolio</p>
              <h1 className="text-7xl font-bold mt-4 leading-tight animate-glow">
                Hola, soy <span className="text-gradient">Míriam</span>
              </h1>
            </div>

            <div className="animate-slide-right mt-6 delay-100">
              <p className="text-2xl font-light text-gray-300 leading-relaxed max-w-2xl">
                Desarrolladora de Software apasionada por crear soluciones robustas y escalables. 
                Especializada en desarrollo full-stack con experiencia en arquitecturas distribuidas, APIs y sistemas complejos.
              </p>
            </div>

            <div className="flex gap-6 mt-12 animate-fade-up">
              <button
                onClick={() => scrollToSection("proyectos")}
                className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-400/50 transition transform hover:scale-105"
              >
                Ver mis trabajos
              </button>
              <button className="px-8 py-3 border border-cyan-400 rounded-lg font-semibold text-cyan-400 hover:bg-cyan-400/10 transition">
                Descargar CV
              </button>
            </div>

            <div className="mt-16 animate-float">
              <ChevronDown className="w-6 h-6 text-cyan-400 animate-bounce" />
            </div>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section id="sobre-mi" className="min-h-screen flex items-center px-6 py-20 reveal">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-12 text-gradient">Sobre mí</h2>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="animate-slide-left">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Soy una desarrolladora Junior con formación en Ingeniería Informática (mención en Desarrollo de Software) 
                  de la Comunidad Valenciana. Cuento con experiencia práctica en el desarrollo de aplicaciones, 
                  migración de servicios legacy, arquitecturas distribuidas y sistemas de tiempo real.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Mi enfoque está en escribir código limpio, mantenible y que resuelva problemas reales. 
                  Disfruto aprendiendo nuevas tecnologías y colaborando en equipos multidisciplinarios.
                </p>
              </div>

              <div className="animate-slide-right">
                <div className="grid grid-cols-2 gap-4">
                  <div className="animate-liquid">
                    <Code2 className="w-12 h-12 text-cyan-400 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Desarrollo</h3>
                    <p className="text-gray-400 text-sm">Full-stack desde frontend hasta infraestructura</p>
                  </div>
                  <div className="animate-liquid">
                    <Zap className="w-12 h-12 text-pink-500 mb-4" />
                    <h3 className="font-bold text-lg mb-2">Performance</h3>
                    <p className="text-gray-400 text-sm">Optimización y escalabilidad en sistemas complejos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold mb-8">Stack Tecnológico</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {technologies.map((tech, i) => (
                  <div
                    key={tech}
                    className="tech-card px-4 py-3 rounded-lg text-center font-semibold text-cyan-400 text-sm"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCIA */}
        <section id="experiencia" className="min-h-screen flex items-center px-6 py-20 reveal">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-12 text-gradient">Experiencia</h2>

            <div className="space-y-8">
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="experience-line p-6 bg-slate-900/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/60 transition"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <h3 className="text-2xl font-bold text-cyan-400 mb-1">{exp.title}</h3>
                  <p className="text-gray-400 font-semibold mb-1">{exp.company}</p>
                  <p className="text-sm text-gray-500 mono mb-4">{exp.period}</p>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-gray-300 flex items-start">
                        <span className="text-pink-500 mr-3 mt-1">›</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROYECTOS */}
        <section id="proyectos" className="min-h-screen flex items-center px-6 py-20 reveal">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-12 text-gradient">Proyectos Destacados</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="project-card p-6 rounded-lg"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{project.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded border border-cyan-500/30 font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-3 text-sm">
                    <a href="#" className="text-cyan-400 hover:text-pink-500 transition flex items-center gap-1">
                      GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                    <a href="#" className="text-cyan-400 hover:text-pink-500 transition flex items-center gap-1">
                      Demo <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCACIÓN & IDIOMAS */}
        <section id="educacion" className="min-h-screen flex items-center px-6 py-20 reveal">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-5xl font-bold mb-12 text-gradient">Educación e Idiomas</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/60 transition">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Formación Académica</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="border-l-2 border-pink-500 pl-4">
                    <strong>Ingeniería Informática</strong><br/>
                    <span className="text-sm text-gray-400">Mención en Desarrollo de Software</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/60 transition">
                <h3 className="text-xl font-bold text-pink-500 mb-4">Idiomas</h3>
                <ul className="space-y-3">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex justify-between items-center">
                      <span className="text-gray-300">{lang.name}</span>
                      <span className="text-cyan-400 text-sm font-semibold">{lang.level}</span>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-slate-900/50 rounded-lg border border-cyan-500/20 hover:border-cyan-500/60 transition">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Habilidades Blandas</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>✓ Trabajo en equipo</li>
                  <li>✓ Comunicación clara</li>
                  <li>✓ Metodologías Ágiles</li>
                  <li>✓ Curiosidad técnica</li>
                  <li>✓ Problem solving</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACTO */}
        <section id="contacto" className="min-h-screen flex items-center px-6 py-20 reveal">
          <div className="max-w-4xl mx-auto w-full text-center">
            <h2 className="text-5xl font-bold mb-6 text-gradient">¿Hablamos?</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Siempre estoy abierta a colaboraciones, proyectos interesantes y nuevas oportunidades. 
              No dudes en contactarme a través de cualquiera de estos canales.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-16">
              <a href="mailto:[TU_EMAIL]" className="flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/50 rounded-lg hover:border-cyan-400 hover:bg-cyan-500/20 transition group">
                <Mail className="w-5 h-5 text-cyan-400 group-hover:animate-bounce" />
                <span>[TU_EMAIL]</span>
              </a>
              <a href="https://linkedin.com/in/[TU_LINKEDIN]" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-pink-500/10 border border-pink-500/50 rounded-lg hover:border-pink-400 hover:bg-pink-500/20 transition group">
                <Linkedin className="w-5 h-5 text-pink-400 group-hover:animate-bounce" />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/[TU_GITHUB]" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-3 bg-purple-500/10 border border-purple-500/50 rounded-lg hover:border-purple-400 hover:bg-purple-500/20 transition group">
                <Github className="w-5 h-5 text-purple-400 group-hover:animate-bounce" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="p-8 bg-slate-900/50 rounded-lg border border-cyan-500/20 animate-pulse-glow">
              <p className="text-gray-400 mb-4">O llámame al</p>
              <p className="text-2xl font-bold text-cyan-400 mono">[TU_TELÉFONO]</p>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-cyan-500/20 py-8 px-6 text-center text-gray-500 text-sm">
          <p className="mono">© 2024 Míriam Domenech López. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}