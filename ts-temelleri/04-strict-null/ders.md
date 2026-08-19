# 04 — strictNullChecks, optional property, null vs undefined

## Temel fikir C#'taki nullable reference types ile aynı

`strictNullChecks` açıkken (bizim `strict: true` bunu içeriyor) bir tip **kendi başına**
null/undefined kabul etmez:

```ts
let name: string = null;              // ❌
let name2: string | null = null;      // ✅
let name3: string | undefined;        // ✅
```

C# 8+ ile aynı mantık: `string` vs `string?`. Fark şu — C#'ta bu bir **uyarı**dır ve tek
bir "null" vardır. TS'te **hata**dır ve **iki** ayrı boşluk değeri vardır.

## null ve undefined — ikisi ne farkı var?

| | anlamı | nereden gelir |
|---|---|---|
| `undefined` | "burada hiç değer yok / atanmamış" | eksik alan, dönüş yazılmamış fonksiyon, `find()` bulamayınca |
| `null` | "kasıtlı olarak boş" | genelde veritabanı / JSON: `{"phone": null}` |

Pratik kural: **kendi kodunda `undefined` kullan.** `null`'ı sadece dışarıdan (API, DB)
geldiğinde karşıla. C#'tan gelen `null` refleksini TS'te `undefined`'a çevir.

## Optional property (`?`) ile `| undefined` aynı şey değil

```ts
type A = { phone?: string };            // alanı hiç yazmayabilirsin
type B = { phone: string | undefined }; // alanı yazmak ZORUNLU, değeri undefined olabilir

const a: A = {};                        // ✅
const b: B = {};                        // ❌ 'phone' eksik
const b2: B = { phone: undefined };     // ✅
```

`?` = "bu alan olmayabilir". `| undefined` = "alan var ama içi boş olabilir".
C#'ta bu ayrım yok — orada property her zaman vardır, sadece değeri null olabilir.
Pratikte `?` çok daha yaygın; React props'ta neredeyse hep onu kullanacaksın.

## `?.` ve `??`

```ts
const city = order.customer?.address?.city;   // zincirde biri yoksa undefined
const note = order.note ?? "not yok";         // sadece null/undefined ise sağdakini al
```

`?.` C#'takiyle birebir aynı. `??` de öyle — ama **`||` ile karıştırma**:

```ts
const discount1 = order.discount || 10;   // ❌ discount 0 ise 10 yapar!
const discount2 = order.discount ?? 10;   // ✅ 0 geçerli bir indirim, korunur
```

`||` JS'in "falsy" değerlerinde (`0`, `""`, `false`, `NaN`) de sağa geçer. `??` sadece
`null`/`undefined`'da geçer. Sayı ve string alanlarda daima `??` kullan.

## `!` — non-null assertion

```ts
const found = products.find(p => p.id === 1);   // Product | undefined
console.log(found!.name);                        // "boş değil, söz veriyorum"
```

C#'taki `!` (null-forgiving) ile aynı: derleyiciyi susturur, **hiçbir kontrol eklemez**.
Yanılıyorsan runtime'da patlar. Kaçış kapısı olarak gör, çözüm olarak değil. Doğrusu:

```ts
if (found) { console.log(found.name); }   // burada found artık Product
```

## Bir tuzak: dizi indeksleme

```ts
const p = products[99];   // tipi Product — ama runtime'da undefined!
```

TS varsayılan olarak dizi indekslemesinin her zaman başarılı olduğunu **varsayar**. Bu
boşluğu kapatan `noUncheckedIndexedAccess` ayarı var; konu 08'de açıp etkisini göreceğiz.
Şimdilik bil ki `strict: true` bunu kapsamıyor.
