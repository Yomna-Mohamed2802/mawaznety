# Mawaznety Data Architecture

## Canonical Source of Truth

All budget data lives in `src/data/`. Components import ONLY from the barrel export:

```js
import { budgetOverview, budget100 } from '../data';
```

Do NOT import from individual data files (`../data/budget.js`) unless explicitly needed.

---

## Data Shape: BudgetFigure

Every official financial figure uses this exact shape:

```js
{
  id: string,                    // Unique ID (snake_case)
  label: string,                 // Arabic display name
  value: number | null,          // null = unavailable
  unit: Unit,                    // Controlled enum (see below)
  fiscalYear: string,            // "2026/2027"
  figureType: FigureType,        // "official" | "derived" | "explanatory"
  verificationStatus: VerificationStatus, // "verified" | "unverified" | "unavailable"
  sourceId: string | null,       // Reference to sources.js ID
  page: number | null,           // Page in source document
  derivedFrom: string[] | null,  // IDs of source figures (if derived)
  formula: string | null,        // Human-readable formula (if derived)
  note: string | null,           // Optional clarification
}
```

---

## Figure Types

| Type | Meaning |
|------|---------|
| `official` | Directly stated in an authoritative source |
| `derived` | Calculated from official figures (must have `derivedFrom` + `formula`) |
| `explanatory` | Educational/contextual info, NOT an official budget figure |

---

## Verification Status

| Status | Meaning |
|--------|---------|
| `verified` | Confirmed against an authoritative source (e.g., official PDF) |
| `unverified` | Value exists but NOT confirmed (e.g., from mockup, draft) |
| `unavailable` | Value is not known at all |

**Do NOT auto-calculate verification status.** It must be explicitly set in the data.

---

## Controlled Units

| Unit | Arabic Display |
|------|---------------|
| `EGP` | جنيه |
| `billion_EGP` | مليار جنيه |
| `trillion_EGP` | تريليون جنيه |
| `percent` | % |
| `USD_billion` | مليار دولار |
| `EGP_per_USD` | جنيه/دولار |
| `count` | (no unit) |
| `text` | (no unit) |

Use `formatValue(figure)` to convert to Arabic display text.

---

## Rules

1. **Never invent numbers.** All `value` fields start as `null`.
2. **Never auto-derive verification.** Set it explicitly.
3. **Never duplicate figures.** If the same number is needed in multiple places, reference the canonical figure by ID.
4. **Derived figures must reference sources.** Include `derivedFrom` and `formula`.
5. **Explanatory content is not financial data.** Quiz questions, descriptions, initiative names, timeline dates are NOT official figures.
6. **Source provenance is explicit.** Every figure references `sourceId` and `page`.
7. **Units are controlled.** Use the `UNITS` enum, not arbitrary strings.

---

## Adding New Verified Data

When the official PDF is available:

1. Open the relevant data file (e.g., `budget.js`)
2. Find the figure by its `id`
3. Set `value` to the official number
4. Set `verificationStatus` to `"verified"`
5. Set `page` to the page number in the PDF
6. For derived figures, verify the source figures first

Example:
```js
export const revenues = createFigure({
  id: "total_revenues",
  label: "إيرادات الدولة",
  value: 4100,                          // <-- set the official number
  unit: UNITS.BILLION_EGP,
  verificationStatus: VERIFICATION.VERIFIED,  // <-- mark as verified
  sourceId: BUDGET_SOURCE_ID,
  page: 5,                              // <-- page in the PDF
  // ...
});
```

---

## File Structure

```
src/data/
├── schema.js          # Types, units, helper functions
├── meta.js            # App metadata (fiscal year, currency)
├── budget.js          # Budget overview (revenues, expenditures, surplus)
├── budget100.js       # 100 EGP breakdown (flat array)
├── revenues.js        # Revenue categories
├── expenditures.js    # Expenditure categories
├── debt.js            # Debt data (public, external, interest)
├── sectors/
│   ├── index.js       # Barrel export for sectors
│   ├── education.js
│   ├── health.js
│   ├── social.js
│   ├── infrastructure.js
│   └── economy.js
├── quiz.js            # Quiz questions bank
├── voting.js          # Voting categories (options only, no counts)
├── timeline.js        # Budget timeline milestones
├── sources.js         # Reference documents
└── index.js           # Single barrel export
```
