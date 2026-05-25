const invoiceData = {
    meta: {
        invoiceNo: "WM-20260521-0001",
        saleDate: "2026/05/21",
        currency: "VND",
        paymentMethod: "Cash" // Tiền mặt / Chuyển khoản...
    },


    seller: {
        name: "WinMark 2 ba trung",
        address: "2 Ba trung - HN",
        phone: "012345678",
        representative: "Đại diện WinMark"
    },


    customer: {
        name: "Nguyen Van A",
        age: 20,
        address: "Ha Dong Ha noi"
    },

    items: [
        {
            no: 1,
            name: "Ao Thun",
            size: "XL",
            quantity: 1,
            price: 200000
        },
        {
            no: 2,
            name: "Ao Thun",
            size: "XL",
            quantity: 2,
            price: 250000
        }
    ],

    // 5. Chương trình ưu đãi / Giảm giá (Promotion & Discount)
    promotion: {
        description: "Khuyen mai 50% chi KH than thiet",
        discountPercent: 50
    }
}

const nameShopEl = document.querySelectorAll('.name-shop');
nameShopEl.forEach(el => {
    el.innerText = invoiceData.seller.name;
});

const codeEl = document.querySelector('.code');
codeEl.innerText = invoiceData.meta.invoiceNo;

const saleDateEl = document.querySelector('.sales-date');
saleDateEl.innerHTML = invoiceData.meta.saleDate;

const addressShopEl = document.querySelector('.address-shop')
addressShopEl.innerHTML = invoiceData.seller.address;

const phoneNumber = document.querySelector('.phone-number');
phoneNumber.innerHTML = invoiceData.seller.phone;

const fullNameEl = document.querySelector('.fullname');
fullNameEl.innerHTML = invoiceData.customer.name;

const ageBuyedEl = document.querySelector('.age');
ageBuyedEl.innerHTML = invoiceData.customer.age;

const addressBuyedEl = document.querySelector('.address-buyed');
addressBuyedEl.innerHTML = invoiceData.customer.address;

let totalAmount = 0;

const bodyTableEl = document.querySelector('tbody');
invoiceData.items.forEach(el =>{
    const rowBody = document.createElement('tr');
    const amount = el.price * el.quantity;
    totalAmount += amount;
    rowBody.innerHTML = `<td>${el.no}</td> <td>${el.name}</td> <td>${el.size}</td> <td>${el.quantity}</td> <td>${el.price}đ</td> <td>${amount}đ</td>`
    bodyTableEl.append(rowBody);
});

const descPromotionEl = document.querySelector('.promotion-content');
descPromotionEl.innerHTML = invoiceData.promotion.description

const totalCost = document.querySelector('.total-cost');
totalCost.innerHTML = totalAmount + 'đ';

const discountAmount = totalAmount * invoiceData.promotion.discountPercent / 100;;
const discountAmountEl = document.querySelector('.discount-number');
discountAmountEl.innerHTML = discountAmount + 'đ';

const totalPayment = document.querySelector('.total-amount');
totalPayment.innerHTML = (totalAmount - discountAmount) + 'đ';