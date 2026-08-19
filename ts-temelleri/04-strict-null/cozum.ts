// Egzersiz 1
type CustomerA = {
    id:number,
    fullName: string,
    phone?: string
};

type CustomerB = {
    id: number,
    fullName: string,
    phone: string | undefined
};

const customerA : CustomerA ={
    id:1,
    fullName:"A",    
};

/* 
const customerB: CustomerB={
    id:1,
    fullName:"A"
}; Property 'phone' is missing in type '{ id: number; fullName: string; }' but required in type 'CustomerB'.
*/

const customerB: CustomerB={
    id:1,
    fullName:"A",
    phone: undefined
};

// C#'taki "public string? Phone" hangisine daha yakın?
// -> CustomerB.
// C#'ta bir property ya vardır ya yoktur; "?" sadece DEĞERİNİN null olabileceğini söyler,
// property'nin kendisi nesnede her zaman durur. CustomerB de tam bunu yapıyor:
// phone alanını yazmak zorundasın, ama içi undefined olabilir.
// CustomerA'daki "?" ise C#'ta karşılığı olmayan bir şey: alan nesnede HİÇ olmayabilir.
// JS/JSON dünyasında bu ayrım gerçek — {} ile {phone: undefined} farklı nesnelerdir.

// Egzeriz 2
type Order = {
    id:number,
    total:number,
    discount?: number,
    note?: string
};

const firstOrder : Order = {
    id:1,
    total:1,
    note: "note"        
};

const secondOrder : Order = {
    id:1,
    total:1,
    discount:0,
    note:"note"
};

function describeDiscount (order: Order) : string {
    const withOr = order.discount || 10; // null ve 0 değerini 10 ile değiştirir
    const withNullish = order.discount ?? 10;  // 0 değerini korur

    return `withOr: ${withOr} - withNullish: ${withNullish}`;
}

console.log("firstOrder :", describeDiscount(firstOrder));
console.log("secondOrder:", describeDiscount(secondOrder));

// secondOrder'da discount = 0 ve iki sonuç farklı çıkıyor: withOr 10, withNullish 0.
// Sebep: || operatörü JS'in "falsy" saydığı her şeyde sağa geçer — 0, "", false, NaN, null,
// undefined. 0 da falsy olduğu için "indirim yok" sanıp 10 uyduruyor.
// ?? ise SADECE null/undefined'da sağa geçer, 0'ı geçerli bir değer olarak korur.
// Doğru davranış withNullish: müşteri gerçekten %0 indirim almış, biz ona %10 veremeyiz.
// Kural: sayı ve string alanlarda daima ?? kullan.

// Egzersiz 3
type Address = {
    city: string,
    district: string
};

type OrderCustomer = {
    id:number,
    fullName: string,
    address?: Address
};

type FullOrder = {
    id:number,
    total:number,
    customer?: OrderCustomer
};

function getCity(order: FullOrder) : string {
    return order.customer?.address?.city ?? "bilinmiyor";
}

const firstFullOrder : FullOrder = {
    id:1,
    total:1,
    customer : {
        id:1,
        fullName:"onur",
        address:{
            city:"sakarya",
            district:"erenler"
        }
    }
};

const secondFullOrder : FullOrder = {
    id:2,
    total:2,
    customer: {
        id:2,
        fullName:"onur-2",
    }
};

const thirdFullOrder : FullOrder = {
    id:3,
    total:3
};

function getCityVerbose (order: FullOrder) : string {
    if(order.customer){
        if(order.customer.address)
        {
                if(order.customer.address.city)
                {
                    return order.customer.address.city;
                }
                else return "bilinmiyor";
        }
        else return "bilinmiyor";
    }
    else    return "bilinmiyor";        
}

console.log("getCity 1:", getCity(firstFullOrder));   // sakarya
console.log("getCity 2:", getCity(secondFullOrder));  // bilinmiyor
console.log("getCity 3:", getCity(thirdFullOrder));   // bilinmiyor

console.log("FirstOrder's city:", getCityVerbose(firstFullOrder)); // sakarya
console.log("SecondOrder's city:", getCityVerbose(secondFullOrder)); // bilinmiyor
console.log("ThirdOrder's city:", getCityVerbose(thirdFullOrder)); // bilinmiyor

// Satır karşılaştırması: getCity 1 satır, getCityVerbose 13 satır — aynı iş.
// ?. zincirdeki her adımı tek tek kontrol etmeni gerektirmiyor; biri null/undefined
// olduğu anda tüm ifade kısa devre yapıp undefined dönüyor.

// Egzersiz 4

const orders = [firstFullOrder,secondFullOrder,thirdFullOrder];

/*
find'ın sonucunu doğrudan kullanma denemesi:

    const order = orders.find(u => u.id === id);
    return order.total.toString();
    'order' is possibly 'undefined'.

Sadece ?. eklemek de yetmiyor, çünkü o zaman dönüş tipi string|undefined oluyor:

    return orders.find(u=>u.id === id)?.total.toString();
    Type 'number | undefined' is not assignable to type 'string'.
      Type 'undefined' is not assignable to type 'string'.
*/

// ! ile susturulmuş hali — derleyici susar ama hiçbir kontrol eklenmez
function findOrderTotalUnsafe (orders: FullOrder[], id: number): string {
    return orders.find(u=>u.id === id)!.total.toString();
}

// if ile daraltılmış doğru hali
function findOrderTotal (orders: FullOrder[], id: number): string {
    const order = orders.find(u => u.id === id);
    if (order) {
        return order.total.toString();   // burada order artık FullOrder
    }
    return "sipariş yok";
}

console.log("Id 1:", findOrderTotal(orders,1));
console.log("Id 2:", findOrderTotal(orders,2));
console.log("Id 3:", findOrderTotal(orders,3));

// Var olmayan id ile ikisini de çağır:
console.log("Id 999 (guvenli):", findOrderTotal(orders, 999));

try {
    console.log("Id 999 (unsafe):", findOrderTotalUnsafe(orders, 999));
} catch (err) {
    console.log("Id 999 (unsafe) PATLADI:", (err as Error).message);
}

// Fark: iki fonksiyon da DERLEME zamanında sorunsuz geçti. Ama 999 ile çağırınca
// güvenli olan "sipariş yok" döndü, unsafe olan runtime'da TypeError fırlattı.
// "!" derleyiciye verilmiş bir söz; kod ürettirmiyor, kontrol eklemiyor, sadece
// uyarıyı kapatıyor. Sözü tutamazsan hatayı kullanıcı buluyor.
// C#'taki null-forgiving "!" ile birebir aynı davranış.