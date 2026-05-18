const employees = [
    { id: 1, name: "Alice", age: 23, status: 'working' },
    { id: 3, name: "Bob", age: 25, status: 'working' },
    { id: 6, name: "John", age: 27, status: 'working' },
    { id: 8, name: "David", age: 23, status: 'quit_job' },
    { id: 10, name: "Eve", age: 20, status: 'working' },
];
const products = [
    { id: 1, name: "Phone", price: 1200 },
    { id: 2, name: "Laptop", price: 3000  },
    { id: 3, name: "Tab", price: 2000  },
    { id: 4, name: "PC", price: 800  },
    { id: 5, name: "Monitor", price: 1500  },
]
const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 1 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];
const productsMap = new Map(products.map(product => [product.id, {...product, revenue: 0}]));
const employeesMap = new Map(employees.map(employee => [employee.id, {...employee, numberOrder: 0, revenue: 0}]));
// Question 1:
function getEmployeesByWorking (employees = []){
    return employees.filter(employee => employee.status === "working");
}
// Question 2:
function getEmployeeByOldestOrNull (employees){
    if (!employees || employees.length === 0) return null;
    let oldest = employees[0].age;
    let oldestEmployee = employees[0];
    for(let i = 1; i < employees.length; i++){
        if(employees[i].age > oldest){
            oldest = employees[i].age;
            oldestEmployee = employees[i];
        }
    }
    return oldestEmployee;
}
// Question 3:
function getProductByCheapestPriceOrNull (product) {
    if (!products || product.length === 0) return null;
    let cheapestPrice = products[0].price;
    let cheapestProduct = products[0];
    for(let i = 1; i < products.length; i++){
        if(products[i].price < cheapestPrice){
            cheapestPrice = products[i].price;
            cheapestProduct = products[i];
        }
    }
    return cheapestProduct;
}
// Question 4:
function getProductBestseller(orders= []){
    if (!orders || orders.length === 0) return null;
    let largestQuantity = orders[0].quantity;
    let productBestseller = productsMap.get(orders[0].productId);
    for(let i = 1; i < orders.length; i++){
        if(largestQuantity < orders[i].quantity){
            largestQuantity = orders[i].quantity;
            productBestseller = productsMap.get(orders[i].productId);
        }
    }
    return productBestseller;
}
// Question 5:
function getProductBestsellerOrNull(orders= []){
    let highestRevenue = -Infinity;
    let highestRevenueProduct = {};
    if (!orders) return null;
    for(let i = 0; i < orders.length; i++) {
        let product = productsMap.get(orders[i].productId);
        product.revenue += product.price * orders[i].quantity;
    }
    for (let product of productsMap.values()) {
        if (product.revenue > highestRevenue) {
            highestRevenue = product.revenue;
            highestRevenueProduct = product;
        }
    }
    return highestRevenueProduct.revenue > 0 ? highestRevenueProduct : null;
}
// Question 6
function getTopSalesEmployee(orders= []){
    if (!orders) return null;
    let largestQuantity = -Infinity;
    let topSalesEmployee = {};
    if (!orders) return null;
    for(let i = 0; i < orders.length; i++){
        let employee = employeesMap.get(orders[i].employeeId);
        employee.numberOrder += orders[i].quantity;
    }
    for (let employee of employeesMap.values()) {
        if (employee.numberOrder > largestQuantity) {
            largestQuantity = employee.numberOrder;
            topSalesEmployee = employee;
        }
    }
    return topSalesEmployee.numberOrder > 0 ? topSalesEmployee : null;
}
// Question 7
function getTopRevenueEmployee(orders= []){
    if (!orders) return null;
    let highestRevenue = -Infinity;
    let topRevenuaEmployee = {};
    for(let i = 0; i < orders.length; i++){
        let product = productsMap.get(orders[i].productId);
        let employee = employeesMap.get(orders[i].employeeId);
        employee.revenue += product.price * orders[i].quantity;
    }
    for (let employee of employeesMap.values()) {
        if (employee.revenue > highestRevenue) {
            highestRevenue = employee.revenue;
            topRevenuaEmployee = employee;
        }
    }
    return topRevenuaEmployee.revenue > 0 ? topRevenuaEmployee : null;
}



// ---------
console.log(getEmployeesByWorking(employees));
console.log(getEmployeeByOldestOrNull(employees));
console.log(getProductByCheapestPriceOrNull(products));
console.log(getProductBestseller(orders));
console.log(getProductBestsellerOrNull(orders));
console.log(getTopSalesEmployee(orders));
console.log(getTopRevenueEmployee(orders));
