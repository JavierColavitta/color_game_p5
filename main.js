// Arreglo colors RGB Inicial
// let colors = [
//   "rgb(1, 190, 254)",
//   "rgb(255, 221, 0)",
//   "rgb(255, 125, 0)",
//   "rgb(255, 0, 109)",
//   "rgb(173, 255, 2)",
//   "rgb(143, 0, 255)",
// ];
let numberOfSquares = 6;
let colors = [];
let square = document.querySelectorAll(".square");
let pickedColor;
let colorDisplay = document.querySelector("#colorDisplay");
let clickedColor;
let body = document.querySelector("body");
let message = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetBtn = document.querySelector("#reset");
let modeBtn = document.querySelectorAll(".mode");
// let easyBtn = document.querySelector("#easy");
// let hardBtn = document.querySelector("#hard");

Init();

function Init() {
  setupModeBtn();
  reset();
}

// Dificultad del juego: Agrega eventos a los botones de Easy y Hard
function setupModeBtn() {
  for (let i = 0; i < modeBtn.length; i++) {
    modeBtn[i].addEventListener("click", function () {
      modeBtn[0].classList.remove("selected");
      modeBtn[1].classList.remove("selected");
      this.classList.add("selected");
      this.textContent === "Easy"
        ? (numberOfSquares = 3)
        : (numberOfSquares = 6);
      reset();
    });
  }
}

// La función reset, resetea el juego para recuperar valores iniciales
function reset() {
  colors = generateRandomColors(numberOfSquares);
  pickedColor = pickColor(numberOfSquares);
  colorDisplay.textContent = pickedColor;
  // Itera sobre los cuadrados
  for (let i = 0; i < square.length; i++) {
    // Comprueba si existe un color en la posición i
    if (colors[i] !== undefined) {
      square[i].style.backgroundColor = colors[i];
      // Si existe el color en la posición i, entonces será asignado a un cuadrado
      square[i].style.display = "block";
    } else {
      // Si el color es indefinido el cuadrado se ocultará
      square[i].style.display = "none";
    }
    square[i].addEventListener("click", function () {
      clickedColor = this.style.backgroundColor;
      /* Cuando el usuario haga click en un cuadrado incorrecto, éste desaparecerá (cambiando su color de fondo al mismo que el del <body>) y, al mismo tiempo, aparecerá el mensaje "Intentalo nuevamente".*/
      if (clickedColor !== pickedColor) {
        this.style.backgroundColor = body.style.backgroundColor;
        message.textContent = "Intentalo nuevamente";
        /* Si el usuario adivina, en cambio, todos los cuadrados y el <h1> deberán tener el color del cuadrado ganador y aparecerá el mensaje "¡Correcto!".*/
      } else {
        message.textContent = "¡Correcto!";
        h1.style.backgroundColor = pickedColor;
        changeColors(pickedColor);
        /* Agregá un evento para que, cuando el usuario gane, #reset cambie su texto a "Play Again?".
          Agregá en el listener de #reset un evento para que, cuando el usuario haga click, vuelva a decir "Nuevos Colores" y desaparezca el mensaje "Intentalo Nuevamente" y "¡Correcto!" 
          -volvé a resetear el color de fondo del <h1> y fijate si todo esta funcionando como debería.
        */
        resetBtn.textContent = "Play Again?";
        resetBtn.addEventListener("click", function () {
          this.textContent = "Nuevos Colores";
          message.textContent = "";
          h1.style.backgroundColor = body.style.backgroundColor;
          colorDisplay.textContent = pickedColor;
        });
      }
    });
  }
}

// Cambiar el color de todos los cuadrados cuando el usuario adivina el color
function changeColors(color) {
  for (let i = 0; i < square.length; i++) {
    square[i].style.backgroundColor = color;
  }
}

/* La función pickColor creá un número aleatorio entre los Índices del Arreglo colors y utiliza ese número para devolver un color del arreglo */
function pickColor() {
  let random = Math.floor(Math.random() * colors.length);
  let pickedOne = colors[random];
  return pickedOne;
}

// La función randomColor genera y devuelve colores rgb aleatorios.
function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  let aleatoryColor = "rgb(" + r + ", " + g + ", " + b + ")";
  return aleatoryColor;
}

// Generará colores de forma aleatoria al Arreglo de colors
function generateRandomColors(numberOfSquares) {
  let newArr = [];
  for (let i = 0; i < numberOfSquares; i++) {
    let newColor = randomColor();
    newArr[i] = newColor;
  }
  return newArr;
}

// Cuando el usuario haga click en el botón reset, se invocará la función reset
resetBtn.addEventListener("click", function () {
  reset();
});

// Dificultad del juego:
// easyBtn.addEventListener("click", function () {
//   easyBtn.classList.add("selected");
//   hardBtn.classList.remove("selected");
//   numberOfSquares = 3;
//   reset();
// });

// hardBtn.addEventListener("click", function () {
//   hardBtn.classList.add("selected");
//   easyBtn.classList.remove("selected");
//   numberOfSquares = 6;
//   reset();
// });
