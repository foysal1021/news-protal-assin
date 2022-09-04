// all Category is start here
const allCategory = () => {
  try {
    fetch('https://openapi.programming-hero.com/api/news/categories')
      .then(res => res.json())
      .then(catagory => CategoryInfo(catagory.data.news_category))
  } catch (e) {
    console.log(e);
  }
}
// all Category is end here


//Category info is start here
const CategoryInfo = (rcvInfo) => {
  const ManuBtn = document.getElementById('all-manu-btn');
  //loop is start here
  rcvInfo.forEach(info => {
    const ManuBtnDiv = document.createElement('div');
    ManuBtnDiv.classList.add('text-center');
    ManuBtnDiv.innerHTML = ` <button onclick="allCategoryBTN('${info.category_id}')" class="btn btn-success w-100 mt-2"> ${info.category_name} </button>`;
    ManuBtn.appendChild(ManuBtnDiv);
  });
  //loop is end here
}
allCategory();
//Category info is end here


// all Category BTN start here
const allCategoryBTN = (rcv_category_id) => {
  document.getElementById('spinner').classList.remove('d-none')
  const url = ` https://openapi.programming-hero.com/api/news/category/${rcv_category_id}`;
  try {
    fetch(url)
      .then(res => res.json())
      .then(category => displayNews(category.data));
  } catch (e) {
    console.log(e);
  }
}
// all Category BTN end here



//display news start here
const displayNews = (category) => {

  category.sort((a, b) => b.total_view - a.total_view); // top views serial
  document.getElementById('news-length').innerText = category.length; // new search length show 
  if (category.length < 1) {
    document.getElementById('spinner').classList.add('d-none'); //stop spinner for  Culture btn
    document.getElementById('news-length').innerText = "no data"; // no data found message
  }
  
  const NewsContainer = document.getElementById('news-container');
  NewsContainer.innerHTML = "";
  category.forEach(news => {
    const NewsDiv = document.createElement("div");
    NewsDiv.classList.add('card');
    NewsDiv.classList.add('mb-3');
    NewsDiv.innerHTML =
      `<div onclick="GetNewsId('${news._id}')" class="row g-0" data-bs-toggle="modal" data-bs-target="#exampleModal">
     <div class="col-md-3 text-lg-start text-center">
    <img src="${news.thumbnail_url}" class="img-fluid rounded-start h-100 " alt="...">
    </div>

    <div class="col-md-9">
      <div class="card-body">
        <h4 class="card-title text-center text-lg-start"> ${news.title} </h4>
           <p class="card-text text-center my-3 text-lg-start my-lg-0"> ${news.details.slice(0,400)}...... </p>
        <div class=" d-block d-lg-flex align-items-center mt-5">
          <div class="d-flex col-12 col-lg-5 justify-content-center justify-content-lg-start">
            <img class="repoter-img" src="${news.author.img}"/>
            <div>
          <h5 class="m-0 ms-3">${news.author.name?news.author.name:'no name found'}</h5>
            <p class="ms-3"> ${news.author.published_date?news.author.published_date:'no date found'} </p>
              </div>
            </div>
          <div class="">
            <p class="mt-3 text-center mt-lg-0"><i class="fa-sharp fa-solid fa-eye"></i> ${news.total_view?news.total_view:'no views'} </P>
             </div>
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
const GetNewsId = (rcvNewsId) => {
  const url = `https://openapi.programming-hero.com/api/news/${rcvNewsId}`;
  try {
    fetch(url)
      .then(res => res.json())
      .then(newsid => getModalData(newsid.data))
  } catch (e) {
    console.log(e);
  }
}
const getModalData = (rcvNewsID) => {
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML =
    `
  <img class="w-100" src='${rcvNewsID[0].image_url}'/>
  <h6> this is today photo : ${rcvNewsID[0].others_info.is_todays_pick}</h6>
  <p> category id: ${rcvNewsID[0].category_id} </P>
  <p> _id: ${rcvNewsID[0]._id} </P>
  <h5> ${rcvNewsID[0].title} </h5>
  <p> ${rcvNewsID[0].details} </p>
  <div class="d-flex align-items-center my-2"> 
  <img style="width:50px;border-radius:25px" src="${rcvNewsID[0].author.img}"/>
  <h5 class="ms-2"> Repoter : ${rcvNewsID[0].author.name?rcvNewsID[0].author.name: 'no name found'} </h5>
  </div>
  <p> published date : ${rcvNewsID[0].author.published_date?rcvNewsID[0].author.published_date:'no date found'} </p>
  <h5> Total Views : ${rcvNewsID[0].total_view?rcvNewsID[0].total_view:"no views"} </h5>
  <p> this is tranding news? : ${rcvNewsID[0].others_info.is_trending}</p>
  `
};
// modal is end here

// linked with blog.html form index.html
const newBlog = () => {
  document.getElementById('spinner').classList.remove('d-none');
  window.open('https://radiant-cucurucho-7a5447.netlify.app/');
  document.getElementById('spinner').classList.add('d-none');
}