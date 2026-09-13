import React, { useRef, useLayoutEffect } from 'react';
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
  { id: 'taxes', label: 'الضرائب', value: '3.5', icon: '📋', desc: 'الضريبة المباشرة وغير المباشرة', color: '#D4A853' },
  { id: 'customs', label: 'الرسوم الجمركية', value: '0.2', icon: '📦', desc: 'رسوم الوارد والصادر', color: '#7BAFD4' },
  { id: 'services', label: 'الرسوم والخدمات', value: '0.02', icon: '🏛️', desc: 'رسوم الحكومة المختلفة', color: '#A78BDA' },
  { id: 'investments', label: 'عوائد الاستثمارات', value: '0.5', icon: '📈', desc: 'عوائد الشركات والاستثمارات', color: '#E8B94A' },
];

const PERSONAS = [
  { id: 'student', icon: '🎓', label: 'الطالب', desc: 'تعليم مجاني + كتب دراسية', color: '#7BAFD4' },
  { id: 'family', icon: '👨‍👩‍👧‍👦', label: 'الأسرة', desc: 'دعم وحماية اجتماعية', color: '#A78BDA' },
  { id: 'business', icon: '🏢', label: 'صاحب المشروع', desc: 'استثمارات ودعم اقتصادي', color: '#E8B94A' },
  { id: 'health', icon: '🏥', label: 'الصحة', desc: 'مستشفيات وتأمين صحي', color: '#D4736A' },
  { id: 'environment', icon: '🌿', label: 'البيئة', desc: 'تنمية مستدامة', color: '#6ABFA7' },
];

/* ══════════════════════════════════════════════════════════ */
/*  SCENE WRAPPER                                            */
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
/*  MAIN — TEASER STORYTELLING INTRO                         */
/* ══════════════════════════════════════════════════════════ */

export default function Budget() {
  const { lang } = useLang();
  const containerRef = useRef(null);
  const coinRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray('.scene');
      const coin = coinRef.current;
      if (!coin || scenes.length === 0) return;

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

      /* S01: Hero — coin hidden, appears center */
      master
        .set(coin, { x: 0, y: 0, scale: 0.8, rotation: 0, opacity: 0 })
        .to(coin, { opacity: 1, scale: 1, duration: 0.08 });

      /* S01 → S02 */
      master.to(coin, {
        x: () => window.innerWidth * 0.28,
        y: () => -window.innerHeight * 0.25,
        scale: 0.45,
        rotation: 180,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* S02 → S03 */
      master.to(coin, {
        x: () => -window.innerWidth * 0.3,
        y: () => window.innerHeight * 0.15,
        scale: 0.5,
        rotation: 360,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* S03 → S04 */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 1.2,
        rotation: 540,
        duration: 1,
        ease: 'power3.inOut',
      });

      /* S04: Budget100 — coin big center */

      /* S04 → S05 */
      master.to(coin, {
        x: () => window.innerWidth * 0.2,
        y: () => -window.innerHeight * 0.2,
        scale: 0.5,
        rotation: 720,
        duration: 1,
        ease: 'power2.inOut',
      });

      /* S05 → S06 */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 2.5,
        rotation: 900,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.in',
      });

      /* ── Per-scene reveals ────────────────────────── */
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

      /* ── Revenue cards ────────────────────────────── */
      gsap.fromTo('.rev-card',
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: '[data-scene="revenue"]', start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      /* ── Persona cards ────────────────────────────── */
      gsap.fromTo('.persona',
        { scale: 0.7, opacity: 0 },
        {
          scale: 1, opacity: 1, stagger: 0.12, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '[data-scene="citizens"]', start: 'top 60%', toggleActions: 'play none none reverse' },
        }
      );

      /* ── Budget 100 bars ──────────────────────────── */
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
    <div ref={containerRef} className="bg-[#06080F]" dir="rtl">
      {/* ── Progress Bar ──────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/[0.03] z-[200]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#D4A853] to-[#E8C874] origin-left"
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
      {/* S01 — HERO                                       */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="hero" bg="bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#06080F]">
        {/* Ambient particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#D4A853]"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + Math.random() * 0.3,
              }}
            />
          ))}
        </div>

        {/* Central glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] rounded-full bg-[#D4A853]/[0.03] blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="sr text-[#D4A853]/50 text-[10px] tracking-[0.6em] uppercase mb-8 font-medium">
            موازنتي — موازنة Citizen 2027/2026
          </p>
          <h1 className="sr text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.15] mb-7">
            كل جنيه في إيديك
            <br />
            <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent">
              وراه حكاية.
            </span>
          </h1>
          <p className="sr text-base sm:text-lg text-[#8B95A8] max-w-lg mx-auto mb-14 leading-relaxed">
            اكتشف معانا كيف بتجمع الدولة إيراداتها، وفين بتروح، وإزاي بتأثر على حياتك — في دقائق.
          </p>
          <div className="sr flex flex-col items-center gap-3">
            <span className="text-[#4A5568] text-[9px] tracking-[0.5em] uppercase">Scroll</span>
            <div className="w-[18px] h-7 border border-[#2A3040] rounded-full flex justify-center">
              <div className="w-[3px] h-[6px] bg-[#D4A853] rounded-full mt-1.5 animate-bounce" />
            </div>
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* S02 — THE BIG NUMBER                             */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="revenue" bg="bg-gradient-to-b from-[#06080F] to-[#0A0E18]">
        <div className="section-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="sr inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4A853]/10 text-[#D4A853] rounded-full text-[10px] font-semibold mb-6 border border-[#D4A853]/20">
                <span className="w-1.5 h-1.5 bg-[#D4A853] rounded-full" />
                من أين تأتي الإيرادات؟
              </div>
              <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-7">
                الدولة بتجيب
                <br />
                <span className="text-[#D4A853]">فلوسها منين؟</span>
              </h2>
              <div className="sr">
                <span className="text-7xl sm:text-8xl font-black text-[#E8C874]">4.1</span>
                <span className="text-xl text-[#5A6578] mr-2">تريليون جنيه</span>
                <p className="text-[#3D4758] text-sm mt-1">إجمالي إيرادات الدولة</p>
              </div>
            </div>

            <div className="space-y-3">
              {REVENUE_SOURCES.map((src) => (
                <div
                  key={src.id}
                  className="rev-card flex items-center gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ backgroundColor: src.color + '12' }}
                  >
                    {src.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold text-white text-sm">{src.label}</h4>
                      <span className="text-[#D4A853] font-bold text-sm">{src.value} تريليون</span>
                    </div>
                    <p className="text-[11px] text-[#4A5568]">{src.desc}</p>
                  </div>
                  <div className="w-20 h-1 bg-white/[0.04] rounded-full overflow-hidden flex-shrink-0">
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
      {/* S03 — BUDGET 100                                 */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="budget100" bg="bg-gradient-to-b from-[#0A0E18] via-[#0D1120] to-[#0A0E18]">
        <div className="section-container w-full">
          <div className="text-center mb-10">
            <div className="sr inline-flex items-center gap-2 px-3 py-1.5 bg-[#A78BDA]/10 text-[#A78BDA] rounded-full text-[10px] font-semibold mb-5 border border-[#A78BDA]/20">
              <span className="w-1.5 h-1.5 bg-[#A78BDA] rounded-full" />
              لو معاك 100 جنيه
            </div>
            <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              الـ100 جنيه
              <br />
              <span className="text-[#E8C874]">بتروح فين؟</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
            {budget100.map((item) => {
              const pct = item.percentage;
              return (
                <div
                  key={item.id}
                  className="bg-white/[0.02] rounded-xl border border-white/[0.04] p-5 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <span className="text-lg font-black" style={{ color: item.color }}>
                      {pct}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden mb-2">
                    <div
                      className="bar-fill h-full rounded-full origin-left"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <p className="text-[10px] text-[#4A5568] leading-relaxed">{item.description}</p>
                  <p className="text-[9px] text-[#3D4758] mt-1">
                    {(item.amountM / 1000).toFixed(0)} مليار جنيه
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* S04 — CITIZENS                                   */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="citizens" bg="bg-gradient-to-b from-[#0A0E18] to-[#06080F]">
        <div className="section-container w-full">
          <div className="text-center mb-12">
            <div className="sr inline-flex items-center gap-2 px-3 py-1.5 bg-[#6ABFA7]/10 text-[#6ABFA7] rounded-full text-[10px] font-semibold mb-5 border border-[#6ABFA7]/20">
              <span className="w-1.5 h-1.5 bg-[#6ABFA7] rounded-full" />
              الموازنة بتوصلك إنت
            </div>
            <h2 className="sr text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              مش مجرد أرقام
              <br />
              <span className="text-[#A78BDA]">أرقام بتأثر في حياتك.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {PERSONAS.map((p) => (
              <div
                key={p.id}
                className="persona text-center bg-white/[0.02] rounded-xl border border-white/[0.04] p-5 hover:bg-white/[0.04] transition-all group cursor-default"
              >
                <span className="text-3xl mb-3 block group-hover:scale-110 transition-transform duration-300">{p.icon}</span>
                <h4 className="font-bold text-white text-sm mb-1">{p.label}</h4>
                <p className="text-[10px] text-[#4A5568] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* ════════════════════════════════════════════════ */}
      {/* S05 — CTA / ENTER THE SITE                       */}
      {/* ════════════════════════════════════════════════ */}
      <Scene id="cta" bg="bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#06080F]">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#D4A853]"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.05 + Math.random() * 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h2 className="sr text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            دلوقتي
            <br />
            <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent">
              شوف التفاصيل.
            </span>
          </h2>
          <p className="sr text-base text-[#5A6578] mb-4 max-w-md mx-auto leading-relaxed">
            الموازنة مش مجرد وثيقة مالية — دي خطة لحياة كل مصري.
          </p>
          <p className="sr text-sm text-[#3D4758] mb-12">
            اكتشف الأرقام، جرّب توزيع الموازنة، وصوّت لأولوياتك.
          </p>

          <div className="sr flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <a href="/" className="px-8 py-3.5 bg-gradient-to-r from-[#D4A853] to-[#E8B94A] text-[#06080F] text-sm font-bold rounded-full hover:shadow-lg hover:shadow-[#D4A853]/20 transition-all duration-300 hover:-translate-y-0.5">
              ادخل على موارننتي ←
            </a>
            <a href="/budget100" className="px-8 py-3.5 bg-white/[0.04] text-white text-sm font-bold rounded-full border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-300">
              استكشف الـ 100 جنيه
            </a>
            <a href="/voting" className="px-8 py-3.5 bg-white/[0.04] text-white text-sm font-bold rounded-full border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-300">
              صوّت لأولوياتك
            </a>
          </div>
        </div>
      </Scene>
    </div>
  );
}
