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

  const current = HERO_OPTIONS.find((o) => o.key === selected);
  const pendingOption = pending ? HERO_OPTIONS.find((o) => o.key === pending) : null;

  // Animation handler
  const handleSelect = (key) => {
    if (key === selected || pending) return;
    setFade(false); // start fade out
    setPending(key);
  };

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

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center justify-between w-screen bg-white py-8">
        <div className="ml-14">
          <img src={logo} alt="Tehnički pregled Oliver logo" className="w-[393px] h-[101px] block" />
        </div>
        <div className="flex flex-row gap-16 mr-14">
          {/* Left Column */}
          <div className="flex flex-col items-start gap-1 min-w-[220px]">
            <div>
              <span className="text-[#DC1B21] font-inter font-bold text-[20px]">Telefon:</span>
              <span className="text-black font-inter font-normal text-[20px] ml-2">+381 36 586 2222</span>
            </div>
            <div>
              <span className="text-[#DC1B21] font-inter font-bold text-[20px]">Mobilni:</span>
              <span className="text-black font-inter font-normal text-[20px] ml-2">+381 63 839 9940</span>
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col items-start gap-1 min-w-[180px]">
            <div className="text-[#DC1B21] font-inter font-bold text-[20px]">Radno vreme</div>
            <div className="text-black font-inter font-normal text-[20px]">Radnim danima: 07–17h</div>
            <div className="text-black font-inter font-normal text-[20px]">Subotom: 07–14h</div>
          </div>
        </div>
      </div>
      {/* Navigation Section */}
      <nav className="w-screen bg-[#1D1D1D]">
        <ul className="flex justify-between items-center w-full max-w-screen-xl mx-auto px-24 py-3">
          <li>
            <a href="#pocetna" className="text-[#E9E9E9] font-raleway font-semibold text-[24px] px-4 py-1 rounded">Početna</a>
          </li>
          <li>
            <a href="#usluge" className="text-[#AFAFAF] font-raleway font-semibold text-[24px] px-4 py-1 rounded">Usluge</a>
          </li>
          <li>
            <a href="#onama" className="text-[#AFAFAF] font-raleway font-semibold text-[24px] px-4 py-1 rounded">O nama</a>
          </li>
          <li>
            <a href="#nastim" className="text-[#AFAFAF] font-raleway font-semibold text-[24px] px-4 py-1 rounded">Naš tim</a>
          </li>
          <li>
            <a href="#kontakt" className="text-[#AFAFAF] font-raleway font-semibold text-[24px] px-4 py-1 rounded">Kontakt</a>
          </li>
        </ul>
      </nav>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-end justify-center bg-black overflow-hidden">
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
              return (
                <a
                  key={option.key}
                  href="#" // blank link, no jump
                  tabIndex={0}
                  className={
                    `font-inter font-semibold text-[20px] w-[300px] h-[64px] px-12 py-4 flex items-center justify-center whitespace-nowrap truncate
                    bg-[#87171B] text-white border-none outline-none
                    transition-colors duration-500`
                  }
                  style={{ borderRadius: 0, transitionProperty: 'background-color, color' }}
                  onMouseDown={e => e.preventDefault()} // prevent focus ring
                  onClick={e => e.preventDefault()} // no navigation yet
                  onMouseEnter={e => {
                    e.currentTarget.classList.add('hovered-hero-btn');
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.classList.remove('hovered-hero-btn');
                  }}
                >
                  {option.label}
                </a>
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
      <section className="w-full bg-white py-20 overflow-x-hidden relative">
        {/* Car image outside max-w-7xl, always flush with left edge of viewport, width 50vw */}
        <div className="w-1/2 flex justify-start absolute left-0 bottom-0 z-0" style={{pointerEvents: 'none'}}>
          <img
            src={carImg}
            alt="Crveni automobil"
            className="animate-drive-in w-full h-auto object-contain"
            style={{display: 'block'}}
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
        {/* Car animation keyframes */}
        <style>{`
          @keyframes drive-in {
            0% { transform: translateX(-100%) scale(1.05); }
            80% { transform: translateX(5%) scale(1.02); }
            100% { transform: translateX(0) scale(1); }
          }
          .animate-drive-in {
            animation: drive-in 1.4s cubic-bezier(0.7,0,0.3,1) 0.2s both;
          }
          @media (max-width: 1200px) {
            .animate-drive-in {
              max-width: 500px !important;
            }
          }
          @media (max-width: 768px) {
            .animate-drive-in {
              max-width: 320px !important;
            }
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
      <section className="w-full bg-white py-20 flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto px-4">
          <h2 className="font-railway font-bold text-[48px] text-[#1D1D1D] text-left leading-none mb-6">O NAMA</h2>
          <p className="font-atkinson text-[24px] text-left text-[#1D1D1D] mb-10 max-w-4xl">
            Tehnički pregled OLIVER d.o.o. je privatno porodično preduzeće koje je počelo sa radom 2025. godine nakon dugogodišnjeg iskustva vlasnika i celog tima u poslovima tehničkog pregleda vozila.
          </p>
          {/* Carousel */}
          <Carousel />
        </div>
      </section>
    </div>
  );
}

export default App;

// Carousel component
function Carousel() {
  const images = [slajd1, slajd2, slajd3, slajd4, slajd5];
  const [current, setCurrent] = React.useState(2);
  const [animating, setAnimating] = React.useState(false);

  const getDisplayImages = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      let idx = (current + i + images.length) % images.length;
      result.push(images[idx]);
    }
    return result;
  };

  const getZIndex = (i) => (i === 2 ? 30 : 20 - Math.abs(i - 2));
  const getScale = (i) => {
    if (i === 2) return 'scale-105';
    if (i === 1 || i === 3) return 'scale-95';
    return 'scale-90';
  };
  const getOpacity = (i) => {
    if (i === 2) return 'opacity-100';
    if (i === 1 || i === 3) return 'opacity-80';
    return 'opacity-60';
  };
  const getMargin = (i) => {
    if (i === 1 || i === 3) return '-ml-16'; // Slight overlap
    if (i === 0 || i === 4) return '-ml-8'; // Further side slides
    return ''; // Center slide, no margin
  };

  const handleArrow = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((prev) => (prev + dir + images.length) % images.length);
      setAnimating(false);
    }, 300);
  };

  const displayImages = getDisplayImages();

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-center items-center h-[380px] mb-6 select-none relative">
        {displayImages.map((img, i) => (
          <div
            key={i}
            className={`relative transition-all duration-300 ease-in-out ${getScale(i)} ${getOpacity(i)} ${getMargin(i)} ${animating ? 'pointer-events-none' : ''}`}
            style={{
              zIndex: getZIndex(i),
              minWidth: i === 2 ? 460 : i === 1 || i === 3 ? 300 : 220,
              minHeight: i === 2 ? 300 : i === 1 || i === 3 ? 220 : 160,
            }}
          >
            <img
              src={img}
              alt={`carousel-${i}`}
              className="object-cover shadow-md w-full h-full"
              draggable={false}
            />
            {i !== 2 && (
              <div className={`absolute inset-0 ${i === 1 || i === 3 ? 'bg-white/10' : 'bg-white/25'} pointer-events-none`} />
            )}
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="flex flex-row items-center justify-center gap-8 mt-2">
        <button onClick={() => handleArrow(-1)} className="focus:outline-none" aria-label="Previous slide">
          <img src={arrowLeft} alt="left arrow" className="w-10 h-10" />
        </button>
        <button onClick={() => handleArrow(1)} className="focus:outline-none" aria-label="Next slide">
          <img src={arrowRight} alt="right arrow" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
}
