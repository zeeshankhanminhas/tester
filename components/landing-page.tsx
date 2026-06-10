"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject, RefObject } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import expeditions from "@/data/expeditions.json";

type Expedition = {
  id: string;
  title: string;
  region: string;
  coordinates: string;
  duration: string;
  altitude: string;
  brief: string;
  image: string;
};

const fieldStats = [
  ["36°N", "Karakoram latitude"],
  ["4,693m", "Khunjerab pass"],
  ["03", "active dossiers"],
  ["1:6", "guide ratio"],
];

const routePoints = [
  ["Islamabad", "15%", "78%"],
  ["Besham", "30%", "64%"],
  ["Chilas", "45%", "51%"],
  ["Hunza", "62%", "36%"],
  ["Khunjerab", "80%", "21%"],
];

const navItems = ["Dossiers", "Route", "Pakistan", "Journal"];
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  const heroImageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElementTagNameMap["article"] | null)[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 8,
          scale: 1.07,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.9,
          },
        });
      }

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 48 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 84%",
            },
          },
        );
      });

      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current.querySelectorAll(".route-mark"),
          { autoAlpha: 0, scale: 0.72 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.13,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 72%",
            },
          },
        );
      }
    });

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <main className="relative isolate overflow-hidden bg-ink text-ash">
      <Navigation />
      <Hero heroImageRef={heroImageRef} />
      <CredibilityStrip />
      <ExpeditionGrid cardRefs={cardRefs} expeditions={expeditions as Expedition[]} />
      <RouteTeaser mapRef={mapRef} />
      <PakistanEditorial />
      <JournalFooter />
    </main>
  );
}

function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#090a08]/[0.72] backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#top" className="group flex items-center gap-3" aria-label="Rugged Frontiers home">
          <span className="grid size-10 place-items-center border border-brass/70 bg-black/40 font-display text-xl text-brass">RF</span>
          <span>
            <span className="block font-display text-2xl leading-none tracking-wide text-white">Rugged Frontiers</span>
            <span className="field-label text-[0.55rem] text-field">Northern Pakistan expedition office</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-[0.28em] text-ash/75 transition hover:text-brass">
              {item}
            </a>
          ))}
        </div>
        <a href="#journal" className="hidden border border-brass/60 bg-brass px-5 py-3 text-xs font-black uppercase tracking-[0.22em] text-ink transition hover:bg-white sm:inline-flex">
          Request briefing
        </a>
      </nav>
    </header>
  );
}

function Hero({ heroImageRef }: { heroImageRef: RefObject<HTMLDivElement | null> }) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-20">
      <div ref={heroImageRef} className="absolute inset-0 -z-30 scale-105 bg-cover bg-center" style={{ backgroundImage: `url('${withBasePath("/images/hero-karakoram.svg")}')` }} />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_68%_16%,rgba(234,194,112,.28),transparent_25%),linear-gradient(90deg,rgba(7,8,7,.96),rgba(7,8,7,.72)_31%,rgba(7,8,7,.16)_67%),linear-gradient(0deg,rgba(7,8,7,1),rgba(7,8,7,.08)_46%,rgba(7,8,7,.62))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div className="section-shell relative z-10 grid min-h-[calc(100vh-5rem)] gap-8 pb-8 pt-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="flex max-w-5xl flex-col justify-end">
          <div className="mb-7 flex flex-wrap items-center gap-3 text-[0.62rem] font-bold uppercase tracking-[0.28em] text-field">
            <span className="border border-brass/50 bg-black/[0.35] px-3 py-2 text-brass">36.3167° N</span>
            <span className="border border-white/15 bg-black/25 px-3 py-2">74.6500° E</span>
            <span className="hidden border border-white/15 bg-black/25 px-3 py-2 sm:inline-flex">Weather window / limited</span>
          </div>
          <p className="field-label mb-5">Expedition dossier / Karakoram field briefing</p>
          <h1 className="max-w-5xl font-display text-[clamp(4.6rem,13vw,12.5rem)] uppercase leading-[0.76] tracking-wide text-white drop-shadow-2xl">
            The last road north
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#dossiers" className="bg-brass px-6 py-4 text-xs font-black uppercase tracking-[0.24em] text-ink transition hover:bg-white">
              Open dossiers
            </a>
            <a href="#route" className="border border-white/20 bg-black/25 px-6 py-4 text-xs font-black uppercase tracking-[0.24em] text-white transition hover:border-brass hover:text-brass">
              Trace route
            </a>
          </div>
        </motion.div>
        <motion.aside initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.24 }} className="self-end border border-white/[0.12] bg-black/[0.42] p-5 text-xs uppercase tracking-[0.22em] text-field shadow-dossier backdrop-blur-sm">
          <p className="text-brass">RF / Field index</p>
          <dl className="mt-5 grid gap-3">
            <div className="flex justify-between gap-6 border-b border-white/10 pb-3"><dt>Range</dt><dd className="text-ash">Karakoram</dd></div>
            <div className="flex justify-between gap-6 border-b border-white/10 pb-3"><dt>Access</dt><dd className="text-ash">Gilgit line</dd></div>
            <div className="flex justify-between gap-6 border-b border-white/10 pb-3"><dt>Field cell</dt><dd className="text-ash">03 dossiers</dd></div>
            <div className="flex justify-between gap-6"><dt>Signal</dt><dd className="text-ash">intermittent</dd></div>
          </dl>
        </motion.aside>
      </div>
      <div className="pointer-events-none absolute bottom-8 right-8 hidden border-l border-brass/50 pl-5 text-[0.65rem] uppercase leading-6 tracking-[0.28em] text-field xl:block">
        <p>Glacier-fed valleys</p>
        <p>Border weather / high exposure</p>
      </div>
    </section>
  );
}

function CredibilityStrip() {
  return (
    <section className="relative -mt-px border-y border-white/10 bg-cover bg-center py-7" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,9,8,.98), rgba(29,25,17,.88)), url('${withBasePath("/images/karakoram.svg")}')` }}>
      <div className="section-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {fieldStats.map(([value, label]) => (
          <div key={label} className="border-l border-brass/50 bg-black/20 py-2 pl-5">
            <p className="font-display text-5xl leading-none text-white">{value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-field">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExpeditionGrid({ expeditions, cardRefs }: { expeditions: Expedition[]; cardRefs: MutableRefObject<(HTMLElementTagNameMap["article"] | null)[]> }) {
  return (
    <section id="dossiers" className="section-shell py-20 sm:py-32">
      <div className="mb-10 grid gap-8 lg:grid-cols-[.48fr_1fr] lg:items-end">
        <div>
          <p className="field-label">Expedition feature strip / V1 field files</p>
          <p className="mt-4 max-w-xs text-sm uppercase leading-7 tracking-[0.2em] text-field">Route notes, altitude discipline, local access, private departure windows.</p>
        </div>
        <h2 className="font-display text-6xl uppercase leading-[0.82] text-white sm:text-8xl lg:text-9xl">Dossiers from the high north</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-4 lg:grid-rows-[360px_360px]">
        {expeditions.map((expedition, index) => {
          const featured = index === 0;

          return (
            <article
              key={expedition.id}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className={`group relative overflow-hidden border border-white/10 bg-obsidian shadow-dossier ${featured ? "min-h-[650px] lg:col-span-2 lg:row-span-2" : "min-h-[520px] lg:col-span-2 lg:min-h-0"}`}
            >
              <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.045]" style={{ backgroundImage: `url('${withBasePath(expedition.image)}')` }} />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,8,7,.96),rgba(7,8,7,.58)_42%,rgba(7,8,7,.08)),linear-gradient(90deg,rgba(7,8,7,.60),transparent_68%)]" />
              <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-4 text-[0.62rem] uppercase tracking-[0.24em] text-ash/[0.72]">
                <span>{expedition.id}</span>
                <span className="text-right">{expedition.coordinates}</span>
              </div>
              <div className={`relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-6 sm:p-7 ${featured ? "lg:p-9" : ""}`}>
                <p className="field-label">{expedition.region}</p>
                <h3 className={`mt-4 font-display uppercase leading-none text-white ${featured ? "text-6xl sm:text-8xl" : "text-5xl sm:text-6xl"}`}>{expedition.title}</h3>
                <p className="mt-5 max-w-md border-l border-brass/50 pl-4 text-sm leading-7 text-ash/[0.82]">{expedition.brief}</p>
                <dl className="mt-7 grid max-w-md grid-cols-2 gap-4 border-t border-white/[0.12] pt-5 text-xs uppercase tracking-[0.18em] text-field">
                  <div><dt className="text-brass">Duration</dt><dd className="mt-2 text-ash">{expedition.duration}</dd></div>
                  <div><dt className="text-brass">Altitude</dt><dd className="mt-2 text-ash">{expedition.altitude}</dd></div>
                </dl>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function RouteTeaser({ mapRef }: { mapRef: RefObject<HTMLDivElement | null> }) {
  return (
    <section id="route" className="relative overflow-hidden bg-obsidian py-20 sm:py-32">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.55]" style={{ backgroundImage: `linear-gradient(180deg, rgba(7,8,7,1), rgba(7,8,7,.72) 22%, rgba(7,8,7,1)), url('${withBasePath("/images/baltoro.svg")}')` }} />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brass/40 to-transparent" />
      <div className="section-shell relative z-10 grid gap-12 lg:grid-cols-[.58fr_1.42fr] lg:items-center">
        <div>
          <p className="field-label">Interactive map / journey layer</p>
          <h2 className="mt-5 font-display text-6xl uppercase leading-[0.82] text-white sm:text-8xl">Route becomes valley</h2>
          <p className="mt-7 max-w-sm text-sm uppercase leading-7 tracking-[0.2em] text-field">Above: one line. Below: bridges, villages, weather, altitude, silence.</p>
        </div>
        <div ref={mapRef} className="relative min-h-[660px] overflow-hidden border border-white/10 bg-[#11120f] p-8 shadow-dossier">
          <div className="absolute inset-0 bg-cover bg-center opacity-[0.68] saturate-[.78]" style={{ backgroundImage: `url('${withBasePath("/images/hero-karakoram.svg")}')` }} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_24%,rgba(200,164,93,.22),transparent_20%),linear-gradient(0deg,rgba(7,8,7,.90),rgba(7,8,7,.26)_52%,rgba(7,8,7,.82))]" />
          <div className="absolute inset-7 border border-white/10" />
          <div className="absolute inset-x-10 top-12 flex justify-between gap-6 text-[0.62rem] uppercase tracking-[0.28em] text-field">
            <span>Operational map / KKH northbound</span><span className="text-right">36.3167° N / 74.6500° E</span>
          </div>
          {routePoints.map(([label, left, top]) => (
            <div key={label} className="route-mark absolute" style={{ left, top }}><MapPoint label={label} /></div>
          ))}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M16 79 C26 69, 32 66, 30 62 S42 54, 45 51 S55 41, 62 36 S72 25, 81 21" fill="none" stroke="rgba(200,164,93,.95)" strokeWidth="0.42" strokeDasharray="1.8 2.1" />
            <path d="M6 81 C28 73, 42 83, 64 68 S82 55, 97 61" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="0.18" />
            <path d="M2 47 C22 35, 38 50, 56 30 S78 17, 98 25" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="0.18" />
            <path d="M18 22 L28 28 L37 18 L48 31 L58 20 L69 31 L80 17 L94 32" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="0.16" />
          </svg>
          <div className="absolute bottom-8 left-8 right-8 grid gap-3 border-t border-white/[0.12] pt-5 text-xs uppercase leading-6 tracking-[0.22em] text-field sm:grid-cols-3">
            <p><span className="text-brass">01</span> road condition</p>
            <p><span className="text-brass">02</span> valley clearance</p>
            <p><span className="text-brass">03</span> weather hold</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapPoint({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-3 rounded-full bg-brass shadow-[0_0_0_8px_rgba(200,164,93,.14)]" />
      <span className="whitespace-nowrap text-xs font-black uppercase tracking-[0.2em] text-white drop-shadow-lg">{label}</span>
    </div>
  );
}

function PakistanEditorial() {
  return (
    <section id="pakistan" className="section-shell py-20 sm:py-32">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
        <div className="relative min-h-[680px] overflow-hidden border border-white/10 shadow-dossier">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${withBasePath("/images/community.svg")}')` }} />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(7,8,7,.94),rgba(7,8,7,.18)_56%,rgba(7,8,7,.66))]" />
          <div className="absolute left-6 top-6 border border-white/[0.12] bg-black/[0.35] px-4 py-3 text-[0.62rem] uppercase tracking-[0.26em] text-field backdrop-blur-sm">Hunza / guide ledger</div>
          <h2 className="absolute bottom-7 left-6 right-6 font-display text-6xl uppercase leading-[0.82] text-white sm:text-8xl">The north is not empty</h2>
        </div>
        <div className="flex flex-col justify-between gap-7 border-y border-white/10 py-2 lg:py-0">
          <div className="bg-[linear-gradient(120deg,rgba(200,164,93,.12),transparent_42%)] p-8 sm:p-10">
            <p className="field-label">Why Pakistan / editorial note</p>
            <p className="mt-8 text-2xl leading-10 text-ash/[0.85] sm:text-3xl sm:leading-[3rem]">Glaciers cut the valleys. Villages hold the routes. Guides read what maps cannot.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="hairline bg-black/20 p-6"><p className="field-label">Terrain</p><p className="mt-4 text-sm leading-7 text-ash/[0.72]">Granite walls, glacial water, plateau wind.</p></div>
            <div className="hairline bg-black/20 p-6"><p className="field-label">Human line</p><p className="mt-4 text-sm leading-7 text-ash/[0.72]">Porters, cooks, scouts, families, permission.</p></div>
          </div>
          <div className="relative min-h-56 overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${withBasePath("/images/deosai.svg")}')` }} />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,.88),rgba(7,8,7,.30))]" />
            <p className="absolute bottom-5 left-5 max-w-sm text-xs uppercase leading-6 tracking-[0.22em] text-field">Commercial enough to move. Respectful enough to wait.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalFooter() {
  return (
    <footer id="journal" className="relative overflow-hidden border-t border-white/10 bg-black py-20">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.97), rgba(0,0,0,.78)), url('${withBasePath("/images/karakoram.svg")}')` }} />
      <div className="section-shell relative z-10 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
        <div>
          <p className="field-label">Journal dispatch / application signal</p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-none text-white sm:text-8xl">Enter the brief</h2>
        </div>
        <form className="grid gap-4 sm:grid-cols-[1fr_auto]" action="#">
          <label className="sr-only" htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="signal@email.com" className="border border-white/15 bg-white/[0.07] px-5 py-4 text-white outline-none transition placeholder:text-field focus:border-brass" />
          <button className="bg-brass px-7 py-4 text-sm font-black uppercase tracking-[0.24em] text-ink transition hover:bg-white" type="submit">Request</button>
        </form>
      </div>
      <div className="section-shell relative z-10 mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.22em] text-field sm:flex-row">
        <p>© 2026 Rugged Frontiers</p>
        <p>35.9208° N / 74.3087° E</p>
      </div>
    </footer>
  );
}
