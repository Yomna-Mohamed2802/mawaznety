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
    s05h1: 'وفي الآخر —',
    s05h2: 'الجنيه ده راجع لمين؟',
    s05p1: 'كل جنيه بيتجمع أو بيتصرف —',
    s05p2: 'جزء من دورة بتأثر على حياتك.',
    s05bold: 'ليك.',
    s05sub: 'الموازنة مش أرقام بعيدة عنك. هي قرارات بتأثر على حياتك كل يوم.',
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
    s05h2: 'who does this pound come back to?',
    s05p1: 'Every pound collected or spent —',
    s05p2: 'is part of a cycle that affects your life.',
    s05bold: 'To you.',
    s05sub: "The budget isn't far from you. It's decisions that affect your life every day.",
    s05cta: 'Your budget is in your hands.',
    s05btn: 'Enter Mawaznety',
  },
};

/* ══════════════════════════════════════════════════════════ */
/*  TEASER STORYTELLING — CINEMATIC INTRO                    */
/*  The coin IS the story engine. Every visual event is      */
/*  caused by the coin reaching/interacting with something.  */
/* ══════════════════════════════════════════════════════════ */

export default function Budget() {
  const { lang, toggleLang } = useLang();
  const t = T[lang] || T.ar;
  const containerRef = useRef(null);
  const coinRef = useRef(null);
  const progressRef = useRef(null);

  /* ── Scene-specific refs ──────────────────────── */
  const glowRef = useRef(null);
  const scaleWrapRef = useRef(null);
  const scaleNumRef = useRef(null);
  const debtWellRef = useRef(null);
  const curveRef = useRef(null);
  const growthPctRef = useRef(null);

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

      /* ════════════════════════════════════════════════ */
      /*  MASTER TIMELINE — THE COIN IS THE STORY         */
      /*  Coin position triggers visual state changes.    */
      /* ════════════════════════════════════════════════ */
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      /* ──────────────────────────────────────────────── */
      /*  01 — HERO: THE COIN IS BORN                     */
      /*  Coin enters from above, rotates, lands,         */
      /*  subtle bounce, glow pulse, settles.              */
      /* ──────────────────────────────────────────────── */
      master
        .set(coin, {
          x: 0,
          y: () => -window.innerHeight * 0.6,
          scale: 0.2,
          rotation: -40,
          opacity: 0,
        })
        .to(coin, {
          opacity: 1,
          y: 0,
          scale: 0.85,
          rotation: 0,
          duration: 0.8,
          ease: 'bounce.out',
        })
        /* glow pulse on arrival */
        .fromTo(glowRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 0.6, scale: 1.3, duration: 0.3, ease: 'power2.out' },
          '<'
        )
        .to(glowRef.current, {
          opacity: 0.15,
          scale: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        });

      /* ──────────────────────────────────────────────── */
      /*  02 — REVENUE: streams converge INTO the coin    */
      /*  Coin is at center. Revenue streams physically   */
      /*  travel toward it. On merge, coin reacts.        */
      /* ──────────────────────────────────────────────── */
      const streams = gsap.utils.toArray('.revenue-stream');
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 0.75,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      /* streams converge from edges toward coin center */
      streams.forEach((s, i) => {
        const angles = [-35, 25, -20, 30];
        const distances = [0.4, 0.35, 0.38, 0.42];
        const a = (angles[i] * Math.PI) / 180;
        const d = distances[i];
        master.fromTo(s,
          { x: Math.sin(a) * window.innerWidth * d, y: Math.cos(a) * window.innerHeight * d, opacity: 0, scale: 0.3 },
          { x: 0, y: 0, opacity: 0.8, scale: 1, duration: 0.4, ease: 'power2.in' },
          `<${0.1 * i}`
        );
      });
      /* streams merge into coin — coin reacts with pulse */
      master.to(coin, {
        scale: 1,
        duration: 0.15,
        ease: 'power2.out',
      });
      master.to(glowRef.current, {
        opacity: 0.7,
        scale: 1.5,
        duration: 0.15,
        ease: 'power2.out',
      }, '<');
      master.to(coin, { scale: 0.7, duration: 0.2, ease: 'power2.inOut' });
      master.to(glowRef.current, { opacity: 0.15, scale: 1, duration: 0.2 }, '<');
      /* fade streams after merge */
      streams.forEach((s) => {
        master.to(s, { opacity: 0, scale: 0.2, duration: 0.15 }, '<');
      });

      /* ──────────────────────────────────────────────── */
      /*  03 — SCALE: trillions compress → 100 revealed   */
      /*  The most important moment. Numbers visually     */
      /*  compress toward center. Coin shrinks. "100"     */
      /*  emerges from the compression.                    */
      /* ──────────────────────────────────────────────── */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 0.6,
        duration: 0.5,
        ease: 'power2.inOut',
      });
      /* large numbers compress toward center */
      if (scaleWrapRef.current) {
        master.to(scaleWrapRef.current, {
          scale: 0.15,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.in',
        });
      }
      /* coin contracts with the compression */
      master.to(coin, {
        scale: 0.3,
        duration: 0.3,
        ease: 'power3.in',
      }, '<');
      /* "100" is revealed — emerges from compression */
      if (scaleNumRef.current) {
        master.fromTo(scaleNumRef.current,
          { scale: 3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
        );
      }
      /* coin settles next to the 100 */
      master.to(coin, {
        x: () => window.innerWidth * -0.12,
        scale: 0.35,
        duration: 0.3,
        ease: 'power2.out',
      }, '<');

      /* ──────────────────────────────────────────────── */
      /*  04 — DISTRIBUTION: coin splits, branches fly    */
      /*  toward budget destinations. Coin is the trigger */
      /*  — one budget → multiple destinations.            */
      /* ──────────────────────────────────────────────── */
      const splitCoins = gsap.utils.toArray('.split-coin');
      const splitPaths = [
        { x: () => window.innerWidth * -0.22, y: () => -window.innerHeight * 0.18 },
        { x: () => window.innerWidth * 0.2,  y: () => -window.innerHeight * 0.12 },
        { x: () => window.innerWidth * -0.15, y: () => window.innerHeight * 0.15 },
        { x: () => window.innerWidth * 0.18,  y: () => window.innerHeight * 0.18 },
      ];
      /* main coin moves to distribution center */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 0.5,
        duration: 0.4,
        ease: 'power2.inOut',
      });
      /* split coins burst outward from main coin */
      splitCoins.forEach((sc, i) => {
        const p = splitPaths[i];
        master.fromTo(sc,
          { x: 0, y: 0, opacity: 0, scale: 0.1 },
          {
            x: p.x,
            y: p.y,
            opacity: 0.7,
            scale: 0.25,
            duration: 0.5,
            ease: 'power2.out',
          },
          `<${0.08 * i}`
        );
      });
      /* main coin shrinks as portions are distributed */
      master.to(coin, { scale: 0.3, duration: 0.3 }, '<');
      /* split coins arrive, glow briefly */
      splitCoins.forEach((sc) => {
        master.to(sc, { scale: 0.3, opacity: 0.9, duration: 0.15, ease: 'power2.out' });
        master.to(sc, { opacity: 0.3, scale: 0.15, duration: 0.2 });
      });

      /* ──────────────────────────────────────────────── */
      /*  05 — DEBT: coin experiences gravitational pull  */
      /*  Coin travels forward → approaches debt well →   */
      /*  movement slows, bends inward, smaller coins get  */
      /*  attracted → main coin escapes and continues.     */
      /* ──────────────────────────────────────────────── */
      /* coin approaches debt zone */
      master.to(coin, {
        x: () => window.innerWidth * 0.15,
        y: () => window.innerHeight * 0.05,
        scale: 0.35,
        duration: 0.4,
        ease: 'power1.in',
      });
      /* gravity well appears */
      if (debtWellRef.current) {
        master.fromTo(debtWellRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
      /* coin bends toward gravity well — movement slows */
      master.to(coin, {
        x: () => window.innerWidth * 0.08,
        y: () => window.innerHeight * 0.02,
        scale: 0.28,
        duration: 0.4,
        ease: 'power3.in',
      });
      /* gravity intensifies — coin pulled further */
      master.to(coin, {
        x: () => window.innerWidth * 0.04,
        y: 0,
        scale: 0.22,
        duration: 0.3,
        ease: 'power4.in',
      });
      /* gravity well intensifies */
      if (debtWellRef.current) {
        master.to(debtWellRef.current, {
          scale: 1.3,
          opacity: 0.9,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
      /* main coin ESCAPES the gravitational pull */
      master.to(coin, {
        x: () => -window.innerWidth * 0.15,
        y: () => -window.innerHeight * 0.08,
        scale: 0.35,
        duration: 0.5,
        ease: 'power2.out',
      });
      /* gravity well fades */
      if (debtWellRef.current) {
        master.to(debtWellRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        });
      }

      /* ──────────────────────────────────────────────── */
      /*  06 — SERVICES: coin travels to each service,    */
      /*  activates on arrival. COIN ARRIVES → SERVICE    */
      /*  ACTIVATES.                                       */
      /* ──────────────────────────────────────────────── */
      const serviceIcons = gsap.utils.toArray('.svc-icon');
      const servicePositions = [
        { x: () => -window.innerWidth * 0.2, y: () => -window.innerHeight * 0.12 },
        { x: () => window.innerWidth * 0.18,  y: () => -window.innerHeight * 0.08 },
        { x: () => -window.innerWidth * 0.12, y: () => window.innerHeight * 0.1 },
        { x: () => window.innerWidth * 0.15,  y: () => window.innerHeight * 0.12 },
        { x: () => 0,                         y: () => 0 },
      ];
      serviceIcons.forEach((icon, i) => {
        const pos = servicePositions[i];
        /* coin travels to service */
        master.to(coin, {
          x: pos.x,
          y: pos.y,
          scale: 0.3,
          duration: 0.35,
          ease: 'power2.inOut',
        });
        /* coin arrives → service activates */
        master.to(icon, {
          opacity: 1,
          scale: 1.2,
          filter: 'brightness(1.5) drop-shadow(0 0 12px rgba(212,168,83,0.6))',
          duration: 0.2,
          ease: 'power2.out',
        });
        /* subtle glow on coin */
        master.to(glowRef.current, {
          opacity: 0.4,
          scale: 1.2,
          duration: 0.15,
          ease: 'power2.out',
        }, '<');
        master.to(glowRef.current, {
          opacity: 0.15,
          scale: 1,
          duration: 0.2,
        });
        /* service settles */
        master.to(icon, {
          scale: 1,
          filter: 'brightness(1.2) drop-shadow(0 0 6px rgba(212,168,83,0.3))',
          duration: 0.2,
        }, '<');
      });

      /* ──────────────────────────────────────────────── */
      /*  07 — INVESTMENT: coin transforms                */
      /*  Coin reaches investment area → seed → plant →   */
      /*  building. MONEY → INVESTMENT → GROWTH.           */
      /* ──────────────────────────────────────────────── */
      const investStages = gsap.utils.toArray('.invest-stage');
      /* coin travels to investment center */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 0.4,
        duration: 0.4,
        ease: 'power2.inOut',
      });
      /* coin enters investment zone — glow intensifies */
      master.to(glowRef.current, {
        opacity: 0.5,
        scale: 1.4,
        duration: 0.3,
        ease: 'power2.out',
      });
      /* stage 0: seed appears */
      if (investStages[0]) {
        master.fromTo(investStages[0],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' }
        );
      }
      /* stage 1: seed grows into sprout */
      if (investStages[1]) {
        master.fromTo(investStages[1],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' },
          '+=0.1'
        );
      }
      if (investStages[0]) {
        master.to(investStages[0], { opacity: 0.3, scale: 0.6, duration: 0.2 });
      }
      /* stage 2: sprout becomes building */
      if (investStages[2]) {
        master.fromTo(investStages[2],
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' },
          '+=0.1'
        );
      }
      if (investStages[1]) {
        master.to(investStages[1], { opacity: 0, scale: 0.5, duration: 0.2 });
      }
      /* building lights up */
      if (investStages[2]) {
        master.to(investStages[2], {
          filter: 'brightness(1.4) drop-shadow(0 0 15px rgba(212,168,83,0.5))',
          duration: 0.3,
          ease: 'power2.out',
        });
      }
      /* coin glow confirms investment */
      master.to(glowRef.current, {
        opacity: 0.7,
        scale: 1.6,
        duration: 0.2,
        ease: 'power2.out',
      }, '<');
      master.to(glowRef.current, {
        opacity: 0.15,
        scale: 1,
        duration: 0.3,
      });
      /* investment stages fade */
      investStages.forEach((s) => {
        master.to(s, { opacity: 0, duration: 0.2 }, '-=0.1');
      });

      /* ──────────────────────────────────────────────── */
      /*  08 — GROWTH: coin creates the upward path       */
      /*  Coin travels upward along a curve. Trail reveals*/
      /*  the growth line. 5.4% appears at the peak.      */
      /* ──────────────────────────────────────────────── */
      /* coin starts at bottom-left of curve */
      master.to(coin, {
        x: () => -window.innerWidth * 0.22,
        y: () => window.innerHeight * 0.15,
        scale: 0.3,
        duration: 0.3,
        ease: 'power1.in',
      });
      /* coin travels UPWARD along curve — this IS the growth */
      master.to(coin, {
        x: () => window.innerWidth * 0.18,
        y: () => -window.innerHeight * 0.18,
        scale: 0.35,
        rotation: '+=120',
        duration: 0.8,
        ease: 'power1.inOut',
      });
      /* growth curve appears as coin moves */
      if (curveRef.current) {
        master.fromTo(curveRef.current,
          { strokeDashoffset: 500, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.6, duration: 0.8, ease: 'none' },
          '<'
        );
      }
      /* 5.4% appears when coin reaches the peak */
      if (growthPctRef.current) {
        master.fromTo(growthPctRef.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' }
        );
      }
      /* coin pauses at peak, then continues */
      master.to(coin, {
        scale: 0.4,
        duration: 0.2,
        ease: 'power2.out',
      });

      /* ──────────────────────────────────────────────── */
      /*  09 — CITIZEN: the same coin returns              */
      /*  Environment simplifies. Coin returns to normal   */
      /*  scale. Travels toward citizen. STOPS. Does NOT   */
      /*  fade. The user followed this coin the whole way.  */
      /* ──────────────────────────────────────────────── */
      /* fade growth elements */
      if (curveRef.current) {
        master.to(curveRef.current, { opacity: 0, duration: 0.3 });
      }
      if (growthPctRef.current) {
        master.to(growthPctRef.current, { opacity: 0, duration: 0.3 }, '<');
      }
      /* coin returns to center, normal scale */
      master.to(coin, {
        x: 0,
        y: 0,
        scale: 0.85,
        rotation: '+=60',
        duration: 0.8,
        ease: 'power3.inOut',
      });
      /* glow warm and calm */
      master.to(glowRef.current, {
        opacity: 0.25,
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '<');
      /* coin STAYS visible — the protagonist remains */

      /* ── Per-scene reveals (staggered text) ────────── */
      gsap.utils.toArray('.scene').forEach((scene) => {
        const items = scene.querySelectorAll('.sr');
        if (items.length === 0) return;
        gsap.fromTo(items,
          { y: 50, opacity: 0, filter: 'blur(6px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scene,
              start: 'top 70%',
              end: 'top 15%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Floating elements parallax ────────────────── */
      gsap.utils.toArray('.float').forEach((el) => {
        gsap.to(el, {
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.scene'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });

      /* ── Scale-up reveals (100 number) ─────────────── */
      gsap.utils.toArray('.scale-reveal').forEach((el) => {
        gsap.fromTo(el,
          { scale: 0.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: el.closest('.scene'),
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Debt gravity pull rings ───────────────────── */
      gsap.utils.toArray('.debt-ring').forEach((el) => {
        gsap.fromTo(el,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: 'power3.in',
            scrollTrigger: {
              trigger: el.closest('.scene'),
              start: 'top 50%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Investment growth dots ────────────────────── */
      gsap.utils.toArray('.grow-dot').forEach((el) => {
        gsap.fromTo(el,
          { y: 30, opacity: 0, scale: 0.6 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el.closest('.scene'),
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      /* ── Auto-navigate to main site at end ─────────── */
      let hasNavigated = false;
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom-=100',
        onEnter: () => {
          if (!hasNavigated) {
            hasNavigated = true;
            setTimeout(() => { window.location.href = '/'; }, 1200);
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
          <a href="/" className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/[0.06] text-white/40 hover:bg-white/[0.1] hover:text-white/70 transition-all border border-white/[0.06]">
            Skip ←
          </a>
          <button onClick={toggleLang} className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/80 transition-all border border-white/[0.06]">
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
        </div>
      </div>

      {/* ── Traveling Coin + Glow ─────────────────────── */}
      <div ref={coinRef} className="fixed top-1/2 left-1/2 z-[100] pointer-events-none will-change-transform" style={{ transform: 'translate(-50%, -50%)' }}>
        <div ref={glowRef} className="absolute -inset-8 rounded-full bg-[#D4A853]/[0.12] blur-[30px] pointer-events-none" style={{ opacity: 0.15 }} />
        <Coin size={90} spinning={true} />
      </div>

      {/* ════════════════════════════════════════════════ */}
      {/* S01 — THE HOOK: The coin is born                 */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#06080F]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="float absolute rounded-full bg-[#D4A853]"
              style={{ width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0.06 + Math.random() * 0.2 }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#D4A853]/[0.02] blur-[120px]" />
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <p className="sr text-[#D4A853]/30 text-xs tracking-[0.7em] uppercase mb-10 font-medium">{t.tag}</p>
            <h1 className="sr text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-8">
              <span className="block mb-3">{t.h1a}</span>
              <span className="block mb-3">{t.h1b}</span>
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent block">{t.h1c}</span>
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent block">{t.h1d}</span>
            </h1>
            <p className="sr text-sm text-[#3D4758] max-w-md mx-auto leading-relaxed">{t.heroSub}</p>
            <div className="sr mt-6 flex items-center justify-center gap-2 text-[#2A3040] text-xs tracking-wider">
              <span>🇪🇬</span><span>{t.fromEgypt}</span>
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="float absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-[#D4A853]/[0.03] blur-[60px]" />
          <div className="float absolute top-[60%] right-[10%] w-40 h-40 rounded-full bg-[#7BAFD4]/[0.03] blur-[80px]" />
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <p className="sr text-sm text-[#4A5568] mb-6 tracking-wider">{t.s02Label}</p>
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s02h}<br /><span className="text-[#E8C874]">{t.s02h2}</span>
            </h2>
            <div className="sr w-px h-12 bg-gradient-to-b from-[#D4A853]/40 to-transparent mx-auto my-8" />
            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s02p1}<br />
              <span className="text-[#8B95A8]">{t.s02p2}</span><br />
              {t.s02p3}<span className="text-white font-bold"> {t.s02p4}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S02B — THE JOURNEY                              */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] to-[#080C16]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="float absolute top-[30%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4A853]/10 to-transparent" />
          <div className="float absolute top-[55%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7BAFD4]/8 to-transparent" />
          <div className="float absolute top-[75%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A78BDA]/6 to-transparent" />
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <p className="sr text-sm text-[#4A5568] mb-6 tracking-wider">{t.s02bLabel}</p>
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">{t.s02bh}</h2>
            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s02bp1}<br />
              <span className="text-[#8B95A8]">{t.s02bp2}</span><br />
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
      {/* S02C — THE GAP: Revenue streams converge INTO   */}
      {/* the coin. Different sources → one budget.        */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#080C16] to-[#0A0E18]">
        {/* Revenue stream elements — converge toward coin */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="revenue-stream absolute top-[20%] left-[10%] w-3 h-3 rounded-full bg-[#6ABFA7]" style={{ opacity: 0 }} />
          <div className="revenue-stream absolute top-[15%] right-[12%] w-2.5 h-2.5 rounded-full bg-[#7BAFD4]" style={{ opacity: 0 }} />
          <div className="revenue-stream absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-[#A78BDA]" style={{ opacity: 0 }} />
          <div className="revenue-stream absolute bottom-[15%] right-[10%] w-3.5 h-3.5 rounded-full bg-[#E8B94A]" style={{ opacity: 0 }} />
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">{t.s02ch}</h2>
            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s02cp1}<span className="text-white font-bold"> {t.s02cp2}</span><br />
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
      {/* S03 — THE SCALE: Trillions compress → 100       */}
      {/* THE MOST IMPORTANT MOMENT.                      */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] via-[#0D1120] to-[#0A0E18]">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <p className="sr text-sm text-[#4A5568] mb-8 tracking-wider">{t.s03Label}</p>
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-10">
              {t.s03h1}<br />{t.s03h2}<span className="text-[#D4A853]"> {t.s03h3}</span>
            </h2>
            {/* Large numbers that COMPRESS during transformation */}
            <div ref={scaleWrapRef} className="sr inline-block">
              <span className="text-[7rem] sm:text-[9rem] md:text-[11rem] font-black bg-gradient-to-b from-[#E8C874] via-[#D4A853] to-[#B8922E] bg-clip-text text-transparent leading-none drop-shadow-[0_0_60px_rgba(212,168,83,0.15)]">
                {t.s03num}
              </span>
            </div>
            <p className="sr text-xl sm:text-2xl text-[#5A6578] mt-6 max-w-lg mx-auto">{t.s03p}</p>
            <div className="sr mt-10 flex justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (<div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4A853]/30" />))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S03B — DISTRIBUTION: Coin splits into branches  */}
      {/* One budget → multiple destinations               */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] to-[#080C16]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="float absolute top-[40%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6ABFA7]/10 to-transparent" />
          <div className="float absolute top-[65%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A78BDA]/8 to-transparent" />
        </div>
        {/* Split coins — burst from main coin toward destinations */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="split-coin absolute w-5 h-5 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8922E] shadow-lg shadow-[#D4A853]/20" style={{ opacity: 0 }} />
          <div className="split-coin absolute w-5 h-5 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8922E] shadow-lg shadow-[#D4A853]/20" style={{ opacity: 0 }} />
          <div className="split-coin absolute w-5 h-5 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8922E] shadow-lg shadow-[#D4A853]/20" style={{ opacity: 0 }} />
          <div className="split-coin absolute w-5 h-5 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8922E] shadow-lg shadow-[#D4A853]/20" style={{ opacity: 0 }} />
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s03bh}<br /><span className="text-[#6ABFA7]">{t.s03bh2}</span>
            </h2>
            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s03bp1}<br />
              <span className="text-[#8B95A8]">{t.s03bp2}</span><br />
              {t.s03bp3}
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S03C — DEBT: Actual gravitational pull          */}
      {/* Coin experiences gravity, escapes.               */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#080C16] to-[#0A0E18]">
        {/* Gravity well — dark center that attracts */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div ref={debtWellRef} className="absolute" style={{ opacity: 0 }}>
            <div className="debt-ring absolute -inset-4 rounded-full border border-[#E8B94A]/[0.12]" />
            <div className="debt-ring absolute -inset-10 rounded-full border border-[#E8B94A]/[0.08]" />
            <div className="debt-ring absolute -inset-16 rounded-full border border-[#E8B94A]/[0.05]" />
            <div className="w-4 h-4 rounded-full bg-[#E8B94A]/20 blur-[4px]" />
          </div>
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s03ch}<br /><span className="text-[#A78BDA]">{t.s03ch2}</span>
            </h2>
            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s03cp1}<br /><span className="text-[#8B95A8]">{t.s03cp2}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S04 — SERVICES: Coin travels to each, activates */}
      {/* COIN ARRIVES → SERVICE ACTIVATES                 */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] to-[#06080F]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="float absolute top-[30%] left-[20%] w-48 h-48 rounded-full bg-[#A78BDA]/[0.03] blur-[80px]" />
          <div className="float absolute bottom-[25%] right-[15%] w-56 h-56 rounded-full bg-[#6ABFA7]/[0.03] blur-[80px]" />
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-6">
              {t.s04h1}<br /><span className="text-[#A78BDA]">{t.s04h2}</span>
            </h2>
            <p className="sr text-base text-[#5A6578] max-w-lg mx-auto mb-14 leading-relaxed">{t.s04p}</p>
            {/* Service icons — each activates when coin arrives */}
            <div className="sr flex justify-center gap-5 sm:gap-8 text-4xl sm:text-5xl md:text-6xl">
              <span className="svc-icon opacity-30 transition-none cursor-default">🎓</span>
              <span className="svc-icon opacity-30 transition-none cursor-default">👨‍👩‍👧‍👦</span>
              <span className="svc-icon opacity-30 transition-none cursor-default">🏢</span>
              <span className="svc-icon opacity-30 transition-none cursor-default">🏥</span>
              <span className="svc-icon opacity-30 transition-none cursor-default">🌿</span>
            </div>
            <p className="sr text-sm text-[#3D4758] mt-10">{t.s04foot}</p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S04B — INVESTMENT: Coin transforms              */}
      {/* MONEY → INVESTMENT → GROWTH                      */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#06080F] to-[#0A0E18]">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Investment stages: seed → sprout → building */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="invest-stage absolute opacity-0" style={{ fontSize: '2rem' }}>🌱</div>
            <div className="invest-stage absolute opacity-0" style={{ fontSize: '2.5rem' }}>🌿</div>
            <div className="invest-stage absolute opacity-0" style={{ fontSize: '3rem' }}>🏗️</div>
          </div>
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s04bh}<br /><span className="text-[#D4A853]">{t.s04bh2}</span>
            </h2>
            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s04bp}<span className="text-white font-bold">{t.s04bp2}</span>
            </p>
            {/* Growth dots — appear as investment grows */}
            <div className="sr mt-12 flex justify-center gap-3">
              <div className="grow-dot w-2 h-2 rounded-full bg-[#6ABFA7]/40" />
              <div className="grow-dot w-3 h-3 rounded-full bg-[#6ABFA7]/50" />
              <div className="grow-dot w-3.5 h-3.5 rounded-full bg-[#6ABFA7]/60" />
              <div className="grow-dot w-4 h-4 rounded-full bg-[#6ABFA7]/70" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S04C — GROWTH: Coin creates the upward path     */}
      {/* Coin travels upward → curve reveals → 5.4%      */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#0A0E18] to-[#06080F]">
        {/* Growth curve SVG — revealed as coin travels */}
        <div className="absolute inset-0 pointer-events-none flex items-end justify-center pb-[25%]">
          <svg ref={curveRef} width="600" height="200" viewBox="0 0 600 200" className="opacity-0" style={{ strokeDasharray: 500 }}>
            <path d="M 50 180 Q 150 160 250 120 Q 350 80 450 50 Q 500 35 550 20"
              fill="none" stroke="url(#growGrad)" strokeWidth="3" strokeLinecap="round"
              style={{ strokeDasharray: 500, strokeDashoffset: 500 }} />
            <defs>
              <linearGradient id="growGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6ABFA7" />
                <stop offset="100%" stopColor="#D4A853" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* 5.4% — appears at the peak */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div ref={growthPctRef} className="absolute top-[20%] right-[25%] opacity-0">
            <span className="text-5xl sm:text-6xl font-black bg-gradient-to-l from-[#6ABFA7] to-[#D4A853] bg-clip-text text-transparent">
              5.4%
            </span>
          </div>
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <h2 className="sr text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.3] mb-8">
              {t.s04ch}<br /><span className="text-[#E8C874]">{t.s04ch2}</span>
            </h2>
            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-2xl mx-auto leading-relaxed">
              {t.s04cp1}<br /><span className="text-[#8B95A8]">{t.s04cp2}</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════ */}
      {/* S05 — CITIZEN: The same coin returns             */}
      {/* Coin returns to center. Does NOT fade.           */}
      {/* The protagonist remains.                         */}
      {/* ════════════════════════════════════════════════ */}
      <section className="scene relative h-[150vh] w-full overflow-hidden bg-gradient-to-b from-[#06080F] via-[#0B0F1A] to-[#06080F]">
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="float absolute rounded-full bg-[#D4A853]"
              style={{ width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: 0.04 + Math.random() * 0.12 }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-[#D4A853]/[0.02] blur-[100px]" />
        </div>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h2 className="sr text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-8">
              {t.s05h1}<br />
              <span className="bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent">{t.s05h2}</span>
            </h2>
            <div className="sr w-px h-10 bg-gradient-to-b from-[#D4A853]/30 to-transparent mx-auto my-8" />
            <p className="sr text-lg sm:text-xl text-[#5A6578] max-w-xl mx-auto leading-relaxed">
              {t.s05p1}<br /><span className="text-[#8B95A8]">{t.s05p2}</span>
            </p>
            <p className="sr text-xl text-white font-bold mt-8">{t.s05bold}</p>
            <p className="sr text-base text-[#5A6578] mt-2">{t.s05sub}</p>
            <p className="sr text-2xl sm:text-3xl font-black bg-gradient-to-l from-[#D4A853] to-[#E8C874] bg-clip-text text-transparent mt-10">{t.s05cta}</p>
            <div className="sr mt-14">
              <a href="/" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4A853] to-[#E8B94A] text-[#06080F] text-base font-bold hover:shadow-lg hover:shadow-[#D4A853]/20 transition-all duration-500 hover:-translate-y-0.5 group">
                <span>{t.s05btn}</span>
                <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
