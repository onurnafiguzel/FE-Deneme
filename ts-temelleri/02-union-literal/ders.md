# 02 — Union ve literal type'lar, discriminated union

## Union: "şunlardan biri"

```ts
type ProductId = number | string;   // ya number ya string
```

C#'ta bunun karşılığı **yok**. En yakını `object` alıp cast etmek ya da `OneOf` gibi
üçüncü parti bir kütüphane. TS'te ise birinci sınıf bir dil özelliği ve her yerde kullanılıyor.

Kritik kural: bir union üzerinde **sadece tüm üyelerde ortak olan** şeyleri yapabilirsin.

```ts
function show(id: number | string) {
  console.log(id.toUpperCase());  // ❌ number'da toUpperCase yok
  console.log(id.toString());     // ✅ ikisinde de var
}
```

Tek bir üyeye özel işlem yapmak için önce daralt (konu 07):

```ts
if (typeof id === "string") { id.toUpperCase(); }   // burada id artık sadece string
```

## Literal type: değerin kendisi bir tip

TS'te bir tip tek bir değeri de temsil edebilir:

```ts
type Pending = "pending";           // sadece "pending" string'i, başka hiçbir şey
let s: Pending = "pending";         // ✅
let t: Pending = "paid";            // ❌
```

Tek başına faydasız — union ile birleşince güçlü:

```ts
type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";
```

C#'ta bunu `enum OrderStatus { Pending, Paid, ... }` diye yazardın. Farkları:

| | C# enum | TS literal union |
|---|---|---|
| Runtime'da var mı | Evet, gerçek bir tip | Hayır, derlemede silinir — geriye düz string kalır |
| Değeri | Altta `int` | String'in kendisi |
| JSON'a giderken | Dönüştürme gerekir | Zaten string, doğrudan gider |

Son satır önemli: API'den `{"status": "shipped"}` geliyorsa TS'te ek bir çevirme
katmanına ihtiyacın yok. React'te de prop'lar böyle yazılır: `variant="primary" | "danger"`.

## Discriminated union: union'ın asıl kullanıldığı yer

Her üyeye ortak isimli, farklı literal değerli bir **ayırt edici alan** koyarsın:

```ts
type PaymentResult =
  | { kind: "success"; transactionId: string }
  | { kind: "failure"; reason: string }
  | { kind: "pending" };
```

`kind` alanına bakan bir `switch`, TS'e hangi üyede olduğunu söyler ve o üyeye özel
alanlar açılır:

```ts
function describe(r: PaymentResult): string {
  switch (r.kind) {
    case "success": return `OK: ${r.transactionId}`;  // burada reason'a erişemezsin
    case "failure": return `Hata: ${r.reason}`;       // burada transactionId yok
    case "pending": return "Bekliyor";
  }
}
```

C# karşılığı: abstract bir `PaymentResult` base class'ı, üç alt sınıf ve üzerinde
pattern matching `switch`. TS'te miras hiyerarşisi kurmadan aynı sonucu alıyorsun.

### Exhaustiveness — unutulan case'i derleyiciye yakalatmak

Union'a dördüncü bir üye eklediğinde onu işlemeyi unutursan derleyici uyarsın istersin.
Numara şu: `default` dalında değeri `never` tipine atamaya çalış.

```ts
default: {
  const _exhaustive: never = r;   // yeni üye eklenince burada hata çıkar
  return "bilinmeyen";
}
```

`never` "hiçbir değer alamayan tip" demek. Tüm case'ler işlendiyse `r`'nin tipi
`never`'a düşer ve atama geçer. Bir case unutulduysa `r` hâlâ o üyenin tipindedir ve
`never`'a atanamaz — hata. C#'ta bunu ancak `default: throw` ile **runtime'da**
yakalayabiliyordun; burada derlemede yakalıyorsun.
