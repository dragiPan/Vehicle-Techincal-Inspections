// Import all assets from organized imports file
import {
  // React imports
  useState,
  useEffect,
} from "react";
import React from "react";

// Import all assets from organized imports file
import {
  // Logo and branding
  logo,
  logoWhite,
  
  // Videos
  heroVideo,
  heroVideoMobile,
  
  // Service icons
  carLogo,
  wheelLogo,
  keysLogo,
  
  // UI elements
  carImg,
  checkboxImg,
  arrowLeft,
  arrowRight,
  menuIcon,
  
  // Background images
  kamioniBg,
  fullContentBg,
  fonPogledBg,
  teamBg,
  
  // Carousel images - new webp versions for mobile/tablet (below lg breakpoint)
  carousel1,
  carousel2,
  carousel3,
  carousel4,
  carousel5,
  carousel6,
  carousel7,
  carousel8,
  carousel9,
  carousel10,
  carousel11,
  carousel12,
  carousel13,
  carousel14,
  carousel15,
  
  // Carousel images - DSC versions for desktop (lg breakpoint and above)
  carousel3DSC,
  carousel5DSC,
  carousel6DSC,
  carousel7DSC,
  carousel9DSC,
  carousel10DSC,
  carousel12DSC,
  carousel13DSC,
  carousel15DSC,
  carousel16DSC,
  carousel18DSC,
  carousel20DSC,
  carousel21DSC,
  carousel22DSC,
  
  // Legacy carousel images (slajd images)
  slajd1,
  slajd3,
  slajd4,
  slajd5,
  
  // Team member images - new webp versions with first names
  oliver_direktor,
  veljko_menadzer,
  natasa_agent,
  bozica_pravnik,
  sanja_kontrolor,
  mirko_kontrolor,
  srdjan_kontrolor,
  dejan_kontrolor,
} from "./imports";

const HERO_OPTIONS = [
  {
    key: "tehnicki",
    label: "TEHNIČKI PREGLED",
  },
  {
    key: "osiguranje",
    label: "OSIGURANJE",
  },
  {
    key: "registracija",
    label: "REGISTRACIJA VOZILA",
  },
];



function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("pocetna");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Calculate background position based on window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check screen size and handle scroll
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial screen size
    checkScreenSize();

    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300);

      // Close mobile menu on scroll
      if (isMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }

      // Handle sticky navbar (only for desktop)
      if (!isMobile) {
        const headerHeight = document.querySelector('.header-section')?.offsetHeight || 0;
        setIsNavSticky(window.scrollY > headerHeight);
      }

      // Determine active section
      const sections = [
        { id: 'pocetna', element: document.getElementById('pocetna') },
        { id: 'usluge', element: document.getElementById('usluge') },
        { id: 'onama', element: document.getElementById('onama') },
        { id: 'nastim', element: document.getElementById('nastim') },
        { id: 'mapa', element: document.getElementById('mapa') },
        { id: 'kontakt', element: document.getElementById('kontakt') }
      ];

      const scrollPosition = window.scrollY + 100; // Offset for better detection

      // Normal section detection
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionHeight = section.element.offsetHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          // For map and kontakt sections, highlight 'kontakt' nav button
          if (section.id === 'mapa' || section.id === 'kontakt') {
            if (scrollPosition >= sectionTop) {
              setActiveSection('kontakt'); // Always set to 'kontakt' for navigation highlighting
              break;
            }
          } else {
            // For other sections, use normal detection
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              setActiveSection(section.id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [isMobile, isMobileMenuOpen]);

  // Mobile menu toggle function
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
    
    // Special case for "pocetna" - scroll to very top
    if (sectionId === 'pocetna') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      // Get the element's position relative to the document
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementPosition = rect.top + scrollTop;
      
      // Account for navbar height
      const offset = 70; // Fixed navbar height offset
      const targetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

    // Car animation trigger for both versions
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Handle all car animations using common class
          entry.target
            .querySelectorAll('.car-animation')
            .forEach(el => el.classList.add('drive-in'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    // Function to set up observers for car elements
    const setupCarObservers = () => {
      document
        .querySelectorAll('.car-animation')
        .forEach(el => {
          const section = el.closest('section');
          if (section) {
            observer.observe(section);
          }
        });
    };

    // Initial setup
    setupCarObservers();

    // Set up observers again after a short delay to catch any elements that might not be rendered yet
    const timeoutId = setTimeout(setupCarObservers, 100);

    // Cleanup
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className={`header-section flex flex-row items-center justify-between w-full bg-white py-3 px-8 md:px-10 lg:px-30 xl:px-40 2xl:px-50 ${isMobile ? 'fixed top-0 z-50 shadow-lg' : ''}`}>
        <div className="flex-shrink-0">
          <img src={logo} alt="Tehnički pregled Oliver logo" className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] xl:w-[360px] 2xl:w-[393px] h-auto" />
        </div>
        
        {/* Desktop Contact Info - Hidden on mobile */}
        <div className="hidden md:flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column */}
          <div className="flex flex-col items-start gap-1 min-w-0 lg:min-w-[220px]">
            <div>
              <span className="text-[#DC1B21] font-inter font-bold text-[16px] lg:text-[18px] xl:text-[20px]">Telefon:</span>
              <span className="text-black font-inter font-normal text-[16px] lg:text-[18px] xl:text-[20px] ml-2">+381 36 586 2222</span>
            </div>
            <div>
              <span className="text-[#DC1B21] font-inter font-bold text-[16px] lg:text-[18px] xl:text-[20px]">Mobilni:</span>
              <span className="text-black font-inter font-normal text-[16px] lg:text-[18px] xl:text-[20px] ml-2">+381 63 839 9940</span>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col items-start gap-1 min-w-0 lg:min-w-[180px]">
            <div className="text-[#DC1B21] font-inter font-bold text-[16px] lg:text-[18px] xl:text-[20px]">Radno vreme</div>
            <div className="text-black font-inter font-normal text-[16px] lg:text-[18px] xl:text-[20px]">Radnim danima: 07–17h</div>
            <div className="text-black font-inter font-normal text-[16px] lg:text-[18px] xl:text-[20px]">Subotom: 07–14h</div>
          </div>
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <div className="md:hidden mobile-menu-container">
          <button
            onClick={toggleMobileMenu}
            className="p-2 hover:bg-gray-100 rounded transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <img src={menuIcon} alt="Menu" className="w-8 h-8" />
          </button>
        </div>
      </div>
      {/* Navigation Section */}
      <nav className={`w-screen bg-[#1D1D1D] transition-all duration-300 mobile-menu-container ${isMobile ? 'fixed top-[70px] z-40 shadow-lg' : isNavSticky ? 'fixed top-0 z-50 shadow-lg' : 'relative'}`}>
        {/* Desktop Navigation - Hidden on mobile */}
        <ul className="hidden md:flex flex-wrap justify-between items-center w-full py-3" style={{ width: '60%', margin: '0 auto' }}>
          <li>
            <button 
              onClick={() => scrollToSection('pocetna')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${activeSection === 'pocetna' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              Početna
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('usluge')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${activeSection === 'usluge' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              Usluge
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('onama')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${activeSection === 'onama' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              O nama
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('nastim')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${activeSection === 'nastim' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              Naš tim
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('kontakt')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${activeSection === 'kontakt' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              Kontakt
            </button>
          </li>
        </ul>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="flex flex-col items-center py-4 space-y-2">
            <li>
              <button 
                onClick={() => scrollToSection('pocetna')}
                className={`font-raleway font-semibold text-[20px] px-4 py-3 w-full text-center transition-colors duration-300 ${activeSection === 'pocetna' ? 'text-[#E9E9E9] bg-[#2A2A2A]' : 'text-[#AFAFAF] hover:text-[#E9E9E9] hover:bg-[#2A2A2A]'
                }`}
              >
                Početna
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('usluge')}
                className={`font-raleway font-semibold text-[20px] px-4 py-3 w-full text-center transition-colors duration-300 ${activeSection === 'usluge' ? 'text-[#E9E9E9] bg-[#2A2A2A]' : 'text-[#AFAFAF] hover:text-[#E9E9E9] hover:bg-[#2A2A2A]'
                }`}
              >
                Usluge
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('onama')}
                className={`font-raleway font-semibold text-[20px] px-4 py-3 w-full text-center transition-colors duration-300 ${activeSection === 'onama' ? 'text-[#E9E9E9] bg-[#2A2A2A]' : 'text-[#AFAFAF] hover:text-[#E9E9E9] hover:bg-[#2A2A2A]'
                }`}
              >
                O nama
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('nastim')}
                className={`font-raleway font-semibold text-[20px] px-4 py-3 w-full text-center transition-colors duration-300 ${activeSection === 'nastim' ? 'text-[#E9E9E9] bg-[#2A2A2A]' : 'text-[#AFAFAF] hover:text-[#E9E9E9] hover:bg-[#2A2A2A]'
                }`}
              >
                Naš tim
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('kontakt')}
                className={`font-raleway font-semibold text-[20px] px-4 py-3 w-full text-center transition-colors duration-300 ${activeSection === 'kontakt' ? 'text-[#E9E9E9] bg-[#2A2A2A]' : 'text-[#AFAFAF] hover:text-[#E9E9E9] hover:bg-[#2A2A2A]'
                }`}
              >
                Kontakt
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {/* Hero Section */}
      <section id="pocetna" className={`w-full ${isMobile ? 'mt-[70px]' : ''}`}>
        {/* Mobile/Tablet Hero (below MD) */}
        <div className="lg:hidden">
          {/* Video Section */}
          <div className="relative w-full h-[400px] bg-black overflow-hidden">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover z-0"
              src={window.innerWidth < 1024 ? heroVideoMobile : heroVideo}
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Drop shadow overlay */}
            <div className="pointer-events-none absolute bottom-0 left-0 w-full h-3/4 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            {/* Header Text over video */}
            <div className="absolute inset-0 z-20 flex items-end justify-center">
              <div className="text-center px-10 md:px-20 mb-10">
                <h1 className="font-inter font-semibold text-[24px] sm:text-[28px] text-white leading-tight drop-shadow-lg">
                  Pozovite nas na <br className="sm:hidden" />036-586-2222 i zakažite svoj termin unapred!
                </h1>
              </div>
            </div>
          </div>
          
          {/* Content Section with Background Image (below lg) / Gray Background (lg and above) */}
          <div 
            className="w-full pb-16 pt-10 px-8 lg:bg-[#222222] bg-fixed relative"
            style={{
              backgroundImage: window.innerWidth < 1024 ? `url(${teamBg})` : 'none',
              backgroundSize: window.innerWidth < 1024 ? 'cover' : 'auto',
              backgroundPosition: window.innerWidth < 1024 ? 'center' : 'auto',
              backgroundRepeat: window.innerWidth < 1024 ? 'no-repeat' : 'auto',
              backgroundColor: window.innerWidth < 1024 ? '#1D1D1D' : '#222222',
            }}
          >
            {/* Top shadow overlay for background image (below lg) */}
            {window.innerWidth < 1024 && (
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0) 100%)'
                }}
              />
            )}
            <div className="max-w-4xl mx-auto">            
              {/* Description Text */}
              <div className="text-left mb-12 relative z-10">
                <p className="font-inter text-[16px] px-10 sm:text-[18px] text-white leading-relaxed mx-auto md:px-20">
                  Pružamo kompletan tehnički pregled za sve vrste motornih vozila. Od motocikala i putničkih vozila, preko lakih i teških teretnjaka, autobusa, prikulica i poluprikulica, pa sve do traktora i radnih mašina. Bez obzira na vrstu vozila, kod nas ste u sigurnim rukama.
                </p>
              </div>
              
              {/* Buttons - Vertically Stacked */}
              <div className="flex flex-col items-center gap-4 relative z-10">
                {HERO_OPTIONS.map((option) => {
                  const getScrollTarget = (key) => {
                    switch (key) {
                      case 'tehnicki': return 'tehnicki-pregled';
                      case 'osiguranje': return window.innerWidth < 1024 ? 'osiguranje' : 'registracija-osiguranje';
                      case 'registracija': return 'registracija-osiguranje';
                      default: return 'usluge';
                    }
                  };

                  return (
                    <button
                      key={option.key}
                      onClick={() => scrollToSection(getScrollTarget(option.key))}
                      className={
                        `font-inter font-semibold text-[18px] sm:text-[20px] w-full max-w-[400px] h-[60px] sm:h-[64px] px-8 py-4 flex items-center justify-center whitespace-nowrap
                        bg-[#87171B] hover:bg-[#DA0D14] text-white border-none outline-none rounded-none
                        transition-colors duration-500`
                      }
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Hero (MD and above) - Original Design */}
        <div className="hidden lg:block relative w-full h-[600px] flex items-end justify-center bg-black overflow-hidden">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Bottom shadow overlay */}
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-3/4 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
          <div className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center justify-end h-full pb-10 px-8 mb-4">
            {/* Static text content */}
            <div className="w-full text-left pl-16 pr-55">
              <h1 className="font-inter font-semibold text-[32px] text-white mb-4">
                Pozovite nas na 036-586-2222 i zakažite svoj termin unapred!
              </h1>
              <p className="font-inter text-[20px] text-white mb-10">
                Pružamo kompletan tehnički pregled za sve vrste motornih vozila. Od motocikala i putničkih vozila, preko lakih i teških teretnjaka, autobusa, prikulica i poluprikulica, pa sve do traktora i radnih mašina. Bez obzira na vrstu vozila, kod nas ste u sigurnim rukama.
              </p>
            </div>
            <div className="flex flex-row gap-8 mt-4 justify-center items-center">
              {HERO_OPTIONS.map((option) => {
                const getScrollTarget = (key) => {
                  switch (key) {
                    case 'tehnicki': return 'tehnicki-pregled';
                    case 'osiguranje': return window.innerWidth < 1024 ? 'osiguranje' : 'registracija-osiguranje';
                    case 'registracija': return 'registracija-osiguranje';
                    default: return 'usluge';
                  }
                };

                return (
                  <button
                    key={option.key}
                    onClick={() => scrollToSection(getScrollTarget(option.key))}
                    className={
                      `font-inter font-semibold text-[20px] w-[300px] h-[64px] px-12 py-4 flex items-center justify-center whitespace-nowrap truncate
                      bg-[#87171B] hover:bg-[#DA0D14] text-white border-none outline-none rounded-none
                      transition-colors duration-500`
                    }
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="usluge" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-raleway font-bold text-[#1D1D1D] text-center mb-16">
            NAŠE USLUGE
          </h2>
          
          {/* Mobile/Tablet Layout (below LG) */}
          <div className="lg:hidden">
            <div className="flex flex-col items-center space-y-16 max-w-4xl mx-auto">
              {/* Service 1 */}
              <div className="flex flex-col items-center text-center w-full">
                <img src={carLogo} alt="Tehnički pregled" className="h-20 mb-6" />
                <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4">
                  Tehnički pregled svih<br />vrsta motornih vozila
                </h3>
                <p className="font-inter text-base text-gray-600 px-15 sm:px-25 md:px-40">
                  Sprovođenje kompletnog tehničkog pregleda u skladu sa zakonskim propisima – brzo, precizno i uz ljubazno osoblje. Vaša bezbednost je naš prioritet.
                </p>
              </div>
              
              {/* Service 2 */}
              <div className="flex flex-col items-center text-center w-full">
                <img src={wheelLogo} alt="Kompletna registracija" className="h-25 mb-6" />
                <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4">
                  Kompletna registracija za<br />sva motorna vozila
                </h3>
                <p className="font-inter text-base text-gray-600 px-15 sm:px-25 md:px-40">
                  Registrujte svoje vozilo bez odlaska u MUP! Na jednom mestu završavamo celokupnu proceduru – registracione nalepnice, prenos vlasništva, porez i potrebna dokumentacija.
                </p>
              </div>
              
              {/* Service 3 */}
              <div className="flex flex-col items-center text-center w-full">
                <img src={keysLogo} alt="Osiguranje" className="h-25 mb-6" />
                <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4">
                  Zaključivanje polisa<br />osiguranja vozila i lica
                </h3>
                <p className="font-inter text-base text-gray-600 px-15 sm:px-25 md:px-40">
                  Zaključujemo polise autoodgovornosti i dodatna osiguranja – brzo, pouzdano i po najpovoljnijim uslovima. Izdajemo zelene kartone i nudimo više opcija plaćanja.
                </p>
              </div>
            </div>
          </div>
          
          {/* Desktop Layout (LG and above) */}
          <div className="hidden lg:block">
            <div className="relative flex justify-center items-stretch gap-8 max-w-screen-xl mx-auto" style={{ minHeight: '1px' }}>
              {/* Vertical Divider 1 */}
              <div className="absolute top-0 left-1/3" style={{ transform: 'translateX(-50%)', height: '70%' }}>
                <div className="w-[3px] h-full bg-[#E4E4E7] rounded-full" />
              </div>
              {/* Vertical Divider 2 */}
              <div className="absolute top-0 left-2/3" style={{ transform: 'translateX(-50%)', height: '70%' }}>
                <div className="w-[3px] h-full bg-[#E4E4E7] rounded-full" />
              </div>
              {/* Column 1 */}
              <div className="flex flex-col items-center text-center w-1/3">
                <img src={carLogo} alt="Tehnički pregled" className="h-20" />
                <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4 h-16">
                  Tehnički pregled svih<br />vrsta motornih vozila
                </h3>
                <p className="font-inter text-base text-gray-600">
                  Sprovođenje kompletnog tehničkog pregleda u skladu sa zakonskim propisima – brzo, precizno i uz ljubazno osoblje. Vaša bezbednost je naš prioritet.
                </p>
              </div>
              {/* Column 2 */}
              <div className="flex flex-col items-center text-center w-1/3">
                <img src={wheelLogo} alt="Kompletna registracija" className="h-20" />
                <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4 h-16">
                  Kompletna registracija za<br />sva motorna vozila
                </h3>
                <p className="font-inter text-base text-gray-600">
                  Registrujte svoje vozilo bez odlaska u MUP! Na jednom mestu završavamo celokupnu proceduru – registracione nalepnice, prenos vlasništva, porez i potrebna dokumentacija.
                </p>
              </div>
              {/* Column 3 */}
              <div className="flex flex-col items-center text-center w-1/3">``
                <img src={keysLogo} alt="Osiguranje" className="h-20" />
                <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4 h-16">
                  Zaključivanje polisa<br />osiguranja vozila i lica
                </h3>
                <p className="font-inter text-base text-gray-600">
                  Zaključujemo polise autoodgovornosti i dodatna osiguranja – brzo, pouzdano i po najpovoljnijim uslovima. Izdajemo zelene kartone i nudimo više opcija plaćanja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    <div className="relative w-full bg-contain bg-no-repeat" style={{
      backgroundImage: `url(${fonPogledBg})`,
      backgroundPosition: '0px -155px',
      backgroundSize: '100% 64%',
    }}>
      <div 
        className="relative w-full bg-no-repeat"
        style={{
            backgroundSize: window.innerWidth >= 1024 ? 'cover' : 'contain',
            backgroundImage: `url(${window.innerWidth >= 1024 ? fullContentBg : fonPogledBg})`,
            backgroundPosition: 
              windowWidth >= 2100 ? '0px -155px' :
              window.innerWidth >= 2000 ? '-50px -155px' :
              window.innerWidth >= 1800 ? '-100px -155px' :
              window.innerWidth >= 1600 ? '-200px -155px' :
              window.innerWidth >= 1536 ? '-310px -155px' :
              window.innerWidth >= 1440 ? '-310px -155px' :
              window.innerWidth >= 1400 ? '-350px -155px' :
              window.innerWidth >= 1350 ? '-380px -155px' :
              window.innerWidth >= 1300 ? '-400px -155px' :
              window.innerWidth >= 1280 ? '-420px -155px' :
              window.innerWidth >= 1200 ? '-460px -155px' :
              window.innerWidth >= 1024 ? '-485px -155px' :
              window.innerWidth >= 980 ? '0px -200px' :
              window.innerWidth >= 950 ? '0px -150px' :
              window.innerWidth >= 900 ? '0px -85px' :
              window.innerWidth >= 850 ? '0px -30px' :
              window.innerWidth >= 800 ? '0px 40px' :
              window.innerWidth >= 750 ? '0px 80px' :
              window.innerWidth >= 700 ? '0px 150px' :
              window.innerWidth >= 650 ? '0px 220px' :
              window.innerWidth >= 600 ? '0px 300px' :
              window.innerWidth >= 550 ? '0px 400px' :
              window.innerWidth >= 500 ? '0px 520px' :
              window.innerWidth >= 450 ? '0px 650px' :
              window.innerWidth >= 400 ? '0px 760px' :
              window.innerWidth >= 375 ? '0px 800px' :
              window.innerWidth >= 350 ? '0px 930px' :
              '0px 1000px',
        }}
      >
          {/* </div> */}
        {/* Registration & Insurance Section */}
        <section
          id="registracija-osiguranje"
          className="w-full py-20 flex justify-center items-center"
        >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-7xl px-4">
          {/* Box 1: Registracija vozila */}
              <div className="bg-[#5C5C5C] shadow-lg flex flex-col items-center w-full max-w-lg p-8 min-h-[454px]">
                <h3 className="text-white text-[24px] sm:text-[28px] lg:text-[36px] font-raleway font-bold text-center mb-6">
              REGISTRACIJA VOZILA
            </h3>
                <ul className="text-white text-left w-full font-atkinson text-[16px] sm:text-[18px] lg:text-[20px] leading-6 space-y-4">
                <li>• Kompletna registracija bez odlaska u MUP</li>
                <li>• Izdavanje registracionih nalepnica</li>
                <li>• Prevod vozila i prenos vlasništva (kupoprodajni ugovori, ovlašćenja)</li>
                <li>• Plaćanje poreza</li>
                <li>• Transport ili prevoženje neregistrovanih vozila na tehnički pregled</li>
                <li>• Pomoć prilikom uvoza, carinjenja i prilikom prve registracije vozila</li>
              </ul>
            </div>
                      {/* Box 2: Osiguranje vozila */}
              <div id="osiguranje" className="bg-[#5C5C5C] shadow-lg flex flex-col items-center w-full max-w-lg p-8 min-h-[454px]">
                <h3 className="text-white text-[24px] sm:text-[28px] lg:text-[36px] font-raleway font-bold text-center mb-6">
              OSIGURANJE VOZILA
            </h3>
                <ul className="text-white text-left w-full font-atkinson text-[16px] sm:text-[18px] lg:text-[20px] leading-6 space-y-4">
                <li>• Izdavanje polise osiguranja od autoodgovornosti</li>
                <li>• Dodatna osiguranja vozila (Osiguranja stakala, osiguranja putnika)</li>
                <li>• Izdavanje zelenih kartona</li>
                <li>• Plaćanje gotovinom, čekovima na 6 mesečnih rata bez kamate, karticama i administrativnim zabranama</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Inspection Section */}
        <section 
          id="tehnicki-pregled" 
          className="w-full pb-20 pt-0 overflow-x-hidden relative"
        >
          {/* Desktop Layout (LG and above) */}
          <div className="hidden lg:block">
                          {/* Car image - positioned to drive in from left */}
              <div className="absolute bottom-[5%] z-30 w-[90%] xl:w-[85%]" style={{ pointerEvents: 'none', overflow: 'visible' }}>
                <img
                  src={carImg}
                  alt="Crveni automobil"
                  className="car-animation xl-only"
                  id="car-animation"
                  style={{
                    height: 'auto',
                    maxHeight: 'none',
                    opacity: 1,
                    transition: 'transform 2s ease-out'
                  }}
                />
              </div>
            {/* Centered content: left text and right boxes */}
              <div className="flex flex-row justify-between items-start relative z-20 w-full max-w-7xl mx-auto lg:px-10 xl:pl-20 xl:pr-10 2xl:px-0">
              {/* Left Side */}
                <div className="flex flex-col justify-between h-full min-h-[600px] flex-1 max-w-[460px] z-30 lg:pl-10 xl:pl-0 xl:mr-10">
                {/* Header and description at the top, with responsive left padding */}
                <div>
                    <h2 className="text-white font-raleway font-bold text-[32px] lg:text-[40px] 2xl:text-[48px] leading-tight text-left mb-6">
                    TEHNIČKI PREGLED VOZILA
                  </h2>
                    <p className="font-atkinson text-[20px] lg:text-[22px] xl:text-[24px] leading-[28px] md:leading-[25px] text-left text-white lg:pr-10 xl:pr-10 2xl:pr-0">
                    Visok kvalitet pruženih usluga na zadovoljstvo naših klijenata kao rezultat rada našeg posvećenog tima zaposlenih i saradnika.
                  </p>
                </div>
              </div>
              {/* Right Side */}
                <div className="flex flex-col flex-1 max-w-[520px] gap-6 z-30 lg:pl-20 xl:pl-0">
                {/* Box 1 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[32px] text-left">Putnička vozila</span>
                  <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-2 lg:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 2 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[32px] text-left">Autobusi</span>
                  <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-2 lg:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 3 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[32px] text-left">Mopedi</span>
                  <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-2 lg:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 4 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[32px] text-left">Motocikli</span>
                  <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-2 lg:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 5 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[32px] text-left">Kvadovi</span>
                  <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-2 lg:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 6: Teretna vozila */}
                <div className="relative flex flex-col justify-between bg-[#1A1A1A] px-8 py-4 min-h-[90px] w-full rounded-none">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-raleway font-bold text-[32px] text-left">Teretna vozila</span>
                    <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-2 lg:ml-4" />
                  </div>
                  <ul className="text-white font-atkinson text-[20px] leading-6 text-left pl-4 mt-2">
                    <li className="list-disc">Sve vrste teretnih vozila</li>
                    <li className="list-disc">Sve vrste priključnih vozila</li>
                  </ul>
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 7: Radne mašine */}
                <div className="relative flex flex-col justify-between bg-[#1A1A1A] px-8 py-4 min-h-[90px] w-full rounded-none">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-raleway font-bold text-[32px] text-left">Radne mašine</span>
                    <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-2 lg:ml-4" />
                  </div>
                  <ul className="text-white font-atkinson text-[20px] leading-6 text-left pl-4 mt-2">
                    <li className="list-disc">Vangabaritna vozila</li>
                    <li className="list-disc">Traktori</li>
                  </ul>
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
              </div>
            </div>
          </div>
          {/* Mobile/Tablet Layout (below LG) */}
            <div className="lg:hidden relative w-full">
              <div className="">
              {/* Header and Description - Centered */}
                <div className="text-left mb-12 w-[75%] ml-[10%] sm:w-[60%] sm:ml-[10%] ">
                  <h2 className="text-white font-raleway font-bold text-[32px] sm:text-[36px] md:text-[42px] leading-tight mb-6">
                    TEHNIČKI PREGLED <br /> VOZILA
                </h2>
                  <p className="font-atkinson text-[20px] sm:text-[22px] md:text-[24px] leading-relaxed text-white mb-[120%] pr-0">
                  Visok kvalitet pruženih usluga na zadovoljstvo naših klijenata kao rezultat rada našeg <br /> posvećenog tima zaposlenih i saradnika.
                </p>
              </div>

                               {/* Car Image - Positioned for animation */}
                 <div className="absolute sm:left-[10%] bottom-[55%] sm:bottom-[52%] md:bottom-[50%] z-30 w-[150%]" style={{ pointerEvents: 'none', overflow: 'visible' }}>
                   <img
                     src={carImg}
                     alt="Crveni automobil"
                     className="car-animation lg:hidden"
                     style={{
                       height: 'auto',
                       maxHeight: 'none',
                       opacity: 1
                     }}
                   />
                 </div>

              {/* Checkboxes - Vertical Stack */}
                <div className="flex flex-col gap-4 w-[80%] mx-auto">
                {/* Box 1 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-6 py-4 min-h-[60px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[20px] md:text-[24px] text-left">Putnička vozila</span>
                  <img src={checkboxImg} alt="checkbox" className="w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 2 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-6 py-4 min-h-[60px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[20px] md:text-[24px] text-left">Autobusi</span>
                  <img src={checkboxImg} alt="checkbox" className="w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 3 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-6 py-4 min-h-[60px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[20px] md:text-[24px] text-left">Mopedi</span>
                  <img src={checkboxImg} alt="checkbox" className="w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 4 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-6 py-4 min-h-[60px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[20px] md:text-[24px] text-left">Motocikli</span>
                  <img src={checkboxImg} alt="checkbox" className="w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 5 */}
                <div className="relative flex items-center justify-between bg-[#1A1A1A] px-6 py-4 min-h-[60px] w-full rounded-none">
                  <span className="text-white font-raleway font-bold text-[20px] md:text-[24px] text-left">Kvadovi</span>
                  <img src={checkboxImg} alt="checkbox" className="w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4" />
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 6: Teretna vozila */}
                <div className="relative flex flex-col justify-between bg-[#1A1A1A] px-6 py-4 min-h-[80px] w-full rounded-none">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-raleway font-bold text-[20px] md:text-[24px] text-left">Teretna vozila</span>
                    <img src={checkboxImg} alt="checkbox" className="w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4" />
                  </div>
                  <ul className="text-white font-atkinson text-[16px] md:text-[18px] leading-6 text-left pl-4 mt-2">
                    <li className="list-disc">Sve vrste teretnih vozila</li>
                    <li className="list-disc">Sve vrste priključnih vozila</li>
                  </ul>
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
                {/* Box 7: Radne mašine */}
                <div className="relative flex flex-col justify-between bg-[#1A1A1A] px-6 py-4 min-h-[80px] w-full rounded-none">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-raleway font-bold text-[20px] md:text-[24px] text-left">Radne mašine</span>
                    <img src={checkboxImg} alt="checkbox" className="w-6 h-6 md:w-8 md:h-8 ml-2 md:ml-4" />
                  </div>
                  <ul className="text-white font-atkinson text-[16px] md:text-[18px] leading-6 text-left pl-4 mt-2">
                    <li className="list-disc">Vangabaritna vozila</li>
                    <li className="list-disc">Traktori</li>
                  </ul>
                  <div className="absolute left-3 right-0 -bottom-2.5 h-3 bg-black/35 rounded-none blur-sm z-0"></div>
                </div>
              </div>
            </div>
          </div>
        
                     {/* Drive-in animation keyframes */}
             <style>{`
             @keyframes carDriveIn {
               0%   { transform: translateX(-100%); }
               70%  { transform: translateX(-40%);  }
               100% { transform: translateX(-40%);  }
             }

             .car-animation {
               transform: translateX(-100%);
               transition: transform 2s ease-out;
             }
             
             .car-animation.drive-in {
               animation: carDriveIn 1.8s ease-out forwards;
             }

             @media (min-width: 1024px) {
               .xl-only.car-animation {
                 width: 180% !important;
               }
               
               @media (max-width: 1200px) {
                 .xl-only.car-animation {
                   width: 160% !important;
                 }
               }
             }
           `}</style>
        </section>
      </div>
    </div>


      {/* Mission, Vision, Goals Section */}
      <section
        className="relative w-full min-h-[520px] flex items-center py-24 bg-cover bg-center"
        style={{
          backgroundImage: `url(${kamioniBg})`,
        }}
      >
        {/* Overlay for readability */}
        <div className="relative z-10 flex flex-row items-start w-full max-w-6xl px-10 mx-auto md:px-20">
          {/* Left: Circles and line */}
          <div className="flex flex-col items-center relative mr-12" style={{ minWidth: '64px', height: '100%' }}>
            {/* Vertical red line */}
            <div className="absolute left-1/2 top-0 h-full flex flex-col items-center" style={{ transform: 'translateX(-50%)', height: '100%' }}>
              <div style={{ height: '40px' }} />
              <div className="w-[5px] bg-[#DA0D14]" style={{ height: 'calc(100% - 64px)', opacity: 0.5, borderRadius: 0, minHeight: '340px' }} />
            </div>
            {/* Circle 1 */}
            <div 
              className="flex items-center justify-center w-16 h-16 bg-[#DA0D14] rounded-full z-10" 
              style={{ 
                borderRadius: '120px', 
                opacity: 1,
                marginBottom:
                            window.innerWidth <= 374 ? '300px' :
                            window.innerWidth <= 385 ? '270px' :
                            window.innerWidth <= 400 ? '240px' :
                            window.innerWidth <= 450 ? '220px' :
                            window.innerWidth <= 500 ? '180px' :
                            window.innerWidth <= 539 ? '200px' :
                            window.innerWidth <= 554 ? '180px' :
                            window.innerWidth <= 600 ? '160px' :
                            window.innerWidth <= 636 ? '160px' :
                            window.innerWidth <= 638 ? '140px' :
                            window.innerWidth <= 639 ? '130px' :
                            window.innerWidth <= 650 ? '180px' :
                            window.innerWidth <= 685 ? '180px' :
                            window.innerWidth <= 687 ? '150px' :
                            window.innerWidth <= 688 ? '180px' :
                            window.innerWidth <= 768 ? '150px' :
                            '180px',
              }}
            >
              <span className="text-white font-semibold text-2xl select-none font-atkinson">01</span>
            </div>
            {/* Circle 2 */}
            <div 
              className="flex items-center justify-center w-16 h-16 bg-[#DA0D14] rounded-full z-10" 
              style={{  
                borderRadius: '120px', 
                opacity: 1,
                marginBottom:
                            window.innerWidth <= 374 ? '300px' :
                            window.innerWidth <= 385 ? '300px' :
                            window.innerWidth <= 400 ? '290px' :
                            window.innerWidth <= 450 ? '270px' :
                            window.innerWidth <= 500 ? '220px' :
                            window.innerWidth <= 539 ? '200px' :
                            window.innerWidth <= 554 ? '170px' :
                            window.innerWidth <= 600 ? '160px' :
                            window.innerWidth <= 636 ? '170px' :
                            window.innerWidth <= 638 ? '160px' :
                            window.innerWidth <= 639 ? '140px' :
                            window.innerWidth <= 650 ? '180px' :
                            window.innerWidth <= 685 ? '180px' :
                            window.innerWidth <= 687 ? '180px' :
                            window.innerWidth <= 688 ? '180px' :
                            window.innerWidth <= 768 ? '150px' :
                            '180px',
              }}
            >
              <span className="text-white font-semibold text-2xl select-none font-atkinson">02</span>
            </div>
            {/* Circle 3 */}
            <div className="flex items-center justify-center w-16 h-16 bg-[#DA0D14] rounded-full z-10" style={{ borderRadius: '120px', opacity: 1 }}>
              <span className="text-white font-semibold text-2xl select-none font-atkinson">03</span>
            </div>
          </div>
          {/* Right: Texts */}
          <div className="flex flex-col gap-16 max-w-xl pl-0">
            {/* Row 1 */}
            <div className="flex flex-col justify-start">
              <h3 className="text-white text-[30px] sm:text-[32px] md:text-[36px] leading-[32px] font-normal mb-4 font-atkinson">Misija</h3>
              <p className="text-white text-[18px] sm:text-[20px] md:text-[24px] leading-[28px] sm:leading-[32px] font-normal font-atkinson">
                Misija naše kompanije je da na jednom mestu pruži kvalitetnu i brzu uslugu tehničkog pregleda i registracije svih motornih vozila na zadovoljstvo svih klijenata.
              </p>
            </div>
            {/* Row 2 */}
            <div className="flex flex-col justify-start">
              <h3 className="text-white text-[30px] sm:text-[32px] md:text-[36px] leading-[32px] font-normal mb-4 font-atkinson">Vizija</h3>
              <p className="text-white text-[18px] sm:text-[20px] md:text-[24px] leading-[28px] sm:leading-[32px] font-normal font-atkinson">
                Vizija kompanije je da postavi visoke standarde u oblasti tehničkog pregleda i registracije vozila putem praćenja najnovijih trendova i uvođenja inovacija u ovoj oblasti.
              </p>
            </div>
            {/* Row 3 */}
            <div className="flex flex-col justify-start">
              <h3 className="text-white text-[30px] sm:text-[32px] md:text-[36px] leading-[32px] font-normal mb-4 font-atkinson">Ciljevi</h3>
              <p className="text-white text-[18px] sm:text-[20px] md:text-[24px] leading-[28px] sm:leading-[32px] font-normal font-atkinson">
                Visok kvalitet pruženih usluga na zadovoljstvo naših klijenata kao rezultat rada našeg posvećenog tima zaposlenih i saradnika.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section id="onama" className="w-full bg-white py-20 flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="font-railway font-bold text-[48px] text-[#1D1D1D] text-center xl:text-left leading-none mb-6">O NAMA</h2>
          <p className="font-atkinson text-[24px] text-center xl:text-left text-[#1D1D1D] mb-10 max-w-4xl mx-auto xl:mx-0 px-10 sm:px-18 lg:px-4">
            Tehnički pregled OLIVER d.o.o. je privatno porodično preduzeće koje je počelo sa radom 2025. godine nakon dugogodišnjeg iskustva vlasnika i celog tima u poslovima tehničkog pregleda vozila.
          </p>
          {/* Responsive Carousel */}
          <div className="w-full max-w-5xl mx-auto md:px-20 lg:px-20 xl:px-0">
            <Carousel />
          </div>
        </div>

      </section>

      {/* Our Team Section */}
      <section 
        id="nastim" 
        className="w-full py-20 bg-no-repeat bg-fixed bg-cover"
        style={{
          backgroundImage: `url(${teamBg})`,
          backgroundColor: '#1D1D1D',
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="font-raleway font-bold text-[48px] text-white leading-none mb-6 text-center lg:text-left lg:ml-20">
              NAŠ TIM
            </h2>            
            <p className="font-atkinson text-[24px] text-white text-center leading-relaxed px-8 sm:px-15 lg:px-0 lg:text-left lg:ml-20 lg:max-w-4xl">
              Naš tim čine profesionalno i ljubazno osoblje sa dugogodišnjim iskustvom u obavljanju tehničkog pregleda, registracije i osiguranja svih vrsta motornih vozila.
            </p>
          </div>
          
          {/* Team Grid - Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {/* Director */}
              <div className="flex flex-col md:ml-30 lg:ml-0 mb-6">
                <img 
                  src={oliver_direktor} 
                  alt="Oliver Rađenović - Direktor" 
                  className="w-full h-[350px] object-cover"
                  style={{ width: '280px', height: '350px' }}
                />
              <div className="bg-white py-6 px-4" style={{ width: '280px', height: '120px' }}>
                  <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                    Oliver Rađenović
                  </h3>
                  <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                    Direktor
                  </p>
                </div>
              </div>
              {/* Manager */}
              <div className="flex flex-col md:mr-30 lg:mr-0 mb-6">
                <img 
                  src={veljko_menadzer} 
                  alt="Veljko Rađenović - Menadžer" 
                  className="w-full h-[350px] object-cover"
                  style={{ width: '280px', height: '350px' }}
                />
              <div className="bg-white py-6 px-4" style={{ width: '280px', height: '120px' }}>
                  <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                    Veljko Rađenović
                  </h3>
                  <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                    Menadžer
                  </p>
                </div>
              </div>
              {/* Sales Agent */}
              <div className="flex flex-col md:ml-30 lg:ml-0 mb-6">
                <img 
                  src={natasa_agent} 
                  alt="Nataša Mladenović - Agent prodaje u osiguranju" 
                  className="w-full h-[350px] object-cover"
                  style={{ 
                    width: '280px', 
                    height: '350px',
                      objectPosition: 'center 10%'
                  }}
                />
              <div className="bg-white py-6 px-4" style={{ width: '280px', height: '120px' }}>
                  <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                    Nataša Mladenović
                  </h3>
                  <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                    Agent prodaje u osiguranju
                  </p>
                </div>
              </div>

              {/* Lawyer */}
              <div className="flex flex-col md:mr-30 lg:mr-0 mb-6">
                  <img 
                    src={bozica_pravnik} 
                    alt="Božica Radovanović - Diplomirani pravnik" 
                    className="w-full h-[350px] object-cover"
                    style={{ 
                      width: '280px', 
                       height: '350px',
                       objectPosition: 'center 40%'
                    }}
                  />
              <div className="bg-white py-6 px-4" style={{ width: '280px', height: '120px' }}>
                    <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                      Božica Radovanović
                    </h3>
                    <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                      Diplomirani pravnik
                    </p>                    
                  </div>
              </div>

              {/* Technical Inspector 1 */}
              <div className="flex flex-col md:ml-30 lg:ml-0 mb-6">
                <img 
                  src={sanja_kontrolor} 
                  alt="Sanja Šekler - Kontrolor tehničkog pregleda" 
                  className="w-full h-[350px] object-cover"
                  style={{ width: '280px', height: '350px' }}
                />
              <div className="bg-white py-6 px-4" style={{ width: '280px', height: '120px' }}>
                  <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                    Sanja Šekler
                  </h3>
                  <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                    Kontrolor tehničkog pregleda
                  </p>
                </div>
              </div>

              {/* Technical Inspector 2 */}
              <div className="flex flex-col md:mr-30 lg:mr-0 mb-6">
                <img 
                  src={mirko_kontrolor} 
                  alt="Mirko Vukadinović - Kontrolor tehničkog pregleda" 
                  className="w-full h-[350px] object-cover"
                  style={{ width: '280px', height: '350px' }}
                />
              <div className="bg-white py-6 px-4" style={{ width: '280px', height: '120px' }}>
                  <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                    Mirko Vukadinović
                  </h3>
                  <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                    Kontrolor tehničkog pregleda
                  </p>
                </div>
              </div>
                {/* Technical Inspector 3 */}
                <div className="flex flex-col md:ml-30 lg:ml-0 mb-6 lg:pl-[100%] xl:pl-0">
                  <img 
                    src={srdjan_kontrolor} 
                    alt="Srđan Nikolić - Kontrolor tehničkog pregleda" 
                    className="w-full h-[350px] object-cover"
                    style={{ width: '280px', height: '350px' }}
                  />
              <div className="bg-white py-6 px-4" style={{ width: '280px', height: '120px' }}>
                    <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                      Srđan Nikolić
                    </h3>
                    <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                      Kontrolor tehničkog pregleda
                    </p>
                  </div>
                </div>

                {/* Technical Inspector 4 */}
                <div className="flex flex-col md:mr-30 lg:mr-0 mb-6 lg:pl-[100%] xl:pl-0">
                  <img 
                    src={dejan_kontrolor} 
                    alt="Dejan Obradović - Kontrolor tehničkog pregleda" 
                    className="w-full h-[350px] object-cover"
                    style={{ 
                      width: '280px', 
                      height: '350px',
                        objectPosition: 'center 5%'
                    }}
                  />
                  <div className="bg-white py-6 px-4" style={{ width: '280px' }}>
                    <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                      Dejan Obradović
                    </h3>
                    <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                      Kontrolor tehničkog pregleda
                    </p>
                  </div>
                </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="mapa" className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5768.260815836614!2d20.7503319!3d43.7078389!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475701fed749a339%3A0x32e579c8c47fc265!2sTehni%C4%8Dki%20pregled%20OLIVER%20DOO!5e0!3m2!1ssr!2srs!4v1753714518010!5m2!1ssr!2srs"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tehnički pregled Oliver - Lokacija"
        ></iframe>
      </section>

      {/* Footer */}
      <footer id="kontakt" className="w-full bg-[#1D1D1D] py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="flex flex-col xl:flex-row justify-between items-center gap-10 xl:items-start mb-16 xl:pl-10">
            {/* Contact Header - Centered below LG */}
            <div className="xl:hidden">
              <h2 className="font-raleway font-bold text-[48px] text-[#E9E9E9] text-center leading-none mb-12">
                KONTAKT
              </h2>
            </div>

            {/* Left Column - Contact Information */}
            <div className="flex-1 xl:min-w-[400px] flex flex-col items-center xl:items-start">
              {/* Contact Header - Hidden below LG, shown above LG */}
              <h2 className="hidden xl:block font-raleway font-bold text-[48px] text-[#E9E9E9] text-center leading-none mb-12">
                KONTAKT
              </h2>
              
              <div className="space-y-6 sm:max-w-4xl">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#DC1B21] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <a 
                    href="https://maps.app.goo.gl/snLwr7t9HNeffiVY7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-inter font-normal text-[24px] leading-[24px] text-gray-400 hover:text-white transition-colors"
                  >
                    Vojvode Mišića 2, Ratina <br /> Kraljevo
                  </a>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#DC1B21] mt-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div className="flex flex-col space-y-2">
                    <span className="font-inter font-normal text-[24px] leading-[24px] text-gray-400">
                      036 586 2222
                    </span>
                    <span className="font-inter font-normal text-[24px] leading-[24px] text-gray-400">
                      063 83 999 40
                    </span>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#DC1B21] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <a 
                    href="https://www.instagram.com/tehnickipregled_oliver" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-inter font-normal text-[24px] leading-[24px] text-gray-400 hover:text-white transition-colors"
                  >
                    @tehnickipregled_oliver
                  </a>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#DC1B21] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <a 
                    href="https://www.facebook.com/tehnickipregledoliver" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-inter font-normal text-[24px] leading-[24px] text-gray-400 hover:text-white transition-colors"
                  >
                    Tehnički pregled Oliver doo
                  </a>
                </div>
              </div>
            </div>

            {/* Center Column - Working Hours */}
            <div className="flex-1 min-w-0 lg:min-w-[300px] flex flex-col items-start mr-23 sm:mr-15 xl:mr-0">
              <h3 className="font-inter font-medium text-[24px] text-white text-left leading-none xl:mt-24 mb-8">
                Radno vreme
              </h3>
              
              <div className="space-y-6 hidden sm:block">
                <p className="font-inter font-medium text-[20px] leading-[24px] text-gray-400">
                  Radnim danima: 07.00 - 17.00 h
                </p>
                <p className="font-inter font-medium text-[20px] leading-[24px] text-gray-400">
                  Subotom: 07.00 - 14.00 h
                </p>
                <p className="font-inter font-medium text-[20px] leading-[24px] text-gray-400">
                  Nedelja: neradna
                </p>
              </div>
              <div className="space-y-6 block sm:hidden">
                <p className="font-inter font-medium text-[20px] leading-[24px] text-gray-400">
                  Radnim danima:<br /> 07.00 - 17.00 h
                </p>
                <p className="font-inter font-medium text-[20px] leading-[24px] text-gray-400">
                  Subotom:<br /> 07.00 - 14.00 h
                </p>
                <p className="font-inter font-medium text-[20px] leading-[24px] text-gray-400">
                  Nedelja: neradna
                </p>
              </div>
            </div>

            {/* Right Column - Company Logo */}
            <div className="flex-1 flex justify-center lg:justify-end items-center mt-12 min-w-0 lg:min-w-[400px]">
              <img 
                src={logoWhite} 
                alt="Tehnički pregled Oliver logo" 
                className="w-[400px]"
              />
            </div>
          </div>

          {/* Copyright Line */}
          <div className="w-screen border-t border-gray-600 pt-8" style={{ marginLeft: 'calc(-50vw + 50%)' }}>
            <p className="text-center font-inter font-normal text-[16px] text-gray-400">
              Copyright © 2025 Tehnički pregled Oliver. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#DA0D14] text-white rounded-full shadow-lg hover:bg-[#87171B] transition-all duration-300 z-50 flex items-center justify-center group"
          style={{
            boxShadow: '0 0 30px rgba(218, 13, 20, 0.4), 0 10px 25px rgba(0, 0, 0, 0.3)'
          }}
          aria-label="Scroll to top"
        >
          <svg 
            className="w-8 h-8 transform transition-transform duration-300 group-hover:-translate-y-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default App;



// Carousel component
function Carousel() {
  // Get screen size to determine which images to use
  const [isLargeScreen, setIsLargeScreen] = React.useState(window.innerWidth >= 1024);
  
  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // All available images for carousel - responsive based on screen size
  const allImages = isLargeScreen ? [
    // Desktop (lg and above) - use DSC images
    carousel15DSC, carousel3DSC, carousel12DSC, carousel6DSC, carousel21DSC, carousel10DSC,
    carousel22DSC, carousel13DSC, carousel7DSC, carousel20DSC, carousel16DSC, carousel9DSC,
    carousel18DSC, carousel5DSC, slajd3, slajd1, slajd5, slajd4
  ] : [
    // Mobile/Tablet (below lg) - use new webp carousel images
    carousel15, carousel3, carousel12, carousel6, carousel4, carousel10,
    carousel14, carousel13, carousel7, carousel8, carousel11, carousel9,
    carousel2, carousel5, slajd3, slajd1, slajd5, slajd4
  ];
  
  const [current, setCurrent] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Check screen size
  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-play functionality
  React.useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;
    
    const interval = setInterval(() => {
      handleSlideChange(1);
    }, 4000); // 4 seconds per slide
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning, allImages.length]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Manual navigation with transition protection
  const handleSlideChange = (dir) => {
    if (isTransitioning) return; // Prevent multiple clicks during transition
    
    setIsTransitioning(true);
    setCurrent((prev) => (prev + dir + allImages.length) % allImages.length);
    
    // Re-enable after transition completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // Match the CSS transition duration
  };

  const handleArrow = (dir) => {
    handleSlideChange(dir);
  };

  return (
    <div 
      className="w-full flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Carousel Container */}
      <div className="relative w-full max-w-[1400px] h-[300px] sm:h-[350px] md:h-[400px] flex justify-center items-center">
        {/* Cards Container */}
        <div className="relative w-full h-full">
          {allImages.map((img, index) => {
            // Calculate relative position with proper circular logic
            let position = index - current;
            
            // Handle circular array wraparound
            if (position > allImages.length / 2) {
              position -= allImages.length;
            } else if (position < -allImages.length / 2) {
              position += allImages.length;
            }
            
            // Mobile view: only show current image
            if (isMobile) {
              if (position !== 0) return null;
              
              return (
                <div
                  key={index}
                  className="absolute w-[80%] sm:w-[75%] md:w-[70%] h-full left-0 right-0 mx-auto transition-all duration-400 ease-in-out"
                  style={{
                    transform: 'translateX(0)',
                    opacity: 1,
                    zIndex: 3,
                  }}
                >
                  <img
                    src={img}
                    alt={`carousel-${index}`}
                    className="w-full h-full object-cover shadow-lg"
                    style={{
                      borderRadius: '0',
                      boxShadow: '0px 0px 5px 0px rgba(81, 81, 81, 0.47)'
                    }}
                    draggable={false}
                  />
                </div>
              );
            }
            
            // Desktop view: show multiple images (original behavior)
            // Only render visible images (center + 2 on each side)
            if (Math.abs(position) > 2) return null;
            
            // Calculate transform, scale, and opacity based on position
            let transform = '';
            let scale = 1;
            let opacity = 1;
            let zIndex = 1;
            
            if (position === 0) {
              // Center item (current) - full size and opacity
              transform = 'translateX(0)';
              scale = 1;
              opacity = 1;
              zIndex = 3;
            } else if (position === 1) {
              // Right item (next)
              transform = 'translateX(30%)';
              scale = 0.8;
              opacity = 0.4;
              zIndex = 1;
            } else if (position === -1) {
              // Left item (previous)
              transform = 'translateX(-30%)';
              scale = 0.8;
              opacity = 0.4;
              zIndex = 1;
            } else if (position === 2) {
              // Far right item (next next)
              transform = 'translateX(50%)';
              scale = 0.6;
              opacity = 0.2;
              zIndex = 0;
            } else if (position === -2) {
              // Far left item (previous previous)
              transform = 'translateX(-50%)';
              scale = 0.6;
              opacity = 0.2;
              zIndex = 0;
            }

            return (
              <div
                key={index}
                className="absolute w-[80%] sm:w-[75%] md:w-[70%] h-full left-0 right-0 mx-auto transition-all duration-400 ease-in-out"
                style={{
                  transform: `${transform} scale(${scale})`,
                  opacity,
                  zIndex,
                }}
              >
                <img
                  src={img}
                  alt={`carousel-${index}`}
                  className="w-full h-full object-cover shadow-lg"
                  style={{
                    borderRadius: '0', // Sharp corners as requested
                    boxShadow: position === 0 ? '0px 0px 5px 0px rgba(81, 81, 81, 0.47)' : 'none'
                  }}
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Arrows */}
      <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8">
        <button 
          onClick={() => handleArrow(-1)} 
          disabled={isTransitioning}
          className={`focus:outline-none transition-all duration-200 ${isTransitioning
              ? 'opacity-50' 
              : 'hover:scale-110'
          }`}
          aria-label="Previous slide"
        >
          <img src={arrowLeft} alt="left arrow" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
        </button>
        <button 
          onClick={() => handleArrow(1)} 
          disabled={isTransitioning}
          className={`focus:outline-none transition-all duration-200 ${isTransitioning
              ? 'opacity-50' 
              : 'hover:scale-110'
          }`}
          aria-label="Next slide"
        >
          <img src={arrowRight} alt="right arrow" className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
        </button>
      </div>
    </div>
  );
}
