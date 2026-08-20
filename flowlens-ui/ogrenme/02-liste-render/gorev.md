# 02 — Görevler

Önce `ders.md`. Sonra:

---

## Görev 1 — `EndpointList` component'i

Dosya: `src/components/EndpointList.tsx` (iskelet hazır)

**Props tipi:** `EndpointListProps`, tek alan:

| alan | tip |
|---|---|
| `endpoints` | `EndpointSummary[]` |

`EndpointSummary` tipini `../data/mockGraph`'tan import et — `EndpointCard`'da
yaptığın gibi dört alanı tek tek yazma, hazır tip var.

**Yapacağı iş:** gelen diziyi `map` ile dolaşıp her eleman için bir
`EndpointCard` üret. `key` olarak endpoint'in `id`'sini kullan.

Sarmalayıcı `div` için:

```
space-y-3
```

---

## Görev 2 — `App.tsx`'i sadeleştir

Elle yazdığın üç `EndpointCard`'ı sil, yerine **tek** bir `EndpointList` koy ve
`endpoints` dizisinin tamamını geç. 10 kart görmelisin.

Başlığın yanına kaç endpoint olduğunu da yaz — `{}` içinde bir ifade yeter,
ayrı bir değişkene gerek yok:

```
<p className="mb-6 text-sm text-slate-400"> ... </p>
```

İçeriği "10 endpoint" gibi görünsün.

---

## Görev 3 — Prop tekrarını kaldır

`App.tsx`'te şöyle yazıyordun:

```tsx
<EndpointCard method={e.method} path={e.path} module={e.module} filePath={e.filePath} />
```

Dört alanı tek tek geçmek `EndpointList` içinde de can sıkıcı. JSX **spread**
destekler — zaten bildiğin object spread'in aynısı:

```tsx
<EndpointCard {...e} />
```

Bunu `EndpointList` içinde uygula.

Sonra kendine şu soruyu cevapla (dosyaya yazmana gerek yok, kafanda netleşsin):
`EndpointSummary`'nin `id` ve `handler` alanları da var, ama `EndpointCardProps`'ta
yoklar. Spread ile fazladan alan geçmek TypeScript hatası veriyor mu, vermiyor mu?
Neden?

> İpucu: TypeScript'in "excess property check" kuralı sadece **object literal**
> için çalışır. `{...e}` bir literal değil.

---

Bitince **"02 bitti"** de.
