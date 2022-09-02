// all Category is start here
const allCategory = ()=>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(catagory => CategoryInfo(catagory.data.news_category))
}
// all Category is end here


//Category info is start here
const CategoryInfo = (rcvInfo)=>{
    const ManuBtn = document.getElementById('all-manu-btn');
    //loop is start here
    rcvInfo.forEach(info =>{
    const ManuBtnDiv = document.createElement('div');
    ManuBtnDiv.innerHTML = ` <button onclick="allCategoryBTN('${info.category_id}')" class="btn btn-success"> ${info.category_name} </button>`;
    ManuBtn.appendChild(ManuBtnDiv);
    });
    //loop is end here
}
//Category info is end here
allCategory();


