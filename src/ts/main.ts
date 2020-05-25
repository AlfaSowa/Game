import { game } from "./game";

// let gameOptions = document.querySelector(".game");
// let gameStart = document.querySelector(".game__start");
// let gameStartBtn = document.querySelector(".game__start-btn");
// let gameHeroes = document.querySelector(".game__heroes");

// heroes.forEach((hero) => {
//     let heroCard = document.createElement("div");
//     heroCard.classList.add("game__heroes-item");
//     heroCard.textContent = hero.name;
//     heroCard.dataset.name = hero.name;
//     gameHeroes.appendChild(heroCard);

//     heroCard.addEventListener("click", (e) => {
//         if (!e.target.classList.contains("active")) {
//             let heroCards = document.querySelectorAll(".game__heroes-item");
//             heroCards.forEach((item) => {
//                 item.classList.remove("game__heroes-item--active");
//             });
//             e.target.classList.add("game__heroes-item--active");
//         }
//     });
// });

// gameStartBtn.addEventListener("click", () => {
//     let gameHero = document.querySelector(".game__heroes-item--active");

//     if (gameHero) {
//         gameOptions.classList.add("game--hide");
//         gameStart.classList.add("game__start--hide");
//         game.init(gameHero.dataset.name);
//     }
// });

//test
// document.querySelector(".game").classList.add("game--hide");

game.init("mage");
