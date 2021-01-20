/*  Declaration  */
let puntuationLabel = document.querySelector(".puntuation");
let statusLabel = document.querySelector(".status")
let container = document.querySelector(".container");
let count = 0;
let random = 0;
let status = "init";
let puntuation = 0;
let loop = null;
let loopTime = 1500;
let actualCircles = [];
let circles = [{
    id: "0",
    className: "click",
  },
  {
    id: "1",
    className: "hover",
  },
  {
    id: "2",
    className: "q",
  },
  {
    id: "3",
    className: "w",
  },
  {
    id: "4",
    className: "e",
  },
  {
    id: "5",
    className: "r",
  },
];

createBubbles();

/*  Start frame  */

let playButton = document.createElement('button');
playButton.classList.add('play');
playButton.textContent = "Play!";
playButton.addEventListener('click', (event) => {
  playGame();
  event.target.remove();
});

container.append(playButton);

/*  Random number generator  */

function randomInt(max) {
  return Math.floor(Math.random() * max);
}

/*  Counter  */

function counter() {
  return count += 1;
}

/*  Play game  */

function playGame() {
  status = "play";
  statusLabel.textContent = "Playing"
  loop = setInterval(createCircle, loopTime);
}

/*  Stop game  */

function stopGame() {
  clearInterval(loop);
}

/*  Restart game /// */

function restartGame(event) {
  let containerChildrens = container.children;
  for (let i = containerChildrens.length - 1; i >= 0; i--) {
    containerChildrens[i].remove();
  }

  count = 0;
  random = 0;
  puntuation = 0;
  loop = null;
  loopTime = 1500;
  actualCircles = [];
  container.classList.remove('game-over');
  container.classList.add('container');

  event.target.remove();

  puntuationLabel.textContent = 0;

  playGame();
}

/*  Create circle function  */

function createCircle() {

  // Check if there are less than 5 circles on the screen

  if (actualCircles.length >= 5 && status !== "over") {

    status = "over";
    statusLabel.textContent = "Game Over"

    container.classList.add('game-over');
    container.classList.remove('container');

    let restartButton = document.createElement('button');
    restartButton.classList.add('restart');
    restartButton.textContent = "Try again";
    restartButton.addEventListener('click', restartGame);
    container.append(restartButton);

    for (let i = 0; i < actualCircles.length; i++) {
      actualCircles[i].removeEventListener('click', removeCircle);
      actualCircles[i].removeEventListener('mouseover', removeCircle);
    }

    stopGame();

  } else if (status === "play") {

    /* 
    -Create a new circle
    -Set an id, class, text content and a event listener correspondingly
    -Add event listeners to circles
    -Make a push to actual circles array 
    -Append the actual circles to the dom 
    */

    const random = randomInt(2);
    let newCircle = document.createElement("p");

    newCircle.id = counter();
    newCircle.classList.add(circles[random].className);
    newCircle.textContent = circles[random].className;
    overlaped = true;
    newCircle.style.marginTop = randomInt(420).toString() + "px";
    newCircle.style.marginLeft = randomInt(420).toString() + "px";

    // Add event listeners to circles

    switch (circles[random].className) {
      case 'click':
        newCircle.addEventListener('click', removeCircle);
        break;

      case 'hover':
        newCircle.addEventListener('mouseover', removeCircle);
        break;
    }


    while (overlaped === true) {
      overlaped = isOverlaped(newCircle);

      if (!overlaped) {
        console.log("============================================");
        console.log("ActualCircles antes del push:");
        console.log(actualCircles);
        actualCircles.push(newCircle);
        container.append(newCircle);

        console.log("ActualCircles después del push:");
        console.log(actualCircles);
        console.log(newCircle)
      } else {
        newCircle.style.marginTop = randomInt(420).toString() + "px";
        newCircle.style.marginLeft = randomInt(420).toString() + "px";
      }
      //console.log(overlaped);
    }

    if (puntuation % 10 === 0) {
      loopTime -= loopTime * 0.05;
      stopGame();
      playGame();
    }
  }
}

/*  Remove circle  */

function removeCircle(event) {

  // console.log("RemoveCircle ejecution:");
  // console.log(actualCircles);
  // console.log(event.target.id)
  actualCircles.splice(actualCircles.indexOf(event.target.id), 1);
  event.target.remove();
  handlePuntuation();
  // console.log("....");
  // console.log(actualCircles);
  // console.log("..,,,,....,,,,....,,,,....,,,,....,,,,....,,,");
}

/*  Puntuation handler  */

function handlePuntuation() {
  puntuation += 1;
  puntuationLabel.textContent = puntuation.toString();
  return puntuation;
}

/* Function to avoid overlap */

function isOverlaped(circle) {
  for (let i = 0; i < actualCircles.length; i++) {
    let side1 = (Math.abs(parseInt(circle.style.marginLeft) + 40) - (parseInt(actualCircles[i].style.marginLeft) + 40));
    let side2 = (Math.abs(parseInt(circle.style.marginTop) + 40) - (parseInt(actualCircles[i].style.marginTop) + 40));

    let a = parseInt(circle.style.marginLeft) + 40;
    let b = parseInt(actualCircles[i].style.marginLeft) + 40
    let c = parseInt(circle.style.marginTop) + 40
    let d = parseInt(actualCircles[i].style.marginTop) + 40;


    // console.log("Margen circulo nuevo / margen circulo actual");


    // console.log(circle.id, actualCircles[i].id)
    // console.log(circle.style.marginLeft, actualCircles[i].style.marginLeft);
    // console.log(circle.style.marginTop, actualCircles[i].style.marginTop);
    // console.log("--------------------------------------------");
    // console.log(a, b)
    // console.log(c, d)

    let hypotenuse = Math.sqrt(Math.pow(side1, 2) + Math.pow(side2, 2));
    // console.log(hypotenuse);
    console.log("============================================");
    if (hypotenuse < 83) {
      return true;
    }
  }
  return false;
}


/* Decoration */

function createBubbles() {
  const bubbles = document.querySelector(".bubbles");

  for (let i = 0; i <= 10; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubbles.append(bubble);
  }
}