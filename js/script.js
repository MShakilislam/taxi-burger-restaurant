const loadCategories = () => {
  const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories"
  fetch(url)
    .then(res => res.json())
    .then(data => dispalyCatagorie(data.categories))
}

const dispalyCatagorie = (categories) => {
  // console.log(categories)
  const catContainer = document.getElementById("category-container")
  catContainer.innerHTML = "";
  for (let cat of categories) {
    // creat element 
    const catagorisCard = document.createElement("div")
    catagorisCard.innerHTML = `
        
        <button id="cat-btn-${cat.id}" onclick="loadFrod(${cat.id})" class="btn btn-block shadow justify-start btn-category">
          <img src="${cat.categoryImg}" alt="" class="w-10" />${cat.categoryName}
        </button>
        `;
    // append the element 
    catContainer.append(catagorisCard)
  }
}
// froud catagory button dispaly 
////////////////////////////////////////////////////////////////////

const loadFrod = (id) => {
  const uri = id ? `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}` : `https://taxi-kitchen-api.vercel.app/api/v1/foods/random`;

  // jkhane btn a click korbe sei btn ar active class remove kore dite hobe
  const catBtn =document.querySelectorAll(".btn-category")
  catBtn.forEach(btn => btn.classList.remove("active"))

  //  jkhane click korbe sekhane active class add korte hobe 
  const carrentBtn = document.getElementById(`cat-btn-${id}`);
  // console.log(carrentBtn)
  carrentBtn.classList.add("active")

  fetch(uri)
    .then(res => res.json())
    .then(data => dispalyFoods(data.foods))
}

const dispalyFoods = (foods) => {
  // console.log(foods)
  const foodsContainer = document.getElementById("food-container");
  foodsContainer.innerHTML = "";
  foods.forEach((food) => {
    const foodCard = document.createElement("div")
    foodCard.innerHTML = `
      <div class="my-3">
        <div onclick="showModalLoad(${food.id})" class="p-5 bg-white flex gap-3 shadow-lg rounded-xl">
          <div class="img flex-1">
            <img src="${food.foodImg}" alt=""
              class="w-[160px] rounded-xl h-[160px] object-cover" />
          </div>
          <div class="flex-2">
            <h1 class="text-xl font-bold">
              ${food.title}
            </h1>

            <div class="badge badge-warning">${food.category}</div>

            <div class="divider divider-end">
              <h2 class="text-yellow-600 font-semibold">
                $ <span class="price">${food.price}</span>
              </h2>
            </div>

            <button class="btn btn-warning">
              <i class="fa-solid fa-square-plus"></i>
              Add This Item
            </button>
          </div>
        </div>
      </div>
        `
    foodsContainer.append(foodCard)
  })

}
/////////////////////////////////////////

// show modal data 
const showModalLoad = (id) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  // console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(data => dispalyDitails(data.details))
}

const dispalyDitails = (add) => {
  const ditaileContainer = document.getElementById("detail-Container")
  ditaileContainer.innerHTML = "";
  ditaileContainer.innerHTML = `
    

    <div class="p-3 mx-auto">
        <h1 class="font-semibold text-center pb-2">${add.title}</h1>
        <div class="im">
            <img src="${add.foodImg}" alt="" class="">
        </div>
        <div class="flex justify-center items-center gap-4 pt-2">
            <button class="btn btn-primary">${add.area}</button>
            <a href="${add.video} target="_blank" class="btn btn-warning">Video</a>
        </div>
    </div>

  `;
  document.getElementById("my_modal_3").showModal()
}

//////////////////////////////////////////////
// random data 
const loadRandomData = () => {
  const api = `https://taxi-kitchen-api.vercel.app/api/v1/foods/random`;
  fetch(api)
    .then(res => res.json())
    .then(data => dispalyFoods(data.foods))
}






loadCategories()
// loadRandomData()
loadFrod(10)


