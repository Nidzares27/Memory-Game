const startBtn = document.querySelector("#startBtn");
let counter = document.querySelector("#counter");
const timer = document.querySelector("#timer");
const resetka = document.querySelector("#resetka");
let karte = document.querySelectorAll(".kartica");

let playing = false;

class Karta {
  constructor(id, slika, vrijednost) {
    this.id = id;
    this.slika = slika;
    this.vrijednost = vrijednost;
  }
  getDiv() {}
}

function createCards() {
  const karta1 = new Karta(1, "./pcs/Apple.png", "Apple");
  const karta2 = new Karta(2, "./pcs/Apple.png", "Apple");
  const karta3 = new Karta(3, "./pcs/Apple.png", "Apple");
  const karta4 = new Karta(4, "./pcs/Apple.png", "Apple");
  const karta5 = new Karta(5, "./pcs/Banana.png", "Banana");
  const karta6 = new Karta(6, "./pcs/Banana.png", "Banana");
  const karta7 = new Karta(7, "./pcs/Banana.png", "Banana");
  const karta8 = new Karta(8, "./pcs/Banana.png", "Banana");
  const karta9 = new Karta(9, "./pcs/Orange.png", "Orange");
  const karta10 = new Karta(10, "./pcs/Orange.png", "Orange");
  const karta11 = new Karta(11, "./pcs/Orange.png", "Orange");
  const karta12 = new Karta(12, "./pcs/Orange.png", "Orange");
  const karta13 = new Karta(13, "./pcs/Strawberry.png", "Strawberry");
  const karta14 = new Karta(14, "./pcs/Strawberry.png", "Strawberry");
  const karta15 = new Karta(15, "./pcs/Strawberry.png", "Strawberry");
  const karta16 = new Karta(16, "./pcs/Strawberry.png", "Strawberry");

  let deck = [
    karta1,
    karta2,
    karta3,
    karta4,
    karta5,
    karta6,
    karta7,
    karta8,
    karta9,
    karta10,
    karta11,
    karta12,
    karta13,
    karta14,
    karta15,
    karta16,
  ];

  return deck;
}

let spil = createCards();
let brojac = 0;
let pogodci = [];

function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);

  // get random item
  let item = arr.splice(randomIndex, 1);

  return item;
}

function randomPostavkaKarata() {
  for (const polje of karte) {
    const card = getRandomItem(spil);
    polje.innerHTML = `
          <img class="faceDown" src="${card[0].slika}" alt=${card[0].vrijednost} />
          `;
  }
}

randomPostavkaKarata();

function uklanjanjeKarata() {
  for (const polje of karte) {
    polje.innerHTML = "";
    if (!polje.classList.contains("back")) {
      polje.classList.add("back");
    }
  }
}

let rezultatiKlikova = [];
let brKlikova = 0;
let intervalId;
let skip = 0;

resetka.addEventListener("click", function (e) {
  if (!playing) {
    return;
  }

  if (rezultatiKlikova.length == 2) {
    return;
  }

  let clicked = e.target.closest("img");

  if (clicked === null || clicked.classList.contains("faceUp")) {
    return;
  }

  let divKarte = clicked.closest("div");

  if (divKarte.id === rezultatiKlikova[0]?.closest("div")?.id) {
    alert("Ne Mozes kliknuti dva puta uzastopno na istu kartu");
    return;
  }

  brKlikova++;
  counter.textContent = `clicks: ${brKlikova}`;
  rezultatiKlikova.push(clicked);
  clicked.classList.remove("faceDown");
  divKarte.classList.remove("back");

  if (brKlikova % 2 == 0) {
    if (rezultatiKlikova[0].alt == rezultatiKlikova[1].alt) {
      pogodci.push(rezultatiKlikova[0], rezultatiKlikova[1]);
      setTimeout(function () {
        rezultatiKlikova.forEach((el) => {
          el.classList.add("faceUp");
        });
        rezultatiKlikova.splice(0);
        if (pogodci.length === 16) {
          clearInterval(intervalID);
          alert("Cestitamo!!!");
        }
      }, 500);
    } else {
      setTimeout(function () {
        rezultatiKlikova.forEach((el) => {
          el.classList.add("faceDown");
          el.closest("div")?.classList.add("back");
        });
        rezultatiKlikova.splice(0);
      }, 500);
    }
  }
});

startBtn.addEventListener("click", function () {
  brojac = 0;
  if (skip !== 0) {
    clearInterval(intervalID);
  }
  skip++;
  intervalID = setInterval(function () {
    timer.textContent = `time: ${brojac} seconds`;
    brojac++;
  }, 1000);

  uklanjanjeKarata();
  spil = createCards();
  randomPostavkaKarata();
  rezultatiKlikova = [];
  brKlikova = 0;
  counter.textContent = `clicks: ${brKlikova}`;
  playing = true;
  pogodci.splice(0);
});
