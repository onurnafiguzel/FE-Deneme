# 09 — react-router

## Problem

Şu an uygulama tek ekran. Bir endpoint'e tıklayıp çağrı grafiğini görmek
istiyorsun — ama tarayıcıda "sayfa" diye bir şey yok, tek bir `index.html` var.

Klasik web'de `/endpoints/orders-post-create` adresine gitmek sunucuya yeni bir
istek atar, sunucu yeni HTML döner. Tek sayfalık uygulamada (SPA) sunucuya
gidilmez: **URL değişir, React hangi component'i göstereceğine kendi karar
verir.** Router'ın işi bu eşleştirmedir.

Backend karşılığı doğrudan **routing table**. `[HttpGet("api/orders/{id}")]`
attribute'u hangi isteği hangi action'a bağlıyorsa, `<Route path="...">` de
hangi URL'i hangi component'e bağlar. `{id}` yerine `:id` yazılır, `useParams`
da `[FromRoute]` model binding'in karşılığıdır.

## Üç parça

```tsx
<BrowserRouter>            // 1. adres çubuğunu dinleyen kapsayıcı
  <Routes>                 // 2. eşleştirme tablosu
    <Route path="/" element={<EndpointsPage />} />
    <Route path="/endpoints/:id" element={<EndpointDetailPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

`element` bir component **tipi** değil, hazır bir element (`<X />`). Router
eşleşme olduğunda onu render eder.

`path="*"` her şeyi yakalar — eşleşmeyen adres için 404 sayfası. Sıra önemli
değil, router en spesifik eşleşmeyi seçer.

## `<Link>` — neden `<a>` değil?

```tsx
<Link to={`/endpoints/${id}`}>Detay</Link>
```

Düz `<a href>` tarayıcıya "bu sayfayı terk et" der: tam sayfa yeniden yüklenir,
tüm React state'i sıfırlanır, JS baştan indirilir. `<Link>` ise bunu engelleyip
adresi `history.pushState` ile değiştirir ve router'a haber verir. Sonuç:
adres çubuğu güncellenir, geri tuşu çalışır, ama sayfa yeniden yüklenmez.

Ekranda `<a>` olarak render edilir — yani sağ tıklayıp "yeni sekmede aç"
çalışır. Sadece sol tık davranışı değiştirilmiştir.

## `useParams`

```tsx
const { id } = useParams()
```

`id`'nin tipi `string | undefined`. `undefined` olabilir çünkü TypeScript
`path` string'ini okuyup orada `:id` olduğunu bilemez — router tipleri bunu
garanti edemiyor. `strict` altında bunu ele almak zorundasın.

Bu senin lehine: kullanıcı adres çubuğuna elle bir şey yazabilir, id
veritabanında olmayabilir. **"Bulunamadı" da bir durum** — 08'de öğrendiğin
zincire dördüncü bir dal olarak girer:

```
loading → error → not found → success
```

## Nested route ve `<Outlet>` (bilgi)

Ortak bir kabuk (header, kenar menü) birden fazla sayfada tekrar etmesin diye
route'lar iç içe tanımlanabilir; ortak component `<Outlet />` ile çocuğun
nereye geleceğini söyler. Şimdilik ihtiyacın yok, ama gördüğünde ne olduğunu
bil: layout kalıtımı, `_Layout.cshtml` mantığı.
