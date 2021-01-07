/* //// Declaration //// */
let count = 0;
let random = 0;
let container = document.querySelector(".container");
let actualCircles = [];
let circles = [
  {
    id: "0",
    className: "click",
    event: "click"
  },
  {
    id: "1",
    className: "hover",
    event: "hover"
  },
  {
    id: "2",
    className: "q",
    event: "click"
  },
  {
    id: "3",
    className: "w",
    event: "click"
  },
  {
    id: "4",
    className: "e",
    event: "click"
  },
  {
    id: "5",
    className: "r",
    event: "click"
  },
];

/* //// Random number generator //// */

function randomInt() {
  return Math.floor(Math.random() * 6);
}

/* //// Counter //// */

function counter() {
  return actualCircles.length - 1;
}

/* //// Create circle function //// */

function createCircle() {

  // Check if there are less than 5 circles on the screen
  if (actualCircles.length >= 5) {
    console.log("Game Over");

  } else {
    /* 
    -Create a new circle
    -Set an id, class, text content and a event listener correspondingly
    -Make a push to actual circles array 
    -Append the actual circles to the dom 
    */
  
    const random = randomInt();
    let newCircle = document.createElement("p");

    newCircle.id = counter();
    newCircle.classList.add(circles[random].className);
    newCircle.textContent = circles[random].className.toUpperCase();

    newCircle.addEventListener('click', (event) => {
      actualCircles.splice(event.target.id, 1);
      event.target.remove();
    });

    actualCircles.push(newCircle);
  }

  for (let i = 0; i < actualCircles.length; i++) {
    container.append(actualCircles[i]);
  }
}



setInterval(createCircle, 1000);