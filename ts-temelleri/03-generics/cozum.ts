type Product = {
    id:number,
    name:string,
    price: number
};

type Customer = {
    id:number,
    fullName: string
    email: string
};

const products: Product[] = [
    {id:1, name:"bir", price:1},
    {id:2, name:"iki", price:2},
    {id:3, name:"üç", price:3},];

const customers: Customer[] = [
    {id:1,fullName:"onur",email:"ong"},
    {id:2,fullName:"onur-2",email:"ong-2"}];

// Egzeriz 1

function first<T>(items: T[]): T | undefined{
    return items[0];
}

const firstProduct  = first(products);      // Product | undefined
const firstCustomer = first(customers);     // Customer | undefined
const firstNumber   = first([10,20,30]);    // number | undefined
const firstEmpty    = first([]);            // undefined

console.log("First product", firstProduct);
console.log("First customer", firstCustomer);
console.log("First number", firstNumber);
console.log("Empty", firstEmpty);

// Egzersiz 2

type ApiResponse<T> = {
    data: T,
    success: boolean,
    timestamp: Date
};

const productResponse: ApiResponse<Product> = {
    data: {id:1, name:"bir", price:1},
    success: true,
    timestamp: new Date("2026-01-01"),
};

const customerListResponse: ApiResponse<Customer[]> = {
    data: customers,
    success: true,
    timestamp: new Date("2026-01-02"),
};

function logResponse<T>(response : ApiResponse<T>) : void {
    console.log("Success:", response.success, 
                "Timestamp:", response.timestamp);
    console.log("Data:", response.data);
};

logResponse(productResponse);
logResponse(customerListResponse);

// Egzersiz 3
function getById<T extends {id:number}>(items:T[], id: number): T | undefined {
return items.find(u=>u.id === id);}

console.log("getById product 2:", getById(products, 2));
console.log("getById customer 1:", getById(customers, 1));
console.log("getById olmayan id:", getById(products, 999));// undefined


// Egzeriz 4
function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
    return items.map(item=>item[key]);
}

const names  = pluck(products,"name");    // string[]
const prices = pluck(products,"price");   // number[]
const emails = pluck(customers,"email");  // string[]

console.log("pluck-1",names);
console.log("pluck-2",prices);
console.log("pluck-3",emails);

// @ts-expect-error Argument of type '"stock"' is not assignable to parameter of type 'keyof Product'
pluck(products,"stock");
