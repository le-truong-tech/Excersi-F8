const products = [
    { id: 1, name: 'MacBook Pro', price: 2000, category: 'Laptop' },
    { id: 2, name: 'iPhone 15', price: 1000, category: 'Phone' },
    { id: 3, name: 'Bàn phím cơ', price: 150, category: 'Accessories' },
    { id: 4, name: 'Màn hình Dell', price: 500, category: 'Monitor' }
];

const orders = [
    { orderId: 'ORD01', productId: 2, quantity: 2, status: 'completed' },
    { orderId: 'ORD02', productId: 1, quantity: 1, status: 'pending' },
    { orderId: 'ORD03', productId: 4, quantity: 3, status: 'completed' },
    { orderId: 'ORD04', productId: 3, quantity: 1, status: 'canceled' },
    { orderId: 'ORD05', productId: 2, quantity: 1, status: 'completed' }
];
/*
Yêu cầu:
Bạn hãy viết một đoạn code ngắn gọn (có thể dùng chaining - nối chuỗi các phương thức) để tạo ra một mảng mới tên là completedOrderDetails với các điều kiện sau:
Chỉ lấy những đơn hàng có trạng thái là 'completed' (đã hoàn thành).
Kết hợp với mảng products để lấy tên sản phẩm và tính tổng tiền cho từng đơn hàng.
Mảng kết quả trả về phải có cấu trúc object như sau: { idDonHang, tenSanpham, tongTien } (trong đó tongTien = price * quantity).
*/
const productsMap = new Map(products.map(product => [product.id, product]));
const completedOrderDetails = orders.filter(order => order.status === "completed").map(orderDetails => {
    let product = productsMap.get(orderDetails.productId);
    return {
        idDonHang: orderDetails.orderId,
        tenSanPham: product?product.name:"Doesn't exits!",
        tongTien: orderDetails.quantity * (product?product.price:0)
    }
});
console.log(completedOrderDetails);