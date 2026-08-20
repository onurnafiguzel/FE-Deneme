# 02b — Tekrar Egzersizi

Yeni kavram yok. Sadece 01-02'de gördüklerin: props ekleme, JSX yapısı,
component içinde component, `map` + `key`.

Her görevden sonra `npm run dev` ile bak — küçük adım, hemen doğrula.

---

## Görev 1 — `EndpointCard`'a `handler` alanını ekle

Dosya: `src/components/EndpointCard.tsx`

`EndpointSummary`'de `handler` diye bir alan var (`"OrdersController.CreateOrder"`
gibi). Kart bunu göstermiyor. Ekle.

Üç adım:
1. `EndpointCardProps`'a `handler: string` ekle
2. Destructuring'e `handler` ekle
3. `filePath` satırının **altına** kardeş bir `<p>` daha koy

Class:

```
mt-1 font-mono text-[11px] text-slate-400
```

**Ekledikten sonra dikkat et:** `EndpointList` veya `App.tsx`'te hiçbir şey
değiştirmen gerekmedi. Neden? Cevabı `{...e}` spread'inde. Bunu bir düşün.

---

## Görev 2 — `ModuleBadge` component'i

Dosya: `src/components/ModuleBadge.tsx` (iskelet hazır)

Modül adını renkli bir rozet olarak gösteren küçük bir component.

**Props:** `module: string`

**Döndüreceği:** tek bir `<span>`, içinde `{module}`.

Rengi modüle göre seç. `EndpointCard`'daki `switch` yerine bu sefer **lookup
objesi** kullan — sana 01'in review'unda bahsettiğim yapı:

```ts
const COLOURS: Record<string, string> = {
  Orders: "bg-indigo-800",
  Payments: "bg-teal-800",
  Catalog: "bg-fuchsia-800",
  Identity: "bg-cyan-800",
  Shipping: "bg-orange-800",
  Notifications: "bg-lime-800",
}
```

Bu objeyi component'in **dışına**, dosyanın üstüne koy — her render'da yeniden
kurulmasına gerek yok. Sonra `COLOURS[module]` ile oku.

`className` şablon literali:

```tsx
className={`rounded px-2 py-0.5 text-xs ${...}`}
```

**Uyarı:** `COLOURS[module]` için TypeScript **hata vermez** — `module` herhangi
bir `string` olabilir ve objede o anahtar olmayabilir, ama `Record<string, string>`
indeksleme sonucunu `string` sayar. Yani risk derleme zamanında görünmez:
tanımsız bir modül gelirse `undefined` döner ve `className` bozulur.
Bir varsayılan renk koy (`?? "bg-slate-700"` gibi).

---

## Görev 3 — `ModuleBadge`'i karta yerleştir

`EndpointCard` içinde, şu an `module`'ü düz yazı olarak basan `<p>`'yi
`<ModuleBadge module={module} />` ile değiştir.

Burada olan şey **component composition**: bir component başka bir component'i
kullanıyor. `EndpointList` → `EndpointCard` → `ModuleBadge`. Backend'de
servisin başka bir servisi çağırması gibi; her katman kendi işini biliyor.

---

## Görev 4 — Sadece Orders endpoint'leri

Dosya: `src/App.tsx`

Mevcut listenin **altına** ikinci bir bölüm ekle: başlık + yalnızca `Orders`
modülüne ait endpoint'leri gösteren bir `EndpointList`.

`EndpointList`'i değiştirme — ona hangi diziyi geçtiğin senin elinde. Diziyi
`filter` ile daralt (`map` gibi, aynı ailedendir).

Başlık için:

```
<h2 className="mt-8 mb-3 text-lg font-semibold">Orders</h2>
```

---

Bitince **"tekrar bitti"** de. Sonra 03 (`useState`) — orada bu filtreleme
sabit olmaktan çıkıp arama kutusuna bağlanacak.
