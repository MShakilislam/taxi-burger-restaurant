const loadCategories = () => {
  const url = "https://taxi-kitchen-api.vercel.app/api/v1/categories"
  fetch(url)
    .then(res => res.json())
    .then(data => dispalyCatagorie(data.categories))
}

let cartData = [];
let total = 0;

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
  //food container k hide kora loading k show korbo 
  document.getElementById("food-container").classList.add("hidden")
  document.getElementById("loading-spinner").classList.remove("hidden")


  const uri = id ? `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}` : `https://taxi-kitchen-api.vercel.app/api/v1/foods/random`;

  // jkhane btn a click korbe sei btn ar active class remove kore dite hobe
  const catBtn = document.querySelectorAll(".btn-category")
  catBtn.forEach(btn => btn?.classList?.remove("active"))

  //  jkhane click korbe sekhane active class add korte hobe 
  const carrentBtn = document.getElementById(`cat-btn-${id}`);
  carrentBtn?.classList?.add("active")

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
        <div class="p-5 bg-white flex gap-3 shadow-lg rounded-xl">
          <div class="img flex-1">
            <img src="${food.foodImg}" alt="" onclick="showModalLoad(${food.id})"
              class="w-[160px] rounded-xl h-[160px] object-cover food-img cursor-pointer" />
          </div>
          <div class="flex-2">
            <h1 class="text-xl font-bold food-title">
              ${food.title}
            </h1>

            <div class="badge badge-warning">${food.category}</div>

            <div class="divider divider-end">
              <h2 class="text-yellow-600 font-semibold">
                $ <span class="price food-price">${food.price}</span>
              </h2>
            </div>

            <button onclick="addToCard(this)" class="btn btn-warning">
              <i class="fa-solid fa-square-plus"></i>
              Add This Item
            </button>
          </div>
        </div>
      </div>
        `
    foodsContainer.append(foodCard)
  })
  // food container k show korbo     and    loading container k hide korbo     
  document.getElementById("food-container").classList.remove("hidden")
  document.getElementById("loading-spinner").classList.add("hidden")
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

//items container section right section 
// document.getElementById("food-container").addEventListener("click",(e) => {
//   console.log(e.target);
// })

// ekhane carda ar btn a click korle akta kore card right side a joma hoy thakbe
const addToCard = (btn) => {
  const card = btn.parentNode.parentNode;
  const foodTitle = card.querySelector(".food-title").innerText;
  const foodImg = card.querySelector(".food-img").src;
  const foodPrice = card.querySelector(".food-price").innerText;
  const foodPriceNum = Number(foodPrice)
  // console.log(foodTitle, foodImg, foodPriceNum)

  const selectdetItems = {
    id:cartData.length + 1,
    foodTitle: foodTitle,
    foodimg: foodImg,
    foodPrice: foodPriceNum,
  };
  cartData.push(selectdetItems)
  total = total + foodPriceNum;
  dispalyCart(cartData)
  displayTotal(total)
}
const displayTotal = (val) => {
  document.getElementById("cart-total").innerHTML = val
}

const dispalyCart = (cart) => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = ""

  for (let item of cart) {
    const newItem = document.createElement("div");
    newItem.innerHTML = ` 
    <div class="p-1 bg-white flex gap-3 shadow rounded-xl relative">

          <span class="card-id hidden">${item.id}</span>
          <div class="img">
            <img src="${item.foodimg}" alt=""
              class="w-[50px] rounded-xl h-[50px] object-cover" />
          </div>
          <div class="flex-1">
            <h1 class="text-xs font-bold food-title">
              ${item.foodTitle}
            </h1>

            <div class="">
              <h2 class="text-yellow-600 font-semibold">
                $ <span class="item-price">${item.foodPrice}</span> BDT
              </h2>
            </div>
          </div>
          <div onclick="removeCard(this)"
            class="w-6 h-6 flex justify-center items-center bg-red-600 rounded-full absolute -top-1 -right-1 text-white cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
          </div>
        </div>
    
    `;

    cartContainer.append(newItem)

  }
}

const removeCard = (btn) => {
  const items = btn.parentNode;
  // const foodTitle = items.querySelector(".food-title").innerText;
  const id = Number(items.querySelector(".card-id").innerText);
  const foodprice = Number(items.querySelector(".item-price").innerText);
  // console.log(foodTitle)
  cartData = cartData.filter((items) => items.id != id)
  total = 0;
  cartData.forEach((items) => (total += items.foodPrice))
  dispalyCart(cartData);
  displayTotal(total)
}