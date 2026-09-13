import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Coin from '../components/ui/Coin';
import { useLang } from '../context/LangContext';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════ */
/*  TRANSLATIONS                                              */
/* ══════════════════════════════════════════════════════════ */

const T = {
  ar: {
    tag: 'موازنتي — موازنة Citizen 2027/2026',
    h1a: 'في حاجة',
    h1b: 'محدّش بيحكيهالك.',
    h1c: 'كل جنيه في إيديك',
    h1d: 'وراه حكاية.',
    heroSub: 'حكاية تبدأ منك — وتوصل لكل مصري.',
    fromEgypt: 'من مصر — لكل مصري',
    s02Label: 'تخيل معايا',
    s02h: 'فيه تريليونات من الجنيهات',
    s02h2: 'بتعدي من إيدك كل يوم.',
    s02p1: 'بتتحصّل من مصريين زيك.',
    s02p2: 'بتتنفّق على حياة كل مصري.',
    s02p3: 'بس هل فكرت يوم —',
    s02p4: 'فين بالظبط؟',
    s02bLabel: 'الجنيه مش واقف',
    s02bh: 'الجنيه بيسافر.',
    s02bp1: 'بيبدأ من مكتب ضريبة.',
    s02bp2: 'بيروح مدرسة. مستشفى. شارع. مشروع.',
    s02bp3: 'كل يوم — جنيه جنيه — بيحوّل حياة.',
    s02ch: 'بس فيه مشكلة.',
    s02cp1: 'اللي الدولة بتجيبه',
    s02cp2: 'مش دايمًا بيكفي.',
    s02cp3: 'وفي فرق كبير بين اللي عندنا — واللي مصر محتاجاه.',
    s03Label: 'عشان نفهم — هنقسمها',
    s03h1: 'لو قسمنا كل جنيه',
    s03h2: 'في الموازنة',
    s03h3: 'على 100...',
    s03num: '100',
    s03p: 'جنيه — بس فين بتروح؟',
    s03bh: 'كل جنيه',
    s03bh2: 'بيروح لحد.',
    s03bp1: 'جنيه يبني مدرسة.',
    s03bp2: 'جنيه يشفي مريض.',
    s03bp3: 'جنيه يفتح شارع. جنيه يعلّم طفل.',
    s03ch: 'بس السؤال الأهم —',
    s03ch2: 'كام جنيه بيوصل للخدمات؟',
    s03cp1: 'مش كل جنيه بيروح لمكان واحد.',
    s03cp2: 'فيه جزء كبير بيروح لحاجة تانية خالص.',
    s04h1: 'وفي النهاية —',
    s04h2: 'كل جنيه فيه بني آدم.',
    s04p: 'طالب في مدرسة. أسرة في شارع. صاحب مشروع صغير. مستشفى محتاج معدات. حديقة لسه ما اتبنتش.',
    s04foot: 'كل واحد فيهم ليه نصيب من الـ 100 جنيه دول.',
    s04bh: 'جنيه واحد',
    s04bh2: 'يغيّر يوم طفل.',
    s04bp: 'ومليارات جنيه —',
    s04bp2: 'تبني بلد.',
    s04ch: 'دي مش مجرد أرقام.',
    s04ch2: 'دي موازنة بلدك.',
    s04cp1: 'كل قرار فيها ليه تأثير على حياتك.',
    s04cp2: 'وأنت كمان تقدر تأثر فيها.',
    s05h1: 'في الآخر —',
    s05h2: 'الموازنة مش بعيدة عنك.',
    s05p1: 'كل جنيه بيتجمع أو بيتصرف —',
    s05p2: 'جزء من دورة بتأثر على حياتك.',
    s05bold: 'دي موازنة بلدك.',
    s05sub: 'اسأل عنها. وشارك في مستقبلها.',
    s05cta: 'موازنتك بين إيديك.',
    s05btn: 'ادخل على موارننتي',
  },
  en: {
    tag: 'MAWAZNETY — Citizen Budget 2027/2026',
    h1a: "There's something",
    h1b: "nobody's telling you.",
    h1c: 'Every pound in your hand',
    h1d: 'has a story behind it.',
    heroSub: 'A story that starts with you — and reaches every Egyptian.',
    fromEgypt: 'From Egypt — for every Egyptian',
    s02Label: 'Imagine with me',
    s02h: 'There are trillions',
    s02h2: 'of pounds passing through your hands every day.',
    s02p1: 'Collected from Egyptians like you.',
    s02p2: 'Spent on the life of every Egyptian.',
    s02p3: 'But have you ever thought —',
    s02p4: 'where exactly?',
    s02bLabel: "The pound isn't standing still",
    s02bh: 'The pound travels.',
    s02bp1: 'It starts at a tax office.',
    s02bp2: 'Goes to a school. A hospital. A road. A project.',
    s02bp3: 'Every day — pound by pound — it changes lives.',
    s02ch: "But there's a problem.",
    s02cp1: 'What the state collects',
    s02cp2: "isn't always enough.",
    s02cp3: "And there's a big gap between what we have — and what Egypt needs.",
    s03Label: "Let's break it down",
    s03h1: 'If we divide every pound',
    s03h2: 'in the budget',
    s03h3: 'into 100...',
    s03num: '100',
    s03p: 'pounds — but where do they go?',
    s03bh: 'Every pound',
    s03bh2: 'goes to someone.',
    s03bp1: 'A pound builds a school.',
    s03bp2: 'A pound heals a patient.',
    s03bp3: 'A pound opens a road. A pound educates a child.',
    s03ch: 'But the real question is —',
    s03ch2: 'how many pounds reach public services?',
    s03cp1: 'Not every pound goes to the same place.',
    s03cp2: 'A big portion goes somewhere else entirely.',
    s04h1: 'And in the end —',
    s04h2: 'every pound has a person behind it.',
    s04p: 'A student in a school. A family on a street. A small business owner. A hospital needing equipment. A park yet to be built.',
    s04foot: 'Each one of them has a share of those 100 pounds.',
    s04bh: 'One pound',
    s04bh2: "changes a child's day.",
    s04bp: 'And billions of pounds —',
    s04bp2: 'build a nation.',
    s04ch: "These aren't just numbers.",
    s04ch2: "This is your country's budget.",
    s04cp1: 'Every decision in it affects your life.',
    s04cp2: 'And you can affect it too.',
    s05h1: 'In the end —',
    s05h2: "the budget isn't far from you.",
    s05p1: 'Every pound collected or spent —',
    s05p2: 'is part of a cycle that affects your life.',
    s05bold: "This is your country's budget.",
    s05sub: 'Ask about it. And be part of its future.',
    s05cta: 'Your budget is in your hands.',
    s05btn: 'Enter Mawaznety',
  },
};

/* ══════════════════════════════════════════════════════════ */
/*  TEASER STORYTELLING — CINEMATIC INTRO                    */
/* ══════════════════════════════════════════════════════════ */

export default function Budget() {
  const { lang, toggleLang } = useLang();
  const t = T[lang] || T.ar;
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
        .set(coin, { x: 0, y: 0, scale: 0.6, rotation: 0, opacity: 0 })
        .to(coin, { opacity: 1, scale: 0.8, duration: 0.04 });

      /* S01 → S02: coin slides top-right */
      master.to(coin, {
        x: () => window.innerWidth * 0.3,
        y: () => -window.innerHeight * 0.3,
        scale: 0.3,
        rotation: 120,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* S02 → S02B: coin drifts left */
      master.to(coin, {
        x: () => -window.innerWidth * 0.25,
        y: () => window.innerHeight * 0.1,
        scale: 0.25,
        rotation: 240,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* S02B → S02C: coin sweeps right */
      master.to(coin, {
        x: () => window.innerWidth * 0.2,
        y: () => -window.innerHeight * 0.15,
        scale: 0.28,
        rotation: 360,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* S02C → S03: coin center for 100 */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 480,
        duration: 1,
        ease: 'power3.inOut',
      });

      /* S03 → S03B: coin to corner */
      master.to(coin, {
        x: () => -window.innerWidth * 0.28,
        y: () => -window.innerHeight * 0.2,
        scale: 0.3,
        rotation: 600,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* S03B → S03C: coin drifts */
      master.to(coin, {
        x: () => window.innerWidth * 0.22,
        y: () => window.innerHeight * 0.15,
        scale: 0.25,
        rotation: 720,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* S03C → S04: coin back center for humans */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 0.8,
        rotation: 840,
        duration: 1,
        ease: 'power3.inOut',
      });

      /* S04 → S04B: coin to side */
      master.to(coin, {
        x: () => window.innerWidth * 0.25,
        y: () => -window.innerHeight * 0.25,
        scale: 0.3,
        rotation: 960,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* S04B → S04C: coin drifts */
      master.to(coin, {
        x: () => -window.innerWidth * 0.2,
        y: () => window.innerHeight * 0.1,
        scale: 0.25,
        rotation: 1080,
        duration: 0.8,
        ease: 'power2.inOut',
      });

      /* S04C → S05: coin grows huge + dissolves */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 4,
        rotation: 1440,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.in',
      });

      /* ── Per-scene reveals (staggered text) ────────── */
      gsap.utils.toArray('.scene').forEach((scene) => {
        const items = scene.querySelectorAll('.sr');
        if (items.length === 0) return;
        gsap.fromTo(items,
          { y: 60, opacity: 0, filter: 'blur(8px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 70%',
              end: 'top 10%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Floating elements parallax ────────────────── */
      gsap.utils.toArray('.float').forEach((el) => {
        gsap.to(el, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.scene'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      /* ── Scale-up reveals ──────────────────────────── */
      gsap.utils.toArray('.scale-reveal').forEach((el) => {
        gsap.fromTo(el,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: el.closest('.scene'),
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Auto-navigate to main site at end of scroll ── */
      let hasNavigated = false;
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom-=100',
        onEnter: () => {
          if (!hasNavigated) {
            hasNavigated = true;
            setTimeout(() => {
              window.location.href = '/';
            }, 1200);
          }
        },
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

      {/* ── Top bar: Logo + Language Toggle ──────────── */}
      <div className="fixed top-4 left-0 right-0 z-[200] flex items-center justify-between px-6 pointer-events-none">
        <a href="/" className="pointer-events-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4A853] to-[#B8922E] flex items-center justify-center">
              <span className="text-[#06080F] font-black text-xs">م</span>
            </div>
            <span className="text-white/60 text-xs font-medium hidden sm:block">موازنتي</span>
          </div>
        </a>
        <div className="flex items-center gap-2 pointer-events-auto">
          <a
            href="/"
            className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/[0.06] text-white/40 hover:bg-white/[0.1] hover:text-white/70 transition-all border border-white/[0.06]"
          >
            Skip ←
          </a>
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/80 transition-all border border-white/[0.06]"
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
        </div>
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
      {/* S01 — THE HOOK                                  */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#06080F]">
        {/* Ambient particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="float absolute rounded-full bg-[#D4A853]"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.06 + Math.random() * 0.2,
              }}
            />
          ))}
        </div>

        {/* Central glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#D4A853]/[0.02] blur-[120px]" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <p className="sr text-[#D4A853]/30 text-xs tracking-[0.7em] uppercase mb-10 font-medium">
              {t.tag}
            </p>

            <h1 className="sr text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-8">
              <span className="block mb-3">{t.h1a}</span>
              <span className="block mb-3">{t.h1b}</span>
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent block">
                {t.h1c}
              </span>
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent block">
                {t.h1d}
              </span>
            </h1>

            <p className="sr text-sm text-[#3D4758] max-w-md mx-auto leading-relaxed">
              {t.heroSub}
            </p>

            <div className="sr mt-6 flex items-center justify-center gap-2 text-[#2A3040] text-xs tracking-wider">
              <span>🇪🇬</span>
              <span>{t.fromEgypt}</span>
            </div>

            <div className="sr mt-16 flex flex-col items-center gap-3">
              <span className="text-[#2A3040] text-[10px] tracking-[0.5em] uppercase">Scroll</span>
              <div className="w-[18px] h-7 border border-[#1A2030] rounded-full flex justify-center">
                <div className="w-[3px] h-[6px] bg-[#D4A853]/50 rounded-full mt-1.5 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S02 — THE MYSTERY                               */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#06080F] to-[#0A0E18]">
        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="float absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-[#D4A853]/[0.03] blur-[60px]" />
          <div className="float absolute top-[60%] right-[10%] w-40 h-40 rounded-full bg-[#7BAFD4]/[0.03] blur-[80px]" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <p className="sr text-sm text-[#4A5568] mb-6 tracking-wider">
              {t.s02Label}
            </p>

            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s02h}
              <br />
              <span className="text-[#E8C874]">{t.s02h2}</span>
            </h2>

            <div className="sr w-px h-12 bg-gradient-to-b from-[#D4A853]/40 to-transparent mx-auto my-8" />

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s02p1}
              <br />
              <span className="text-[#8B95A8]">{t.s02p2}</span>
              <br />
              {t.s02p3}
              <span className="text-white font-bold"> {t.s02p4}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S02B — THE JOURNEY                              */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] to-[#080C16]">
        {/* Moving lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="float absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4A853]/10 to-transparent" />
          <div className="float absolute top-[55%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7BAFD4]/8 to-transparent" />
          <div className="float absolute top-[75%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A78BDA]/6 to-transparent" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <p className="sr text-sm text-[#4A5568] mb-6 tracking-wider">
              {t.s02bLabel}
            </p>

            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s02bh}
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s02bp1}
              <br />
              <span className="text-[#8B95A8]">{t.s02bp2}</span>
              <br />
              {t.s02bp3}
            </p>

            <div className="sr mt-12 flex justify-center items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#D4A853]/30" />
              <div className="w-16 h-px bg-[#D4A853]/20" />
              <div className="w-2 h-2 rounded-full bg-[#D4A853]/50" />
              <div className="w-16 h-px bg-[#D4A853]/20" />
              <div className="w-2 h-2 rounded-full bg-[#D4A853]/30" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S02C — THE GAP                                  */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#080C16] to-[#0A0E18]">
        {/* Tension glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#E8B94A]/[0.02] blur-[80px]" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s02ch}
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s02cp1}
              <span className="text-white font-bold"> {t.s02cp2}</span>
              <br />
              <span className="text-[#8B95A8]">{t.s02cp3}</span>
            </p>

            <div className="sr mt-10 flex justify-center gap-6">
              <div className="w-px h-16 bg-gradient-to-b from-[#D4A853]/30 to-transparent" />
              <div className="w-px h-16 bg-gradient-to-b from-[#E8B94A]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S03 — THE SCALE                                 */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] via-[#0D1120] to-[#0A0E18]">
        {/* Grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <p className="sr text-sm text-[#4A5568] mb-8 tracking-wider">
              {t.s03Label}
            </p>

            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-10">
              {t.s03h1}
              <br />
              {t.s03h2}
              <span className="text-[#D4A853]"> {t.s03h3}</span>
            </h2>

            <div className="sr scale-reveal inline-block">
              <span className="text-[7rem] sm:text-[9rem] md:text-[11rem] font-black bg-gradient-to-b from-[#E8C874] via-[#D4A853] to-[#B8922E] bg-clip-text text-transparent leading-none drop-shadow-[0_0_60px_rgba(212,168,83,0.15)]">
                {t.s03num}
              </span>
            </div>

            <p className="sr text-xl sm:text-2xl text-[#5A6578] mt-6 max-w-lg mx-auto">
              {t.s03p}
            </p>

            <div className="sr mt-10 flex justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4A853]/30" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S03B — THE FLOW                                 */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] to-[#080C16]">
        {/* Flow lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="float absolute top-[40%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6ABFA7]/10 to-transparent" />
          <div className="float absolute top-[65%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A78BDA]/8 to-transparent" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s03bh}
              <br />
              <span className="text-[#6ABFA7]">{t.s03bh2}</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s03bp1}
              <br />
              <span className="text-[#8B95A8]">{t.s03bp2}</span>
              <br />
              {t.s03bp3}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S03C — THE UNSEEN                               */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#080C16] to-[#0A0E18]">
        {/* Subtle mystery */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#A78BDA]/[0.02] blur-[80px]" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s03ch}
              <br />
              <span className="text-[#A78BDA]">{t.s03ch2}</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s03cp1}
              <br />
              <span className="text-[#8B95A8]">{t.s03cp2}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S04 — THE HUMAN                                 */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] to-[#06080F]">
        {/* Warm glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="float absolute top-[30%] left-[20%] w-48 h-48 rounded-full bg-[#A78BDA]/[0.03] blur-[80px]" />
          <div className="float absolute bottom-[25%] right-[15%] w-56 h-56 rounded-full bg-[#6ABFA7]/[0.03] blur-[80px]" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-6">
              {t.s04h1}
              <br />
              <span className="text-[#A78BDA]">{t.s04h2}</span>
            </h2>

            <p className="sr text-base text-[#5A6578] max-w-lg mx-auto mb-14 leading-relaxed">
              {t.s04p}
            </p>

            <div className="sr scale-reveal flex justify-center gap-5 sm:gap-8 text-4xl sm:text-5xl md:text-6xl">
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">🎓</span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">👨‍👩‍👧‍👦</span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">🏢</span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">🏥</span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">🌿</span>
            </div>

            <p className="sr text-sm text-[#3D4758] mt-10">
              {t.s04foot}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S04B — THE RIPPLE                               */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#06080F] to-[#0A0E18]">
        {/* Ripple rings */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="float w-[200px] h-[200px] rounded-full border border-[#D4A853]/[0.06]" />
          <div className="float absolute w-[350px] h-[350px] rounded-full border border-[#D4A853]/[0.04]" />
          <div className="float absolute w-[500px] h-[500px] rounded-full border border-[#D4A853]/[0.02]" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s04bh}
              <br />
              <span className="text-[#D4A853]">{t.s04bh2}</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s04bp}
              <span className="text-white font-bold">{t.s04bp2}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S04C — THE INVITATION                           */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] to-[#06080F]">
        {/* Warm particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="float absolute rounded-full bg-[#D4A853]"
              style={{
                width: Math.random() * 1.5 + 0.5,
                height: Math.random() * 1.5 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.04 + Math.random() * 0.1,
              }}
            />
          ))}
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s04ch}
              <br />
              <span className="text-[#E8C874]">{t.s04ch2}</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s04cp1}
              <br />
              <span className="text-[#8B95A8]">{t.s04cp2}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S05 — THE CURIOSITY                             */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#06080F]">
        {/* Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="float absolute rounded-full bg-[#D4A853]"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.04 + Math.random() * 0.12,
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[#D4A853]/[0.02] blur-[100px]" />
        </div>

        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 className="sr text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-8">
              {t.s05h1}
              <br />
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent">
                {t.s05h2}
              </span>
            </h2>

            <div className="sr w-px h-10 bg-gradient-to-b from-[#D4A853]/30 to-transparent mx-auto my-8" />

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-xl mx-auto leading-relaxed">
              {t.s05p1}
              <br />
              <span className="text-[#8B95A8]">{t.s05p2}</span>
            </p>

            <p className="sr text-xl text-white font-bold mt-8">
              {t.s05bold}
            </p>
            <p className="sr text-base text-[#5A6578] mt-2">
              {t.s05sub}
            </p>

            <p className="sr text-2xl sm:text-3xl font-black bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent mt-10">
              {t.s05cta}
            </p>

            {/* Enter the site — smooth transition */}
            <div className="sr mt-14">
              <a
                href="/"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4A853] to-[#E8B94A] text-[#06080F] text-base font-bold hover:shadow-lg hover:shadow-[#D4A853]/20 transition-all duration-500 hover:-translate-y-0.5 group"
              >
                <span>{t.s05btn}</span>
                <svg
                  className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
