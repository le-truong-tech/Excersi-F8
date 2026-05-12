const products = [
    { id: 1, name: 'iPhone', price: 2000 },
    { id: 2, name: 'Samsung', price: 1500 },
    { id: 3, name: 'Xiaomi', price: 1000 },
    { id: 4, name: 'Oppo', price: 1200 }
]
const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 }
        ]
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 }
        ]
    }
]
// initialize a product lookup map
const productMap = {};
for(let i = 0; i < products.length; i++){
    productMap[products[i].id] = {price: products[i].price, name: products[i].name, total : 0}
}
// calculate total price with a product
function getTotalPrice(id, quantity){
    return productMap[id].price * quantity;
}
// find the product  max revenue
function getIdMaxProduct(arr){
    let maxRevenue = 0;
    let topProductIds = [];
    if (arr.length === 0) return [];
    // aggregate total revenue for each product
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].items.length; j++) {
            let item = arr[i].items[j]
            let revenue = getTotalPrice(item.productId, item.quantity);
            productMap[item.productId].total += revenue;
        }
    }
    // find the id of the product with highest revenue
    for(let i in productMap){
        let totalProduct = productMap[i].total;
        if(totalProduct > maxRevenue){
            maxRevenue = totalProduct;
            topProductIds = [i]
        } else if(totalProduct === maxRevenue && totalProduct > 0) topProductIds.push(i);
    }
    return topProductIds;
}
// print the top revenue products list
let topIdProducts = getIdMaxProduct(orders);
if(topIdProducts.length > 0) {
    console.log(`Top revenue :`);
    for(let i of topIdProducts){
        console.log(`${productMap[topIdProducts[i]].name} : ${productMap[topIdProducts[i]].total}`);
    }
} else console.log("No orders found");