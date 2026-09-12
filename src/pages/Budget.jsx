import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Coin from '../components/ui/Coin';
import { budget100 } from '../data';
import { useLang } from '../context/LangContext';
import { getDataLabel } from '../data/translateData';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════ */
/*  CONSTANTS                                                */
/* ══════════════════════════════════════════════════════════ */

const REVENUE = 4.1;
const EXPENDITURE = 5.2;
const DEFICIT = 1.2;

const REVENUE_SOURCES = [
  { id: 'taxes', label: 'الضرائب', value: '3.5', icon: '📋', desc: 'الضريبة المباشرة وغير المباشرة' },
  { id: 'customs', label: 'الرسوم الجمركية', value: '0.2', icon: '📦', desc: 'رسوم الوارد والصادر' },
  { id: 'services', label: 'الرسوم والخدمات', value: '0.02', icon: '🏛️', desc: 'رسوم الحكومة المختلفة' },
  { id: 'investments', label: 'عوائد الاستثمارات', value: '0.5', icon: '📈', desc: 'عوائد الشركات والAsset' },
];

const PERSONAS = [
  { id: 'student', icon: '🎓', label: 'الطالب', desc: 'التعليم المجاني والكتب المدرسية', color: '#3B82F6' },
  { id: 'family', icon: '👨‍👩‍👧‍👦', label: 'الأسرة', desc: 'الدعم والحماية الاجتماعية', color: '#8B5CF6' },
  { id: 'business', icon: '🏢', label: 'صاحب المشروع', desc: 'الاستثمارات ودعم النشاط الاقتصادي', color: '#F59E0B' },
  { id: 'health', icon: '🏥', label: 'الصحة', desc: 'المستشفيات والتأمين الصحي', color: '#EF4444' },
  { id: 'environment', icon: '🌿', label: 'البيئة', desc: 'التنمية المستدامة والköy', color: '#10B981' },
];

const BUDGET_FLOW = [
  { id: 'revenue', label: 'الإيرادات', icon: '💰', color: '#059669' },
  { id: 'spending', label: 'الإنفاق', icon: '📤', color: '#3B82F6' },
  { id: 'deficit', label: 'العجز', icon: '📊', color: '#F59E0B' },
  { id: 'debt', label: 'الدين', icon: '📑', color: '#6B7280' },
  { id: 'investment', label: 'الاستثمار', icon: '🏗️', color: '#8B5CF6' },
  { id: 'social', label: 'الحماية الاجتماعية', icon: '🛡️', color: '#EC4899' },
];

/* ══════════════════════════════════════════════════════════ */
/*  HELPER: Animated Number                                  */
/* ══════════════════════════════════════════════════════════ */

function AnimatedNumber({ value, suffix = '', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: parseFloat(value),
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (ref.current) ref.current.textContent = obj.val.toFixed(1) + suffix;
      },
    });
  }, [value, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                           */
/* ══════════════════════════════════════════════════════════ */

export default function Budget() {
  const { lang, t } = useLang();
  const containerRef = useRef(null);
  const coinRef = useRef(null);
  const progressRef = useRef(null);

  /* ── Master Timeline ──────────────────────────────────── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.story-section');
      const coin = coinRef.current;
      if (!coin || sections.length === 0) return;

      /* Progress bar */
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

      /* ── SCENE 01: Hero ────────────────────────────── */
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: sections[0],
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: false,
        },
      });

      /* Coin starts center, then moves right */
      heroTl
        .fromTo(coin, { x: '0vw', y: '0vh', scale: 1, opacity: 0 }, { opacity: 1, duration: 0.1 })
        .to(coin, { x: '35vw', y: '-20vh', scale: 0.6, duration: 0.8 }, 0.3);

      /* ── SCENE 02: Revenue Sources ─────────────────── */
      const revTl = gsap.timeline({
        scrollTrigger: {
          trigger: sections[1],
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      revTl
        .fromTo(coin, { x: '35vw', y: '-20vh', scale: 0.6 }, { x: '-30vw', y: '10vh', scale: 0.8, duration: 1 })
        .to(coin, { x: '0vw', y: '-30vh', scale: 0.5, duration: 0.5 });

      /* ── SCENE 03: Revenue vs Expenditure ──────────── */
      const compTl = gsap.timeline({
        scrollTrigger: {
          trigger: sections[2],
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      compTl
        .fromTo(coin, { x: '0vw', y: '-30vh', scale: 0.5 }, { x: '25vw', y: '-15vh', scale: 0.9, duration: 0.8 })
        .to(coin, { x: '-25vw', y: '-15vh', scale: 0.9, duration: 0.8 })
        .to(coin, { x: '0vw', y: '0vh', scale: 1.1, duration: 0.6 });

      /* ── SCENE 04: Budget 100 ──────────────────────── */
      const b100Tl = gsap.timeline({
        scrollTrigger: {
          trigger: sections[3],
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      b100Tl
        .fromTo(coin, { x: '0vw', y: '0vh', scale: 1.1 }, { x: '0vw', y: '-35vh', scale: 0.7, duration: 0.6 })
        .to(coin, { x: '30vw', y: '20vh', scale: 0.5, duration: 0.8 })
        .to(coin, { x: '-30vw', y: '20vh', scale: 0.5, duration: 0.8 })
        .to(coin, { x: '0vw', y: '0vh', scale: 0.8, duration: 0.6 });

      /* ── SCENE 05: Citizen Impact ──────────────────── */
      const citTl = gsap.timeline({
        scrollTrigger: {
          trigger: sections[4],
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      citTl
        .fromTo(coin, { x: '0vw', y: '0vh', scale: 0.8 }, { x: '30vw', y: '-20vh', scale: 0.6, duration: 0.6 })
        .to(coin, { x: '-25vw', y: '10vh', scale: 0.6, duration: 0.6 })
        .to(coin, { x: '20vw', y: '15vh', scale: 0.6, duration: 0.6 })
        .to(coin, { x: '-20vw', y: '-10vh', scale: 0.6, duration: 0.6 })
        .to(coin, { x: '0vw', y: '0vh', scale: 0.7, duration: 0.5 });

      /* ── SCENE 06: Big Picture ─────────────────────── */
      const bigTl = gsap.timeline({
        scrollTrigger: {
          trigger: sections[5],
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      bigTl
        .fromTo(coin, { x: '0vw', y: '0vh', scale: 0.7 }, { x: '0vw', y: '-25vh', scale: 0.5, duration: 1 });

      /* ── SCENE 07: Finance Minister ────────────────── */
      const fmTl = gsap.timeline({
        scrollTrigger: {
          trigger: sections[6],
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      fmTl
        .fromTo(coin, { x: '0vw', y: '-25vh', scale: 0.5 }, { x: '0vw', y: '0vh', scale: 1, duration: 1 });

      /* ── SCENE 08: Closing ─────────────────────────── */
      const closeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sections[7],
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
        },
      });

      closeTl
        .fromTo(coin, { x: '0vw', y: '0vh', scale: 1 }, { x: '0vw', y: '-40vh', scale: 1.5, opacity: 0, duration: 1 });

      /* ── Per-section content reveals ───────────────── */
      sections.forEach((section) => {
        const els = section.querySelectorAll('.reveal');
        gsap.fromTo(els,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 20%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Revenue source items stagger ──────────────── */
      gsap.fromTo('.rev-item',
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sections[1],
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* ── Persona items stagger ─────────────────────── */
      gsap.fromTo('.persona-item',
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.18,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sections[4],
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      /* ── Budget flow nodes stagger ─────────────────── */
      gsap.fromTo('.flow-node',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sections[5],
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white" dir="rtl">
      {/* ── Fixed Progress Bar ─────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-[200]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* ── Fixed Traveling Coin ───────────────────────── */}
      <div
        ref={coinRef}
        className="fixed top-1/2 left-1/2 z-[100] pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <Coin size={100} spinning={true} />
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* SCENE 01 — HERO                                   */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="story-section relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Stars background */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="reveal">
            <p className="text-amber-400/80 text-sm tracking-[0.4em] uppercase mb-8">موازنتي — موازنة المواطن 2027/2026</p>
          </div>
          <h1 className="reveal text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            كل جنيه في إيديك
            <br />
            <span className="text-amber-400">وراه حكاية.</span>
          </h1>
          <p className="reveal text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            اكتشف معانا كيف بتجمع الدولة إيراداتها، وفين بتروح، وإزاي بتأثر على حياتك.
          </p>
          <div className="reveal flex flex-col items-center gap-2 mt-16">
            <span className="text-slate-400 text-xs tracking-[0.3em]">اسحب للأسفل</span>
            <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* SCENE 02 — REVENUE SOURCES                        */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="story-section relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Right — Text */}
            <div className="order-1 lg:order-2">
              <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-semibold mb-6 border border-emerald-500/20">
                <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                من أين تأتي الإيرادات؟
              </div>

              <h2 className="reveal text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
                الدولة بتجيب فلوسها
                <br />
                <span className="text-emerald-400">منين؟</span>
              </h2>

              <div className="reveal mt-8">
                <span className="text-7xl sm:text-8xl font-black text-amber-400">{REVENUE}</span>
                <span className="text-2xl text-slate-400 mr-2">تريليون جنيه</span>
                <p className="text-slate-500 mt-2">إجمالي إيرادات الدولة</p>
              </div>
            </div>

            {/* Left — Revenue Source Items */}
            <div className="order-2 lg:order-1 space-y-4">
              {REVENUE_SOURCES.map((src) => (
                <div
                  key={src.id}
                  className="rev-item flex items-center gap-4 p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="text-3xl w-14 h-14 flex items-center justify-center bg-white/5 rounded-xl flex-shrink-0">
                    {src.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <h4 className="font-bold text-white text-lg">{src.label}</h4>
                      <span className="text-amber-400 font-bold">{src.value} تريليون</span>
                    </div>
                    <p className="text-sm text-slate-400">{src.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* SCENE 03 — REVENUE vs EXPENDITURE                 */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="story-section relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="section-container relative z-10 text-center">
          <div className="reveal mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm font-semibold border border-amber-500/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full" />
              الإيرادات لا تكفي كل الاحتياجات
            </span>
          </div>

          <h2 className="reveal text-4xl sm:text-5xl md:text-6xl font-black text-white mb-16 leading-tight">
            فرق بين اللي عندنا
            <br />
            <span className="text-amber-400">واللي محتاجينه.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {/* Revenue */}
            <div className="reveal bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8">
              <span className="text-4xl mb-4 block">💰</span>
              <p className="text-6xl sm:text-7xl font-black text-emerald-400 mb-2">{REVENUE}</p>
              <p className="text-xl text-slate-300">تريليون جنيه</p>
              <p className="text-sm text-slate-500 mt-2">الإيرادات</p>
            </div>

            {/* VS */}
            <div className="reveal flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-3xl font-black text-slate-400">VS</span>
              </div>
              {/* Deficit reveal */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4">
                <p className="text-4xl font-black text-red-400">{DEFICIT}</p>
                <p className="text-slate-400 text-sm">تريليون جنيه عجز</p>
              </div>
            </div>

            {/* Expenditure */}
            <div className="reveal bg-blue-500/10 border border-blue-500/20 rounded-3xl p-8">
              <span className="text-4xl mb-4 block">📤</span>
              <p className="text-6xl sm:text-7xl font-black text-blue-400 mb-2">{EXPENDITURE}</p>
              <p className="text-xl text-slate-300">تريليون جنيه</p>
              <p className="text-sm text-slate-500 mt-2">المصروفات</p>
            </div>
          </div>

          <p className="reveal text-slate-400 mt-12 max-w-xl mx-auto text-lg">
            الدولة محتاجة تصرف أكتر مما بتجيب. الفرق ده بيتم تغطيته بالقروض والدين العام.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* SCENE 04 — BUDGET 100                             */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="story-section relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-semibold mb-6 border border-indigo-500/20">
              <span className="w-2 h-2 bg-indigo-400 rounded-full" />
              لو معاك 100 جنيه
            </div>
            <h2 className="reveal text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              الـ100 جنيه
              <br />
              <span className="text-amber-400">بتروح فين؟</span>
            </h2>
          </div>

          {/* Budget 100 items as visual distribution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {budget100.map((item, i) => {
              const pct = item.percentage;
              return (
                <div
                  key={item.id}
                  className="reveal relative group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
                >
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-white/10 rounded-full mb-4 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h4 className="font-bold text-white">{item.name}</h4>
                    <span className="text-2xl font-black" style={{ color: item.color }}>
                      {pct}%
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">{item.description}</p>
                  <p className="text-xs text-slate-500 mt-2">
                    {(item.amountM / 1000).toFixed(0)} مليار جنيه
                  </p>
                </div>
              );
            })}
          </div>

          <p className="reveal text-center text-slate-400 mt-12 max-w-xl mx-auto">
            كل جنيه من الـ100 جنيه بيتم تقسيمه على القطاعات المختلفة. أكبر حصة لفوائد الدين.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* SCENE 05 — CITIZEN IMPACT                         */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="story-section relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-6 border border-purple-500/20">
              <span className="w-2 h-2 bg-purple-400 rounded-full" />
              الموازنة بتوصلك إنت
            </div>
            <h2 className="reveal text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              مش مجرد أرقام
              <br />
              <span className="text-purple-400">أرقام بتأثر في حياتك.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {PERSONAS.map((p) => (
              <div
                key={p.id}
                className="persona-item text-center bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group"
              >
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform">{p.icon}</span>
                <h4 className="font-bold text-white text-lg mb-2">{p.label}</h4>
                <p className="text-sm text-slate-400">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* SCENE 06 — BIG PICTURE (Budget Flow)              */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="story-section relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full text-sm font-semibold mb-6 border border-blue-500/20">
              <span className="w-2 h-2 bg-blue-400 rounded-full" />
              الصورة الكبيرة
            </div>
            <h2 className="reveal text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              إزاي الموازنة
              <br />
              <span className="text-blue-400">بتشتغل؟</span>
            </h2>
          </div>

          {/* Flow diagram */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/30 via-amber-500/30 to-pink-500/30 -translate-y-1/2" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {BUDGET_FLOW.map((node, i) => (
                <div key={node.id} className="flow-node relative">
                  <div
                    className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 text-center hover:bg-white/10 transition-all"
                    style={{ borderColor: node.color + '30' }}
                  >
                    <span className="text-4xl mb-3 block">{node.icon}</span>
                    <h4 className="font-bold text-white text-sm">{node.label}</h4>
                  </div>
                  {/* Arrow */}
                  {i < BUDGET_FLOW.length - 1 && (
                    <div className="hidden lg:flex absolute -left-2 top-1/2 -translate-y-1/2 text-slate-600">
                      ←
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="reveal text-center text-slate-400 mt-12 max-w-xl mx-auto">
              الإيرادات بتتحول لإنفاق على الخدمات والمشاريع. العجز بيتم تغطيته بالدين، اللي بيؤدي للاستثمارات والحماية الاجتماعية.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* SCENE 07 — FINANCE MINISTER                       */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="story-section relative min-h-screen flex items-center py-24 overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900">
        <div className="section-container relative z-10">
          <div className="text-center mb-12">
            <div className="reveal inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-full text-sm font-semibold mb-6 border border-amber-500/20">
              <span className="w-2 h-2 bg-amber-400 rounded-full" />
              الآن دورك
            </div>
            <h2 className="reveal text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              لو إنت وزير المالية
              <br />
                <span className="text-amber-400">هتوجه الجنيه لفين؟</span>
            </h2>
            <p className="reveal text-slate-400 mt-4 max-w-xl mx-auto">
              حرّك السلايدرز وتوزع 100 جنيه على القطاعات المختلفة.
            </p>
          </div>

          {/* Inline Finance Minister mini-simulation */}
          <FinanceMinisterInline />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════ */}
      {/* SCENE 08 — CLOSING                                */}
      {/* ══════════════════════════════════════════════════ */}
      <section className="story-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="reveal text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6">
            موازنتك مش مجرد
            <br />
            <span className="text-amber-400">أرقام.</span>
          </h2>
          <p className="reveal text-xl sm:text-2xl text-slate-300 mb-4">
            دي قرارات بتصنع مستقبل أفضل.
          </p>
          <p className="reveal text-slate-500 mb-12">
            الموازنة مش مجرد وثيقة مالية — دي خطة لحياة كل مصري.
          </p>

          <div className="reveal flex flex-wrap justify-center gap-4">
            <a
              href="/budget100"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              استكشف الأرقام بنفسك
            </a>
            <a
              href="/finance-minister"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              كون وزير المالية
            </a>
            <a
              href="/voting"
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              صوّت لأولوياتك
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
/*  INLINE FINANCE MINISTER MINI-SIMULATION                  */
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
    <div className="reveal max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 sm:p-8">
      {/* Remaining indicator */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-lg font-bold ${remaining === 0 ? 'bg-emerald-500/20 text-emerald-400' : remaining < 0 ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
          {remaining === 0 ? '✅ موزع بالكامل!' : remaining < 0 ? `❌ متجاوز بـ ${Math.abs(remaining)}` : `متبقي ${remaining} جنيه`}
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{cat.icon}</span>
                <span className="text-white font-medium text-sm">{cat.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold text-lg">{allocations[cat.id]}%</span>
                <span className="text-slate-500 text-xs">({cat.actual}% فعلي)</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={allocations[cat.id]}
              onChange={(e) => handleAllocation(cat.id, e.target.value)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${cat.color} ${allocations[cat.id]}%, rgba(255,255,255,0.1) ${allocations[cat.id]}%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Score */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full">
          <span className="text-slate-400">دقة التوزيع:</span>
          <span className={`text-2xl font-black ${score >= 80 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
            {score}%
          </span>
        </div>
        <p className="text-slate-500 text-sm mt-3">
          قارن توزيعك بالedata الفعلية لل(state)_budget
        </p>
      </div>
    </div>
  );
}


