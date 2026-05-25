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
];
const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 1 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];
const productsLookup = {};
for(const product of products) productsLookup[product.id] = {name: product.name, price: product.price};

// Generates a revenue lookup form employees
function getRevenueEmployeesLookup(arr = []){
    if (!arr || arr.length === 0) return {};
    const employeesLookupRevenue = {};
    for(const order of arr){
        if (employeesLookupRevenue[order.employeeId] !== undefined) employeesLookupRevenue[order.employeeId] += order.quantity * productsLookup[order.productId].price;
        else employeesLookupRevenue[order.employeeId] = order.quantity * productsLookup[order.productId].price;
    }
    return employeesLookupRevenue;
}
// Quesion 1
function getEmployeesByWorkingOrNull(arr = []){
    if (!arr || arr.length === 0) return null;
    return arr.filter(employee => employee.status === "working");
}

//Question 2
function getEmployeesByOldestOrNull(arr = []){
    if (!arr || arr.length === 0) return null;
    let oldest = -Infinity;
    let oldestEmployee = null;
    for(let employee of arr){
        if (oldest < employee.age) {
            oldest = employee.age;
            oldestEmployee = employee;
        }
    }
    return oldestEmployee;
}

//Question 3:
function getProductByCheapestPriceOrNull(arr = []){
    if (!arr || arr.length === 0) return null;
    let cheapestPrice = arr[0].price;
    let cheapestProduct = arr[0];
    for(let i = 1; i < arr.length; i++){
        if (cheapestPrice > arr[i].price) {
            cheapestPrice = arr[i].price
            cheapestProduct = arr[i];
        }
    }
    return cheapestProduct;
}

//Question 4:
function getProductByBestsellerOrNull(arr = []){
    if (!arr || arr.length === 0) return null;
    let bestseller = -Infinity;
    let productBestseller = null;
    const productBestsellerLookup = {};
    for(const order of arr){
        const idProduct = order.productId;
        if (productBestsellerLookup[idProduct] !== undefined) productBestsellerLookup[idProduct] += order.quantity;
        else productBestsellerLookup[idProduct] = order.quantity;
    }
    for(const product of products){
        const quantity = productBestsellerLookup[product.id] !== undefined ? productBestsellerLookup[product.id] : 0;
        if (bestseller < quantity){
            bestseller = quantity
            productBestseller = product;
        }
    }
    return {productBestseller, sold: bestseller};
}

//Question 5
function getProductByTopRevenueOrNull(arr = []){
    if (!arr || arr.length === 0) return null;
    let topRevenue = -Infinity;
    let topRevenueProduct = null;
    const productLookupRevenue = {};
    for(const order of arr){
        if (productLookupRevenue[order.productId] !== undefined) productLookupRevenue[order.productId] += order.quantity * productsLookup[order.productId].price;
        else productLookupRevenue[order.productId] = order.quantity * productsLookup[order.productId].price;
    }
    for (const product of products){
        if (topRevenue < productLookupRevenue[product.id]){
            topRevenue = productLookupRevenue[product.id];
            topRevenueProduct = product;
        }
    }
    return {topRevenueProduct, revenue: topRevenue};
}

//Question 6
function getEmployeeByTopSalesOrNull(arr = []){
    if (!arr || arr.length === 0) return null;
    let sold = -Infinity;
    let topsalesEmployee = null
    const employeesLookupSales = {};
    for(const order of arr){
        if (employeesLookupSales[order.employeeId] !== undefined) employeesLookupSales[order.employeeId] += order.quantity;
        else employeesLookupSales[order.employeeId] = order.quantity;
    }
    for(const employee of employees){
        if (sold < employeesLookupSales[employee.id]){
            sold = employeesLookupSales[employee.id];
            topsalesEmployee = employee;
        }
    }
    return {topsalesEmployee, sold: sold};
}

//Question 7
function getEmployeeTopRevenueOrNull(arr = []){
    if (!arr || arr.length === 0) return null;
    let revenue = -Infinity;
    let topRevenueEmployee = null
    let employeesRevenueLookup = {};
    employeesRevenueLookup = getRevenueEmployeesLookup(arr);
    if (employeesRevenueLookup === null) return null;
    for(const employee of employees){
        if (revenue < employeesRevenueLookup[employee.id]){
            revenue = employeesRevenueLookup[employee.id];
            topRevenueEmployee = employee;
        }
    }
    return {topRevenueEmployee, revenue: revenue};
}

//Question 8
function getTopRevenueProductPerEmployeeOrNull(arr = []){
    if (!arr || arr.length === 0) return null;
    let revenueProductPerEmployee = {};
    let arrRevenueProductPerEmployee = [];
    for(const order of arr){
        let id = `${order.employeeId}_${order.productId}`;
        if(revenueProductPerEmployee[id] !== undefined) revenueProductPerEmployee[id] += order.quantity * productsLookup[order.productId].price;
        else revenueProductPerEmployee[id] = order.quantity * productsLookup[order.productId].price;
    }
    for(const employee of employees){
        let topRevenue = -Infinity;
        let topProduct = null;
        for(const product of products){
            let id = `${employee.id}_${product.id}`;
            if (topRevenue < revenueProductPerEmployee[id]) {
                topRevenue = revenueProductPerEmployee[id];
                topProduct = product;
            }
        }
        if(topProduct)  arrRevenueProductPerEmployee.push({employeeId: employee.id, employeeName: employee.name, productId: topProduct.id, productName: topProduct.name, revenue: topRevenue })
        else continue;
    }
    return arrRevenueProductPerEmployee;
}

//Question 9
function getEmployeeCommission(arr = []){
    if (!arr || arr.length === 0) return null;
    let employeesRevenueLookup = {};
    employeesRevenueLookup = getRevenueEmployeesLookup(arr);
    if (employeesRevenueLookup === null) return null;
    const arrEmployeeCommission = [];
    for(const employee of employees){
        const commission = employeesRevenueLookup[employee.id] !== undefined ? employeesRevenueLookup[employee.id] * 0.03 : 0;
        arrEmployeeCommission.push({employee, commission: commission});
    }
    return arrEmployeeCommission;
}

//Question 10
function partition(array, left, right){
    let i = left;
    const pivot = right;
    for(let j = left; j < right; j++){
        if (array[pivot].revenue < array[j].revenue){
            let temp = array[i]; array[i] = array[j]; array[j] = temp; i++;
        }
    }
    let temp = array[pivot]; array[pivot] = array[i]; array[i] = temp;
    return i;
}

function quickSortEmployeeByRevenueDesc(arrEmployeeRevenue, left, right) {
    if (left >= right) return;
    const pos = partition(arrEmployeeRevenue, left, right);
    quickSortEmployeeByRevenueDesc(arrEmployeeRevenue, left, pos - 1);
    quickSortEmployeeByRevenueDesc(arrEmployeeRevenue, pos + 1, right);
}

function sortEmployeeByRevenueDesc(arr = []){
    if (!arr || arr.length === 0) return null;
    let employeesLookupRevenue = {};
    employeesLookupRevenue = getRevenueEmployeesLookup(arr);
    if (employeesLookupRevenue === null) return null;
    const arrEmployeeRevenue = [];
    for(const employee of employees) arrEmployeeRevenue.push({employee, revenue: employeesLookupRevenue[employee.id] !== undefined ? employeesLookupRevenue[employee.id] : 0});
    quickSortEmployeeByRevenueDesc(arrEmployeeRevenue, 0, arrEmployeeRevenue.length-1);
    return arrEmployeeRevenue
}


// --------------------
console.log("Quesion 1:", getEmployeesByWorkingOrNull(employees));
console.log("---------------------------------------------------");
console.log("Quesion 2:", getEmployeesByOldestOrNull(employees));
console.log("---------------------------------------------------");
console.log("Quesion 3:", getProductByCheapestPriceOrNull(products));
console.log("---------------------------------------------------");
console.log("Quesion 4:", getProductByBestsellerOrNull(orders));
console.log("---------------------------------------------------");
console.log("Quesion 5:", getProductByTopRevenueOrNull(orders));
console.log("---------------------------------------------------");
console.log("Quesion 6:", getEmployeeByTopSalesOrNull(orders));
console.log("---------------------------------------------------");
console.log("Quesion 7:", getEmployeeTopRevenueOrNull(orders));
console.log("---------------------------------------------------");
console.log("Quesion 8:", getTopRevenueProductPerEmployeeOrNull(orders));
console.log("---------------------------------------------------");
console.log("Quesion 9:", getEmployeeCommission(orders));
console.log("---------------------------------------------------");
console.log("Quesion 10:", sortEmployeeByRevenueDesc(orders));
console.log("---------------------------------------------------");

