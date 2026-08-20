# 03 — `useState`

## Problem

Props yukarıdan gelir ve component onu değiştiremez. Ama arama kutusuna yazınca
ekranın değişmesi lazım. Değişen bu değer nerede duracak?

Sıradan bir değişken işe yaramaz:

```tsx
let query = ""            // her render'da sıfırlanır
query = "orders"          // React'in haberi olmaz, ekran yeniden çizilmez
```

İki ayrı eksik var: **değerin render'lar arası yaşaması** ve **React'in
değişimden haberdar olması**. `useState` ikisini birden çözer.

## Kullanımı

```tsx
const [query, setQuery] = useState("")
```

Bu zaten bildiğin **array destructuring**. `useState` iki elemanlı bir dizi
döndürür: güncel değer ve onu değiştiren fonksiyon. İsimler sana kalmış,
`[x, setX]` yaygın kalıp.

## Render nedir?

React bir şey değiştiğinde component fonksiyonunu **baştan çağırır**. Yani
`EndpointCard(...)` yeniden çalışır, yeni bir JSX ağacı döner, React eskisiyle
karşılaştırıp farkı DOM'a yazar.

`setQuery("orders")` çağırdığında olan şey: React değeri kutusuna yazar ve
"bu component'i yeniden çalıştırmam gerekiyor" diye not alır. Bir sonraki
render'da `useState` sana yeni değeri döndürür.

Buradan çok kritik bir sonuç çıkıyor:

```tsx
setQuery("orders")
console.log(query)   // hâlâ "" — eski değer
```

`query` bir `const`. O render'ın **fotoğrafı**. Yeni değeri o fonksiyonun içinde
göremezsin, çünkü yeni değer bir sonraki çağrının içinde var. React'te "state
güncellemesi anında değil" derken kastedilen bu.

## Neden mutate edilmiyor?

React bir state'in değişip değişmediğini **referans karşılaştırmasıyla** anlar
(`Object.is`). Alan alan karşılaştırma yapmaz — büyük ağaçlarda pahalı olurdu.

```tsx
items.push(x)        // referans aynı → React "değişmedi" der → render yok
setItems([...items, x])   // yeni referans → değişti → render var
```

Backend karşılığı: C# `record`'un `with` ifadesi. Nesneyi değiştirmiyorsun,
değiştirilmiş bir kopyasını üretip yerine koyuyorsun. Aynı disiplin.

## Hook kuralları

`useState` bir **hook**. İki kuralı var:

1. Component'in **en üst seviyesinde** çağrılır — `if`, döngü veya iç fonksiyon
   içinde değil.
2. Sadece component'lerde (veya başka hook'ların içinde) çağrılır.

Nedeni ezber değil: React hook'ları isme göre değil, **çağrılma sırasına göre**
saklar. İlk `useState` → 0 numaralı kutu, ikincisi → 1 numaralı kutu. Koşula
bağlarsan sıra kayar ve bir sonraki render'da yanlış kutudan okursun.

## Türetilmiş değeri state'te tutma

En sık yapılan tasarım hatası:

```tsx
const [query, setQuery] = useState("")
const [filtered, setFiltered] = useState(endpoints)   // ✗ ikinci bir gerçek kaynağı
```

`filtered`, `query` + `endpoints`'ten **hesaplanabilir**. State'te tutarsan
ikisini elle senkron tutmak zorunda kalırsın; bir yerde unutursun, ekran
tutarsız kalır. Doğrusu render sırasında hesaplamak:

```tsx
const filtered = endpoints.filter(...)   // ✓ her render'da taze
```

Kural: **state, başka hiçbir şeyden türetilemeyen minimum bilgi olmalı.**
Backend karşılığı: veritabanında hem `Total` hem `Lines` tutup `Total`'ı elle
güncellemeye çalışmak yerine, `Lines`'tan hesaplamak.
