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
    document.getElementById('spinner').classList.remove('d-none')
    const url = ` https://openapi.programming-hero.com/api/news/category/${rcv_category_id}`;
    fetch (url)
    .then(res => res.json())
    .then(category => displayNews(category.data));
}
// all Category BTN end here

//display news start here
const displayNews = (category)=>{
    document.getElementById('news-length').innerText = category.length; // this search total regult length
    const NewsContainer = document.getElementById('news-container');
    NewsContainer.innerHTML = "";
    category.forEach( news =>{
    const NewsDiv = document.createElement("div");
    NewsDiv.classList.add('card');
    NewsDiv.classList.add('mb-3');
    NewsDiv.innerHTML =
    `
    <div onclick="GetNewsId('${news._id}')" class="row g-0" data-bs-toggle="modal" data-bs-target="#exampleModal">

    <div class="col-md-4">
      <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
    </div>

    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title"> ${news.title} </h4>
        <p class="card-text"> ${news.details.slice(0,400)} </p>

        <div class="d-flex repoter-details mt-3"> 
        <img class="repoter-img" src="${news.author.img}" />
        <div class="reporte-info">
        <h5> ${news.author.name? news.author.name: "no name found"} </h5>
        <p>  ${news.author.published_date?news.author.published_date:"no date finde"} </p>
        </div>

        <div class="views"><i class="fa-sharp fa-solid fa-eye"></i> ${news.total_view?news.total_view:"no views"} </div>


        
        </div>
        
      </div>
    </div>

  </div>
    `;

    document.getElementById('spinner').classList.add('d-none')
    NewsContainer.appendChild(NewsDiv);
    });
    
}
// modal 
const GetNewsId = (rcvNewsId)=>{
  const url = `https://openapi.programming-hero.com/api/news/${rcvNewsId}`;
  fetch(url)
  .then(res => res.json())
  .then(newsid =>getModalData(newsid.data))
}

const getModalData = (rcvNewsID)=>{
  console.log(rcvNewsID[0]);
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML=
  `
  <img class="w-100" src='${rcvNewsID[0].image_url}'/>
  <h5> ${rcvNewsID[0].title} </h5>
  <p> Total Views : ${rcvNewsID[0].total_view?rcvNewsID[0].total_view:"no views"} </p>
  `
};
// modal is end here

// document.getElementById('blog').addEventListener('click',function(){
//   alert('')
// })

const newBlog = ()=>{
  window.open('http://127.0.0.1:5500/blog.html');
}