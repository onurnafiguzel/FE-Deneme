# 05 — Koşullu Render

## Temel: JSX'te `if` yok, ifade var

01'de gördüğün kural burada işe yarıyor: `{}` içine **ifade** yazılır. Bu yüzden
koşullu render'ın üç kalıbı var.

### 1. Ternary — "ya bu ya şu"

```tsx
{isLoading ? <Spinner /> : <List items={items} />}
```

### 2. `&&` — "varsa göster, yoksa hiç"

```tsx
{hasError && <p>Hata oluştu</p>}
```

Çalışma sebebi: `&&` sol taraf `false` ise **sol tarafı** döndürür. React de
`false`, `null`, `undefined` gördüğünde hiçbir şey basmaz.

### 3. Erken `return` — "bu durumda gerisi hiç çalışmasın"

```tsx
function EndpointList({ endpoints }: Props) {
  if (endpoints.length === 0) {
    return <p>Kayıt bulunamadı</p>
  }
  return <div>...</div>
}
```

Bu **gövdede**, `return`'den önce — orada normal JavaScript yazabilirsin, `if`
serbest. Backend'deki guard clause'un aynısı. Üç dört durum varsa (loading /
error / empty / dolu) iç içe ternary yazmak yerine bunu tercih et; okunabilirlik
farkı büyük.

## `&&`'in sayı tuzağı

01'de değinmiştim, şimdi somutlaşıyor:

```tsx
{endpoints.length && <List />}    // ✗
```

`length === 0` olduğunda `&&` sol tarafı döndürür: `0`. Ve React `0`'ı **basar**
— `false` değil, geçerli bir sayı. Ekranda tek başına duran bir `0` görürsün.

`false`/`null`/`undefined` basılmaz ama `0` basılır. Bu yüzden koşulu her zaman
boolean'a çevir:

```tsx
{endpoints.length > 0 && <List />}   // ✓
```

## Durumların sırası önemli

Bir listenin dört hâli olabilir: **yükleniyor**, **hata**, **boş**, **dolu**.
Sıra şu olmalı:

```
loading → error → empty → data
```

Yükleniyorken "kayıt bulunamadı" göstermek klasik hatadır: veri henüz gelmedi,
"bulunamadı" demek yalan. Boş dizi ile "henüz yüklenmedi" farklı şeylerdir —
`endpoints.length === 0` tek başına ikisini ayırt edemez, bu yüzden `isLoading`
ayrı bir state olarak durur.

Backend karşılığı: `Result<T>`'in `NotFound` ile `Pending` durumlarını
karıştırmamak. İkisi de "veri yok" ama anlamları zıt.

## Koşullu render ≠ CSS ile gizleme

`{cond && <X />}` yazınca element **hiç oluşturulmaz**. Ağaçta yoktur, DOM'da
yoktur, state'i varsa kaybolur.

Bunu bilerek kullan: bir component'i koşullu render edip geri getirdiğinde
**sıfırdan** kurulur, içindeki tüm state başlangıç değerine döner. Bazen
istediğin budur, bazen değil.
