type Product = {
    id:number,
    name:string,
    price:number,
    stock:number,
    description?: string
};

const products = [
    {id:1,name:"onur-1",price:1,stock:1,description:"desc-1"},
    {id:2,name:"onur-2",price:2,stock:2,description:"desc-2"},
    {id:3,name:"onur-3",price:3,stock:3,description:"desc-3"}]

// Egzersiz 1
type CreateProductDto = Omit<Product,"id">;
type ProductListItem = Pick<Product,"id"|"name">;

function createProduct(dto: CreateProductDto): Product{
    const product : Product = { id: 1, ...dto };
    return product;
};

function toListItem (product: Product) : ProductListItem {
    const productListItem : ProductListItem = {
        id : product.id,
        name: product.name
    };

    return productListItem;
}

const createProductDto : CreateProductDto = {
    name : products[0].name,
    price : products[0].price,
    stock : products[0].stock,
    description : products[0].description
};


console.log("createProduct: ", createProduct(createProductDto));
console.log("productListItem: ", toListItem(products[1]));

// Tuzak denemesi: alan adını yanlış yazınca ne oluyor?
type OmitTypo = Omit<Product, "stok">;   // hata YOK — sessizce hiçbir şey çıkarmıyor

const omitTypoOrnek: OmitTypo = { id: 1, name: "x", price: 1, stock: 1 };
console.log("OmitTypo hala stock iceriyor:", omitTypoOrnek);

// Fark neden: Pick<T,K>'da K'nın "keyof T" olma zorunluluğu var, olmayan anahtar
// constraint'i ihlal ediyor ve derleme hatası çıkıyor.
// Omit<T,K> ise K'yı serbest bırakır (string kabul eder), çünkü "olmayan bir alanı
// çıkarmak" mantıken zararsız sayılmış. Sonuç: yazım hatası yaptığında Pick seni
// uyarır, Omit uyarmaz — yukarıdaki tipte stock hala duruyor ve fark etmezsin.
// Pratik: Omit yazarken alan adını elle değil, otomatik tamamlamayla seç.

// Egzersiz 2

type UpdateProductDto  = Partial<Product>;

function patchProduct(product: Product, changes: UpdateProductDto ) : Product {
    const newProduct = {... product, ...changes};
    return newProduct;
}

const firstUpdateProductDto : UpdateProductDto = {price: 10 };
const secondUpdateProductDto : UpdateProductDto = {stock: 10, description:"test" };
const thirdUpdateProductDto : UpdateProductDto = {}; // hiçbir şey değiştirmez


// C#'ta ayrı modeller oluşturmam gerekirdi: ProductUpdateDto diye tüm alanları
// nullable bir sınıf yazar, sonra "null olmayanları kopyala" diye elle bir merge
// metodu yazardım (ya da JsonPatchDocument<Product> kullanırdım). Ve Product'a yeni
// alan eklediğimde DTO'yu da güncellemeyi unutursam kimse söylemezdi.
// Burada Partial<Product> tek satır ve kaynak tiple otomatik senkron.
console.log("first: ", patchProduct(products[0],firstUpdateProductDto ));
console.log("second: ", patchProduct(products[1],secondUpdateProductDto ));
console.log("third: ", patchProduct(products[2],thirdUpdateProductDto )); 

// Egzersiz 3
type OrderStatus =  "pending" | "paid" | "shipped" | "cancelled";

const statusLabels : Record<OrderStatus, string> = {
    pending: "bekliyor",
    paid: "ödendi",
    shipped: "kargoda",
    cancelled: "iptal"
};

function statusLabel (status: OrderStatus) {
    return statusLabels[status];
}

console.log("Pending: ", statusLabel("pending"));
console.log("Paid: ", statusLabel("paid"));
console.log("Shipped: ", statusLabel("shipped"));
console.log("Cancelled: ", statusLabel("cancelled"));
//console.log("Cancelled: ", statusLabel("refunded")); Argument of type '"refunded"' is not assignable to parameter of type 'OrderStatus'.

// Deneme 1: statusLabels'tan "cancelled" satırını silince ->
// error TS2741: Property 'cancelled' is missing in type
//   '{ pending: string; paid: string; shipped: string; }'
//   but required in type 'Record<OrderStatus, string>'.
//
// Deneme 2: statusLabels'a "refunded: iade" ekleyince ->
// error TS2353: Object literal may only specify known properties,
//   and 'refunded' does not exist in type 'Record<OrderStatus, string>'.
//
// C#'ta Dictionary<OrderStatus, string> ile bu iki hatayı ne zaman öğrenirdim?
// Hiçbirini derlemede öğrenemezdim. Dictionary'nin içi derleyici için sadece
// çalışma zamanında dolan bir koleksiyon:
//   - eksik anahtar -> o statü ekranda görünene kadar sessiz, sonra
//     KeyNotFoundException (ya da TryGetValue ile sessizce boş metin)
//   - fazla anahtar -> hiç fark edilmez, ölü kod olarak kalır
// Record ile ikisi de kodu çalıştırmadan, satır numarasıyla geliyor.

// Egzersiz 4

type ProductQuery = {
    pageSize?: number,
    sortBy?: string,
    onlyInStock?: boolean
};

function withDefaults(query: ProductQuery) : Required<ProductQuery> {
    return {
        pageSize: query.pageSize ?? 20, 
        sortBy: query.sortBy ?? "name", 
        onlyInStock: query.onlyInStock ?? false};
};

console.log("Empty: ", withDefaults({}).pageSize.toFixed(2));

console.log("not-empty: ", withDefaults({pageSize:50, onlyInStock: false}));

// Evet, false kaldı. Ve haklısın: bu ÖRNEKTE || olsaydı da false çıkardı,
// çünkü varsayılan da false (false || false === false).
// Ama || hala yanlış operatör; tuzak sadece bu iki değer denk geldiği için görünmüyor:
const varsayilanTrue = { onlyInStock: false }.onlyInStock || true;   // -> true (YANLIŞ)
const varsayilanTrueDogru = { onlyInStock: false }.onlyInStock ?? true; // -> false (DOĞRU)
console.log("|| ile:", varsayilanTrue, " ?? ile:", varsayilanTrueDogru);

// Aynısı sayıda daha net: pageSize 0 gönderilirse
console.log("pageSize 0 ->", withDefaults({ pageSize: 0 }).pageSize);   // 0 korunur
console.log("|| olsaydi ->", (0 || 20));                                // 20 uydururdu

// Son deneme: ham ProductQuery uzerinde ayni zinciri kurmak
const hamQuery: ProductQuery = {};
// hamQuery.pageSize.toFixed(2);
// error TS18048: 'hamQuery.pageSize' is possibly 'undefined'.
//
// Required<ProductQuery> donduren withDefaults'tan sonra bu hata yok, cunku donen
// tipte alanlar artik optional degil. Yani "?? ile doldurdum" bilgisi tipe islenmis
// oluyor ve cagiran taraf bir daha ?. yazmak zorunda kalmiyor.
console.log("ham query:", hamQuery);