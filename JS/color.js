const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const btn = document.getElementById("btn");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const color = document.querySelector(".color");
let hexColor = "#FFFFFF";

btn.addEventListener("click", function () {
  hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }
  // console.log(hexColor);

  color.textContent = hexColor;
  color.style.color = hexColor;

  //document.body.style.backgroundColor = hexColor;
});
btn1.addEventListener("click", function () {
  document.body.style.backgroundColor = hexColor;
  btn.style.backgroundColor = hexColor;
  btn1.style.backgroundColor = hexColor;
  btn2.style.backgroundColor = hexColor;
});

btn2.addEventListener("click", function () {
  color.textContent =  "#f1f5f8";
  color.style.color =  "#f1f5f8";
  document.body.style.backgroundColor = "#f1f5f8";
  btn.style.backgroundColor = "#f1f5f8";
  btn1.style.backgroundColor = "#f1f5f8";
  btn2.style.backgroundColor = "#f1f5f8";
});

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}
