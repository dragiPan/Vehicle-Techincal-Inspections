import logo from "./assets/finalni oliver logo i kartice-05 1.svg";
import { useState } from "react";
import heroVideo from "./assets/template_mechanic_video.mp4";
import React from "react"; // Added missing import for React.useEffect

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
    </div>
  );
}

export default App;
