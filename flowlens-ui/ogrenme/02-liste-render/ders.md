# 02 — Liste Render: `map` + `key`

## JSX bir dizi de kabul eder

`{}` içine tek bir element yazabildiğin gibi, **element dizisi** de yazabilirsin.
React diziyi açar, elemanları sırayla basar:

```tsx
<div>{[<span>a</span>, <span>b</span>]}</div>
```

Dolayısıyla listeyi render etmek için özel bir `foreach` sözdizimine gerek yok —
zaten bildiğin `Array.prototype.map` yeter:

```tsx
<div>
  {commits.map((c) => (
    <CommitCard key={c.hash} hash={c.hash} message={c.message} />
  ))}
</div>
```

Backend karşılığı: `commits.Select(c => new CommitCardDto(...))`. `map` de aynı
şey — girdi dizisini çıktı dizisine dönüştürür. `forEach` **kullanma**: o
`void` döner, JSX'e basacak bir şey kalmaz.

Ok fonksiyonunda gövdeyi `(...)` ile sararsan `return` yazmana gerek kalmaz.
`{...}` ile sararsan `return` yazmak zorundasın — klasik hata, boş ekran.

## Neden `key`?

React her render'da yeni JSX ağacını bir öncekiyle karşılaştırıp **farkı** DOM'a
uygular (reconciliation). Listede sorun şu: React 3 karttan oluşan eski listeyle
4 karttan oluşan yeni listeyi görür — hangi kart hangisine karşılık geliyor?

`key` bunun cevabı: **her elemanın kalıcı kimliği**. Backend karşılığı `Id`
alanı. `key` olmadan React konuma göre eşleştirmek zorunda kalır.

Somut sonuç: listenin başına yeni bir endpoint eklersen, konuma göre eşleşmede
React "1. eleman değişti, 2. eleman değişti, ..." diye **hepsini** günceller.
`key` varsa "yeni bir eleman eklendi, diğerleri aynı" der ve tek bir DOM
düğümü ekler.

Daha kötüsü: konum eşleşmesi state'i yanlış satıra taşır. Kartın içinde açık
bir detay paneli varsa (konu 03'ten sonra olacak), başa eleman eklendiğinde
panel yanlış kartta açık kalır. React DOM'u yeniden kullandığı için state
oraya yapışır.

## `key` seçme kuralı

- **Doğru:** veriden gelen kalıcı, benzersiz kimlik → `e.id`
- **Riskli:** dizi indeksi `map((e, i) => ... key={i})`. Liste hiç sıralanmıyor,
  eklenmiyor, silinmiyorsa zararsız; aksi hâlde `key`'in tüm anlamı kaybolur
  çünkü indeks eleman değil **konum** kimliğidir.
- **Yanlış:** her render'da değişen bir şey (`Math.random()`). Her seferinde
  tüm liste sıfırdan kurulur.

İki teknik nokta:

1. `key`, `map`'in döndürdüğü **en dıştaki** element'e konur — component'in
   içindeki bir `div`'e değil.
2. `key` bir prop **değildir**. React onu tüketir; component'in içinde
   `props.key` diye okuyamazsın. Kimliğe içeride de ihtiyacın varsa ayrıca
   `id={e.id}` diye geçmelisin.

## Konsol uyarısı

`key` unutursan uygulama çalışır ama konsolda
`Warning: Each child in a list should have a unique "key" prop` görürsün.
Görmezden gelme — sessiz hata sınıfının habercisi.
