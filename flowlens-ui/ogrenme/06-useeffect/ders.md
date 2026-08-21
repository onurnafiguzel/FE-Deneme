# 06 — `useEffect` ve Cleanup

## Render saf olmalı

Component fonksiyonu React tarafından, istediği zaman, istediği kadar çağrılır.
Bu yüzden **saf** olmak zorunda: aynı props/state için aynı JSX'i döndürsün,
dışarıya dokunmasın.

```tsx
export default function App() {
  const data = await fetch(...)   // ✗ render sırasında yan etki
```

Fetch, `setTimeout`, `document.title` yazmak, event listener eklemek — bunlar
**yan etki**. Render'ın işi değil.

## Peki nereye?

İki yer var, ayrımı iyi otur:

- **Olaya tepki** → event handler. 05'te `Yenile` butonundaki `setTimeout` böyleydi.
  Kullanıcı tıkladı, sen tepki verdin. `useEffect` gerekmez.
- **Ekrandaki durumla dış dünyayı senkron tutmak** → `useEffect`. "Bu component
  ekranda olduğu sürece şu bağlantı açık olmalı", "şu id değiştikçe veri
  yeniden çekilmeli".

Yeni başlayanların en sık hatası her şeyi `useEffect`'e doldurmaktır. Soru şu:
*bunu tetikleyen bir kullanıcı olayı var mı?* Varsa handler'a yaz.

## Sözdizimi

```tsx
useEffect(() => {
  // yan etki
  return () => {
    // cleanup
  }
}, [deps])
```

Ne zaman çalışır:

| deps | davranış |
|---|---|
| `[]` | component ekrana ilk geldiğinde bir kez |
| `[id]` | ilk seferde + `id` her değiştiğinde |
| yok | **her** render'dan sonra (nadiren doğru) |

Effect'in içinde okuduğun her state/prop deps'e girmeli. Girmezse o değerin
**ilk render'daki** hâline takılı kalırsın (stale closure) — closure bir
fotoğraf çeker, effect eski fotoğrafı okumaya devam eder.

Ters tuzak: effect içinde `setData` çağırıp `data`'yı deps'e koymak → sonsuz
döngü. Effect state'i değiştirir, state değişince effect yeniden çalışır.

## Cleanup — `IDisposable` karşılığı

Dönen fonksiyon, React o effect'i "sökerken" çalışır: component ekrandan
kalkınca veya deps değişip effect yeniden kurulmadan **önce**.

```tsx
useEffect(() => {
  const id = setTimeout(...)
  return () => clearTimeout(id)     // using / Dispose
}, [])
```

Kural: bir şey **açtıysan** kapat. Timer, interval, event listener, subscription,
WebSocket. Backend'de `using` bloğunun garantilediği şeyi burada elle yazıyorsun.

## Yarış durumu (race condition)

Asıl sinsi olan bu. Kullanıcı hızlıca A'dan B'ye geçti; iki fetch yolda. A'nın
cevabı geç geldi ve B'nin cevabının üstüne yazdı — ekranda yanlış veri.

Çözüm, cleanup ile eski isteğin sonucunu **yok saymak**:

```tsx
useEffect(() => {
  let iptal = false
  fetch(url)
    .then((r) => r.json())
    .then((d) => { if (!iptal) setData(d) })
  return () => { iptal = true }
}, [url])
```

Her effect çalışmasının kendi `iptal` değişkeni var (closure). Cleanup onu
`true` yapınca o çalışmaya ait `then` artık state'e dokunmaz.

## StrictMode neden iki kez çalıştırıyor?

`main.tsx`'te `<StrictMode>` var. Geliştirme modunda React her effect'i
**bilerek** kurar → söker → yeniden kurar. Konsolda her şeyi iki kez görürsün.

Bu bir hata değil, bir test: cleanup'ın doğru yazılmışsa iki kez çalışma
zararsızdır. Zarar görüyorsan cleanup eksiktir. Production build'de tek kez
çalışır. `<StrictMode>`'u kaldırarak "çözme" — mesajı öldürüp hatayı bırakmış
olursun.
