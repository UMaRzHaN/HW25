import { fetchData } from "./api/FetchData.js";
const block = document.querySelector(".block");
const Data = await fetchData();
const bg_color = [
  `radial-gradient(circle, #5c0067 0%, #00d4ff 100%)`,
  `linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(207,232,1,1) 53%, rgba(0,212,255,1) 100%)`,
  `radial-gradient(circle, rgba(207,232,1,1) 8%, rgba(255,0,0,1) 87%)`,
  `radial-gradient(circle, rgba(1,232,28,1) 0%, rgba(87,70,207,1) 86%);`,
  `linear-gradient(90deg, rgba(175,1,232,1) 25%, rgba(87,70,207,1) 73%);`,
];
const box_shadow = [
  `4px 4px 49px 0px rgba(0, 144, 255, 0.2); `,
  `4px 4px 49px 7px rgba(0, 255, 232, 0.2);`,
  `4px 4px 49px 7px rgba(255, 0, 0, 0.2)`,
  `4px 4px 49px 7px rgba(0, 255, 7, 0.2);`,
  `4px 4px 49px 7px rgba(255, 0, 248, 0.2) ;
  `,
];
let fetched = Data.drinks;
let info;
let cocktail = Drink_index(1);

function Drink_index(index) {
  let parametr;
  fetched.forEach((element, i) => {
    i++;
    if (i === index + 1) {
      parametr = element;
    }
  });
  return parametr;
}

function alcohol() {
  const drink = document.querySelectorAll(".drink");
  for (let index = 0; index < drink.length; index++) {
    drink[index].addEventListener("click", () => {
      cocktail = Drink_index(index);
      info = document.implementation.createHTMLDocument("New Document");
      info.head.innerHTML = `<meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
      body{
        background-image: ${bg_color[index % 5]};
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-family: cursive;
      }
      .crime{
        border-radius: 30px;
        background-color: whitesmoke;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 20px;
        box-shadow: ${box_shadow[index % 5]} inset;

      }
      .titles{
        font-size: 54px;
        font-weight: 700;
      }
      img{
        border-radius: 20px;
        width: 300px;
        height: 350px;
        background-size: 100%;
        box-shadow: ${box_shadow[index % 5]};
      }
      .another_info{
    align-self: start;
        
      }
      </style>`;

      info.body.innerHTML += `<div class="crime">
      <img src = "${cocktail.strDrinkThumb}" class ="DrinkThumb">
      <div class="titles">${cocktail.strDrink}</div>
      <div class="ingredients" >
      <b>Category:</b> ${cocktail.strCategory} <br> 
      <b>Ingredients:</b> ${cocktail.strIngredient1}; ${cocktail.strIngredient2}; ${cocktail.strIngredient3} <br>      
      <b>Recomendation:</b> ${cocktail.strAlcoholic} <br>
      <b>Instruction:</b> ${cocktail.strInstructions} <br>
      </div>
      <div class = "another_info">
      <b>Measure:</b> ${cocktail.strMeasure1} <br>
      <b>ID drink:</b> ${cocktail.idDrink} <br>
      <b>Type of Glass:</b> ${cocktail.strGlass} <br>
      </div>
      `;
      console.log(info);

      console.log(cocktail);
      const blob = new Blob([info.documentElement.innerHTML], {
        type: `text/html`,
      });
      const InfoURL = window.URL.createObjectURL(blob);
      window.location.href = InfoURL;
    });
  }
}

function Display(json) {
  let html = "";
  json.forEach((element) => {
    html +=
      `<a class = "drink" >` +
      `<img src = "${element.strDrinkThumb}" class ="DrinkThumb">` +
      `<div class = "text">` +
      `<h3>${element.strDrink} </h3>` +
      `<p>${element.strCategory}</p>` +
      `</div>` +
      `</a>`;
  });
  block.innerHTML = html;
}

Display(fetched);
alcohol();

const icon = document.querySelector(".icon");
icon.addEventListener("click", () => {
  document.querySelector("header").classList.toggle("mystyle_header");
  document.body.classList.toggle("mystyle");
  document.querySelector(".title").classList.toggle("mystyle");
});

document.querySelector("input").addEventListener("input", (e) => {
  let search = e.target.value;
  Data["drinks"].slice(fetched).unshift(fetched);
  fetched = Data.drinks.filter((e) =>
    e.strDrink.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );
  Display(fetched);
  alcohol();
});

const btn = document.querySelector("button");
btn.addEventListener("click", () => {
  fetched = Data.drinks;
  input.value = "";
  Display(fetched);
  alcohol();
});
