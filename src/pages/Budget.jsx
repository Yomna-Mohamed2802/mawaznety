import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Coin from '../components/ui/Coin';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════ */
/*  SCENE WRAPPER                                            */
/* ══════════════════════════════════════════════════════════ */

function Scene({ id, bg = '', children }) {
  return (
    <div
      data-scene={id}
      className={`scene relative h-screen w-full flex items-center justify-center overflow-hidden ${bg}`}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/*  TEASER — PURE STORYTELLING INTRO                         */
/* ══════════════════════════════════════════════════════════ */

export default function Budget() {
  const containerRef = useRef(null);
  const coinRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const coin = coinRef.current;
      if (!coin) return;

      /* ── Progress bar ──────────────────────────────── */
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      /* ── MASTER TIMELINE — coin travels ────────────── */
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      /* S01: Hero — coin fades in center */
      master
        .set(coin, { x: 0, y: 0, scale: 0.8, rotation: 0, opacity: 0 })
        .to(coin, { opacity: 1, scale: 1, duration: 0.08 });

      /* S01 → S02: coin shrinks + moves top-right */
      master.to(coin, {
        x: () => window.innerWidth * 0.3,
        y: () => -window.innerHeight * 0.3,
        scale: 0.35,
        rotation: 180,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* S02 → S03: coin moves left */
      master.to(coin, {
        x: () => -window.innerWidth * 0.32,
        y: () => window.innerHeight * 0.15,
        scale: 0.4,
        rotation: 360,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* S03 → S04: coin back center, grows */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 1.1,
        rotation: 540,
        duration: 1,
        ease: 'power3.inOut',
      });

      /* S04 → S05: coin shrinks + moves away */
      master.to(coin, {
        x: () => window.innerWidth * 0.25,
        y: () => -window.innerHeight * 0.25,
        scale: 0.3,
        rotation: 720,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* S05 → S06: coin grows huge + fades out (end) */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 3,
        rotation: 900,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.in',
      });

      /* ── Per-scene content reveals ────────────────── */
      gsap.utils.toArray('.scene').forEach((scene) => {
        const reveals = scene.querySelectorAll('.sr');
        if (reveals.length === 0) return;
        gsap.fromTo(reveals,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 75%',
              end: 'top 25%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#06080F]" dir="rtl">
      {/* ── Progress Bar ──────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.03] z-[200]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#D4A853] to-[#E8C874] origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* ── Traveling Coin ────────────────────────────── */}
      <div
        ref={coinRef}
        className="fixed top-1/2 left-1/2 z-[100] pointer-events-none will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <Coin size={90} spinning={true} />
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* S01 — HERO                                       */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="hero" bg="bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#06080F]">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#D4A853]"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.08 + Math.random() * 0.25,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-[#D4A853]/[0.03] blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="sr text-[#D4A853]/40 text-[10px] tracking-[0.6em] uppercase mb-8 font-medium">
            موازنتي — موازنة Citizen 2027/2026
          </p>
          <h1 className="sr text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.15] mb-7">
            كل جنيه في إيديك
            <br />
            <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent">
              وراه حكاية.
            </span>
          </h1>
          <p className="sr text-base sm:text-lg text-[#5A6578] max-w-lg mx-auto leading-relaxed">
            اكتشف معانا حكاية موازنتك.
          </p>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* S02 — THE BIG NUMBER (minimal)                  */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="number" bg="bg-gradient-to-b from-[#06080F] to-[#0A0E18]">
        <div className="text-center px-6">
          <p className="sr text-[#4A5568] text-sm mb-4">إجمالي إيرادات الدولة</p>
          <div className="sr">
            <span className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-black bg-gradient-to-b from-[#E8C874] to-[#D4A853] bg-clip-text text-transparent leading-none">
              4.1
            </span>
          </div>
          <p className="sr text-[#5A6578] text-lg mt-2">تريليون جنيه</p>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* S03 — 100 GENIH (concept only)                  */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="100" bg="bg-gradient-to-b from-[#0A0E18] via-[#0D1120] to-[#0A0E18]">
        <div className="text-center px-6">
          <p className="sr text-[#4A5568] text-sm mb-4">لو معاك 100 جنيه</p>
          <div className="sr">
            <span className="text-[6rem] sm:text-[8rem] md:text-[10rem] font-black text-white leading-none">
              100
            </span>
          </div>
          <p className="sr text-[#5A6578] text-lg mt-2">بتروح فين؟</p>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* S04 — CITIZENS (icons only)                     */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="citizens" bg="bg-gradient-to-b from-[#0A0E18] to-[#06080F]">
        <div className="text-center px-6 max-w-3xl mx-auto">
          <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-12">
            موازنتك بتأثر
            <br />
            <span className="text-[#A78BDA]">في حياة كل مصري.</span>
          </h2>
          <div className="sr flex justify-center gap-6 sm:gap-10 text-4xl sm:text-5xl">
            <span>🎓</span>
            <span>👨‍👩‍👧‍👦</span>
            <span>🏢</span>
            <span>🏥</span>
            <span>🌿</span>
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* S05 — CLOSING TEASER                             */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="closing" bg="bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#06080F]">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#D4A853]"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.05 + Math.random() * 0.15,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h2 className="sr text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            موازنتك مش مجرد
            <br />
            <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent">أرقام.</span>
          </h2>
          <p className="sr text-base text-[#4A5568] mt-6">
            حكاية كل جنيه — اكتشفها بنفسك.
          </p>
        </div>
      </Scene>
    </div>
  );
}
