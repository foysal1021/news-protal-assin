// all Category is start here
const allCategory = ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(catagory => CategoryInfo(catagory.data.news_category))
}
// all Category is end here

