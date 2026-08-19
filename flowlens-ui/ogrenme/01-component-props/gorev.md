# 01 — Görevler

Önce `ders.md`'yi oku. Sonra sırayla:

---

## Görev 1 — `EndpointCard` component'i

Dosya: `src/components/EndpointCard.tsx` (iskeleti hazır)

Bir FlowLens endpoint'ini kart olarak gösteren component'i yaz.

**Props tipi:** `EndpointCardProps` adında bir `interface`. Alanlar:

| alan | tip |
|---|---|
| `method` | `HttpMethod` (mockGraph.ts'ten import et) |
| `path` | `string` |
| `module` | `string` |
| `filePath` | `string` |

**Kartın göstereceği içerik:**

- Method rozeti (örn. `POST`)
- Path (örn. `/api/orders`)
- Modül adı
- Dosya yolu

Kuralları uygula: `className`, tek kök element, `{}` içinde ifade.

Hazır Tailwind class'ları — kopyala:

```
dış kart:      rounded-lg border border-slate-700 bg-slate-900 p-4 hover:border-slate-500
üst satır:     flex items-center gap-3
method rozeti: rounded px-2 py-0.5 text-xs font-bold bg-slate-700 text-slate-100
path:          font-mono text-sm text-slate-100
modül:         mt-2 text-xs text-slate-400
dosya yolu:    mt-1 font-mono text-[11px] text-slate-500
```

---

## Görev 2 — `App.tsx`'te kullan

Dosya: `src/App.tsx`

`mockGraph.ts`'ten `endpoints` dizisini import et ve **elle, tek tek** 3 tane
`EndpointCard` yaz — `endpoints[0]`, `endpoints[1]`, `endpoints[3]` için.
(`.map()` kullanma, o 02'nin konusu.)

Kartları alt alta dizen sarmalayıcı için:

```
space-y-3
```

Doğrulama: `npm run dev` çalıştır, tarayıcıda 3 kart gör.

---

## Görev 3 — Method rengini ifade ile hesapla

`EndpointCard` içinde method rozetinin rengi method'a göre değişsin:

- `GET` → `bg-emerald-700`
- `POST` → `bg-blue-700`
- `PUT` / `PATCH` → `bg-amber-700`
- `DELETE` → `bg-red-700`

Bunu **component'in gövdesinde, `return`'den önce** normal JavaScript ile
hesapla (bir `const` + `switch` veya bir lookup objesi). JSX içine `if`
yazmaya çalışma — neden olmadığını `ders.md` anlatıyor.

Sonra `className`'i şablon literal ile birleştir:

```tsx
className={`rounded px-2 py-0.5 text-xs font-bold text-slate-100 ${renkDegiskeni}`}
```

---

Bitince bana **"01 bitti"** de. Kodu okuyup review edeceğim.
