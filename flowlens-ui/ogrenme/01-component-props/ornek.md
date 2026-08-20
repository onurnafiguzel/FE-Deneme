# 01 — Ek: "Nereye ne yazacağım?"

`interface` kısmın doğru. Takıldığın yer JSX'in **mekaniği**. Onu FlowLens'le
ilgisi olmayan başka bir örnek üstünden gösteriyorum — sonra aynı kalıbı
`EndpointCard`'a kendin uygularsın.

---

## 1. Bir component dosyasının 4 parçası

```tsx
// (1) import — kullandığın tipleri/ component'leri getir
import type { HttpMethod } from '../data/mockGraph'

// (2) props tipi — dışarıdan gelen DTO
interface CommitCardProps {
  hash: string
  author: string
  message: string
  filesChanged: number
}

// (3) component — props alan, JSX döndüren fonksiyon
export function CommitCard({ hash, author, message, filesChanged }: CommitCardProps) {
  // (3a) return'den ÖNCE normal JavaScript yazabilirsin
  const kisaHash = hash.slice(0, 7)
  const renk = filesChanged > 10 ? 'bg-red-700' : 'bg-slate-700'

  // (3b) return içi = JSX
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-center gap-3">
        <span className={`rounded px-2 py-0.5 text-xs font-bold text-slate-100 ${renk}`}>
          {kisaHash}
        </span>
        <span className="font-mono text-sm text-slate-100">{message}</span>
      </div>
      <p className="mt-2 text-xs text-slate-400">{author}</p>
      <p className="mt-1 font-mono text-[11px] text-slate-500">
        {filesChanged} dosya değişti
      </p>
    </div>
  )
}
```

Kullanımı (`App.tsx` içinde):

```tsx
<CommitCard hash="a1b2c3d4e5" author="USER" message="fix login" filesChanged={3} />
```

Dikkat: `filesChanged={3}` — sayı `{}` içinde. String olsaydı `author="USER"`
gibi tırnakla da yazılabilirdi. `{}` = "buradan sonrası JavaScript".

---

## 2. Tailwind class'ları nereye yazılıyor?

Her class satırı **bir HTML elementinin `className` attribute'una** gider.
Başka hiçbir yere değil. CSS dosyası açmıyorsun, `<style>` yazmıyorsun.

```tsx
<div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      ^^^^^^^^^ ^ buraya, tek bir string olarak
```

Sabit class → çift tırnak: `className="p-4 text-sm"`
Değişken karışıyorsa → süslü parantez + backtick:
`className={`p-4 text-sm ${renk}`}`

`gorev.md`'deki class listesi aslında sana **hangi elementlerin olacağını**
söylüyor. 6 satır class var → 6 element var.

---

## 3. `EndpointCard`'ın yapı ağacı

Kodunu vermiyorum ama iskeleti şu şekilde — sen JSX'e çevir:

```
div            <- "dış kart" class'ı
├── div        <- "üst satır" class'ı (method ve path'i yan yana dizer)
│   ├── span   <- "method rozeti" class'ı, içeriği: method
│   └── span   <- "path" class'ı, içeriği: path
├── p          <- "modül" class'ı, içeriği: module
└── p          <- "dosya yolu" class'ı, içeriği: filePath
```

"içeriği: method" demek → açılış ve kapanış tag'i arasına `{method}` yazacaksın.

---

## 4. `App.tsx` tarafı

```tsx
import { endpoints } from './data/mockGraph'
import { EndpointCard } from './components/EndpointCard'
```

Sonra `endpoints[0]`'ın alanlarını tek tek prop olarak geçireceksin:

```tsx
<EndpointCard method={endpoints[0].method} path={endpoints[0].path} ... />
```

(Daha kısa yolu var ama şimdilik uzun hâlini yaz — prop geçmenin ne olduğu
otursun.)

---

## 5. Dosyandaki iki küçük şey

1. `interface EndpointCadProps` → isimde harf eksik. TypeScript şikâyet etmez
   (o da geçerli bir isim), ama sen sonra `EndpointCardProps` diye arayacaksın.
2. `export {}` satırı — o benim koyduğum "bu dosya bir modüldür" dolgusuydu.
   Gerçek bir `export` yazdığın anda gereksiz, sil.

Ayrıca `interface` gövdesinden sonraki `;` gereksiz, alanları ayırmak için
virgül yerine noktalı virgül veya satır sonu daha yaygın:

```ts
interface X {
  a: string
  b: number
}
```

---

Şimdi Görev 1'i dene. Takılırsan hangi satırda ne hata aldığını söyle.
