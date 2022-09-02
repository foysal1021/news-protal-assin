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



// all Category BTN start here
const allCategoryBTN = (rcv_category_id)=>{
    const url = ` https://openapi.programming-hero.com/api/news/category/${rcv_category_id}`;
    fetch (url)
    .then(res => res.json())
    .then(category => displayNews(category.data));
}
// all Category BTN end here

//display news start here
const displayNews = (category)=>{
    const NewsContainer = document.getElementById('news-container');
    console.log(category);
    category.forEach( news =>{
    
    const NewsDiv = document.createElement("div");
    NewsDiv.classList.add('card');
    NewsDiv.classList.add('mb-3');
    NewsDiv.innerHTML =
    `
    <div class="row g-0">

    <div class="col-md-4">
      <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
    </div>

    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"> ${news.title} </h5>
        <p class="card-text"> ${news.details.slice(0,400)} </p>

        <div class="d-flex repoter-details"> 
        <img class="repoter-img" src="${news.author.img}" />
        <div>
        <h5> ${news.author.name? news.author.name: "no name found"} </h5>
        <p>  hello </p>
        </div>


        
        </div>
        
      </div>
    </div>

  </div>
    `;
    NewsContainer.appendChild(NewsDiv);
    });
    
}
//display news start here