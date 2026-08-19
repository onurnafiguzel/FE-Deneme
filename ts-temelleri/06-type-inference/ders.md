# 06 — Type inference: ne zaman tip yazmaya gerek yok

C#'ta `var` vardı ama sınırlıydı — sadece local değişkenlerde, hep sağ taraftan.
TS'in çıkarımı çok daha ileri gider: dönüş tipleri, callback parametreleri, generic
argümanlar, hepsi otomatik.

## Pratik kural

> **Fonksiyon parametrelerine tip yaz. Geri kalan her yerde TS'e bırak.**

Parametrelerin tipini TS bilemez (dışarıdan ne geleceğini bilmiyor) — hatta `strict`
altında yazmazsan hata alırsın:

```ts
function f(x) { }   // ❌ Parameter 'x' implicitly has an 'any' type.
```

Ama içeride yazdığın her şeyi zaten biliyor:

```ts
const total = 100;                          // number
const name = "klavye";                      // string
const items = products.map(p => p.name);    // string[]  — p bile otomatik Product
const found = products.find(p => p.id === 1);  // Product | undefined
```

Bunlara elle tip yazmak gürültüden başka bir şey değil. Hatta zararlı: kaynak değiştiğinde
elle yazdığın tip yalan söylemeye başlar.

## `const` ve `let` farklı çıkarılır

```ts
const a = "pending";   // tipi: "pending"   (literal — konu 02)
let   b = "pending";   // tipi: string
```

`const` bir daha değişemeyeceği için TS en dar tipi verir. `let` değişebileceği için
genişletir ("widening"). Bu, literal union'larla çalışırken tökezleten bir yerdir:

```ts
type OrderStatus = "pending" | "paid";
function setStatus(s: OrderStatus) {}

let status = "pending";
setStatus(status);   // ❌ Argument of type 'string' is not assignable to 'OrderStatus'
```

Çözüm: değişkeni tiplemek. `let status: OrderStatus = "pending";`

## Dönüş tipi: yazmasan da olur, ama yazmanın bir faydası var

```ts
function calculateTotal(items: Product[]) {
  return items.reduce((sum, p) => sum + p.price, 0);   // number olduğunu biliyor
}
```

Çoğu zaman yazmana gerek yok. Ama yazdığında hata **fonksiyonun içinde** yakalanır,
çağıran yerde değil:

```ts
function findName(products: Product[]): string {
  return products.find(p => p.id === 1)?.name;   // ❌ burada patlar: string | undefined
}
```

Anotasyon olmasaydı dönüş tipi sessizce `string | undefined` olurdu ve hatayı 3 dosya
ötede, `findName(...).toUpperCase()` yazarken alırdın. Bu yüzden **dışarıya açılan /
paylaşılan fonksiyonlarda dönüş tipi yazmak iyi bir alışkanlıktır**; dosya içi küçük
yardımcılarda gereksiz.

## Nesne ve dizi çıkarımı

```ts
const p = { id: 1, name: "klavye" };   // { id: number; name: string } — "Product" DEĞİL
const empty = [];                       // any[] — "evolving array", aşağıya bak
const mixed = [1, "a"];                 // (string | number)[]
```

Boş dizi özel bir durum: TS ona geçici olarak `any[]` verir ve sonraki `push`'lara bakarak
tipini **geliştirir** ("evolving array"). Hiç push edilmezse `any[]` kalır — yani
`strict` altında bile içine ne koyarsan koy kabul eden bir delik. Bu yüzden boş dizileri
daima tiple: `const empty: Product[] = []`.

> Dikkat: `[]` bir generic fonksiyona **argüman** olarak gittiğinde farklı davranır,
> orada `never[]` çıkarılır (konu 03'teki `first([])` bunun içindi). Aynı ifade,
> bulunduğu yere göre iki farklı tip alıyor.

`const p` bir `Product` değildir, sadece şekli uyar (konu 01: structural typing). Bir
fonksiyona `Product` olarak geçebilirsin ama `p.` yazdığında `Product`'ın diğer alanlarını
göremezsin.

## Nerede anotasyon şart

| Durum | Neden |
|---|---|
| Fonksiyon parametreleri | TS dışarıdan ne geleceğini bilemez |
| Boş dizi/nesne başlangıcı | `[]` → `never[]` olur, işe yaramaz |
| Literal union'a atanacak `let` | widening'i durdurmak için |
| Public API dönüş tipleri | hatayı tanımda yakalamak için |

Geri kalan her şeyde: yazma, TS zaten biliyor. Fazladan anotasyon, C#'tan gelenlerin en
sık yaptığı şey — kod kalabalıklaşır, faydası olmaz.
