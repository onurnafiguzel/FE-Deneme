# 01 — `type` vs `interface`

## Önce en önemli fark: TS nominal değil, **structural** typing kullanır

C#'ta bir sınıf bir interface'i **ismen** implement etmek zorundadır:

```csharp
public interface IHasId { int Id { get; } }
public class Product : IHasId { public int Id { get; set; } }  // ": IHasId" şart
```

TypeScript'te böyle bir bağ yok. Bir tip, **şekli uyuyorsa** o interface'i karşılar:

```ts
interface HasId { id: number }

const product = { id: 1, name: "Klavye" };   // hiçbir yerde HasId demedik
function log(x: HasId) { console.log(x.id); }
log(product);                                 // ✅ derlenir — şekli uyuyor
```

Bunu içselleştir: TS'te interface bir **sözleşme etiketi** değil, bir **şekil tarifi**.
C# alışkanlığıyla "önce interface'i implement etmeliyim" diye düşünme.

## `interface` — nesne şekli tarif eder

```ts
interface Customer {
  id: number;
  name: string;
  email: string;
}

interface VipCustomer extends Customer {   // C#'taki interface inheritance ile aynı
  discountRate: number;
}
```

## `type` — herhangi bir tipe isim verir

`type` sadece nesne şekli değil, **her şeye** isim verebilir:

```ts
type OrderId = number;                          // primitive'e takma ad (C#: yok, en yakını struct wrapper)
type OrderStatus = "pending" | "shipped";       // union — C#'ta karşılığı yok (konu 02)
type Coordinates = [number, number];            // tuple — C#: (double, double)
type PriceFormatter = (amount: number) => string; // C#: Func<decimal, string> / delegate
type Order = { id: OrderId; total: number };    // nesne şekli de tarif edebilir
```

Nesne şekillerini birleştirmek için `extends` yerine `&` (intersection) kullanılır:

```ts
type Timestamps = { createdAt: Date; updatedAt: Date };
type AuditedOrder = Order & Timestamps;   // C#: iki interface'i birden implement etmek gibi
```

## Peki hangisini ne zaman?

| Durum | Seçim |
|---|---|
| Nesne şekli (Product, Order, props) | `interface` |
| Union / literal (`"a" \| "b"`) | `type` (interface yapamaz) |
| Primitive'e takma ad | `type` |
| Tuple | `type` |
| Fonksiyon tipi | `type` |
| İki şekli birleştirme | ikisi de: `extends` veya `&` |

**Pratik kural:** Nesne şekli tarif ediyorsan `interface`, geri kalan her şeyde `type`.
Bu React'te de böyle işler — component props genelde `interface`, id/status/callback tipleri `type`.

Karar veremediğin durumda ikisi de çalışır ve hata vermez. Bu konu bir "doğru/yanlış"
meselesinden çok tutarlılık meselesi — takım içinde aynı kuralı uygulamak yeterli.
