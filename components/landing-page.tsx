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
  ["17", "years guiding frontier logistics"],
  ["4.9k", "meters highest dossier route"],
  ["3", "regional field teams on call"],
  ["1:6", "maximum guide-to-crew ratio"],
];

const navItems = ["Dossiers", "Route", "Pakistan", "Journal"];

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  const heroImageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 10,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: heroImageRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 54 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
          },
        );
      });

      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current.querySelectorAll(".route-mark"),
          { autoAlpha: 0, scale: 0.7 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 70%",
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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-ink/55 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between">
        <a href="#top" className="group flex items-center gap-3" aria-label="Rugged Frontiers home">
          <span className="grid size-10 place-items-center border border-brass/50 text-brass">RF</span>
          <span>
            <span className="block font-display text-2xl leading-none tracking-wide text-white">Rugged Frontiers</span>
            <span className="field-label text-[0.55rem] text-field">Pakistan expedition office</span>
          </span>
        </a>
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-[0.28em] text-ash/70 transition hover:text-brass">
              {item}
            </a>
          ))}
        </div>
        <a href="#journal" className="hidden border border-brass/50 px-5 py-3 text-xs font-bold uppercase tracking-[0.24em] text-brass transition hover:bg-brass hover:text-ink sm:inline-flex">
          Request briefing
        </a>
      </nav>
    </header>
  );
}

function Hero({ heroImageRef }: { heroImageRef: RefObject<HTMLDivElement | null> }) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden pt-20">
      <div ref={heroImageRef} className="absolute inset-0 -z-20 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-karakoram.svg')" }} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,8,7,.96),rgba(7,8,7,.64)_42%,rgba(7,8,7,.2)),linear-gradient(0deg,rgba(7,8,7,1),rgba(7,8,7,.05)_45%,rgba(7,8,7,.68))]" />
      <div className="section-shell grid min-h-[calc(100vh-5rem)] items-end pb-12 pt-24 lg:grid-cols-[1.08fr_.72fr] lg:gap-16 lg:pb-20">
        <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
          <p className="field-label mb-6">Field dossier / North Pakistan / active season 2026</p>
          <h1 className="max-w-5xl font-display text-[clamp(5rem,14vw,13rem)] uppercase leading-[0.78] tracking-wide text-white">
            Into the hard country
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-ash/78 sm:text-xl">
            Expedition-grade journeys through Pakistan&apos;s high frontier, built like a field briefing: precise, weather-aware, culturally grounded, and cinematic without becoming tourism theater.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#dossiers" className="bg-brass px-7 py-4 text-sm font-black uppercase tracking-[0.24em] text-ink transition hover:bg-white">
              View dossiers
            </a>
            <a href="#route" className="border border-white/20 px-7 py-4 text-sm font-black uppercase tracking-[0.24em] text-white transition hover:border-brass hover:text-brass">
              Trace route
            </a>
          </div>
        </motion.div>
        <motion.aside initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.22 }} className="mt-12 border border-white/15 bg-ink/45 p-5 backdrop-blur-md lg:mt-0">
          <p className="field-label">Briefing note 04</p>
          <div className="mt-5 grid gap-5 text-sm leading-7 text-ash/72">
            <p>Routes are selected for altitude discipline, terrain literacy, and access to communities that shape the Karakoram, Hindukush, and Himalayan margins.</p>
            <p className="border-l border-brass/50 pl-4 text-ash">No mass-market departures. No resort pacing. Every itinerary reads like a mission file.</p>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function CredibilityStrip() {
  return (
    <section className="border-y border-white/10 bg-obsidian/80 py-8">
      <div className="section-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {fieldStats.map(([value, label]) => (
          <div key={label} className="border-l border-brass/40 pl-5">
            <p className="font-display text-5xl leading-none text-white">{value}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-field">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExpeditionGrid({ expeditions, cardRefs }: { expeditions: Expedition[]; cardRefs: MutableRefObject<Array<HTMLDivElement | null>> }) {
  return (
    <section id="dossiers" className="section-shell py-24 sm:py-32">
      <div className="mb-12 grid gap-6 lg:grid-cols-[.7fr_1fr] lg:items-end">
        <p className="field-label">Expedition cards / V1 static JSON</p>
        <h2 className="font-display text-6xl uppercase leading-[0.86] text-white sm:text-8xl">Filed routes for severe beauty</h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {expeditions.map((expedition, index) => (
          <article key={expedition.id} ref={(node) => { cardRefs.current[index] = node; }} className="group min-h-[560px] overflow-hidden border border-white/10 bg-obsidian shadow-dossier">
            <div className="h-64 bg-cover bg-center transition duration-700 group-hover:scale-[1.035]" style={{ backgroundImage: `linear-gradient(0deg, rgba(7,8,7,.86), rgba(7,8,7,.1)), url('${expedition.image}')` }} />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="field-label">{expedition.region}</p>
                <span className="text-xs uppercase tracking-[0.18em] text-field">{expedition.id}</span>
              </div>
              <h3 className="mt-5 font-display text-5xl uppercase leading-none text-white">{expedition.title}</h3>
              <p className="mt-5 text-sm leading-7 text-ash/72">{expedition.brief}</p>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.18em] text-field">
                <div><dt className="text-brass">Duration</dt><dd className="mt-2 text-ash">{expedition.duration}</dd></div>
                <div><dt className="text-brass">Altitude</dt><dd className="mt-2 text-ash">{expedition.altitude}</dd></div>
              </dl>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-ash/55">{expedition.coordinates}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RouteTeaser({ mapRef }: { mapRef: RefObject<HTMLDivElement | null> }) {
  return (
    <section id="route" className="bg-obsidian py-24 sm:py-32">
      <div className="section-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <p className="field-label">Journey trace / map teaser</p>
          <h2 className="mt-5 font-display text-6xl uppercase leading-[0.88] text-white sm:text-8xl">From Islamabad briefings to ice road silence</h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-ash/72">The V1 route visualization is a tactical preview: dispatch point, acclimatization pockets, high passes, and field stops plotted with restraint for future map integration.</p>
        </div>
        <div ref={mapRef} className="relative min-h-[520px] overflow-hidden border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(200,164,93,.22),transparent_28%),linear-gradient(135deg,rgba(255,255,255,.08),transparent_35%),#0b0c0a] p-8 shadow-dossier">
          <div className="absolute inset-8 border border-white/10" />
          <div className="absolute left-[18%] top-[68%] route-mark"><MapPoint label="Islamabad" /></div>
          <div className="absolute left-[34%] top-[52%] route-mark"><MapPoint label="Naran" /></div>
          <div className="absolute left-[54%] top-[38%] route-mark"><MapPoint label="Hunza" /></div>
          <div className="absolute left-[72%] top-[24%] route-mark"><MapPoint label="Khunjerab" /></div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M20 70 C33 58, 41 58, 36 52 S52 42, 56 39 S69 29, 74 24" fill="none" stroke="rgba(200,164,93,.62)" strokeWidth="0.4" strokeDasharray="2 2" />
          </svg>
          <p className="absolute bottom-8 left-8 right-8 border-t border-white/10 pt-5 text-xs uppercase leading-6 tracking-[0.22em] text-field">Route layer: convoy windows / river crossings / altitude holds / weather abort points</p>
        </div>
      </div>
    </section>
  );
}

function MapPoint({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-3 rounded-full bg-brass shadow-[0_0_0_8px_rgba(200,164,93,.12)]" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">{label}</span>
    </div>
  );
}

function PakistanEditorial() {
  return (
    <section id="pakistan" className="section-shell py-24 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
        <h2 className="font-display text-7xl uppercase leading-[0.84] text-white sm:text-9xl">Why Pakistan, why now</h2>
        <div className="space-y-7 text-lg leading-9 text-ash/76">
          <p>Pakistan&apos;s northern ranges are not a backdrop; they are the operating environment. Weather moves fast, roads earn respect, and hospitality is a living system rather than a brochure line.</p>
          <p>Rugged Frontiers frames each departure as an editorial-grade field assignment with cultural context, logistical humility, and enough empty space for the landscape to stay bigger than the itinerary.</p>
          <div className="grid gap-4 pt-4 sm:grid-cols-2">
            <div className="hairline p-5"><p className="field-label">Terrain</p><p className="mt-3 text-sm leading-7 text-ash/70">Granite, glacial rivers, plateaus, and road corridors where patience is equipment.</p></div>
            <div className="hairline p-5"><p className="field-label">Ethos</p><p className="mt-3 text-sm leading-7 text-ash/70">Small groups, local crews, sober pacing, and no artificial adventure gloss.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function JournalFooter() {
  return (
    <footer id="journal" className="border-t border-white/10 bg-black py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
        <div>
          <p className="field-label">Journal / signal dispatch</p>
          <h2 className="mt-4 font-display text-6xl uppercase leading-none text-white sm:text-8xl">Receive the field notes</h2>
        </div>
        <form className="grid gap-4 sm:grid-cols-[1fr_auto]" action="#">
          <label className="sr-only" htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="operator@email.com" className="border border-white/15 bg-white/5 px-5 py-4 text-white outline-none transition placeholder:text-field focus:border-brass" />
          <button className="bg-brass px-7 py-4 text-sm font-black uppercase tracking-[0.24em] text-ink transition hover:bg-white" type="submit">Subscribe</button>
        </form>
      </div>
      <div className="section-shell mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.22em] text-field sm:flex-row">
        <p>© 2026 Rugged Frontiers</p>
        <p>35.9208° N / 74.3087° E</p>
      </div>
    </footer>
  );
}
