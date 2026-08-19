//Egzersiz 1
type OrderStatus = "pending" | "paid" | "shipped" | "cancelled";

function statusLabel (status: OrderStatus): string {
    switch (status){
        case "pending" : return "bekliyor";
        case "paid" : return "ödendi";
        case "shipped" : return "kargoda";
        case "cancelled" : return "iptal edildi";
    }
}

// statusLabel("delivered"); Argument of type '"delivered"' is not assignable to parameter of type 'OrderStatus'.

console.log(statusLabel("pending"));
console.log(statusLabel("paid"));
console.log(statusLabel("shipped"));
console.log(statusLabel("cancelled"));

//Egzersiz 2
type ProductId = number | string;

function formatProductId(id: ProductId) : string {
    // console.log(id.toUpperCase());  Property 'toUpperCase' does not exist on type 'ProductId'.  Property 'toUpperCase' does not exist on type 'number'.

    if (typeof id === "string") {
        return id.toUpperCase();
    } else {
        return `#${id}`;
    }
    // Not: else kullandığım için "return id;" satırına gerek kalmadı.
    // Eskiden orada id'nin tipi "never" oluyordu: iki typeof kontrolü union'ın
    // her iki üyesini de tükettiği için o satıra ulaşan bir değer kalmıyor.
}

console.log(formatProductId("abc-1"));
console.log(formatProductId(101));

// Egzersiz 3 & 4
type Product = {
    id:number,
    name: string,
    price: number;
};

type ProductResponse =
| {status : "success"; data: Product}
| {status : "error"; message: string; statusCode: number}
| {status : "loading"}
| {status: "empty"};

function renderResponse (res: ProductResponse) : string {
    switch(res.status){
        case "success": return `${res.data.name} — ${res.data.price} TL`;
        case "error"  : return `Hata ${res.statusCode}: ${res.message}`;
        case "loading": return "Yükleniyor...";
        // case "loading" içinde res.data denemesi şunu veriyor:
        // Property 'data' does not exist on type '{ status: "loading"; }'.

        case "empty"  : return "Kayıt bulunamadı";

        default:{
            const _exhaustive: never = res;
            return "bilinmeyen";
        }
    }
}

// Egzersiz 4 gözlemi: case "empty" eklemeden önce derleyici şunu verdi ->
// cozum.ts(47,19): error TS2322: Type '{ status: "empty"; }' is not assignable to type 'never'.
// Yani hatayı union'a yeni üyeyi eklediğim anda, kodu hiç çalıştırmadan öğrendim.
//
// C#'ta bunu switch + "default: throw new ArgumentOutOfRangeException()" ile yazsaydım
// hatayı ancak o kod yolu RUNTIME'da çalıştığında öğrenirdim — iyi ihtimalle testte,
// kötü ihtimalle production'da. Derleyici sessiz kalırdı.

const successRes: ProductResponse = {
    status: "success",
    data: { id: 101, name: "klavye", price: 1200 },
};
const errorRes: ProductResponse = {
    status: "error",
    message: "Ürün bulunamadı",
    statusCode: 404,
};
const loadingRes: ProductResponse = { status: "loading" };
const emptyRes: ProductResponse = { status: "empty" };

console.log(renderResponse(successRes));
console.log(renderResponse(errorRes));
console.log(renderResponse(loadingRes));
console.log(renderResponse(emptyRes));
