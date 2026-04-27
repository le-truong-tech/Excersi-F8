//Bai1
function isEvenNumber(number){
    return number % 2 ===0;
}
console.log(isEvenNumber(10));
console.log(isEvenNumber(7));

//Bai2
// 1 0 - 50 kWh 1.678 đ/kWh
// 2 51 - 100 kWh 1.734 đ/kWh
// 3 101 - 200 kWh 2.014 đ/kWh
// 4 201 - 300 kWh 2.536 đ/kWh
// 5 301 - 400 kWh 2.834 đ/kWh
// 6 Trên 400 kWh 2.927 đ/kWh
function getElectricityBill(kwh){
    const rateLevel1 = 1678, rateLevel2 = 1734, rateLevel3 = 2014, rateLevel4 = 2536,
        rateLevel5 = 2834, rateLevel6 = 2927;
    let totalPrice = 0;
    if(kwh < 51) {
        totalPrice = rateLevel1 * kwh;
        return `${kwh} * ${rateLevel1} = ${totalPrice}`;
    } else if(kwh < 101){
        totalPrice = (rateLevel1 * 50) + (rateLevel2 * (kwh - 50));
        return `(50 * ${rateLevel1}) + (${kwh - 50} * ${rateLevel2}) = ${totalPrice}`;
    } else if(kwh < 201) {
        totalPrice = (rateLevel1 * 50) + (rateLevel2 * 50) + (rateLevel3 * (kwh - 100));
        return `(50 * ${rateLevel1}) + (50 * ${rateLevel2}) + (${kwh - 100} * ${rateLevel3}) = ${totalPrice}`;
    } else if(kwh < 301) {
        totalPrice = (rateLevel1 * 50) + (rateLevel2 * 50) + (rateLevel3 * 100) + (rateLevel4 * (kwh - 200));
        return `(50 * ${rateLevel1}) + (50 * ${rateLevel2}) + (100 * ${rateLevel3}) + (${kwh - 200} * ${rateLevel4}) = ${totalPrice}`;
    } else if(kwh < 401) {
        totalPrice = (rateLevel1 * 50) + (rateLevel2 * 50) + (rateLevel3 * 100) + (rateLevel4 * 100) + (rateLevel5 * (kwh - 300));
        return `(50 * ${rateLevel1}) + (50 * ${rateLevel2}) + (100 * ${rateLevel3}) + (100 * ${rateLevel4}) + (${kwh - 300} * ${rateLevel5}) = ${totalPrice}`;
    }
    else {
        totalPrice = (rateLevel1 * 50) + (rateLevel2 * 50) + (rateLevel3 * 100) + (rateLevel4 * 100) + (rateLevel5 * 100) + (rateLevel6 * (kwh - 400));
        return `(50 * ${rateLevel1}) + (50 * ${rateLevel2}) + (100 * ${rateLevel3}) + (100 * ${rateLevel4}) + (100 * ${rateLevel5}) + (${kwh - 400} * ${rateLevel6}) = ${totalPrice}`;
    }
}
console.log(getElectricityBill(70));
console.log(getElectricityBill(120));

//Bai3
function cleanName(name, keyword){
    name = name.toLowerCase().trim();
    keyword = keyword.toLowerCase().trim();
    return name.includes(keyword)
}
console.log(cleanName('   NGUYEN Van An   ', 'an'));
console.log(cleanName('   Tran Thi B ', 'hoang'));