import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Mail, Linkedin, Building, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const quemRef = useRef<HTMLDivElement | null>(null);
  const solucoesRef = useRef<HTMLDivElement | null>(null);
  const [quemOffset, setQuemOffset] = useState(0);
  const [solOffset, setSolOffset] = useState(0);

  const solutions = [
    {
      title: 'Pesquisa e Desenvolvimento',
      description:
        'Nossa equipe de P&D está na vanguarda da tecnologia, explorando novos horizontes em 5G, IoT e comunicação via satélite para criar os produtos do amanhã.',
      image: '/icon-research.png',
    },
    {
      title: 'Hardware Customizado',
      description:
        'Projetamos e fabricamos hardware de telecomunicações sob medida, desde antenas até dispositivos embarcados, para atender às necessidades específicas de cada cliente.',
      image: '/icon-hardware.png',
    },
    {
      title: 'Software e Firmware',
      description:
        'Desenvolvemos software robusto e firmware otimizado que garantem a máxima eficiência, segurança e inteligência para nossos equipamentos de telecomunicação.',
      image: 'https://control.com/uploads/articles/PLCFirmware_1featured.jpg',
    },
  ];

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // trigger hero text animation on mount
  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // compute a limited scroll-based offset for the hero content (background stays fixed)
  const heroScrollOffset = Math.min(scrollY * 0.35, 160); // px, capped

  // compute offsets for other sections so their content 'rises' on scroll
  useEffect(() => {
    let rafId = 0;

    const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

    const update = () => {
      if (quemRef.current) {
        const rect = quemRef.current.getBoundingClientRect();
        const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
        const offset = Math.round(progress * 80); // up to 80px
        setQuemOffset(offset);
      }
      if (solucoesRef.current) {
        const rect = solucoesRef.current.getBoundingClientRect();
        const progress = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
        const offset = Math.round(progress * 80);
        setSolOffset(offset);
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const headerOpacity = Math.min(scrollY / 100, 0.95);
  const isScrolled = scrollY > 50;
  // when scrolled, navbar becomes white; otherwise use #03112A with dynamic opacity
  const headerBg = isScrolled ? 'rgba(255,255,255,0.95)' : `rgba(3,17,42,${headerOpacity})`;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // normalized nav items: id = section id, label = displayed text
  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'quem-somos', label: 'Quem Somos' },
    { id: 'solucoes', label: 'Soluções' }, // id matches section id="solucoes"
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm transition-all duration-300" style={{ backgroundColor: headerBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src={isScrolled ? "/Fita%20Logo%20(1)%20Fundo%20Branco.png" : "/Fita%20Logo%20(1)%20Fundo%20Preto.png"}
                alt="Instituto FITA"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-all duration-300 ease-in-out hover:scale-105 relative group`}
                  style={{ color: isScrolled ? '#03112A' : '#FFFFFF' }}
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                    style={{ backgroundColor: isScrolled ? '#03112A' : '#FFFFFF' }}
                  />
                </button>
              ))}
            </nav>

            <button className="md:hidden p-2 transition-colors duration-300" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ color: isScrolled ? '#03112A' : '#FFFFFF' }}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/20">
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-left font-medium py-2 transition-all duration-300 ease-in-out hover:scale-105"
                    style={{ color: isScrolled ? '#03112A' : '#FFFFFF' }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background layer: blurred and dimmed to improve text contrast */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed transform-gpu"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/fotos-premium/conexoes-de-papel-de-parede-de-fundo-de-tecnologia_913287-99.jpg')",
            filter: 'blur(8px) brightness(0.55)',
            transform: 'scale(1.04)'
          }}
          aria-hidden="true"
        />
        {/* Semi-transparent overlay to further reduce brightness */}
        <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white"
              style={{
                transform: `translateY(${(isMounted ? 0 : 22) - heroScrollOffset}px)`,
                opacity: isMounted ? 1 : 0,
                transition: 'transform 700ms cubic-bezier(0.2,0.8,0.2,1), opacity 700ms ease',
              }}
            >
              Transformando o Futuro com
              <span className="block" style={{ color: '#ffffff' }}>
                Tecnologia e Inovação
              </span>
            </h1>

            <p
              className="text-xl sm:text-2xl mb-8 leading-relaxed"
              style={{
                color: '#ffffff',
                transform: `translateY(${(isMounted ? 0 : 18) - heroScrollOffset}px)`,
                opacity: isMounted ? 1 : 0,
                transition: 'transform 700ms cubic-bezier(0.2,0.8,0.2,1) 120ms, opacity 700ms ease 120ms',
              }}
            >
              O Instituto FITA oferece soluções tecnológicas avançadas para impulsionar seu negócio no mundo digital
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{
                transform: `translateY(${(isMounted ? 0 : 12) - heroScrollOffset}px)`,
                opacity: isMounted ? 1 : 0,
                transition: 'transform 700ms cubic-bezier(0.2,0.8,0.2,1) 220ms, opacity 700ms ease 220ms',
              }}
            >
              <button onClick={() => scrollToSection('solucoes')} className="px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl fita-bg-accent" style={{ backgroundColor: '#AFF021' }}>
                Conheça Nossas Soluções
              </button>
              <button onClick={() => scrollToSection('contato')} className="px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-gray-900">
                Entre em Contato
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
  <section id="quem-somos" className="py-20 bg-gray-50 fita-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto" ref={quemRef}>
            <h2
              className="text-4xl lg:text-5xl font-bold mb-12 text-center fita-text"
              style={{ transform: `translateY(${Math.max(-quemOffset, -80)}px)`, transition: 'transform 450ms ease' }}
            >
              Quem Somos
            </h2>

            <div className="space-y-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg" style={{ transform: `translateY(${Math.max(-quemOffset * 0.5, -40)}px)`, transition: 'transform 450ms ease' }}>
                <h3 className="text-2xl font-bold mb-4 fita-text">
                  Sobre o Instituto FITA
                </h3>
                <p className="text-lg leading-relaxed fita-text">
                  O Instituto FITA é um centro de excelência em pesquisa e desenvolvimento de tecnologias para telecomunicações. Nascido da experiência consolidada da FIOS, empresa pioneira no setor, o FITA foi criado para focar exclusivamente na vanguarda da inovação. Nossa paixão é criar soluções que rompem barreiras e impulsionam a conectividade global.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg" style={{ transform: `translateY(${Math.max(-quemOffset * 0.55, -44)}px)`, transition: 'transform 450ms ease' }}>
                  <h3 className="text-2xl font-bold mb-4 fita-text">
                    Nossa Missão
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Projetar e desenvolver produtos de telecomunicações de alta performance, confiabilidade e segurança, atendendo às demandas de um mundo cada vez mais conectado.
                  </p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg" style={{ transform: `translateY(${Math.max(-quemOffset * 0.55, -44)}px)`, transition: 'transform 450ms ease' }}>
                  <h3 className="text-2xl font-bold mb-4 fita-text">
                    Nossa Visão
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Ser referência global em inovação no setor de telecomunicações, liderando a transformação digital e contribuindo para uma sociedade mais conectada e inteligente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluções - 3 cards */}
  <section id="solucoes" className="py-20 fita-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 fita-text">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 fita-text">
              Nossas Soluções
            </h2>
            <p className="text-xl max-w-3xl mx-auto fita-text">Oferecemos uma gama completa de serviços tecnológicos para atender todas as suas necessidades digitais</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={solucoesRef} style={{ transform: `translateY(${Math.max(-solOffset * 0.45, -48)}px)`, transition: 'transform 450ms ease' }}>
              {solutions.map((solution, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="h-56 flex items-center justify-center bg-gray-50 p-6">
                    <img src={solution.image} alt={solution.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 fita-text">{solution.title}</h3>
                      <p className="fita-text">{solution.description}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
  <section id="contato" className="py-20 bg-gray-50 fita-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 fita-text">
              Entre em Contato
            </h2>
            <p className="text-xl max-w-3xl mx-auto fita-text">Pronto para transformar seu negócio? Entre em contato conosco e descubra como podemos ajudar</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-8 fita-text">
                  Informações de Contato
                </h3>

                  <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#AFF021' }}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 fita-text">Email</h4>
                      <a href="mailto:contato@fita.org.br" className="text-lg hover:underline transition-all duration-300 ease-in-out hover:text-blue-600 text-gray-700">contato@fita.org.br</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#AFF021' }}>
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 fita-text">LinkedIn</h4>
                      <a href="https://linkedin.com/company/instituto-fita" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline transition-all duration-300 ease-in-out hover:text-blue-600 text-gray-700">Instituto FITA</a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#AFF021' }}>
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 fita-text">CNPJ</h4>
                      <p className="text-lg fita-text">48.985.034/0001-09</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#AFF021' }}>
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 fita-text">Telefone</h4>
                      <p className="text-lg fita-text">(92)2020-1001</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#AFF021' }}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 fita-text">Endereço</h4>
                      <p className="text-lg fita-text">Manaus, AM - Brasil</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100">
                  <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#004D40' }}>Fale Conosco</h3>
                  <p className="text-center mb-8 text-gray-600">Escolha a melhor forma de entrar em contato conosco. Estamos prontos para atender você!</p>

                  <div className="space-y-4">
                    <a href="https://wa.me/559220201001" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" style={{ backgroundColor: '#AFF021' }}>
                      <MessageCircle className="w-6 h-6 mr-3 text-white" />
                      WhatsApp
                    </a>

                    <a href="https://linkedin.com/company/instituto-fita" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl" style={{ backgroundColor: '#0077B5' }}>
                      <Linkedin className="w-6 h-6 mr-3" />
                      LinkedIn
                    </a>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-center text-gray-600">Resposta rápida garantida em até 24 horas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8" style={{ backgroundColor: '#0B3445' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fita-text">
          <div className="text-center">
            <p className="text-gray-300">© 2025 Instituto FITA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}