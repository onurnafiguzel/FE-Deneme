# 05 — Utility type'lar: Partial, Pick, Omit, Record, Required

Bunlar TS'in hazır gelen generic tipleri. Hepsinin ortak fikri şu: **tek bir kaynak tipten
türev tipler üretmek.**

C#'ta bu problemi biliyorsun. Bir `Product` entity'n var, yanına elle yazdığın:

```csharp
public class ProductCreateDto { ... }   // Id yok
public class ProductUpdateDto { ... }   // hepsi nullable
public class ProductListDto   { ... }   // sadece 2-3 alan
```

Dört sınıf, dört yerde bakım. `Product`'a alan eklediğinde diğerlerini güncellemeyi
unutursun (ya da AutoMapper runtime'da patlar). TS'te bunları **türetirsin**, kaynak
değişince hepsi kendiliğinden değişir.

Örnek tip:

```ts
type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};
```

## `Omit<T, K>` — alan çıkar

```ts
type CreateProductDto = Omit<Product, "id">;   // id hariç hepsi
```

## `Pick<T, K>` — alan seç

```ts
type ProductListItem = Pick<Product, "id" | "name">;   // sadece bu ikisi
```

`Pick` ile `Omit` birbirinin tersi. Pratik kural: 1-2 alan atıyorsan `Omit`, 1-2 alan
alıyorsan `Pick`.

> **Tuzak:** `Pick<Product, "typo">` derleme hatası verir, ama `Omit<Product, "typo">`
> **vermez** — sessizce hiçbir şey çıkarmaz. Omit'te alan adını yanlış yazarsan fark
> etmezsin.

## `Partial<T>` — her alanı optional yap

```ts
type UpdateProductDto = Partial<Product>;
// { id?: number; name?: string; price?: number; stock?: number }
```

Bu tam olarak HTTP PATCH senaryosu: "sadece gönderdiğim alanları güncelle".

```ts
function patchProduct(product: Product, changes: Partial<Product>): Product {
  return { ...product, ...changes };
}

patchProduct(p, { price: 999 });   // sadece fiyat değişir
```

C#'ta bunu `JsonPatchDocument<T>` ya da tüm alanları nullable bir DTO ile yapıyordun.
Burada tek kelime.

## `Required<T>` — Partial'ın tersi, her alanı zorunlu yap

Genelde "optional alanlarla gelen config'i, varsayılanları doldurup eksiksiz hale
getirmek" için kullanılır:

```ts
type Options = { pageSize?: number; sortBy?: string };

function withDefaults(options: Options): Required<Options> {
  return { pageSize: options.pageSize ?? 20, sortBy: options.sortBy ?? "name" };
}
```

Dönüş tipi `Required<Options>` olduğu için çağıran taraf artık `?.` yazmak zorunda değil —
alanların dolu olduğu tipte garanti.

## `Record<K, V>` — anahtar/değer eşlemesi

```ts
type Prices = Record<string, number>;    // C#: Dictionary<string, decimal>
```

Asıl gücü anahtarın bir **literal union** olduğunda ortaya çıkıyor (konu 02):

```ts
type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

const statusLabels: Record<OrderStatus, string> = {
  pending: "bekliyor",
  paid: "ödendi",
  shipped: "kargoda",
  cancelled: "iptal edildi",
};

statusLabels["pending"];   // string, undefined kontrolü gerekmiyor
```

Bir durumu yazmayı unutursan **derleme hatası** alırsın; olmayan bir anahtar yazarsan da
öyle. `Dictionary<OrderStatus, string>` bunu yapamazdı — orada eksik anahtarı ancak
runtime'da `KeyNotFoundException` ile öğrenirdin.

Konu 02'deki `switch`'in yerine çoğu zaman bu geçer: daha kısa ve aynı exhaustiveness
garantisini verir.
