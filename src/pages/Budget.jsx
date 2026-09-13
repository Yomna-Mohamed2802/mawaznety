import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Coin from '../components/ui/Coin';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════ */
/*  TEASER STORYTELLING — CINEMATIC INTRO                    */
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
            <p className="sr text-[#D4A853]/30 text-[10px] tracking-[0.7em] uppercase mb-10 font-medium">
              موازنتي — موازنة Citizen 2027/2026
            </p>

            <h1 className="sr text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-8">
              <span className="block mb-3">في حاجة</span>
              <span className="block mb-3">محدّش بيحكيلك عنها.</span>
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent block">
                كل جنيه في إيديك
              </span>
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent block">
                وراه حكاية.
              </span>
            </h1>

            <p className="sr text-sm text-[#3D4758] max-w-md mx-auto leading-relaxed">
              حكاية بتبدأ مع كل مصري — ومش بتمشى غير لما تعرفها.
            </p>

            <div className="sr mt-6 flex items-center justify-center gap-2 text-[#2A3040] text-[10px] tracking-wider">
              <span>🇪🇬</span>
              <span>من مصر — لكل مصري</span>
            </div>

            <div className="sr mt-16 flex flex-col items-center gap-3">
              <span className="text-[#2A3040] text-[9px] tracking-[0.5em] uppercase">Scroll</span>
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
            <p className="sr text-[#4A5568] text-xs mb-6 tracking-wider">
              تخيل معايا
            </p>

            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              فيه <span className="text-[#E8C874]">تريليونات</span> من الجنيهات
              <br />
              بتمشي في <span className="text-[#D4A853]">مصر</span> كل يوم.
            </h2>

            <div className="sr w-px h-12 bg-gradient-to-b from-[#D4A853]/40 to-transparent mx-auto my-8" />

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              بتتحصّل من مصريين زيك.
              <br />
              <span className="text-[#8B95A8]">بتتنفّق على حياة كل مصري.</span>
              <br />
              بس هل فكرت يوم —
              <span className="text-white font-bold"> فين بالظبط؟</span>
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
            <p className="sr text-[#4A5568] text-xs mb-6 tracking-wider">
              الجنيه مش واقف
            </p>

            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              الجنيه <span className="text-[#D4A853]">بيسافر.</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              بيبدأ من مكتب ضريبة.
              <br />
              <span className="text-[#8B95A8]">بيروح مدرسة. مستشفى. شارع. مشروع.</span>
              <br />
              كل يوم — جنيه جنيه — بيحوّل حياة.
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
              بس فيه <span className="text-[#E8B94A]">فرق.</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              اللي الدولة بتجيبه
              <span className="text-white font-bold"> مش دايمًا بيكفي.</span>
              <br />
              <span className="text-[#8B95A8]">وفي فرق بين اللي عندنا — واللي محتاجينه.</span>
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
            <p className="sr text-[#4A5568] text-xs mb-8 tracking-wider">
              الموازنة دي مش مجرد أوراق.
            </p>

            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-10">
              لو جمعنا كل جنيه
              <br />
              في الموازنة
              <span className="text-[#D4A853]"> وصفّيناه...</span>
            </h2>

            <div className="sr scale-reveal inline-block">
              <span className="text-[7rem] sm:text-[9rem] md:text-[11rem] font-black bg-gradient-to-b from-[#E8C874] via-[#D4A853] to-[#B8922E] bg-clip-text text-transparent leading-none drop-shadow-[0_0_60px_rgba(212,168,83,0.15)]">
                100
              </span>
            </div>

            <p className="sr text-xl sm:text-2xl text-[#5A6578] mt-6 max-w-lg mx-auto">
              جنيه بس — بس فين بتروح؟
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
              كل جنيه
              <br />
              <span className="text-[#6ABFA7]">بيحل مشكلة.</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              جنيه يبني مدرسة.
              <br />
              <span className="text-[#8B95A8]">جنيه يشفي مريض.</span>
              <br />
              جنيه يفتح شارع. جنيه يعلّم طفل.
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
              بس محدش
              <br />
              <span className="text-[#A78BDA]">بيحكيلك الجزئية.</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              بتشيل المحفظة كل يوم.
              <br />
              <span className="text-[#8B95A8]">بس هل فكرت — إيه اللي ورا كل جنيه بتدفعه؟</span>
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
              ورقم كل جنيه
              <br />
              <span className="text-[#A78BDA]">فيه بني آدم.</span>
            </h2>

            <p className="sr text-base text-[#5A6578] max-w-lg mx-auto mb-14 leading-relaxed">
              طالب في مدرسة. أسرة في شارع. صاحب مشروع صغير. مستشفى محتاج معدات. حديقة لسه ما اتبنتش.
            </p>

            <div className="sr scale-reveal flex justify-center gap-5 sm:gap-8 text-4xl sm:text-5xl md:text-6xl">
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">🎓</span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">👨‍👩‍👧‍👦</span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">🏢</span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">🏥</span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-default">🌿</span>
            </div>

            <p className="sr text-sm text-[#3D4758] mt-10">
              كل واحد فيهم ليه نصيب من الـ 100 جنيه دول.
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
              كل جنيه
              <br />
              <span className="text-[#D4A853]">بيعمل موجة.</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              جنيه واحد يغيّر يوم طفل.
              <br />
              <span className="text-[#8B95A8]">ميه جنيه يبنوا مستشفى.</span>
              <br />
              ومليارات جنيه — تبني بلد.
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
              عايزينك
              <br />
              <span className="text-[#E8C874]">تعرف الحكاية كلها.</span>
            </h2>

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              مش بس أرقام.
              <br />
              <span className="text-[#8B95A8]">حكاية. قرارات. مستقبل.</span>
              <br />
              كل جنيه ليه صوت — و<strong className="text-white">صوتك مهم.</strong>
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
              موازنتك مش مجرد
              <br />
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent">
                أرقام في ورقة.
              </span>
            </h2>

            <div className="sr w-px h-10 bg-gradient-to-b from-[#D4A853]/30 to-transparent mx-auto my-8" />

            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-xl mx-auto leading-relaxed">
              دي <span className="text-white font-bold">حكاية</span> كل مصري.
              <br />
              <span className="text-[#8B95A8]">حكاية كل قرار. كل جنيه. كل حلم.</span>
            </p>

            <p className="sr text-sm text-[#3D4758] mt-10 max-w-md mx-auto">
              ادخل واعرف — الجاي أقوى بكتير.
            </p>

            <div className="sr mt-12 flex justify-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-[#D4A853]/20" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
