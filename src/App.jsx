import logo from "./assets/finalni oliver logo i kartice-05 1.svg";
import { useState } from "react";
import heroVideo from "./assets/oliver_snimak.mp4";
import React from "react"; // Added missing import for React.useEffect
import carLogo from "./assets/crvena-kola-logo.svg";
import wheelLogo from "./assets/crven-volan-logo.svg";
import keysLogo from "./assets/crveni-kljucevi.svg";
import vectorBg from "./assets/Vector-background-image.png";
import carImg from "./assets/car.png";
import checkboxImg from "./assets/checkbox.svg";
import kamioniBg from "./assets/Kamioni.png";
import slajd1 from './assets/slajd1.JPG';
import slajd2 from './assets/slajd2.JPG';
import slajd3 from './assets/slajd3.jpg';
import slajd4 from './assets/slajd 4.jpg';
import slajd5 from './assets/slajd 5.JPG';
import arrowLeft from './assets/Arrow Left.svg';
import arrowRight from './assets/Arrow Right.svg';
// Additional carousel images (excluding team member images)
import carousel1 from './assets/DSC_6409.JPG';
import carousel2 from './assets/DSC_6633.JPG';
import carousel3 from './assets/DSC_6149.JPG';
import carousel4 from './assets/DSC_6366.JPG';
import carousel5 from './assets/DSC_6306.JPG';
import carousel6 from './assets/DSC_6145.JPG';
import carousel7 from './assets/DSC_6302.JPG';
import carousel8 from './assets/DSC_6362.JPG';
import carousel9 from './assets/DSC_6312.JPG';
import carousel10 from './assets/DSC_6322.JPG';
import carousel11 from './assets/DSC_6661.JPG';
import carousel12 from './assets/DSC_6091.JPG';
import carousel13 from './assets/DSC_6160.JPG';
import carousel14 from './assets/DSC_6163.JPG';
import carousel15 from './assets/DSC_6169.JPG';
import carousel16 from './assets/DSC_6197.JPG';
import carousel17 from './assets/DSC_6203.JPG';
import carousel18 from './assets/DSC_6200.JPG';
import carousel19 from './assets/DSC_6401.JPG';
import carousel20 from './assets/DSC_6453.JPG';
import carousel21 from './assets/DSC_6725.JPG';
import carousel22 from './assets/DSC_6348.JPG';
// Team member images (swapped Natasa and Božica)
import oliver_direktor from './assets/DSC_6755 (1).JPG';
import veljko_menadzer from './assets/DSC_6773 (1).JPG';
import natasa_agent from './assets/DSC_6274.JPG'; // Swapped with Božica
import bozica_pravnik from './assets/DSC_6267.JPG'; // Swapped with Natasa
import sanja_kontrolor from './assets/DSC_6334.JPG';
import mirko_kontrolor from './assets/DSC_6244.JPG';
import srdjan_kontrolor from './assets/DSC_6288.JPG';
import dejan_kontrolor from './assets/DSC_6232.JPG';
// White logo for footer
import logoWhite from './assets/finalni oliver logo i kartice-beli.png';

const HERO_OPTIONS = [
  {
    key: "tehnicki",
    label: "TEHNIČKI PREGLED",
    title: "Produžite registraciju vašeg vozila bez odlaska u MUP!",
    desc: "Brzo, jednostavno i sigurno obavite tehnički pregled i registraciju vašeg vozila na jednom mestu. Uštedite vreme i izbegnite gužve!",
  },
  {
    key: "osiguranje",
    label: "OSIGURANJE",
    title: "Najpovoljnije osiguranje za vaše vozilo",
    desc: "Izaberite najbolju polisu osiguranja i zaštitite svoje vozilo i sebe od nepredviđenih situacija na putu.",
  },
  {
    key: "registracija",
    label: "REGISTRACIJA VOZILA",
    title: "Registrujte vozilo bez stresa i čekanja",
    desc: "Kompletna usluga registracije vozila uz stručnu pomoć našeg tima. Sve na jednom mestu, brzo i efikasno!",
  },
];

function App() {
  const [selected, setSelected] = useState("tehnicki");
  const [fade, setFade] = useState(true); // true = visible, false = hidden
  const [pending, setPending] = useState(null); // key of next option
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("pocetna");
  const [isNavSticky, setIsNavSticky] = useState(false);

  const current = HERO_OPTIONS.find((o) => o.key === selected);

  // When fade is false (fading out), after transition, swap text and fade in
  React.useEffect(() => {
    if (!fade && pending) {
      const timeout = setTimeout(() => {
        setSelected(pending);
        setFade(true); // fade in new text
        setPending(null);
      }, 400); // match transition duration
      return () => clearTimeout(timeout);
    }
  }, [fade, pending]);

  // Carousel effect for hero text
  React.useEffect(() => {
    if (!pending) {
      const interval = setInterval(() => {
        setFade(false);
        setPending(
          HERO_OPTIONS[(HERO_OPTIONS.findIndex((o) => o.key === selected) + 1) % HERO_OPTIONS.length].key
        );
      }, 4000); // 4 seconds per slide
      return () => clearInterval(interval);
    }
  }, [selected, pending]);

  // Scroll handling and navigation
  React.useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300);

      // Handle sticky navbar
      const headerHeight = document.querySelector('.header-section')?.offsetHeight || 0;
      setIsNavSticky(window.scrollY > headerHeight);

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
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Normal section detection
      let foundSection = false;
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
              foundSection = true;
              break;
            }
          } else {
            // For other sections, use normal detection
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              setActiveSection(section.id);
              foundSection = true;
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = isNavSticky ? 70 : 0; // Account for sticky navbar height
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
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

  // Car animation trigger
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const carElement = document.getElementById('car-animation');
          if (carElement) {
            carElement.classList.add('drive-in');
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    // Find the section containing the car animation
    const carElement = document.getElementById('car-animation');
    if (carElement) {
      const sectionElement = carElement.closest('section');
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="header-section flex flex-col lg:flex-row items-center justify-between w-full bg-white py-8 px-8 lg:px-16 xl:px-24 gap-4 lg:gap-0">
        <div className="flex-shrink-0">
          <img src={logo} alt="Tehnički pregled Oliver logo" className="w-[280px] md:w-[320px] lg:w-[393px] h-auto" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column */}
          <div className="flex flex-col items-start gap-1 min-w-0 lg:min-w-[220px]">
            <div>
              <span className="text-[#DC1B21] font-inter font-bold text-[16px] lg:text-[20px]">Telefon:</span>
              <span className="text-black font-inter font-normal text-[16px] lg:text-[20px] ml-2">+381 36 586 2222</span>
            </div>
            <div>
              <span className="text-[#DC1B21] font-inter font-bold text-[16px] lg:text-[20px]">Mobilni:</span>
              <span className="text-black font-inter font-normal text-[16px] lg:text-[20px] ml-2">+381 63 839 9940</span>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col items-start gap-1 min-w-0 lg:min-w-[180px]">
            <div className="text-[#DC1B21] font-inter font-bold text-[16px] lg:text-[20px]">Radno vreme</div>
            <div className="text-black font-inter font-normal text-[16px] lg:text-[20px]">Radnim danima: 07–17h</div>
            <div className="text-black font-inter font-normal text-[16px] lg:text-[20px]">Subotom: 07–14h</div>
          </div>
        </div>
      </div>
      {/* Navigation Section */}
      <nav className={`w-screen bg-[#1D1D1D] transition-all duration-300 ${isNavSticky ? 'fixed top-0 z-50 shadow-lg' : 'relative'}`}>
        <ul className="flex flex-wrap justify-between items-center w-full py-3" style={{ width: '70%', margin: '0 auto' }}>
          <li>
            <button 
              onClick={() => scrollToSection('pocetna')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${
                activeSection === 'pocetna' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              Početna
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('usluge')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${
                activeSection === 'usluge' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              Usluge
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('onama')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${
                activeSection === 'onama' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              O nama
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('nastim')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${
                activeSection === 'nastim' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              Naš tim
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('kontakt')}
              className={`font-raleway font-semibold text-[18px] lg:text-[24px] px-2 lg:px-4 py-1 rounded transition-colors duration-300 ${
                activeSection === 'kontakt' ? 'text-[#E9E9E9]' : 'text-[#AFAFAF] hover:text-[#E9E9E9]'
              }`}
            >
              Kontakt
            </button>
          </li>
        </ul>
      </nav>
      {/* Hero Section */}
      <section id="pocetna" className="relative w-full h-[600px] flex items-end justify-center bg-black overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Bottom shadow overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-1/2 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-start pb-10 px-8 mb-4">
          {/* Animated text (single container) */}
          <div
            className={`transition-opacity duration-400 ease-in-out ${fade ? "opacity-100" : "opacity-0"} w-full`}
          >
            <h1 className="font-inter font-semibold text-[32px] text-white mb-4">
              {current.title}
            </h1>
            <p className="font-inter text-[20px] text-white mb-10">
              {current.desc}
            </p>
          </div>
          <div className="flex flex-row gap-8 mt-4">
            {HERO_OPTIONS.map((option) => {
              const getScrollTarget = (key) => {
                switch(key) {
                  case 'tehnicki': return 'tehnicki-pregled';
                  case 'osiguranje': return 'registracija-osiguranje';
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
                    bg-[#87171B] hover:bg-[#DA0D14] text-white border-none outline-none
                    transition-colors duration-500`
                  }
                  style={{ borderRadius: 0 }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="usluge" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-raleway font-bold text-[#1D1D1D] text-center mb-16">
            NAŠE USLUGE
          </h2>
          <div className="relative flex justify-center items-stretch gap-8 max-w-screen-xl mx-auto" style={{minHeight: '1px'}}>
            {/* Vertical Divider 1 */}
            <div className="absolute top-0 left-1/3" style={{transform: 'translateX(-50%)', height: '70%'}}>
              <div className="w-[3px] h-full bg-[#E4E4E7] rounded-full" />
            </div>
            {/* Vertical Divider 2 */}
            <div className="absolute top-0 left-2/3" style={{transform: 'translateX(-50%)', height: '70%'}}>
              <div className="w-[3px] h-full bg-[#E4E4E7] rounded-full" />
            </div>
            {/* Column 1 */}
            <div className="flex flex-col items-center text-center w-1/3 px-4">
              <img src={carLogo} alt="Tehnički pregled" className="h-20 mb-6" />
              <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4 h-16">
                Tehnički pregled svih<br />vrsta motornih vozila
              </h3>
              <p className="font-inter text-base text-gray-600">
                Sprovođenje kompletnog tehničkog pregleda u skladu sa zakonskim propisima – brzo, precizno i uz ljubazno osoblje. Vaša bezbednost je naš prioritet.
              </p>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col items-center text-center w-1/3 px-4">
              <img src={wheelLogo} alt="Kompletna registracija" className="h-20 mb-6" />
              <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4 h-16">
                Kompletna registracija za<br />sva motorna vozila
              </h3>
              <p className="font-inter text-base text-gray-600">
                Registrujte svoje vozilo bez odlaska u MUP! Na jednom mestu završavamo celokupnu proceduru – registracione nalepnice, prenos vlasništva, porez i potrebna dokumentacija.
              </p>
            </div>
            {/* Column 3 */}
            <div className="flex flex-col items-center text-center w-1/3 px-4">
              <img src={keysLogo} alt="Osiguranje" className="h-20 mb-6" />
              <h3 className="font-inter font-bold text-2xl text-[#1D1D1D] mb-4 h-16">
                Zaključivanje polisa<br />osiguranja vozila i lica
              </h3>
              <p className="font-inter text-base text-gray-600">
                Zaključujemo polise autoodgovornosti i dodatna osiguranja – brzo, pouzdano i po najpovoljnijim uslovima. Izdajemo zelene kartone i nudimo više opcija plaćanja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration & Insurance Section */}
      <section
        id="registracija-osiguranje"
        className="w-full py-20 bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: `url(${vectorBg})`,
          backgroundColor: '#232323',
        }}
      >
        <div className="flex flex-row flex-wrap justify-center items-stretch gap-12 w-full max-w-6xl px-4">
          {/* Box 1: Registracija vozila */}
          <div className="bg-[#5C5C5C] shadow-lg py-8 px-4 md:py-10 md:px-10 flex flex-col items-center w-full max-w-[700px] flex-1 min-w-[220px] min-h-[180px] md:min-h-[220px] h-auto">
            <h3 className="text-white text-[22px] md:text-[28px] lg:text-[36px] font-raleway font-bold text-center mb-6">
              REGISTRACIJA VOZILA
            </h3>
            <ul className="text-white text-left w-full font-atkinson text-[14px] md:text-[16px] lg:text-[16px] leading-5 md:leading-6 space-y-2">
              <li>• Kompletna registracija bez odlaska u MUP</li>
              <li>• Izdavanje registracionih nalepnica</li>
              <li>• Prevod vozila i prenos vlasništva (kupoprodajni ugovori, ovlašćenja)</li>
              <li>• Plaćanje poreza</li>
              <li>• Transport ili prevoženje neregistrovanih vozila na tehnički pregled</li>
              <li>• Pomoć prilikom uvoza, carinjenja i prilikom prve registracije vozila</li>
            </ul>
          </div>
          {/* Box 2: Osiguranje vozila */}
          <div className="bg-[#5C5C5C] shadow-lg py-8 px-4 md:py-10 md:px-10 flex flex-col items-center w-full max-w-[700px] flex-1 min-w-[220px] min-h-[180px] md:min-h-[220px] h-auto">
            <h3 className="text-white text-[22px] md:text-[28px] lg:text-[36px] font-raleway font-bold text-center mb-6">
              OSIGURANJE VOZILA
            </h3>
            <ul className="text-white text-left w-full font-atkinson text-[14px] md:text-[16px] lg:text-[16px] leading-5 md:leading-6 space-y-2">
              <li>• Izdavanje polise osiguranja od autoodgovornosti</li>
              <li>• Dodatna osiguranja vozila (Osiguranja stakala, osiguranja putnika)</li>
              <li>• Izdavanje zelenih kartona</li>
              <li>• Plaćanje gotovinom, čekovima na 6 mesečnih rata bez kamate, karticama i administrativnim zabranama</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Inspection Section */}
      <section id="tehnicki-pregled" className="w-full bg-white py-20 overflow-x-hidden relative">
        {/* Car image - positioned to drive in from left */}
        <div className="absolute left-0 bottom-[10%] z-0" style={{pointerEvents: 'none', overflow: 'visible'}}>
          <img
            src={carImg}
            alt="Crveni automobil"
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
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-start gap-12 relative z-10 w-full">
          {/* Left Side */}
          <div className="flex flex-col justify-between h-full min-h-[600px] flex-1 max-w-[520px] z-10">
            {/* Header and description at the top, with left padding */}
            <div className="px-4">
              <h2 className="text-[#232323] font-raleway font-bold text-[32px] md:text-[40px] lg:text-[48px] leading-tight text-left mb-6">
                TEHNIČKI PREGLED VOZILA
              </h2>
              <p className="font-atkinson text-[18px] md:text-[20px] lg:text-[24px] leading-[28px] md:leading-[32px] text-left text-[#232323] mb-16">
                Visok kvalitet pruženih usluga na zadovoljstvo naših klijenata kao rezultat rada našeg posvećenog tima zaposlenih i saradnika.
              </p>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex flex-col flex-1 max-w-[520px] gap-6 mt-2 z-20">
            {/* Box 1 */}
            <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full" style={{borderRadius:0}}>
              <span className="text-white font-raleway font-bold text-[32px] text-left">Putnička vozila</span>
              <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-4" />
              <div style={{position:'absolute',left:'12px',right:'0',bottom:'-10px',height:'12px',background:'rgba(0,0,0,0.35)',borderRadius:0,filter:'blur(6px)',zIndex:0}}></div>
            </div>
            {/* Box 2 */}
            <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full" style={{borderRadius:0}}>
              <span className="text-white font-raleway font-bold text-[32px] text-left">Autobusi</span>
              <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-4" />
              <div style={{position:'absolute',left:'12px',right:'0',bottom:'-10px',height:'12px',background:'rgba(0,0,0,0.35)',borderRadius:0,filter:'blur(6px)',zIndex:0}}></div>
            </div>
            {/* Box 3 */}
            <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full" style={{borderRadius:0}}>
              <span className="text-white font-raleway font-bold text-[32px] text-left">Mopedi</span>
              <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-4" />
              <div style={{position:'absolute',left:'12px',right:'0',bottom:'-10px',height:'12px',background:'rgba(0,0,0,0.35)',borderRadius:0,filter:'blur(6px)',zIndex:0}}></div>
            </div>
            {/* Box 4 */}
            <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full" style={{borderRadius:0}}>
              <span className="text-white font-raleway font-bold text-[32px] text-left">Motocikli</span>
              <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-4" />
              <div style={{position:'absolute',left:'12px',right:'0',bottom:'-10px',height:'12px',background:'rgba(0,0,0,0.35)',borderRadius:0,filter:'blur(6px)',zIndex:0}}></div>
            </div>
            {/* Box 5 */}
            <div className="relative flex items-center justify-between bg-[#1A1A1A] px-8 py-4 min-h-[64px] w-full" style={{borderRadius:0}}>
              <span className="text-white font-raleway font-bold text-[32px] text-left">Kvadovi</span>
              <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-4" />
              <div style={{position:'absolute',left:'12px',right:'0',bottom:'-10px',height:'12px',background:'rgba(0,0,0,0.35)',borderRadius:0,filter:'blur(6px)',zIndex:0}}></div>
            </div>
            {/* Box 6: Teretna vozila */}
            <div className="relative flex flex-col justify-between bg-[#1A1A1A] px-8 py-4 min-h-[90px] w-full" style={{borderRadius:0}}>
              <div className="flex items-center justify-between">
                <span className="text-white font-raleway font-bold text-[32px] text-left">Teretna vozila</span>
                <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-4" />
              </div>
              <ul className="text-white font-atkinson text-[20px] leading-6 text-left pl-4 mt-2">
                <li className="list-disc">Sve vrste teretnih vozila</li>
                <li className="list-disc">Sve vrste priključnih vozila</li>
              </ul>
              <div style={{position:'absolute',left:'12px',right:'0',bottom:'-10px',height:'12px',background:'rgba(0,0,0,0.35)',borderRadius:0,filter:'blur(6px)',zIndex:0}}></div>
            </div>
            {/* Box 7: Radne mašine */}
            <div className="relative flex flex-col justify-between bg-[#1A1A1A] px-8 py-4 min-h-[90px] w-full" style={{borderRadius:0}}>
              <div className="flex items-center justify-between">
                <span className="text-white font-raleway font-bold text-[32px] text-left">Radne mašine</span>
                <img src={checkboxImg} alt="checkbox" className="w-8 h-8 ml-4" />
              </div>
              <ul className="text-white font-atkinson text-[20px] leading-6 text-left pl-4 mt-2">
                <li className="list-disc">Vangabaritna vozila</li>
                <li className="list-disc">Traktori</li>
              </ul>
              <div style={{position:'absolute',left:'12px',right:'0',bottom:'-10px',height:'12px',background:'rgba(0,0,0,0.35)',borderRadius:0,filter:'blur(6px)',zIndex:0}}></div>
            </div>
          </div>
        </div>
        {/* Drive-in animation keyframes */}
        <style>{`
          @keyframes carDriveIn {
            0%   { transform: translateX(-100%); }
            70%  { transform: translateX(-45%);  }
            100% { transform: translateX(-40%);  }
          }

          #car-animation {
            width: 180% !important;
            transform: translateX(-100%);
          }
          
          #car-animation.drive-in {
            animation: carDriveIn 1.8s ease-out forwards;
          }

          /* Responsive tweaks */
          @media (max-width:1200px){
            #car-animation{ width:160% !important; }
          }
          @media (max-width:768px){
            #car-animation{ width:140% !important; }
          }
          @media (max-width:480px){
            #car-animation{ width:120% !important; }
          }
        `}</style>


      </section>

      {/* Mission, Vision, Goals Section */}
      <section
        className="relative w-full min-h-[520px] flex items-center py-24 bg-cover bg-center"
        style={{
          backgroundImage: `url(${kamioniBg})`,
        }}
      >
        {/* Overlay for readability */}
        <div className="relative z-10 flex flex-row items-start w-full max-w-6xl mx-auto px-4">
          {/* Left: Circles and line */}
          <div className="flex flex-col items-center relative mr-12" style={{minWidth: '64px', height: '100%'}}>
            {/* Vertical red line */}
            <div className="absolute left-1/2 top-0 h-full flex flex-col items-center" style={{transform: 'translateX(-50%)', height: '100%'}}>
              <div style={{height: '40px'}} />
              <div className="w-[5px] bg-[#DA0D14]" style={{height: 'calc(100% - 64px)', opacity: 0.5, borderRadius: 0, minHeight: '340px'}} />
            </div>
            {/* Circle 1 */}
            <div className="flex items-center justify-center w-16 h-16 bg-[#DA0D14] rounded-full mb-46 z-10" style={{borderRadius: '120px', opacity: 1}}>
              <span className="text-white font-semibold text-2xl select-none font-atkinson">01</span>
            </div>
            {/* Circle 2 */}
            <div className="flex items-center justify-center w-16 h-16 bg-[#DA0D14] rounded-full mb-46 z-10" style={{borderRadius: '120px', opacity: 1}}>
              <span className="text-white font-semibold text-2xl select-none font-atkinson">02</span>
            </div>
            {/* Circle 3 */}
            <div className="flex items-center justify-center w-16 h-16 bg-[#DA0D14] rounded-full z-10" style={{borderRadius: '120px', opacity: 1}}>
              <span className="text-white font-semibold text-2xl select-none font-atkinson">03</span>
            </div>
          </div>
          {/* Right: Texts */}
          <div className="flex flex-col gap-16 max-w-xl pl-0">
            {/* Row 1 */}
            <div className="flex flex-col justify-start">
              <h3 className="text-white text-[36px] leading-[32px] font-normal mb-4 font-atkinson">Misija</h3>
              <p className="text-white text-[24px] leading-[32px] font-normal font-atkinson">
                Misija naše kompanije je da na jednom mestu pruži kvalitetnu i brzu uslugu tehničkog pregleda i registracije svih motornih vozila na zadovoljstvo svih klijenata.
              </p>
            </div>
            {/* Row 2 */}
            <div className="flex flex-col justify-start">
              <h3 className="text-white text-[36px] leading-[32px] font-normal mb-4 font-atkinson">Vizija</h3>
              <p className="text-white text-[24px] leading-[32px] font-normal font-atkinson">
                Vizija kompanije je da postavi visoke standarde u oblasti tehničkog pregleda i registracije vozila putem praćenja najnovijih trendova i uvođenja inovacija u ovoj oblasti.
              </p>
            </div>
            {/* Row 3 */}
            <div className="flex flex-col justify-start">
              <h3 className="text-white text-[36px] leading-[32px] font-normal mb-4 font-atkinson">Ciljevi</h3>
              <p className="text-white text-[24px] leading-[32px] font-normal font-atkinson">
                Visok kvalitet pruženih usluga na zadovoljstvo naših klijenata kao rezultat rada našeg posvećenog tima zaposlenih i saradnika.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section id="onama" className="w-full bg-white py-20 flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto px-4">
          <h2 className="font-railway font-bold text-[48px] text-[#1D1D1D] text-left leading-none mb-6">O NAMA</h2>
          <p className="font-atkinson text-[24px] text-left text-[#1D1D1D] mb-10 max-w-4xl">
            Tehnički pregled OLIVER d.o.o. je privatno porodično preduzeće koje je počelo sa radom 2025. godine nakon dugogodišnjeg iskustva vlasnika i celog tima u poslovima tehničkog pregleda vozila.
          </p>
          {/* Carousel */}
          <Carousel />
        </div>

      </section>

      {/* Our Team Section */}
      <section id="nastim" className="w-full bg-[#1D1D1D] py-20">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <h2 className="font-raleway font-bold text-[48px] text-white text-left leading-none mb-6">
              NAŠ TIM
            </h2>
            <p className="font-atkinson text-[24px] text-white text-left leading-relaxed max-w-4xl">
              Naš tim čine profesionalno i ljubazno osoblje sa dugogodišnjim iskustvom u obavljanju tehničkog pregleda, registracije i osiguranja svih vrsta motornih vozila.
            </p>
          </div>
          
          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Director */}
            <div className="flex flex-col">
              <img 
                src={oliver_direktor} 
                alt="Oliver Rađenović - Direktor" 
                className="w-full h-[350px] object-cover"
                style={{ width: '280px', height: '350px' }}
              />
              <div className="bg-white py-6 px-4" style={{ width: '280px' }}>
                <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                  Oliver Rađenović
                </h3>
                <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                  Direktor
                </p>
              </div>
            </div>

            {/* Manager */}
            <div className="flex flex-col">
              <img 
                src={veljko_menadzer} 
                alt="Veljko Rađenović - Menadžer" 
                className="w-full h-[350px] object-cover"
                style={{ width: '280px', height: '350px' }}
              />
              <div className="bg-white py-6 px-4" style={{ width: '280px' }}>
                <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                  Veljko Rađenović
                </h3>
                <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                  Menadžer
                </p>
              </div>
            </div>

            {/* Sales Agent */}
            <div className="flex flex-col">
              <img 
                src={natasa_agent} 
                alt="Nataša Mladenović - Agent prodaje u osiguranju" 
                className="w-full h-[350px] object-cover"
                style={{ 
                  width: '280px', 
                  height: '350px',
                  objectPosition: 'center 10%' // More top-heavy cropping for better face framing
                }}
              />
              <div className="bg-white py-6 px-4" style={{ width: '280px' }}>
                <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                  Nataša Mladenović
                </h3>
                <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                  Agent prodaje u osiguranju
                </p>
              </div>
            </div>

            {/* Lawyer */}
            <div className="flex flex-col">
              <img 
                src={bozica_pravnik} 
                alt="Božica Radovanović - Diplomirani pravnik" 
                className="w-full h-[350px] object-cover"
                style={{ 
                  width: '280px', 
                  height: '350px',
                  objectPosition: 'center 40%' // More bottom-heavy cropping for better face framing
                }}
              />
              <div className="bg-white py-6 px-4" style={{ width: '280px' }}>
                <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                  Božica Radovanović
                </h3>
                <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                  Diplomirani pravnik
                </p>
              </div>
            </div>

            {/* Technical Inspector 1 */}
            <div className="flex flex-col">
              <img 
                src={sanja_kontrolor} 
                alt="Sanja Šekler - Kontrolor tehničkog pregleda" 
                className="w-full h-[350px] object-cover"
                style={{ width: '280px', height: '350px' }}
              />
              <div className="bg-white py-6 px-4" style={{ width: '280px' }}>
                <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                  Sanja Šekler
                </h3>
                <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                  Kontrolor tehničkog pregleda
                </p>
              </div>
            </div>

            {/* Technical Inspector 2 */}
            <div className="flex flex-col">
              <img 
                src={mirko_kontrolor} 
                alt="Mirko Vukadinović - Kontrolor tehničkog pregleda" 
                className="w-full h-[350px] object-cover"
                style={{ width: '280px', height: '350px' }}
              />
              <div className="bg-white py-6 px-4" style={{ width: '280px' }}>
                <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                  Mirko Vukadinović
                </h3>
                <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                  Kontrolor tehničkog pregleda
                </p>
              </div>
            </div>

            {/* Technical Inspector 3 */}
            <div className="flex flex-col">
              <img 
                src={srdjan_kontrolor} 
                alt="Srđan Nikolić - Kontrolor tehničkog pregleda" 
                className="w-full h-[350px] object-cover"
                style={{ width: '280px', height: '350px' }}
              />
              <div className="bg-white py-6 px-4" style={{ width: '280px' }}>
                <h3 className="font-atkinson font-bold text-[24px] text-black text-left leading-none mb-2">
                  Srđan Nikolić
                </h3>
                <p className="font-atkinson font-normal text-[20px] text-black text-left leading-none">
                  Kontrolor tehničkog pregleda
                </p>
              </div>
            </div>

            {/* Technical Inspector 4 */}
            <div className="flex flex-col">
              <img 
                src={dejan_kontrolor} 
                alt="Dejan Obradović - Kontrolor tehničkog pregleda" 
                className="w-full h-[350px] object-cover"
                style={{ 
                  width: '280px', 
                  height: '350px',
                  objectPosition: 'center 5%' // More top-heavy cropping for better face framing
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
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-16">
            {/* Left Column - Contact Information */}
            <div className="flex-1 min-w-0 lg:min-w-[400px]">
              <h2 className="font-raleway font-bold text-[48px] text-[#E9E9E9] text-center lg:text-center leading-none mb-12">
                KONTAKT
              </h2>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#DC1B21] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <a 
                    href="https://maps.app.goo.gl/snLwr7t9HNeffiVY7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-inter font-normal text-[24px] leading-[24px] text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Vojvode Mišića 2, Ratina - Kraljevo
                  </a>
                </div>

                {/* Phone Numbers */}
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-[#DC1B21] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
            <div className="flex-1 min-w-0 lg:min-w-[300px]">
              <h3 className="font-inter font-medium text-[24px] text-white text-left leading-none mt-24 mb-8">
                Radno vreme
              </h3>
              
              <div className="space-y-6">
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
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#DA0D14] text-white rounded-full shadow-lg hover:bg-[#87171B] transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-6 h-6 transform transition-transform duration-300 group-hover:-translate-y-1" 
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
  // All available images for carousel (excluding logos, icons, backgrounds, and team photos)
  const allImages = [
    // Carousel images - manually randomized order
    carousel15, carousel8, carousel3, carousel19, carousel12, carousel6, carousel21, carousel1, carousel17, carousel10,
    carousel4, carousel22, carousel13, carousel7, carousel20, carousel2, carousel16, carousel9, carousel14, carousel11,
    carousel18, carousel5, slajd3, slajd1, slajd5, slajd2, slajd4
  ];
  
  const [current, setCurrent] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

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
      <div className="relative w-full max-w-[1400px] h-[400px] flex justify-center items-center">
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
              transform = 'translateX(40%)';
              scale = 0.8;
              opacity = 0.4;
              zIndex = 1;
            } else if (position === -1) {
              // Left item (previous)
              transform = 'translateX(-40%)';
              scale = 0.8;
              opacity = 0.4;
              zIndex = 1;
            } else if (position === 2) {
              // Far right item (next next)
              transform = 'translateX(60%)';
              scale = 0.6;
              opacity = 0.2;
              zIndex = 0;
            } else if (position === -2) {
              // Far left item (previous previous)
              transform = 'translateX(-60%)';
              scale = 0.6;
              opacity = 0.2;
              zIndex = 0;
            }

            return (
              <div
                key={index}
                className="absolute w-[70%] h-full left-0 right-0 mx-auto transition-all duration-400 ease-in-out"
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
      <div className="flex flex-row items-center justify-center gap-8 mt-8">
        <button 
          onClick={() => handleArrow(-1)} 
          disabled={isTransitioning}
          className={`focus:outline-none transition-all duration-200 ${
            isTransitioning 
              ? 'opacity-50' 
              : 'hover:scale-110'
          }`}
          aria-label="Previous slide"
        >
          <img src={arrowLeft} alt="left arrow" className="w-10 h-10" />
        </button>
        <button 
          onClick={() => handleArrow(1)} 
          disabled={isTransitioning}
          className={`focus:outline-none transition-all duration-200 ${
            isTransitioning 
              ? 'opacity-50' 
              : 'hover:scale-110'
          }`}
          aria-label="Next slide"
        >
          <img src={arrowRight} alt="right arrow" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}
