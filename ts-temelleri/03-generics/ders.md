# 03 — Generic'ler

Bu konu sana en tanıdık gelecek olanı. Temel fikir C# ile birebir aynı: **tipi parametre
olarak almak**. Sözdizimi bile neredeyse aynı.

```csharp
public T First<T>(List<T> items) => items[0];
```

```ts
function first<T>(items: T[]): T { return items[0]!; }
```

## Çağırırken tipi yazmana gerek yok

```ts
const p = first([{ id: 1 }, { id: 2 }]);   // T otomatik {id:number} oldu
const n = first<number>([1, 2, 3]);         // istersen açıkça yazabilirsin
```

C#'ta method generic'lerinde bu çıkarım zaten vardı ama generic **class**'larda yoktu
(`new List<Product>()` yazmak zorundaydın). TS'te fonksiyonlarda çıkarım çok daha ileri
gider — genelde hiç yazmazsın.

## Generic tipler (C#'taki generic class/interface)

```ts
type ApiResponse<T> = {
  data: T;
  success: boolean;
  timestamp: Date;
};

type ProductResponse = ApiResponse<Product>;      // C#: ApiResponse<Product>
type ProductListResponse = ApiResponse<Product[]>;
```

## Constraint: `extends` = C#'taki `where`

```csharp
public T GetById<T>(List<T> items, int id) where T : IHasId { ... }
```

```ts
function getById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find(x => x.id === id);
}
```

`extends` burada "miras alır" demek değil, "**şu şekle uymalı**" demek. Structural typing
gereği `IHasId` diye bir interface tanımlamana bile gerek yok — şekli inline yazdın.

| C# `where` | TS karşılığı |
|---|---|
| `where T : IHasId` | `<T extends { id: number }>` |
| `where T : class` | `<T extends object>` |
| `where T : new()` | **yok** (aşağıya bak) |
| `where T : struct` | yok, gerek de yok |

## `keyof`: bir tipin alan isimleri de bir union'dır

```ts
type Product = { id: number; name: string; price: number };
type ProductKey = keyof Product;    // "id" | "name" | "price"  — konu 02'deki literal union
```

Bunu constraint olarak kullanmak çok yaygın:

```ts
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

pluck(products, "name");   // string[] döner
pluck(products, "price");  // number[] döner
pluck(products, "stock");  // ❌ "stock" Product'ta yok — derleme hatası
```

`T[K]` = "T'nin K alanının tipi". C#'ta bunu ancak `Expression<Func<T, object>>` ve
reflection ile yapabilirdin, hem de dönüş tipi `object` olurdu. Burada dönüş tipi doğru
çıkıyor.

## En önemli fark: generic'ler runtime'da yok

TS'in tipleri derlemede silinir. `T` çalışma zamanında hiçbir yerde yoktur.

```ts
function create<T>(): T {
  return new T();      // ❌ imkânsız, T diye bir şey runtime'da yok
}
```

C#'ta `where T : new()`, `typeof(T)`, `Activator.CreateInstance<T>()` yapabiliyordun —
çünkü .NET generic'leri **reified**, tip bilgisi runtime'da duruyor. TS'te yok. Bir şey
üretmesi gerekiyorsa factory'yi parametre olarak alırsın:

```ts
function create<T>(factory: () => T): T { return factory(); }
```

Pratikte bu kısıt seni React'te pek zorlamaz — generic'leri çoğunlukla veri şekli taşımak
için kullanacaksın, nesne üretmek için değil.
