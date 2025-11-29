# Plan: Production Readiness - Payload CMS + Next.js 2025

## Obiectiv
Pregătirea proiectului pentru producție prin corectarea problemelor critice identificate în audit și asigurarea conformității cu standardele Payload CMS și Next.js 2025.

---

## 🔴 Faza 1: Probleme CRITICE (Must Fix)

### 1.1 Blocuri neînregistrate în RenderBlocks.tsx
**Problema:** Banner și Code blocks au config.ts și Component.tsx dar nu sunt în mapping-ul blockComponents.

**Fișier:** `src/blocks/RenderBlocks.tsx`

**Soluție:**
```typescript
import { BannerBlock } from '@/blocks/Banner/Component'
import { CodeBlock } from '@/blocks/Code/Component'

const blockComponents = {
  // ... existing
  banner: BannerBlock,
  code: CodeBlock,
}
```

---

### 1.2 Memory Leak în VideoMedia
**Problema:** useEffect adaugă event listener fără cleanup function.

**Fișier:** `src/components/Media/VideoMedia/index.tsx` (liniile 16-24)

**Cod curent:**
```typescript
useEffect(() => {
  const { current: video } = videoRef
  if (video) {
    video.addEventListener('suspend', () => {})
  }
}, [])
```

**Soluție:**
```typescript
useEffect(() => {
  const { current: video } = videoRef
  if (!video) return

  const handleSuspend = () => {
    // Handle video suspend if needed
  }

  video.addEventListener('suspend', handleSuspend)

  return () => {
    video.removeEventListener('suspend', handleSuspend)
  }
}, [])
```

---

### 1.3 Infinite Re-render în HighImpactHero
**Problema:** useEffect fără dependency array cauzează re-render continuu.

**Fișier:** `src/heros/HighImpact/index.tsx` (liniile 16-18)

**Cod curent:**
```typescript
useEffect(() => {
  setHeaderTheme('dark')
})
```

**Soluție:**
```typescript
useEffect(() => {
  setHeaderTheme('dark')
}, [setHeaderTheme])
```

---

### 1.4 Lipsă Error Boundary
**Problema:** Nu există error.tsx pentru handling-ul erorilor în producție.

**Fișier nou:** `src/app/(frontend)/error.tsx`

**Conținut:**
```typescript
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">A apărut o eroare</h2>
      <p className="text-theme-text mb-8">Ne pare rău, ceva nu a funcționat corect.</p>
      <button
        onClick={reset}
        className="custom-btn"
      >
        Încearcă din nou
      </button>
    </div>
  )
}
```

---

## 🟡 Faza 2: Probleme IMPORTANTE

### 2.1 Lipsă Loading State
**Fișier nou:** `src/app/(frontend)/loading.tsx`

**Conținut:**
```typescript
export default function Loading() {
  return (
    <div className="container py-20 flex justify-center items-center min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-theme-primary"></div>
    </div>
  )
}
```

---

### 2.2 Metadata pentru pagini statice
**Fișiere de modificat:**
- `src/app/(frontend)/abonamente/page.tsx` ✅ (are deja metadata)
- `src/app/(frontend)/classes/page.tsx` - verificare
- `src/app/(frontend)/team-members/page.tsx` - verificare

**Template metadata:**
```typescript
export const metadata: Metadata = {
  title: 'Titlu Pagină | Transilvania Fitness',
  description: 'Descriere optimizată SEO',
  openGraph: {
    title: 'Titlu Pagină | Transilvania Fitness',
    description: 'Descriere optimizată SEO',
  },
}
```

---

### 2.3 Eliminare console statements din producție
**Căutare:** `console.log`, `console.warn`, `console.error` în cod (cu excepția error.tsx)

**Fișiere posibile:**
- `src/blocks/Form/Component.tsx`
- Alte componente

---

## 🟢 Faza 3: Optimizări (Nice to Have)

### 3.1 ESLint Rules Stricte
**Fișier:** `eslint.config.mjs`

Schimbare reguli de la `'warn'` la `'error'` pentru:
- `@typescript-eslint/no-unused-vars`
- `@typescript-eslint/no-explicit-any`

### 3.2 Access Control explicit
**Colecții:** Contacts, Addresses - adăugare access control explicit dacă nu există.

### 3.3 Consistență Labels
Unificare labels pentru blocks (English sau Romanian, nu mix).

---

## Fișiere de Modificat

| Fișier | Modificare | Prioritate |
|--------|------------|------------|
| `src/blocks/RenderBlocks.tsx` | Adăugare Banner, Code | 🔴 CRITIC |
| `src/components/Media/VideoMedia/index.tsx` | Fix memory leak | 🔴 CRITIC |
| `src/heros/HighImpact/index.tsx` | Fix useEffect dependency | 🔴 CRITIC |
| `src/app/(frontend)/error.tsx` | Creare nouă | 🔴 CRITIC |
| `src/app/(frontend)/loading.tsx` | Creare nouă | 🟡 IMPORTANT |
| `eslint.config.mjs` | Strictețe reguli | 🟢 OPTIMIZARE |

---

## Ordine Implementare

1. ⬜ Fix RenderBlocks.tsx - adăugare Banner, Code blocks
2. ⬜ Fix VideoMedia - cleanup event listener
3. ⬜ Fix HighImpactHero - dependency array
4. ⬜ Creare error.tsx
5. ⬜ Creare loading.tsx
6. ⬜ Verificare/adăugare metadata pe pagini
7. ⬜ Eliminare console statements
8. ⬜ Test build final: `pnpm build`

---

## Verificare Finală

După implementare:
```bash
pnpm build
pnpm lint
```

Build trebuie să treacă fără erori sau warnings critice.
