type Product = {
    id:number,
    name:string,
    price:number,
    stock:number
};

const products: Product[] = [
    {id:1,name:"onur-1",price:1,stock:1},
    {id:2,name:"onur-2",price:2,stock:2},
    {id:3,name:"onur-3",price:3,stock:3}
];

// Egzersiz 1

const total          = 1000                                  // 1000  (literal! const olduğu için)
const label          = "klavye"                              // "klavye"
const isActive       = true                                  // true
const names          = products.map(p => p.name)             // string[]  (string değil, dizi)
const cheap          = products.filter(p => p.price < 100)   // Product[]
const found          = products.find(p => p.id === 1)        // Product | undefined
const sum            = products.reduce((acc, p) => acc + p.price, 0)  // number
const emptyList      = []                                    // any[]
const mixed          = [1, "a", true]                        // (string | number | boolean)[]
const firstName      = products[0].name                      // string

/*
Şaşırtan iki tanesi:

1) emptyList -> any[]
   strict açık olmasına rağmen "any" çıktı. Boş dizi özel bir durum: TS ona geçici
   olarak any[] verip sonraki push'lara bakarak tipini geliştiriyor ("evolving array").
   Hiç push yoksa any[] kalıyor — yani içine her şeyi kabul eden bir delik.
   Bu yüzden boş diziler daima tiplenmeli: const emptyList: Product[] = []

2) total / label / isActive -> 1000, "klavye", true
   Bunlar "number" değil, tek bir DEĞERİ temsil eden literal tipler. const bir daha
   değişemeyeceği için TS en dar tipi veriyor. Egzersiz 2 bunun üzerine kurulu.

found'ın "Product | undefined" olması aslında şaşırtıcı değil, doğru olan bu: find
bulamayabilir ve TS bunu tipe yazıyor (konu 04).

map/filter/find içindeki p'ye tip yazmama sebebi: products zaten Product[] olarak
tiplendi, bu metotların imzası callback'in parametresini dizinin eleman tipinden
alıyor. TS tipi soldan sağa taşıyor — buna "contextual typing" deniyor, konu 01'de
applyDiscount'ta da aynısı olmuştu.
*/

// Egzersiz 2
const statusConst = "pending" // pending - değiştirilemez
let   statusLet   = "pending" // string  - değiştirilebilir

type OrderStatus = "pending" | "paid" | "shipped";

function setStatus (status: OrderStatus): void {
    console.log("Status:", status);
}

setStatus(statusConst);

// setStatus(statusLet);
// error TS2345: Argument of type 'string' is not assignable to parameter of type 'OrderStatus'.
//
// Neden sadece let hata verdi:
// statusConst bir daha değişemez, o yüzden TS ona en dar tipi verdi: "pending".
// Bu tip OrderStatus union'ının bir üyesi, sorunsuz geçiyor.
// statusLet ise sonradan başka bir string alabilir; TS "yarın buraya 'xyz' atanabilir"
// diye tipi string'e genişletiyor (widening). string ise OrderStatus'tan daha geniş,
// yani her string geçerli bir OrderStatus değil — bu yüzden reddediliyor.

// Çözüm: setStatus'a ve OrderStatus'a dokunmadan, değişkeni tiplemek.
let statusLetFixed: OrderStatus = "pending";
setStatus(statusLetFixed);
statusLetFixed = "shipped";   // hala değiştirilebilir, ama sadece union içinden
setStatus(statusLetFixed);

// Egzersiz 3
function findNameLoose(products: Product[],id:number){
    return products.find(p=>p.id === id)?.name;
}

function findNameStrict(products: Product[], id: number): string{
    // ?? eklemeden önce, sadece "return products.find(...)?.name;" iken:
    // error TS2322: Type 'string | undefined' is not assignable to type 'string'.
    //   Type 'undefined' is not assignable to type 'string'.
    return products.find(p=>p.id === id)?.name ?? "Bulunamadi";
}

console.log("loose 1:", findNameLoose(products, 1));
console.log("loose 999:", findNameLoose(products, 999));     // undefined
console.log("strict 1:", findNameStrict(products, 1));
console.log("strict 999:", findNameStrict(products, 999));   // Bulunamadi

// findNameLoose(products, 999).toUpperCase();
// error TS18048: 'findNameLoose(...)' is possibly 'undefined'.

/*
İki hatanın karşılaştırması:

findNameStrict -> hata FONKSİYONUN İÇİNDE, 57. satırda çıktı. "Söz verdiğin string
   değil, string|undefined dönüyorsun" diyor. Hatayı yazarken, tam o anda görüyorum
   ve orada çözüyorum (?? ile).

findNameLoose  -> fonksiyon sorunsuz derlendi. Hata ancak ÇAĞIRAN yerde çıktı. Bu
   fonksiyon 5 farklı dosyadan çağrılıyor olsaydı, aynı hatayı 5 yerde ayrı ayrı
   karşılamam gerekirdi — üstelik her biri sorunun kaynağını değil, belirtisini
   gösterirdi.

Sonuç: dönüş tipi anotasyonu tip GÜVENLİĞİ eklemiyor (ikisi de aynı derecede güvenli),
hatanın NEREDE görüneceğini değiştiriyor. Dışarıya açılan / birden çok yerden çağrılan
fonksiyonlarda dönüş tipi yaz; dosya içi küçük yardımcılarda gereksiz.
*/

// Egzersiz 4
function summarize(products: Product[], minPrice: number): string {
    const expensive = products.filter(p => p.price > minPrice);
    const names  = expensive.map(p => p.name);
    const count = names.length;
    const text = names.join(", ");
    return `${count} urun: ${text}`;
}

console.log("summarize:", summarize(products, 1));

/*
Başlangıçta 9 anotasyon vardı, 3 kaldı:

1) products: Product[]   -> ŞART. Parametre; TS dışarıdan ne geleceğini bilemez.
2) minPrice: number      -> ŞART. Aynı sebep.
3) : string (dönüş)      -> şart değil ama tercih. TS zaten string çıkarırdı;
                            Egzersiz 3'teki sebeple bırakıyorum.

Silinen 6 tanesi neden gereksizdi:
- expensive: Product[]   -> filter, Product[] üzerinde çağrıldı, dönüşü zaten Product[]
- (p: Product): boolean  -> filter'ın imzası callback'in tipini veriyor (contextual typing)
- names: string[]        -> map'in dönüşü p.name'den zaten string[]
- (p: Product): string   -> yine contextual typing
- count: number          -> .length her zaman number
- text: string           -> .join her zaman string

Bunları yazmak sadece gürültü değil, aynı zamanda risk: Product'a bir alan eklenip
map'in dönüşü değişirse elle yazdığım tip yalan söylemeye başlar.
*/
