// Egzersiz 1
function formatValue(value: string | number | boolean) : string{
    if (typeof value === "string") return value.toUpperCase();
    if(typeof value ==="number") return value.toFixed(2);
    return value ? "evet" : "hayır";
}

console.log("klavye: ", formatValue("klavye"));
console.log(42.5, formatValue(42.5));
console.log(true, formatValue(true));
console.log(false, formatValue(false));
console.log(0, formatValue(0));

function stockTruthy(stock?: number): string {
    if (stock) return `stokta ${stock} adet`;
    return "stok bilgisi yok";
}

function stockStrict(stock?: number): string {
    if (stock !== undefined) return `stokta ${stock} adet`;
    return "stok bilgisi yok";
}

console.log("truthy 5:", stockTruthy(5), "| strict 5:", stockStrict(5));
console.log("truthy 0:", stockTruthy(0), "| strict 0:", stockStrict(0));
console.log("truthy undefined:", stockTruthy(undefined), "| strict undefined:", stockStrict(undefined));

// 0 satırında truthy yanlış: 0 da falsy olduğu için "bilgi yok" diyor.
// Oysa 0 geçerli bir stok — "tükendi" demek. undefined ile karıştırıyor.

// Egzersiz 2
type IndividualCustomer = {
    fullName: string,
    tckn: string
};

type CorporateCustomer = {
    fullName: string,
    taxNumber: string,
    companyName: string
};

type Customer = IndividualCustomer | CorporateCustomer;

function customerTitle(customer: Customer) : string{
    // customer.companyName Property 'companyName' does not exist on type 'Customer'.   Property 'companyName' does not exist on type 'IndividualCustomer'.

    if("tckn" in customer) return customer.fullName;
    else  return customer.companyName;
}

const individualCustomer : IndividualCustomer = {
fullName:"ong",
tckn:"123"
};

const corporateCustomer : CorporateCustomer = {
    companyName : "tc",
    fullName : "ong",
    taxNumber: "123"
};

console.log("Individual:", customerTitle(individualCustomer));

console.log("Corporate:", customerTitle(corporateCustomer));

// kind eklesem ne kazanırdım: tek bir alana bakılır, switch + never ile
// exhaustiveness kontrolü yapılabilir, üçüncü bir müşteri tipi eklenince derleyici uyarır.
// in'in zayıf tarafı: alan adı bir string, yazım hatası yaparsam ("tckn" -> "tcknn")
// daralma sessizce ters çalışır. Ayrıca iki tip aynı alanı paylaşırsa iş bozulur.

// Egzersiz 3

function formatDate(value: Date | string) : string{
    if (value instanceof Date) return value.toISOString();
    else return value;
}

console.log("String:", formatDate("string"));
console.log("Date:", formatDate(new Date(Date.now())));

// type Product = { id: number; name: string };
const something: unknown = { id: 1, name: "klavye" };
// if (something instanceof Product) { } 'Product' only refers to a type, but is being used as a value here.

// Sebep: instanceof runtime'da prototip zincirine bakar. Date gerçek bir class,
// derlemeden sonra da duruyor. Product ise sadece bir type — JS'e çevrilince siliniyor,
// karşılaştırılacak bir şey kalmıyor. (Konu 03'teki "new T() yapılamaz" ile aynı sebep.)

// Egzersiz 4
const rawValid   = '{"id":1,"name":"klavye","price":1200}';
const rawInvalid = '{"id":"bir","title":"klavye"}';

type Product = {
    id: number,
    name: string,
    price: number
};

// Dönüş tipi "boolean" değil "value is Product": true dönerse TS argümanı Product sayar.
function isProduct(value: unknown) : value is Product{
    return (
        typeof value === "object" && value !== null &&
        "id" in value && typeof value.id === "number" &&
        "name" in value && typeof value.name === "string" &&
        "price" in value && typeof value.price === "number"
    );
}

function parseProduct(raw: string): string {
    const data: unknown = JSON.parse(raw);
    if (isProduct(data)) return `${data.name} - ${data.price} TL`;
    return "gecersiz veri";
}

console.log("valid:", parseProduct(rawValid));
console.log("invalid:", parseProduct(rawInvalid));

// Deneme 1: JSON.parse sonucunu doğrudan kullanmak
const parsedDirect = JSON.parse(rawInvalid);
console.log("dogrudan .name:", parsedDirect.name);
// Hata YOK. Çünkü JSON.parse'ın dönüş tipi zaten "any" — kontrol tamamen kapalı.
// Çıktı "undefined" ama kimse uyarmadı. ": unknown" yazmamızın sebebi tam bu.

// Deneme 2: unknown vs any
const asUnknown: unknown = JSON.parse(rawValid);
// asUnknown.name;  -> error TS18046: 'asUnknown' is of type 'unknown'.
const asAny: any = JSON.parse(rawValid);
console.log("any ile:", asAny.name);   // hata yok, kontrol yok
// Fark: any "kontrolü kapat" demek, unknown "önce daralt" demek. İkisi de her değeri tutabilir ama unknown daraltılmadan kullanılamaz. Dış veride daima unknown.

// Deneme 3: gövdesi yalan söyleyen bir guard
function isProductLying(value: unknown): value is Product {
    return true;
}
const lied: unknown = JSON.parse(rawInvalid);
if (isProductLying(lied)) console.log("yalanci guard:", `${lied.name} - ${lied.price} TL`);
// npm run check: temiz geçiyor. npm run 07: "undefined - undefined TL" basıyor.
// TS gövdeyi doğrulamıyor; "x is T" bir söz, "!" gibi. Doğruluğu senin sorumluluğunda.

