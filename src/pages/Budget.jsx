import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Coin from '../components/ui/Coin';
import { budget100 } from '../data';
import { useLang } from '../context/LangContext';
import { getDataLabel } from '../data/translateData';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════ */
/*  DATA                                                      */
/* ══════════════════════════════════════════════════════════ */

const REVENUE_SOURCES = [
  { id: 'taxes', label: 'الضرائب', value: '3.5', icon: '📋', desc: 'الضريبة المباشرة وغير المباشرة', color: '#059669' },
  { id: 'customs', label: 'الرسوم الجمركية', value: '0.2', icon: '📦', desc: 'رسوم الوارد والصادر', color: '#3B82F6' },
  { id: 'services', label: 'الرسوم والخدمات', value: '0.02', icon: '🏛️', desc: 'رسوم الحكومة المختلفة', color: '#8B5CF6' },
  { id: 'investments', label: 'عوائد الاستثمارات', value: '0.5', icon: '📈', desc: 'عوائد الشركات والاستثمارات', color: '#F59E0B' },
];

const PERSONAS = [
  { id: 'student', icon: '🎓', label: 'الطالب', desc: 'تعليم مجاني + كتب دراسية', color: '#3B82F6' },
  { id: 'family', icon: '👨‍👩‍👧‍👦', label: 'الأسرة', desc: 'دعم وحماية اجتماعية', color: '#8B5CF6' },
  { id: 'business', icon: '🏢', owner: 'صاحب المشروع', desc: 'استثمارات ودعم اقتصادي', color: '#F59E0B' },
  { id: 'health', icon: '🏥', label: 'الصحة', desc: 'مستشفيات وتأمين صحي', color: '#EF4444' },
  { id: 'environment', icon: '🌿', label: 'البيئة', desc: 'تنمية مستدامة', color: '#10B981' },
];

const BUDGET_FLOW = [
  { id: 'revenue', label: 'الإيرادات', icon: '💰', color: '#059669', value: '4.1 تريليون' },
  { id: 'spending', label: 'الإنفاق', icon: '📤', color: '#3B82F6', value: '5.2 تريليون' },
  { id: 'deficit', label: 'العجز', icon: '📊', color: '#F59E0B', value: '1.2 تريليون' },
  { id: 'debt', label: 'الدين', icon: '📑', color: '#6B7280', value: '78.1% من الناتج' },
  { id: 'investment', label: 'الاستثمار', icon: '🏗️', color: '#8B5CF6', value: '637 مليار' },
  { id: 'social', label: 'الحماية', icon: '🛡️', color: '#EC4899', value: '836 مليار' },
];

/* ══════════════════════════════════════════════════════════ */
/*  SCENE WRAPPER (pinned)                                    */
/* ══════════════════════════════════════════════════════════ */

function Scene({ id, bg = '', children, className = '' }) {
  return (
    <div
      data-scene={id}
      className={`scene relative h-screen w-full flex items-center justify-center overflow-hidden ${bg} ${className}`}
    >
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                           */
/* ══════════════════════════════════════════════════════════ */

export default function Budget() {
  const { lang } = useLang();
  const containerRef = useRef(null);
  const coinRef = useRef(null);
  const progressRef = useRef(null);
  const scenesRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray('.scene');
      const coin = coinRef.current;
      if (!coin || scenes.length === 0) return;

      /* ── Global progress bar ──────────────────────── */
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

      /* ── MASTER TIMELINE — coin travels through all scenes ── */
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      /* ── SCENE 01: Hero — coin appears center ─────── */
      master
        .set(coin, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 0 })
        .to(coin, { opacity: 1, duration: 0.05 });

      /* Scene 01 → 02 transition */
      master.to(coin, {
        x: () => window.innerWidth * 0.3,
        y: () => -window.innerHeight * 0.3,
        scale: 0.5,
        rotation: 180,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* ── SCENE 02: Revenue Sources ────────────────── */
      master.to(coin, {
        x: () => -window.innerWidth * 0.35,
        y: () => window.innerHeight * 0.1,
        scale: 0.6,
        rotation: 360,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* Scene 02 → 03 */
      master.to(coin, {
        x: 0,
        y: () => -window.innerHeight * 0.2,
        scale: 0.8,
        rotation: 540,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* ── SCENE 03: Revenue vs Expenditure ─────────── */
      master.to(coin, {
        x: () => window.innerWidth * 0.25,
        y: () => -window.innerHeight * 0.15,
        scale: 1,
        rotation: 720,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* Scene 03 → 04 */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 1.3,
        rotation: 900,
        duration: 0.8,
        ease: 'power3.inOut',
      });

      /* ── SCENE 04: Budget 100 — coin big center ───── */
      master.to(coin, {
        x: () => window.innerWidth * 0.3,
        y: () => window.innerHeight * 0.25,
        scale: 0.5,
        rotation: 1080,
        duration: 1.2,
        ease: 'power2.inOut',
      });

      /* Scene 04 → 05 */
      master.to(coin, {
        x: () => -window.innerWidth * 0.2,
        y: () => -window.innerHeight * 0.15,
        scale: 0.6,
        rotation: 1260,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* ── SCENE 05: Citizens — coin visits personas ── */
      master.to(coin, {
        x: () => window.innerWidth * 0.15,
        y: () => window.innerHeight * 0.1,
        scale: 0.55,
        rotation: 1440,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* Scene 05 → 06 */
      master.to(coin, {
        x: 0,
        y: () => -window.innerHeight * 0.3,
        scale: 0.4,
        rotation: 1620,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* ── SCENE 06: Big Picture — coin at top ──────── */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 1800,
        duration: 1,
        ease: 'power3.inOut',
      });

      /* ── SCENE 07: Finance Minister ───────────────── */
      master.to(coin, {
        x: () => -window.innerWidth * 0.3,
        y: () => window.innerHeight * 0.2,
        scale: 0.6,
        rotation: 1980,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* Scene 07 → 08 */
      master.to(coin, {
        x: 0,
        y: () => -window.innerHeight * 0.4,
        scale: 2,
        rotation: 2160,
        opacity: 0,
        duration: 1,
        ease: 'power3.in',
      });

      /* ── Per-scene content reveals ────────────────── */
      scenes.forEach((scene) => {
        const reveals = scene.querySelectorAll('.sr');
        if (reveals.length === 0) return;
        gsap.fromTo(reveals,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 80%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Revenue items stagger ────────────────────── */
      gsap.fromTo('.rev-card',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: '[data-scene="revenue"]', start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      /* ── Persona cards stagger ────────────────────── */
      gsap.fromTo('.persona',
        { scale: 0.7, opacity: 0 },
        {
          scale: 1, opacity: 1, stagger: 0.12, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '[data-scene="citizens"]', start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      /* ── Flow nodes stagger ───────────────────────── */
      gsap.fromTo('.flow-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '[data-scene="flow"]', start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      /* ── Budget 100 bars animate width ────────────── */
      gsap.fromTo('.bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1, stagger: 0.08, ease: 'power2.out',
          scrollTrigger: { trigger: '[data-scene="budget100"]', start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-950" dir="rtl">
      {/* ── Progress Bar ──────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-[200]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-amber-500 to-amber-300 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* ── Traveling Coin (fixed) ────────────────────── */}
      <div
        ref={coinRef}
        className="fixed top-1/2 left-1/2 z-[100] pointer-events-none will-change-transform"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <Coin size={90} spinning={true} />
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* SCENE 01 — HERO                                 */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="hero" bg="bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]">
        {/* Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.6,
              }}
            />
          ))}
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="sr text-amber-400/60 text-xs tracking-[0.5em] uppercase mb-6 font-medium">
            موازنتي — موازنة Citizen 2027/2026
          </p>
          <h1 className="sr text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6">
            كل جنيه في إيديك
            <br />
            <span className="bg-gradient-to-l from-amber-400 to-orange-400 bg-clip-text text-transparent">
              وراه حكاية.
            </span>
          </h1>
          <p className="sr text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
            اكتشف معانا كيف بتجمع الدولة إيراداتها، وفين بتروح، وإزاي بتأثر على حياتك.
          </p>
          <div className="sr flex flex-col items-center gap-3">
            <span className="text-slate-500 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <div className="w-5 h-8 border border-slate-600 rounded-full flex justify-center">
              <div className="w-1 h-2 bg-amber-400 rounded-full mt-1.5 animate-bounce" />
            </div>
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* SCENE 02 — REVENUE SOURCES                      */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="revenue" bg="bg-gradient-to-b from-[#0a0e1a] to-[#0d1220]">
        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="sr inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold mb-5 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                من أين تأتي الإيرادات؟
              </div>
              <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                الدولة بتجيب
                <br />
                <span className="text-emerald-400">فلوسها منين؟</span>
              </h2>
              <div className="sr">
                <span className="text-7xl sm:text-8xl font-black text-amber-400">4.1</span>
                <span className="text-xl text-slate-500 mr-2">تريليون جنيه</span>
                <p className="text-slate-600 text-sm mt-1">إجمالي إيرادات الدولة</p>
              </div>
            </div>

            {/* Revenue cards */}
            <div className="space-y-3">
              {REVENUE_SOURCES.map((src) => (
                <div
                  key={src.id}
                  className="rev-card flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: src.color + '15' }}
                  >
                    {src.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold text-white text-sm">{src.label}</h4>
                      <span className="text-amber-400 font-bold text-sm">{src.value} تريليون</span>
                    </div>
                    <p className="text-xs text-slate-500">{src.desc}</p>
                  </div>
                  {/* Mini bar */}
                  <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden flex-shrink-0">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(parseFloat(src.value) / 4.1) * 100}%`, backgroundColor: src.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* SCENE 03 — REVENUE vs EXPENDITURE               */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="comparison" bg="bg-gradient-to-b from-[#0d1220] to-[#0a0e1a]">
        <div className="section-container w-full text-center">
          <div className="sr mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-full text-xs font-semibold border border-amber-500/20">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              الإيرادات لا تكفي
            </span>
          </div>
          <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white mb-14 leading-tight">
            فرق بين اللي عندنا
            <br />
            <span className="text-amber-400">واللي محتاجينه.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
            {/* Revenue */}
            <div className="sr bg-emerald-500/[0.07] border border-emerald-500/20 rounded-2xl p-8">
              <span className="text-3xl mb-3 block">💰</span>
              <p className="text-6xl sm:text-7xl font-black text-emerald-400 mb-1">4.1</p>
              <p className="text-lg text-slate-400">تريليون جنيه</p>
              <p className="text-xs text-slate-600 mt-2">الإيرادات</p>
            </div>

            {/* Arrow + Deficit */}
            <div className="sr flex flex-col items-center gap-4">
              <svg width="60" height="2" className="text-slate-700">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
              <div className="bg-red-500/[0.08] border border-red-500/20 rounded-xl px-5 py-3">
                <p className="text-3xl font-black text-red-400">1.2</p>
                <p className="text-slate-500 text-[10px]">تريليون عجز</p>
              </div>
              <svg width="60" height="2" className="text-slate-700">
                <line x1="0" y1="1" x2="60" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
            </div>

            {/* Expenditure */}
            <div className="sr bg-blue-500/[0.07] border border-blue-500/20 rounded-2xl p-8">
              <span className="text-3xl mb-3 block">📤</span>
              <p className="text-6xl sm:text-7xl font-black text-blue-400 mb-1">5.2</p>
              <p className="text-lg text-slate-400">تريليون جنيه</p>
              <p className="text-xs text-slate-600 mt-2">المصروفات</p>
            </div>
          </div>

          <p className="sr text-slate-500 mt-10 max-w-lg mx-auto text-sm leading-relaxed">
            الدولة محتاجة تصرف <span className="text-white font-bold">5.2 تريليون</span> بس بتجيب <span className="text-white font-bold">4.1 تريليون</span>.
            الفرق بيتم تغطيته بالقروض والدين العام.
          </p>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* SCENE 04 — BUDGET 100                           */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="budget100" bg="bg-gradient-to-b from-[#0a0e1a] via-[#0f1025] to-[#0a0e1a]">
        <div className="section-container w-full">
          <div className="text-center mb-10">
            <div className="sr inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-semibold mb-5 border border-indigo-500/20">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
              لو معاك 100 جنيه
            </div>
            <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              الـ100 جنيه
              <br />
              <span className="text-amber-400">بتروح فين؟</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {budget100.map((item) => {
              const pct = item.percentage;
              return (
                <div
                  key={item.id}
                  className="bg-white/[0.03] rounded-xl border border-white/[0.06] p-5 hover:bg-white/[0.06] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <span className="text-xl font-black" style={{ color: item.color }}>
                      {pct}%
                    </span>
                  </div>
                  {/* Bar */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                    <div
                      className="bar-fill h-full rounded-full origin-left"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">{item.description}</p>
                  <p className="text-[10px] text-slate-600 mt-1">
                    {(item.amountM / 1000).toFixed(0)} مليار جنيه
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* SCENE 05 — CITIZEN IMPACT                       */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="citizens" bg="bg-gradient-to-b from-[#0a0e1a] to-[#0d1220]">
        <div className="section-container w-full">
          <div className="text-center mb-12">
            <div className="sr inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-xs font-semibold mb-5 border border-purple-500/20">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              الموازنة بتوصلك إنت
            </div>
            <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              مش مجرد أرقام
              <br />
              <span className="text-purple-400">أرقام بتأثر في حياتك.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {PERSONAS.map((p) => (
              <div
                key={p.id}
                className="persona text-center bg-white/[0.03] rounded-xl border border-white/[0.06] p-5 hover:bg-white/[0.06] transition-all group cursor-default"
              >
                <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform duration-300">{p.icon}</span>
                <h4 className="font-bold text-white text-sm mb-1">{p.label || p.owner}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* SCENE 06 — BIG PICTURE                          */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="flow" bg="bg-gradient-to-b from-[#0d1220] to-[#0a0e1a]">
        <div className="section-container w-full">
          <div className="text-center mb-12">
            <div className="sr inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold mb-5 border border-blue-500/20">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
              الصورة الكبيرة
            </div>
            <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              إزاي الموازنة
              <br />
              <span className="text-blue-400">بتشتغل؟</span>
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-[8%] right-[8%] h-px bg-gradient-to-r from-emerald-500/30 via-amber-500/20 to-pink-500/30 -translate-y-1/2" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {BUDGET_FLOW.map((node, i) => (
                <div key={node.id} className="flow-item relative">
                  <div
                    className="bg-white/[0.03] rounded-xl border p-5 text-center hover:bg-white/[0.06] transition-all"
                    style={{ borderColor: node.color + '25' }}
                  >
                    <span className="text-3xl mb-2 block">{node.icon}</span>
                    <h4 className="font-bold text-white text-xs mb-1">{node.label}</h4>
                    <p className="text-[10px] font-bold" style={{ color: node.color }}>{node.value}</p>
                  </div>
                  {i < BUDGET_FLOW.length - 1 && (
                    <div className="hidden lg:flex absolute -left-1.5 top-1/2 -translate-y-1/2 text-slate-700 text-xs">←</div>
                  )}
                </div>
              ))}
            </div>

            <p className="sr text-center text-slate-500 mt-10 max-w-lg mx-auto text-sm leading-relaxed">
              الإيرادات بتتحول لإنفاق على الخدمات والمشاريع. العجز بيتم تغطيته بالدين، اللي بيدعم الاستثمار والحماية الاجتماعية.
            </p>
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* SCENE 07 — FINANCE MINISTER                     */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="minister" bg="bg-gradient-to-b from-[#0a0e1a] via-[#0f1025] to-[#0a0e1a]">
        <div className="section-container w-full">
          <div className="text-center mb-8">
            <div className="sr inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 text-amber-400 rounded-full text-xs font-semibold mb-5 border border-amber-500/20">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
              الآن دورك
            </div>
            <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              لو إنت وزير المالية
              <br />
              <span className="text-amber-400">هتوجه الجنيه لفين؟</span>
            </h2>
          </div>
          <FinanceMinisterInline />
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* SCENE 08 — CLOSING                              */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="closing" bg="bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a]">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-amber-400"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="sr text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            موازنتك مش مجرد
            <br />
            <span className="bg-gradient-to-l from-amber-400 to-orange-400 bg-clip-text text-transparent">أرقام.</span>
          </h2>
          <p className="sr text-xl text-slate-400 mb-3">
            دي قرارات بتصنع مستقبل أفضل.
          </p>
          <p className="sr text-sm text-slate-600 mb-12 max-w-md mx-auto">
            الموازنة مش مجرد وثيقة مالية — دي خطة لحياة كل مصري.
          </p>

          <div className="sr flex flex-wrap justify-center gap-3">
            <a href="/budget100" className="px-7 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5">
              استكشف الأرقام بنفسك
            </a>
            <a href="/finance-minister" className="px-7 py-3 bg-white/[0.05] text-white text-sm font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
              كون وزير المالية
            </a>
            <a href="/voting" className="px-7 py-3 bg-white/[0.05] text-white text-sm font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
              صوّت لأولوياتك
            </a>
          </div>
        </div>
      </Scene>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/*  INLINE FINANCE MINISTER                                   */
/* ══════════════════════════════════════════════════════════ */

function FinanceMinisterInline() {
  const { lang } = useLang();
  const categories = [
    { id: 'education', name: getDataLabel(lang, 'fmCategories', 'education'), icon: '🎓', color: '#3B82F6', actual: 5.6 },
    { id: 'health', name: getDataLabel(lang, 'fmCategories', 'health'), icon: '🏥', color: '#EF4444', actual: 5.6 },
    { id: 'social', name: getDataLabel(lang, 'fmCategories', 'social'), icon: '🛡️', color: '#8B5CF6', actual: 10.7 },
    { id: 'infrastructure', name: getDataLabel(lang, 'fmCategories', 'infrastructure'), icon: '🏗️', color: '#F59E0B', actual: 10.6 },
    { id: 'defense', name: getDataLabel(lang, 'fmCategories', 'defense'), icon: '⚔️', color: '#6B7280', actual: 8.0 },
    { id: 'other', name: getDataLabel(lang, 'fmCategories', 'other'), icon: '📋', color: '#10B981', actual: 10.5 },
  ];

  const [allocations, setAllocations] = useState({
    education: 25, health: 25, social: 20, infrastructure: 15, defense: 10, other: 5,
  });

  const total = Object.values(allocations).reduce((a, b) => a + b, 0);
  const remaining = 100 - total;

  const handleAllocation = (id, value) => {
    const newVal = parseInt(value) || 0;
    const diff = newVal - allocations[id];
    if (remaining - diff < 0) return;
    setAllocations((prev) => ({ ...prev, [id]: newVal }));
  };

  const score = Math.max(0, 100 - categories.reduce((sum, c) => sum + Math.abs((allocations[c.id] || 0) - c.actual), 0));

  return (
    <div className="sr max-w-4xl mx-auto bg-white/[0.03] rounded-2xl border border-white/[0.06] p-5 sm:p-7">
      {/* Remaining */}
      <div className="text-center mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${remaining === 0 ? 'bg-emerald-500/15 text-emerald-400' : remaining < 0 ? 'bg-red-500/15 text-red-400' : 'bg-amber-500/15 text-amber-400'}`}>
          {remaining === 0 ? '✅ موزع بالكامل' : remaining < 0 ? `❌ متجاوز بـ ${Math.abs(remaining)}` : `متبقي ${remaining} جنيه`}
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white/[0.03] rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <span className="text-white font-medium text-xs">{cat.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold">{allocations[cat.id]}%</span>
                <span className="text-slate-600 text-[10px]">({cat.actual}%)</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={allocations[cat.id]}
              onChange={(e) => handleAllocation(cat.id, e.target.value)}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${cat.color} ${allocations[cat.id]}%, rgba(255,255,255,0.05) ${allocations[cat.id]}%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Score */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/[0.03] rounded-full">
          <span className="text-slate-500 text-xs">دقة التوزيع:</span>
          <span className={`text-xl font-black ${score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
            {score}%
          </span>
        </div>
      </div>
    </div>
  );
}
