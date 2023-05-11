export const getDiscountPricePercent=(original,discount)=>{
const dis=original-discount
const discountPer=(dis/original)*100;
return discountPer.toFixed(2)

}
