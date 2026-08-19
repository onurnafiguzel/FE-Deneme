// Egzersiz 1
interface Customer {
    id:number;
    name:string;
    email:string;
}

interface VipCustomer extends Customer{
    discountRate: number;
    since:Date;
}

const customer: Customer = {
    id: 1,
    name: "John Doe",
    email: "ongguzel@gmail.com"
};

const vipCustomer: VipCustomer = {
    id: 2,
    name: "Jane Smith",
    email: "deneme@gmail.com",
    discountRate: 0.15,
    since: new Date("2022-01-01")
};

console.log(customer);
console.log(vipCustomer);


// Egzersiz 2
interface HasId{
    id:number;
}

function printId(entity: HasId): void{
    console.log(entity.id);
}

printId(customer);

const order = {
    id:99,
    total:250,
}
// C#'ta bunun için 2 tane printId oluşturmam gerekirdi, parametreleri farklı olan
// Ya da: Customer ve Order class'larının ikisi de ": IHasId" yazıp interface'i
// açıkça implement etmek zorundaydı. TS'te ikisi de gerekmiyor — şekil uyuyorsa yeter.

printId(order);

// Bonus: nesneyi değişkene atamadan, literal olarak doğrudan geçmeyi dene
// @ts-expect-error TS2353: 'total' does not exist in type 'HasId'
printId({ id: 1, total: 250 });
// Gözlem: order değişkeni geçerken sorun yoktu ama aynı şekildeki literal hata veriyor.
// Buna "excess property check" deniyor: TS, tam o noktada yazılmış bir nesne
// literal'inde fazladan alan görürse bunu yazım hatası kabul eder. Değişkene
// atanmış nesnede bu kontrol devreye girmez, normal structural typing uygulanır.

// Egzersiz 3
type ProductId = number;
type Money = {
  amount: number;
  currency: string;
};
type DiscountCalculator = (price: Money, rate: number) => Money;

type Product = {
    id: ProductId;
    name: string;
    price: Money;
};


const applyDiscount : DiscountCalculator = (price,rate) => {
    return {
        amount: price.amount* (1-rate),
        currency: price.currency
    };
};

const product : Product = {
    id: 101,
    name:"klavye",
    price:{amount:1200, currency: "try"},
};

const discounted = applyDiscount(product.price, 0.1);
console.log(product.name , discounted);

// Egzersiz 4

type TimeStamps = {
    createdAt: Date;
    updatedAt: Date;
}

// 1.yol
interface AuditedProduct extends Product, TimeStamps {}

//2.yol
type AuditedCustomer = TimeStamps & Customer;

const auditedProduct: AuditedProduct = {
    id: 1,
    name: "John Doe",
    price : { amount: 1200, currency: "TRY" },
    createdAt: new Date(),
    updatedAt: new Date()
};

const auditedCustomer: AuditedCustomer= {
    id:1,
    name:"test",
    email:"deneme",
    createdAt: new Date(),
    updatedAt: new Date(),
};

console.log(auditedProduct);
console.log(auditedCustomer);

// Hangisini tercih ederim?
// Nesne şekli birleştiriyorsam "interface extends": hata mesajları daha okunur çıkıyor
// ve niyeti daha net anlatıyor. "type + &" ise union gibi nesne olmayan tiplerle de
// çalıştığı için daha esnek — asıl gücü orada, konu 02'de göreceğim yerde.
// Pratik kural: nesne şekli -> interface, geri kalan her şey -> type.