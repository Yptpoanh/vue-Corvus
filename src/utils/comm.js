/**
 * 生成UUID 并去掉 ‘-’
 * @returns {string}
 */
export function uuid() {
    console.log("uuid")
    let s = [];
    const hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("");
    uuid = uuid.replace(/-/g,"")
    return uuid;
}

/**
 * 两个值差的绝对值
 * @param numberA
 * @param numberB
 * @returns {boolean}
 */
export function towNumberMinusAbs(numberA,numberB,NumberC){
    try {
        if(Math.abs(numberA-numberB)<NumberC){
            return true;
        }else{
            return false;
        }
    }catch (e) {
        console.log("差值出现错误："+e);
    }

}