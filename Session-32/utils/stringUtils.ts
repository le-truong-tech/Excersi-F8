export function cleanPhone(phone: string): string {
    let cleanedPhone = phone.replace(/[\s\-\.\(\)]/g, "");

    if(cleanedPhone.startsWith("+84")) cleanedPhone = "0" + cleanedPhone.slice(3);
    else if(cleanedPhone.startsWith("84")) cleanedPhone = "0" + cleanedPhone.slice(2);

    return cleanedPhone;
}

export function isPhone(phone: string): boolean {
    const cleanedPhone: string = cleanPhone(phone);

    const phoneRegex = /^0[3|5|7|8|9][0-9]{8}$/
    return phoneRegex.test(cleanedPhone);
}