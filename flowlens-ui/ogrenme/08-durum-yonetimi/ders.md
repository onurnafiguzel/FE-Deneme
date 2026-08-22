# 08 — Loading / Error / Empty

## Dört durum

Veri çeken her ekranın dört hâli vardır:

| durum | ne göstermeli |
|---|---|
| loading | "Yükleniyor..." |
| error | hata mesajı + tekrar dene |
| empty | "kayıt yok" |
| success | veri |

07'nin Görev 4'ünde gördün: `error` durumu yönetilmezse uygulama sonsuza kadar
"Yükleniyor..." gösteriyor. Kullanıcı için bu, donmuş bir ekrandır.

## `finally` — yükleme her hâlükârda biter

En sık atlanan satır bu:

```ts
fetchEndpoints()
  .then((list) => setData(list))
  .catch((err) => setError(err.message))
  .finally(() => setIsLoading(false))
```

`setIsLoading(false)`'ı sadece `then` içine koyarsan hata durumunda yükleme
hiç bitmez. `finally` her iki yolda da çalışır — C#'taki `try/finally` ile aynı
garanti.

## `catch` ne yakalar?

07'de `fetchGraph` iki farklı sebeple patlayabilir:

- ağ tamamen çöktü → `fetch`'in kendisi reject eder
- HTTP 404/500 → senin attığın `throw new Error(...)`

İkisi de aynı `.catch`'e düşer. API katmanının HTTP hatasını exception'a
çevirmesinin faydası bu: tüketici tarafında tek bir hata yolu var.

Dikkat: `.catch((err) => ...)` içindeki `err`'in tipi **`any`**'dir. `Promise.catch`
imzası öyle tanımlanmış, `strict` bunu değiştirmiyor. (Blok hâlindeki
`try { } catch (err) { }` ise `strict` altında `unknown` verir — ikisini karıştırma.)

Yani derleyici seni zorlamayacak, ama `err.message` yine de güvenli değil:
JavaScript'te `throw "metin"` yazmak serbest, fırlatılan şey `Error` olmak
zorunda değil. Kendin daralt:

```ts
.catch((err) => setError(err instanceof Error ? err.message : "Bilinmeyen hata"))
```

Bu senin bildiğin **type narrowing** — burada derleyici için değil, çalışma
zamanı için yapıyorsun.

## İmkânsız durumlar

İki boolean + bir dizi tutuyorsun: `isLoading`, `error`, `data`. Bu 3 bağımsız
değişken teoride 8 kombinasyon üretir ve çoğu anlamsız: "hem yükleniyor hem
hatalı", "hata var ama veri de dolu".

Kodun bunları elle engellemesi gerekiyor — sıralı kontrolle:

```tsx
if (isLoading) return <Loading />
if (error) return <ErrorBox />
if (data.length === 0) return <Empty />
return <List />
```

Sıra önemli. `error` kontrolünü `empty`'den sonra koyarsan, hata durumunda
`data` boş olduğu için kullanıcıya "kayıt bulunamadı" dersin — yalan.

> Daha sağlamı, durumları tek bir discriminated union'da toplamaktır
> (`{ status: "loading" } | { status: "error", message: string } | ...`), böylece
> imkânsız kombinasyonlar tip seviyesinde yazılamaz hâle gelir. Senin bildiğin
> bir kalıp; şimdilik üç ayrı state ile devam et, ama aklında olsun.

## Effect'i yeniden tetiklemek

"Tekrar dene" butonu effect'i nasıl yeniden çalıştırır? Effect'i doğrudan
çağıramazsın — o React'in elinde. Ama **deps'i değiştirebilirsin**:

```tsx
const [reloadKey, setReloadKey] = useState(0)

useEffect(() => { ... }, [reloadKey])

// buton:
onClick={() => setReloadKey((k) => k + 1)}
```

`reloadKey` değişince React effect'i söker (cleanup çalışır) ve yeniden kurar.
Veri yeniden çekilir.

`setReloadKey((k) => k + 1)` — güncelleyici fonksiyon biçimi. `setReloadKey(reloadKey + 1)`
de çoğu zaman çalışır, ama `reloadKey` o render'ın fotoğrafıdır; art arda
tetiklemelerde eski değeri okuyabilirsin. Yeni değeri **eskisinden** hesaplıyorsan
fonksiyon biçimini kullan — React sana en güncel değeri verir.
