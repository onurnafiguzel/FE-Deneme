# 01 — Component, Props ve JSX Kuralları

## Component nedir?

React component'i = **props alan, UI döndüren saf bir fonksiyon**.

```tsx
function Baslik(props: { text: string }) {
  return <h1>{props.text}</h1>
}
```

Backend karşılığı: bir component, `Render(dto)` imzalı bir metot gibidir.
`props` = **DTO / constructor parametresi**. Dışarıdan verilir, içeride
**değiştirilmez** (readonly). C#'ta `record OrderDto(string Path, string Method)`
nasıl immutable ise, props de öyledir. `props.method = "POST"` yazmak yasaktır —
React bunu fark etmez, ekran güncellenmez, sadece kafan karışır.

Component ismi **büyük harfle** başlamak zorunda. Küçük harfle başlarsa React
onu HTML tag'i sanar (`<div>` gibi). Bu bir stil tercihi değil, JSX derleyicisinin
kuralı.

## JSX nedir?

JSX HTML değil — **JavaScript ifadesine derlenen bir syntax**. Bu:

```tsx
<span className="text-sm">{endpoint.path}</span>
```

şuna derlenir:

```js
React.createElement('span', { className: 'text-sm' }, endpoint.path)
```

Buradan üç kural doğrudan çıkar:

1. **`className`, `class` değil.** `class` JavaScript'te ayrılmış kelime.
   Aynı sebeple `for` → `htmlFor`. Attribute'lar aslında bir JS objesinin
   alanları, HTML attribute'u değil. Bu yüzden `camelCase` (`onClick`, `tabIndex`).

2. **Tek bir kök element döndürmelisin.** Fonksiyon tek değer döndürür;
   iki kardeş element iki değer demektir. Ekstra `<div>` istemiyorsan
   **Fragment** kullan: `<>...</>`. Bu DOM'a hiçbir şey basmaz.

3. **`{}` içine _ifade_ (expression) yazılır, _statement_ değil.**
   Çünkü içerik `createElement`'a argüman olarak gidiyor — argüman bir değer
   olmak zorunda. `{if (x) {...}}` çalışmaz. `{x ? a : b}`, `{arr.map(...)}`,
   `{"GET " + path}` çalışır. C#'taki `$"{expr}"` string interpolation'a benzet:
   oraya da `if` yazamazsın.

## Props'u okumanın iki yolu

```tsx
// 1) props objesi
function EndpointCard(props: EndpointCardProps) {
  return <div>{props.path}</div>
}

// 2) destructuring (tercih edilen)
function EndpointCard({ path, method }: EndpointCardProps) {
  return <div>{method} {path}</div>
}
```

İkincisi zaten bildiğin object destructuring. Fazladan React sihri yok.

## Tipleme

Props tipini normal bir `interface` ile yaz — `React.FC` kullanma, gereksiz:

```tsx
interface EndpointCardProps {
  method: HttpMethod
  path: string
  module: string
}
```

`mockGraph.ts` içindeki `HttpMethod` gibi union type'ları kullan; `string`
yazarsan derleyici sana yardım edemez.

## Küçük tuzaklar

- `{false}`, `{null}`, `{undefined}` ekrana **hiçbir şey** basmaz — koşullu
  render bunun üstüne kurulu (konu 05).
- `{0}` ekrana **`0`** basar. `{count && <X/>}` yazarsan `count === 0` iken
  ekranda `0` görürsün. Klasik hata.
- JSX içindeki yorum: `{/* böyle */}`.
