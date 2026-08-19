# 01 — Egzersizler

Hepsini `cozum.ts` içine yaz. Çalıştırma: `npm run 01`
Tip hatası kontrolü: `npm run check`

---

## Egzersiz 1 — interface ve extends

`Customer` adında bir interface tanımla: `id` (number), `name` (string), `email` (string).

`Customer`'ı genişleten `VipCustomer` tanımla: ek olarak `discountRate` (number) ve
`since` (Date) alanları olsun.

Her ikisinden birer nesne oluştur ve `console.log` ile bas.

---

## Egzersiz 2 — structural typing'i kendi gözünle gör

`HasId` adında sadece `id: number` içeren bir interface tanımla.

`printId(entity: HasId): void` fonksiyonu yaz, `id`'yi konsola bassın.

Sonra:
- Egzersiz 1'deki `Customer` nesnesini bu fonksiyona geçir.
- Hiçbir interface'e bağlı olmayan `const order = { id: 99, total: 250 }` nesnesi oluştur,
  onu da geçir.

İkisinin de derlendiğini gör. Sonra dosyaya bir yorum satırı ekle:
C# olsaydı bunun çalışması için ne yapman gerekirdi?

**Bonus:** `printId({ id: 1, total: 250 })` şeklinde nesneyi doğrudan literal olarak
geçmeyi dene. Beklediğin gibi mi davrandı? Gözlemini yorum satırı olarak yaz.

---

## Egzersiz 3 — `type`'ın interface ile yapılamayan işleri

Aşağıdakileri `type` ile tanımla:

1. `ProductId` — `number`'a takma ad
2. `Money` — `{ amount: number; currency: string }` şeklinde bir nesne
3. `DiscountCalculator` — `(price: Money, rate: number) => Money` imzalı bir fonksiyon tipi

Sonra:
- `ProductId` ve `Money` kullanan bir `Product` tanımla (`id`, `name`, `price`).
- `DiscountCalculator` tipinde `applyDiscount` adında bir fonksiyon yaz
  (`type` ile tanımladığın tipi fonksiyona ata, parametrelere tekrar tip yazma).
- Bir `Product` oluştur, indirimli fiyatını hesaplayıp bas.

---

## Egzersiz 4 — birleştirme: `extends` ve `&`

`Timestamps` adında bir tip tanımla: `createdAt` ve `updatedAt` (ikisi de `Date`).

Aynı sonuca **iki farklı yoldan** ulaş:

1. `AuditedProduct` — `interface` + `extends` kullanarak (`Product` + `Timestamps`)
2. `AuditedCustomer` — `type` + `&` (intersection) kullanarak (`Customer` + `Timestamps`)

Her ikisinden birer nesne oluştur ve bas.

Dosyanın sonuna yorum satırı olarak yaz: Bu iki yoldan hangisini tercih edersin, neden?
