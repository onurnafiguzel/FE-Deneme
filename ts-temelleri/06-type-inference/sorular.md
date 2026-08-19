# 06 — Egzersizler

`cozum.ts` içine yaz. Çalıştırma: `npm run 06` — Tip kontrolü: `npm run check`

Bu konunun egzersizleri biraz farklı: çoğunda **kod yazmak yerine IDE'de tipin üzerine
gelip ne çıkarıldığını okuyacaksın.** Amaç, ne zaman yazmana gerek olmadığını görmek.

Başlangıç tipi:

```
Product -> id: number, name: string, price: number, stock: number
```

`products` dizisi hazırla (en az 3 ürün, `Product[]` olarak tiple).

---

## Egzersiz 1 — çıkarılan tipleri oku

Aşağıdaki satırları **hiç tip yazmadan** oluştur ve her birinin yanına TS'in ne çıkardığını
yorum olarak yaz (IDE'de üzerine gel):

```
const total          = 1000
const label          = "klavye"
const isActive       = true
const names          = products.map(p => p.name)
const cheap          = products.filter(p => p.price < 100)
const found          = products.find(p => p.id === 1)
const sum            = products.reduce((acc, p) => acc + p.price, 0)
const emptyList      = []
const mixed          = [1, "a", true]
const firstName      = products[0].name
```

İkisi seni şaşırtacak. Hangileri ve neden? Yorum satırı olarak yaz.

`map`/`filter`/`find` içindeki `p`'ye hiç tip yazmadığına dikkat et — nereden biliyor?

---

## Egzersiz 2 — `const` / `let` farkı ve widening

Şunları yaz ve çıkarılan tipleri yorum olarak not et:

```
const statusConst = "pending"
let   statusLet   = "pending"
```

`OrderStatus` tipini tanımla (`"pending" | "paid" | "shipped"`) ve
`setStatus(status: OrderStatus): void` fonksiyonu yaz (durumu bassın).

`setStatus(statusConst)` ve `setStatus(statusLet)` çağır. Biri hata verecek — hatayı yorum
satırına kopyala ve **neden** sadece birinin hata verdiğini açıkla.

Sonra hatayı, `setStatus`'a veya `OrderStatus`'a dokunmadan düzelt.

---

## Egzersiz 3 — dönüş tipi yazmanın faydası

İki fonksiyon yaz, ikisi de aynı gövdeye sahip olsun:

```
products.find(p => p.id === id)?.name
```

- `findNameLoose(products, id)` — dönüş tipi **yazma**
- `findNameStrict(products, id): string` — dönüş tipini **yaz**

Hangisi derleme hatası verdi? Hatayı yorum satırına kopyala.

Sonra şu satırı ekle:

```
findNameLoose(products, 999).toUpperCase()
```

Bu da hata veriyor. İki hatayı karşılaştır: **hangisi problemi daha erken ve daha doğru
yerde yakaladı?** Yorum satırı olarak yaz.

Son olarak `findNameStrict`'i gerçekten derlenecek hale getir (dönüş tipini `string`
bırakarak).

---

## Egzersiz 4 — fazla anotasyonları temizle

Aşağıdaki fonksiyonu `cozum.ts`'e olduğu gibi kopyala, sonra **gereksiz olan her
anotasyonu sil**. Kod hâlâ derlenmeli ve davranışı değişmemeli.

```ts
function summarize(products: Product[], minPrice: number): string {
    const expensive: Product[] = products.filter((p: Product): boolean => p.price > minPrice);
    const names: string[] = expensive.map((p: Product): string => p.name);
    const count: number = names.length;
    const text: string = names.join(", ");
    return `${count} urun: ${text}`;
}
```

Kaç anotasyon kaldı? Kalanların her biri için neden gerekli olduğunu yorum satırı olarak
yaz.

Temizlenmiş fonksiyonu çağırıp sonucu bas.
