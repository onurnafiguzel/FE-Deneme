# 04 — Controlled Input

## İki dünya

Bir `<input>` normalde kendi değerini **kendi içinde** tutar. Tarayıcının DOM
düğümünde bir `value` alanı vardır, kullanıcı yazar, orada durur. React'in
haberi olmaz. Buna **uncontrolled** denir.

03'te yazdığın kutu ise **controlled**:

```tsx
<input value={query} onChange={(e) => setQuery(e.target.value)} />
```

Burada tek gerçek kaynak (single source of truth) **state**. Ekrandaki değeri
state belirler; kullanıcının tuşa basması bir *öneri*dir, `onChange` ile state'e
işlenir, state değişince input yeni değeri gösterir. Döngü şöyle:

```
tuş → onChange → setState → yeniden render → input'un value'su güncellenir
```

Bu yüzden `value` verip `onChange` vermezsen kutuya hiçbir şey yazamazsın —
state hiç değişmediği için React her render'da eski değeri geri koyar. Bu bir
hata değil, tasarımın doğal sonucu.

Backend karşılığı: değeri UI'ın kendi içinde biriktirip sonda toplamak yerine,
her değişikliği tek bir state nesnesine yazmak. Elindeki `query` her an
"formun gerçek hâli" — okumak için DOM'a sormana gerek yok.

## `<select>` React'te farklı

Düz HTML'de seçili seçenek `<option selected>` ile işaretlenir. React'te
işaretleme **yok**; seçili değer `<select>`'in `value`'sudur:

```tsx
<select value={method} onChange={(e) => setMethod(e.target.value)}>
  <option value="">Tümü</option>
  <option value="GET">GET</option>
</select>
```

Sebep tutarlılık: her controlled element'te değer aynı yerde — `value`
prop'unda. `input`, `textarea`, `select` üçü de aynı kalıbı izler.
(HTML'de `<textarea>` değerini çocuk olarak alır, React'te o da `value`.)

## Event tipleri

Inline yazınca TypeScript `e`'yi bağlamdan çıkarır. Handler'ı ayrı bir
fonksiyona alırsan tipi kendin yazmalısın:

```tsx
function handleMethodChange(e: React.ChangeEvent<HTMLSelectElement>) {
  setMethod(e.target.value)
}
```

Generic parametre hangi DOM element'i olduğunu söyler; `e.target.value`'nun
tipi oradan gelir. `HTMLInputElement`, `HTMLSelectElement`,
`HTMLButtonElement`... C#'taki `EventArgs` türevleri gibi düşün.

## Kaç tane state?

Üç filtren olacak: metin, method, modül. İki seçenek var:

```tsx
const [query, setQuery] = useState("")        // ayrı ayrı
const [method, setMethod] = useState("")
```

```tsx
const [filters, setFilters] = useState({ query: "", method: "" })   // tek obje
```

Şimdilik **ayrı ayrı** tut — daha az tören. Tek obje kullanacaksan güncellerken
mutate edemeyeceğini unutma:

```tsx
setFilters({ ...filters, method: "GET" })   // yeni referans şart
```

Ayrı state'leri birlikte set etmek de sorun değil: React aynı olay içindeki
güncellemeleri **tek render'da toplar** (batching). İki `setX` çağırdın diye iki
kez render olmaz.

## Boş seçeneği nasıl temsil edeceksin?

"Tümü" bir method değil, **filtre yok** demek. Bunu boş string `""` ile temsil
etmek en pratik yol: `<option value="">Tümü</option>`. Filtre kodunda da
"boşsa bu kuralı atla" diye ele alırsın.
