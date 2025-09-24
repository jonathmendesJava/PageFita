import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft, ChevronRight, Mail, Linkedin, Building, Phone, MapPin, MessageCircle } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  
  const solutions = [
    {
      title: "Pesquisa e Desenvolvimento",
      description: "Nossa equipe de P&D está na vanguarda da tecnologia, explorando novos horizontes em 5G, IoT e comunicação via satélite para criar os produtos do amanhã.",
      image: "/icon-research.png"
    },
    {
      title: "Hardware Customizado",
      description: "Projetamos e fabricamos hardware de telecomunicações sob medida, desde antenas até dispositivos embarcados, para atender às necessidades específicas de cada cliente.",
      image: "/icon-hardware.png"
    },
    {
      title: "Software e Firmware",
      description: "Desenvolvemos software robusto e firmware otimizado que garantem a máxima eficiência, segurança e inteligência para nossos equipamentos de telecomunicação.",
      image: "https://control.com/uploads/articles/PLCFirmware_1featured.jpg"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % solutions.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % solutions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + solutions.length) % solutions.length);
  };

  const headerOpacity = Math.min(scrollY / 100, 0.95);
  // navbar color set to #000002 (using rgba for dynamic opacity)
  const headerBg = scrollY > 50
    ? `rgba(0, 0, 2, ${headerOpacity})`
    : 'rgba(0, 0, 2, 0.95)';
  const textColor = 'text-white';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm shadow-sm transition-all duration-300"
        style={{ backgroundColor: headerBg }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/fita.jpeg" 
                alt="Instituto FITA" 
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['inicio', 'quem-somos', 'solucoes', 'contato'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-400 relative group ${textColor}`}
                >
                  {section.replace('-', ' ')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 transition-colors duration-300 ${textColor}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200/20">
              <nav className="flex flex-col space-y-3">
                {['inicio', 'quem-somos', 'solucoes', 'contato'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-left capitalize font-medium py-2 transition-all duration-300 ease-in-out hover:scale-105 hover:text-blue-400 ${textColor}`}
                  >
                    {section.replace('-', ' ')}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative">
        {/* background image placed behind content */}
        <img
          src="/hero-background%20(1).png"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ filter: 'brightness(0.95)' }}
        />
        {/* subtle overlay to keep text readable without changing their colors */}
        <div className="absolute inset-0 bg-white/22 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Transformando o Futuro com
              <span className="block" style={{ color: '#09384B' }}>
                Tecnologia e Inovação
              </span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 leading-relaxed" style={{ color: '#09384B' }}>
              O Instituto FITA oferece soluções tecnológicas avançadas para impulsionar 
              seu negócio no mundo digital
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('solucoes')}
                className="px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:brightness-110"
                style={{ backgroundColor: '#007BFF' }}
              >
                Conheça Nossas Soluções
              </button>
              <button
                onClick={() => scrollToSection('contato')}
                className="px-8 py-4 text-lg font-semibold border-2 border-white text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-white hover:text-gray-900 hover:shadow-xl"
              >
                Entre em Contato
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section id="quem-somos" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center" style={{ color: '#004D40' }}>
              Quem Somos
            </h2>
            
            <div className="space-y-12">
              {/* Sobre o Instituto FITA */}
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold mb-4" style={{ color: '#004D40' }}>
                  Sobre o Instituto FITA
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  O Instituto FITA é um centro de excelência em pesquisa e desenvolvimento de tecnologias para telecomunicações. 
                  Nascido da experiência consolidada da FIOS, empresa pioneira no setor, o FITA foi criado para focar exclusivamente 
                  na vanguarda da inovação. Nossa paixão é criar soluções que rompem barreiras e impulsionam a conectividade global.
                </p>
              </div>
              
              {/* Missão e Visão */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#004D40' }}>
                    Nossa Missão
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Projetar e desenvolver produtos de telecomunicações de alta performance, confiabilidade e segurança, 
                    atendendo às demandas de um mundo cada vez mais conectado.
                  </p>
                </div>
                
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#004D40' }}>
                    Nossa Visão
                  </h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Ser referência global em inovação no setor de telecomunicações, liderando a transformação digital 
                    e contribuindo para uma sociedade mais conectada e inteligente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Soluções Section */}
      <section id="solucoes" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#004D40' }}>
              Nossas Soluções
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Oferecemos uma gama completa de serviços tecnológicos para atender todas as suas necessidades digitais
            </p>
          </div>
          
          {/* Infinite Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Original slides */}
                {solutions.map((solution, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white">
                      <div className="h-64 sm:h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
                        <img
                          src={solution.image}
                          alt={solution.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="p-8">
                        <h3 className="text-2xl font-bold mb-4" style={{ color: '#004D40' }}>
                          {solution.title}
                        </h3>
                        <p className="text-lg leading-relaxed text-gray-700">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate first slide for infinite effect */}
                <div className="w-full flex-shrink-0">
                  <div className="bg-white">
                    <div className="h-64 sm:h-80 flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
                      <img
                        src={solutions[0].image}
                        alt={solutions[0].title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-4" style={{ color: '#004D40' }}>
                        {solutions[0].title}
                      </h3>
                      <p className="text-lg leading-relaxed text-gray-700">
                        {solutions[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl text-white"
              style={{ backgroundColor: 'rgba(0, 123, 255, 0.9)' }}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl text-white"
              style={{ backgroundColor: 'rgba(0, 123, 255, 0.9)' }}
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Dots */}
            <div className="flex justify-center space-x-3 mt-6">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out hover:scale-125 ${
                    index === currentSlide 
                      ? 'w-8' 
                      : 'opacity-50 hover:opacity-75'
                  }`}
                  style={{ backgroundColor: '#007BFF' }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#004D40' }}>
              Entre em Contato
            </h2>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Pronto para transformar seu negócio? Entre em contato conosco e descubra como podemos ajudar
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info - Left Side */}
              <div>
                <h3 className="text-2xl font-bold mb-8" style={{ color: '#004D40' }}>
                  Informações de Contato
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#007BFF' }}>
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004D40' }}>Email</h4>
                      <a 
                        href="mailto:contato@institutofita.com.br"
                        className="text-lg hover:underline transition-all duration-300 ease-in-out hover:text-blue-600 text-gray-700"
                      >
                        contato@institutofita.com.br
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#007BFF' }}>
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004D40' }}>LinkedIn</h4>
                      <a 
                        href="https://linkedin.com/company/instituto-fita"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg hover:underline transition-all duration-300 ease-in-out hover:text-blue-600 text-gray-700"
                      >
                        Instituto FITA
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#007BFF' }}>
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004D40' }}>CNPJ</h4>
                      <p className="text-lg text-gray-700">
                        12.345.678/0001-90
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#007BFF' }}>
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004D40' }}>Telefone</h4>
                      <p className="text-lg text-gray-700">
                        (92)0000-8888
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: '#007BFF' }}>
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: '#004D40' }}>Endereço</h4>
                      <p className="text-lg text-gray-700">
                        Manaus, AM - Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Actions - Right Side */}
              <div className="flex flex-col justify-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-blue-100">
                  <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: '#004D40' }}>
                    Fale Conosco
                  </h3>
                  <p className="text-center mb-8 text-gray-600">
                    Escolha a melhor forma de entrar em contato conosco. Estamos prontos para atender você!
                  </p>
                  
                  <div className="space-y-4">
                    <a
                      href="https://wa.me/551199998888"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:brightness-110"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      <MessageCircle className="w-6 h-6 mr-3" />
                      WhatsApp
                    </a>
                    
                    <a
                      href="https://linkedin.com/company/instituto-fita"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full px-6 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:brightness-110"
                      style={{ backgroundColor: '#0077B5' }}
                    >
                      <Linkedin className="w-6 h-6 mr-3" />
                      LinkedIn
                    </a>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-center text-gray-600">
                      Resposta rápida garantida em até 24 horas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: '#0B3445' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-300">
              © 2024 Instituto FITA. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;