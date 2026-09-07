# موازنتي — Mawaznety

موقع تفاعلي لشرح **موازنة المواطن 2026/2027** بطريقة مبسطة للمواطن المصري.

> Government + Modern + Trustworthy — مصمم للعرض أمام لجنة حكومية وموجه للشباب.

## Tech Stack

- **React 18 + Vite 5**
- **React Router DOM 6** — routing + future flags
- **TailwindCSS 3** — design system (navy / warm off-white)
- **Framer Motion 10** — animations
- **Recharts 2** — charts (Donut / Line / Bar)
- **React Icons + Supabase** (جاهز للربط)

## التشغيل محليًا

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # إنتاج dist/
npm run preview  # معاينة البناء
```

تسجيل الدخول تجريبي — أي بريد/كلمة مرور.

## الهيكل

```
src/
  pages/MasterDashboard.jsx  # الصفحة الرئيسية (11 section)
  pages/Budget100.jsx        # تجربة 100 جنيه
  pages/FinanceMinister.jsx  # محاكي وزير المالية
  pages/Quiz.jsx, Voting.jsx, Reports.jsx, Settings.jsx
  components/layout/         # Sidebar + Header + Layout
  components/dashboard/      # StatCard, SourceBadge, SourceDrawer
  components/charts/         # ExpenditureDonut, DebtTrendChart, InvestmentChart
  data/                      # مصدر الحقيقة الوحيد (schema, meta, budget, sectors...)
  context/AuthContext.jsx
  index.css                  # Design tokens
```

## البيانات

كل الأرقام من **موازنة المواطن 2026/2027 — الإصدار الثالث عشر** (وزارة المالية).
`src/data/` هو مصدر الحقيقة الوحيد — لا أرقام مخترعة.

## النشر

المشروع جاهز لـ **GitHub Pages / Vercel / Netlify** — فقط `npm run build`.

```bash
# Vercel / Netlify: اربطي الريبو وسيُبنى تلقائيًا
# GitHub Pages: فعّلي Pages على branch: main → / (root) أو dist
```
