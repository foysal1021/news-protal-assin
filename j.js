const x = [
    {product : "laptop", price : 5},
    {product : "laptop", price : 53},
    {product : "laptop", price : 5433},
    {product : "laptop", price : 35},
]

const y = x.sort( (a,b)=>{
    const aprice = a.price;
    const bprice = b.price;
    return bprice - aprice;
});
console.log(y)