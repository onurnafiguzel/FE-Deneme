# 07 — Type narrowing: typeof, in, instanceof, type guard

**Narrowing**, TS'in kodun akışını takip ederek bir değişkenin tipini o satırda
daraltmasıdır. C#'taki pattern matching'in karşılığı — ama önemli bir farkla:

```csharp
if (shape is Product p) { p.Name }     // YENİ bir değişken (p) doğuyor
```

```ts
if (typeof id === "string") { id.toUpperCase() }   // AYNI değişkenin tipi daralıyor
```

C#'ta cast edip yeni bir isim alıyordun; TS'te `id` o blok içinde zaten `string`.

## 1. `typeof` — primitive'ler için

```ts
function format(value: string | number | boolean) {
  if (typeof value === "string") return value.toUpperCase();
  if (typeof value === "number") return value.toFixed(2);
  return value ? "evet" : "hayır";     // burada boolean
}
```

`typeof` sadece şunları döndürür: `"string"`, `"number"`, `"boolean"`, `"bigint"`,
`"symbol"`, `"undefined"`, `"object"`, `"function"`.

> **JS'in meşhur bug'ı:** `typeof null === "object"`. Yani `typeof x === "object"`
> kontrolü null'ı da yakalar. Nesne kontrolü yapıyorsan `x !== null` de ekle.

## 2. Truthiness — `if (x)`

```ts
if (found) { found.name }    // undefined'ı eler
```

Kısa ve yaygın, ama konu 04'teki tuzağın aynısı: `0` ve `""` de falsy'dir.

```ts
function log(count?: number) {
  if (count) { }            // ❌ count === 0 ise buraya girmez
  if (count !== undefined) { }   // ✅ doğrusu
}
```

Sayı ve string alanlarda `!== undefined` / `!= null` yaz, çıplak `if (x)` yazma.

## 3. `in` — alan varlığına göre daraltma

Discriminated union'ın (konu 02) `kind` alanı yoksa, alanın **kendisine** bakarsın:

```ts
type IndividualCustomer = { name: string; tckn: string };
type CorporateCustomer  = { name: string; taxNumber: string; companyName: string };

function describe(c: IndividualCustomer | CorporateCustomer) {
  if ("taxNumber" in c) {
    return c.companyName;    // burada CorporateCustomer
  }
  return c.tckn;             // burada IndividualCustomer
}
```

C#'ta bunun karşılığı yok — orada ortak bir base type ve `is` kontrolü gerekirdi.
Yine de mümkünse `kind` alanı ekleyip discriminated union kullan, `in` daha kırılgan.

## 4. `instanceof` — sadece class'lar için

```ts
function formatDate(value: Date | string) {
  if (value instanceof Date) return value.toISOString();
  return value;
}
```

`instanceof` runtime'da prototip zincirine bakar. Yani **sadece gerçekten runtime'da var
olan şeylerde** çalışır: `Date`, `Error`, `Map`, kendi `class`'ların.

```ts
type Product = { id: number };
if (x instanceof Product) { }   // ❌ 'Product' only refers to a type
```

`type`/`interface` derlemede silinir, runtime'da öyle bir şey yoktur. C#'ta her tip
runtime'da durduğu için `is` her yerde çalışıyordu; burada çalışmaz.

## 5. Type guard fonksiyonları — `x is T`

Kontrolü kendin yazıp **derleyiciye öğretirsin**:

```ts
function isProduct(value: unknown): value is Product {
  return (
    typeof value === "object" && value !== null &&
    "id" in value && typeof value.id === "number" &&
    "name" in value && typeof value.name === "string"
  );
}

const data: unknown = JSON.parse(raw);
if (isProduct(data)) {
  data.name;      // artık Product
}
```

Dönüş tipi `boolean` değil, `value is Product`. Bu TS'e "bu fonksiyon `true` dönerse
argümanı `Product` say" der. C#'taki `bool TryGetProduct(object o, out Product p)`
kalıbının yerini tutuyor, ama `out` parametresi olmadan.

> **Sorumluluk sende:** TS gövdeyi doğrulamaz. `return true;` yazsan da kabul eder.
> `!` gibi bu da bir söz — yanlış yazarsan runtime'da patlar.

## `unknown` — API sınırında doğru tip

`fetch`, `JSON.parse` gibi yerlerden gelen veri `any` değil `unknown` olmalı. `any` her
şeye izin verir ve tip kontrolünü tamamen kapatır; `unknown` ise daraltmadan **hiçbir şey**
yapmana izin vermez. Dış dünyadan gelen veriyi `unknown` alıp type guard ile içeri sok.
