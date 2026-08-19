# 08 — Egzersizler

Bu konu diğerlerinden farklı: çoğunlukla **`tsconfig.json`'u değiştirip `npm run check`
çalıştıracaksın**. Gözlemlerini `cozum.ts` içine yorum satırı olarak yaz.

> Her egzersizden sonra `tsconfig.json`'u eski haline döndür — sonraki egzersiz temiz
> başlasın. En sonda hangi ayarlarla kalacağına sen karar vereceksin.

---

## Egzersiz 1 — `strict`'i kapat, ne kaybettiğini gör

`tsconfig.json`'da `"strict": true` satırını `false` yap ve `npm run check` çalıştır.

Hata sayısı arttı mı, azaldı mı? Beklediğin gibi mi?

Sonra `strict: false` bırakıp `cozum.ts` içine şunları yaz:

```ts
function topla(a, b) { return a + b; }
const musteri: { name: string } = null;
```

`npm run check` ne diyor? Şimdi `strict: true` yap, tekrar çalıştır. İki çıktıyı yorum
satırı olarak karşılaştır.

`strict`'i geri aç ve bu iki satırı sil.

---

## Egzersiz 2 — `target` ve `lib`

`cozum.ts` içine şunu yaz:

```ts
const urunler = ["klavye", "mouse"];
console.log(urunler.includes("mouse"));
console.log(Object.entries({ a: 1 }));
```

`npm run check` temiz geçmeli.

Şimdi `tsconfig.json`'da `"target": "ES2022"` → `"ES5"` ve `"lib": ["ES2022"]` →
`["ES5"]` yap. Tekrar çalıştır.

Kaç hata çıktı, hangi satırlarda? Yorum satırına kopyala.

Yorum satırı olarak cevapla: Kod hiç değişmediği halde neden hata veriyor? `lib` tam
olarak neyi kontrol ediyor?

Ayarları geri al.

---

## Egzersiz 3 — `noUncheckedIndexedAccess`

`cozum.ts` içine yaz:

```ts
type Urun = { id: number; ad: string };
const urunListesi: Urun[] = [{ id: 1, ad: "klavye" }];

const ilk = urunListesi[0];
console.log(ilk.ad);
console.log(urunListesi[99].ad);
```

`npm run check` şu an temiz geçiyor. Ama ikinci satır runtime'da patlar — `npm run 08`
ile kanıtla (çıkan hatayı yorum satırına yaz).

Şimdi `tsconfig.json`'a `"noUncheckedIndexedAccess": true` ekle ve tekrar `check` çalıştır.

- Kaç hata çıktı? Sadece bu dosyada mı, başka konularda da mı?
- Hataları düzelt (konu 04'teki daraltma yöntemleriyle).

Son olarak yorum satırı olarak yaz: Bu ayarı gerçek bir projede açar mıydın? Maliyeti ne,
kazancı ne?

---

## Egzersiz 4 — `paths` ile import alias'ı

`ts-temelleri/08-tsconfig/shared/domain.ts` dosyası oluştur:

```ts
export type Musteri = { id: number; ad: string };
export const varsayilanMusteri: Musteri = { id: 0, ad: "misafir" };
```

`cozum.ts`'e önce **göreceli yolla** import et (`./shared/domain`), kullan ve bas.
`npm run 08` çalıştığını gör.

Şimdi `tsconfig.json`'a ekle:

```jsonc
"baseUrl": ".",
"paths": { "@domain/*": ["ts-temelleri/08-tsconfig/shared/*"] }
```

`cozum.ts`'teki import'u `@domain/domain` olarak değiştir.

İki şeyi ayrı ayrı test et ve sonucu yorum satırına yaz:
1. `npm run check` — derleyici alias'ı çözebildi mi?
2. `npm run 08` — çalışma zamanında da çözüldü mü?

İkisinin ayrı ayrı çalışması gerektiğini not et. Yorum satırı olarak yaz: Bu ayar React
projesinde neden neredeyse her zaman bulunur?

---

## Bitirme

Sekiz konu bitti. `tsconfig.json`'u son bir kez gözden geçir ve **kalıcı olarak hangi
ayarlarla devam etmek istediğine karar ver** — özellikle `noUncheckedIndexedAccess` ve
`paths`. Kararını ve gerekçeni `cozum.ts`'in sonuna yorum satırı olarak yaz.
