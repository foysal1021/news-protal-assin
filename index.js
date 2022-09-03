// all Category is start here
const allCategory = ()=>{
  try{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(catagory => CategoryInfo(catagory.data.news_category))
  }catch(e){
    console.log(e);
  }
}
// all Category is end here


//Category info is start here
const CategoryInfo = (rcvInfo)=>{
    const ManuBtn = document.getElementById('all-manu-btn');
    //loop is start here
    rcvInfo.forEach(info =>{
    const ManuBtnDiv = document.createElement('div');
    ManuBtnDiv.classList.add('text-center');
    ManuBtnDiv.innerHTML = ` <button onclick="allCategoryBTN('${info.category_id}')" class="btn btn-success w-100 mt-2"> ${info.category_name} </button>`;
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
    try{
      fetch (url)
      .then(res => res.json())
      .then(category => displayNews(category.data));
    }
    catch(e){
      console.log(e);
    }
}
// all Category BTN end here

//display news start here
const displayNews = (category)=>{
  if(category.length<1){
    document.getElementById('spinner').classList.add('d-none');
  }
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
      <img src="${news.image_url}" class="img-fluid rounded-start h-100" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title"> ${news.title} </h4>
        <p class="card-text"> ${news.details.slice(0,400)}...... </p>
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
  try{
    fetch(url)
    .then(res => res.json())
    .then(newsid =>getModalData(newsid.data))
  }
  catch(e){
    console.log(e);
  }
}

const getModalData = (rcvNewsID)=>{
  console.log(rcvNewsID[0]);
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML=
  `
  <img class="w-100" src='${rcvNewsID[0].image_url}'/>
  <p> _id: ${rcvNewsID[0]._id} </P>
  <h5> ${rcvNewsID[0].title} </h5>
  <p> ${rcvNewsID[0].details} </p>
  <h5> Repoter : ${rcvNewsID[0].author.name} </h5>
  <p> published date : ${rcvNewsID[0].author.published_date} </p>
  <h5> Total Views : ${rcvNewsID[0].total_view?rcvNewsID[0].total_view:"no views"} </h5>
  `
};
// modal is end here



// linded with blog.html form index.html
const newBlog = ()=>{
  document.getElementById('spinner').classList.remove('d-none');
  window.open('http://127.0.0.1:5500/blog.html');
  document.getElementById('spinner').classList.add('d-none');
}