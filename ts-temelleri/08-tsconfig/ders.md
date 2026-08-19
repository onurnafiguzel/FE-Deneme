# 08 — tsconfig.json temel ayarları

`tsconfig.json`, C#'taki `.csproj`'un derleyici ayarları kısmına karşılık gelir: hangi dil
sürümü, hangi dosyalar, ne kadar sıkı kontrol. Bizim dosyamız:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "lib": ["ES2022"],
    "types": ["node"],
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["ts-temelleri/**/*.ts"]
}
```

## `target` ve `lib`

`target`, üretilecek JS'in sürümü — C#'taki `<LangVersion>` gibi. `lib` ise **hangi hazır
API'lerin var olduğunu** söyler; `<TargetFramework>`'e daha yakın.

`target` verdiğinde `lib` otomatik gelir. `target: "ES5"` yaparsan `Object.entries`,
`Array.includes`, `String.replaceAll` gibi şeyler "yok" olur — kod aynı kalsa bile
derleyici tanımaz.

React projelerinde `lib` genelde `["ES2022", "DOM"]` olur: `document`, `window`, `fetch`
oradan gelir. Bizde `DOM` yok çünkü Node üzerinde çalışıyoruz — o yüzden `types: ["node"]`
ile `console`, `process` gibi Node API'lerini alıyoruz.

## `module` ve `moduleResolution`

`module`: `import`/`export`'un nasıl derleneceği. `moduleResolution`: bir `import`
yazdığında dosyanın nasıl aranacağı. Modern kurulumlarda ikisi birlikte gider —
`"ESNext"` + `"bundler"` bugünün React/Vite standardı.

## `strict` — asıl önemli olan

Tek bir bayrak değil, bir **şemsiye**. Açtığında şunlar açılır:

| alt ayar | ne yapar |
|---|---|
| `noImplicitAny` | tipsiz parametre yasak (konu 06) |
| `strictNullChecks` | null/undefined ayrı tip (konu 04) |
| `strictFunctionTypes` | fonksiyon parametrelerinde güvenli uyum |
| `strictPropertyInitialization` | class alanları constructor'da dolmalı |
| `noImplicitThis` | belirsiz `this` yasak |
| `useUnknownInCatchVariables` | `catch (e)` içinde `e` → `any` değil `unknown` |
| `alwaysStrict` | çıktıya `"use strict"` |

**Yeni projede daima `strict: true` ile başla.** Sonradan açmak, birikmiş binlerce hatayı
tek seferde karşılamak demektir.

## `strict`'in kapsamadıkları

Bunlar ayrıca açılır ve gerçekten faydalıdır:

```jsonc
"noUncheckedIndexedAccess": true,  // products[99] -> Product | undefined (konu 04'teki boşluk)
"noUnusedLocals": true,            // kullanılmayan değişken (konu 01'deki AuditedProduct)
"noUnusedParameters": true
```

`noUncheckedIndexedAccess` en değerlisi ama en gürültülüsü: her dizi erişimine kontrol
eklemen gerekir.

## `paths` — import alias'ları

React projelerinde en çok göreceğin ayar bu:

```jsonc
"baseUrl": ".",
"paths": { "@/*": ["src/*"] }
```

Böylece `../../../components/Button` yerine `@/components/Button` yazarsın.

> **Dikkat:** `paths` sadece **derleyiciye** yol tarif eder. Kodu çalıştıran araç
> (Vite, webpack, tsx) aynı alias'ı kendi tarafında da bilmek zorundadır. tsx ve Vite
> tsconfig'i okuyup uyar; bazı kurulumlarda ayrıca yazman gerekir. Alias çalışmıyorsa
> önce buraya bak.

## `include` / `exclude` ve `noEmit`

`include` hangi dosyaların derleneceğini söyler. `noEmit: true` ise "JS üretme, sadece
kontrol et" demek — bizde `tsx` çalıştırmayı, React'te bundler'ı hallettiği için TS'in
işi sadece tip kontrolü. C# alışkanlığından farklı olan yer burası: **derleyici çıktı
üretmiyor, sadece hakemlik yapıyor.**
