const btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener("click", function () {


  const inputFood = document.getElementById("input-food").value;
  if (inputFood == '') {
    const errorMsgContianer = document.getElementById('error-msg');
    errorMsgContianer.style.display = 'block';
    const noDataMsg= document.getElementById('no-data-msg');
    noDataMsg.style.display='none';
  } else {
    searchMeal(inputFood);
  }

})

const searchMeal = inputFood => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputFood}`)
    .then(res => res.json())
    .then(data => displayData(data.meals))

}
const displayData = meals => {

  const mainContainer = document.getElementById("main-container");
  mainContainer.innerHTML = "";

  if (meals == null) {
    const noDataMsg = document.getElementById('no-data-msg');
    noDataMsg.style.display = 'block';

    const errorMsgContianer = document.getElementById('error-msg');
    errorMsgContianer.style.display='none';
  } else {
    //Hiding error Messages
    const noDataMsg = document.getElementById('no-data-msg');
    noDataMsg.style.display = 'none';
    //Hiding error Messages
    const errorMsgContianer = document.getElementById('error-msg');
    errorMsgContianer.style.display = 'none';

    meals.forEach(meal => {
      const div = document.createElement("div");
      //creating dishcard div
      const dishCard = document.createElement('div');
      dishCard.id = 'dish-card';

      //creating image and append to dishCard
      const cardImg = document.createElement('img');
      cardImg.id = 'card-img';
      cardImg.src = meal.strMealThumb;
      dishCard.appendChild(cardImg);

      //creating image title div append ot dishCard
      const foodTitle = document.createElement('h3');
      foodTitle.id = 'food-title';
      foodTitle.innerHTML = meal.strMeal;
      dishCard.appendChild(foodTitle);

      div.appendChild(dishCard);

      mainContainer.appendChild(div);
    });
  }
}


//Modal

// Get the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the image, open the modal
const mainContainer = document.getElementById("main-container");

mainContainer.addEventListener('click', function () {
  const clickedFoodName = event.target.children[1].innerHTML;
  
  
  getDetails(clickedFoodName);
  modal.style.display = "block";
})

const getDetails=clickedFoodName=>{
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${clickedFoodName}`)
    .then(res => res.json())
    .then(data =>{
      //setting modal image
      const foodImg= data.meals[0].strMealThumb;      
      document.getElementById('recipe-img').src=foodImg;
      //setting modal title
      const foodTitle= data.meals[0].strMeal;
      document.getElementById('modal-title').innerText=foodTitle;
      //setting ingredients and measurements      
      const meal=  data.meals[0];
          for(let i=1; meal[`strIngredient${i}`]; i++){
            const ingredients=`
            ✔️ ${meal[`strMeasure${i}`] + ' ' +meal[`strIngredient${i}`]}
            `
            const div= document.createElement('div');
            div.innerText= ingredients;
            div.id='ingredient-text'

            const modalRecipe= document.getElementById('modal-recipe');
            modalRecipe.appendChild(div);
        }
    })
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}    